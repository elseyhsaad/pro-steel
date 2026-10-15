
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
