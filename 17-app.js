const catalog={electronics:['Aurora Headphones','Nova Bluetooth Speaker','Orbit Smart Watch','Edge Wireless Mouse','Pulse Gaming Keyboard','Lumina Desk Monitor','Pocket Power Bank','Crystal Webcam Pro','Aero Laptop Stand','Studio Microphone','Rapid USB-C Hub','Cinema Streaming Stick','Focus Tablet Sleeve','Zen Wireless Buds','Arc LED Light Bar','Secure Door Camera'],fashion:['Linen Summer Shirt','Classic Denim Jacket','Urban Knit Sweater','Leather Belt','Tailored Chino Pants','Canvas Sneakers','Ribbed Dress','Crossbody Bag','Wool Blend Coat','Zip Hoodie','Silk Pattern Scarf','Aviator Sunglasses','Office Blazer','Cargo Pants','White Tee Pack','Leather Wallet'],grocery:['Organic Apple Basket','Fresh Avocado Pack','Sourdough Loaf','Cold Pressed Juice Set','Coffee Beans','Greek Yogurt Cups','Farm Egg Dozen','Vegetable Crate','Basmati Rice','Natural Honey Jar','Mixed Nut Tin','Herbal Tea Collection','Pasta Bundle','Garden Salad Kit','Berry Breakfast Box','Dark Chocolate Bars'],beauty:['Vitamin C Serum','Hydrating Face Cream','Botanical Shampoo','Matte Lip Color Set','Daily Sunscreen Lotion','Rose Water Mist','Charcoal Clay Mask','Nourishing Hair Oil','Fragrance Discovery Kit','Gentle Cleanser Duo','Brow Styling Gel','Makeup Brushes','Body Butter Jar','Retinol Night Drops','Aloe Cooling Gel','Spa Bath Salt Set'],sports:['Training Gloves','Studio Yoga Mat','Trail Runner Shoes','Adjustable Dumbbells','Water Bottle','Running Socks','Jump Rope','Basketball Pro Grip','Cycling Helmet','Resistance Band Kit','Tennis Racket','Foam Roller','Hiking Day Pack','Training Shorts','Soccer Match Ball','Massage Ball'],books:['Business Playbook','Morning Journal','World Cookbook','Classic Mystery Novel','Digital Design Guide','Kids Science Stories','Finance Manual','Travel Photography Book','Poetry Edition','Leadership Notes','Garden Handbook','Beginner Coding Book','Home Decor Ideas','Fitness Meal Planner','Language Learning Set','Writing Workbook'],deals:['Headphone Bundle','Family Grocery Saver','Beauty Refresh Box','Fitness Starter Kit','Reader Weekend Stack','Sneaker Flash Sale','Kitchen Essentials Box','Tech Desk Upgrade','Coffee Lovers Set','Travel Gear Duo','Workwear Combo','Home Fragrance Deal','Gaming Accessory Set','Salad Week Pack','Luxury Skin Duo','Outdoor Adventure Kit']};

const terms={electronics:'electronics gadget',fashion:'fashion clothing',grocery:'fresh grocery',beauty:'beauty skincare',sports:'sports fitness',books:'books reading',deals:'shopping sale'};

function productImage(category,name,index){
  const colors={electronics:['#d9f4ff','#0b6b6f'],fashion:['#ffe4ef','#8c2d56'],grocery:['#e9f9dc','#3b7a2a'],beauty:['#fff0f7','#9b3d74'],sports:['#e8f0ff','#2b55a0'],books:['#fff2d8','#8a5a16'],deals:['#fff1d6','#b55b00']};

  const pair=colors[category]||['#eef3f4','#0b6b6f'];

  const icon={electronics:'DEVICE',fashion:'STYLE',grocery:'FRESH',beauty:'BEAUTY',sports:'SPORT',books:'BOOK',deals:'SALE'}[category]||'SHOP';

  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="700" height="520" viewBox="0 0 700 520"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${pair[0]}"/><stop offset="1" stop-color="#ffffff"/></linearGradient></defs><rect width="700" height="520" fill="url(#g)"/><circle cx="565" cy="105" r="92" fill="${pair[1]}" opacity="0.14"/><circle cx="120" cy="415" r="110" fill="${pair[1]}" opacity="0.10"/><rect x="70" y="80" width="560" height="360" rx="28" fill="#ffffff" stroke="${pair[1]}" stroke-width="6"/><text x="350" y="190" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="54" font-weight="800" fill="${pair[1]}">${icon}</text><text x="350" y="270" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="700" fill="#172126">${name}</text><text x="350" y="326" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#647278">ShopVerse ${category}</text></svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

}

function makeProduct(category,name,index){const base={electronics:48,fashion:34,grocery:8,beauty:15,sports:18,books:12,deals:25}[category]||20;
const price=base+index*5+(category.length%4);
return{id:`${category}-${index}`,name,category:category[0].toUpperCase()+category.slice(1),price,oldPrice:price+12+index,image:productImage(category,name,index)};
}

function getProducts(key){if(key==='featured')return Object.keys(catalog).flatMap(c=>catalog[c].slice(0,3).map((n,i)=>makeProduct(c,n,i))).slice(0,16);
if(key==='wishlist')return Object.keys(catalog).flatMap(c=>catalog[c].slice(3,6).map((n,i)=>makeProduct(c,n,i+3))).slice(0,16);
if(key==='products')return Object.keys(catalog).flatMap(c=>catalog[c].slice(0,3).map((n,i)=>makeProduct(c,n,i))).slice(0,18);
return(catalog[key]||catalog.electronics).map((n,i)=>makeProduct(key,n,i));
}

