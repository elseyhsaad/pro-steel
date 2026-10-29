
// PRO STEEL V6 — Product Catalogue
// Historical records and potential sourcing categories.
// 3D dimensions are illustrative, not manufacturing CAD.

export const categories = [
  {id:'hot', en:'Hot-Rolled Steel Bars', ar:'قضبان الدرفلة الساخنة', tr:'Sıcak Hadde Ürünleri'},
  {id:'cold', en:'Cold-Drawn Steel Bars', ar:'قضبان السحب البارد', tr:'Soğuk Çekme Ürünleri'},
  {id:'pipes', en:'Steel Pipes & Oil/Gas', ar:'الأنابيب والنفط والغاز', tr:'Çelik Borular ve Petrol/Gaz'},
  {id:'coated', en:'Coated Steel Coils', ar:'اللفائف المطلية والمجلفنة', tr:'Kaplamalı Çelik Rulolar'},
  {id:'roofing', en:'Roofing Sheets', ar:'صفائح الأسقف', tr:'Çatı Sacları'},
  {id:'flat', en:'Flat Steel & Plates', ar:'صفائح وحديد مسطح', tr:'Yassı Çelik ve Levhalar'},
  {id:'structural', en:'Structural Steel', ar:'المقاطع الإنشائية', tr:'Yapısal Çelik'},
  {id:'reinforcement', en:'Rebar & Wire Rod', ar:'التسليح والأسلاك', tr:'İnşaat Demiri ve Filmaşin'}
]

