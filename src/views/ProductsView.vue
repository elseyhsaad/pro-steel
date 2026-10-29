<script setup>
import {computed,ref,watch} from 'vue'
import {useRoute,RouterLink} from 'vue-router'
const imageBase = `${import.meta.env.BASE_URL}images/`
import {Search,ArrowUpRight,Box,Layers3,ChevronDown,X,SlidersHorizontal} from 'lucide-vue-next'
import {products,categories,chinaCategories} from '../products'
import SteelViewer from '../SteelViewer.vue'
const route=useRoute()
const lang=computed(()=>route.meta.lang||'en')
const rtl=computed(()=>lang.value==='ar')
const allCats=[...new Map([...chinaCategories,...categories].map(c=>[c.id,c])).values()]
const chosen=ref('all'),query=ref(''),preview=ref(null),source=ref('all')
const labels={
 en:{eyebrow:'PRO STEEL / INDUSTRIAL PRODUCT PORTFOLIO',title:'ENGINEERED FOR INDUSTRY.',accent:'SOURCED FOR YOUR MARKET.',lead:'Steel products, manufacturing routes and the technical details needed to start a serious supply conversation.',catalog:'REQUEST A QUOTE',families:'Product categories',all:'All steel products',china:'CHINA SOURCING FAMILIES',other:'ADDITIONAL STEEL FAMILIES',find:'Find a product, standard or grade',count:'products',view:'View technical details',model:'3D preview',historical:'Documented families',sourcing:'Sourcing portfolio',no:'No products matched your search.',close:'Close',note:'Illustrative product families. Dimensions, origin, grades and availability are verified with the manufacturer for each quotation.',technical:'Technical data & dimensions',explore:'Explore product details'},
 ar:{eyebrow:'PRO STEEL / كتالوج المنتجات الصناعية',title:'حديد للصناعة.',accent:'وتوريد لكل سوق.',lead:'منتجات الحديد وطرق تصنيعها والبيانات التقنية الضرورية لبدء طلب توريد احترافي.',catalog:'اطلب عرض سعر',families:'تصنيفات المنتجات',all:'جميع المنتجات',china:'تصنيفات التوريد من الصين',other:'تصنيفات الحديد الأخرى',find:'ابحث عن منتج أو معيار أو درجة فولاذ',count:'منتج',view:'التفاصيل والقياسات',model:'معاينة 3D',historical:'عائلات ضمن سجلات سابقة',sourcing:'منتجات التوريد',no:'ما في نتائج مطابقة.',close:'إغلاق',note:'المنتجات معروضة كفئات مرجعية؛ نؤكد الأبعاد والمنشأ والدرجات والتوفر مع المصنع لكل عرض سعر.',technical:'مواصفات وقياسات',explore:'استكشف تفاصيل المنتج'},
 tr:{eyebrow:'PRO STEEL / ENDÜSTRİYEL ÜRÜN KATALOĞU',title:'SANAYİ İÇİN ÇELİK.',accent:'PAZARINIZ İÇİN TEDARİK.',lead:'Çelik ürünleri, üretim seçenekleri ve tedarik görüşmesi için gerekli teknik bilgiler.',catalog:'Teklif İste',families:'Ürün kategorileri',all:'Tüm ürünler',china:'ÇİN TEDARİK GRUPLARI',other:'DİĞER ÇELİK GRUPLARI',find:'Ürün, standart veya kalite ara',count:'ürün',view:'Teknik detaylar',model:'3D önizleme',historical:'Belgeli ürün grupları',sourcing:'Tedarik portföyü',no:'Aramanıza uygun ürün bulunamadı.',close:'Kapat',note:'Ürünler referans amaçlıdır. Ölçü, menşe, kalite ve bulunabilirlik teklif sırasında üretici tarafından doğrulanır.',technical:'Teknik bilgiler ve ölçüler',explore:'Ürün detaylarını incele'}
}
const t=computed(()=>labels[lang.value]||labels.en)
const link=p=>`/${lang.value}/${p}`
const photo=p=>`${import.meta.env.BASE_URL}images/${p.image||`steel-${p.photo}.png`}`
const matches=(p,id)=>id==='all'||p.category===id||p.chinaCategory===id||p.chinaExtraCategories?.includes(id)
const count=id=>products.filter(p=>matches(p,id)).length
const category=p=>allCats.find(c=>c.id===(p.chinaCategory||p.category))?.[lang.value]||''
const filtered=computed(()=>products.filter(p=>matches(p,chosen.value)&&(source.value==='all'||(source.value==='historical'?p.source==='historical':p.source!=='historical'))&&[p.en,p.ar,p.tr,p.grade,p.sizes,p.standards?.join(' '),category(p)].join(' ').toLocaleLowerCase().includes(query.value.trim().toLocaleLowerCase())))
const current=computed(()=>products.find(p=>p.id===preview.value))
watch(lang,()=>{query.value='';chosen.value='all';preview.value=null})
</script>
<template>
 <main class="pc" :dir="rtl?'rtl':'ltr'">
  <section class="pc-hero">
