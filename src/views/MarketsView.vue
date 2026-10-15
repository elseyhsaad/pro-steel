<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { ArrowUpRight, ArrowRight, Globe2, Factory, Compass, ShieldCheck, MoveUpRight, MapPinned, Network, ArrowDown } from 'lucide-vue-next'
import { worldPaths, projectCoords } from './worldPaths'

const route = useRoute()
const lang = computed(() => route.meta.lang || 'en')
const prefix = computed(() => `/${lang.value}/`)
const selected = ref('saudi-arabia')
const hovered = ref('')
const area = ref(null)
let observer

const countryData = [
  {
    id: 'saudi-arabia',
    ...projectCoords(45.08, 23.89),
    kind: 'demand',
    number: '01',
    image: 4
  },
  {
    id: 'china',
    ...projectCoords(104.19, 35.86),
    kind: 'supply',
    number: '02',
    image: 5
  },
  {
    id: 'turkiye',
    ...projectCoords(35.24, 39.06),
    kind: 'supply',
    number: '03',
    image: 2
  },
  {
    id: 'algeria',
    ...projectCoords(2.63, 28.03),
    kind: 'opportunity',
    number: '04',
    image: 3
  },
  {
    id: 'syria',
    ...projectCoords(38.99, 34.80),
    kind: 'opportunity',
    number: '05',
    image: 4
  }
]

