<script setup>

import { computed, ref, onMounted, onBeforeUnmount } from 'vue'

import { useRoute, RouterLink } from 'vue-router'

import { ArrowUpRight, ArrowDown, ShieldCheck, FileCheck2, Handshake, Globe2 } from 'lucide-vue-next'

const route = useRoute()

const lang = computed(() => route.meta.lang || 'en')

const image = (n) => `${import.meta.env.BASE_URL}images/steel-${n}.png`

const aboutImage = `${import.meta.env.BASE_URL}images/aboutus1.png`

const link = (path) => `/${lang.value}/${path}`

const copy = {

  en: {

    eyebrow: 'THE COMPANY / OUR STORY', headline: 'MORE THAN STEEL. A COMMITMENT TO TRUST.',

    lead: 'We build commercial connections between steel manufacturers, suppliers and buyers across borders.',

    storyLabel: '01 / WHO WE ARE', storyTitle: 'A BRIDGE BETWEEN PRODUCTION AND OPPORTUNITY.',

    story1: 'Founded on two decades of steel-market experience, PRO STEEL brings a considered approach to international sourcing, technical product understanding and commercial relationships.',

    story2: 'Our work spans direct steel purchasing and resale, as well as introducing manufacturers to potential buyers and helping coordinate commercial negotiations and documentation. We believe long-term business grows from clarity, mutual respect and reliability.',

    quoteLabel: 'OUR PHILOSOPHY', quote: 'Our reputation is not just our history. It is the standard behind every transaction.',

    pillarsLabel: ' OUR APPROACH', pillarsTitle: 'A CLEARER WAY TO TRADE.',

    pillars: [

      ['Quality & Specifications','We focus on understanding buyer requirements and agreed technical specifications before a transaction progresses.'],

      ['Documented Transactions','We encourage clearly documented commercial terms, responsibilities and procedures.'],

      ['Balanced Commercial Interests','We value fair, sustainable relationships with both manufacturers and buyers.']

    ],

    missionLabel: '03 / PURPOSE & AMBITION', missionTitle: 'CONNECTING INDUSTRY TO NEW MARKETS.',

    mission: 'Our mission is to make international steel trade more accessible through product knowledge, market connections and structured commercial coordination.',

    vision: 'Our vision is to strengthen relationships among production markets including China and Türkiye, explore potential supply links with Algeria, and develop future opportunities in markets such as Saudi Arabia and Syria.',

    missionHeading: 'OUR MISSION', visionHeading: 'OUR VISION', closingTitle: 'LET’S BUILD A COMMERCIAL CONNECTION.', closingText: 'Tell us the steel products, grades, sizes and quantities you need. Build your request and send it to our team in a few steps.', closingButton: 'REQUEST A QUOTE'

  },

  ar: {

    eyebrow: 'الشركة / قصتنا', headline: 'أكثر من تجارة الحديد. التزام مستمر بالثقة.',

    lead: 'نبني جسوراً تجارية تربط مصانع الحديد والمورّدين بالمشترين عبر الحدود.',

    storyLabel: '01 / من نحن', storyTitle: 'جسر بين الإنتاج والفرص التجارية.',

    story1: 'تمتد خبرتنا في أسواق الحديد لعشرين عاماً، ونوظف معرفتنا بالمنتجات والمواصفات والعلاقات التجارية لبناء قنوات توريد وتعاون دولية أكثر وضوحاً.',

    story2: 'يشمل عملنا شراء الحديد وإعادة بيعه بشكل مباشر، بالإضافة إلى تعريف المصنّعين بالمشترين المحتملين وتنسيق المفاوضات والوثائق التجارية. نؤمن بأن العلاقات طويلة الأمد تقوم على الوضوح والاحترام المتبادل والموثوقية.',

    quoteLabel: 'فلسفتنا', quote: 'سمعتنا ليست مجرد تاريخنا، بل المعيار الذي نلتزم به في كل صفقة.',

    pillarsLabel: ' نهج عملنا', pillarsTitle: 'طريقة أوضح للتجارة.',

    pillars: [

      ['الجودة والمواصفات','نهتم بفهم متطلبات المشتري والمواصفات الفنية المتفق عليها قبل متابعة الصفقة.'],

      ['المعاملات الموثقة','نعمل على وضوح الشروط التجارية والمسؤوليات والإجراءات وتوثيقها.'],

      ['توازن المصالح التجارية','نثمّن العلاقات العادلة والمستدامة مع المصنّعين والمشترين على حد سواء.']

    ],

    missionLabel: '03 / رسالتنا وطموحنا', missionTitle: 'نربط الصناعة بأسواق جديدة.',

    mission: 'رسالتنا تسهيل تجارة الحديد الدولية بالاعتماد على فهم المنتجات والعلاقات السوقية والتنسيق التجاري المنظّم.',

    vision: 'رؤيتنا تعزيز الروابط مع أسواق الإنتاج مثل الصين وتركيا، واستكشاف فرص التوريد في الجزائر، وتطوير فرص مستقبلية في أسواق مثل السعودية وسوريا.',

    missionHeading: 'رسالتنا', visionHeading: 'رؤيتنا', closingTitle: 'لنبدأ علاقة تجارية جديدة.', closingText: 'اختر منتجات الحديد والمقاسات والكميات المطلوبة، وجهّز طلبك وأرسله إلينا مباشرة.', closingButton: 'اطلب عرض سعر الآن'

  },

  tr: {

    eyebrow: 'ŞİRKET / HİKÂYEMİZ', headline: 'ÇELİKTEN DAHA FAZLASI. GÜVENE BAĞLILIK.',

    lead: 'Çelik üreticileri, tedarikçiler ve alıcılar arasında sınır ötesi ticari bağlar kuruyoruz.',

    storyLabel: '01 / HAKKIMIZDA', storyTitle: 'ÜRETİM İLE FIRSATLAR ARASINDA BİR KÖPRÜ.',

    story1: 'PRO STEEL, çelik pazarlarında yirmi yıllık deneyimini teknik ürün bilgisi, uluslararası tedarik ve güvene dayalı ticari ilişkilerle birleştirir.',

    story2: 'Faaliyetlerimiz, doğrudan çelik alım-satımının yanı sıra üreticileri potansiyel alıcılarla tanıştırmayı ve ticari görüşmeler ile belgelerin koordinasyonunu da kapsar. Uzun vadeli iş ilişkilerinin açıklık, karşılıklı saygı ve güvenilirlikle geliştiğine inanıyoruz.',

    quoteLabel: 'FELSEFEMİZ', quote: 'İtibarımız yalnızca geçmişimiz değil, her işlemde benimsediğimiz standarttır.',

    pillarsLabel: ' YAKLAŞIMIMIZ', pillarsTitle: 'DAHA ŞEFFAF BİR TİCARET YAKLAŞIMI.',

    pillars: [

      ['Kalite ve Teknik Özellikler','İşlem ilerlemeden önce alıcı taleplerini ve üzerinde anlaşılan teknik şartları anlamaya odaklanırız.'],

      ['Belgeli İşlemler','Ticari koşulların, sorumlulukların ve süreçlerin açıkça belgelenmesini önemseriz.'],

      ['Dengeli Ticari İlişkiler','Üreticiler ve alıcılarla adil, sürdürülebilir ilişkilere değer veririz.']

    ],

    missionLabel: '03 / AMAÇ VE HEDEFLER', missionTitle: 'SANAYİYİ YENİ PAZARLARLA BULUŞTURUYORUZ.',

    mission: 'Misyonumuz; ürün bilgisi, pazar bağlantıları ve düzenli ticari koordinasyonla uluslararası çelik ticaretini kolaylaştırmaktır.',

    vision: 'Vizyonumuz, Çin ve Türkiye gibi üretim pazarlarıyla ilişkileri güçlendirmek, Cezayir’deki potansiyel tedarik bağlantılarını araştırmak ve Suudi Arabistan ile Suriye gibi pazarlarda geleceğe yönelik fırsatlar geliştirmektir.',

    missionHeading: 'MİSYONUMUZ', visionHeading: 'VİZYONUMUZ', closingTitle: 'YENİ BİR TİCARİ BAĞ KURALIM.', closingText: 'İhtiyacınız olan çelik ürünlerini, ölçüleri ve miktarları seçin; teklif talebinizi birkaç adımda bize iletin.', closingButton: 'HEMEN TEKLİF İSTE'

  }

}