<div class="pc-hero-image" :style="{ backgroundImage: `url(${imageBase}steel-2.png)` }"></div>
   <div class="v2-wrap pc-hero-content">
    <p class="pc-kicker">{{t.eyebrow}}</p><h1>{{t.title}}<em>{{t.accent}}</em></h1>
    <p class="pc-lead">{{t.lead}}</p>
    
<RouterLink :to="link('quote')" class="pc-btn">
  {{ t.catalog }}
  <ArrowUpRight :size="18" />
</RouterLink>

    <div class="pc-rule"><span>PRO STEEL / 2026</span><span>{{products.length}} {{t.count}}</span></div>
   </div>
  </section>
  <section id="catalogue" class="v2-wrap pc-browser">
   <div class="pc-intro"><p class="pc-kicker">PRODUCT INDEX / 01</p><h2>{{t.families}}</h2></div>
   <div class="pc-shell">
    <aside class="pc-categories">
     <button :class="{active:chosen==='all'}" @click="chosen='all'"><span>{{t.all}}</span><small>{{count('all')}}</small></button>
     <p>{{t.china}}</p>
     <button v-for="c in chinaCategories" :key="c.id" :class="{active:chosen===c.id}" @click="chosen=c.id"><span>{{c[lang]}}</span><small>{{count(c.id)}}</small></button>
     <p>{{t.other}}</p>
     <button v-for="c in categories.filter(x=>!x.id.startsWith('china-'))" :key="c.id" :class="{active:chosen===c.id}" @click="chosen=c.id"><span>{{c[lang]}}</span><small>{{count(c.id)}}</small></button>
    </aside>
    <div class="pc-listing">
     <div class="pc-tools"><label class="pc-search"><Search :size="19"/><input type="search" v-model="query" :placeholder="t.find"/></label><div class="pc-segments"><button v-for="x in ['all','historical','sourcing']" :key="x" :class="{active:source===x}" @click="source=x">{{x==='all'?t.all:x==='historical'?t.historical:t.sourcing}}</button></div></div>
     <div class="pc-results"><span>{{filtered.length}} {{t.count}}</span><span>{{chosen==='all'?t.all:allCats.find(c=>c.id===chosen)?.[lang]}}</span></div>
     <div v-if="filtered.length" class="pc-grid">
      <article class="pc-card" v-for="(p,i) in filtered" :key="p.id">
       <RouterLink class="pc-photo" :to="link('products/'+p.id)"><img :src="photo(p)" :alt="p[lang]||p.en" loading="lazy"/><span class="pc-photo-index">{{String(i+1).padStart(2,'0')}}</span><span class="pc-photo-arrow"><ArrowUpRight :size="21"/></span></RouterLink>
       <div class="pc-card-main"><small>{{category(p)}}</small><h3><RouterLink :to="link('products/'+p.id)">{{p[lang]||p.en}}</RouterLink></h3><p>{{p.grade||'—'}}</p><div class="pc-card-footer"><RouterLink :to="link('products/'+p.id)">{{t.view}} <ArrowUpRight :size="16"/></RouterLink><button @click="preview=p.id"><Box :size="16"/> {{t.model}}</button></div></div>
      </article>
     </div><div v-else class="pc-no">{{t.no}}</div>
    </div>
   </div>
   <p class="pc-note">{{t.note}}</p>
  </section>
  <div v-if="current" class="pc-overlay" @click.self="preview=null"><div class="pc-dialog" role="dialog" aria-modal="true" :aria-label="current[lang]||current.en"><div class="pc-dialog-head"><div><p class="pc-kicker">PRO STEEL / 3D</p><h2>{{current[lang]||current.en}}</h2></div><button @click="preview=null" :aria-label="t.close"><X/></button></div><SteelViewer :key="current.id" :product="current.model3d"/><RouterLink class="pc-dialog-link" :to="link('products/'+current.id)" @click="preview=null">{{t.explore}} <ArrowUpRight :size="17"/></RouterLink></div></div>
 </main>
