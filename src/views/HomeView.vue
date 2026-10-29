<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { ArrowUpRight, ArrowDown, ArrowRight, ShieldCheck, Globe2, Factory, FileCheck2, MoveUpRight, ChevronRight } from 'lucide-vue-next'
import { products } from '../products'

const route = useRoute()
const lang = computed(() => route.meta.lang || 'en')
const prefix = computed(() => `/${lang.value}/`)
const link = path => prefix.value + path
const img = n => `${import.meta.env.BASE_URL}images/steel-${n}.png`
const moreImg = `${import.meta.env.BASE_URL}images/more.png`
const more1Img = `${import.meta.env.BASE_URL}images/more1.png`
const marketImg = photo =>
   `${import.meta.env.BASE_URL}images/${photo}.${photo === 'suriye' ? 'png' : 'jpg'}`
const heroImg = n =>
  `${import.meta.env.BASE_URL}images/pro-steel${n}.${n === 8 ? 'jpg' : 'png'}`


const heroSlides = [8, 31, 32, 33, 34]
const currentHero = ref(0)
const selectedMarket = ref(0)
let heroTimer = null

onMounted(() => {
  heroTimer = setInterval(() => {
    currentHero.value = (currentHero.value + 1) % heroSlides.length
  }, 3500)
})

onBeforeUnmount(() => {
  if (heroTimer) clearInterval(heroTimer)
})

