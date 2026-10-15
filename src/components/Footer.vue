<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { ArrowUpRight, ArrowUp, Globe2, Factory, Mail, ShieldCheck } from 'lucide-vue-next'

const route = useRoute()
const lang = computed(() => route.meta.lang || 'en')
const rtl = computed(() => lang.value === 'ar')
const base = computed(() => `/${lang.value}/`)
const url = (path='') => base.value + path
const logo = `${import.meta.env.BASE_URL}images/pro-steel-logo-cropped.png`
const year = new Date().getFullYear()
const copy = {
  en: {
    eyebrow:'THE NEXT CONNECTION STARTS HERE', heading:'LET’S BUILD', accent:'WHAT COMES NEXT.',
    description:'Your products deserve wider horizons. Explore new steel trading relationships with a partner focused on quality, transparent processes and long-term growth.',
    cta:'BECOME A PARTNER', cta2:'EXPLORE OUR PRODUCTS', brand:'INTERNATIONAL STEEL TRADING & MARKET DEVELOPMENT',
    tagline:'Built on trust. Driven by steel. Connecting manufacturers and buyers across markets.',
    company:'COMPANY',markets:'STRATEGIC MARKETS', business:'BUSINESS', about:'About Us',experience:'Experience',services:'Our Services',partners:'Manufacturing Partnerships',products:'Steel Products',contact:'Contact',
    saudi:'Saudi Arabia',china:'China',turkiye:'Türkiye',syria:'Syria',algeria:'Algeria',
    micro:'Trade relationships shaped by integrity.', copyright:'All rights reserved.',top:'BACK TO TOP',
    note:'Market outlooks describe areas of strategic interest, not guaranteed contracts or supply.'
  },
  ar: {
    eyebrow:'الفرصة التجارية التالية تبدأ من هنا',heading:'لنبنِ معاً',accent:'الفرصة القادمة.',
    description:'منتجاتكم تستحق أسواقاً أوسع. استكشفوا فرصاً جديدة لتجارة الحديد مع شريك يهتم بالجودة والإجراءات الواضحة والنمو طويل الأمد.',
    cta:'ابدأ شراكة معنا',cta2:'استكشف منتجات الحديد',brand:'التجارة الدولية للحديد وتطوير الأسواق',
    tagline:'أساسنا الثقة وخبرتنا الحديد. نربط المصنّعين والمشترين عبر الأسواق.',
    company:'الشركة',markets:'الأسواق الاستراتيجية',business:'الأعمال',about:'من نحن',experience:'خبراتنا',services:'خدماتنا',partners:'شراكات المصانع',products:'المنتجات',contact:'التواصل',
    saudi:'السعودية',china:'الصين',turkiye:'تركيا',syria:'سوريا',algeria:'الجزائر',
    micro:'علاقات تجارية تقوم على المصداقية.',copyright:'جميع الحقوق محفوظة.',top:'العودة للأعلى',
    note:'الأسواق المذكورة تعبّر عن توجهات استراتيجية، وليست عقوداً أو إمدادات مضمونة.'
  },
  tr: {
    eyebrow:'YENİ İŞ BAĞLANTILARI BURADA BAŞLAR',heading:'GELECEĞİ',accent:'BİRLİKTE İNŞA EDELİM.',
    description:'Ürünleriniz daha geniş pazarlara ulaşmayı hak ediyor. Kalite, şeffaf süreçler ve sürdürülebilir ilişkiler odaklı yeni çelik ticareti fırsatlarını keşfedin.',
    cta:'İŞ ORTAĞIMIZ OLUN',cta2:'ÇELİK ÜRÜNLERİNİ KEŞFEDİN',brand:'ULUSLARARASI ÇELİK TİCARETİ VE PAZAR GELİŞTİRME',
    tagline:'Güven üzerine kurulu, çelikle güçlenen. Üreticileri ve alıcıları küresel pazarlarda buluşturuyoruz.',
    company:'ŞİRKET',markets:'STRATEJİK PAZARLAR',business:'İŞ BİRLİĞİ',about:'Hakkımızda',experience:'Deneyim',services:'Hizmetlerimiz',partners:'Üretici Ortaklıkları',products:'Çelik Ürünleri',contact:'İletişim',
    saudi:'Suudi Arabistan',china:'Çin',turkiye:'Türkiye',syria:'Suriye',algeria:'Cezayir',
    micro:'Dürüstlük üzerine kurulu ticari ilişkiler.',copyright:'Tüm hakları saklıdır.',top:'YUKARI ÇIK',
    note:'Pazar değerlendirmeleri stratejik ilgi alanlarıdır; kesin sözleşme veya tedarik garantisi değildir.'
  }
}
const t = computed(() => copy[lang.value] || copy.en)
const columns = computed(() => [
  { title:t.value.company, links:[['about',t.value.about],['experience',t.value.experience],['services',t.value.services]] },
  { title:t.value.markets, links:[['markets/saudi-arabia',t.value.saudi],['markets/china',t.value.china],['markets/turkiye',t.value.turkiye],['markets/syria',t.value.syria],['markets/algeria',t.value.algeria]] },
  { title:t.value.business, links:[['partners',t.value.partners],['products',t.value.products],['contact',t.value.contact]] }
])
function backToTop(){ window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}) }
</script>