export const products = [
 
{
  id:'seamless-pipes',
  category:'pipes',
  en:'Seamless Steel Pipes',
  ar:'أنابيب فولاذية بدون لحام',
  tr:'Dikişsiz Çelik Borular',
  shape:'pipe',
  photo:6,
  image:'product16.png',
  grade:'ST42 · ST44',
  sizes:'Ø 60 × 5 · Ø 114 × 4 mm',
  source:'historical',
  model3d:{
    shape:'pipe',
    finish:'raw',
    dimensions:{diameter:114,wall:4}
  }
},
  {
    id:'galvanized-pipes',
    category:'pipes',
    en:'Galvanized Steel Pipes',
    ar:'أنابيب فولاذية مجلفنة',
    tr:'Galvanizli Çelik Borular',
    shape:'pipe',
    photo:2,
    grade:'GI · ST44',
    sizes:'Ø 89 × 4 · Ø 114 × 4 mm',
    source:'historical',
    model3d:{
      shape:'pipe',
      finish:'galvanized',
      dimensions:{diameter:89,wall:4}
    }
  },

{
  id:'alloy-pipes',
  category:'pipes',
  en:'Alloy Steel Pipes',
  ar:'أنابيب فولاذية سبائكية',
  tr:'Alaşımlı Çelik Borular',
  shape:'pipe',
  photo:6,
  image:'product18.png',
  grade:'42CrMo4',
  sizes:'Ø 133 × 30 mm',
  source:'historical',
  model3d:{
    shape:'pipe',
    finish:'alloy',
    dimensions:{diameter:133,wall:30}
  }
},


{
  id:'black-coated-pipes',
  category:'pipes',
  en:'Black Coated Pipes',
  ar:'أنابيب مطلية بالأسود',
  tr:'Siyah Kaplamalı Borular',
  shape:'pipe',
  photo:6,
  image:'product17.png',
  grade:'Black coated',
  sizes:'Ø 48 × 4 · Ø 76 × 4 mm',
  source:'historical',
  model3d:{
    shape:'pipe',
    finish:'black',
    dimensions:{diameter:76,wall:4}
  }
},
  {
    id:'steel-profiles',
    category:'structural',
    en:'Square & Rectangular Hollow Profiles',
    ar:'مقاطع مجوفة مربعة ومستطيلة',
    tr:'Kare ve Dikdörtgen Kutu Profiller',
    shape:'box',
    photo:2,
     image:'product19.png',
    grade:'Square / Rectangular',
    sizes:'20×20 · 30×20 · 40×40 mm',
    source:'historical',
    model3d:{
      shape:'box',
      finish:'raw',
      dimensions:{width:30,height:20,wall:2}
    }
  },
  {
    id:'steel-angles',
    category:'structural',
    en:'Equal Steel Angles',
    ar:'زوايا فولاذية متساوية',
    tr:'Eşit Kenar Çelik Köşebentler',
    shape:'angle',
    photo:3,
     image:'product20.png',
    grade:'S235JR',
    sizes:'24 × 24 × 1.8 mm',
    source:'historical',
    model3d:{
      shape:'angle',
      finish:'hot-rolled',
      dimensions:{width:24,height:24,wall:1.8}
    }
  },
  {
    id:'round-bars',
    category:'hot',
    en:'Solid Round Steel Bars',
    ar:'قضبان فولاذية دائرية مصمتة',
    tr:'Dolu Yuvarlak Çelik Çubuklar',
    shape:'bar',
    photo:3,
    grade:'ST37 · ST44 · ST52 · 42CrMo4 · S235JR · SAE 1045',
    sizes:'Ø 28 · Ø 85 · Ø 120 mm',
    source:'historical',
    model3d:{
      shape:'bar',
      finish:'machined',
      dimensions:{diameter:85}
    }
  },
  {
    id:'hot-flat-bars',
    category:'hot',
    en:'Hot-Rolled Flat Steel Bars',
    ar:'قضبان مسطحة مدرفلة على الساخن',
    tr:'Sıcak Haddelenmiş Düz Lama Çelik Çubuklar',
    shape:'flatbar',
    photo:3,
    grade:'Specifications on request',
    sizes:'Available on request',
    source:'sourcing',
    model3d:{
      shape:'flatbar',
      finish:'hot-rolled',
      dimensions:{width:50,height:8}
    }
  },
  {
    id:'hot-square-bars',
    category:'hot',
    en:'Hot-Rolled Square Steel Bars',
    ar:'قضبان مربعة مدرفلة على الساخن',
    tr:'Sıcak Haddelenmiş Kare Çelik Çubuklar',
    shape:'squarebar',
    photo:3,
    grade:'Specifications on request',
    sizes:'Available on request',
    source:'sourcing',
    model3d:{
      shape:'squarebar',
      finish:'hot-rolled',
      dimensions:{width:35}
    }
  },
  {
    id:'hot-hex-bars',
    category:'hot',
    en:'Hot-Rolled Hexagonal Steel Bars',
    ar:'قضبان سداسية مدرفلة على الساخن',
    tr:'Sıcak Haddelenmiş Altıköşe Çelik Çubuklar',
    shape:'hexbar',
    photo:3,
    grade:'Specifications on request',
    sizes:'Available on request',
    source:'sourcing',
    model3d:{
      shape:'hexbar',
      finish:'hot-rolled',
      dimensions:{diameter:45}
    }
  },
  {
    id:'hot-tee-bars',
    category:'hot',
    en:'Hot-Rolled Tee Bars',
    ar:'قضبان فولاذية بشكل T مدرفلة على الساخن',
    tr:'Sıcak Haddelenmiş T Çelik Çubuklar – Tee Bars',
    shape:'tee',
    photo:3,
    grade:'Specifications on request',
    sizes:'Available on request',
    source:'sourcing',
    model3d:{
      shape:'tee',
      finish:'hot-rolled',
      dimensions:{width:55,height:55,wall:8}
    }
  },
  {
    id:'hot-custom-bars',
    category:'hot',
    en:'Custom-Made Steel Bars',
    ar:'قضبان فولاذية بتصميم خاص',
    tr:'Özel Üretim Çelik Çubuklar',
    shape:'custom',
    photo:3,
    grade:'Specifications on request',
    sizes:'Available on request',
    source:'sourcing',
    model3d:{
      shape:'custom',
      finish:'raw',
      dimensions:{width:45}
    }
  },
  {
    id:'cold-flat-bars',
    category:'cold',
    en:'Cold-Drawn Flat Steel Bars',
    ar:'قضبان مسطحة مسحوبة على البارد',
    tr:'Soğuk Çekme Düz Lama Çelik Çubuklar',
    shape:'flatbar',
    photo:3,
    grade:'Specifications on request',
    sizes:'Available on request',
    source:'sourcing',
    model3d:{
      shape:'flatbar',
      finish:'machined',
      dimensions:{width:50,height:8}
    }
  },
  {
    id:'cold-square-bars',
    category:'cold',
    en:'Cold-Drawn Square Steel Bars',
    ar:'قضبان مربعة مسحوبة على البارد',
    tr:'Soğuk Çekme Kare Çelik Çubuklar',
    shape:'squarebar',
    photo:3,
    grade:'Specifications on request',
    sizes:'Available on request',
    source:'sourcing',
    model3d:{
      shape:'squarebar',
      finish:'machined',
      dimensions:{width:35}
    }
  },
  {
    id:'cold-round-bars',
    category:'cold',
    en:'Cold-Drawn Round Steel Bars',
    ar:'قضبان دائرية مسحوبة على البارد',
    tr:'Soğuk Çekme Yuvarlak Çelik Çubuklar',
    shape:'bar',
    photo:3,
    grade:'Specifications on request',
    sizes:'Available on request',
    source:'sourcing',
    model3d:{
      shape:'bar',
      finish:'machined',
      dimensions:{diameter:45}
    }
  },
  {
    id:'cold-hex-bars',
    category:'cold',
    en:'Cold-Drawn Hexagonal Steel Bars',
    ar:'قضبان سداسية مسحوبة على البارد',
    tr:'Soğuk Çekme Altıköşe Çelik Çubuklar',
    shape:'hexbar',
    photo:3,
    grade:'Specifications on request',
    sizes:'Available on request',
    source:'sourcing',
    model3d:{
      shape:'hexbar',
      finish:'machined',
      dimensions:{diameter:45}
    }
  },
  {
    id:'oil-gas-pipelines',
    category:'pipes',
    en:'Oil and Gas Pipelines',
    ar:'أنابيب النفط والغاز',
    tr:'Petrol ve Gaz Boru Hatları',
    shape:'pipe',
    photo:5,
    grade:'ASTM A106 / API specifications subject to supplier',
    sizes:'Project-specific grades and dimensions',
    source:'sourcing',
    model3d:{
      shape:'pipe',
      finish:'black',
      dimensions:{diameter:168,wall:10}
    }
  },
  {
    id:'ppgi-coils',
    category:'coated',
    en:'PPGI Prepainted Steel Coils',
    ar:'لفائف فولاذ مطلية مسبقاً PPGI',
    tr:'PPGI Boyalı Galvanizli Çelik Rulolar',
    shape:'coil',
    photo:1,
    grade:'Color-coated galvanized substrate',
    sizes:'Colors and coating upon request',
    source:'sourcing',
    model3d:{
      shape:'coil',
      finish:'blue',
      dimensions:{width:1200}
    }
  },
  {
    id:'ppgl-coils',
    category:'coated',
    en:'PPGL Prepainted Steel Coils',
    ar:'لفائف فولاذ مطلية مسبقاً PPGL',
    tr:'PPGL Boyalı Galvalume Çelik Rulolar',
    shape:'coil',
    photo:1,
    grade:'Specifications on request',
    sizes:'Available on request',
    source:'sourcing',
    model3d:{
      shape:'coil',
      finish:'red',
      dimensions:{width:1200}
    }
  },
  {
    id:'galvanized-coils',
    category:'coated',
    en:'Galvanized Steel Coils',
    ar:'لفائف فولاذية مجلفنة',
    tr:'Galvanizli Çelik Rulolar',
    shape:'coil',
    photo:1,
    grade:'Specifications on request',
    sizes:'Available on request',
    source:'sourcing',
    model3d:{
      shape:'coil',
      finish:'galvanized',
      dimensions:{width:1200}
    }
  },
  {
    id:'aluzinc-coils',
    category:'coated',
    en:'Aluminum-Zinc / Galvalume Coils',
    ar:'لفائف فولاذ مطلية بالألومنيوم والزنك',
    tr:'Aluzinc / Galvalume Rulolar',
    shape:'coil',
    photo:1,
    grade:'Specifications on request',
    sizes:'Available on request',
    source:'sourcing',
    model3d:{
      shape:'coil',
      finish:'galvanized',
      dimensions:{width:1200}
    }
  },
  {
    id:'aluminum-zinc-plate',
    category:'flat',
    en:'Aluminum Zinc Plate',
    ar:'ألواح فولاذية مطلية بالألومنيوم والزنك',
    tr:'Alüminyum Çinko Kaplı Sac',
    shape:'sheet',
    photo:1,
    grade:'Specifications on request',
    sizes:'Available on request',
    source:'sourcing',
    model3d:{
      shape:'sheet',
      finish:'galvanized',
      dimensions:{width:1200}
    }
  },
  {
    id:'ppgi-roofing',
    category:'roofing',
    en:'PPGI Roofing Sheets',
    ar:'صفائح أسقف PPGI مطلية',
    tr:'PPGI Boyalı Çatı Sacları',
    shape:'corrugated',
    photo:1,
    grade:'Specifications on request',
    sizes:'Available on request',
    source:'sourcing',
    model3d:{
      shape:'corrugated',
      finish:'blue',
      dimensions:{width:1100}
    }
  },
  {
    id:'ppgi-corrugated',
    category:'roofing',
    en:'PPGI Corrugated Roofing Sheets',
    ar:'صفائح أسقف مموجة PPGI',
    tr:'PPGI Oluklu Çatı Sacları',
    shape:'corrugated',
    photo:1,
    grade:'Specifications on request',
    sizes:'Available on request',
    source:'sourcing',
    model3d:{
      shape:'corrugated',
      finish:'red',
      dimensions:{width:1100}
    }
  },
  {
    id:'galvanized-corrugated',
    category:'roofing',
    en:'Galvanized Corrugated Roofing Sheets',
    ar:'صفائح أسقف مموجة مجلفنة',
    tr:'Galvanizli Oluklu Çatı Sacları',
    shape:'corrugated',
    photo:1,
    grade:'Specifications on request',
    sizes:'Available on request',
    source:'sourcing',
    model3d:{
      shape:'corrugated',
      finish:'galvanized',
      dimensions:{width:1100}
    }
  },
  {
    id:'rebar',
    category:'reinforcement',
    en:'Reinforcing Steel Bars',
    ar:'حديد التسليح',
    tr:'İnşaat Demiri',
    shape:'rebar',
    photo:3,
    grade:'Specifications on request',
    sizes:'Available on request',
    source:'sourcing',
    model3d:{
      shape:'rebar',
      finish:'hot-rolled',
      dimensions:{diameter:20}
    }
  },
  {
    id:'wire-rod',
    category:'reinforcement',
    en:'Steel Wire Rod',
    ar:'لفائف قضبان الأسلاك',
    tr:'Filmaşin',
    shape:'wire',
    photo:3,
    grade:'Specifications on request',
    sizes:'Available on request',
    source:'sourcing',
    model3d:{
      shape:'wire',
      finish:'raw',
      dimensions:{diameter:9}
    }
  },
  {
    id:'hot-rolled-coils',
    category:'flat',
    en:'Hot-Rolled Steel Coils',
    ar:'لفائف الصلب المدرفل على الساخن',
    tr:'Sıcak Haddelenmiş Rulolar',
    shape:'coil',
    photo:1,
    grade:'Specifications on request',
    sizes:'Available on request',
    source:'sourcing',
    model3d:{
      shape:'coil',
      finish:'hot-rolled',
      dimensions:{width:1200}
    }
  },
  {
    id:'cold-rolled-sheets',
    category:'flat',
    en:'Cold-Rolled Sheets & Coils',
    ar:'صفائح ولفائف مدرفلة على البارد',
    tr:'Soğuk Haddelenmiş Sac ve Rulolar',
    shape:'sheet',
    photo:1,
    grade:'Specifications on request',
    sizes:'Available on request',
    source:'sourcing',
    model3d:{
      shape:'sheet',
      finish:'machined',
      dimensions:{width:1200}
    }
  },
  {
    id:'heavy-plates',
    category:'flat',
    en:'Heavy Steel Plates',
    ar:'صفائح فولاذية ثقيلة',
    tr:'Kalın Çelik Levhalar',
    shape:'sheet',
    photo:1,
    grade:'Specifications on request',
    sizes:'Available on request',
    source:'sourcing',
    model3d:{
      shape:'sheet',
      finish:'raw',
      dimensions:{width:1200}
    }
  },
  {
    id:'structural-beams',
    category:'structural',
    en:'I / H Structural Steel Beams',
    ar:'عوارض فولاذية إنشائية I / H',
    tr:'I / H Yapısal Çelik Kirişler',
    shape:'beam',
    photo:3,
    grade:'Specifications on request',
    sizes:'Available on request',
    source:'sourcing',
    model3d:{
      shape:'beam',
      finish:'hot-rolled',
      dimensions:{width:120,height:160,wall:14}
    }
  }
]

