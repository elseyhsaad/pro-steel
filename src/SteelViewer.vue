<script setup>



import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'



import * as THREE from 'three'



import { OrbitControls } from 'three/addons/controls/OrbitControls.js'



import { RotateCcw, ZoomIn, ZoomOut, Maximize2, Minimize2, Pause, Play } from 'lucide-vue-next'







// Accept a full product; keep shape as a fallback for older pages.



const props = defineProps({



  product: { type: Object, default: null },



  shape: { type: String, default: 'pipe' }



})



const root = ref(null)



const autoRotate = ref(true)



const expanded = ref(false)



const error = ref('')



const language = computed(() => document.documentElement.lang || 'en')



const dictionary = {



  en: {pause:'Pause rotation',play:'Auto rotate',reset:'Reset',plus:'Zoom in',minus:'Zoom out',expand:'Expand',close:'Close expanded',hint:'DRAG TO ROTATE · SCROLL TO ZOOM',note:'Schematic visualization · not manufacturing CAD'},



  ar: {pause:'إيقاف الدوران',play:'تدوير تلقائي',reset:'إعادة',plus:'تكبير',minus:'تصغير',expand:'توسيع',close:'إغلاق التكبير',hint:'اسحب للتدوير · مرّر للتكبير',note:'نموذج توضيحي وليس مخطط تصنيع CAD'},



  tr: {pause:'Döndürmeyi durdur',play:'Otomatik döndür',reset:'Sıfırla',plus:'Yakınlaştır',minus:'Uzaklaştır',expand:'Büyüt',close:'Küçült',hint:'DÖNDÜRMEK İÇİN SÜRÜKLE · KAYDIRARAK YAKINLAŞTIR',note:'Şematik gösterim · üretim CAD modeli değildir'}



}



const txt = computed(() => dictionary[language.value] || dictionary.en)



let scene, camera, renderer, controls, group, animationFrame, resizeObserver



const materials = []



const resolved = computed(() => props.product || { shape: props.shape, finish: 'raw' })



const clamp = (n,lo,hi) => Math.max(lo,Math.min(hi,n))



function material(finish) {



  const presets = {



    raw: { color:0x8d9ca8,metalness:.83,roughness:.32 },



    galvanized: { color:0xd8e3e9,metalness:.91,roughness:.17 },



    alloy: { color:0x748c9c,metalness:.88,roughness:.23 },



    black: { color:0x222c35,metalness:.68,roughness:.34 },

      blue: { color:0x2254a6,metalness:.62,roughness:.24 },

      red: { color:0xb23c30,metalness:.62,roughness:.24 },

      'hot-rolled': { color:0x666c73,metalness:.8,roughness:.46 },

      machined: { color:0xb9c4cc,metalness:.9,roughness:.18 }



  }



  const m = new THREE.MeshPhysicalMaterial({...(presets[finish]||presets.raw),side:THREE.DoubleSide,clearcoat:.38,clearcoatRoughness:.23})



  materials.push(m)



  return m



}



function circleRing(radius, hole, length) {



  const s = new THREE.Shape()



  s.absarc(0,0,radius,0,Math.PI*2,false)



  const h = new THREE.Path()



  h.absarc(0,0,hole,0,Math.PI*2,true)



  s.holes.push(h)



  const geo = new THREE.ExtrudeGeometry(s,{depth:length,steps:1,curveSegments:96,bevelEnabled:false})



  geo.translate(0,0,-length/2)



  return geo



}



function hollowBox(w,h,thickness,length) {



  const s = new THREE.Shape()



  s.moveTo(-w/2,-h/2);s.lineTo(w/2,-h/2);s.lineTo(w/2,h/2);s.lineTo(-w/2,h/2);s.closePath()



  const hw=w/2-thickness,hh=h/2-thickness



  const hole=new THREE.Path()



  hole.moveTo(-hw,-hh);hole.lineTo(-hw,hh);hole.lineTo(hw,hh);hole.lineTo(hw,-hh);hole.closePath()



  s.holes.push(hole)



  const geo=new THREE.ExtrudeGeometry(s,{depth:length,steps:1,bevelEnabled:false})



  geo.translate(0,0,-length/2)



  return geo



}



