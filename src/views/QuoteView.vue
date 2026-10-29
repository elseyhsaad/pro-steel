<script setup>
import { computed, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { products } from '../products'
import { Plus, Trash2, Send, Mail, ArrowLeft, ArrowRight, PackageCheck, ClipboardList } from 'lucide-vue-next'

// REPLACE these with PRO STEEL's verified contact details.
// WhatsApp international number: digits only, no + or spaces.
const WHATSAPP_NUMBER = import.meta.env.VITE_PUBLIC_WHATSAPP_NUMBER || ''
const SALES_EMAIL = import.meta.env.VITE_PUBLIC_SALES_EMAIL || ''

const route = useRoute()
const lang = computed(() => route.meta.lang || 'en')
const rtl = computed(() => lang.value === 'ar')
const base = computed(() => '/' + lang.value + '/')
const copy = {
  en: {back:'Products',eyebrow:'PRO STEEL / PROCUREMENT DESK',title:'REQUEST A QUOTATION',sub:'Build one detailed enquiry for one or more steel products. We will review the requested grades, sizes and commercial terms.',customer:'Your contact information',items:'Requested products',add:'Add another product',product:'Product',choose:'Choose a product',shape:'Shape / profile',grade:'Steel grade',standard:'Standard / specification',thickness:'Thickness / wall (mm)',width:'Width (mm)',length:'Length (mm)',diameter:'Outside diameter (mm)',finish:'Finish / coating',quantity:'Quantity',unit:'Unit',weight:'Estimated total weight (t)',origin:'Preferred country of origin',destination:'Delivery country / city / port',incoterm:'Trade term',timeline:'Requested delivery date',notes:'Technical notes / special requirements',name:'Full name',company:'Company',email:'Email address',phone:'Phone / WhatsApp',country:'Customer country',summary:'Request summary',sendWa:'Send via WhatsApp',sendEmail:'Open email with request',required:'Enter your name and a valid email, and select at least one product.',missingWa:'Add VITE_PUBLIC_WHATSAPP_NUMBER to your .env file to enable WhatsApp.',missingEmail:'Add VITE_PUBLIC_SALES_EMAIL to your .env file to enable email.',notice:'These are requested specifications, not a confirmation of stock, final prices or manufacturing availability. Sending opens your WhatsApp or mail application; it does not submit a form to a server.',remove:'Remove product',qty:'Requested quantity',pieces:'Pieces',tons:'Tonnes',meters:'Metres',bundles:'Bundles',coils:'Coils',other:'Other',namePlaceholder:'Your name',dateNote:'Optional',contact:'Contact details',emailSubject:'Steel quotation request',empty:'Complete your product selection to preview the message.'},
  ar: {back:'المنتجات',eyebrow:'PRO STEEL / طلبات التوريد',title:'اطلب عرض سعر',sub:'جهّز طلباً مفصلاً لمنتج واحد أو عدة منتجات حديد، مع القياسات والكمية وشروط الشحن.',customer:'معلومات التواصل',items:'المنتجات المطلوبة',add:'إضافة منتج آخر',product:'المنتج',choose:'اختر المنتج',shape:'الشكل / المقطع',grade:'درجة الفولاذ',standard:'المعيار / المواصفة',thickness:'السماكة / جدار الأنبوب (مم)',width:'العرض (مم)',length:'الطول (مم)',diameter:'القطر الخارجي (مم)',finish:'التشطيب / الطلاء',quantity:'الكمية',unit:'الوحدة',weight:'الوزن الإجمالي التقديري (طن)',origin:'بلد المنشأ المفضّل',destination:'بلد / مدينة / ميناء التسليم',incoterm:'شرط التسليم',timeline:'تاريخ التسليم المطلوب',notes:'ملاحظات فنية / متطلبات خاصة',name:'الاسم الكامل',company:'الشركة',email:'البريد الإلكتروني',phone:'الهاتف / واتساب',country:'بلد العميل',summary:'ملخص الطلب',sendWa:'إرسال عبر واتساب',sendEmail:'فتح الإيميل مع الطلب',required:'أدخل الاسم وبريداً إلكترونياً صحيحاً واختر منتجاً واحداً على الأقل.',missingWa:'أضف VITE_PUBLIC_WHATSAPP_NUMBER في ملف .env لتفعيل واتساب.',missingEmail:'أضف VITE_PUBLIC_SALES_EMAIL في ملف .env لتفعيل الإيميل.',notice:'هذه مواصفات طلب وليست تأكيداً للمخزون أو السعر أو توفر التصنيع. الأزرار تفتح واتساب أو برنامج البريد ولا ترسل البيانات لخادم الموقع.',remove:'حذف المنتج',qty:'الكمية المطلوبة',pieces:'قطعة',tons:'طن',meters:'متر',bundles:'ربطة',coils:'لفافة',other:'أخرى',namePlaceholder:'اسمك',dateNote:'اختياري',contact:'بيانات التواصل',emailSubject:'طلب عرض سعر للحديد',empty:'اختر المنتجات لعرض نص الرسالة.'},
  tr: {back:'Ürünler',eyebrow:'PRO STEEL / TEDARİK TALEBİ',title:'TEKLİF İSTEYİN',sub:'Bir veya birden çok çelik ürün için ölçüleri, miktarları ve teslim şartlarını içeren talep oluşturun.',customer:'İletişim bilgileriniz',items:'İstenen ürünler',add:'Başka ürün ekle',product:'Ürün',choose:'Ürün seçin',shape:'Şekil / profil',grade:'Çelik kalitesi',standard:'Standart / şartname',thickness:'Kalınlık / et (mm)',width:'Genişlik (mm)',length:'Uzunluk (mm)',diameter:'Dış çap (mm)',finish:'Yüzey / kaplama',quantity:'Miktar',unit:'Birim',weight:'Tahmini toplam ağırlık (t)',origin:'Tercih edilen menşe',destination:'Teslim ülkesi / şehri / limanı',incoterm:'Teslim şekli',timeline:'İstenen teslim tarihi',notes:'Teknik notlar / özel istekler',name:'Ad soyad',company:'Firma',email:'E-posta',phone:'Telefon / WhatsApp',country:'Müşteri ülkesi',summary:'Talep özeti',sendWa:'WhatsApp ile gönder',sendEmail:'E-posta uygulamasında aç',required:'Adınızı, geçerli e-postanızı ve en az bir ürünü girin.',missingWa:'WhatsApp için .env dosyasına VITE_PUBLIC_WHATSAPP_NUMBER ekleyin.',missingEmail:'E-posta için .env dosyasına VITE_PUBLIC_SALES_EMAIL ekleyin.',notice:'Bu bilgiler stok, fiyat veya üretim taahhüdü değildir. Düğmeler WhatsApp veya e-posta uygulamasını açar; site sunucusuna form göndermez.',remove:'Ürünü kaldır',qty:'İstenen miktar',pieces:'Adet',tons:'Ton',meters:'Metre',bundles:'Bağ',coils:'Rulo',other:'Diğer',namePlaceholder:'Adınız',dateNote:'İsteğe bağlı',contact:'İletişim',emailSubject:'Çelik fiyat teklifi talebi',empty:'Önizleme için ürün seçin.'}
}
const t = computed(() => copy[lang.value] || copy.en)
const client = ref({name:'',company:'',email:'',phone:'',country:'',destination:'',incoterm:'',timeline:'',notes:''})
let counter = 0
const newItem = () => ({key:++counter,productId:'',shape:'',grade:'',standard:'',diameter:'',thickness:'',width:'',length:'',finish:'',quantity:'',unit:'tons',weight:'',origin:'',notes:''})
const items = ref([newItem()])
const add = () => items.value.push(newItem())
const remove = key => { if(items.value.length > 1) items.value = items.value.filter(x=>x.key!==key); else items.value = [newItem()] }
const nameOf = id => { const p=products.find(x=>x.id===id); return p ? (p[lang.value] || p.en) : '' }
function choose(item) {
  const p = products.find(x=>x.id === item.productId)
  if (!p) return
  item.shape = p.shape || p.model3d?.shape || ''
  item.grade = p.grade || ''
  item.standard = p.standards?.join(', ') || ''
}
const valid = computed(() => client.value.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client.value.email.trim()) && items.value.some(x=>x.productId))
const entry = (label,value) => String(value??'').trim() ? label+': '+String(value).trim() : null
const message = computed(() => {
  const c=client.value
  const lines=['PRO STEEL — '+t.value.emailSubject,'',t.value.contact, ...[
    entry(t.value.name,c.name),entry(t.value.company,c.company),entry(t.value.email,c.email),entry(t.value.phone,c.phone),entry(t.value.country,c.country),entry(t.value.destination,c.destination),entry(t.value.incoterm,c.incoterm),entry(t.value.timeline,c.timeline),entry(t.value.notes,c.notes)
  ].filter(Boolean),'',t.value.items]
  items.value.filter(x=>x.productId).forEach((x,i)=>{
    lines.push('',String(i+1)+'. '+nameOf(x.productId))
    ;[[t.value.shape,x.shape],[t.value.grade,x.grade],[t.value.standard,x.standard],[t.value.diameter,x.diameter],[t.value.thickness,x.thickness],[t.value.width,x.width],[t.value.length,x.length],[t.value.finish,x.finish],[t.value.qty,x.quantity+' '+(x.unit||'')],[t.value.weight,x.weight],[t.value.origin,x.origin],[t.value.notes,x.notes]].forEach(([k,v])=>{if(String(v??'').trim() && !(k===t.value.qty && !x.quantity))lines.push(k+': '+v)})
  })
  return lines.join('\n')
})
const error = ref('')
function send(which) {
  error.value = ''
  if(!valid.value){error.value=t.value.required;return}
  if(which==='wa'){
    const n=WHATSAPP_NUMBER.replace(/\D/g,'')
    if(!n){error.value=t.value.missingWa;return}
    window.open('https://wa.me/'+n+'?text='+encodeURIComponent(message.value),'_blank','noopener,noreferrer')
  } else {
    if(!SALES_EMAIL){error.value=t.value.missingEmail;return}
    window.location.href='mailto:'+SALES_EMAIL+'?subject='+encodeURIComponent(t.value.emailSubject)+'&body='+encodeURIComponent(message.value)
  }
}
</script>