// PRO STEEL V6 - Product Image Mapping
// Existing products (the original 7) remain unchanged.

const productImages = {
  'hot-flat-bars': 10,
  'hot-square-bars': 24,
  'hot-hex-bars': 22,
  'hot-tee-bars': 26,
  'hot-custom-bars': 29,

  'cold-flat-bars': 30,
  'cold-square-bars': 24,
  'cold-round-bars': 27,
  'cold-hex-bars': 22,

 'oil-gas-pipelines': 21,

  'ppgi-coils': 28,
  'ppgl-coils': 20,
  'galvanized-coils': 19,
  'aluzinc-coils': 13,

  'aluminum-zinc-plate': 16,

  'ppgi-roofing': 17,
  'ppgi-corrugated': 17,
  'galvanized-corrugated': 15,

  'rebar': 14,
  'wire-rod': 12,

  'hot-rolled-coils': 11,
  'cold-rolled-sheets': 13,
  'heavy-plates': 16,
  'structural-beams': 25
}

// Update only the images of newly added products.
products.forEach(product => {
  if (Object.prototype.hasOwnProperty.call(productImages, product.id)) {
    product.photo = productImages[product.id]
  }
})


// China sourcing catalogue: images product1.png ... product15.png.
// Product titles reflect reference screenshots; supplier origin and availability
// must be verified for every actual order. Standards are illustrative only.
export const chinaCategories = [
 {id:'china-gi',en:'Galvanized Coil (GI)',ar:'لفائف وصفائح الحديد المجلفن',tr:'Galvanizli Rulo (GI)'},
 {id:'china-gl',en:'Galvalume Coil (GL)',ar:'لفائف الألومنيوم والزنك',tr:'Galvalume Rulo (GL)'},
 {id:'china-ppgi',en:'PPGI / PPGL',ar:'الحديد المطلي مسبقاً',tr:'PPGI / PPGL'},
 {id:'china-corrugated',en:'Corrugated Steel Sheet',ar:'الصفائح الفولاذية المموجة',tr:'Oluklu Çelik Sac'},
 {id:'china-pipes',en:'Pipe & Tubes',ar:'الأنابيب الفولاذية',tr:'Çelik Boru ve Tüpler'},
 {id:'china-supply',en:'International Steel Supply Chains',ar:'سلاسل توريد الحديد الدولية',tr:'Uluslararası Çelik Tedarik Zinciri'},
 {id:'china-wear',en:'Wear Resistant Steel Plate',ar:'صفائح الفولاذ المقاومة للاهتراء',tr:'Aşınmaya Dayanıklı Çelik Levha'}
]
categories.push(...chinaCategories)

