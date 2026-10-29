<script setup>
import { computed, ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { ArrowUpRight, ArrowDown, Check, Globe2, Handshake, FileCheck2, ShieldCheck, Search, Layers3, } from 'lucide-vue-next'

const route = useRoute()
const lang = computed(() => route.meta.lang || 'en')
const t = computed(() => copy[lang.value] || copy.en)
const img = n => `${import.meta.env.BASE_URL}images/steel-${n}.png`
const link = path => `/${lang.value}/${path}`
const activeModel = ref(0)
const activeMarket = ref(0)
const steps = [Search, Handshake, FileCheck2, Globe2]
const dedicatedMarketPages = new Set(['saudi-arabia', 'china', 'turkiye', 'syria', 'algeria'])
const marketLink = slug => link(dedicatedMarketPages.has(slug) ? 'markets/' + slug : 'markets')
let observer

const copy = {
  en: {
    back:'PRO STEEL / MANUFACTURING PARTNERSHIPS', tag:'AN INTERNATIONAL GROWTH PARTNER',
    heroTop:'YOU FOCUS ON', heroMain:'PRODUCTION.', heroBottom:'WE FOCUS ON', heroAccent:'CONNECTIONS.',
    heroText:'Your manufacturing capability deserves wider commercial reach. We help steel producers explore new buyer relationships, target markets and structured international opportunities.',
    heroButton:'START A PARTNERSHIP', heroSecond:'HOW IT WORKS', heroSide:'MANUFACTURERS / GLOBAL MARKETS',
    marquee:['MARKET CONNECTIONS','TRADE FACILITATION','DIRECT STEEL TRADING','LONG-TERM RELATIONSHIPS'],
    introLabel:'01 / THE PRO STEEL ADVANTAGE', introTitle:'A MARKET DOESN’T OPEN ITSELF.', introAccent:'WE HELP BUILD THE CONNECTION.',
    introLead:'Great production needs strong commercial access. PRO STEEL works at the intersection of manufacturing knowledge, market development and organized international trade.',
    benefits:[
      {title:'Access to buyer opportunities',body:'We explore relevant buyer requirements and introduce potential commercial connections in target markets.'},
      {title:'Understanding your products',body:'We discuss steel grades, dimensions, applications and technical requirements before moving a commercial conversation forward.'},
      {title:'Clearer transaction coordination',body:'We support discussions around documentation, responsibilities and agreed commercial terms, according to the scope of engagement.'},
      {title:'Flexible business relationships',body:'The cooperation model is tailored to the manufacturer, the product and the opportunity — without assuming exclusivity.'}
    ],
    modelsLabel:' CHOOSE THE RIGHT STRUCTURE', modelsTitle:'ONE PARTNER.', modelsAccent:'THREE WAYS TO WORK.',
    modelsSub:'We don’t force every opportunity into one commercial arrangement. We discuss a structure that fits both sides.',
    models:[
      {label:'COMMISSION COOPERATION',title:'We connect. You supply.',summary:'Buyer introductions and trade facilitation against terms agreed in advance.',points:['Explore suitable prospective buyers','Coordinate introductions and discussions','Agree commission terms in writing'],note:'Commission arrangements are negotiated separately for each engagement.'},
      {label:'COMMERCIAL REPRESENTATION',title:'Your products. New markets.',summary:'Explore a defined sales-development or representation mandate in an agreed market.',points:['Discuss product and territory scope','Align commercial responsibilities','Document any representation authority'],note:'Representation or exclusivity only exists after a separate written agreement.'},
      {label:'DIRECT TRADING',title:'A clear buyer–seller model.',summary:'Where commercially suitable, PRO STEEL can purchase steel products and resell them.',points:['Discuss specifications and quantities','Agree pricing and delivery terms','Coordinate the transaction as contracted'],note:'Purchasing, availability and payment conditions depend on each agreed transaction.'}
    ],
    marketsLabel:' MARKETS WE STUDY', marketsTitle:'YOUR NEXT MARKET', marketsAccent:'STARTS WITH A CONVERSATION.',
    marketsIntro:'Our approach distinguishes current product-trade experience from future market-development ambitions.',
    markets:[
      {name:'SAUDI ARABIA',status:'STRATEGIC MARKET VISION',intro:'Vision 2030, infrastructure programs and preparations for 2034 make Saudi Arabia an important market for exploring steel supply relationships.',disclaimer:'Market opportunity — not a claim of awarded projects, purchase commitments or guaranteed demand.',slug:'saudi-arabia',photo:4},
      {name:'CHINA',status:'INDUSTRIAL SOURCING EXPERIENCE',intro:'Our supplied trade documentation reflects familiarity with China-associated steel products, specifications and international commercial workflows.',disclaimer:'Documented product and invoice experience does not establish an exclusive manufacturer partnership.',slug:'china',photo:5},
      {name:'TÜRKİYE',status:'REGIONAL MANUFACTURING CONNECTIONS',intro:'Turkish industry offers a diverse steel product base and geographic access to regional markets, with related trade documents in our historical review.',disclaimer:'Future representation and orders depend on independently negotiated agreements.',slug:'turkiye',photo:2},
      {name:'SYRIA',status:'REGIONAL RECONSTRUCTION OUTLOOK',intro:'Potential demand linked to rebuilding, industrial rehabilitation and infrastructure. Opportunities require project-by-project verification.',disclaimer:'Market outlook only; no guaranteed contracts or volumes.',slug:'syria',photo:6},
      {name:'ALGERIA',status:'NORTH AFRICAN MARKET OUTLOOK',intro:'A market to explore for steel products serving industrial, construction and infrastructure buyers.',disclaimer:'Exploratory market, not an established sales claim.',slug:'algeria',photo:1},
      {name:'RUSSIA',status:'INDUSTRIAL MARKET OUTLOOK',intro:'Large industrial steel ecosystem with specialized grades and supply-chain considerations.',disclaimer:'Any transactions depend on applicable sanctions, export controls and due diligence.',slug:'russia',photo:3},
      {name:'GERMANY',status:'ENGINEERING & QUALITY MARKET',intro:'Potential demand for specified industrial steel, traceability and rigorous quality documentation.',disclaimer:'Potential opportunity; no current customer relationship is implied.',slug:'germany',photo:2},
      {name:'IRAQ',status:'REGIONAL INFRASTRUCTURE MARKET',intro:'A neighboring-market opportunity for structural and industrial steel specifications.',disclaimer:'Market development target only; projects and demand require verification.',slug:'iraq',photo:4},
      {name:'LEBANON',status:'LEVANT COMMERCIAL MARKET',intro:'Explore tailored supply conversations with contractors, distributors and fabricators.',disclaimer:'Exploratory market; no commitments or order volumes implied.',slug:'lebanon',photo:5},
      {name:'JORDAN',status:'REGIONAL DISTRIBUTION MARKET',intro:'Explore manufacturer-to-buyer introductions for construction and industrial steel.',disclaimer:'Prospective market, not an established distribution arrangement.',slug:'jordan',photo:1}
    ],
    viewMarket:'DISCOVER MARKET VISION',
    processLabel:' HOW WE ENGAGE', processTitle:'FROM FIRST CONTACT', processAccent:'TO COMMERCIAL CLARITY.',
    process:[['01','Understand the manufacturer','Products, capabilities, specifications, preferred markets and commercial objectives.'],['02','Explore matching opportunities','Identify and discuss suitable prospective buyers or channels, without guaranteeing orders.'],['03','Agree the cooperation model','Set responsibilities, pricing framework, commission or purchase terms in writing.'],['04','Coordinate the next steps','Support introductions and documentation under the agreed scope of cooperation.']],
    promiseLabel:'THE PRINCIPLE BEHIND THE PARTNERSHIP', promiseTitle:'TRUST IS A PROCESS.',
    promiseText:'We value product quality, official documentation and balanced contractual rights. A strong commercial relationship should be clear for the manufacturer, the supplier and the buyer.',
    closingLabel:'LET’S DISCUSS YOUR PRODUCTS', closingTitle:'READY TO EXPLORE', closingAccent:'NEW MARKETS?',
    closingText:'Tell us what you manufacture, which markets you are targeting and what kind of cooperation you have in mind. We can start with a focused business conversation.',
    closingButton:'CONTACT PRO STEEL', closingSecondary:'EXPLORE OUR PRODUCTS', legal:'Commercial opportunities and cooperation models are indicative and subject to formal agreement.'
  },
  ar: {
    back:'PRO STEEL / شراكات المصانع',tag:'شريك لتطوير تجارتك الدولية',
    heroTop:'أنتم تركزون على',heroMain:'التصنيع.',heroBottom:'ونحن نركز على',heroAccent:'فتح العلاقات التجارية.',
    heroText:'قدراتكم التصنيعية تستحق وصولاً تجارياً أوسع. نساعد مصانع الحديد على استكشاف علاقات جديدة مع المشترين والأسواق المستهدفة وفرص التجارة الدولية المنظمة.',
    heroButton:'ابدأ شراكة',heroSecond:'كيف نعمل',heroSide:'المصنّعون / الأسواق العالمية',
    marquee:['تطوير علاقات الأسواق','تنسيق التجارة الدولية','التجارة المباشرة للحديد','شراكات طويلة الأمد'],
    introLabel:'01 / قيمة التعاون معنا',introTitle:'الأسواق لا تُفتح وحدها.',introAccent:'نساعد على بناء الطريق إليها.',
    introLead:'الإنتاج القوي يحتاج إلى وصول تجاري فعّال. تعمل PRO STEEL عند نقطة التقاء المعرفة بمنتجات الحديد وتطوير الأسواق وتنظيم التجارة الدولية.',
    benefits:[
      {title:'استكشاف فرص المشترين',body:'نبحث في احتياجات المشترين المحتملين ونساعد على فتح قنوات تواصل تجارية في الأسواق المستهدفة.'},
      {title:'فهم المنتجات والمواصفات',body:'نناقش درجات الحديد والمقاسات والاستخدامات والاحتياجات الفنية قبل تطوير أي فرصة تجارية.'},
      {title:'تنسيق واضح للمعاملات',body:'نساعد في مناقشة الوثائق والمسؤوليات والشروط التجارية بحسب نطاق التعاون المتفق عليه.'},
      {title:'علاقات تجارية مرنة',body:'نكيّف نموذج التعاون مع المصنع والمنتج والفرصة، دون افتراض أي حصرية مسبقة.'}
    ],
    modelsLabel:' شكل التعاون المناسب',modelsTitle:'شريك واحد.',modelsAccent:'ثلاث طرق للتعاون.',
    modelsSub:'لا نفرض نموذجاً واحداً على كل فرصة. نتناقش للوصول إلى صيغة تحقق وضوح المصالح للطرفين.',
    models:[
      {label:'التعاون بالعمولة',title:'نصل بين الأطراف. وأنتم تورّدون.',summary:'التعريف بالمشترين وتنسيق التجارة مقابل شروط تُتفق عليها مسبقاً.',points:['البحث عن مشترين محتملين مناسبين','تنسيق التعارف والمناقشات','توثيق شروط العمولة كتابةً'],note:'تُحدد العمولة وشروطها باتفاق مستقل لكل تعاون.'},
      {label:'التمثيل التجاري',title:'منتجاتكم. أسواق جديدة.',summary:'دراسة تفويض لتطوير المبيعات أو التمثيل في سوق محدد ومتفق عليه.',points:['تحديد المنتجات والنطاق الجغرافي','الاتفاق على المسؤوليات التجارية','توثيق صلاحيات التمثيل إن وجدت'],note:'لا تنشأ أي صفة تمثيل أو حصرية دون اتفاق كتابي منفصل.'},
      {label:'التجارة المباشرة',title:'علاقة بيع وشراء واضحة.',summary:'عندما تكون الظروف التجارية مناسبة، يمكن لـ PRO STEEL شراء منتجات الحديد وإعادة بيعها.',points:['مناقشة المواصفات والكميات','الاتفاق على الأسعار والتسليم','تنسيق المعاملة حسب العقد'],note:'تخضع عمليات الشراء والتوفر والدفع لشروط كل اتفاق.'}
    ],
    marketsLabel:' الأسواق التي ندرسها',marketsTitle:'سوقكم القادم',marketsAccent:'يبدأ بحوار.',
    marketsIntro:'نميّز بين خبرتنا السابقة في المنتجات والتجارة وبين طموحاتنا المستقبلية لتطوير الأسواق.',
    markets:[
      {name:'السعودية',status:'رؤية لسوق استراتيجي',intro:'تجعل رؤية 2030 ومشاريع البنية التحتية والاستعدادات لعام 2034 السعودية سوقاً مهماً لاستكشاف علاقات توريد الحديد.',disclaimer:'هذه فرص للدراسة، وليست عقوداً ممنوحة أو طلبات شراء مؤكدة أو طلباً مضموناً.',slug:'saudi-arabia',photo:4},
      {name:'الصين',status:'خبرة بمصادر التوريد الصناعي',intro:'تعكس المستندات التجارية التي قدمتموها معرفة بأصناف حديد مرتبطة بالصين ومواصفاتها وإجراءات التجارة الدولية.',disclaimer:'وجود مستندات ومنتجات لا يعني شراكة حصرية مع أي مصنع.',slug:'china',photo:5},
      {name:'تركيا',status:'قدرات صناعية ووصول إقليمي',intro:'تتميز الصناعة التركية بتنوع منتجات الحديد وقربها من الأسواق الإقليمية، ولدينا مستندات تجارية سابقة مرتبطة بهذا المسار.',disclaimer:'التمثيل والطلبات المستقبلية تخضع لاتفاقيات مستقلة.',slug:'turkiye',photo:2},
      {name:'سوريا',status:'آفاق إعادة الإعمار الإقليمية',intro:'فرص محتملة مرتبطة بإعادة البناء وتأهيل المنشآت والبنية التحتية، وتُدرس بحسب كل مشروع.',disclaimer:'رؤية سوقية فقط، وليست عقوداً مضمونة أو كميات مؤكدة.',slug:'syria',photo:6},
      {name:'الجزائر',status:'آفاق سوق شمال أفريقيا',intro:'سوق نستكشف فيه فرص منتجات الحديد للاستخدامات الصناعية والإنشائية والبنية التحتية.',disclaimer:'سوق قيد الدراسة وليس ادعاءً بوجود مبيعات قائمة.',slug:'algeria',photo:1},
      {name:'روسيا',status:'آفاق السوق الصناعية',intro:'سوق صناعي كبير بمنتجات ودرجات فولاذ متخصصة ومتطلبات توريد مختلفة.',disclaimer:'أي تعامل يخضع للعقوبات وضوابط التصدير والفحص القانوني المطبق.',slug:'russia',photo:3},
      {name:'ألمانيا',status:'سوق الهندسة والجودة',intro:'فرص محتملة للحديد الصناعي بمواصفات دقيقة ووثائق تتبع وفحوص جودة.',disclaimer:'فرص محتملة فقط دون الإيحاء بوجود عملاء مؤكدين.',slug:'germany',photo:2},
      {name:'العراق',status:'سوق البنية التحتية الإقليمي',intro:'سوق قريب لاستكشاف احتياجات الحديد الإنشائي والصناعي.',disclaimer:'سوق مستهدف للدراسة، وتحتاج المشاريع والكميات إلى تأكيد.',slug:'iraq',photo:4},
      {name:'لبنان',status:'السوق التجاري في بلاد الشام',intro:'استكشاف فرص التوريد مع المقاولين والموزعين ومصنّعي المنتجات المعدنية.',disclaimer:'سوق استكشافي دون التزام بعقود أو كميات.',slug:'lebanon',photo:5},
      {name:'الأردن',status:'سوق التوزيع الإقليمي',intro:'استكشاف ربط المصانع بالمشترين في منتجات الحديد الإنشائية والصناعية.',disclaimer:'سوق محتمل وليس اتفاق توزيع قائم.',slug:'jordan',photo:1}
    ],
    viewMarket:'اكتشف رؤية السوق',
    processLabel:' مراحل التعاون',processTitle:'من أول تواصل',processAccent:'إلى اتفاق واضح.',
    process:[['01','نفهم المصنع','المنتجات والقدرات والمواصفات والأسواق المفضّلة والأهداف التجارية.'],['02','نستكشف الفرص','نبحث عن مشترين وقنوات محتملة مناسبة دون ضمان إتمام طلبات.'],['03','نتفق على نموذج العمل','نحدد المسؤوليات وآلية التسعير والعمولة أو شروط الشراء كتابةً.'],['04','ننسق الخطوات التالية','ندعم التعارف والوثائق في حدود التعاون المتفق عليه.']],
    promiseLabel:'المبدأ الذي يحكم الشراكة',promiseTitle:'الثقة منهج عمل.',
    promiseText:'نهتم بجودة المنتج والوثائق الرسمية وتوازن الحقوق التعاقدية. العلاقة التجارية القوية يجب أن تكون واضحة للمصنّع والمورّد والمشتري.',
    closingLabel:'خلينا نحكي عن منتجاتكم',closingTitle:'جاهزون لاستكشاف',closingAccent:'أسواق جديدة؟',
    closingText:'عرّفونا على منتجات مصنعكم والأسواق المستهدفة ونوع التعاون الذي تفضّلونه. منقدر نبدأ بمحادثة تجارية واضحة.',
    closingButton:'تواصل مع PRO STEEL',closingSecondary:'استكشف المنتجات',legal:'الفرص ونماذج التعاون استرشادية وتخضع لاتفاقات رسمية.'
  },
  tr: {
    back:'PRO STEEL / ÜRETİCİ ORTAKLIKLARI',tag:'ULUSLARARASI BÜYÜME ORTAĞINIZ',
    heroTop:'SİZ',heroMain:'ÜRETİME.',heroBottom:'BİZ',heroAccent:'BAĞLANTILARA ODAKLANALIM.',
    heroText:'Üretim gücünüz daha geniş ticari erişimi hak ediyor. Çelik üreticilerinin yeni alıcı ilişkilerini, hedef pazarları ve düzenli uluslararası fırsatları araştırmasına yardımcı oluyoruz.',
    heroButton:'İŞ BİRLİĞİ BAŞLAT',heroSecond:'NASIL ÇALIŞIRIZ',heroSide:'ÜRETİCİLER / KÜRESEL PAZARLAR',
    marquee:['PAZAR BAĞLANTILARI','TİCARİ ARACILIK','DOĞRUDAN ÇELİK TİCARETİ','UZUN VADELİ İLİŞKİLER'],
    introLabel:'01 / PRO STEEL AVANTAJI',introTitle:'YENİ PAZARLAR KENDİLİĞİNDEN AÇILMAZ.',introAccent:'BAĞLANTILARI BİRLİKTE KURARIZ.',
    introLead:'Güçlü üretim, güçlü ticari erişime ihtiyaç duyar. PRO STEEL ürün bilgisini, pazar geliştirmeyi ve düzenli uluslararası ticareti bir araya getirir.',
    benefits:[
      {title:'Alıcı fırsatları',body:'Hedef pazarlardaki potansiyel alıcı ihtiyaçlarını araştırır ve ticari tanışmalar için bağlantılar oluştururuz.'},
      {title:'Ürünlerinizi anlamak',body:'Ticari görüşmeleri ilerletmeden önce çelik kalitelerini, ölçüleri, kullanım alanlarını ve teknik ihtiyaçları değerlendiririz.'},
      {title:'Net işlem koordinasyonu',body:'İş birliğinin kapsamına göre belgeler, sorumluluklar ve ticari şartlar konusunda görüşmeleri destekleriz.'},
      {title:'Esnek ticari ilişkiler',body:'İş birliği modelini üreticiye, ürüne ve fırsata göre değerlendiririz; münhasırlığı varsaymayız.'}
    ],
    modelsLabel:'UYGUN İŞ MODELİ',modelsTitle:'TEK ORTAK.',modelsAccent:'ÜÇ İŞ BİRLİĞİ YOLU.',
    modelsSub:'Her fırsatı aynı kalıba sokmuyoruz. Taraflar için uygun ve açık bir ticari yapı üzerinde görüşüyoruz.',
    models:[
      {label:'KOMİSYON ESASLI İŞ BİRLİĞİ',title:'Biz bağlarız. Siz tedarik edersiniz.',summary:'Önceden kararlaştırılmış şartlarla alıcı tanıştırma ve ticari koordinasyon.',points:['Uygun potansiyel alıcıları araştırmak','Tanışma ve görüşmeleri koordine etmek','Komisyon şartlarını yazılı belirlemek'],note:'Komisyon koşulları her iş birliği için ayrı müzakere edilir.'},
      {label:'TİCARİ TEMSİLCİLİK',title:'Ürünleriniz. Yeni pazarlar.',summary:'Belirlenen pazarda satış geliştirme veya temsil yetkisini değerlendirmek.',points:['Ürün ve bölge kapsamını görüşmek','Ticari sorumlulukları netleştirmek','Varsa temsil yetkisini belgelemek'],note:'Ayrı yazılı sözleşme olmadan temsil veya münhasırlık oluşmaz.'},
      {label:'DOĞRUDAN TİCARET',title:'Açık bir alım–satım modeli.',summary:'Ticari koşullar uygun olduğunda PRO STEEL ürün satın alıp yeniden satabilir.',points:['Teknik özellik ve miktarı görüşmek','Fiyat ve teslim şartlarında anlaşmak','İşlemi sözleşmeye göre koordine etmek'],note:'Alım, stok ve ödeme koşulları her işlemin sözleşmesine bağlıdır.'}
    ],
    marketsLabel:' İNCELEDİĞİMİZ PAZARLAR',marketsTitle:'BİR SONRAKİ PAZARINIZ',marketsAccent:'BİR GÖRÜŞMEYLE BAŞLAR.',
    marketsIntro:'Mevcut ürün ticareti tecrübemiz ile gelecekteki pazar geliştirme hedeflerimizi birbirinden ayırıyoruz.',
    markets:[
      {name:'SUUDİ ARABİSTAN',status:'STRATEJİK PAZAR VİZYONU',intro:'Vizyon 2030, altyapı projeleri ve 2034 hazırlıkları çelik tedarik ilişkileri için araştırılması gereken fırsatlar sunar.',disclaimer:'Bu, kesin sipariş, kazanılmış ihale veya garantili talep anlamına gelmez.',slug:'saudi-arabia',photo:4},
      {name:'ÇİN',status:'ENDÜSTRİYEL TEDARİK DENEYİMİ',intro:'Sunulan ticari belgeler, Çin bağlantılı çelik ürünleri, özellikleri ve uluslararası işlem süreçlerine aşinalık gösterir.',disclaimer:'Belgeli ticaret deneyimi münhasır üretici ortaklığı anlamına gelmez.',slug:'china',photo:5},
      {name:'TÜRKİYE',status:'BÖLGESEL ÜRETİM BAĞLANTILARI',intro:'Türk çelik sanayisi geniş ürün yelpazesi ve bölgesel erişim sunar; geçmiş incelememizde ilgili ticari kayıtlar yer alır.',disclaimer:'Gelecekteki temsil ve siparişler ayrıca müzakere edilir.',slug:'turkiye',photo:2},
      {name:'SURİYE',status:'BÖLGESEL YENİDEN YAPILANMA',intro:'Yeniden inşa, sanayi tesislerinin iyileştirilmesi ve altyapı kapsamında olası çelik talepleri araştırılır.',disclaimer:'Pazar görünümüdür; garantili sipariş veya miktar değildir.',slug:'syria',photo:6},
      {name:'CEZAYİR',status:'KUZEY AFRİKA PAZAR GÖRÜNÜMÜ',intro:'Sanayi, inşaat ve altyapı çeliği için olası alıcı ilişkileri araştırılır.',disclaimer:'Henüz keşif aşamasındadır; gerçekleşmiş satış iddiası değildir.',slug:'algeria',photo:1},
      {name:'RUSYA',status:'ENDÜSTRİYEL PAZAR GÖRÜNÜMÜ',intro:'Özel çelik kaliteleri ve tedarik gereksinimleri olan büyük bir sanayi ekosistemidir.',disclaimer:'İşlemler uygulanabilir yaptırımlar, ihracat kontrolleri ve hukuki incelemeye tabidir.',slug:'russia',photo:3},
      {name:'ALMANYA',status:'MÜHENDİSLİK VE KALİTE PAZARI',intro:'Teknik standartları, izlenebilirliği ve kalite belgeleri belirgin sanayi çeliği fırsatları araştırılır.',disclaimer:'Potansiyel pazardır; mevcut müşteri ilişkisi ima edilmez.',slug:'germany',photo:2},
      {name:'IRAK',status:'BÖLGESEL ALTYAPI PAZARI',intro:'Yapısal ve endüstriyel çelik için bölgesel fırsatlar değerlendirilebilir.',disclaimer:'Projeler ve talep ayrıca doğrulanmalıdır.',slug:'iraq',photo:4},
      {name:'LÜBNAN',status:'LEVANT TİCARİ PAZARI',intro:'Yükleniciler, dağıtıcılar ve metal imalatçılarıyla olası tedarik görüşmeleri araştırılır.',disclaimer:'Sipariş veya hacim taahhüdü bulunmamaktadır.',slug:'lebanon',photo:5},
      {name:'ÜRDÜN',status:'BÖLGESEL DAĞITIM PAZARI',intro:'İnşaat ve sanayi çeliğinde üretici-alıcı bağlantıları araştırılır.',disclaimer:'Potansiyel pazardır; mevcut distribütörlük ilişkisi değildir.',slug:'jordan',photo:1}
    ],
    viewMarket:'PAZAR VİZYONUNU İNCELE',
    processLabel:' İŞ BİRLİĞİ SÜRECİ',processTitle:'İLK TEMASTAN',processAccent:'NET TİCARİ ŞARTLARA.',
    process:[['01','Üreticiyi tanıyalım','Ürünler, kapasite, teknik özellikler, hedef pazarlar ve ticari amaçlar.'],['02','Fırsatları araştırıyoruz','Sipariş garantisi vermeden potansiyel alıcıları ve kanalları değerlendiriyoruz.'],['03','İş modelinde anlaşıyoruz','Sorumlulukları, fiyat çerçevesini, komisyonu veya alım koşullarını yazılı belirliyoruz.'],['04','Sonraki adımları koordine ediyoruz','Anlaşılan kapsam dahilinde tanıştırma ve belge süreçlerine yardımcı oluyoruz.']],
    promiseLabel:'ORTAKLIĞIN TEMEL İLKESİ',promiseTitle:'GÜVEN BİR SÜREÇTİR.',
    promiseText:'Ürün kalitesine, resmi belgelere ve dengeli sözleşmesel haklara önem veriyoruz. Güçlü bir ticari ilişki üretici, tedarikçi ve alıcı için açık olmalıdır.',
    closingLabel:'ÜRÜNLERİNİZİ KONUŞALIM',closingTitle:'YENİ PAZARLARI',closingAccent:'KEŞFETMEYE HAZIR MISINIZ?',
    closingText:'Ürünlerinizi, hedef pazarlarınızı ve tercih ettiğiniz iş birliği modelini paylaşın. Odaklı bir ticari görüşmeyle başlayabiliriz.',
    closingButton:'PRO STEEL İLE İLETİŞİM',closingSecondary:'ÜRÜNLERİMİZİ İNCELE',legal:'Fırsatlar ve iş modelleri örnek niteliğindedir; resmi sözleşmelere tabidir.'
  }
}

function observe() {
  observer?.disconnect()
  if (typeof window === 'undefined' || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { document.querySelectorAll('.pv-page .pv-reveal').forEach(el => el.classList.add('pv-visible')); return }
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) if(entry.isIntersecting) { entry.target.classList.add('pv-visible'); observer.unobserve(entry.target) }
  }, {threshold: .1, rootMargin:'0px 0px -30px 0px'})
  document.querySelectorAll('.pv-page .pv-reveal').forEach(el => observer.observe(el))
}
onMounted(() => nextTick(observe))
watch(() => route.fullPath, () => nextTick(observe))
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="pv-page" :dir="lang === 'ar' ? 'rtl' : 'ltr'">
    <section class="pv-hero">
      <div class="pv-hero-picture" :style="{backgroundImage:`url(${img(5)})`}" aria-hidden="true"></div>
      <div class="pv-hero-grid" aria-hidden="true"></div>
      <div class="pv-hero-frame v2-wrap">
        <div class="pv-hero-copy">
          <p class="pv-overline"><span class="pv-pulse"></span>{{ t.back }}</p>
          <span class="pv-hero-minilabel">{{ t.tag }}</span>
          <h1><span class="pv-thin">{{t.heroTop}}</span><strong>{{t.heroMain}}</strong><span class="pv-thin">{{t.heroBottom}}</span><em>{{t.heroAccent}}</em></h1>
          <p class="pv-hero-desc">{{t.heroText}}</p>
          <div class="pv-hero-actions"><RouterLink :to="link('contact')" class="pv-btn pv-btn-gold">{{t.heroButton}} <ArrowUpRight :size="17" /></RouterLink><a href="#pv-approach" class="pv-btn pv-btn-quiet">{{t.heroSecond}} <ArrowDown :size="17" /></a></div>
        </div>
        <span class="pv-edge-label">{{t.heroSide}}</span>
        <div class="pv-hero-corner" aria-hidden="true"><span>PS</span><i></i><span></span></div>
      </div>
    </section>

    <div class="pv-band"><div class="pv-band-track"><span v-for="(item,i) in [...t.marquee,...t.marquee]" :key="i">{{item}}<b>✦</b></span></div></div>

    <section id="pv-approach" class="pv-intro pv-container">
      <div class="pv-intro-heading pv-reveal"><p class="pv-label">{{t.introLabel}}</p><h2>{{t.introTitle}}<em>{{t.introAccent}}</em></h2><p>{{t.introLead}}</p></div>
      <div class="pv-benefit-grid">
        <article v-for="(b,i) in t.benefits" :key="i" class="pv-benefit pv-reveal"><span class="pv-index">0{{i+1}}</span><div class="pv-benefit-symbol"><component :is="[Globe2,Layers3,FileCheck2,Handshake][i]" :size="24" :stroke-width="1.35" /></div><h3>{{b.title}}</h3><p>{{b.body}}</p><div class="pv-benefit-line"></div></article>
      </div>
    </section>

    <section class="pv-model-section"><div class="pv-container">
      <div class="pv-model-heading pv-reveal"><p class="pv-label">{{t.modelsLabel}}</p><h2>{{t.modelsTitle}} <em>{{t.modelsAccent}}</em></h2><p>{{t.modelsSub}}</p></div>
      <div class="pv-model-layout pv-reveal">
        <div class="pv-model-select" role="tablist" aria-label="Cooperation models"><button v-for="(m,i) in t.models" :key="i" :id="`pv-tab-${i}`" type="button" role="tab" :aria-selected="activeModel === i" :aria-controls="'pv-model-panel'" :class="{selected:activeModel===i}" @click="activeModel=i"><span>0{{i+1}}</span><strong>{{m.label}}</strong><ArrowUpRight :size="20" /></button></div>
        <div id="pv-model-panel" class="pv-model-detail" role="tabpanel" :aria-labelledby="`pv-tab-${activeModel}`" :key="activeModel"><span class="pv-model-watermark">0{{activeModel+1}}</span><div class="pv-model-detail-inner"><span class="pv-label">{{t.models[activeModel].label}}</span><h3>{{t.models[activeModel].title}}</h3><p class="pv-model-summary">{{t.models[activeModel].summary}}</p><ul><li v-for="point in t.models[activeModel].points" :key="point"><Check :size="17"/>{{point}}</li></ul><p class="pv-model-note"><ShieldCheck :size="16" /> {{t.models[activeModel].note}}</p></div></div>
      </div>
    </div></section>

    <section class="pv-markets pv-container"><div class="pv-markets-head pv-reveal"><p class="pv-label">{{t.marketsLabel}}</p><h2>{{t.marketsTitle}}<em>{{t.marketsAccent}}</em></h2><p>{{t.marketsIntro}}</p></div>
      <div class="pv-market-layout pv-reveal"><div class="pv-market-display" :key="t.markets[activeMarket].slug"><img :src="img(t.markets[activeMarket].photo)" :alt="t.markets[activeMarket].name" loading="lazy" /><div class="pv-market-display-shade"></div><div class="pv-market-info"><span>{{t.markets[activeMarket].status}}</span><h3>{{t.markets[activeMarket].name}}</h3><p>{{t.markets[activeMarket].intro}}</p><RouterLink :to="marketLink(t.markets[activeMarket].slug)">{{t.viewMarket}} <ArrowUpRight :size="18" /></RouterLink></div></div><div class="pv-market-aside"><div class="pv-market-aside-head"><span>PRO STEEL / MARKET INDEX</span><strong>{{String(activeMarket+1).padStart(2,'0')}} / {{String(t.markets.length).padStart(2,'0')}}</strong></div><div class="pv-market-options"><button v-for="(m,i) in t.markets" :key="m.slug" type="button" :class="{selected:activeMarket===i}" @click="activeMarket=i"><small>{{String(i+1).padStart(2,'0')}}</small><span>{{m.name}}</span><ArrowUpRight :size="19"/></button></div><div class="pv-market-legal"><ShieldCheck :size="20"/><p>{{t.markets[activeMarket].disclaimer}}</p></div></div></div>
    </section>

    <section class="pv-process"><div class="pv-container"><div class="pv-process-heading pv-reveal"><p class="pv-label">{{t.processLabel}}</p><h2>{{t.processTitle}} <em>{{t.processAccent}}</em></h2></div><div class="pv-process-grid"><article v-for="(step,i) in t.process" :key="i" class="pv-step pv-reveal"><div class="pv-step-top"><strong>{{step[0]}}</strong><component :is="steps[i]" :size="23" :stroke-width="1.4"/></div><h3>{{step[1]}}</h3><p>{{step[2]}}</p></article></div></div></section>

    <section class="pv-principle"><div class="pv-principle-img" :style="{backgroundImage:`url(${img(3)})`}" aria-hidden="true"></div><div class="pv-container pv-principle-inner pv-reveal"><span class="pv-label">{{t.promiseLabel}}</span><h2>“{{t.promiseTitle}}”</h2><p>{{t.promiseText}}</p></div></section>

    <section class="pv-close"><div class="pv-container pv-close-layout"><div class="pv-close-heading pv-reveal"><span class="pv-label">{{t.closingLabel}}</span><h2>{{t.closingTitle}}<em>{{t.closingAccent}}</em></h2><p>{{t.closingText}}</p><small>{{t.legal}}</small></div><div class="pv-close-actions pv-reveal"><RouterLink :to="link('contact')" class="pv-btn pv-btn-gold">{{t.closingButton}} <ArrowUpRight :size="20"/></RouterLink><RouterLink :to="link('products')" class="pv-btn pv-btn-border">{{t.closingSecondary}} <ArrowUpRight :size="18"/></RouterLink><div class="pv-close-mark">PRO <span>STEEL</span> / PARTNERSHIPS</div></div></div></section>
  </div>