const c = computed(() => copy[lang.value])

const icons = [ShieldCheck, FileCheck2, Handshake]

const currentPillar = ref(0)

const editorial = computed(() => ({

 en: { index:'WHO WE ARE', side:'INDEPENDENT THINKING. INTERNATIONAL REACH.', years:'YEARS IN STEEL MARKETS', experience:'SINCE 2006 / 20 YEARS OF EXPERIENCE', focus:'WHAT GUIDES US', method:'HOW WE THINK', chapter:'THE PRO STEEL METHOD', chapterText:'Every commercial relationship begins with understanding the product, clarifying expectations, and respecting the interests of everyone involved.', numbers:['KNOW THE PRODUCT','DEFINE THE TERMS','BUILD THE RELATIONSHIP'], explore:'EXPLORE OUR APPROACH', next:'OUR NEXT CHAPTER' },

 ar: { index:'من نحن', side:'تفكير مستقل. وحضور تجاري دولي.', years:'سنوات خبرة في أسواق الحديد', experience:'منذ 2006 / عشرون عاماً من الخبرة', focus:'ما الذي يوجهنا', method:'كيف نفكر', chapter:'منهج PRO STEEL', chapterText:'تبدأ كل علاقة تجارية بفهم المنتج، وتوضيح التوقعات، واحترام مصالح جميع الأطراف.', numbers:['نفهم المنتج','نحدد الشروط','نبني العلاقة'], explore:'اكتشف منهجنا', next:'الفصل القادم' },

 tr: { index:'HAKKIMIZDA', side:'BAĞIMSIZ BAKIŞ. ULUSLARARASI ERİŞİM.', years:'ÇELİK PAZARLARINDA YIL', experience:'2006’DAN BERİ / 20 YILLIK DENEYİM', focus:'BİZE YÖN VERENLER', method:'NASIL DÜŞÜNÜYORUZ', chapter:'PRO STEEL YAKLAŞIMI', chapterText:'Her ticari ilişki, ürünü anlamak, beklentileri netleştirmek ve tüm tarafların çıkarlarına saygı göstermekle başlar.', numbers:['ÜRÜNÜ ANLA','KOŞULLARI BELİRLE','İLİŞKİYİ KUR'], explore:'YAKLAŞIMIMIZI KEŞFEDİN', next:'SONRAKİ BÖLÜM' }

})[lang.value])