const chinaEntries = [
 {index:1,id:'galvanized-sheet',category:'china-gi',en:'Galvanized Sheet',ar:'صفائح فولاذية مجلفنة',tr:'Galvanizli Sac',shape:'sheet',finish:'galvanized',standard:'ASTM A653/A653M (example)',technicalType:'galvanized'},
 {index:2,id:'galvanized-coils',category:'china-gi',en:'Galvanized Steel Coil',ar:'لفائف فولاذية مجلفنة',tr:'Galvanizli Çelik Rulo',shape:'coil',finish:'galvanized',standard:'ASTM A653/A653M (example)',technicalType:'galvanized'},
 {index:3,id:'galvanized-sheet-coil',category:'china-gi',en:'Galvanized Steel Sheet in Coil',ar:'صفائح فولاذية مجلفنة على شكل لفائف',tr:'Rulo Halinde Galvanizli Çelik Sac',shape:'coil',finish:'galvanized',standard:'ASTM A653/A653M (example)',technicalType:'galvanized'},
 {index:4,id:'aluminum-zinc-plate',category:'china-gl',en:'Aluminum Zinc Plate',ar:'صفائح فولاذية مطلية بالألومنيوم والزنك',tr:'Alüminyum Çinko Kaplı Sac',shape:'sheet',finish:'galvanized',standard:'ASTM A792/A792M (example)',technicalType:'galvalume'},
 {index:5,id:'ppgi-manufacturer',category:'china-ppgi',en:'PPGI Manufacturer',ar:'منتجات PPGI المطلية مسبقاً',tr:'PPGI Üretim Ürünleri',shape:'coil',finish:'blue',standard:'ASTM A755/A755M (example)',technicalType:'ppgi'},
 {index:6,id:'ppgi-coils',category:'china-ppgi',en:'PPGI Coils Prepainted',ar:'لفائف فولاذية مطلية مسبقاً PPGI',tr:'Ön Boyalı PPGI Rulolar',shape:'coil',finish:'red',standard:'ASTM A755/A755M (example)',technicalType:'ppgi'},
 {index:7,id:'ppgi-galvanized-coils',category:'china-ppgi',en:'PPGI Coil Galvanized Steel',ar:'لفائف فولاذية مجلفنة ومطلية PPGI',tr:'PPGI Boyalı Galvanizli Rulo',shape:'coil',finish:'blue',standard:'ASTM A755/A755M (example)',technicalType:'ppgi'},
 {index:8,id:'ppgi-corrugated',category:'china-ppgi',en:'PPGI Corrugated Roofing Sheet',ar:'صفائح أسقف مموجة PPGI',tr:'PPGI Oluklu Çatı Sacı',shape:'corrugated',finish:'red',standard:'ASTM A755/A755M (example)',technicalType:'roof'},
 {index:9,id:'ppgi-roofing',category:'china-corrugated',en:'PPGI Roofing Sheet',ar:'صفائح أسقف مطلية PPGI',tr:'PPGI Boyalı Çatı Sacı',shape:'corrugated',finish:'blue',standard:'ASTM A755/A755M (example)',technicalType:'roof'},
 {index:10,id:'galvanized-corrugated',category:'china-corrugated',en:'Galvanized Corrugated Roofing Sheet',ar:'صفائح أسقف مموجة مجلفنة',tr:'Galvanizli Oluklu Çatı Sacı',shape:'corrugated',finish:'galvanized',standard:'ASTM A653/A653M (substrate example)',technicalType:'roof'},
 {index:11,id:'oil-gas-pipelines',category:'china-pipes',en:'Oil and Gas Pipelines',ar:'أنابيب النفط والغاز',tr:'Petrol ve Gaz Boruları',shape:'pipe',finish:'black',standard:'ASTM A106 / A213 / A335 / A333 / EN 10216-2 (application-dependent)',technicalType:'pipeline'},
 {index:12,id:'astm-a519-4140-pipe',category:'china-pipes',en:'ASTM A519 4140 Seamless Steel Pipe',ar:'أنبوب فولاذ سبائكي بدون لحام ASTM A519 4140',tr:'ASTM A519 4140 Dikişsiz Çelik Boru',shape:'pipe',finish:'alloy',standard:'ASTM A519/A519M; 4140 grade subject to mill certificate',technicalType:'a519'},
 {index:13,id:'wear-resistant-plate',category:'china-wear',en:'Wear Resistant Steel Plate',ar:'صفائح فولاذية مقاومة للاهتراء',tr:'Aşınmaya Dayanıklı Çelik Levha',shape:'sheet',finish:'hot-rolled',standard:'Grade-specific mill specification',technicalType:'wear'},
 {index:14,id:'wear-plate-buckets',category:'china-wear',en:'Premium Quality NM400 AR400 Q460 S460MC Wear Resistant Steel Plate HB400 HB450 QT for Loader Buckets',ar:'صفائح فولاذية لمعدات التحميل بمواصفات مقاومة للاهتراء',tr:'Yükleyici Kovaları İçin Aşınmaya Dayanıklı Çelik Levha',shape:'sheet',finish:'hot-rolled',standard:'NM400 / AR400 / other grades are not necessarily equivalent',technicalType:'wear'},
 {index:15,id:'wear-resistant-industrial',category:'china-wear',en:'Premium Wear-Resistant Steel Plates for Industrial Durability',ar:'صفائح فولاذية صناعية عالية المقاومة للاهتراء',tr:'Endüstriyel Aşınmaya Dayanıklı Çelik Levhalar',shape:'sheet',finish:'hot-rolled',standard:'Grade-specific mill specification',technicalType:'wear'}
]