const connections = [ ['china','turkiye'],['turkiye','saudi-arabia'],['turkiye','syria'],['algeria','saudi-arabia'] ]
const byId = id => countryData.find(c => c.id === id)
const pointPath = (a,b) => { const p=byId(a),q=byId(b); return `M${p.x} ${p.y} Q${(p.x+q.x)/2} ${Math.min(p.y,q.y)-35} ${q.x} ${q.y}` }
const img = n => `${import.meta.env.BASE_URL}images/steel-${n}.png`
const lexicon = {
 en: {
   eyebrow:'STRATEGIC MARKETS / GLOBAL OUTLOOK', heroA:'INDUSTRY HAS',heroB:'NO BORDERS.',heroC:'OPPORTUNITY HAS DIRECTION.',
   lead:'Industrial capability meets new commercial possibilities. Explore the markets shaping PRO STEEL’s international outlook.', discover:'EXPLORE THE NETWORK', label:'GLOBAL MARKET INTELLIGENCE', title:'A world of connections.', sub:'Select an illuminated country to explore its role in our market development vision.', mapNote:'ILLUSTRATIVE CONNECTIONS — NOT VERIFIED SHIPPING ROUTES',
   learn:'Explore full market perspective', partner:'Discuss a manufacturing partnership', badgeSupply:'INDUSTRIAL SOURCING',badgeDemand:'STRATEGIC DEMAND',badgeOpportunity:'EMERGING OPPORTUNITY',
   sectionTag:'TWO SIDES OF EVERY OPPORTUNITY', sectionTitle:'From manufacturing strength to market demand.',
   manufacture:'MANUFACTURING CAPABILITY',manufactureText:'Our sourcing outlook considers product specialization, technical specifications, production capability and commercial readiness.',
   reach:'MARKET ACCESS',reachText:'We explore how producers and buyers can connect through clear requirements, structured negotiations and documented commercial processes.',
   support:'COMMERCIAL TRUST',supportText:'A promising market is only the beginning. Transparent terms and balanced contractual responsibilities make a sustainable relationship possible.',
   focusTag:'OUR MARKET PRIORITY',focusTitle:'SAUDI ARABIA. A VISION WORTH PREPARING FOR.',focusText:'Infrastructure, urban development and preparations for 2034 are central to our interest in Saudi Arabia. We aim to explore how manufacturers in Türkiye, China and other production markets can respond to potential steel requirements, subject to specific projects, standards and commercial conditions.',focusButton:'Explore Saudi Arabia',
   perspectiveTag:'THE PRO STEEL PERSPECTIVE', perspectiveTitle:'Different markets. One disciplined approach.', stages:[['01','Understand demand','Identify the intended market, steel category and technical requirements.'],['02','Find the right supply','Explore manufacturers whose product capabilities align with the opportunity.'],['03','Structure the dialogue','Coordinate commercial discussions and documents under agreed terms.'],['04','Build for the long term','Support repeatable relationships rather than isolated introductions.']],
   endTag:'FOR MANUFACTURERS & BUYERS',endTitle:'YOUR NEXT MARKET CONNECTION STARTS HERE.',endText:'Talk to PRO STEEL about sourcing, representation, direct trade or a flexible market-development partnership.',endButton:'Explore cooperation models',
   countries:{
     'saudi-arabia':{name:'Saudi Arabia',status:'Strategic target market',headline:'A new chapter of industrial demand.',description:'Vision 2030, major development projects and 2034 World Cup preparations inform our long-term interest in Saudi Arabia. Our focus is on identifying concrete specifications and buyer needs, then exploring suitable producers and documented supply pathways.',tags:['Vision 2030','2034 preparations','Infrastructure & construction']},
     china:{name:'China',status:'Documented sourcing-related experience',headline:'Scale, breadth and steel expertise.',description:'The supplied historical invoice analysis includes China-associated product records covering seamless, galvanized, coated and alloy pipes as well as bars. These records inform our understanding of product diversity, commercial documentation and international sourcing workflows.',tags:['Seamless pipes','Galvanized steel','Alloy products']},
     turkiye:{name:'Türkiye',status:'Documented regional trading context',headline:'Industrial strength with regional reach.',description:'Turkish manufacturers offer important product and logistical possibilities. Historical documents supplied to us include steel pipes, profiles, angles and round bars in transactions associated with Türkiye and Syria.',tags:['Steel profiles','Round bars','Regional trade']},
     algeria:{name:'Algeria',status:'Exploratory opportunity',headline:'Another horizon for diversified supply.',description:'We are interested in assessing potential collaboration with Algerian steel producers as part of a broader effort to diversify manufacturing connections. No existing PRO STEEL contract in Algeria is implied here.',tags:['Supply diversification','Industrial cooperation','Exploration']},
     syria:{name:'Syria',status:'Reconstruction-related opportunity',headline:'Connecting supply to future rebuilding needs.',description:'Reconstruction may create demand across construction and infrastructure materials. We are exploring lawful, documented routes for potential steel supply partnerships as projects and requirements become clearer.',tags:['Reconstruction','Construction materials','Compliance']}
   }
 },
 ar: {
   eyebrow:'الأسواق الاستراتيجية / الرؤية العالمية',heroA:'الصناعة بلا',heroB:'حدود.',heroC:'والفرص تحتاج رؤية.',lead:'نربط القدرات الصناعية بإمكانيات تجارية جديدة. استكشف الأسواق التي تشكّل رؤية PRO STEEL الدولية.',discover:'استكشف الأسواق',label:'خريطة رؤيتنا للأسواق',title:'عالم من العلاقات التجارية.',sub:'اختر إحدى الدول المضيئة على الخريطة لتتعرف على دورها في رؤيتنا لتطوير الأسواق.',mapNote:'الخطوط توضيحية للرؤية التجارية وليست مسارات شحن مثبتة',learn:'استكشف تفاصيل السوق',partner:'ناقش شراكة صناعية',badgeSupply:'مصادر صناعية',badgeDemand:'سوق مستهدف',badgeOpportunity:'فرصة قيد الاستكشاف',sectionTag:'جانبان لكل فرصة',sectionTitle:'من قوة التصنيع إلى احتياجات الأسواق.',manufacture:'القدرة التصنيعية',manufactureText:'ننظر إلى تخصص المنتج والمواصفات الفنية والقدرة الإنتاجية والجاهزية التجارية عند دراسة مصادر التوريد.',reach:'الوصول إلى الأسواق',reachText:'نبحث عن سبل ربط المنتجين بالمشترين من خلال متطلبات واضحة ومفاوضات منظمة ووثائق تجارية.',support:'الثقة التجارية',supportText:'السوق الواعد ليس إلا البداية. وضوح الشروط وتوازن المسؤوليات التعاقدية يساعدان على بناء علاقات مستدامة.',focusTag:'أولويتنا الاستراتيجية',focusTitle:'السعودية. رؤية نستعد لفرصها.',focusText:'تمثل مشاريع البنية التحتية والتطوير العمراني والتحضيرات لعام 2034 محور اهتمامنا بالسوق السعودي. نهدف لاستكشاف كيفية تلبية الاحتياجات المحتملة من المصانع في تركيا والصين وغيرها، وفق المشاريع والمواصفات والشروط التجارية الفعلية.',focusButton:'اكتشف رؤية السعودية',perspectiveTag:'منهج PRO STEEL',perspectiveTitle:'أسواق مختلفة. ومنهج تجاري واحد.',stages:[['01','نفهم الطلب','نحدد السوق المستهدف ونوع الحديد والمواصفات المطلوبة.'],['02','نبحث عن مصدر مناسب','نستكشف المصانع المتوافقة قدراتها مع الفرصة التجارية.'],['03','ننظم التواصل','ننسّق النقاشات والوثائق وفق الشروط المتفق عليها.'],['04','نبني علاقات مستدامة','نسعى إلى شراكات قابلة للاستمرار لا إلى مجرد تعارف عابر.']],endTag:'للمصانع والمشترين',endTitle:'علاقتك التجارية القادمة تبدأ من هنا.',endText:'تواصل مع PRO STEEL بخصوص التوريد أو التمثيل التجاري أو الشراء المباشر أو شراكات تطوير الأسواق.',endButton:'استكشف نماذج التعاون',countries:{
 'saudi-arabia':{name:'السعودية',status:'سوق استراتيجي مستهدف',headline:'مرحلة جديدة من فرص التطوير.',description:'تشكل رؤية 2030 والمشاريع التنموية والتحضيرات لكأس العالم 2034 أساس اهتمامنا الطويل الأمد بالسعودية. نركز على فهم المواصفات واحتياجات المشترين واستكشاف المصنعين المناسبين ومسارات التوريد الموثقة.',tags:['رؤية 2030','التحضير لـ2034','البنية التحتية']},
 china:{name:'الصين',status:'خبرة في مستندات توريد مرتبطة بالصين',headline:'قدرات إنتاجية واسعة وتنوع صناعي.',description:'تتضمن الفواتير التاريخية المقدمة سجلات مرتبطة بالصين تشمل الأنابيب بدون لحام والمجلفنة والسبائكية والمطلية، إضافة إلى القضبان. تساعد هذه البيانات في فهم التنوع الصناعي وإجراءات التوريد.',tags:['أنابيب بدون لحام','حديد مجلفن','منتجات سبائكية']},
 turkiye:{name:'تركيا',status:'سجلات تجارية إقليمية موثقة',headline:'قوة صناعية ووصول إلى المنطقة.',description:'توفر الصناعة التركية فرصاً مهمة في تنوع المنتجات واللوجستيات. وتضم المستندات المقدمة أنابيب ومقاطع وزوايا وقضبان مرتبطة بتعاملات تجارية بين تركيا وسوريا.',tags:['مقاطع فولاذية','قضبان دائرية','تجارة إقليمية']},
 algeria:{name:'الجزائر',status:'فرصة قيد الاستكشاف',headline:'أفق جديد لتنويع مصادر التوريد.',description:'نطمح إلى دراسة التعاون المحتمل مع المنتجين الجزائريين ضمن رؤيتنا لتنويع علاقات التصنيع والتوريد، دون الإيحاء بوجود عقود حالية في الجزائر.',tags:['تنويع التوريد','تعاون صناعي','فرص جديدة']},
 syria:{name:'سوريا',status:'فرص مرتبطة بإعادة الإعمار',headline:'ربط التوريد باحتياجات البناء المستقبلية.',description:'قد تفتح إعادة الإعمار مجالات لتوريد مواد البناء والبنية التحتية. نستكشف فرص التعاون والتوريد الموثقة والمتوافقة مع الأنظمة القانونية مع وضوح المشاريع والاحتياجات.',tags:['إعادة الإعمار','مواد البناء','الالتزام التجاري']}
 }},
 tr: {
 eyebrow:'STRATEJİK PAZARLAR / KÜRESEL BAKIŞ',heroA:'SANAYİ SINIR',heroB:'TANIMAZ.',heroC:'FIRSATLAR YÖN İSTER.',lead:'Endüstriyel kabiliyetleri yeni ticari olanaklarla buluşturuyoruz. PRO STEEL’in uluslararası pazar vizyonunu keşfedin.',discover:'PAZARLARI KEŞFET',label:'KÜRESEL PAZAR PERSPEKTİFİ',title:'Bağlantılarla dolu bir dünya.',sub:'Aydınlatılmış ülkelerden birini seçerek pazar geliştirme vizyonumuzdaki yerini inceleyin.',mapNote:'BAĞLANTILAR TEMSİLÎDİR — DOĞRULANMIŞ SEVKİYAT ROTASI DEĞİLDİR',learn:'Pazarın detaylarını keşfet',partner:'Üretici ortaklığını görüş',badgeSupply:'ENDÜSTRİYEL TEDARİK',badgeDemand:'STRATEJİK PAZAR',badgeOpportunity:'ARAŞTIRILAN FIRSAT',sectionTag:'HER FIRSATIN İKİ YÖNÜ',sectionTitle:'Üretim gücünden pazar ihtiyacına.',manufacture:'ÜRETİM KABİLİYETİ',manufactureText:'Tedarik değerlendirmemizde ürün uzmanlığına, teknik şartnamelere, üretim kapasitesine ve ticari hazırlığa odaklanıyoruz.',reach:'PAZARA ERİŞİM',reachText:'Üretici ile alıcıları net gereksinimler, düzenli görüşmeler ve belgeli ticari işlemler üzerinden buluşturma yollarını araştırıyoruz.',support:'TİCARİ GÜVEN',supportText:'Umut vadeden bir pazar yalnızca başlangıçtır. Şeffaf koşullar ve dengeli sorumluluklar sürdürülebilir ilişkileri destekler.',focusTag:'STRATEJİK ÖNCELİĞİMİZ',focusTitle:'SUUDİ ARABİSTAN. HAZIRLIK GEREKTİREN BİR VİZYON.',focusText:'Altyapı, kentsel gelişim ve 2034 hazırlıkları Suudi Arabistan’a ilgimizin odağında. Türkiye, Çin ve diğer pazarlardaki üreticilerin olası ihtiyaçlara nasıl yanıt verebileceğini proje, standart ve ticari şartlara göre araştırıyoruz.',focusButton:'Suudi Arabistan vizyonu',perspectiveTag:'PRO STEEL YAKLAŞIMI',perspectiveTitle:'Farklı pazarlar. Disiplinli tek yaklaşım.',stages:[['01','Talebi anlarız','Hedef pazarı, ürün türünü ve teknik gereksinimleri belirleriz.'],['02','Uygun tedariki araştırırız','Fırsata uygun ürün kapasitesine sahip üreticileri araştırırız.'],['03','Görüşmeleri yapılandırırız','Ticari görüşmeleri ve belgeleri anlaşılmış koşullarla koordine ederiz.'],['04','Uzun vadeyi düşünürüz','Tek seferlik tanışmalardan ziyade kalıcı ilişkiler hedefleriz.']],endTag:'ÜRETİCİLER VE ALICILAR İÇİN',endTitle:'BİR SONRAKİ PAZAR BAĞLANTINIZ BURADA BAŞLAR.',endText:'Tedarik, temsilcilik, doğrudan ticaret ve esnek pazar geliştirme iş birlikleri için PRO STEEL ile görüşün.',endButton:'İş birliği modellerini keşfet',countries:{
 'saudi-arabia':{name:'Suudi Arabistan',status:'Stratejik hedef pazar',headline:'Yeni bir endüstriyel ihtiyaç dönemi.',description:'Vizyon 2030, büyük ölçekli gelişim projeleri ve 2034 Dünya Kupası hazırlıkları Suudi Arabistan’a uzun vadeli ilgimizi şekillendiriyor. Somut teknik gereksinimleri anlayarak uygun üreticileri ve belgeli tedarik seçeneklerini araştırıyoruz.',tags:['Vizyon 2030','2034 hazırlıkları','Altyapı ve inşaat']},
 china:{name:'Çin',status:'Belgelerde yer alan tedarik tecrübesi',headline:'Ölçek, çeşitlilik ve çelik bilgisi.',description:'Sunulan tarihî faturalar Çin bağlantılı dikişsiz, galvanizli, kaplamalı, alaşımlı boru ve çubuk ürünlerini içeriyor. Bu belgeler ürün çeşitliliği ve uluslararası tedarik süreçlerine dair anlayışımızı destekliyor.',tags:['Dikişsiz borular','Galvanizli çelik','Alaşımlı ürünler']},
 turkiye:{name:'Türkiye',status:'Belgeli bölgesel ticaret bağlamı',headline:'Bölgesel erişime sahip sanayi gücü.',description:'Türk üreticileri ürün ve lojistik açısından önemli fırsatlar sunuyor. Paylaşılan tarihî belgelerde Türkiye–Suriye yönlü boru, profil, köşebent ve çubuk işlemleri bulunuyor.',tags:['Çelik profiller','Yuvarlak çubuklar','Bölgesel ticaret']},
 algeria:{name:'Cezayir',status:'Araştırılan fırsat',headline:'Tedarik çeşitliliği için yeni ufuk.',description:'Üretim ve tedarik bağlantılarımızı çeşitlendirmek amacıyla Cezayirli üreticilerle olası iş birliğini değerlendirmek istiyoruz. Burada mevcut bir sözleşme iddia edilmiyor.',tags:['Tedarik çeşitliliği','Sanayi iş birliği','Araştırma']},
 syria:{name:'Suriye',status:'Yeniden yapılanma fırsatları',headline:'Gelecekteki yeniden inşa ihtiyaçlarına erişim.',description:'Yeniden yapılanma, inşaat ve altyapı malzemelerine talep oluşturabilir. Projeler netleştikçe yasal gereksinimlere uygun, belgeli tedarik olanaklarını araştırıyoruz.',tags:['Yeniden yapılanma','İnşaat malzemeleri','Mevzuata uyum']}
 }}
}
const t = computed(() => lexicon[lang.value] || lexicon.en)
const country = computed(() => t.value.countries[selected.value])
const badge = kind => kind === 'supply' ? t.value.badgeSupply : kind === 'demand' ? t.value.badgeDemand : t.value.badgeOpportunity
const selectedMeta = computed(() => byId(selected.value))
function activate(id) { selected.value=id }
function onMarkerKey(e,id) { if(e.key === 'Enter' || e.key === ' ') {e.preventDefault();activate(id)} }
onMounted(() => { if(!('IntersectionObserver' in window)) { area.value?.querySelectorAll('.pm-rise').forEach(el=>el.classList.add('pm-visible')); return } observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('pm-visible');observer.unobserve(e.target)}}),{threshold:.1}); area.value?.querySelectorAll('.pm-rise').forEach(el=>observer.observe(el)) })
onBeforeUnmount(()=>observer?.disconnect())
</script>