const copy = {
  en: {
    eyebrow:'INTERNATIONAL STEEL TRADING  /  MARKET DEVELOPMENT',
    h1:'STEEL CONNECTS',h2:'INDUSTRIES.',heroAccent:'WE CONNECT MARKETS.',
    desc:'Connecting manufacturers with buyers, opportunities and lasting commercial relationships across international steel markets.',
    action:'Request a Quote', secondary:'Explore Our Products',scroll:'DISCOVER PRO STEEL',
    caption:'A partnership built on trust.',
    ticker:['5+ YEARS OF MARKET EXPERIENCE','DIRECT TRADING & FACILITATION','BUILT ON TRUST'],
    aboutTag:'01 / THE COMPANY',aboutTitle:'More than steel. A stronger way to trade.',aboutText:'PRO STEEL brings industrial manufacturers, suppliers and buyers together through direct steel trading and structured commercial facilitation. We value product specifications, transparent documentation and balanced contractual rights.',read:'Discover our company',
    principlesTag:'WHAT SETS US APART',principlesTitle:'Trust is not a promise. It is our process.',
    values:[['01','Product understanding','We prioritize the product specifications and requirements agreed between the parties.'],['02','Documented transactions','Clear commercial terms, formal documentation and structured coordination.'],['03','Balanced partnerships','Respect for the buyer, the manufacturer and the supplier in every engagement.']],
    marketsTag:'02 / STRATEGIC MARKET OUTLOOK',marketsTitle:'Global capabilities. Regional ambition.',marketsIntro:'Explore industrial sourcing relationships and new market opportunities.',
    
countries: [
  {
    name: 'Saudi Arabia',
    label: 'FUTURE MARKET VISION',
    text: 'Exploring partnerships around infrastructure and industrial needs in the context of Vision 2030 and preparations for 2034.',
    slug: 'saudi-arabia',
    photo: 4
  },
  {
    name: 'China',
    label: 'INDUSTRIAL SOURCING',
    text: 'Experience with product families and documented China-associated trading records.',
    slug: 'china',
    photo: 5
  },
  {
    name: 'Türkiye',
    label: 'REGIONAL INDUSTRY',
    text: 'Connecting manufacturing strength and product variety with regional commercial opportunities.',
    slug: 'turkiye',
    photo: 'turkiye'
  },
  {
    name: 'Russia',
    label: 'INDUSTRIAL MARKET OUTLOOK',
    text: 'Exploring potential opportunities across steel manufacturing, industrial materials and international commercial cooperation.',
    slug: 'russia',
    photo: 'russia'
  },
  {
    name: 'Germany',
    label: 'EUROPEAN INDUSTRIAL MARKET',
    text: 'Exploring opportunities in precision steel products, engineering industries and specialized manufacturing supply chains.',
    slug: 'germany',
    photo: 'germany'
  },
  {
    name: 'Iraq',
    label: 'REGIONAL DEVELOPMENT',
    text: 'Evaluating steel supply opportunities connected to construction, infrastructure and industrial development.',
    slug: 'iraq',
    photo: 'iraq'
  },
  {
    name: 'Lebanon',
    label: 'REGIONAL TRADE OPPORTUNITIES',
    text: 'Exploring potential steel sourcing and distribution opportunities for construction and industrial applications.',
    slug: 'lebanon',
    photo: 'lebanon'
  },
  {
    name: 'Jordan',
    label: 'EMERGING MARKET CONNECTIONS',
    text: 'Exploring regional steel trading opportunities and cooperation with manufacturers, suppliers and buyers.',
    slug: 'jordan',
    photo: 'jordan'
  },
  {
    name: 'Syria',
    label: 'RECONSTRUCTION OPPORTUNITIES',
    text: 'Exploring potential steel supply and industrial cooperation opportunities related to reconstruction and infrastructure.',
    slug: 'syria',
    photo: 'suriye'
  }
],marketLink:'Explore market vision',
    productTag:'03 / STEEL PORTFOLIO',productTitle:'Product knowledge, down to the detail.',productText:'A selection of product families reflected in our historical trade documentation. Explore technical grades, sample dimensions and schematic 3D models.',productButton:'View steel portfolio',productDetail:'Explore product',
    partnershipTag:'FOR MANUFACTURERS',partnershipTitle:'YOUR PRODUCTION.',partnershipAccent:'OUR MARKET CONNECTIONS.',partnershipText:'From commission-based cooperation to commercial representation and direct resale, we explore the structure that suits each partnership.',partnershipButton:'Discuss a partnership',bottom:'Build the next connection with PRO STEEL.'
  },
  ar: {
    eyebrow:'التجارة الدولية للحديد  /  تطوير الأسواق',
    h1:'الحديد يربط',h2:'الصناعات.',heroAccent:'ونحن نربط الأسواق.',
    desc:'نربط المصنّعين بالمشترين والفرص التجارية، ونعمل على بناء علاقات مستدامة في أسواق الحديد الدولية.',
    action:'اطلب عرض سعر', secondary:'استكشف منتجاتنا',scroll:'اكتشف PRO STEEL',caption:'شراكة أساسها الثقة.',
    ticker:['أكثر من 5 سنوات خبرة','تجارة مباشرة وتنسيق صفقات','الثقة أساس أعمالنا'],
    aboutTag:'01 / عن الشركة',aboutTitle:'أكثر من تجارة حديد. أسلوب أقوى لبناء الأعمال.',aboutText:'تجمع PRO STEEL بين المصنّعين والمورّدين والمشترين من خلال التجارة المباشرة للحديد وتنسيق الصفقات التجارية. نهتم بالمواصفات والوثائق الواضحة والحقوق التعاقدية لجميع الأطراف.',read:'تعرّف على شركتنا',
    principlesTag:'ما يميزنا',principlesTitle:'الثقة ليست مجرد وعد. إنها منهج عملنا.',
    values:[['01','فهم المنتج','نهتم بالمواصفات الفنية والمتطلبات المتفق عليها بين الأطراف.'],['02','صفقات موثقة','شروط تجارية واضحة ووثائق رسمية وتنسيق منظم.'],['03','شراكات متوازنة','نحترم حقوق المشتري والمصنّع والمورّد في كل تعاون.']],
    marketsTag:'02 / رؤيتنا للأسواق',marketsTitle:'قدرات عالمية. وطموح إقليمي.',marketsIntro:'اكتشف مصادر التوريد الصناعية والفرص التجارية المستقبلية.',
    
countries: [
  {
    name: 'السعودية',
    label: 'رؤية مستقبلية للأسواق',
    text: 'استكشاف الشراكات المتعلقة باحتياجات البنية التحتية والصناعة ضمن رؤية 2030 والتحضير لعام 2034.',
    slug: 'saudi-arabia',
    photo: 4
  },
  {
    name: 'الصين',
    label: 'مصادر التوريد الصناعي',
    text: 'خبرة بأصناف الحديد وسجلات تجارية مرتبطة بالصين ضمن الوثائق المتاحة.',
    slug: 'china',
    photo: 5
  },
  {
    name: 'تركيا',
    label: 'الصناعة الإقليمية',
    text: 'ربط قوة التصنيع وتنوع المنتجات بالفرص التجارية في الأسواق المجاورة.',
    slug: 'turkiye',
    photo: 'turkiye'
  },
  {
    name: 'روسيا',
    label: 'آفاق السوق الصناعي',
    text: 'استكشاف فرص التعاون المحتملة في صناعة الحديد والمواد الصناعية والتجارة الدولية.',
    slug: 'russia',
    photo: 'russia'
  },
  {
    name: 'ألمانيا',
    label: 'السوق الصناعي الأوروبي',
    text: 'استكشاف فرص التعاون في منتجات الحديد الدقيقة والصناعات الهندسية وسلاسل التوريد المتخصصة.',
    slug: 'germany',
    photo: 'germany'
  },
  {
    name: 'العراق',
    label: 'التطوير الإقليمي',
    text: 'دراسة فرص توريد الحديد المرتبطة بمشاريع البناء والبنية التحتية والتطوير الصناعي.',
    slug: 'iraq',
    photo: 'iraq'
  },
  {
    name: 'لبنان',
    label: 'فرص التجارة الإقليمية',
    text: 'استكشاف فرص توريد وتوزيع منتجات الحديد لقطاع البناء والتطبيقات الصناعية.',
    slug: 'lebanon',
    photo: 'lebanon'
  },
  {
    name: 'الأردن',
    label: 'توسيع العلاقات التجارية',
    text: 'استكشاف فرص تجارة الحديد الإقليمية والتعاون مع المصانع والموردين والمشترين.',
    slug: 'jordan',
    photo: 'jordan'
  },
  {
    name: 'سوريا',
    label: 'فرص إعادة الإعمار',
    text: 'استكشاف فرص توريد الحديد والتعاون الصناعي المحتملة في مشاريع إعادة الإعمار والبنية التحتية.',
    slug: 'syria',
    photo: 'suriye'
  }
],marketLink:'اكتشف رؤيتنا للسوق',
    productTag:'03 / منتجات الحديد',productTitle:'معرفة بالمنتج حتى أدق التفاصيل.',productText:'مجموعة مختارة من أصناف الحديد الواردة في مستندات تجارية سابقة، مع الدرجات والمقاسات ونماذج ثلاثية الأبعاد توضيحية.',productButton:'عرض المنتجات',productDetail:'استكشف المنتج',
    partnershipTag:'للمصنّعين',partnershipTitle:'أنتم تصنّعون.',partnershipAccent:'ونحن نفتح الأسواق.',partnershipText:'من التعاون مقابل عمولة إلى التمثيل التجاري والشراء وإعادة البيع، نبحث عن نموذج التعاون المناسب لكل شراكة.',partnershipButton:'ناقش فرصة شراكة',bottom:'لنصنع العلاقة التجارية القادمة مع PRO STEEL.'
  },
  tr: {
    eyebrow:'ULUSLARARASI ÇELİK TİCARETİ  /  PAZAR GELİŞTİRME',
    h1:'ÇELİK SEKTÖRLERİ',h2:'BİRLEŞTİRİR.',heroAccent:'BİZ PAZARLARI.',
    desc:'Çelik üreticilerini alıcılarla, yeni fırsatlarla ve uluslararası pazarlarda kalıcı ticari ilişkilerle buluşturuyoruz.',
    action:'Teklif İste', secondary:'Ürünlerimizi Keşfet',scroll:'PRO STEEL’İ KEŞFEDİN',caption:'Güven üzerine kurulu iş birlikleri.',
    ticker:['5+ YILLIK PAZAR DENEYİMİ','DOĞRUDAN TİCARET VE ARACILIK','GÜVEN TEMELİMİZDİR'],
    aboutTag:'01 / ŞİRKETİMİZ',aboutTitle:'Çelikten fazlası. Ticarette daha güçlü bir yaklaşım.',aboutText:'PRO STEEL, doğrudan çelik ticareti ve düzenli ticari koordinasyon yoluyla üreticileri, tedarikçileri ve alıcıları buluşturur. Teknik özelliklere, şeffaf belgelere ve dengeli sözleşmesel haklara önem veririz.',read:'Şirketimizi tanıyın',
    principlesTag:'BİZİ FARKLI KILAN',principlesTitle:'Güven yalnızca bir söz değil, çalışma biçimimizdir.',
    values:[['01','Ürün bilgisi','Taraflar arasında kararlaştırılan teknik gereklilikleri önceliklendiriyoruz.'],['02','Belgeli işlemler','Açık ticari koşullar, resmi belgeler ve düzenli koordinasyon.'],['03','Dengeli ortaklıklar','Alıcı, üretici ve tedarikçilerin haklarına saygı gösteriyoruz.']],
    marketsTag:'02 / STRATEJİK PAZARLAR',marketsTitle:'Küresel yetkinlik. Bölgesel vizyon.',marketsIntro:'Endüstriyel tedarik ilişkilerini ve yeni pazar fırsatlarını keşfedin.',
    
countries: [
  {
    name: 'Suudi Arabistan',
    label: 'GELECEK PAZAR VİZYONU',
    text: 'Vizyon 2030 ve 2034 hazırlıkları çerçevesinde altyapı ve sanayi gereksinimlerine ilişkin fırsatları araştırıyoruz.',
    slug: 'saudi-arabia',
    photo: 4
  },
  {
    name: 'Çin',
    label: 'ENDÜSTRİYEL TEDARİK',
    text: 'Çin bağlantılı ticari belgelerdeki ürün ailelerine ilişkin deneyim.',
    slug: 'china',
    photo: 5
  },
  {
    name: 'Türkiye',
    label: 'BÖLGESEL SANAYİ',
    text: 'Üretim kapasitesini ve ürün çeşitliliğini bölgesel ticari fırsatlarla buluşturmak.',
    slug: 'turkiye',
    photo: 'turkiye'
  },
  {
    name: 'Rusya',
    label: 'ENDÜSTRİYEL PAZAR VİZYONU',
    text: 'Çelik üretimi, endüstriyel malzemeler ve uluslararası ticari iş birliği alanlarındaki potansiyel fırsatları araştırıyoruz.',
    slug: 'russia',
    photo: 'russia'
  },
  {
    name: 'Almanya',
    label: 'AVRUPA SANAYİ PAZARI',
    text: 'Hassas çelik ürünleri, mühendislik sanayisi ve özel üretim tedarik zincirlerindeki fırsatları değerlendiriyoruz.',
    slug: 'germany',
    photo: 'germany'
  },
  {
    name: 'Irak',
    label: 'BÖLGESEL KALKINMA',
    text: 'İnşaat, altyapı ve endüstriyel gelişim alanlarında çelik tedarik fırsatlarını araştırıyoruz.',
    slug: 'iraq',
    photo: 'iraq'
  },
  {
    name: 'Lübnan',
    label: 'BÖLGESEL TİCARET FIRSATLARI',
    text: 'İnşaat ve sanayi uygulamalarına yönelik çelik tedariki ve dağıtım fırsatlarını değerlendiriyoruz.',
    slug: 'lebanon',
    photo: 'lebanon'
  },
  {
    name: 'Ürdün',
    label: 'YENİ PAZAR BAĞLANTILARI',
    text: 'Üreticiler, tedarikçiler ve alıcılarla bölgesel çelik ticareti ve iş birliği fırsatlarını araştırıyoruz.',
    slug: 'jordan',
    photo: 'jordan'
  },
  {
    name: 'Suriye',
    label: 'YENİDEN YAPILANMA FIRSATLARI',
    text: 'Yeniden yapılanma ve altyapı projeleri kapsamında potansiyel çelik tedariki ve sanayi iş birliği fırsatlarını araştırıyoruz.',
    slug: 'syria',
    photo: 'suriye'
  }
],
marketLink:'Pazar vizyonunu keşfet',
    productTag:'03 / ÇELİK ÜRÜNLERİ',productTitle:'Her ayrıntısıyla ürün bilgisi.',productText:'Geçmiş ticari belgelerde yer alan çelik ürün ailelerini, teknik kalite ve örnek ölçüleri, şematik 3D modellerle inceleyin.',productButton:'Ürünleri görüntüle',productDetail:'Ürünü keşfet',
    partnershipTag:'ÜRETİCİLER İÇİN',partnershipTitle:'SİZİN ÜRETİMİNİZ.',partnershipAccent:'BİZİM PAZAR BAĞLANTILARIMIZ.',partnershipText:'Komisyon esaslı iş birliği, ticari temsilcilik veya doğrudan alım-satım: her ortaklık için uygun modeli değerlendiriyoruz.',partnershipButton:'Ortaklığı görüşelim',bottom:'PRO STEEL ile yeni iş bağlantıları kurun.'
  }
}
const t = computed(() => copy[lang.value] || copy.en)
const market = computed(() => t.value.countries[selectedMarket.value])
</script>