<template>
  <main class="q-page" :dir="rtl?'rtl':'ltr'">
    <div class="q-wrap">
      <RouterLink class="q-back" :to="base+'products'"><ArrowRight v-if="rtl" :size="17"/><ArrowLeft v-else :size="17"/>{{t.back}}</RouterLink>
      <header class="q-hero"><div><p class="q-kicker">{{t.eyebrow}}</p><h1>{{t.title}}</h1><p>{{t.sub}}</p></div><ClipboardList :size="66" :stroke-width="1" class="q-symbol"/></header>
      <div class="q-columns">
        <div class="q-main">
          <section class="q-panel"><div class="q-heading"><h2>01 / {{t.customer}}</h2></div>
            <div class="q-fields">
              <label><span>{{t.name}} *</span><input v-model="client.name" autocomplete="name" :placeholder="t.namePlaceholder"/></label>
              <label><span>{{t.company}}</span><input v-model="client.company" autocomplete="organization"/></label>
              <label><span>{{t.email}} *</span><input v-model="client.email" type="email" autocomplete="email"/></label>
              <label><span>{{t.phone}}</span><input v-model="client.phone" type="tel" autocomplete="tel"/></label>
              <label><span>{{t.country}}</span><input v-model="client.country"/></label>
              <label><span>{{t.destination}}</span><input v-model="client.destination"/></label>
              <label><span>{{t.incoterm}}</span><select v-model="client.incoterm"><option value="">—</option><option v-for="v in ['EXW','FCA','FOB','CFR','CIF','DAP','DDP','Other / To discuss']" :key="v">{{v}}</option></select></label>
              <label><span>{{t.timeline}}</span><input v-model="client.timeline" type="date"/></label>
              <label class="q-wide"><span>{{t.notes}}</span><textarea v-model="client.notes" rows="3"/></label>
            </div>
          </section>
          <section class="q-panel"><div class="q-heading"><h2>02 / {{t.items}}</h2><span>{{items.length}}</span></div>
            <article v-for="(item,index) in items" :key="item.key" class="q-item">
              <div class="q-item-top"><strong>{{String(index+1).padStart(2,'0')}} / {{t.product}}</strong><button type="button" class="q-remove" @click="remove(item.key)"><Trash2 :size="15"/> {{t.remove}}</button></div>
              <div class="q-fields">
                <label class="q-wide"><span>{{t.product}} *</span><select v-model="item.productId" @change="choose(item)"><option value="">{{t.choose}}</option><option v-for="p in products" :key="p.id" :value="p.id">{{p[lang]||p.en}}</option></select></label>
                <label><span>{{t.shape}}</span><input v-model="item.shape"/></label>
                <label><span>{{t.grade}}</span><input v-model="item.grade"/></label>
                <label class="q-wide"><span>{{t.standard}}</span><input v-model="item.standard"/></label>
                <label><span>{{t.diameter}}</span><input v-model="item.diameter" inputmode="decimal"/></label>
                <label><span>{{t.thickness}}</span><input v-model="item.thickness" inputmode="decimal"/></label>
                <label><span>{{t.width}}</span><input v-model="item.width" inputmode="decimal"/></label>
                <label><span>{{t.length}}</span><input v-model="item.length" inputmode="decimal"/></label>
                <label><span>{{t.finish}}</span><input v-model="item.finish"/></label>
                <label><span>{{t.origin}}</span><input v-model="item.origin"/></label>
                <label><span>{{t.quantity}}</span><input v-model="item.quantity" type="number" min="0" step="any"/></label>
                <label><span>{{t.unit}}</span><select v-model="item.unit"><option value="tons">{{t.tons}}</option><option value="pieces">{{t.pieces}}</option><option value="meters">{{t.meters}}</option><option value="bundles">{{t.bundles}}</option><option value="coils">{{t.coils}}</option><option value="other">{{t.other}}</option></select></label>
                <label><span>{{t.weight}}</span><input v-model="item.weight" inputmode="decimal"/></label>
                <label class="q-wide"><span>{{t.notes}}</span><textarea v-model="item.notes" rows="2"/></label>
              </div>
            </article>
            <button type="button" class="q-add" @click="add"><Plus :size="18"/>{{t.add}}</button>
          </section>
        </div>
        <aside class="q-aside"><div class="q-summary"><p class="q-kicker"><PackageCheck :size="17"/> {{t.summary}}</p><pre>{{message}}</pre><p class="q-notice">{{t.notice}}</p><p v-if="error" class="q-error" role="alert">{{error}}</p><button class="q-wa" type="button" @click="send('wa')"><Send :size="18"/> {{t.sendWa}}</button><button class="q-mail" type="button" @click="send('email')"><Mail :size="18"/> {{t.sendEmail}}</button></div></aside>
      </div>
    </div>
  </main>