</template>
<style scoped>
.pc{background:#0a1117;color:#f1f2f1;min-height:100vh}.pc-hero{position:relative;min-height:590px;overflow:hidden;isolation:isolate;display:flex;align-items:center}.pc-hero-image{position:absolute;inset:0;background-size:cover;background-position:center;filter:grayscale(.52) brightness(.59);z-index:-2;transform:scale(1.04)}.pc-hero:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#091117 2%,#091117d9 40%,#09111755 88%),linear-gradient(0deg,#091117,transparent 50%);z-index:-1}.pc-hero-content{width:100%;padding:154px 0 62px}.pc-kicker{font-size:11px;color:#c7a067;letter-spacing:.18em;text-transform:uppercase;font-weight:650}.pc-hero h1{font-size:clamp(43px,6vw,86px);max-width:900px;font-weight:500;letter-spacing:-.047em;line-height:1.07;margin:26px 0}.pc-hero h1 em{font-style:normal;display:block;color:#d7b27c;font-weight:400}.pc-lead{color:#c1cbd2;max-width:600px;font-size:15px;line-height:1.9}.pc-btn{display:inline-flex;align-items:center;gap:15px;background:#c7a067;color:#0e1419;text-decoration:none;padding:15px 21px;margin-top:30px;font-size:12px;font-weight:750}.pc-rule{margin-top:69px;display:flex;justify-content:space-between;border-top:1px solid #ffffff50;padding-top:17px;font-size:10px;letter-spacing:.1em;color:#b7c3c8}.pc-browser{padding-top:92px;padding-bottom:105px}.pc-intro{margin-bottom:38px}.pc-intro h2{font-size:clamp(32px,4vw,52px);font-weight:450;margin:8px 0}.pc-shell{display:grid;grid-template-columns:270px minmax(0,1fr);gap:30px;align-items:start}.pc-categories{position:sticky;top:100px;max-height:calc(100vh - 115px);overflow:auto;background:#111c25;border:1px solid #35414a;padding:10px}.pc-categories p{font-size:10px;color:#c7a067;letter-spacing:.1em;margin:22px 11px 11px}.pc-categories button{background:transparent;border:0;border-left:2px solid transparent;color:#b3c0c9;display:flex;align-items:center;justify-content:space-between;width:100%;padding:12px 11px;text-align:start;gap:10px;cursor:pointer;font-size:12px;line-height:1.45}.pc-categories button.active,.pc-categories button:hover{background:#263640;color:#f0d1a4;border-left-color:#c7a067}.pc-categories small{color:#a98c67}.pc-tools{display:flex;gap:14px;flex-wrap:wrap}.pc-search{display:flex;align-items:center;gap:10px;border:1px solid #43525e;background:#17232d;padding:0 16px;flex:1;min-width:min(280px,100%);color:#c7a067}.pc-search input{min-width:0;width:100%;padding:14px 0;background:transparent;border:0;color:white;font:inherit;font-size:12px;outline:0}.pc-segments{display:flex;gap:4px;flex-wrap:wrap}.pc-segments button{cursor:pointer;background:#17232c;border:1px solid #34434d;color:#aab9c3;font-size:10px;padding:11px}.pc-segments button.active{border-color:#c7a067;color:#e8c89c}.pc-results{display:flex;justify-content:space-between;color:#9eabb6;font-size:11px;padding:26px 0 15px;gap:14px}.pc-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:21px}.pc-card{background:#121f29;border:1px solid #30404b;overflow:hidden;transition:border-color .2s,transform .2s}.pc-card:hover{border-color:#bc9865;transform:translateY(-4px)}.pc-photo{position:relative;height:270px;display:block;background:#1d2a31;overflow:hidden}.pc-photo img{width:100%;height:100%;object-fit:contain;transition:transform .5s;background:#18232b}.pc-card:hover .pc-photo img{transform:scale(1.045)}.pc-photo-index{position:absolute;top:13px;left:15px;background:#0c141bc7;color:#e5d0af;font-size:10px;padding:8px}.pc-photo-arrow{position:absolute;right:14px;bottom:14px;background:#c7a067;color:#101820;padding:9px}.pc-card-main{padding:22px}.pc-card-main small{font-size:10px;color:#c9a46b;text-transform:uppercase;letter-spacing:.07em}.pc-card-main h3{font-size:clamp(17px,1.6vw,23px);font-weight:500;line-height:1.3;margin:10px 0}.pc-card-main h3 a{color:#f1f3f4;text-decoration:none}.pc-card-main>p{font-size:12px;color:#a8b7c2;min-height:30px;line-height:1.55}.pc-card-footer{display:flex;justify-content:space-between;align-items:center;border-top:1px solid #32424d;padding-top:16px;gap:12px;flex-wrap:wrap}.pc-card-footer a,.pc-card-footer button{display:inline-flex;gap:7px;align-items:center;color:#e0b981;background:transparent;text-decoration:none;border:0;cursor:pointer;font-size:11px;padding:6px 0}.pc-no{padding:45px;background:#14222c;color:#b9c5cd}.pc-note{color:#8e9ca7;font-size:11px;margin-top:30px;line-height:1.8}.pc-overlay{position:fixed;inset:0;z-index:250;background:#03070be8;backdrop-filter:blur(8px);display:grid;place-items:center;padding:14px}.pc-dialog{width:min(800px,100%);max-height:96vh;overflow:auto;border:1px solid #ab8551;background:#101a22;padding:22px}.pc-dialog-head{display:flex;justify-content:space-between;align-items:start;gap:15px;margin-bottom:20px}.pc-dialog-head h2{font-size:24px;font-weight:500}.pc-dialog-head button{border:1px solid #52616a;background:transparent;color:white;padding:7px;cursor:pointer}.pc-dialog-link{color:#d9b178;display:inline-flex;gap:8px;align-items:center;padding-top:17px;text-decoration:none}.pc[dir=rtl] .pc-hero:after{transform:scaleX(-1)}.pc[dir=rtl] .pc-categories button{border-left:0;border-right:2px solid transparent}.pc[dir=rtl] .pc-categories button.active{border-right-color:#c7a067}@media(max-width:1020px){.pc-shell{grid-template-columns:215px minmax(0,1fr)}.pc-photo{height:225px}}@media(max-width:750px){.pc-hero{min-height:510px}.pc-hero-content{padding:130px 0 45px}.pc-rule{margin-top:40px}.pc-browser{padding-top:55px}.pc-shell{grid-template-columns:1fr}.pc-categories{position:static;max-height:none;display:flex;gap:7px;overflow-x:auto}.pc-categories p{display:none}.pc-categories button{min-width:155px;border:1px solid #32434d}.pc-grid{grid-template-columns:1fr}.pc-photo{height:250px}.pc-search{min-width:100%}}@media(prefers-reduced-motion:reduce){.pc *{transition:none!important}}

/* Move hero content inward from screen edges */
.pc-hero-content {
  box-sizing: border-box;
  padding-left: 80px;
  padding-right: 80px;
}

/* Arabic RTL support */
.pc[dir="rtl"] .pc-hero-content {
  padding-left: 80px;
  padding-right: 80px;
}

/* Responsive spacing */
@media (max-width: 750px) {
  .pc-hero-content {
    padding-left: 24px;
    padding-right: 24px;
  }
}

</style>