const technicalSets = {
 galvanized: [['Product form','Coil / cut sheet'],['Zinc coating','Supplier-dependent; specify coating designation'],['Dimensions','Thickness, width, length and coil mass to confirm'],['Technical reference','ASTM A653/A653M; verify applicable designation']],
 galvalume: [['Product form','Coil / cut sheet'],['Coating','Aluminum–zinc alloy coating; type and mass to confirm'],['Dimensions','Thickness, width and length to confirm'],['Technical reference','ASTM A792/A792M for qualifying material']],
 ppgi: [['Substrate','Galvanized / aluminum-zinc coated steel, as ordered'],['Paint system','Primer / topcoat; resin and coating thickness to confirm'],['Dimensions','Thickness, width, inner diameter and coil weight to confirm'],['Technical reference','ASTM A755/A755M for applicable building sheets']],
 roof: [['Profile','Corrugated / trapezoidal profile (confirm profile drawing)'],['Finish','Prepainted or galvanized according to product'],['Dimensions','Base thickness, cover width, total width, length to confirm'],['Technical reference','Applicable substrate / prepainted sheet standards']],
 pipeline: [['Application','Oil, gas, boiler or heat-exchanger duties depend on specification'],['Outside diameter','To be confirmed by project and standard'],['Wall thickness','To be confirmed by schedule / selected grade'],['Technical reference','ASTM A106 / A213 / A335 / A333 / EN 10216-2; not interchangeable']],
 a519: [['Manufacturing','Seamless mechanical tubing'],['Steel grade','4140 alloy steel, when certified by mill'],['Dimensions','Outside diameter, wall thickness, tube length on request'],['Technical reference','ASTM A519/A519M (mechanical tubing, not automatically pipeline certified)']],
 wear: [['Product form','Wear-resistant plate'],['Hardness','HBW hardness range dependent on specific grade / test certificate'],['Dimensions','Thickness, width and length on request'],['Technical reference','NM400 / AR400 etc. subject to distinct mill standards and certification']]
}