function getCart(){return JSON.parse(localStorage.getItem('shopverseCart')||'[]')}function saveCart(cart){localStorage.setItem('shopverseCart',JSON.stringify(cart));
updateCartBadge()}function updateCartBadge(){const badge=document.querySelector('[data-cart-count]');
if(badge)badge.textContent=getCart().reduce((s,i)=>s+i.qty,0)}function toast(msg){const h=document.querySelector('#toastHolder');
if(!h)return;
h.innerHTML=`<div class="toast align-items-center text-bg-dark border-0 show"><div class="d-flex"><div class="toast-body">${msg}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div></div>`;
setTimeout(()=>h.innerHTML='',2200)}function addToCart(p){const cart=getCart();
const item=cart.find(i=>i.id===p.id);
item?item.qty++:cart.push({...p,qty:1});
saveCart(cart);
toast(`${p.name} added to cart`)}

function card(p,i){const stars='★'.repeat(4+i%2)+'☆'.repeat(i%2);
return `<div class="col"><article class="product-card"><img src="${p.image}" alt="${p.name}"><div class="p-3"><div class="d-flex justify-content-between gap-2 align-items-start mb-2"><span class="badge badge-soft">${p.category}</span><span class="rating">${stars}</span></div><h3 class="h6 fw-bold">${p.name}</h3><p class="small text-secondary mb-2">Fast delivery, quality checked, and ready for everyday use.</p><div class="d-flex align-items-center gap-2 mb-3"><span class="price">$${p.price.toFixed(2)}</span><span class="old-price small">$${p.oldPrice.toFixed(2)}</span></div><button class="btn btn-brand w-100" data-add-cart='${JSON.stringify(p)}'>Add to Cart</button></div></article></div>`}

function renderProducts(){document.querySelectorAll('[data-products]').forEach(grid=>{const list=getProducts(grid.dataset.products);
grid.innerHTML=list.map(card).join('')})}

function summary(total,shipping,grand){return `<div class="info-panel p-4"><h2 class="h5 fw-bold mb-3">Order Summary</h2><div class="d-flex justify-content-between mb-2"><span>Subtotal</span><strong>$${total.toFixed(2)}</strong></div><div class="d-flex justify-content-between mb-2"><span>Shipping</span><strong>$${shipping.toFixed(2)}</strong></div><hr><div class="d-flex justify-content-between h5"><span>Total</span><strong>$${grand.toFixed(2)}</strong></div><button class="btn btn-brand w-100 mt-3" ${grand===0?'disabled':''}>Checkout</button></div>`}

function renderCart(){const wrap=document.querySelector('[data-cart]');
if(!wrap)return;
const cart=getCart();
const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
const shipping=total>0&&total<100?8:0;
const grand=total+shipping;
if(!cart.length){wrap.innerHTML='<div class="info-panel p-5 text-center"><h2 class="h4 fw-bold">Your cart is empty</h2><p class="text-secondary">Add products from any category and they will appear here.</p><a class="btn btn-brand" href="products.html">Start Shopping</a></div>';
document.querySelector('[data-cart-summary]').innerHTML=summary(0,0,0);
return}wrap.innerHTML=cart.map(i=>`<div class="cart-row p-3 mb-3 d-flex flex-column flex-md-row gap-3 align-items-md-center"><img class="cart-thumb" src="${i.image}" alt="${i.name}"><div class="flex-grow-1"><h3 class="h6 fw-bold mb-1">${i.name}</h3><p class="small text-secondary mb-0">${i.category}</p></div><div class="price">$${i.price.toFixed(2)}</div><div class="input-group quantity-control"><button class="btn btn-outline-secondary" data-qty="${i.id}" data-change="-1">-</button><input class="form-control text-center" value="${i.qty}" readonly><button class="btn btn-outline-secondary" data-qty="${i.id}" data-change="1">+</button></div><button class="btn btn-outline-danger" data-remove="${i.id}">Remove</button></div>`).join('');
document.querySelector('[data-cart-summary]').innerHTML=summary(total,shipping,grand)}

document.addEventListener('click',e=>{const add=e.target.closest('[data-add-cart]');
if(add)addToCart(JSON.parse(add.dataset.addCart));
const rem=e.target.closest('[data-remove]');
if(rem){saveCart(getCart().filter(i=>i.id!==rem.dataset.remove));
renderCart()}const qty=e.target.closest('[data-qty]');
if(qty){const cart=getCart();
const item=cart.find(i=>i.id===qty.dataset.qty);
if(item)item.qty+=Number(qty.dataset.change);
saveCart(cart.filter(i=>i.qty>0));
renderCart()}});

document.addEventListener('DOMContentLoaded',()=>{renderProducts();
renderCart();
updateCartBadge();
document.querySelectorAll('.nav-link').forEach(a=>{if(a.getAttribute('href')===(location.pathname.split('/').pop()||'index.html'))a.classList.add('active')});
const login=document.querySelector('[data-login-form]');
if(login)login.addEventListener('submit',e=>{e.preventDefault();
const email=new FormData(login).get('email')||'shopper@example.com';
document.querySelector('[data-login-message]').textContent=`Welcome back, ${email.split('@')[0]}. You are signed in for this demo.`;
login.reset()})});