function angle(w,h,t,length) {



  const s = new THREE.Shape()



  s.moveTo(0,0);s.lineTo(w,0);s.lineTo(w,t);s.lineTo(t,t);s.lineTo(t,h);s.lineTo(0,h);s.closePath()



  const geo=new THREE.ExtrudeGeometry(s,{depth:length,steps:1,bevelEnabled:false})



  geo.translate(-w/2,-h/2,-length/2)



  return geo



}





function prism(points,length){

 const sh=new THREE.Shape()

 sh.moveTo(points[0][0],points[0][1])

 for(const [x,y] of points.slice(1)) sh.lineTo(x,y)

 sh.closePath()

 const g=new THREE.ExtrudeGeometry(sh,{depth:length,bevelEnabled:false})

 g.translate(0,0,-length/2)

 return g

}

function coilGeometry(){

 const g=new THREE.Group()

 // Spiral strip surface: visible concentric wraps and realistic coil bore.

 const metal=new THREE.MeshStandardMaterial({color:0x9db5c0,metalness:.84,roughness:.26,side:THREE.DoubleSide})

 const ribbon= new THREE.Mesh(new THREE.TorusGeometry(.93,.35,24,120),metal)

 ribbon.scale.set(1,1,.72);g.add(ribbon)

 return {geometry:null,extra:g,extraMaterial:metal}

}

function corrugatedSheet(){

 const vertices=[],indices=[],nx=80,ny=14

 for(let y=0;y<=ny;y++)for(let x=0;x<=nx;x++){

  const xx=(x/nx-.5)*3.2,zz=(y/ny-.5)*4.8

  vertices.push(xx,Math.sin(xx*14)*.13,zz)

 }

 for(let y=0;y<ny;y++)for(let x=0;x<nx;x++){

  const i=y*(nx+1)+x;indices.push(i,i+nx+1,i+1,i+1,i+nx+1,i+nx+2)

 }

 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));g.setIndex(indices);g.computeVertexNormals();return g

}



function createRealisticRebar(targetGroup, steelMaterial, length = 4.8) {

const radius = 0.26

const coreRadius = 0.24

const ribThickness = 0.023

const ribCount = 24



  // Rough industrial steel finish

  steelMaterial.color.set('#737a80')

  steelMaterial.metalness = 0.68

  steelMaterial.roughness = 0.69

  steelMaterial.clearcoat = 0.05



  // 1. Solid steel core, aligned along the Z axis

  const coreGeometry = new THREE.CylinderGeometry(

    coreRadius, coreRadius, length, 64

  )

  coreGeometry.rotateX(Math.PI / 2)



  const coreMesh = new THREE.Mesh(coreGeometry, steelMaterial)

  targetGroup.add(coreMesh)



  // 2. Raised longitudinal ribs on opposite sides

  for (const angle of [0, Math.PI]) {

    const railRadius = radius + 0.002



    const railGeometry = new THREE.CylinderGeometry(

      ribThickness * 0.72,

      ribThickness * 0.72,

      length,

      12

    )



    railGeometry.rotateX(Math.PI / 2)



    const rail = new THREE.Mesh(railGeometry, steelMaterial)



    rail.position.set(

      Math.cos(angle) * railRadius,

      Math.sin(angle) * railRadius,

      0

    )



    targetGroup.add(rail)

  }



  // 3. Short inclined transverse ribs

  const spacing = length / (ribCount + 1)



  for (let i = 0; i < ribCount; i++) {

    const zCenter = -length / 2 + (i + 1) * spacing



    // Two semicircular rib patterns

    for (let side = 0; side < 2; side++) {

      const startAngle = side * Math.PI + 0.12

      const endAngle = (side + 1) * Math.PI - 0.12

      const points = []

      const segments = 14



      for (let j = 0; j <= segments; j++) {

        const t = j / segments

        const angle = startAngle + (endAngle - startAngle) * t



        // Opposite inclination on either side

        const slope = side === 0 ? 1 : -1

        const z = zCenter + (t - 0.5) * spacing * 0.64 * slope



        points.push(

          new THREE.Vector3(

            Math.cos(angle) * radius,

            Math.sin(angle) * radius,

            z

          )

        )

      }



      const curve = new THREE.CatmullRomCurve3(points)



      const ribGeometry = new THREE.TubeGeometry(

        curve,

        22,

        ribThickness,

        7,

        false

      )



      const ribMesh = new THREE.Mesh(ribGeometry, steelMaterial)

      targetGroup.add(ribMesh)

    }

  }

}