<template>
  <footer class="psf" :dir="rtl ? 'rtl' : 'ltr'">
    <div class="psf-noise" aria-hidden="true"></div>
    <div class="psf-topline"></div>
    <div class="v2-wrap psf-inner">
      <div class="psf-invite">
        <div class="psf-invite-main">
          <p class="psf-eyebrow"><span class="psf-dot"></span>{{ t.eyebrow }}</p>
          <h2>{{ t.heading }}<br><em>{{ t.accent }}</em></h2>
          <p class="psf-description">{{ t.description }}</p>
        </div>
        <div class="psf-invite-actions">
          <RouterLink :to="url('partners')" class="psf-button psf-button-primary">{{ t.cta }} <ArrowUpRight :size="19" /></RouterLink>
          <RouterLink :to="url('products')" class="psf-button psf-button-text">{{ t.cta2 }} <ArrowUpRight :size="17" /></RouterLink>
        </div>
      </div>

      <div class="psf-rule"><span>PRO STEEL <span class="psf-rule-star">✦</span> GLOBAL TRADE</span></div>

      <div class="psf-directory">
        <div class="psf-brand">
          <RouterLink :to="url()" class="psf-brand-lockup" aria-label="PRO STEEL home">
            <img :src="logo" alt="PRO STEEL logo" loading="lazy" />
            <span><b>PRO <i>STEEL</i></b><small>{{ t.brand }}</small></span>
          </RouterLink>
          <p>{{ t.tagline }}</p>
          <div class="psf-brand-pills"><span><ShieldCheck :size="14" /> {{ t.micro }}</span></div>
        </div>
        <div v-for="col in columns" :key="col.title" class="psf-link-group">
          <h3>{{ col.title }}</h3>
          <RouterLink v-for="[path,label] in col.links" :key="path" :to="url(path)">{{ label }} <ArrowUpRight :size="13" /></RouterLink>
        </div>
      </div>

      <div class="psf-giant" aria-hidden="true">PRO<span>STEEL</span><span class="psf-giant-mark">®</span></div>
      <div class="psf-bottom">
        <p>© {{ year }} PRO STEEL. {{ t.copyright }}</p>
        <p class="psf-disclaimer">{{ t.note }}</p>
        <button type="button" @click="backToTop">{{ t.top }} <ArrowUp :size="16" /></button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.psf{--gold:#c7a067;position:relative;overflow:hidden;background:#080d11;color:#f2f1ef;border-top:1px solid #374149;isolation:isolate}
.psf::before{content:"";position:absolute;inset:-260px -20% auto;height:680px;background:radial-gradient(ellipse at 54% 45%,rgba(178,138,82,.15),transparent 60%);pointer-events:none;z-index:-1}
.psf-noise{position:absolute;inset:0;opacity:.13;pointer-events:none;background-image:repeating-linear-gradient(90deg,transparent 0,transparent 99px,rgba(233,221,203,.06) 100px)}
.psf-topline{height:2px;background:linear-gradient(90deg,transparent,#c7a067 30%,#fae2b4 50%,#c7a067 70%,transparent)}
.psf-inner{position:relative;z-index:1}.psf-invite{display:flex;justify-content:space-between;gap:46px;align-items:flex-end;padding:108px 0 92px}.psf-invite-main{max-width:780px}.psf-eyebrow{font-size:11px;letter-spacing:.24em;color:#d9b984;display:flex;align-items:center;gap:12px;margin:0 0 26px;font-weight:700}.psf-dot{width:7px;height:7px;border-radius:50%;background:#c7a067;box-shadow:0 0 18px rgba(199,160,103,.9)}
.psf-invite h2{font-size:clamp(46px,6.2vw,94px);letter-spacing:-.065em;line-height:1.04;font-weight:680;margin:0 0 27px}.psf-invite h2 em{font-style:normal;color:var(--gold)}.psf-description{font-size:15px;line-height:1.9;color:#aeb8c0;max-width:540px;margin:0}.psf-invite-actions{display:flex;flex-direction:column;align-items:stretch;gap:15px;min-width:240px;padding-bottom:6px}
.psf-button{display:flex;align-items:center;justify-content:space-between;gap:20px;font-size:11px;letter-spacing:.09em;font-weight:750;transition:transform .3s,background .3s,color .3s}.psf-button:hover{transform:translateY(-4px)}.psf-button-primary{padding:21px;background:#c7a067;color:#0b1115}.psf-button-primary:hover{background:#ebc58d}.psf-button-text{padding:12px 0;border-bottom:1px solid #5e6260;color:#eee6da}.psf-button-text:hover{color:#c7a067}
.psf-rule{display:flex;align-items:center;gap:22px;color:#82909b;font-size:9px;letter-spacing:.22em;white-space:nowrap}.psf-rule::before,.psf-rule::after{content:"";height:1px;background:linear-gradient(90deg,#4a5258,#212c34);flex:1}.psf-rule-star{color:#c7a067;margin:0 9px}
.psf-directory{display:grid;grid-template-columns:2.25fr 1fr 1.15fr 1fr;gap:38px;padding:82px 0 95px}.psf-brand-lockup{display:inline-flex;align-items:center;gap:16px}.psf-brand-lockup img{width:65px;height:65px;object-fit:contain}.psf-brand-lockup b{font-size:30px;letter-spacing:.03em;display:block;line-height:1;font-weight:900}.psf-brand-lockup i{color:#c7a067;font-style:normal}.psf-brand-lockup small{display:block;max-width:230px;margin-top:10px;font-size:8px;line-height:1.6;letter-spacing:.18em;color:#9eabb5}.psf-brand>p{max-width:280px;font-size:13px;line-height:1.9;color:#a4afb7;margin:29px 0}.psf-brand-pills span{display:flex;align-items:center;gap:10px;color:#d2bc97;font-size:11px;max-width:280px}.psf-link-group{display:flex;flex-direction:column;align-items:flex-start;gap:14px}.psf-link-group h3{font-size:10px;letter-spacing:.22em;color:#c7a067;margin:8px 0 15px}.psf-link-group a{font-size:13px;color:#aeb7bd;display:inline-flex;align-items:center;gap:7px;transition:color .22s,transform .22s}.psf-link-group a svg{opacity:0;transform:translate(-4px,4px);transition:opacity .2s,transform .2s}.psf-link-group a:hover{color:#f4d5a5;transform:translateX(2px)}.psf-link-group a:hover svg{opacity:1;transform:none}
.psf-giant{font-weight:900;font-size:clamp(65px,17.2vw,240px);line-height:.77;letter-spacing:-.095em;color:rgba(224,230,233,.08);white-space:nowrap;text-align:center;user-select:none;padding:0 0 28px}.psf-giant span:first-child{color:rgba(199,160,103,.12)}.psf-giant-mark{font-size:.10em;letter-spacing:0;vertical-align:top;margin-left:12px}
.psf-bottom{min-height:90px;border-top:1px solid #26313a;display:flex;align-items:center;justify-content:space-between;gap:20px;color:#83909a;font-size:11px}.psf-bottom p{margin:0}.psf-disclaimer{max-width:420px;line-height:1.5}.psf-bottom button{background:none;border:0;color:#d4ae78;display:inline-flex;align-items:center;gap:10px;letter-spacing:.1em;font-size:10px;font-weight:700;white-space:nowrap}.psf-bottom button:hover{color:#fff}
[dir="rtl"] .psf-eyebrow,[dir="rtl"] .psf-invite h2,[dir="rtl"] .psf-button{letter-spacing:0}[dir="rtl"] .psf-invite h2{line-height:1.3}[dir="rtl"] .psf-link-group a:hover{transform:translateX(-2px)}
@media(max-width:1050px){.psf-invite{align-items:flex-start;flex-direction:column;gap:34px}.psf-invite-actions{flex-direction:row;align-items:center}.psf-directory{grid-template-columns:2fr 1fr 1fr;gap:34px}.psf-brand{grid-column:span 3}.psf-brand>p{max-width:470px}}
@media(max-width:650px){.psf-invite{padding:77px 0 63px}.psf-invite h2{font-size:clamp(43px,12vw,65px)}.psf-description{font-size:14px}.psf-invite-actions{width:100%;flex-direction:column;align-items:stretch}.psf-directory{grid-template-columns:repeat(2,minmax(0,1fr));padding:55px 0 65px;gap:35px 20px}.psf-brand{grid-column:span 2}.psf-link-group h3{line-height:1.6}.psf-link-group a{font-size:12px}.psf-giant{font-size:17vw;padding-bottom:19px}.psf-bottom{align-items:flex-start;flex-wrap:wrap;padding:24px 0 30px;gap:15px}.psf-disclaimer{order:3;width:100%}.psf-eyebrow{letter-spacing:.12em;font-size:10px}.psf-brand-lockup img{width:55px;height:55px}.psf-brand-lockup b{font-size:25px}}
@media(prefers-reduced-motion:reduce){.psf *, .psf *::before,.psf *::after{transition:none!important}}
</style>
