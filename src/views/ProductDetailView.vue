<script setup>
import {computed,ref,watch} from 'vue'
import {useRoute,RouterLink} from 'vue-router'
import {ArrowLeft,ArrowRight,ArrowUpRight,ShieldCheck,FileText,Ruler,Layers3} from 'lucide-vue-next'
import {products,categories,chinaCategories,productAliases} from '../products'
import {dimensionChecklist,technicalKind} from '../productTechnical'
import SteelViewer from '../SteelViewer.vue'
const route=useRoute()
const lang=computed(()=>route.meta.lang||'en')
const rtl=computed(()=>lang.value==='ar')
const resolvedId=computed(()=>productAliases[route.params.id]||route.params.id)
const product=computed(()=>products.find(p=>p.id===resolvedId.value))
const base=computed(()=>`/${lang.value}/`)
const activePhoto=ref(0)
watch(()=>route.params.id,()=>{activePhoto.value=0})
const img=name=>`${import.meta.env.BASE_URL}images/${name}`
const gallery=computed(()=>product.value?.gallery?.length?product.value.gallery:[product.value?.image||`steel-${product.value?.photo}.png`])
const allCats=[...chinaCategories,...categories]
const categoryName=computed(()=>{const p=product.value;return p?allCats.find(c=>c.id===(p.chinaCategory||p.category))?.[lang.value]||'':''})
const related=computed(()=>product.value?products.filter(p=>p.id!==product.value.id&&(p.chinaCategory||p.category)===(product.value.chinaCategory||product.value.category)).slice(0,3):[])
const dimensions=computed(()=>product.value?dimensionChecklist(product.value):[])
const txt={
 en:{back:'Back to catalogue',origin:'Country of origin',unknown:'To be confirmed for the manufacturer and shipment',region:'Target markets',overview:'Technical overview',dimension:'Dimensional specification checklist',dimensionDesc:'Detailed fields to confirm for a quotation. These are NOT confirmed availability ranges.',grade:'Product grade / designation',examples:'Documented or illustrative size examples',standard:'Applicable standards / references',ref:'Product reference specification',verification:'Technical verification required',warning:'The dimensions above identify what must be specified. Example sizes and 3D proportions are not certified supply ranges. Confirm the mill, grade, origin, final size tolerances, tests, current capacity and certificate before purchase.',model:'Interactive 3D model',quote:'Request technical quotation',related:'Related steel products',images:'Product photography',labels:'Technical details',none:'Confirm with supplying mill',notfound:'Product not found',reference:'Sample 3D geometry, not manufacturing CAD',referenceStatus:'Reference information only'},
 ar:{back:'العودة إلى المنتجات',origin:'بلد المنشأ',unknown:'يُحدد بعد تأكيد المصنع والشحنة',region:'الأسواق المستهدفة',overview:'ملخص المواصفات الفنية',dimension:'جدول القياسات التفصيلي',dimensionDesc:'الحقول المطلوبة لتحديد الطلبية بدقة، وليست نطاقات توفر مؤكدة.',grade:'درجة الفولاذ',examples:'مقاسات موثقة أو أمثلة توضيحية',standard:'المعايير والمراجع',ref:'تفاصيل المنتج المرجعية',verification:'التحقق الفني مطلوب',warning:'الحقول أعلاه تحدد المعلومات اللازمة للطلب؛ أمثلة المقاسات ونسب الـ3D ليست قائمة توفر معتمدة. يجب تأكيد المصنع والمنشأ والدرجة والتسامحات والفحوص وشهادة الجودة قبل الشراء.',model:'نموذج 3D تفاعلي',quote:'اطلب عرض سعر تقني',related:'منتجات مشابهة',images:'صور المنتج',labels:'البيانات الفنية',none:'يُؤكد مع المصنع',notfound:'المنتج غير موجود',reference:'مجسم توضيحي وليس مخطط CAD للتصنيع',referenceStatus:'بيانات مرجعية فقط'},
 tr:{back:'Kataloğa dön',origin:'Menşe ülke',unknown:'Üretici ve sevkiyata göre teyit edilir',region:'Hedef pazarlar',overview:'Teknik genel bakış',dimension:'Ölçü şartnamesi kontrol listesi',dimensionDesc:'Teklif için belirtilmesi gereken alanlar; stokta bulunan ölçü aralıkları değildir.',grade:'Çelik kalitesi / sınıfı',examples:'Belgeli veya temsili ölçü örnekleri',standard:'Uygulanabilir standartlar',ref:'Referans ürün bilgileri',verification:'Teknik doğrulama gerekli',warning:'Yukarıdaki ölçüler teklif için gerekli alanları belirtir. Örnek ölçüler ve 3D oranları sertifikalı stok aralıkları değildir. Fabrika, menşe, kalite, tolerans, testler ve sertifika siparişten önce doğrulanmalıdır.',model:'Etkileşimli 3D model',quote:'Teknik teklif iste',related:'Benzer ürünler',images:'Ürün fotoğrafları',labels:'Teknik detaylar',none:'Üreticiyle teyit edilir',notfound:'Ürün bulunamadı',reference:'Şematik 3D, imalat CAD modeli değildir',referenceStatus:'Yalnızca referans bilgisi'}
}
const t=computed(()=>txt[lang.value]||txt.en)
// Demo values are placeholders for layout review, NOT declared stock or supplier data.
const demoLabel = computed(() => ({en:'', ar:'', tr:''}[lang.value]||''))
const demo = value => `${demoLabel.value} · ${value}`
const origin=computed(()=>product.value?.countryOfOrigin || t.value.unknown)
const normalizedMarket=computed(()=>product.value?.targetMarkets?.join(', ') || product.value?.originMarket || t.value.none)