<template>
<div ref="area" class="pm" :dir="lang==='ar'?'rtl':'ltr'">
  <section class="pm-hero">
    <div class="pm-hero-grid" aria-hidden="true"></div>
    <div class="pm-hero-orb" aria-hidden="true"><Globe2 :size="255" :stroke-width="0.42"/></div>
    <div class="v2-wrap pm-hero-wrap">
      <p class="pm-eyebrow"><span></span>{{ t.eyebrow }}</p>
      <h1><span>{{t.heroA}}</span><strong>{{t.heroB}}</strong><em>{{t.heroC}}</em></h1>
      <p class="pm-lead">{{t.lead}}</p>
      <a href="#market-atlas" class="pm-button pm-button-solid">{{t.discover}} <ArrowDown :size="17"/></a>
      <div class="pm-hero-bottom"><span>PRO STEEL / GLOBAL REACH</span><span>01 — 05</span></div>
    </div>
  </section>

  <section id="market-atlas" class="pm-atlas-section">
    <div class="v2-wrap">
      <div class="pm-section-heading pm-rise"><div><p class="pm-kicker">01 / {{t.label}}</p><h2>{{t.title}}</h2></div><p>{{t.sub}}</p></div>
      <div class="pm-map-layout pm-rise">
        <div class="pm-map-shell">
          <div class="pm-map-top"><span><span class="pm-status-dot"></span> PRO STEEL / INTERACTIVE MARKET EXPLORER</span><Globe2 :size="18"/></div>
          <svg class="pm-world" viewBox="0 0 1200 510" role="img" aria-label="Interactive world map featuring Saudi Arabia, China, Türkiye, Algeria and Syria" preserveAspectRatio="xMidYMid meet">
            <defs><radialGradient id="pm-sea"><stop offset="0%" stop-color="#162c35"/><stop offset="100%" stop-color="#0b151b"/></radialGradient><filter id="pm-glow"><feGaussianBlur stdDeviation="6"/></filter></defs>
            <rect width="1200" height="510" fill="url(#pm-sea)"/>
            <g class="pm-latlines"><path v-for="y in [70,140,210,280,350,420]" :key="`h${y}`" :d="`M0 ${y}H1200`"/><path v-for="x in [120,240,360,480,600,720,840,960,1080]" :key="`v${x}`" :d="`M${x} 0V510`"/></g>
            <g class="pm-land"><path v-for="(d,i) in worldPaths" :key="i" :d="d"/></g>
            <g class="pm-connections"><path v-for="(pair,i) in connections" :key="i" :d="pointPath(...pair)"/></g>
            <g v-for="c in countryData" :key="c.id" class="pm-marker" :class="{'is-selected':selected===c.id,'is-hovered':hovered===c.id}" :transform="`translate(${c.x},${c.y})`" role="button" tabindex="0" :aria-label="`${t.countries[c.id].name}: ${t.countries[c.id].status}`" :aria-pressed="selected===c.id" @click="activate(c.id)" @keydown="onMarkerKey($event,c.id)" @mouseenter="hovered=c.id" @mouseleave="hovered=''">
              <circle class="pm-halo" r="23"/><circle class="pm-pulse" r="16"/><circle class="pm-dot-outer" r="9"/><circle class="pm-dot" r="4"/><text x="13" y="-13" class="pm-marker-label">{{t.countries[c.id].name}}</text>
              <circle r="29" fill="transparent"/>
            </g>
          </svg>
          <div class="pm-map-bottom"><span>{{t.mapNote}}</span><span>05 / MARKETS</span></div>
        </div>
        <aside class="pm-detail" :key="selected+'-'+lang">
          <div class="pm-detail-header"><span>{{selectedMeta.number}} / {{badge(selectedMeta.kind)}}</span><MapPinned :size="18"/></div>
          <div class="pm-detail-image"><img :src="img(selectedMeta.image)" :alt="country.name"/></div>
          <div class="pm-detail-body"><small>{{country.status}}</small><h3>{{country.name}}</h3><h4>{{country.headline}}</h4><p>{{country.description}}</p><div class="pm-tags"><span v-for="tag in country.tags" :key="tag">{{tag}}</span></div><RouterLink class="pm-detail-link" :to="prefix+'markets/'+selected">{{t.learn}}<ArrowUpRight :size="17"/></RouterLink></div>
        </aside>
      </div>
      <div class="pm-country-tabs pm-rise"><button v-for="c in countryData" :key="c.id" :class="{active:selected===c.id}" @click="activate(c.id)"><span>{{c.number}}</span>{{t.countries[c.id].name}}</button></div>
    </div>
  </section>

  <section class="pm-two-sides"><div class="v2-wrap"><div class="pm-section-heading pm-rise"><div><p class="pm-kicker">02 / {{t.sectionTag}}</p><h2>{{t.sectionTitle}}</h2></div></div><div class="pm-pillars"><article class="pm-rise"><Factory :size="31"/><span>01</span><h3>{{t.manufacture}}</h3><p>{{t.manufactureText}}</p></article><article class="pm-rise"><Compass :size="31"/><span>02</span><h3>{{t.reach}}</h3><p>{{t.reachText}}</p></article><article class="pm-rise"><ShieldCheck :size="31"/><span>03</span><h3>{{t.support}}</h3><p>{{t.supportText}}</p></article></div></div></section>

  <section class="pm-saudi"><div class="pm-saudi-bg" :style="{backgroundImage:`url(${img(4)})`}" aria-hidden="true"></div><div class="v2-wrap pm-saudi-content pm-rise"><span class="pm-gold-line"></span><p class="pm-kicker">03 / {{t.focusTag}}</p><h2>{{t.focusTitle}}</h2><p>{{t.focusText}}</p><RouterLink class="pm-button pm-button-solid" :to="prefix+'markets/saudi-arabia'">{{t.focusButton}} <ArrowUpRight :size="18"/></RouterLink></div><span class="pm-saudi-number">2030 <i>/</i> 2034</span></section>

  <section class="pm-method"><div class="v2-wrap"><div class="pm-section-heading pm-rise"><div><p class="pm-kicker">04 / {{t.perspectiveTag}}</p><h2>{{t.perspectiveTitle}}</h2></div></div><div class="pm-stages"><article v-for="step in t.stages" :key="step[0]" class="pm-rise"><div class="pm-stage-num">{{step[0]}}</div><div><h3>{{step[1]}}</h3><p>{{step[2]}}</p></div><ArrowUpRight :size="19"/></article></div></div></section>

  <section class="pm-end"><div class="v2-wrap pm-end-content pm-rise"><p class="pm-kicker">05 / {{t.endTag}}</p><h2>{{t.endTitle}}</h2><p>{{t.endText}}</p><RouterLink class="pm-button pm-button-solid" :to="prefix+'partners'">{{t.endButton}} <ArrowUpRight :size="17"/></RouterLink><span>PRO STEEL — BUILT ON TRUST</span></div></section>