let observer

onMounted(() => {

if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.a4-animate').forEach(el => el.classList.add('a4-visible'))
    return
  }

  observer = new IntersectionObserver(entries => entries.forEach(entry => {

    if (entry.isIntersecting) { entry.target.classList.add('a4-visible'); observer.unobserve(entry.target) }

  }), { threshold: 0.12 })

  document.querySelectorAll('.a4-animate').forEach(el => observer.observe(el))

})

onBeforeUnmount(() => observer?.disconnect())

</script>

<template>

  <div class="a4-page" :dir="lang === 'ar' ? 'rtl' : 'ltr'">

    <section class="a4-intro">

      <div class="a4-grain" aria-hidden="true"></div>

      <div class="a4-intro-layout">

        <div class="a4-intro-copy">

          <p class="a4-overline"><span class="a4-rule"></span> PRO STEEL / {{ editorial.index }}</p>

          <p class="a4-edition">{{ editorial.experience }}</p>

          <h1>{{ c.headline }}</h1>

          <p class="a4-lead">{{ c.lead }}</p>

          <a class="a4-scroll-link" href="#a4-story">{{ editorial.explore }} <ArrowDown :size="17" /></a>

        </div>

        <div class="a4-portrait">

          <div class="a4-portrait-inner"><img :src="aboutImage" alt="PRO STEEL industrial steel operations" /></div>

          <span class="a4-photo-stamp">PRO STEEL / INDUSTRY</span>

          <span class="a4-vertical-mark">{{ editorial.side }}</span>

        </div>

      </div>

      <div class="a4-intro-footer v2-wrap"><span></span><span>{{ editorial.side }}</span></div>

    </section>

    <section id="a4-story" class="a4-story v2-wrap">

      <div class="a4-story-index a4-animate"><p class="a4-label">{{ c.storyLabel }}</p><div class="a4-years"><strong>20<span>+</span></strong><span>{{ editorial.years }}</span></div></div>

      <div class="a4-story-content a4-animate"><h2>{{ c.storyTitle }}</h2><p>{{ c.story1 }}</p><p>{{ c.story2 }}</p></div>

    </section>

    <section class="a4-statement">

      <div class="a4-statement-bg" :style="{ backgroundImage: 'url(' + image(5) + ')' }" aria-hidden="true"></div>

      <div class="v2-wrap a4-statement-inside a4-animate">

        <p class="a4-label">{{ c.quoteLabel }}</p>

        <blockquote>“{{ c.quote }}”</blockquote>

        <p class="a4-signature">— PRO STEEL</p>

      </div>

    </section>

    <section class="a4-method v2-wrap">

      <div class="a4-method-top a4-animate"><div><p class="a4-label">{{ c.pillarsLabel }}</p><h2>{{ c.pillarsTitle }}</h2></div><p>{{ editorial.chapterText }}</p></div>

      <div class="a4-method-layout">

        <div class="a4-method-selector" role="tablist" :aria-label="editorial.focus">

          <button v-for="(pillar,i) in c.pillars" :key="i" class="a4-method-tab" role="tab" :aria-selected="currentPillar===i" :class="{selected:currentPillar===i}" @click="currentPillar=i">

            <span>0{{ i+1 }}</span><strong>{{ pillar[0] }}</strong><ArrowUpRight :size="19" />

          </button>

        </div>

        <div class="a4-method-display" role="tabpanel" :key="currentPillar">

          <div class="a4-method-icon"><component :is="icons[currentPillar]" :size="40" :stroke-width="1.2" /></div>

          <p class="a4-label">{{ editorial.method }} / 0{{ currentPillar+1 }}</p>

          <h3>{{ c.pillars[currentPillar][0] }}</h3>

          <p>{{ c.pillars[currentPillar][1] }}</p>

          <span class="a4-method-number">0{{ currentPillar+1 }}</span>

        </div>

      </div>

    </section>

    <section class="a4-direction">

      <div class="v2-wrap a4-direction-content">

        <div class="a4-direction-intro a4-animate"><p class="a4-label">{{ c.missionLabel }}</p><h2>{{ c.missionTitle }}</h2></div>

        <div class="a4-direction-panels">

          <article class="a4-animate"><span> {{ c.missionHeading }}</span><h3>{{ c.missionHeading }}</h3><p>{{ c.mission }}</p></article>

          <article class="a4-animate"><span> {{ c.visionHeading }}</span><h3>{{ c.visionHeading }}</h3><p>{{ c.vision }}</p></article>

        </div>

      </div>

    </section>

    <section class="a4-end v2-wrap a4-animate">

      <p class="a4-label">{{ editorial.next }} / PRO STEEL</p>

      <h2>{{ c.closingTitle }}</h2>

      <p>{{ c.closingText }}</p>

      <RouterLink :to="link('quote')" class="a4-cta">{{ c.closingButton }} <ArrowUpRight :size="19" /></RouterLink>

    </section>

  </div>