// The first seven pre-existing historical records retain their provenance;
// the fifteen reference titles are mapped by ID rather than duplicated.
for (const entry of chinaEntries) {
 const existing = products.find(p => p.id === entry.id)
 const p = existing || {
   id: entry.id, source: 'sourcing', grade: 'Supplier confirmation required', sizes: 'On request',
   shape: entry.shape, model3d: {shape:entry.shape,finish:entry.finish,dimensions:{
     ...(entry.shape==='pipe'?{diameter:114,wall:6}:{}),
     ...(entry.shape==='sheet'||entry.shape==='coil'||entry.shape==='corrugated'?{width:1200}:{}),
   }}
 }
 p.en=entry.en;p.ar=entry.ar;p.tr=entry.tr
 p.chinaCategory=entry.category
 if(entry.id==='oil-gas-pipelines') p.chinaExtraCategories=['china-supply']
 p.image=`product${entry.index}.png`
 p.originMarket='China sourcing reference' // market, not certified country of origin
 p.countryOfOrigin=null // actual origin only with supplier / mill paperwork
 p.standards=[entry.standard]
 p.technicalSpecs=technicalSets[entry.technicalType].map(([label,value])=>({label,value}))
 p.specStatus='Illustrative reference; verify grade, dimensions and origin before quotation'
 p.referenceImageIndex=entry.index
 if(!existing) products.push(p)
}