<template>
  <div class="ps-home" :dir="lang==='ar'?'rtl':'ltr'">
    <section class="ps-hero">
    <div class="ps-hero-gallery" aria-hidden="true">
  <div
    v-for="(slide, i) in heroSlides"
    :key="slide"
    class="ps-hero-photo"
    :class="{ active: currentHero === i }"
    :style="{ backgroundImage: `url(${heroImg(slide)})` }"
  ></div>
</div>
      <div class="ps-hero-shade" aria-hidden="true"></div>
      <div class="ps-hero-rails" aria-hidden="true"><span></span><span></span></div>
      <div class="v2-wrap ps-hero-inner">
        <div class="ps-hero-content">
          <p class="ps-eyebrow"><i></i>{{ t.eyebrow }}</p>
          <h1><span>{{ t.h1 }}</span><span>{{ t.h2 }}</span><em>{{ t.heroAccent }}</em></h1>
          <p class="ps-hero-description">{{ t.desc }}</p>
      
<div class="ps-actions">
  <RouterLink :to="link('quote')" class="ps-primary">
    {{ t.action }}
    <ArrowUpRight :size="17" />
  </RouterLink>

  <RouterLink :to="link('products')" class="ps-secondary">
    {{ t.secondary }}
    <ArrowUpRight :size="16" />
  </RouterLink>