// Placeholder measurements follow the selected 3D shape. They are NOT availability ranges.
const demoDimensions = {
 pipe:['Ø 114.3', '6.0', 'Ø 102.3', '6,000', '16.0', '2 / 1', 'Plain ends / black finish', 'Hydrostatic / UT on request', 'Example heat 0001', 'Structural / mechanical example'],
 coil:['0.50', '0.55', '1,000', '508', '1,400', '5,000', 'Z120', 'Top 20 / primer 5 / back 7', 'Smooth / RAL 9002', 'YP 280 / TS 360 / EL 25', 'Per mill tolerance', 'Wrapped, eye-to-side'],
 sheet:['6.0', '1,500', '3,000', '211.95 (7,850 kg/m³ assumed)', 'Mill finish', 'Per mill tolerance', 'YP 250 / TS 400 / EL 20', '400 HBW only if wear-grade tested', 'Sheared edge', 'EN 10204 3.1 requested'],
 corrugated:['0.50','1,050','1,000','3,000','200','35','Z120','20 µm / RAL 7016','Trapezoidal profile example','Roofing / cladding'],
 bar:['Ø 40 / A/F 40','50 × 8','6,000','3 mm/m','Per mill tolerance','Black / bright','S235JR example','Certificate requested'],
 structural:['HEA 160 example','160 × 152','6 / 9','5','6,000','30.4 (profile-dependent)','According to applicable standard','S235JR / untreated example'],
 rebar:['16','12','1.0 / 10.0','1.58','B500B example','500 / 550 / 12 example','Bend test requested'],
 wire:['8','900 / 1,300','1,000','Low-carbon wire rod example','Certificate required','4 straps']
}
const displayDimensions=computed(()=>{
 const p=product.value
 if(!p) return []
 const kind=technicalKind(p)
 const values=demoDimensions[kind]||demoDimensions.sheet
 return dimensions.value.map((row,i)=>[row[0],row[1],demo(values[i]||'Specification to be replaced')])
})
const demoTechByShape = {
 pipe:['ASTM A106 example','OD 114.3 mm / WT 6 mm / L 6 m','UT and dimensional inspection example'],
 coil:['0.50 × 1,000 mm','Coil ID 508 mm / 5 tonnes','Z120 / RAL 9002 example'],
 sheet:['6 × 1,500 × 3,000 mm','S235JR example','Cut sheet / test certificate'],
 corrugated:['0.50 × 1,050 × 3,000 mm','35 mm rib profile example','Z120 / painted finish'],
 bar:['40 mm × 6 m','S235JR example','Straightened / bundled'],
 structural:['160 × 152 × 6,000 mm','S235JR example','Mill certificate 3.1 requested'],
 rebar:['Ø16 × 12 m','B500B example','Ribbed / bundled'],
 wire:['Ø8 mm','1 tonne/bundle example','Coiled / strapped']
}
const displayTechnicalSpecs=computed(()=>{
 const p=product.value
 if(!p) return []
 const specs=p.technicalSpecs?.length?p.technicalSpecs:[
   {label:'Reference section',value:'Dimensions'},
   {label:'Grade / finish',value:'Example'},
   {label:'Inspection',value:'Example'}
 ]
 const samples=demoTechByShape[technicalKind(p)]||demoTechByShape.sheet
 return specs.map((item,i)=>({
   label:item.label,
   value: !item.value || /^(on request|supplier confirmation required|to be confirmed|confirm with|available on request)$/i.test(String(item.value).trim())
    ? demo(samples[i % samples.length])
    : item.value
 }))
})
</script>
<template>
<main class="pd7" :dir="rtl?'rtl':'ltr'"><div class="v2-wrap pd7-wrap">
 <RouterLink :to="base+'products'" class="pd7-back"><ArrowRight v-if="rtl" :size="17"/><ArrowLeft v-else :size="17"/>{{t.back}}</RouterLink>
 <div v-if="!product" class="pd7-missing">{{t.notfound}}</div>
 <template v-else>
  <div class="pd7-title"><div><p class="pd7-kicker">PRO STEEL / PRODUCT SPECIFICATION</p><p class="pd7-path">{{categoryName}}</p><h1>{{product[lang]||product.en}}</h1><p class="pd7-grade">{{product.grade}}</p></div><div class="pd7-quote-actions">
  <RouterLink :to="base+'contact'" class="pd7-quote">
    {{ t.quote }}
    <ArrowUpRight :size="18" />
  </RouterLink>

  <RouterLink :to="base+'quote'" class="pd7-quote pd7-quote-outline">
    {{ lang === 'ar' ? 'اطلب عرض سعر' : lang === 'tr' ? 'Teklif İste' : 'Request a Quote' }}
    <ArrowUpRight :size="18" />
  </RouterLink>
