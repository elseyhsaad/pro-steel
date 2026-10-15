<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { ArrowUpRight, ArrowDown, ShieldCheck, FileCheck2, Handshake, Globe2 } from 'lucide-vue-next'
import { content } from '../content'

const route = useRoute()
const lang = computed(() => route.meta.lang || 'en')
const info = computed(() => content[lang.value])
const image = (n) => `${import.meta.env.BASE_URL}images/steel-${n}.png`
const link = (path) => `/${lang.value}/${path}`

const copy = {
  en: {
    eyebrow: 'THE COMPANY / OUR STORY', headline: 'MORE THAN STEEL. A COMMITMENT TO TRUST.',
    lead: 'We build commercial connections between steel manufacturers, suppliers and buyers across borders.',
    storyLabel: '01 / WHO WE ARE', storyTitle: 'A BRIDGE BETWEEN PRODUCTION AND OPPORTUNITY.',
    story2: 'Our work spans direct steel purchasing and resale, as well as introducing manufacturers to potential buyers and helping coordinate commercial negotiations and documentation. We believe long-term business grows from clarity, mutual respect and reliability.',
    quoteLabel: 'OUR PHILOSOPHY', quote: 'Our reputation is not just our history. It is the standard behind every transaction.',
    pillarsLabel: '02 / OUR APPROACH', pillarsTitle: 'A CLEARER WAY TO TRADE.',
    pillars: [
      ['Quality & Specifications','We focus on understanding buyer requirements and agreed technical specifications before a transaction progresses.'],
      ['Documented Transactions','We encourage clearly documented commercial terms, responsibilities and procedures.'],
      ['Balanced Commercial Interests','We value fair, sustainable relationships with both manufacturers and buyers.']
    ],
    missionLabel: '03 / PURPOSE & AMBITION', missionTitle: 'CONNECTING INDUSTRY TO NEW MARKETS.',
    mission: 'Our mission is to make international steel trade more accessible through product knowledge, market connections and structured commercial coordination.',
    vision: 'Our vision is to strengthen relationships among production markets including China and Türkiye, explore potential supply links with Algeria, and develop future opportunities in markets such as Saudi Arabia and Syria.',
    missionHeading: 'OUR MISSION', visionHeading: 'OUR VISION', closingTitle: 'LET’S BUILD A COMMERCIAL CONNECTION.', closingText: 'Manufacturing partner or steel buyer? Discover how we could work together.', closingButton: 'EXPLORE PARTNERSHIPS'
  },
  ar: {
    eyebrow: 'الشركة / قصتنا', headline: 'أكثر من تجارة الحديد. التزام مستمر بالثقة.',
    lead: 'نبني جسوراً تجارية تربط مصانع الحديد والمورّدين بالمشترين عبر الحدود.',
    storyLabel: '01 / من نحن', storyTitle: 'جسر بين الإنتاج والفرص التجارية.',
    story2: 'يشمل عملنا شراء الحديد وإعادة بيعه بشكل مباشر، بالإضافة إلى تعريف المصنّعين بالمشترين المحتملين وتنسيق المفاوضات والوثائق التجارية. نؤمن بأن العلاقات طويلة الأمد تقوم على الوضوح والاحترام المتبادل والموثوقية.',
    quoteLabel: 'فلسفتنا', quote: 'سمعتنا ليست مجرد تاريخنا، بل المعيار الذي نلتزم به في كل صفقة.',
    pillarsLabel: '02 / نهج عملنا', pillarsTitle: 'طريقة أوضح للتجارة.',
    pillars: [
      ['الجودة والمواصفات','نهتم بفهم متطلبات المشتري والمواصفات الفنية المتفق عليها قبل متابعة الصفقة.'],
      ['المعاملات الموثقة','نعمل على وضوح الشروط التجارية والمسؤوليات والإجراءات وتوثيقها.'],
      ['توازن المصالح التجارية','نثمّن العلاقات العادلة والمستدامة مع المصنّعين والمشترين على حد سواء.']
    ],
    missionLabel: '03 / رسالتنا وطموحنا', missionTitle: 'نربط الصناعة بأسواق جديدة.',
    mission: 'رسالتنا تسهيل تجارة الحديد الدولية بالاعتماد على فهم المنتجات والعلاقات السوقية والتنسيق التجاري المنظّم.',
    vision: 'رؤيتنا تعزيز الروابط مع أسواق الإنتاج مثل الصين وتركيا، واستكشاف فرص التوريد في الجزائر، وتطوير فرص مستقبلية في أسواق مثل السعودية وسوريا.',
    missionHeading: 'رسالتنا', visionHeading: 'رؤيتنا', closingTitle: 'لنبدأ علاقة تجارية جديدة.', closingText: 'هل تمثل مصنعاً أو تبحث عن الحديد؟ اكتشف فرص التعاون معنا.', closingButton: 'استكشف الشراكات'
  },
  tr: {
    eyebrow: 'ŞİRKET / HİKÂYEMİZ', headline: 'ÇELİKTEN DAHA FAZLASI. GÜVENE BAĞLILIK.',
    lead: 'Çelik üreticileri, tedarikçiler ve alıcılar arasında sınır ötesi ticari bağlar kuruyoruz.',
    storyLabel: '01 / HAKKIMIZDA', storyTitle: 'ÜRETİM İLE FIRSATLAR ARASINDA BİR KÖPRÜ.',
    story2: 'Faaliyetlerimiz, doğrudan çelik alım-satımının yanı sıra üreticileri potansiyel alıcılarla tanıştırmayı ve ticari görüşmeler ile belgelerin koordinasyonunu da kapsar. Uzun vadeli iş ilişkilerinin açıklık, karşılıklı saygı ve güvenilirlikle geliştiğine inanıyoruz.',
    quoteLabel: 'FELSEFEMİZ', quote: 'İtibarımız yalnızca geçmişimiz değil, her işlemde benimsediğimiz standarttır.',
    pillarsLabel: '02 / YAKLAŞIMIMIZ', pillarsTitle: 'DAHA ŞEFFAF BİR TİCARET YAKLAŞIMI.',
    pillars: [
      ['Kalite ve Teknik Özellikler','İşlem ilerlemeden önce alıcı taleplerini ve üzerinde anlaşılan teknik şartları anlamaya odaklanırız.'],
      ['Belgeli İşlemler','Ticari koşulların, sorumlulukların ve süreçlerin açıkça belgelenmesini önemseriz.'],
      ['Dengeli Ticari İlişkiler','Üreticiler ve alıcılarla adil, sürdürülebilir ilişkilere değer veririz.']
    ],
    missionLabel: '03 / AMAÇ VE HEDEFLER', missionTitle: 'SANAYİYİ YENİ PAZARLARLA BULUŞTURUYORUZ.',
    mission: 'Misyonumuz; ürün bilgisi, pazar bağlantıları ve düzenli ticari koordinasyonla uluslararası çelik ticaretini kolaylaştırmaktır.',
    vision: 'Vizyonumuz, Çin ve Türkiye gibi üretim pazarlarıyla ilişkileri güçlendirmek, Cezayir’deki potansiyel tedarik bağlantılarını araştırmak ve Suudi Arabistan ile Suriye gibi pazarlarda geleceğe yönelik fırsatlar geliştirmektir.',
    missionHeading: 'MİSYONUMUZ', visionHeading: 'VİZYONUMUZ', closingTitle: 'YENİ BİR TİCARİ BAĞ KURALIM.', closingText: 'Üretici veya çelik alıcısı mısınız? Birlikte neler yapabileceğimizi keşfedin.', closingButton: 'ORTAKLIKLARI KEŞFEDİN'
  }
}
const c = computed(() => copy[lang.value])
const icons = [ShieldCheck, FileCheck2, Handshake]
const currentPillar = ref(0)
const editorial = computed(() => ({
 en: { index:'WHO WE ARE', side:'INDEPENDENT THINKING. INTERNATIONAL REACH.', years:'YEARS IN STEEL MARKETS', focus:'WHAT GUIDES US', method:'HOW WE THINK', chapter:'THE PRO STEEL METHOD', chapterText:'Every commercial relationship begins with understanding the product, clarifying expectations, and respecting the interests of everyone involved.', numbers:['KNOW THE PRODUCT','DEFINE THE TERMS','BUILD THE RELATIONSHIP'], explore:'EXPLORE OUR APPROACH', next:'OUR NEXT CHAPTER' },
 ar: { index:'من نحن', side:'تفكير مستقل. وحضور تجاري دولي.', years:'سنوات خبرة في أسواق الحديد', focus:'ما الذي يوجهنا', method:'كيف نفكر', chapter:'منهج PRO STEEL', chapterText:'تبدأ كل علاقة تجارية بفهم المنتج، وتوضيح التوقعات، واحترام مصالح جميع الأطراف.', numbers:['نفهم المنتج','نحدد الشروط','نبني العلاقة'], explore:'اكتشف منهجنا', next:'الفصل القادم' },
 tr: { index:'HAKKIMIZDA', side:'BAĞIMSIZ BAKIŞ. ULUSLARARASI ERİŞİM.', years:'ÇELİK PAZARLARINDA YIL', focus:'BİZE YÖN VERENLER', method:'NASIL DÜŞÜNÜYORUZ', chapter:'PRO STEEL YAKLAŞIMI', chapterText:'Her ticari ilişki, ürünü anlamak, beklentileri netleştirmek ve tüm tarafların çıkarlarına saygı göstermekle başlar.', numbers:['ÜRÜNÜ ANLA','KOŞULLARI BELİRLE','İLİŞKİYİ KUR'], explore:'YAKLAŞIMIMIZI KEŞFEDİN', next:'SONRAKİ BÖLÜM' }
})[lang.value])
let observer
onMounted(() => {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
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
      <div class="v2-wrap a4-intro-layout">
        <div class="a4-intro-copy">
          <p class="a4-overline"><span class="a4-rule"></span> PRO STEEL / {{ editorial.index }}</p>
          <p class="a4-edition">EST. EXPERIENCE / 5+ YEARS</p>
          <h1>{{ c.headline }}</h1>
          <p class="a4-lead">{{ c.lead }}</p>
          <a class="a4-scroll-link" href="#a4-story">{{ editorial.explore }} <ArrowDown :size="17" /></a>
        </div>
        <div class="a4-portrait">
          <div class="a4-portrait-inner"><img :src="image(6)" alt="Steel pipes arranged in industrial storage" /></div>
          <span class="a4-photo-stamp">01 — PRO STEEL / INDUSTRY</span>
          <span class="a4-vertical-mark">{{ editorial.side }}</span>
        </div>
      </div>
      <div class="a4-intro-footer v2-wrap"><span>01 / 04</span><span>{{ editorial.side }}</span></div>
    </section>

    <section id="a4-story" class="a4-story v2-wrap">
      <div class="a4-story-index a4-animate"><p class="a4-label">{{ c.storyLabel }}</p><div class="a4-years"><strong>5<span>+</span></strong><span>{{ editorial.years }}</span></div></div>
      <div class="a4-story-content a4-animate"><h2>{{ c.storyTitle }}</h2><p>{{ info.aboutText }}</p><p>{{ c.story2 }}</p></div>
    </section>

    <section class="a4-statement">
      <div class="a4-statement-bg" :style="{ backgroundImage: `url(${image(5)})` }" aria-hidden="true"></div>
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
          <article class="a4-animate"><span>01 / {{ c.missionHeading }}</span><h3>{{ c.missionHeading }}</h3><p>{{ c.mission }}</p></article>
          <article class="a4-animate"><span>02 / {{ c.visionHeading }}</span><h3>{{ c.visionHeading }}</h3><p>{{ c.vision }}</p></article>
        </div>
      </div>
    </section>

    <section class="a4-end v2-wrap a4-animate">
      <p class="a4-label">{{ editorial.next }} / PRO STEEL</p>
      <h2>{{ c.closingTitle }}</h2>
      <p>{{ c.closingText }}</p>
      <RouterLink :to="link('partners')" class="a4-cta">{{ c.closingButton }} <ArrowUpRight :size="19" /></RouterLink>
    </section>
  </div>
</template>
<style scoped>
.a4-page{background:#0c1116;color:#ebedf0;overflow:hidden}.a4-page button{font:inherit}.a4-intro{position:relative;min-height:94svh;background:radial-gradient(ellipse at 24% 28%,#22313a 0%,#0c1116 56%);padding-top:125px;display:flex;flex-direction:column;justify-content:center}.a4-grain{position:absolute;inset:0;pointer-events:none;opacity:.35;background-image:linear-gradient(110deg,transparent 49.96%,rgba(201,166,111,.09) 50%,transparent 50.06%);background-size:80px 80px}.a4-intro-layout{position:relative;display:grid;grid-template-columns:1.1fr .9fr;align-items:center;gap:6%;padding-block:50px 60px}.a4-intro-copy{position:relative;z-index:2}.a4-overline,.a4-label{color:#c9a66f;font-size:11px;letter-spacing:.19em;text-transform:uppercase;font-weight:700}.a4-overline{display:flex;align-items:center;gap:15px;margin-bottom:30px}.a4-rule{display:block;width:36px;height:1px;background:#c9a66f}.a4-edition{font-size:10px;color:#78858d;letter-spacing:.24em;margin-bottom:25px}.a4-intro h1{font-size:clamp(38px,5.1vw,78px);font-weight:600;line-height:1.12;letter-spacing:-.043em;max-width:700px;margin:0 0 30px}.a4-lead{max-width:480px;color:#bdc6cb;font-size:17px;line-height:1.85}.a4-scroll-link{margin-top:37px;display:inline-flex;align-items:center;gap:20px;border-bottom:1px solid #b59665;padding-bottom:14px;color:#edd8b9;font-size:11px;letter-spacing:.1em;font-weight:700;transition:gap .3s}.a4-scroll-link:hover{gap:30px}.a4-portrait{position:relative;min-height:550px}.a4-portrait-inner{position:absolute;inset:22px 35px 27px 0;overflow:hidden;clip-path:polygon(0 0,100% 0,100% 92%,92% 100%,0 100%)}.a4-portrait-inner:after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,rgba(11,17,22,.5),transparent 55%)}.a4-portrait img{width:100%;height:100%;object-fit:cover;filter:saturate(.6) contrast(1.12);animation:a4-slow-zoom 14s ease-out both}.a4-photo-stamp{position:absolute;inset:auto auto 48px 23px;font-size:10px;letter-spacing:.16em;color:#f4d8aa}.a4-vertical-mark{position:absolute;right:0;top:50%;transform:translateY(-50%);writing-mode:vertical-rl;color:#b49d77;font-size:10px;letter-spacing:.16em}.a4-intro-footer{position:relative;display:flex;justify-content:space-between;padding-bottom:24px;color:#8f9aa2;font-size:10px;letter-spacing:.14em}.a4-story{display:grid;grid-template-columns:1fr 2fr;gap:10%;padding-block:145px}.a4-years{margin-top:65px;display:grid;gap:3px}.a4-years strong{font-size:clamp(75px,9vw,140px);font-weight:500;line-height:1;color:#c9a66f;letter-spacing:-.08em}.a4-years strong span{font-size:.55em}.a4-years>span{font-size:11px;max-width:150px;letter-spacing:.15em;color:#929fa7}.a4-story-content h2,.a4-method h2,.a4-direction h2,.a4-end h2{font-size:clamp(35px,4vw,62px);font-weight:600;line-height:1.12;letter-spacing:-.04em;margin:15px 0 33px}.a4-story-content p{color:#b4bdc3;font-size:16px;line-height:1.95;max-width:740px}.a4-statement{position:relative;min-height:560px;background:#17232b;display:grid;align-items:center}.a4-statement-bg{position:absolute;inset:0;background-size:cover;background-position:center;filter:grayscale(.65) brightness(.35)}.a4-statement:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#0e171e 5%,transparent 95%)}.a4-statement-inside{position:relative;z-index:1;padding-block:110px}.a4-statement blockquote{font-size:clamp(30px,4.3vw,65px);font-weight:450;line-height:1.2;letter-spacing:-.025em;max-width:940px;margin:38px 0}.a4-signature{color:#c9a66f;letter-spacing:.19em;font-size:11px}.a4-method{padding-block:140px}.a4-method-top{display:flex;justify-content:space-between;gap:50px;align-items:end;margin-bottom:58px}.a4-method-top>div{max-width:670px}.a4-method-top>p{max-width:300px;color:#aab7c0;line-height:1.75;font-size:14px}.a4-method-layout{display:grid;grid-template-columns:1fr 1.05fr;gap:35px}.a4-method-selector{border-top:1px solid #35454e}.a4-method-tab{display:grid;grid-template-columns:38px 1fr 24px;align-items:center;gap:22px;width:100%;text-align:start;background:transparent;border:0;border-bottom:1px solid #35454e;color:#e5e9ed;padding:34px 15px;cursor:pointer;transition:background .3s,color .3s}.a4-method-tab span{color:#c9a66f;font-size:12px}.a4-method-tab strong{font-size:clamp(17px,2vw,26px);font-weight:500}.a4-method-tab.selected,.a4-method-tab:hover{background:#1b2931;color:#f4d4a2}.a4-method-display{position:relative;min-height:360px;padding:52px;background:linear-gradient(135deg,#24333c,#111a20);border:1px solid #374751;overflow:hidden;animation:a4-panel .38s both}.a4-method-icon{color:#c9a66f;margin-bottom:36px}.a4-method-display h3{font-weight:600;font-size:27px;margin:20px 0}.a4-method-display>p:not(.a4-label){max-width:470px;color:#b7c2ca;line-height:1.9}.a4-method-number{position:absolute;right:15px;bottom:-42px;color:rgba(201,166,111,.08);font-size:195px;font-weight:800;pointer-events:none}.a4-direction{background:#131e25;padding-block:140px}.a4-direction-intro{max-width:800px;margin-bottom:55px}.a4-direction-panels{display:grid;grid-template-columns:1fr 1fr;gap:24px}.a4-direction-panels article{padding:42px;border-top:2px solid #c9a66f;background:#19262e}.a4-direction-panels article>span{font-size:10px;color:#c9a66f;letter-spacing:.15em}.a4-direction-panels h3{font-size:27px;font-weight:500;margin:30px 0 16px}.a4-direction-panels p{color:#aebbc3;line-height:1.9}.a4-end{padding-block:150px;text-align:center}.a4-end h2{max-width:830px;margin:25px auto}.a4-end>p:not(.a4-label){color:#aebbc3;line-height:1.7}.a4-cta{display:inline-flex;align-items:center;gap:25px;background:#c9a66f;color:#101820;font-size:12px;font-weight:800;letter-spacing:.07em;padding:19px 27px;margin-top:36px;transition:transform .25s,background .25s}.a4-cta:hover{transform:translateY(-4px);background:#e0bb83}.a4-animate{opacity:0;transform:translateY(35px);transition:opacity .8s ease,transform .8s ease}.a4-animate.a4-visible{opacity:1;transform:translateY(0)}@keyframes a4-slow-zoom{from{transform:scale(1.12)}to{transform:scale(1)}}@keyframes a4-panel{from{opacity:.5;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}.a4-page[dir=rtl] .a4-intro h1,.a4-page[dir=rtl] h2{letter-spacing:0}.a4-page[dir=rtl] .a4-vertical-mark{left:0;right:auto}.a4-page[dir=rtl] .a4-photo-stamp{right:23px;left:auto}.a4-page[dir=rtl] .a4-method-number{left:15px;right:auto}@media(max-width:950px){.a4-intro-layout{grid-template-columns:1fr 1fr;gap:3%}.a4-portrait{min-height:470px}.a4-method-top{display:block}.a4-method-layout{grid-template-columns:1fr}.a4-direction-panels{gap:15px}}@media(max-width:650px){.a4-intro{padding-top:85px;min-height:auto}.a4-intro-layout{grid-template-columns:1fr;padding-block:38px}.a4-intro h1{font-size:clamp(36px,10vw,55px)}.a4-lead{font-size:15px}.a4-portrait{min-height:330px;margin-top:28px}.a4-portrait-inner{inset:0 20px 20px 0}.a4-intro-footer span:last-child{display:none}.a4-story{grid-template-columns:1fr;padding-block:85px;gap:30px}.a4-years{margin-top:24px}.a4-statement{min-height:410px}.a4-statement-inside{padding-block:80px}.a4-method,.a4-direction,.a4-end{padding-block:85px}.a4-method-tab{padding:25px 8px;gap:12px}.a4-method-display{padding:35px 26px;min-height:310px}.a4-direction-panels{grid-template-columns:1fr}.a4-direction-panels article{padding:30px}}@media(prefers-reduced-motion:reduce){.a4-animate{opacity:1;transform:none;transition:none}.a4-portrait img{animation:none}.a4-method-display{animation:none}}
</style>