function createWireRodBundle(targetGroup, steelMaterial) {

  steelMaterial.color.set('#5f666d')

  steelMaterial.metalness = 0.64

  steelMaterial.roughness = 0.80

  steelMaterial.clearcoat = 0.01



  const coilGroup = new THREE.Group()



  // شكل البكرة الواحدة

  const majorRadius = 1.05      // نصف قطر البكرة

const wireRadius = 0.060    // سماكة السلك

const layers = 36            // عدد اللفات/الطبقات

 const depthStep = 0.038     // سماكة البكرة على العمق



  // نبني البكرة من عدة torus متراصين ليظهر شكل "coil" سميك

  for (let i = 0; i < layers; i++) {

    const ring = new THREE.Mesh(

      new THREE.TorusGeometry(majorRadius, wireRadius, 14, 90),

      steelMaterial

    )



    // نخلي وجه البكرة ظاهر

    ring.rotation.y = Math.PI / 2



    // تراص الطبقات ليظهر شكل أسطواني

    ring.position.x = (i - (layers - 1) / 2) * depthStep



    // كسر بسيط جداً حتى ما يطلع مصطنع

    ring.position.y = Math.sin(i * 0.45) * 0.004

    ring.position.z = Math.cos(i * 0.35) * 0.004



    coilGroup.add(ring)

  }



  // أربطة معدنية تمسك البكرة

  const strapMaterial = new THREE.MeshStandardMaterial({

    color: '#8f969d',

    metalness: 0.86,

    roughness: 0.36

  })



  const strapPositions = [-0.22, 0, 0.22]



  strapPositions.forEach((xPos) => {

    const strap = new THREE.Mesh(

      new THREE.TorusGeometry(majorRadius * 1.01, 0.014, 8, 80),

      strapMaterial

    )



    strap.rotation.y = Math.PI / 2

    strap.position.x = xPos



    coilGroup.add(strap)

  })



  // ميل بسيط طبيعي

  coilGroup.rotation.z = 0.08

  coilGroup.rotation.x = -0.08



  targetGroup.add(coilGroup)

}



function build() {



  if (!scene) return



  if (group) { scene.remove(group);group.traverse(obj=>obj.geometry?.dispose());group=null }



  materials.splice(0).forEach(m=>m.dispose())



  const p=resolved.value; const d=p.dimensions||p.model3d?.dimensions||{}



  const kind=p.shape||'pipe',finish=p.finish||'raw'



  const m=material(finish)

    if(p.color) m.color.set(p.color)

    if(Number.isFinite(p.metalness)) m.metalness=p.metalness

    if(Number.isFinite(p.roughness)) m.roughness=p.roughness



  const meshGroup=new THREE.Group()



  // Normalize cross-section so shapes stay visible; maintain actual wall/diameter ratios.



  const length=4.8



  let geometry



  if (kind==='pipe') {



    const diameter=Math.max(1,Number(d.diameter)||60)



    const wall=clamp(Number(d.wall)||5,.1,diameter*.49)



    const radius=1.05



    geometry=circleRing(radius,radius*(1-2*wall/diameter),length)



  } else if (kind==='box') {



    const width=Math.max(1,Number(d.width)||30),height=Math.max(1,Number(d.height)||20)



    const thickness=clamp(Number(d.wall)||2,.1,Math.min(width,height)*.49)



    const scale=2.4/Math.max(width,height)



    geometry=hollowBox(width*scale,height*scale,thickness*scale,length)



  } else if (kind==='angle') {



    const width=Math.max(1,Number(d.width)||24),height=Math.max(1,Number(d.height)||24)



    const thickness=clamp(Number(d.wall)||1.8,.1,Math.min(width,height)*.49)



    const scale=2.35/Math.max(width,height)



    geometry=angle(width*scale,height*scale,thickness*scale,length)



  } else if (kind==='bar') {



    geometry=new THREE.CylinderGeometry(1.05,1.05,length,96)



    geometry.rotateX(Math.PI/2)



  } else if(kind==='flatbar') {

    const ratio=Math.max(.08,Math.min(.65,(Number(d.height)||8)/(Number(d.width)||50)))

    geometry=new THREE.BoxGeometry(2.5,2.5*ratio,length)

  } else if(kind==='squarebar') {

    geometry=new THREE.BoxGeometry(1.9,1.9,length)

  } else if(kind==='hexbar') {

    geometry=new THREE.CylinderGeometry(1,1,length,6);geometry.rotateX(Math.PI/2)

  } else if(kind==='tee') {

    geometry=prism([[-1.4,.55],[1.4,.55],[1.4,.22],[.18,.22],[.18,-1.1],[-.18,-1.1],[-.18,.22],[-1.4,.22]],length)

  } else if(kind==='beam') {

    geometry=prism([[-1,-1],[1,-1],[1,-.76],[.16,-.76],[.16,.76],[1,.76],[1,1],[-1,1],[-1,.76],[-.16,.76],[-.16,-.76],[-1,-.76]],length)

  } else if(kind==='sheet') {

    geometry=new THREE.BoxGeometry(3.1,.09,4.5)



} else if (kind === 'corrugated') {



  geometry = corrugatedSheet()



} else if (kind === 'coil') {



  // Keep the existing steel coil model

  const sh = new THREE.Shape()

  sh.absarc(0, 0, 1.45, 0, Math.PI * 2, false)



  const hole = new THREE.Path()

  hole.absarc(0, 0, 0.55, 0, Math.PI * 2, true)

  sh.holes.push(hole)



  geometry = new THREE.ExtrudeGeometry(sh, {

    depth: 2,

    steps: 1,

    curveSegments: 96,

    bevelEnabled: false

  })



  geometry.translate(0, 0, -1)



} else if (kind === 'wire') {



  // Realistic steel wire rod bundle

  createWireRodBundle(meshGroup, m)

  geometry = null



} else if (kind === 'rebar') {



  createRealisticRebar(meshGroup, m, length)

  geometry = null





} else if (kind === 'custom') {

    geometry=prism([[-1,-.8],[1,-.8],[1,-.35],[.25,-.35],[.25,.8],[-.25,.8],[-.25,-.35],[-1,-.35]],length)

  } else {

    geometry=circleRing(1.05,.72,length)

  }



 if (geometry) {

  meshGroup.add(new THREE.Mesh(geometry, m))

}



  meshGroup.rotation.set(-.22,-.43,.1)



  group=meshGroup



  scene.add(group)



  resetView()



}