</div></div>
  <section class="pd7-media"><div class="pd7-photobox"><div class="pd7-mainphoto"><img :src="img(gallery[activePhoto]||gallery[0])" :alt="product[lang]||product.en"/><span>{{t.images}}</span></div><div v-if="gallery.length>1" class="pd7-thumbs"><button v-for="(filename,i) in gallery" :key="filename" :class="{on:i===activePhoto}" @click="activePhoto=i" :aria-label="`${t.images} ${i+1}`"><img :src="img(filename)" :alt="product.en+' '+(i+1)"/></button></div></div><div class="pd7-3d"><SteelViewer :key="product.id" :product="product.model3d"/><p>{{t.reference}}</p></div></section>
  <div class="pd7-section-head"><p class="pd7-kicker">TECHNICAL DATA / 01</p><h2>{{t.overview}}</h2></div>
  <div class="pd7-summary"><div><small>{{t.origin}}</small><strong>{{origin}}</strong></div><div><small>{{t.region}}</small><strong>{{normalizedMarket}}</strong></div><div><small>{{t.grade}}</small><strong>{{product.grade||t.none}}</strong></div><div><small>{{t.examples}}</small><strong>{{product.sizes && product.sizes!=='On request' && product.sizes!=='Available on request' ? product.sizes : demo((demoDimensions[technicalKind(product)]||demoDimensions.sheet).slice(0,3).join(' / '))}}</strong></div></div>
  <section class="pd7-section"><div class="pd7-section-head"><p class="pd7-kicker">DIMENSIONS / 02</p><h2>{{t.dimension}}</h2><p>{{demoLabel}} — {{t.dimensionDesc}}</p></div><div class="pd7-table-scroll"><table class="pd7-table"><thead><tr><th>Parameter / البند</th><th>Unit / الوحدة</th><th>Specification / المطلوب</th></tr></thead><tbody><tr v-for="(row,i) in displayDimensions" :key="i"><td>{{row[0]}}</td><td>{{row[1]}}</td><td>{{row[2]}}</td></tr></tbody></table></div></section>
  <section class="pd7-section"><div class="pd7-section-head"><p class="pd7-kicker">REFERENCE DATA / 03</p><h2>{{t.ref}}</h2><p>{{demoLabel}} — replace illustrative entries with mill-approved specifications.</p></div><div class="pd7-table-scroll"><table class="pd7-table"><tbody><tr v-for="(item,i) in displayTechnicalSpecs" :key="i"><th>{{item.label}}</th><td colspan="2">{{item.value}}</td></tr></tbody></table></div></section>
  <section class="pd7-section"><div class="pd7-section-head"><p class="pd7-kicker">CERTIFICATION / 04</p><h2>{{t.standard}}</h2></div><div class="pd7-standards"><span v-for="s in product.standards||[]" :key="s">{{s}}</span><span v-if="!product.standards?.length">{{t.none}}</span></div><div class="pd7-alert"><ShieldCheck :size="22"/><div><strong>{{t.verification}}</strong><p>{{t.warning}}</p></div></div></section>
  <section v-if="related.length" class="pd7-section"><div class="pd7-section-head"><p class="pd7-kicker">PRODUCT EXPLORER / 05</p><h2>{{t.related}}</h2></div><div class="pd7-related"><RouterLink v-for="p in related" :key="p.id" :to="base+'products/'+p.id"><img :src="img(p.image||`steel-${p.photo}.png`)" :alt="p[lang]||p.en" loading="lazy"/><strong>{{p[lang]||p.en}}</strong><ArrowUpRight :size="18"/></RouterLink></div></section>
 </template>
 </div></main>