</template>

<style scoped>
.q-page{min-height:100vh;background:#0b1218;color:#e9edef}.q-wrap{max-width:1330px;margin:auto;padding:133px 32px 100px}.q-back{display:inline-flex;gap:9px;align-items:center;color:#cfac78;text-decoration:none;font-size:13px}.q-hero{display:flex;justify-content:space-between;gap:30px;align-items:center;padding:52px 0 48px;border-bottom:1px solid #3b4550;margin-bottom:28px}.q-kicker{font-size:11px;letter-spacing:.12em;color:#c7a067;text-transform:uppercase;display:flex;align-items:center;gap:8px}.q-hero h1{font-size:clamp(36px,5vw,66px);font-weight:500;margin:14px 0}.q-hero p:last-child{max-width:690px;color:#b1bec7;line-height:1.8}.q-symbol{color:#c7a067;opacity:.85;flex-shrink:0}.q-columns{display:grid;grid-template-columns:minmax(0,1fr) 380px;gap:24px;align-items:start}.q-main{min-width:0;display:grid;gap:25px}.q-panel,.q-summary{background:#14212a;border:1px solid #31414b;padding:28px}.q-heading{display:flex;justify-content:space-between;align-items:center;gap:15px;margin-bottom:27px}.q-heading h2{font-weight:550;font-size:19px;margin:0}.q-heading>span{background:#26363f;color:#c7a067;padding:7px 12px}.q-fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:17px}.q-fields label{display:flex;flex-direction:column;min-width:0;gap:8px}.q-fields label span{font-size:12px;color:#bfccd3}.q-fields input,.q-fields select,.q-fields textarea{box-sizing:border-box;min-width:0;width:100%;border:1px solid #44535c;border-radius:0;background:#101a22;color:white;padding:13px 12px;font:inherit;font-size:13px;outline:none}.q-fields input:focus,.q-fields select:focus,.q-fields textarea:focus{border-color:#c7a067}.q-wide{grid-column:1/-1}.q-item{border-top:1px solid #45505a;padding:24px 0 28px}.q-item-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.q-item-top strong{color:#d7b27f;font-size:13px}.q-remove{background:transparent;color:#adbcc4;border:0;display:inline-flex;align-items:center;gap:7px;cursor:pointer}.q-add{margin-top:10px;width:100%;padding:16px;border:1px dashed #a78a5f;color:#ddbc8a;background:#1d2b34;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px}.q-aside{position:sticky;top:90px;min-width:0}.q-summary pre{font-family:inherit;white-space:pre-wrap;overflow-wrap:anywhere;font-size:12px;line-height:1.7;color:#bdc9d0;background:#0c151c;padding:18px;max-height:380px;overflow:auto;border:1px solid #2e414b}.q-notice{color:#a7b5bd;font-size:11px;line-height:1.7;margin:20px 0}.q-error{color:#ffd0bd;font-size:12px}.q-wa,.q-mail{width:100%;display:flex;align-items:center;justify-content:center;gap:10px;cursor:pointer;padding:16px;margin-top:11px;font-weight:650;font-size:13px}.q-wa{background:#25774e;border:1px solid #328e60;color:white}.q-mail{background:#c7a067;border:1px solid #c7a067;color:#101820}.q-page[dir=rtl] .q-kicker{letter-spacing:0}@media(max-width:1040px){.q-columns{grid-template-columns:1fr}.q-aside{position:static}}@media(max-width:620px){.q-wrap{padding:105px 16px 70px}.q-fields{grid-template-columns:1fr}.q-panel,.q-summary{padding:18px}.q-hero{padding-top:35px}.q-symbol{display:none}}
</style>