// Consolidate commercially synonymous titles, while keeping distinct product forms.
// product1..product15 are all retained as photographs on their canonical pages.
const duplicates = {
  'galvanized-sheet-coil': 'galvanized-coils',
  'ppgi-manufacturer': 'ppgi-coils',
  'ppgi-galvanized-coils': 'ppgi-coils',
  'ppgi-roofing': 'ppgi-corrugated',
  'wear-plate-buckets': 'wear-resistant-plate',
  'wear-resistant-industrial': 'wear-resistant-plate'
}
export const productAliases = {...duplicates}
const extraGallery = {}
for(const [oldId,keepId] of Object.entries(duplicates)) {
  const old=products.find(p=>p.id===oldId)
  if(old?.image) (extraGallery[keepId] ||= []).push(old.image)
}
for(let i=products.length-1;i>=0;i--){
  if(duplicates[products[i].id]) products.splice(i,1)
}
// Preserve all supplied images, even where names were marketing duplicates.
for(const p of products){
 p.gallery=[...new Set([p.image||`steel-${p.photo}.png`,...(extraGallery[p.id]||[])])]
 if(p.id==='ppgi-coils') p.chinaExtraCategories=[...(p.chinaExtraCategories||[]),'china-ppgi']
 if(p.id==='ppgi-corrugated') p.chinaExtraCategories=[...(p.chinaExtraCategories||[]),'china-ppgi','china-corrugated']
}

// Preserve distinct legacy items. Their old thumbnail numbers and example
// dimensions remain available, but do not imply a stocked specification.
for (const p of products) {
 if (!p.image) p.image=`steel-${p.photo}.png`
 if (p.countryOfOrigin===undefined) p.countryOfOrigin=null
 if (!p.technicalSpecs) {
   const d=p.model3d?.dimensions||{}
   p.technicalSpecs=[
     {label:'Product family',value: categories.find(c=>c.id===p.category)?.en||p.category},
     {label:'Grade examples',value:p.grade||'On request'},
     {label:'Illustrative sizes',value:p.sizes||'Supplier confirmation required'},
     {label:'Illustrative 3D section (mm)',value:Object.entries(d).map(([k,v])=>`${k}: ${v}`).join(' / ')||'Representative geometry only'},
     {label:'Applicable standard',value:'Confirm grade and governing standard with manufacturer'}
   ]
 }
 if (!p.specStatus) p.specStatus='Historical example or product-family reference; availability, dimensions and origin require confirmation'
}

// Supplement legacy records with reference-standard families (not certifications).
const standardFamilies={
 'seamless-pipes':['ASTM A106/A106M (if specified for pressure service)','EN 10216 series (grade-dependent)'],
 'galvanized-pipes':['EN 10240 (if applicable to protective coatings)','Base-pipe standard to be agreed'],
 'alloy-pipes':['ASTM A519/A519M (for qualifying mechanical tube)','EN 10297-1 (where applicable)'],
 'steel-profiles':['EN 10219 (cold formed) or EN 10210 (hot finished), as selected'],
 'steel-angles':['EN 10056 dimensional series; EN 10025 grade family where applicable'],
 'round-bars':['EN 10060 dimension family; grade standard to be agreed'],
 'rebar':['EN 10080 product family; local grade and certification required'],
 'wire-rod':['EN 10017 / EN 10016 dimension and technical families, subject to product grade'],
 'structural-beams':['EN 10365 dimensions; steel grade to applicable specification']
}
for(const p of products){
 if(!p.standards?.length&&standardFamilies[p.id])p.standards=standardFamilies[p.id]
}