</template>
<style scoped>
.pd7{background:#0a1117;color:#ecf0f3;min-height:100vh}.pd7-wrap{padding-top:135px;padding-bottom:105px}.pd7-back{display:inline-flex;align-items:center;gap:10px;text-decoration:none;color:#d2af7b;font-size:13px}.pd7-title{display:flex;align-items:end;justify-content:space-between;gap:25px;margin:45px 0 33px}.pd7-kicker{font-size:11px;text-transform:uppercase;letter-spacing:.18em;color:#c7a067;font-weight:650}.pd7-path{color:#aab7c1;font-size:12px;margin:14px 0}.pd7-title h1{font-size:clamp(33px,4.4vw,58px);font-weight:500;letter-spacing:-.025em;line-height:1.15;max-width:950px;margin:12px 0}.pd7-grade{font-size:13px;color:#a8b5bf;line-height:1.7}.pd7-quote{display:inline-flex;align-items:center;gap:12px;padding:15px 20px;background:#c7a067;color:#101820;text-decoration:none;font-size:12px;font-weight:700;white-space:nowrap}.pd7-media{display:grid;grid-template-columns:1fr 1fr;gap:22px}.pd7-photobox,.pd7-3d{min-width:0;background:#13202a;border:1px solid #35444e;overflow:hidden}.pd7-mainphoto{position:relative}.pd7-mainphoto img{width:100%;height:460px;display:block;object-fit:contain;background:#1a2630}.pd7-mainphoto span{position:absolute;bottom:13px;left:13px;background:#0e171ed9;color:#ddbb86;padding:8px 11px;font-size:10px}.pd7-thumbs{display:flex;gap:8px;padding:10px;overflow:auto}.pd7-thumbs button{padding:3px;background:#101a22;border:1px solid #384751;cursor:pointer}.pd7-thumbs button.on{border-color:#c7a067}.pd7-thumbs img{width:75px;height:65px;object-fit:contain}.pd7-3d :deep(.ps3d){height:460px;border:0}.pd7-3d>p{font-size:11px;color:#a0afba;padding:10px 16px}.pd7-section-head{margin:70px 0 25px}.pd7-section-head h2{font-size:clamp(28px,3vw,44px);font-weight:460;margin:12px 0}.pd7-section-head>p:last-child:not(.pd7-kicker){color:#9facb7;font-size:13px}.pd7-summary{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:13px}.pd7-summary>div{background:#15232d;border:1px solid #35444e;padding:20px;min-width:0}.pd7-summary small{display:block;color:#c1a176;font-size:11px;margin-bottom:12px}.pd7-summary strong{display:block;font-size:13px;font-weight:500;line-height:1.75;overflow-wrap:anywhere}.pd7-table-scroll{overflow-x:auto;border:1px solid #34454e;background:#111e27}.pd7-table{border-collapse:collapse;width:100%;min-width:620px;text-align:start}.pd7-table th,.pd7-table td{padding:16px 18px;text-align:start;border-bottom:1px solid #2f3e48;font-size:12px;line-height:1.65;vertical-align:top}.pd7-table thead{background:#24343e;color:#e2c094}.pd7-table tbody tr:nth-child(even){background:#172530}.pd7-table td:nth-child(2){color:#cda975;white-space:nowrap}.pd7-table th{font-weight:500}.pd7-standards{display:flex;flex-wrap:wrap;gap:10px}.pd7-standards span{padding:12px 17px;background:#182733;border:1px solid #41515b;color:#d2b384;font-size:12px;line-height:1.6}.pd7-alert{display:flex;align-items:start;gap:14px;padding:24px;margin-top:23px;border:1px solid #67573f;background:#1c2428;color:#dcc49d}.pd7-alert svg{flex-shrink:0}.pd7-alert strong{font-size:13px}.pd7-alert p{font-size:12px;line-height:1.85;color:#bfc3c3;margin-bottom:0}.pd7-related{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:17px}.pd7-related a{background:#15222c;border:1px solid #34444e;color:white;text-decoration:none;padding:12px;display:flex;flex-direction:column;gap:14px}.pd7-related img{width:100%;height:190px;object-fit:contain;background:#1b2830}.pd7-related strong{font-size:13px;font-weight:500;line-height:1.5}.pd7-related svg{align-self:end;color:#c7a067}.pd7-missing{padding:100px 0}@media(max-width:1000px){.pd7-summary{grid-template-columns:repeat(2,1fr)}}@media(max-width:850px){.pd7-media{grid-template-columns:1fr}.pd7-title{flex-direction:column;align-items:start}.pd7-related{grid-template-columns:repeat(2,1fr)}}@media(max-width:560px){.pd7-wrap{padding-top:110px}.pd7-summary,.pd7-related{grid-template-columns:1fr}.pd7-mainphoto img,.pd7-3d :deep(.ps3d){height:330px}.pd7-section-head{margin-top:55px}}

.pd7-quote-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.pd7-quote-outline {
  background: transparent;
  color: #c7a067;
  border: 1px solid #c7a067;
  transition: background 0.25s ease, color 0.25s ease;
}

.pd7-quote-outline:hover {
  background: #c7a067;
  color: #101820;
}

@media (max-width: 560px) {
  .pd7-quote-actions {
    width: 100%;
  }
}

</style>