</template>

<style scoped>
.a4-page { --gold:#c7a067; --muted:#abb8c1; background:#0b1218; color:#eff1f2; overflow-x:clip; }
.a4-page * { box-sizing:border-box; }
.a4-page h1,.a4-page h2,.a4-page h3,.a4-page p { margin-top:0; }
.a4-page a { text-decoration:none; }
.a4-page button { font:inherit; cursor:pointer; }
.a4-overline,.a4-label { font-size:11px; font-weight:700; letter-spacing:.17em; color:var(--gold); text-transform:uppercase; }
.a4-page[dir="rtl"] .a4-overline,.a4-page[dir="rtl"] .a4-label { letter-spacing:0; }
.a4-intro { position:relative; isolation:isolate; min-height:740px; padding:126px 0 30px; background:radial-gradient(ellipse at 80% 30%,rgba(199,160,103,.12),transparent 47%),linear-gradient(115deg,#111c24,#0a1016 60%,#14222c); }
.a4-grain { position:absolute; inset:0; pointer-events:none; opacity:.3; background-image:linear-gradient(90deg,transparent 99%,rgba(199,160,103,.16) 100%); background-size:100px 100px; }
.a4-intro-layout { position:relative; z-index:1; width:min(1240px,calc(100% - 100px)); margin:0 auto; display:grid; grid-template-columns:minmax(0,1.04fr) minmax(0,.96fr); align-items:center; gap:clamp(30px,4vw,70px); }
.a4-intro-copy,.a4-portrait { min-width:0; }
.a4-intro-copy { padding-block:30px; }
.a4-overline { display:flex; align-items:center; gap:14px; margin:0 0 30px; }
.a4-rule { display:inline-block; width:32px; height:1px; background:var(--gold); flex-shrink:0; }
.a4-edition { display:inline-block; margin:0 0 23px; color:#e1bd82; font-size:11px; font-weight:650; letter-spacing:.11em; }
.a4-intro h1 { margin:0 0 25px; max-width:650px; font-size:clamp(35px,4.2vw,66px); font-weight:650; line-height:1.12; letter-spacing:-.045em; overflow-wrap:normal; }
.a4-lead { max-width:530px; color:#bac5cb; font-size:clamp(14px,1.3vw,17px); line-height:1.85; }
.a4-scroll-link { display:inline-flex; gap:18px; align-items:center; color:#e8c58f; font-size:11px; font-weight:700; letter-spacing:.08em; padding-bottom:11px; border-bottom:1px solid #c7a06790; margin-top:18px; transition:gap .25s; }
.a4-scroll-link:hover { gap:25px; }
.a4-portrait { position:relative; width:100%; height:clamp(370px,42vw,555px); margin:0; }
.a4-portrait:before { content:""; position:absolute; inset:0 10px 10px 25px; border:1px solid #c7a06788; }
.a4-portrait-inner { position:absolute; inset:16px 25px 27px 0; overflow:hidden; border:1px solid #c7a06755; clip-path:polygon(0 0,100% 0,100% 94%,94% 100%,0 100%); }
.a4-portrait-inner:after { content:""; position:absolute; inset:0; background:linear-gradient(0deg,rgba(9,16,22,.6),transparent 45%); pointer-events:none; }
.a4-portrait img { display:block; width:100%; height:100%; object-fit:cover; object-position:center; filter:saturate(.8) contrast(1.04); }
.a4-photo-stamp { position:absolute; bottom:45px; inset-inline-start:15px; z-index:1; padding:10px 12px; background:#0b1218b9; color:#ead0a6; font-size:10px; letter-spacing:.1em; }
.a4-vertical-mark { position:absolute; inset-inline-end:0; top:50%; transform:translateY(-50%); writing-mode:vertical-rl; color:#c6a773; font-size:9px; letter-spacing:.16em; }
.a4-intro-footer { position:relative; width:min(1240px,calc(100% - 100px)); margin:30px auto 0; display:flex; justify-content:space-between; padding-block:17px; border-top:1px solid #c7a06733; font-size:10px; color:#9cabb4; letter-spacing:.13em; }
.a4-story { display:grid; grid-template-columns:minmax(180px,.75fr) minmax(0,2fr); gap:8%; padding-block:125px; }
.a4-years { display:flex; flex-direction:column; margin-top:45px; }
.a4-years strong { font-size:clamp(85px,9vw,135px); font-weight:500; line-height:1; color:var(--gold); letter-spacing:-.07em; }
.a4-years strong span { font-size:.45em; }
.a4-years>span { max-width:170px; margin-top:9px; font-size:11px; letter-spacing:.1em; color:#b1bdc5; }
.a4-story-content h2,.a4-method h2,.a4-direction h2,.a4-end h2 { margin:12px 0 28px; font-size:clamp(32px,3.8vw,58px); font-weight:600; letter-spacing:-.035em; line-height:1.17; }
.a4-story-content p { max-width:740px; color:var(--muted); font-size:15px; line-height:1.95; margin-bottom:19px; }
.a4-statement { position:relative; isolation:isolate; min-height:470px; display:flex; align-items:center; background:#1a2933; }
.a4-statement-bg { position:absolute; inset:0; z-index:-2; background-size:cover; background-position:center; filter:grayscale(.5) brightness(.42); }
.a4-statement:after { content:""; position:absolute; inset:0; z-index:-1; background:linear-gradient(90deg,#101a22e8,#101a2260); }
.a4-statement-inside { padding-block:90px; }
.a4-statement blockquote { margin:30px 0; max-width:890px; font-size:clamp(30px,4.3vw,62px); font-weight:450; line-height:1.25; }
.a4-signature { font-size:11px; letter-spacing:.15em; color:var(--gold); }
.a4-method { padding-block:120px; }
.a4-method-top { display:flex; justify-content:space-between; align-items:end; gap:35px; margin-bottom:45px; }
.a4-method-top>div { max-width:710px; }
.a4-method-top>p { max-width:330px; color:var(--muted); font-size:14px; line-height:1.8; }
.a4-method-layout { display:grid; grid-template-columns:minmax(0,.93fr) minmax(0,1.07fr); gap:28px; }
.a4-method-selector { border-top:1px solid #364752; }
.a4-method-tab { width:100%; display:grid; grid-template-columns:30px 1fr 22px; align-items:center; gap:18px; padding:29px 18px; color:#edf1f3; background:transparent; border:0; border-bottom:1px solid #364752; text-align:start; transition:background .25s; }
.a4-method-tab span,.a4-method-tab svg { color:var(--gold); }
.a4-method-tab span { font-size:11px; }
.a4-method-tab strong { font-size:clamp(16px,1.7vw,23px); font-weight:550; }
.a4-method-tab:hover,.a4-method-tab.selected { background:#1b2a34; }
.a4-method-display { position:relative; min-height:360px; padding:45px; overflow:hidden; background:linear-gradient(140deg,#223540,#101b23); border:1px solid #394c58; }
.a4-method-icon { color:var(--gold); margin-bottom:24px; }
.a4-method-display h3 { margin:17px 0; font-size:28px; }
.a4-method-display>p:not(.a4-label) { max-width:480px; color:var(--muted); font-size:14px; line-height:1.85; }
.a4-method-number { position:absolute; bottom:-45px; inset-inline-end:16px; font-size:180px; font-weight:800; line-height:1; color:#c7a06712; pointer-events:none; }
.a4-direction { background:#14212a; padding-block:120px; }
.a4-direction-intro { max-width:840px; margin-bottom:45px; }
.a4-direction-panels { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:20px; }
.a4-direction-panels article { min-width:0; padding:38px; background:#1b2b35; border-top:2px solid var(--gold); transition:transform .25s; }
.a4-direction-panels article:hover { transform:translateY(-4px); }
.a4-direction-panels article>span { color:var(--gold); font-size:10px; letter-spacing:.12em; }
.a4-direction-panels h3 { margin:26px 0 14px; font-size:26px; font-weight:550; }
.a4-direction-panels p { color:var(--muted); font-size:14px; line-height:1.85; }
.a4-end { padding-block:120px; text-align:center; }
.a4-end h2 { max-width:830px; margin-inline:auto; }
.a4-end>p:not(.a4-label) { max-width:680px; margin-inline:auto; color:var(--muted); font-size:15px; line-height:1.8; }
.a4-cta { display:inline-flex; gap:20px; align-items:center; justify-content:center; margin-top:30px; padding:18px 28px; color:#111923; background:var(--gold); font-size:12px; font-weight:800; letter-spacing:.07em; transition:background .25s,transform .25s; }
.a4-cta:hover { background:#e1bc85; transform:translateY(-3px); }
.a4-animate { opacity:0; transform:translateY(24px); transition:opacity .65s,transform .65s; }
.a4-animate.a4-visible { opacity:1; transform:none; }
.a4-page[dir="rtl"] h1,.a4-page[dir="rtl"] h2 { letter-spacing:0; line-height:1.36; }
.a4-page[dir="rtl"] .a4-portrait-inner { inset:16px 0 27px 25px; }
.a4-page[dir="rtl"] .a4-vertical-mark { writing-mode:vertical-rl; }
@media (max-width:1000px) {
  .a4-intro-layout { width:calc(100% - 56px); gap:25px; }
  .a4-intro-footer { width:calc(100% - 56px); }
  .a4-intro h1 { font-size:clamp(30px,4.2vw,48px); }
  .a4-method-top { display:block; }
  .a4-method-layout { grid-template-columns:1fr; }
}
@media (max-width:640px) {
  .a4-intro { min-height:auto; padding-top:100px; }
  .a4-intro-layout { width:calc(100% - 34px); grid-template-columns:1fr; gap:24px; }
  .a4-intro-copy { padding:10px 0 0; }
  .a4-intro h1 { font-size:clamp(32px,8vw,46px); }
  .a4-lead { font-size:14px; }
  .a4-portrait { height:330px; }
  .a4-portrait-inner { inset:10px 19px 19px 0; }
  .a4-photo-stamp { bottom:32px; }
  .a4-vertical-mark { display:none; }
  .a4-intro-footer { width:calc(100% - 34px); }
  .a4-intro-footer span:last-child { display:none; }
  .a4-story { grid-template-columns:1fr; padding-block:75px; gap:30px; }
  .a4-years { margin-top:18px; }
  .a4-method,.a4-direction,.a4-end { padding-block:75px; }
  .a4-statement { min-height:350px; }
  .a4-statement-inside { padding-block:60px; }
  .a4-method-display { padding:30px; }
  .a4-direction-panels { grid-template-columns:1fr; }
  .a4-direction-panels article { padding:28px; }
}
@media (prefers-reduced-motion:reduce) {
  .a4-animate { opacity:1; transform:none; transition:none; }
  .a4-page * { animation:none!important; }
}
</style>
