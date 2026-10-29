<script setup>
import MarketsView from './views/MarketsView.vue'
import Footer from './components/Footer.vue'
import ServicesView from './views/ServicesView.vue'
import ProductsView from './views/ProductsView.vue'
import ProductDetailView from './views/ProductDetailView.vue'
import QuoteView from './views/QuoteView.vue'
import ExperienceView from './views/ExperienceView.vue'
import PartnersView from './views/PartnersView.vue'
import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import {ref,computed,watch,onMounted,onBeforeUnmount} from 'vue'
import {useRoute,useRouter,RouterLink} from 'vue-router'
import {ArrowUpRight,ArrowDown,Menu,X,Factory,Globe2,Handshake,ShieldCheck,FileText,Package,ChevronRight,Mail,Move3d} from 'lucide-vue-next'
import {products} from './products'
import SteelViewer from './SteelViewer.vue'
import {content} from './content'
const route=useRoute(),router=useRouter();const lang=computed(()=>route.meta.lang||'en');const rtl=computed(()=>lang.value==='ar');const page=computed(()=>route.meta.page||'home');const t=computed(()=>content[lang.value]);const menu=ref(false);const filter=ref('all');const scrolled=ref(false)
const labels={en:{home:'Home',about:'About Us',partners:'For Manufacturers',experience:'Experience',products:'Products',quote:'Request Quote',services:'Services',markets:'Markets',contact:'Contact',discover:'Explore',view:'View details',partner:'Become a Manufacturing Partner',buyer:'Explore Steel Products',learn:'Learn more',cta:'Start a Partnership',hero1:'YOUR STEEL.',hero2:'OUR MARKETS.',hero3:'SHARED GROWTH.',intro:'We help steel manufacturers explore markets, connect with buyers, and structure trustworthy international trade relationships.',aboutTitle:'BUILT ON TRUST. DRIVEN BY STEEL.',aboutIntro:'For more than five years, PRO STEEL has worked across the international steel trade — from direct purchases and resale to documented transaction facilitation.',partnersTitle:'YOU MANUFACTURE. WE CONNECT.',partnersIntro:'Flexible cooperation for manufacturers ready to reach new buyers. Work with us through a commission arrangement, commercial representation, or direct purchasing and resale.',experienceTitle:'EXPERIENCE THAT SPEAKS THROUGH PRODUCTS.',experienceIntro:'Our provided trade-document analysis covers these product families and routes. Figures below describe documented invoice groups, not independently verified deliveries or PRO STEEL turnover.',productsTitle:'STEEL, EXPLORED IN DETAIL.',productsIntro:'Explore product families documented in historical trade records, examine dimensions and rotate schematic 3D forms. This is not a current-stock catalogue.',servicesTitle:'TWO TRADING MODELS. MORE WAYS TO GROW.',servicesIntro:'We can trade directly or facilitate transactions between manufacturers and buyers, with scope and responsibilities defined by each agreement.',marketsTitle:'STRATEGIC MARKETS. CONNECTED AMBITIONS.',marketsIntro:'We distinguish existing documented trading connections from markets we are exploring for future partnerships.',saTitle:'SAUDI ARABIA — A LONG-TERM MARKET VISION.',saIntro:'Saudi Vision 2030, infrastructure investment and preparations for the 2034 FIFA World Cup create areas of strategic interest for steel supply discussions. These are market opportunities, not guaranteed demand or awarded contracts.',cnTitle:'CHINA — INDUSTRIAL SCALE AND PRODUCT DIVERSITY.',cnIntro:'Our supplied documentation includes China-associated purchase records for seamless, galvanized and alloy steel products linked to Turkish destinations. We aim to build on our familiarity with the range and commercial workflows.',trTitle:'TÜRKİYE — INDUSTRIAL CAPABILITY MEETS REGIONAL ACCESS.',trIntro:'Turkish steel manufacturers offer diverse product categories and regional logistical advantages. Documented invoices in the supplied material relate to commercial transactions toward Syria.',syTitle:'SYRIA — RESPONSIBLE RECONSTRUCTION OPPORTUNITIES.',syIntro:'Potential reconstruction needs encourage us to explore lawful, documented opportunities in steel sourcing and supply, subject to applicable trade requirements.',dzTitle:'ALGERIA — EXPLORING NEW SUPPLY CONNECTIONS.',dzIntro:'We are exploring opportunities to diversify industrial supply networks and build potential cooperation with Algerian producers.',contactTitle:'LET’S BUILD THE NEXT CONNECTION.',contactIntro:'Are you a manufacturer seeking market opportunities, or a buyer exploring steel sourcing? Start a business conversation.',quality:'Quality & Specifications',trust:'Transparent Documents',rights:'Balanced Commercial Rights',model1:'Commission-Based Cooperation',model2:'Commercial Representation',model3:'Direct Trading & Resale',process:'HOW WE WORK',steps:['Understand the product and target market','Explore suitable buyers and suppliers','Agree transparent commercial terms','Coordinate the documented transaction'],scope:'Illustrative engagement models. Representation or exclusivity requires a separate written agreement.',trade:'Direct International Trading',broker:'Trade Facilitation & Brokerage',china:'China',turkiye:'Türkiye',saudi:'Saudi Arabia',syria:'Syria',algeria:'Algeria',source:'Historical product records',tonnage:'Invoice-listed tonnes',cnWeight:'China-associated invoice group',trWeight:'Türkiye-to-Syria invoice group',caution:'Invoice classifications only: not evidence of completed customs clearance or independently verified company sales. Some goods may overlap between groups.',request:'REQUEST PRODUCT INFORMATION',email:'Email the company',placeholder:'Company email will be added before publishing',category:'Filter products',all:'All Products',pipes:'Pipes',profiles:'Profiles',bars:'Bars',grade:'Listed grades',sizes:'Example dimensions',model:'Interactive schematic 3D view',notCad:'Visualisation only · not a manufacturing CAD model',more:'More markets',footer:'International Steel Trading & Market Development'},ar:{home:'الرئيسية',about:'من نحن',partners:'شراكات المصانع',experience:'خبراتنا',products:'المنتجات',quote:'اطلب عرض سعر',services:'خدماتنا',markets:'الأسواق',contact:'التواصل',discover:'استكشف',view:'عرض التفاصيل',partner:'كن شريك تصنيع',buyer:'استكشف المنتجات',learn:'المزيد',cta:'ابدأ شراكة',hero1:'حديدكم.',hero2:'أسواقنا.',hero3:'نمو مشترك.',intro:'نساعد مصانع الحديد على استكشاف الأسواق والتواصل مع المشترين وتنظيم علاقات تجارية دولية موثوقة.',aboutTitle:'أساسنا الثقة. وخبرتنا الحديد.',aboutIntro:'بخبرة تتجاوز خمس سنوات، تعمل PRO STEEL في التجارة الدولية للحديد من الشراء وإعادة البيع إلى تنسيق الصفقات الرسمية.',partnersTitle:'أنتم تصنّعون. ونحن نفتح قنوات التواصل.',partnersIntro:'نماذج تعاون مرنة للمصانع الباحثة عن مشترين جدد: عمولة أو تمثيل تجاري أو شراء وإعادة بيع.',experienceTitle:'خبرة مبنية على منتجات ووثائق.',experienceIntro:'يعرض التحليل المقدم أصنافاً ومسارات تجارية من الفواتير، وليس إثباتاً مستقلاً للتسليم أو إيرادات PRO STEEL.',productsTitle:'الحديد بتفاصيله.',productsIntro:'استعرض الأصناف الواردة في السجلات السابقة ومقاساتها والنماذج التوضيحية ثلاثية الأبعاد. هذا ليس كتالوج مخزون متاح حالياً.',servicesTitle:'نموذجان للتجارة وفرص متعددة للتعاون.',servicesIntro:'نتاجر بشكل مباشر أو ننسق الصفقات بين المصانع والمشترين وفق مسؤوليات وشروط كل اتفاق.',marketsTitle:'أسواق استراتيجية وطموحات مترابطة.',marketsIntro:'نميز بين العلاقات التجارية الواردة بالمستندات وبين الأسواق التي نستكشفها مستقبلاً.',saTitle:'السعودية — رؤية طويلة الأمد.',saIntro:'تمثل رؤية السعودية 2030 ومشاريع البنية التحتية والاستعداد لكأس العالم 2034 مجالات استراتيجية لدراسة فرص توريد الحديد، دون افتراض طلبات مضمونة أو عقود قائمة.',cnTitle:'الصين — طاقة صناعية وتنوع المنتجات.',cnIntro:'تتضمن مستنداتنا فواتير شراء مرتبطة بالصين لمنتجات الحديد المتجهة إلى تركيا، تشمل أنابيب بدون لحام ومجلفنة وسبائكية.',trTitle:'تركيا — قوة التصنيع والوصول الإقليمي.',trIntro:'تتميز الصناعة التركية بتنوع المنتجات وإمكانات التوريد الإقليمي. تتضمن المستندات فواتير مرتبطة بمعاملات باتجاه سوريا.',syTitle:'سوريا — فرص إعادة الإعمار المسؤول.',syIntro:'نستكشف فرص التوريد لاحتياجات إعادة الإعمار وفق الأنظمة التجارية والقانونية والوثائق المطلوبة.',dzTitle:'الجزائر — آفاق جديدة للتعاون.',dzIntro:'نستكشف فرص تنويع مصادر التوريد وبناء علاقات مع المنتجين الجزائريين.',contactTitle:'لنصنع شراكة جديدة.',contactIntro:'هل أنت مصنع يبحث عن أسواق جديدة، أو مشترٍ يبحث عن توريد الحديد؟ تواصل معنا.',quality:'جودة ومواصفات',trust:'توثيق وشفافية',rights:'حقوق تجارية متوازنة',model1:'التعاون مقابل عمولة',model2:'التمثيل التجاري',model3:'الشراء وإعادة البيع',process:'كيف نعمل',steps:['نفهم المنتج والسوق المستهدف','نبحث عن المشترين والموردين المناسبين','نتفق على الشروط التجارية بشفافية','ننسق المعاملة والوثائق'],scope:'نماذج تعاون مقترحة؛ أي تمثيل أو حصرية يحتاج اتفاقاً مكتوباً مستقلاً.',trade:'التجارة الدولية المباشرة',broker:'الوساطة وتنسيق الصفقات',china:'الصين',turkiye:'تركيا',saudi:'السعودية',syria:'سوريا',algeria:'الجزائر',source:'سجلات منتجات سابقة',tonnage:'أطنان مذكورة بالفواتير',cnWeight:'مجموعة الفواتير المرتبطة بالصين',trWeight:'مجموعة فواتير تركيا إلى سوريا',caution:'تصنيف وثائق فقط، وليس إثبات تخليص أو مبيعات مؤكدة للشركة، وقد يوجد تداخل بين المجموعتين.',request:'استفسر عن المنتج',email:'مراسلة الشركة',placeholder:'سيُضاف بريد الشركة قبل النشر',category:'تصفية المنتجات',all:'كل المنتجات',pipes:'أنابيب',profiles:'مقاطع',bars:'قضبان',grade:'درجات الحديد المذكورة',sizes:'أمثلة المقاسات',model:'مجسم توضيحي تفاعلي',notCad:'عرض توضيحي وليس نموذج CAD للتصنيع',more:'أسواق إضافية',footer:'التجارة الدولية للحديد وتطوير الأسواق'},tr:{home:'Ana Sayfa',about:'Hakkımızda',partners:'Üretici Ortaklıkları',experience:'Deneyim',products:'Ürünler',quote:'Teklif İste',services:'Hizmetler',markets:'Pazarlar',contact:'İletişim',discover:'Keşfet',view:'Detayları gör',partner:'Üretici Ortağımız Olun',buyer:'Çelik Ürünlerini İncele',learn:'Devamını öğren',cta:'Ortaklık Başlat',hero1:'SİZİN ÇELİĞİNİZ.',hero2:'BİZİM PAZARLARIMIZ.',hero3:'ORTAK BÜYÜME.',intro:'Çelik üreticilerinin yeni pazarları keşfetmesine, alıcılarla bağlantı kurmasına ve güvenilir uluslararası ticari ilişkiler geliştirmesine yardımcı oluyoruz.',aboutTitle:'GÜVEN ÜZERİNE KURULDU. ÇELİKLE GÜÇLENDİ.',aboutIntro:'PRO STEEL, beş yılı aşkın deneyimiyle doğrudan alım-satım ve uluslararası ticari işlemlerin belgeli koordinasyonunda faaliyet gösterir.',partnersTitle:'SİZ ÜRETİN. BİZ PAZARLA BULUŞTURALIM.',partnersIntro:'Yeni alıcılara ulaşmak isteyen üreticiler için esnek iş birliği: komisyon, ticari temsilcilik veya doğrudan alım ve yeniden satış.',experienceTitle:'ÜRÜNLERE VE BELGELERE DAYANAN DENEYİM.',experienceIntro:'Sunulan belge incelemesi ürün gruplarını ve fatura rotalarını gösterir. Teslimatların bağımsız doğrulaması veya PRO STEEL cirosu değildir.',productsTitle:'ÇELİĞİ AYRINTILARIYLA KEŞFEDİN.',productsIntro:'Geçmiş ticari kayıtlardaki ürünleri, ölçüleri ve şematik 3D modelleri inceleyin. Güncel stok kataloğu değildir.',servicesTitle:'İKİ TİCARET MODELİ. DAHA ÇOK FIRSAT.',servicesIntro:'Her sözleşmeye uygun olarak doğrudan ticaret yapar veya üretici ile alıcı arasındaki işlemleri koordine ederiz.',marketsTitle:'STRATEJİK PAZARLAR. ORTAK HEDEFLER.',marketsIntro:'Belgelerde yer alan ticari bağlantılar ile gelecekte araştırdığımız pazarları ayırıyoruz.',saTitle:'SUUDİ ARABİSTAN — UZUN VADELİ PAZAR VİZYONU.',saIntro:'Vizyon 2030, altyapı yatırımları ve 2034 FIFA Dünya Kupası hazırlıkları çelik tedariği için stratejik inceleme alanları sunuyor. Garanti sipariş anlamına gelmez.',cnTitle:'ÇİN — ÜRETİM ÖLÇEĞİ VE ÜRÜN ÇEŞİTLİLİĞİ.',cnIntro:'Sunulan belgelerde Türkiye ile ilişkili Çin bağlantılı dikişsiz, galvanizli ve alaşımlı çelik alış faturaları bulunmaktadır.',trTitle:'TÜRKİYE — SANAYİ GÜCÜ VE BÖLGESEL ERİŞİM.',trIntro:'Türkiye ürün çeşitliliği ve bölgesel lojistik avantajları sunar. Belgelerde Suriye yönlü ticari faturalar bulunur.',syTitle:'SURİYE — SORUMLU YENİDEN YAPILANMA FIRSATLARI.',syIntro:'Geçerli ticari ve hukuki koşullara bağlı olarak yeniden yapılanma için gelecekteki tedarik fırsatlarını araştırıyoruz.',dzTitle:'CEZAYİR — TEDARİKTE YENİ BAĞLANTILAR.',dzIntro:'Cezayirli üreticilerle iş birliği ve kaynak çeşitliliği fırsatlarını araştırıyoruz.',contactTitle:'YENİ BİR BAĞLANTI KURALIM.',contactIntro:'Pazar arayan üretici veya çelik tedariki arayan alıcı mısınız? Bizimle iletişime geçin.',quality:'Kalite ve Teknik Özellikler',trust:'Şeffaf Belgeler',rights:'Dengeli Ticari Haklar',model1:'Komisyon Esaslı İş Birliği',model2:'Ticari Temsilcilik',model3:'Doğrudan Alım ve Satış',process:'NASIL ÇALIŞIRIZ',steps:['Ürün ve hedef pazarı anlarız','Uygun alıcı ve tedarikçileri araştırırız','Ticari koşullarda anlaşırız','Belgeli işlemi koordine ederiz'],scope:'İş birliği modelleri örnek niteliğindedir. Temsil veya münhasırlık ayrı yazılı anlaşma gerektirir.',trade:'Doğrudan Uluslararası Ticaret',broker:'Ticari Aracılık ve Koordinasyon',china:'Çin',turkiye:'Türkiye',saudi:'Suudi Arabistan',syria:'Suriye',algeria:'Cezayir',source:'Geçmiş ürün kayıtları',tonnage:'Faturalardaki ton',cnWeight:'Çin bağlantılı fatura grubu',trWeight:'Türkiye–Suriye fatura grubu',caution:'Bunlar belge sınıflandırmalarıdır; bağımsız teslim veya şirket satış kanıtı değildir. Gruplar arasında mal tekrarları olabilir.',request:'ÜRÜN BİLGİSİ İSTE',email:'E-posta gönder',placeholder:'Şirket e-postası yayın öncesi eklenecek',category:'Ürünleri filtrele',all:'Tüm ürünler',pipes:'Borular',profiles:'Profiller',bars:'Çubuklar',grade:'Belirtilen çelik kaliteleri',sizes:'Örnek ölçüler',model:'Etkileşimli şematik 3D',notCad:'Yalnızca görselleştirme · üretim CAD modeli değildir',more:'Diğer pazarlar',footer:'Uluslararası Çelik Ticareti ve Pazar Geliştirme'}}
const tx=computed(()=>labels[lang.value]);const prefix=computed(()=>`/${lang.value}/`);const img=n=>`${import.meta.env.BASE_URL}images/steel-${n}.png`;const logo=`${import.meta.env.BASE_URL}images/pro-steel-logo-cropped.png`
const menuItems=['about','partners','experience','products','services','markets','quote','contact'];const marketLinks=[['saudi-arabia','saudi',4],['china','china',5],['turkiye','turkiye',2],['syria','syria',4],['algeria','algeria',3]]
const currentProduct=computed(()=>products.find(x=>page.value==='products/:id'&&x.id===route.params.id));const visibleProducts=computed(()=>products.filter(x=>filter.value==='all'||x.category===filter.value))
function link(p){return prefix.value+(p==='home'?'':p)}
function changeLang(l){const tail=route.path.split('/').slice(2).join('/');router.push('/'+l+'/'+tail);menu.value=false}
watch(lang,l=>{document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr'},{immediate:true});watch(()=>route.fullPath,()=>{menu.value=false;filter.value='all'})
function onScroll(){scrolled.value=window.scrollY>35}
let io
onMounted(()=>{window.addEventListener('scroll',onScroll,{passive:true});onScroll();io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');io.unobserve(e.target)}}),{threshold:.08});watch(()=>route.fullPath,()=>{setTimeout(()=>document.querySelectorAll('.reveal:not(.revealed)').forEach(el=>io.observe(el)),50)},{immediate:true,flush:'post'})})
onBeforeUnmount(()=>{window.removeEventListener('scroll',onScroll);io?.disconnect()})
</script>
<template>
<div class="v2-site" :class="{'is-rtl':rtl}">
<header class="v2-header" :class="{scrolled}"><RouterLink :to="link('home')" class="v2-logo"><img :src="logo" alt="PRO STEEL"/><span>PRO <em>STEEL</em><small>INTERNATIONAL TRADING</small></span></RouterLink><nav class="v2-nav"><RouterLink v-for="p in menuItems" :key="p" :to="link(p)">{{tx[p]}}</RouterLink></nav><div class="v2-actions"><div class="v2-langs"><button v-for="l in ['en','ar','tr']" :key="l" :class="{active:l===lang}" @click="changeLang(l)">{{l.toUpperCase()}}</button></div><button class="v2-menu-btn" @click="menu=!menu"><X v-if="menu"/><Menu v-else/></button></div></header>
<nav v-if="menu" class="v2-mobile"><RouterLink v-for="p in menuItems" :key="p" :to="link(p)">{{tx[p]}}</RouterLink></nav>
<main>
<HomeView v-if="page==='home'" />
<ProductsView v-else-if="page==='products'" />
<ProductDetailView v-else-if="page==='products/:id'" />
<QuoteView v-else-if="page==='quote'" />
<PartnersView v-else-if="page==='partners'" />
<ExperienceView v-else-if="page==='experience'" />
<AboutView v-else-if="page==='about'" />

<ServicesView v-else-if="page==='services'" />
<MarketsView v-else-if="page==='markets'" />
<template v-else-if="page.startsWith('markets/')"><section class="v2-subhero v2-market-hero" :style="{'--bg':`url(${img(page.includes('china')?5:page.includes('turkiye')?2:page.includes('saudi')?4:page.includes('syria')?4:3)})`}"><div class="v2-wrap"><p class="v2-kicker">PRO STEEL / STRATEGIC MARKETS</p><h1>{{page.includes('saudi')?tx.saTitle:page.includes('china')?tx.cnTitle:page.includes('turkiye')?tx.trTitle:page.includes('syria')?tx.syTitle:tx.dzTitle}}</h1><p>{{page.includes('saudi')?tx.saIntro:page.includes('china')?tx.cnIntro:page.includes('turkiye')?tx.trIntro:page.includes('syria')?tx.syIntro:tx.dzIntro}}</p><RouterLink class="v2-btn gold" :to="link('partners')">{{tx.partner}} <ArrowUpRight/></RouterLink></div></section><section class="v2-section v2-wrap v2-split reveal"><div><p class="v2-kicker">MARKET DEVELOPMENT</p><h2>{{tx.marketsTitle}}</h2><p class="v2-copy">{{tx.marketsIntro}}</p><p class="v2-copy">{{tx.scope}}</p><RouterLink class="v2-textlink" :to="link('markets')">{{tx.more}} <ArrowUpRight/></RouterLink></div><img :src="img(5)" class="v2-feature-img" alt="Port handling steel pipes"/></section></template>
<template v-else-if="page==='contact'"><section class="v2-subhero" :style="{'--bg':`url(${img(5)})`}"><div class="v2-wrap"><p class="v2-kicker">PRO STEEL / BUSINESS DEVELOPMENT</p><h1>{{tx.contactTitle}}</h1><p>{{tx.contactIntro}}</p></div></section><section class="v2-section v2-wrap v2-split"><div><p class="v2-kicker">MANUFACTURERS & BUYERS</p><h2>{{tx.partner}}</h2><p class="v2-copy">{{tx.partnersIntro}}</p></div><div class="v2-panel v2-contact-card"><Mail :size="40"/><h3>{{tx.email}}</h3><p>{{tx.placeholder}}</p><p class="v2-small">Set a verified company email in this component before publishing; no inquiry form is currently connected.</p></div></section></template>
</main> <Footer /></div>

<a
  href="https://wa.me/905XXXXXXXXX"
  class="whatsapp-floating"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Contact PRO STEEL on WhatsApp"
  title="Contact us on WhatsApp"
>
  <svg
    viewBox="0 0 32 32"
    width="29"
    height="29"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M16 .8A15.1 15.1 0 0 0 3.1 23.7L1 31l7.5-2A15.2 15.2 0 1 0 16 .8Zm0 27.5a12.2 12.2 0 0 1-6.2-1.7l-.4-.2-4.4 1.2 1.2-4.3-.3-.4A12.2 12.2 0 1 1 16 28.3Zm6.7-9.1c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.8.2-.3.4-1 1.2-1.2 1.4-.2.2-.5.3-.9.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7.4-.6c.1-.2 0-.5 0-.7l-1.2-2.8c-.3-.7-.6-.6-.8-.6h-.7c-.3 0-.7.1-1 .5s-1.3 1.3-1.3 3.1 1.4 3.7 2 3.7 4.2 5.1c.6.4 1.1.7 1.5.9.7.4 1.4.6 1.9.8.8.2 1.5.2 2.1.1.6-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.8-.1-.2-.3-.3-.7-.5Z"/>
  </svg>
</a>

</template>

<style>
.whatsapp-floating {
  position: fixed;
  right: 25px;
  bottom: 25px;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: #25D366;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  text-decoration: none;
  box-shadow: 0 5px 22px rgba(0, 0, 0, 0.35);
  transition: transform .25s ease, box-shadow .25s ease;
}

.whatsapp-floating:hover {
  transform: translateY(-5px) scale(1.07);
  box-shadow: 0 9px 28px rgba(37, 211, 102, 0.35);
}

@media (max-width: 768px) {
  .whatsapp-floating {
    right: 16px;
    bottom: 18px;
    width: 52px;
    height: 52px;
  }
}
</style>