</div>

        </div>
        <div class="ps-hero-dots">
  <button
    v-for="(slide, i) in heroSlides"
    :key="slide"
    type="button"
    :class="{ active: currentHero === i }"
    @click="currentHero = i"
    :aria-label="`Slide ${i + 1}`"
  ></button>
</div>
        <div class="ps-hero-bottom">
          <span class="ps-hero-scroll"><ArrowDown :size="15"/>{{ t.scroll }}</span>
          <span class="ps-hero-note">{{ t.caption }}</span>
        <span class="ps-hero-number">
  {{ String(currentHero + 1).padStart(2, '0') }} / {{ String(heroSlides.length).padStart(2, '0') }}
</span>
        </div>
      </div>
    </section>

    <div class="ps-ticker"><div class="v2-wrap"><span v-for="(s,i) in t.ticker" :key="i">{{s}}<span class="ps-star">✦</span></span></div></div>

    <section class="ps-section v2-wrap ps-about reveal">
    
<div class="ps-about-photo">
 <img
  :src="moreImg"
  alt="PRO STEEL - International Steel Trading"
  loading="lazy"
/>
  <span class="ps-photo-corner">PRO STEEL / 2026</span>
</div>

      <div class="ps-about-copy"><p class="ps-tag">{{ t.aboutTag }}</p><h2>{{ t.aboutTitle }}</h2><p class="ps-body">{{ t.aboutText }}</p><RouterLink :to="link('about')" class="ps-inline-link">{{ t.read }}<ArrowUpRight :size="18"/></RouterLink></div>
    </section>

    <section class="ps-values ps-section"><div class="v2-wrap reveal"><p class="ps-tag">{{ t.principlesTag }}</p><h2>{{ t.principlesTitle }}</h2><div class="ps-values-grid"><article v-for="v in t.values" :key="v[0]"><span class="ps-value-index">{{v[0]}}</span><h3>{{v[1]}}</h3><p>{{v[2]}}</p><span class="ps-value-line"></span></article></div></div></section>

    <section class="ps-section v2-wrap ps-markets reveal"><div class="ps-section-head"><div><p class="ps-tag">{{ t.marketsTag }}</p><h2>{{ t.marketsTitle }}</h2></div><p>{{ t.marketsIntro }}</p></div><div class="ps-market-layout"><div class="ps-market-tabs"><button v-for="(m,i) in t.countries" :key="m.slug" @click="selectedMarket=i" :class="{'active':selectedMarket===i}"><span>0{{i+1}}</span><strong>{{m.name}}</strong><ArrowUpRight :size="18"/></button></div><div class="ps-market-feature" :key="market.slug"><img
  :src="typeof market.photo === 'string'
    ? marketImg(market.photo)
    : img(market.photo)"
  :alt="market.name"
  loading="lazy"