// Confirmed business-provided origin and target-market assignments (29 Oct 2026).
// These are commercial catalogue declarations, not mill or shipment certificates.
// Keep dimensional / grading references and 3D models unchanged.
const declaredProductMarkets = {
  'seamless-pipes': { origin: 'China', markets: ['Türkiye', 'Syria', 'Iraq'] },
  'galvanized-pipes': { origin: 'China', markets: ['Türkiye', 'Syria', 'Iraq'] },
  'alloy-pipes': { origin: 'China', markets: ['Türkiye', 'Syria', 'Iraq'] },
  'black-coated-pipes': { origin: 'China', markets: ['Türkiye', 'Syria', 'Iraq'] },
  'steel-profiles': { origin: 'Türkiye', markets: ['Türkiye', 'Syria'] },
  'steel-angles': { origin: 'Türkiye', markets: ['Türkiye', 'Syria'] },
  'round-bars': { origin: 'Türkiye', markets: ['Syria', 'Egypt'] },
  'hot-flat-bars': { origin: 'Türkiye', markets: ['Syria', 'Egypt'] },
  'hot-square-bars': { origin: 'Türkiye', markets: ['Syria', 'Egypt'] },
  'hot-hex-bars': { origin: 'Türkiye', markets: ['Syria', 'Egypt'] },
  'hot-tee-bars': { origin: 'Türkiye', markets: ['Syria', 'Egypt'] },
  'hot-custom-bars': { origin: 'Türkiye', markets: ['Syria', 'Egypt'] },
  'cold-flat-bars': { origin: 'Türkiye', markets: ['Syria', 'Egypt'] },
  'cold-square-bars': { origin: 'Türkiye', markets: ['Syria', 'Egypt'] },
  'cold-round-bars': { origin: 'Türkiye', markets: ['Syria', 'Egypt'] },
  'cold-hex-bars': { origin: 'Türkiye', markets: ['Syria', 'Egypt'] },
  'oil-gas-pipelines': { origin: 'China', markets: ['Türkiye', 'Syria', 'Iraq', 'Saudi Arabia', 'United Arab Emirates', 'Egypt'] },
  'ppgi-coils': { origin: 'China', markets: ['Türkiye', 'Syria', 'Iraq', 'Saudi Arabia', 'United Arab Emirates', 'Egypt'] },
  'ppgl-coils': { origin: 'China', markets: ['Türkiye', 'Syria', 'Iraq', 'Saudi Arabia', 'United Arab Emirates', 'Egypt'] },
  'galvanized-coils': { origin: 'China', markets: ['Türkiye', 'Syria', 'Iraq', 'Saudi Arabia', 'United Arab Emirates', 'Egypt'] },
  'aluzinc-coils': { origin: 'China', markets: ['Türkiye', 'Syria', 'Iraq', 'Saudi Arabia', 'United Arab Emirates', 'Egypt'] },
  'aluminum-zinc-plate': { origin: 'China', markets: ['Türkiye', 'Syria', 'Iraq', 'Saudi Arabia', 'United Arab Emirates', 'Egypt'] },
  'ppgi-corrugated': { origin: 'China', markets: ['Türkiye', 'Syria', 'Iraq', 'Saudi Arabia', 'United Arab Emirates', 'Egypt'] },
  'galvanized-corrugated': { origin: 'China', markets: ['Türkiye', 'Syria', 'Iraq', 'Saudi Arabia', 'United Arab Emirates', 'Egypt'] },
  'wire-rod': { origin: 'China', markets: ['Türkiye', 'Syria', 'Iraq', 'Saudi Arabia', 'United Arab Emirates', 'Egypt'] },
  'cold-rolled-sheets': { origin: 'China', markets: ['Türkiye', 'Syria', 'Iraq', 'Saudi Arabia', 'United Arab Emirates', 'Egypt'] },
  'hot-rolled-coils': { origin: 'China', markets: ['Türkiye', 'Syria', 'Iraq', 'Saudi Arabia', 'United Arab Emirates', 'Egypt'] },
  'heavy-plates': { origin: 'China', markets: ['Türkiye', 'Syria', 'Iraq', 'Saudi Arabia', 'United Arab Emirates', 'Egypt'] },
  'structural-beams': { origin: 'China', markets: ['Türkiye', 'Syria', 'Iraq', 'Saudi Arabia', 'United Arab Emirates', 'Egypt'] },
  'astm-a519-4140-pipe': { origin: 'China', markets: ['Türkiye', 'Syria', 'Iraq', 'Saudi Arabia', 'United Arab Emirates', 'Egypt'] },
  'galvanized-sheet': { origin: 'China', markets: ['Türkiye', 'Syria', 'Iraq', 'Saudi Arabia', 'United Arab Emirates', 'Egypt'] },
  'wear-resistant-plate': { origin: 'China', markets: ['Türkiye', 'Syria', 'Iraq', 'Saudi Arabia', 'United Arab Emirates', 'Egypt'] },
}

for (const p of products) {
  const declared = declaredProductMarkets[p.id]
  if (!declared) continue
  p.countryOfOrigin = declared.origin
  p.targetMarkets = [...declared.markets]
  // Backward compatibility with existing product detail field.
  p.originMarket = declared.markets.join(', ')
}