function resetView(){



  if(!camera||!controls) return



  camera.position.set(6,4.2,8)



  controls.target.set(0,0,0)



  if(group) group.rotation.set(-.22,-.43,.1)



  controls.update()



}



function zoom(factor){ if(!camera||!controls)return;const target=controls.target;const direction=camera.position.clone().sub(target).multiplyScalar(factor);const distance=clamp(direction.length(),4,18);direction.setLength(distance);camera.position.copy(target).add(direction);controls.update() }



function resize(){if(!root.value||!camera||!renderer)return;const w=root.value.clientWidth,h=root.value.clientHeight;if(w>0&&h>0){camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false)}}



function toggleExpand(){expanded.value=!expanded.value;requestAnimationFrame(resize)}



function animate(){animationFrame=requestAnimationFrame(animate);if(!scene||!renderer)return;controls.autoRotate=autoRotate.value && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;controls.update();renderer.render(scene,camera)}



onMounted(()=>{



  try {



    scene=new THREE.Scene()



    camera=new THREE.PerspectiveCamera(36,1,.1,100)



    renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'})



    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2))



    renderer.outputColorSpace=THREE.SRGBColorSpace



    renderer.toneMapping=THREE.ACESFilmicToneMapping



    renderer.toneMappingExposure=1.6



    renderer.domElement.style.touchAction='none'



    root.value.appendChild(renderer.domElement)



    controls=new OrbitControls(camera,renderer.domElement)



    controls.enableDamping=true;controls.dampingFactor=.065



    controls.enablePan=false;controls.minDistance=4;controls.maxDistance=18



    controls.autoRotateSpeed=.75



    scene.add(new THREE.HemisphereLight(0xeaf1ff,0x26313a,2.9))



    const key=new THREE.DirectionalLight(0xffebc6,5.0);key.position.set(4,8,7);scene.add(key)



    const fill=new THREE.DirectionalLight(0xb4d9ff,3.3);fill.position.set(-5,2,-5);scene.add(fill)



    const rim=new THREE.DirectionalLight(0xffffff,2.2);rim.position.set(-2,-4,5);scene.add(rim)



    const grid=new THREE.GridHelper(16,24,0x554e4d,0x293a46)



    grid.position.y=-2.7;grid.material.transparent=true;grid.material.opacity=.23;scene.add(grid)



    build();resize()



    resizeObserver=new ResizeObserver(resize);resizeObserver.observe(root.value)



    animate()



  } catch(e){error.value='3D preview unavailable';console.error('PRO STEEL 3D:',e)}



})