</template>

<style scoped>
.pv-page{--pgold:#c7a067;--plight:#edf0ee;--pmute:#a8b5bd;background:#0c1116;color:var(--plight);overflow:hidden;font-family:Inter,Arial,sans-serif}.pv-page[dir="rtl"]{font-family:Tahoma,Arial,sans-serif}.pv-page h1,.pv-page h2,.pv-page h3,.pv-page p{margin-top:0}.pv-page em{font-style:normal;color:var(--pgold)}.pv-container{width:min(1190px,calc(100% - 80px));margin-inline:auto}.pv-label,.pv-overline{color:var(--pgold);font-size:10px;letter-spacing:.22em;font-weight:750;text-transform:uppercase}.pv-page[dir="rtl"] .pv-label,.pv-page[dir="rtl"] .pv-overline{letter-spacing:0}.pv-page h2{font-size:clamp(33px,4vw,57px);font-weight:650;letter-spacing:-.055em;line-height:1.12}.pv-page[dir="rtl"] h2{letter-spacing:0;line-height:1.43}.pv-page h2 em{display:block}.pv-page a,.pv-page button{transition:all .3s ease}.pv-hero{min-height:clamp(680px,100svh,960px);position:relative;display:flex;align-items:center;background:#101820;isolation:isolate}.pv-hero-picture{position:absolute;inset:0 0 0 40%;background-position:center;background-size:cover;filter:grayscale(.35) brightness(.65);transform:scale(1.04);animation:pv-bg-in 1.5s both}.pv-hero-picture:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#0c1116 2%,rgba(12,17,22,.75) 30%,rgba(12,17,22,.08) 95%),linear-gradient(0deg,#0c1116,transparent 38%)}.pv-hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(201,170,120,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(201,170,120,.045) 1px,transparent 1px);background-size:110px 110px;mask-image:linear-gradient(90deg,black,transparent 80%);pointer-events:none}.pv-hero-frame{position:relative;z-index:1;width:min(1260px,calc(100% - 100px));margin:0 auto;padding:145px 0 90px;display:flex;min-height:inherit;align-items:center}.pv-hero-copy{width:min(720px,77%)}.pv-overline{display:flex;gap:12px;align-items:center;animation:pv-rise .8s .05s both}.pv-pulse{display:inline-block;width:22px;height:1px;background:#c7a067;box-shadow:0 0 12px #c7a067}.pv-hero-minilabel{display:block;font-size:11px;letter-spacing:.17em;margin:62px 0 22px;color:#c3ccd0;animation:pv-rise .8s .12s both}.pv-hero h1{font-size:clamp(46px,6vw,84px);line-height:1.03;font-weight:650;letter-spacing:-.065em;margin:0 0 25px;max-width:790px}.pv-hero h1 span,.pv-hero h1 strong,.pv-hero h1 em{display:block;font-weight:inherit;animation:pv-rise .85s both}.pv-hero h1 span:first-child{animation-delay:.15s}.pv-hero h1 strong{animation-delay:.22s}.pv-hero h1 span:nth-child(3){animation-delay:.32s}.pv-hero h1 em{animation-delay:.42s}.pv-hero h1 .pv-thin{font-size:.54em;font-weight:450;letter-spacing:-.035em;color:#e1e4e3}.pv-page[dir="rtl"] .pv-hero h1{letter-spacing:0;line-height:1.25}.pv-page[dir="rtl"] .pv-hero h1 .pv-thin{letter-spacing:0}.pv-hero-desc{max-width:530px;font-size:15px;line-height:1.9;color:#c0ccd0;animation:pv-rise .9s .52s both}.pv-hero-actions{display:flex;flex-wrap:wrap;gap:22px;align-items:center;margin-top:30px;animation:pv-rise .9s .6s both}.pv-btn{display:inline-flex;align-items:center;justify-content:center;gap:15px;padding:16px 22px;font-size:11px;font-weight:750;letter-spacing:.07em;min-height:53px;text-decoration:none;text-align:center}.pv-btn:hover{transform:translateY(-4px)}.pv-btn-gold{background:var(--pgold);color:#0c1116}.pv-btn-quiet{color:#e5e8e9;border-bottom:1px solid rgba(238,240,239,.4);padding-inline:0}.pv-btn-border{border:1px solid rgba(237,240,238,.43);color:#f3f3f3}.pv-edge-label{position:absolute;inset-inline-end:0;top:50%;transform:translateY(-50%);writing-mode:vertical-rl;letter-spacing:.28em;font-size:10px;color:#cbd1d4;opacity:.75}.pv-hero-corner{position:absolute;bottom:40px;inset-inline-start:0;display:flex;align-items:center;gap:18px;color:#8d9aa2;letter-spacing:.15em;font-size:10px}.pv-hero-corner i{width:80px;height:1px;background:#b69a72}.pv-page[dir="rtl"] .pv-hero-picture{inset:0 40% 0 0}.pv-page[dir="rtl"] .pv-hero-picture:after{background:linear-gradient(270deg,#0c1116 2%,rgba(12,17,22,.75) 30%,rgba(12,17,22,.08) 95%),linear-gradient(0deg,#0c1116,transparent 38%)}.pv-band{padding:19px 0;background:#131e26;border-block:1px solid rgba(199,160,103,.25);overflow:hidden}.pv-band-track{width:max-content;display:flex;gap:35px;align-items:center;animation:pv-ticker 44s linear infinite}.pv-band-track span{white-space:nowrap;font-size:10px;color:#cbd3d6;letter-spacing:.18em;font-weight:650;display:inline-flex;gap:35px;align-items:center}.pv-band-track b{color:#b99160;font-size:14px;font-weight:400}.pv-intro{padding-block:135px 145px}.pv-intro-heading{max-width:810px}.pv-intro-heading h2{margin:20px 0 23px}.pv-intro-heading>p:last-child,.pv-model-heading>p:last-child,.pv-markets-head>p:last-child{font-size:16px;line-height:1.85;color:var(--pmute);max-width:670px}.pv-benefit-grid{display:grid;grid-template-columns:repeat(4,1fr);margin-top:77px;border-top:1px solid #30404a;border-bottom:1px solid #30404a}.pv-benefit{padding:35px 24px 35px 0;min-height:290px;position:relative}.pv-benefit+ .pv-benefit{padding-inline-start:22px;border-inline-start:1px solid #30404a}.pv-index{color:#c7a067;letter-spacing:.15em;font-size:10px}.pv-benefit-symbol{margin:37px 0 23px;color:#c7a067}.pv-benefit h3{font-size:19px;font-weight:550;letter-spacing:-.02em;line-height:1.3;margin-bottom:14px}.pv-benefit p{font-size:12px;line-height:1.9;color:#9ba9b3}.pv-benefit-line{height:2px;width:0;bottom:0;inset-inline-start:0;position:absolute;background:#c7a067;transition:width .35s}.pv-benefit:hover .pv-benefit-line{width:100%}.pv-model-section{background:#131d25;padding:126px 0 137px;position:relative}.pv-model-section:before{position:absolute;content:"";inset:0;background:radial-gradient(circle at 70% 35%,rgba(183,145,91,.09),transparent 40%);pointer-events:none}.pv-model-heading{max-width:800px;position:relative}.pv-model-heading h2{margin:19px 0 20px}.pv-model-layout{display:grid;grid-template-columns:.85fr 1.15fr;margin-top:55px;border:1px solid #384750;min-height:450px;position:relative}.pv-model-select{border-inline-end:1px solid #384750;display:flex;flex-direction:column}.pv-model-select button{flex:1;display:flex;align-items:center;gap:22px;text-align:start;border:0;border-bottom:1px solid #384750;padding:28px 30px;background:#141e26;color:#d4dadd;cursor:pointer}.pv-model-select button:last-child{border-bottom:0}.pv-model-select button.selected{background:#25313a;color:#fff;box-shadow:inset 3px 0 #c7a067}.pv-page[dir="rtl"] .pv-model-select button.selected{box-shadow:inset -3px 0 #c7a067}.pv-model-select button:hover{background:#26323b}.pv-model-select button span{font-size:11px;color:#c7a067;align-self:flex-start}.pv-model-select button strong{font-size:15px;line-height:1.5;font-weight:650;flex:1}.pv-model-select button svg{color:#c7a067}.pv-model-detail{padding:48px 55px;background:linear-gradient(145deg,#1b2933,#10171d);position:relative;overflow:hidden;animation:pv-rise .38s both}.pv-model-watermark{position:absolute;font-size:270px;font-weight:900;opacity:.035;right:15px;top:-115px;line-height:1;pointer-events:none}.pv-model-detail-inner{position:relative;z-index:1}.pv-model-detail h3{font-size:clamp(30px,3vw,46px);font-weight:550;letter-spacing:-.04em;line-height:1.12;max-width:500px;margin:16px 0}.pv-model-summary{font-size:14px;line-height:1.9;color:#b4c0c7;max-width:520px}.pv-model-detail ul{list-style:none;padding:0;margin:28px 0}.pv-model-detail li{display:flex;align-items:center;gap:13px;margin:13px 0;font-size:12px;color:#e6e7e6}.pv-model-detail li svg{color:var(--pgold);flex:none}.pv-model-note{display:flex;gap:10px;align-items:flex-start;font-size:11px;line-height:1.8;color:#a8b4bb;border-top:1px solid #3a4851;padding-top:22px}.pv-model-note svg{color:var(--pgold);flex:none;margin-top:1px}.pv-markets{padding-block:130px 145px}.pv-markets-head{max-width:850px}.pv-markets-head h2{margin:19px 0 20px}.pv-market-layout{display:grid;grid-template-columns:1.55fr .65fr;margin-top:56px;min-height:525px;border:1px solid #35454e}.pv-market-display{min-height:525px;position:relative;overflow:hidden;animation:pv-rise .45s both}.pv-market-display>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(.7) brightness(.67)}.pv-market-display-shade{position:absolute;inset:0;background:linear-gradient(0deg,rgba(7,12,16,.96),rgba(7,12,16,.1) 80%),linear-gradient(90deg,rgba(7,12,16,.45),transparent)}.pv-market-info{position:absolute;bottom:38px;inset-inline:40px;max-width:530px}.pv-market-info>span{color:#e9bd7b;font-size:10px;letter-spacing:.17em}.pv-market-info h3{font-size:clamp(33px,4vw,57px);font-weight:620;margin:15px 0}.pv-market-info p{color:#d2d7d9;line-height:1.8;font-size:13px}.pv-market-info a{display:inline-flex;gap:13px;align-items:center;color:#e6bd83;font-size:11px;font-weight:800;margin-top:14px}.pv-market-aside{display:flex;flex-direction:column;background:#17232c}.pv-market-aside button{min-height:107px;text-align:start;border:0;border-bottom:1px solid #374751;background:transparent;color:#c9d0d3;display:flex;align-items:center;gap:17px;padding:20px;cursor:pointer}.pv-market-aside button.selected{background:#263640;color:#fff}.pv-market-aside button:hover{background:#2a3943}.pv-market-aside button small{font-size:10px;color:#c7a067}.pv-market-aside button span{font-size:14px;font-weight:700;flex:1}.pv-market-aside button svg{color:#c7a067}.pv-market-legal{margin-top:auto;padding:23px;display:flex;align-items:flex-start;gap:13px}.pv-market-legal svg{color:#b79668;flex:none}.pv-market-legal p{font-size:11px;color:#9faeb8;line-height:1.75}.pv-process{background:#151f27;padding:128px 0 145px}.pv-process-heading{max-width:810px}.pv-process-heading h2{margin-top:20px}.pv-process-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:65px}.pv-step{padding:26px 20px 24px;border-top:1px solid #ae8b5b;background:#1d2a33;min-height:265px;transition:transform .35s}.pv-step:hover{transform:translateY(-8px)}.pv-step-top{display:flex;align-items:center;justify-content:space-between;color:#c7a067}.pv-step-top strong{font-size:27px;font-weight:550}.pv-step h3{font-size:17px;line-height:1.4;font-weight:650;margin:50px 0 12px}.pv-step p{font-size:12px;line-height:1.85;color:#a9b5bd}.pv-principle{min-height:480px;position:relative;display:flex;align-items:center;isolation:isolate;background:#0b1014}.pv-principle-img{position:absolute;inset:0;background-size:cover;background-position:center;filter:brightness(.35) grayscale(.25)}.pv-principle:after{position:absolute;content:"";inset:0;background:linear-gradient(90deg,rgba(5,10,14,.97),rgba(5,10,14,.4) 90%);z-index:-1}.pv-principle-inner{position:relative;padding:90px 0}.pv-principle h2{font-size:clamp(42px,5.5vw,75px);font-weight:550;margin:20px 0;color:#f4e8d7}.pv-principle p{max-width:740px;line-height:1.9;font-size:16px;color:#d7dcde}.pv-close{padding:140px 0 145px;background:radial-gradient(circle at 85% 30%,#29343c 0%,#0b1116 52%)}.pv-close-layout{display:grid;grid-template-columns:1.4fr .6fr;gap:80px;align-items:center}.pv-close-heading h2{font-size:clamp(40px,5vw,73px);margin:22px 0}.pv-close-heading>p{font-size:15px;max-width:570px;line-height:1.9;color:#abb8c0}.pv-close-heading small{display:block;font-size:11px;line-height:1.7;color:#7f929b;margin-top:25px}.pv-close-actions{display:flex;flex-direction:column;gap:14px}.pv-close-actions .pv-btn{width:100%}.pv-close-mark{margin-top:35px;text-align:center;color:#818e97;letter-spacing:.16em;font-weight:800;font-size:11px}.pv-close-mark span{color:#c7a067}.pv-reveal{opacity:0;transform:translateY(26px);transition:opacity .75s ease,transform .75s ease}.pv-reveal.pv-visible{opacity:1;transform:none}.pv-page[dir="rtl"] .pv-model-detail h3,.pv-page[dir="rtl"] .pv-hero h1{letter-spacing:0}.pv-page[dir="rtl"] .pv-btn svg,.pv-page[dir="rtl"] .pv-market-info a svg{transform:scaleX(-1)}@keyframes pv-rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}@keyframes pv-bg-in{from{opacity:.6;transform:scale(1.1)}to{opacity:1;transform:scale(1.04)}}@keyframes pv-ticker{to{transform:translateX(-50%)}}@media(max-width:1050px){.pv-benefit-grid,.pv-process-grid{grid-template-columns:repeat(2,1fr)}.pv-benefit:nth-child(3){border-inline-start:0;padding-inline-start:0}.pv-model-layout{grid-template-columns:.9fr 1.1fr}.pv-model-detail{padding:35px}.pv-market-layout{grid-template-columns:1.1fr .7fr}}@media(max-width:700px){.pv-container{width:calc(100% - 36px)}.pv-hero-frame{width:calc(100% - 36px);padding-top:125px}.pv-hero{min-height:740px}.pv-hero-picture{inset:0;opacity:.55}.pv-hero-picture:after{background:linear-gradient(90deg,rgba(8,13,17,.96),rgba(8,13,17,.6)),linear-gradient(0deg,#0c1116,transparent)}.pv-page[dir="rtl"] .pv-hero-picture{inset:0}.pv-page[dir="rtl"] .pv-hero-picture:after{background:linear-gradient(270deg,rgba(8,13,17,.96),rgba(8,13,17,.6)),linear-gradient(0deg,#0c1116,transparent)}.pv-hero-copy{width:100%}.pv-hero h1{font-size:clamp(45px,11.5vw,70px)}.pv-hero-minilabel{margin-top:35px}.pv-edge-label{display:none}.pv-hero-desc{font-size:14px}.pv-hero-actions{gap:12px}.pv-btn{font-size:10px}.pv-intro,.pv-markets{padding-block:80px}.pv-model-section,.pv-process,.pv-close{padding-block:85px}.pv-benefit-grid{grid-template-columns:1fr;margin-top:40px}.pv-benefit,.pv-benefit + .pv-benefit,.pv-benefit:nth-child(3){border-inline-start:0;border-bottom:1px solid #33414a;padding:24px 0;min-height:unset}.pv-benefit-symbol{margin:20px 0}.pv-model-layout,.pv-market-layout,.pv-close-layout{grid-template-columns:1fr}.pv-model-select{border-inline-end:0}.pv-model-select button{min-height:77px;padding:17px}.pv-model-detail{min-height:420px}.pv-market-display{min-height:445px}.pv-market-info{inset-inline:22px;bottom:25px}.pv-market-aside button{min-height:74px}.pv-process-grid{grid-template-columns:1fr;gap:14px}.pv-step{min-height:220px}.pv-step h3{margin-top:30px}.pv-close-layout{gap:30px}.pv-principle{min-height:390px}.pv-hero-corner{bottom:20px}}@media(prefers-reduced-motion:reduce){.pv-hero-picture,.pv-band-track,.pv-hero h1 span,.pv-hero h1 strong,.pv-hero h1 em,.pv-hero-minilabel,.pv-hero-desc,.pv-hero-actions,.pv-overline{animation:none!important}.pv-reveal{opacity:1;transform:none;transition:none}.pv-step:hover,.pv-btn:hover{transform:none}}

/* V8 - expanded market explorer */
.pv-markets{position:relative}
.pv-market-layout{grid-template-columns:minmax(0,1.45fr) minmax(310px,.68fr);min-height:570px;box-shadow:0 26px 72px rgba(0,0,0,.25)}
.pv-market-display{min-height:570px}
.pv-market-aside{min-height:0;max-height:570px;overflow:hidden}
.pv-market-aside-head{display:flex;align-items:center;justify-content:space-between;gap:15px;padding:20px 22px;border-bottom:1px solid #46525a;color:#c7a067;font-size:10px;letter-spacing:.12em;background:#0f1a21}
.pv-market-aside-head strong{font-size:15px;white-space:nowrap}
.pv-market-options{overflow-y:auto;min-height:0;flex:1;scrollbar-width:thin;scrollbar-color:#866e4e #17232c}
.pv-market-options button{min-height:66px;padding:13px 20px;transition:background .2s,box-shadow .2s}
.pv-market-options button.selected{box-shadow:inset 3px 0 #c7a067}
.pv-page[dir="rtl"] .pv-market-options button.selected{box-shadow:inset -3px 0 #c7a067}
.pv-market-options button span{font-size:12px}
.pv-market-legal{margin:0;padding:16px 20px;border-top:1px solid #36454f;background:#101b23}
.pv-market-legal p{margin:0}
.pv-market-display>img{transition:transform .65s ease,filter .65s ease}
.pv-market-display:hover>img{transform:scale(1.035)}
.pv-market-info{max-width:560px}
@media(max-width:900px){.pv-market-layout{grid-template-columns:minmax(0,1fr) 280px}}
@media(max-width:700px){.pv-market-layout{display:flex;flex-direction:column}.pv-market-display{min-height:450px}.pv-market-aside{max-height:none}.pv-market-options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));max-height:300px}.pv-market-options button{min-height:60px;padding:11px 13px}.pv-market-options button span{font-size:11px}.pv-market-aside-head{padding:14px 16px}}
</style>