/><div class="ps-market-feature-overlay"><small>{{market.label}}</small><h3>{{market.name}}</h3><p>{{market.text}}</p><RouterLink
  :to="['saudi-arabia', 'china', 'turkiye', 'syria', 'algeria'].includes(market.slug)
    ? link('markets/' + market.slug)
    : link('markets')"
>
  {{ t.marketLink }}
  <ArrowUpRight :size="16"/>
</RouterLink></div></div></div></section>

    <section class="ps-section ps-products"><div class="v2-wrap reveal"><div class="ps-section-head"><div><p class="ps-tag">{{t.productTag}}</p><h2>{{t.productTitle}}</h2></div><p>{{t.productText}}</p></div><div class="ps-product-grid"><RouterLink v-for="p in products.slice(0,3)" :key="p.id" :to="link('products/'+p.id)" class="ps-product"><div class="ps-product-image"><img :src="img(p.id === products[0].id ? 8 : p.photo)" :alt="p[lang]" loading="lazy"/><span><ArrowUpRight :size="20"/></span></div><div class="ps-product-meta"><h3>{{p[lang]}}</h3><small>{{p.grade}}</small></div></RouterLink></div><RouterLink :to="link('products')" class="ps-inline-link">{{t.productButton}}<ArrowUpRight :size="18"/></RouterLink></div></section>

    <section class="ps-final"><div
  class="ps-final-image"
  :style="{ backgroundImage: 'url(' + more1Img + ')' }"
  aria-hidden="true"
></div><div class="v2-wrap ps-final-content reveal"><p class="ps-tag">{{t.partnershipTag}}</p><h2>{{t.partnershipTitle}}<em>{{t.partnershipAccent}}</em></h2><p>{{t.partnershipText}}</p><RouterLink :to="link('partners')" class="ps-primary">{{t.partnershipButton}}<ArrowUpRight :size="18"/></RouterLink><small>{{t.bottom}}</small></div></section>
  </div>
</template>