watch(()=>props.product,build,{deep:true})



watch(()=>props.shape,build)



onBeforeUnmount(()=>{



  cancelAnimationFrame(animationFrame)



  resizeObserver?.disconnect();controls?.dispose()



  group?.traverse(obj=>obj.geometry?.dispose())



  materials.forEach(m=>m.dispose())



  renderer?.dispose();renderer?.domElement?.remove()



})



</script>







<template>



  <div class="ps3d" :class="{'ps3d-expanded':expanded}">



    <div ref="root" class="ps3d-canvas"></div>



    <div class="ps3d-top"><span class="ps3d-live"><i></i> PRO STEEL / 3D EXPLORER</span><span class="ps3d-axis">360°</span></div>



    <div v-if="error" class="ps3d-error">{{error}}</div>



    <div class="ps3d-bottom"><span>{{txt.hint}}</span><small>{{txt.note}}</small></div>



    <div class="ps3d-toolbar">



      <button type="button" :title="autoRotate?txt.pause:txt.play" @click="autoRotate=!autoRotate"><Pause v-if="autoRotate" :size="18"/><Play v-else :size="18"/></button>



      <button type="button" :title="txt.plus" @click="zoom(.8)"><ZoomIn :size="18"/></button>



      <button type="button" :title="txt.minus" @click="zoom(1.25)"><ZoomOut :size="18"/></button>



      <button type="button" :title="txt.reset" @click="resetView"><RotateCcw :size="18"/></button>



      <button type="button" :title="expanded?txt.close:txt.expand" @click="toggleExpand"><Minimize2 v-if="expanded" :size="18"/><Maximize2 v-else :size="18"/></button>



    </div>



  </div>



</template>







<style scoped>



.ps3d{position:relative;width:100%;height:460px;overflow:hidden;background:radial-gradient(ellipse at 50% 38%,#354554 0%,#17242e 50%,#090e13 100%);border:1px solid rgba(199,160,103,.25);isolation:isolate;color:#e8edf0}



.ps3d:before{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(135deg,rgba(199,160,103,.08),transparent 35%);z-index:1}



.ps3d-canvas{position:absolute;inset:0;width:100%;height:100%}.ps3d-canvas :deep(canvas){display:block;width:100%;height:100%;cursor:grab}.ps3d-canvas :deep(canvas:active){cursor:grabbing}



.ps3d-top{position:absolute;top:19px;left:20px;right:20px;z-index:2;display:flex;align-items:center;justify-content:space-between;pointer-events:none;font-size:10px;letter-spacing:.15em;color:#dfc295}.ps3d-live{display:flex;gap:8px;align-items:center}.ps3d-live i{width:6px;height:6px;border-radius:50%;background:#c7a067;box-shadow:0 0 13px #c7a067}.ps3d-axis{border:1px solid #5b605e;padding:7px 9px}



.ps3d-bottom{position:absolute;left:20px;bottom:18px;z-index:2;display:grid;gap:8px;pointer-events:none}.ps3d-bottom span{font-size:10px;letter-spacing:.1em;color:#e0c79c}.ps3d-bottom small{font-size:10px;color:#a7b4bc}



.ps3d-toolbar{position:absolute;right:16px;top:50%;transform:translateY(-50%);z-index:4;display:flex;flex-direction:column;gap:5px}.ps3d-toolbar button{background:rgba(9,18,25,.85);color:#e8edf0;border:1px solid rgba(199,160,103,.24);width:39px;height:39px;display:grid;place-items:center;transition:*background* .2s,color .2s}.ps3d-toolbar button:hover{background:#c7a067;color:#111820}



.ps3d-error{position:absolute;inset:0;display:grid;place-items:center;z-index:3;background:#101920}



.ps3d-expanded{position:fixed;z-index:1000;inset:3vh 3vw;width:94vw;height:94vh;box-shadow:0 0 0 200vmax rgba(0,0,0,.88)}



@media(max-width:640px){.ps3d{height:380px}.ps3d-bottom small{max-width:220px}.ps3d-toolbar{right:9px}.ps3d-toolbar button{width:35px;height:35px}.ps3d-expanded{inset:2vh 2vw;width:96vw;height:96vh}}



@media(prefers-reduced-motion:reduce){.ps3d-toolbar button{transition:none}}



</style>