</div>
</template>

<style scoped>
.pm{--gold:#c7a067;--ink:#0b1116;--muted:#aab6bf;background:var(--ink);color:#f1f2ef;overflow:hidden}.pm *{box-sizing:border-box}.pm-hero{position:relative;min-height:790px;height:100svh;max-height:1050px;background:radial-gradient(ellipse at 74% 40%,#24343b 0%,#101b23 45%,#091015 80%);display:flex;align-items:center;isolation:isolate}.pm-hero-grid{position:absolute;inset:0;background-image:linear-gradient(#9ca8ae0d 1px,transparent 1px),linear-gradient(90deg,#9ca8ae0d 1px,transparent 1px);background-size:95px 95px;mask-image:linear-gradient(to right,transparent,#000 35%,#000 90%,transparent)}.pm-hero-orb{position:absolute;inset:auto 9% 16% auto;color:#bc985d;opacity:.55;filter:drop-shadow(0 0 40px #be955a40);animation:pm-orbit 13s ease-in-out infinite alternate}.pm-hero-orb svg{width:min(35vw,340px);height:auto}.pm-hero-wrap{position:relative;z-index:2;padding-top:100px}.pm-eyebrow,.pm-kicker{font-size:10px;font-weight:750;letter-spacing:.22em;color:var(--gold);text-transform:uppercase}.pm-eyebrow{display:flex;gap:14px;align-items:center}.pm-eyebrow>span,.pm-gold-line{display:block;width:43px;height:1px;background:var(--gold)}.pm-hero h1{font-weight:740;letter-spacing:-.055em;font-size:clamp(55px,7.4vw,114px);line-height:.99;margin:35px 0 27px;max-width:1050px}.pm-hero h1 span,.pm-hero h1 strong,.pm-hero h1 em{display:block;font-style:normal}.pm-hero h1 strong{color:#c8a16c;font-weight:750}.pm-hero h1 em{font-size:.34em;letter-spacing:.08em;line-height:1.8;font-weight:500;color:#d4dad9;margin-top:10px}.pm-lead{font-size:clamp(15px,1.5vw,19px);line-height:1.85;color:#b5c0c5;max-width:630px;margin:0 0 35px}.pm-button{display:inline-flex;gap:25px;align-items:center;justify-content:space-between;padding:18px 24px;font-size:11px;letter-spacing:.07em;font-weight:800;min-height:56px;text-decoration:none;transition:transform .3s,background .3s}.pm-button:hover{transform:translateY(-4px)}.pm-button-solid{background:#c7a067;color:#11171a}.pm-hero-bottom{display:flex;justify-content:space-between;align-items:center;margin-top:90px;color:#96a2aa;font-size:10px;letter-spacing:.19em}.pm-atlas-section{padding:130px 0 100px;background:#0b141a;scroll-margin-top:85px}.pm-section-heading{display:flex;justify-content:space-between;align-items:end;gap:36px;margin-bottom:44px}.pm-section-heading h2{font-size:clamp(34px,4.5vw,63px);letter-spacing:-.044em;font-weight:640;line-height:1.1;margin:18px 0 0;max-width:730px}.pm-section-heading>p{max-width:350px;color:var(--muted);font-size:14px;line-height:1.9}.pm-map-layout{display:grid;grid-template-columns:minmax(0,1.68fr) minmax(320px,1fr);gap:1px;background:#32424a;border:1px solid #34444b}.pm-map-shell{min-width:0;display:flex;flex-direction:column;background:#101e25}.pm-map-top,.pm-map-bottom{display:flex;align-items:center;justify-content:space-between;gap:15px;color:#b9c7cb;padding:20px 23px;font-size:9px;letter-spacing:.12em}.pm-map-top>span{display:flex;align-items:center;gap:10px}.pm-status-dot{width:7px;height:7px;border-radius:50%;background:#c7a067;box-shadow:0 0 14px #c7a067}.pm-world{display:block;width:100%;height:auto;min-height:340px;flex:1}.pm-latlines path{fill:none;stroke:#3a535b;stroke-width:.65;opacity:.4}.pm-land path{fill:#263b40;stroke:#52656b;stroke-width:.53;opacity:.96;transition:fill .3s}.pm-connections path{fill:none;stroke:#d6b67d;stroke-width:1.65;stroke-dasharray:6 9;opacity:.8;animation:pm-dash 18s linear infinite}.pm-marker{cursor:pointer;outline:none}.pm-halo{fill:#d6b476;opacity:.1;filter:url(#pm-glow)}.pm-dot-outer{fill:#a9824a;opacity:.6}.pm-dot{fill:#ffe0a3}.pm-pulse{fill:none;stroke:#d3a66b;stroke-width:1.7;transform-origin:center;animation:pm-pulse 2.8s ease-out infinite}.pm-marker.is-selected .pm-dot{fill:#fff}.pm-marker.is-selected .pm-halo{opacity:.45}.pm-marker.is-selected .pm-dot-outer{fill:#d9ae6f}.pm-marker-label{font-size:13px;font-weight:650;fill:#e8eeee;stroke:#0b151a;stroke-width:3px;paint-order:stroke;pointer-events:none}.pm-marker.is-selected .pm-marker-label{fill:#ffe2ae}.pm-marker:focus .pm-dot-outer{stroke:#fff;stroke-width:3px}.pm-map-bottom{border-top:1px solid #304149;color:#8198a1}.pm-detail{min-width:0;background:#121c22;animation:pm-enter .42s ease both}.pm-detail-header{display:flex;justify-content:space-between;align-items:center;padding:22px 25px;color:#c9a468;font-size:10px;letter-spacing:.12em;font-weight:750}.pm-detail-image{height:195px;overflow:hidden;position:relative}.pm-detail-image img{height:100%;width:100%;object-fit:cover;filter:contrast(1.12) saturate(.75);animation:pm-image .8s both}.pm-detail-image:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,#121c22,transparent 65%)}.pm-detail-body{padding:0 26px 28px}.pm-detail-body small{font-size:10px;letter-spacing:.13em;color:#c9a468;text-transform:uppercase}.pm-detail-body h3{font-size:clamp(28px,3vw,42px);letter-spacing:-.045em;margin:9px 0 6px}.pm-detail-body h4{font-size:15px;font-weight:500;color:#e0e6e7;margin:0 0 12px}.pm-detail-body>p{line-height:1.75;color:#abb8c0;font-size:13px;max-height:185px;overflow:auto}.pm-tags{display:flex;flex-wrap:wrap;gap:6px;margin:23px 0}.pm-tags span{font-size:10px;background:#233139;border:1px solid #3e4b50;padding:7px 10px;color:#e1cfb0}.pm-detail-link{display:flex;align-items:center;justify-content:space-between;gap:12px;border-top:1px solid #394850;padding-top:19px;color:#d9b27b;font-size:12px;font-weight:750}.pm-detail-link:hover{color:#fff}.pm-country-tabs{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin-top:18px}.pm-country-tabs button{border:1px solid #39444c;background:#151f25;color:#c9d1d5;text-align:start;padding:17px 12px;font-size:12px;transition:background .3s,border-color .3s}.pm-country-tabs button span{display:block;font-size:9px;color:#bba071;margin-bottom:9px}.pm-country-tabs button:hover,.pm-country-tabs button.active{border-color:#c7a067;background:#263039}.pm-two-sides{padding:125px 0;background:#121b21}.pm-pillars{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.pm-pillars article{padding:38px 28px;min-height:285px;background:linear-gradient(150deg,#213039,#131e24);border-top:1px solid #c7a067;position:relative}.pm-pillars svg{color:#d5ad72}.pm-pillars article>span{position:absolute;top:32px;inset-inline-end:28px;color:#758991;font-size:12px}.pm-pillars h3{font-size:22px;font-weight:560;margin:38px 0 12px}.pm-pillars p{color:#aebbc2;font-size:14px;line-height:1.85}.pm-saudi{position:relative;min-height:660px;display:flex;align-items:center;isolation:isolate;background:#141b20}.pm-saudi-bg{position:absolute;inset:0;background-size:cover;background-position:center;filter:saturate(.65)}.pm-saudi:before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,#091015f5 0%,#0d161ce8 42%,#09101577 100%)}.pm-saudi-content{position:relative;z-index:2;padding:100px 0}.pm-saudi h2{font-size:clamp(36px,5.6vw,72px);max-width:900px;letter-spacing:-.04em;line-height:1.09;font-weight:670;margin:24px 0}.pm-saudi-content>p:not(.pm-kicker){max-width:670px;line-height:1.9;color:#d5dadb;font-size:16px;margin-bottom:30px}.pm-saudi-number{position:absolute;z-index:2;inset:auto 5% 22px auto;font-size:clamp(42px,7vw,95px);font-weight:800;color:#c5a16a29;white-space:nowrap;pointer-events:none}.pm-saudi-number i{font-style:normal;color:#c7a06770}.pm-method{padding:130px 0;background:#0b1116}.pm-stages{border-top:1px solid #38444b}.pm-stages article{display:grid;grid-template-columns:85px 1fr 30px;gap:22px;align-items:center;border-bottom:1px solid #38444b;padding:29px 5px}.pm-stages article>svg{color:#c7a067}.pm-stage-num{font-size:36px;color:#c7a067;font-weight:350}.pm-stages h3{font-size:20px;margin:0 0 8px}.pm-stages p{font-size:14px;color:#a8b6be;line-height:1.7;max-width:750px;margin:0}.pm-end{position:relative;padding:135px 0;text-align:center;background:radial-gradient(ellipse at center,#2b3840,#101920 65%,#090f13)}.pm-end-content{max-width:900px}.pm-end h2{font-size:clamp(39px,5.3vw,72px);font-weight:650;line-height:1.08;letter-spacing:-.045em;margin:24px auto}.pm-end-content>p:not(.pm-kicker){max-width:630px;margin:0 auto 30px;color:#b7c1c8;line-height:1.9}.pm-end-content>span{display:block;color:#7a8993;letter-spacing:.22em;font-size:9px;margin-top:65px}.pm-rise{opacity:0;transform:translateY(32px);transition:opacity .75s ease,transform .75s ease}.pm-rise.pm-visible{opacity:1;transform:none}.pm[dir=rtl] .pm-hero h1{letter-spacing:0;line-height:1.15}.pm[dir=rtl] .pm-hero h1 em{letter-spacing:0}.pm[dir=rtl] .pm-saudi:before{background:linear-gradient(270deg,#091015f5,#0d161ce8 42%,#09101577)}.pm[dir=rtl] .pm-saudi-number{inset:auto auto 22px 5%}.pm[dir=rtl] .pm-eyebrow,.pm[dir=rtl] .pm-kicker{letter-spacing:0}.pm[dir=rtl] .pm-detail-link svg,.pm[dir=rtl] .pm-button svg{transform:scaleX(-1)}@keyframes pm-pulse{0%{opacity:.9;transform:scale(.65)}70%,100%{opacity:0;transform:scale(1.65)}}@keyframes pm-dash{to{stroke-dashoffset:-300}}@keyframes pm-enter{from{opacity:.5;transform:translateY(8px)}to{opacity:1;transform:none}}@keyframes pm-image{from{transform:scale(1.08)}to{transform:scale(1)}}@keyframes pm-orbit{to{transform:translateY(-28px) rotate(-8deg)}}@media(max-width:1100px){.pm-map-layout{grid-template-columns:1fr}.pm-detail{display:grid;grid-template-columns:36% 1fr;align-items:start}.pm-detail-header{grid-column:1/-1}.pm-detail-image{height:100%;min-height:230px}.pm-detail-body{padding:10px 28px 28px}.pm-world{min-height:300px}}@media(max-width:760px){.pm-hero{min-height:620px;height:88svh}.pm-hero-orb{inset:14% 7% auto auto;opacity:.2}.pm-hero h1{font-size:clamp(44px,10vw,75px)}.pm-hero h1 em{font-size:.38em}.pm-hero-bottom{margin-top:65px}.pm-atlas-section,.pm-two-sides,.pm-method{padding:85px 0}.pm-section-heading{display:block}.pm-section-heading>p{margin-top:20px}.pm-map-top,.pm-map-bottom{font-size:8px;padding:15px}.pm-world{min-height:240px}.pm-detail{display:block}.pm-detail-image{min-height:0;height:190px}.pm-detail-body{padding:15px 22px 25px}.pm-country-tabs{grid-template-columns:repeat(2,1fr)}.pm-pillars{grid-template-columns:1fr}.pm-pillars article{min-height:unset}.pm-saudi{min-height:590px}.pm-saudi-number{font-size:44px}.pm-stages article{grid-template-columns:50px 1fr 20px;gap:12px}.pm-stage-num{font-size:27px}.pm-end{padding:90px 0}}@media(max-width:480px){.pm-marker-label{font-size:17px}.pm-country-tabs button{font-size:11px}.pm-map-bottom span:first-child{max-width:230px}.pm-hero-bottom{font-size:8px}.pm-detail-body>p{max-height:none}}@media(prefers-reduced-motion:reduce){.pm-rise{opacity:1;transform:none;transition:none}.pm-pulse,.pm-connections path,.pm-hero-orb{animation:none}.pm-detail,.pm-detail-image img{animation:none}}/* Disable animated map pulse rings */
svg circle {
    animation: none !important;
}

svg circle::before,
svg circle::after {
    animation: none !important;
}
/* Premium Geographic World Map */

.pm-map-shell {
    background: #0b1720;
}

.pm-world {
    width: 100%;
    height: auto;
    min-height: 390px;
    background: radial-gradient(
        ellipse at center,
        #18303c 0%,
        #0b1720 70%,
        #080f15 100%
    );
}

.pm-land path {
    fill: #334b55;
    stroke: #80939a;
    stroke-width: 0.55;
    stroke-linejoin: round;
    opacity: 1;
    transition:
        fill 0.3s ease,
        stroke 0.3s ease;
}

.pm-latlines path {
    stroke: #70848e;
    stroke-width: 0.5;
    opacity: 0.2;
}

.pm-marker .pm-pulse {
    display: none !important;
}

.pm-marker .pm-halo {
    display: none !important;
}

.pm-dot-outer {
    fill: #c7a067;
    opacity: 0.8;
}

.pm-dot {
    fill: #fff0c7;
}

.pm-marker-label {
    font-size: 12px;
    font-weight: 700;
    fill: #f2e7d6;
}

.pm-connections path {
    stroke: #d4ad72;
    stroke-width: 1.4;
    opacity: 0.6;
    animation: none !important;
}

@media (max-width: 640px) {
    .pm-world {
        min-height: 280px;
    }
}
</style>
