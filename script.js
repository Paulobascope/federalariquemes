// ===== DATA =====
const WHATSAPP_NUMBER = '556981454883';
const WHATSAPP_MESSAGE = 'Olá! Gostaria de fazer um pedido na Federal Burger! 🍔';

function getWhatsappLink(item) {
  const msg = item ? 'Olá! Gostaria de pedir: ' + item : WHATSAPP_MESSAGE;
  return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
}

const burgers = [
  { name: "FEDERAL BURGER", description: "Pão, hambúrguer, mussarela, tomate e alface.", price: 17, image: "federal.jpg" },
  { name: "FEDERAL BACON", description: "Pão, hambúrguer, mussarela, bacon, tomate e alface.", price: 20, image: "federal.jpg" },
  { name: "FEDERAL CUPIM", description: "Pão, hambúrguer, mussarela, cupim bovino, tomate e alface.", price: 23, image: "federal.jpg" },
  { name: "FEDERAL FRANGO/CATUPIRY", description: "Pão, hambúrguer, mussarela, frango com catupiry, tomate e alface.", price: 20, image: "federal.jpg" },
  { name: "FEDERAL TWO EGGS", description: "Pão, hambúrguer, mussarela, dois ovos, alface e tomate.", price: 19, image: "federal.jpg" },
  { name: "FEDERAL 4 QUEIJOS", description: "Pão, hambúrguer, mussarela, cheddar, parmesão, catupiry, tomate e alface.", price: 21, image: "federal.jpg" },
  { name: "FEDERAL CALABRESA", description: "Pão, hambúrguer, mussarela, calabresa, tomate e alface.", price: 19, image: "federal.jpg" },
  { name: "FEDERAL DORITOS", description: "Pão, hambúrguer, mussarela, cheddar, creme de pimenta, doritos, catupiry, tomate e alface.", price: 23, image: "federal.jpg" },
  { name: "FEDERAL GRAN DUOS", description: "Pão, 2 hambúrguers, 2 mussarelas, tomate, alface, 2 sabores para escolher.", price: 27, image: "federal.jpg" },
  { name: "FEDERAL FILÉ", description: "Pão, hambúrguer, mussarela, filé mignon, tomate e alface.", price: 28, image: "federal.jpg" },
  { name: "FEDERAL PICANHA", description: "Pão, mussarela, hambúrguer, picanha, alface e tomate.", price: 29, image: "federal.jpg" },
  { name: "FEDERAL STROGONOFF", description: "Strogonoff de frango ou filé, pão, hambúrguer, mussarela, batata palha, tomate e alface.", price: 30, image: "federal.jpg" },
];

const addons = [
  { name: "Cebola Caramelizada", price: 8 },
  { name: "Cebola Roxa", price: 2 },
  { name: "Picanha", price: 18 },
  { name: "Filé", price: 16 },
  { name: "Cupim", price: 15 },
  { name: "Banana / Abacaxi", price: 5 },
  { name: "Cheddar", price: 3 },
  { name: "Catupiry", price: 5 },
  { name: "Batata Palha", price: 3 },
  { name: "Ovo", price: 2 },
  { name: "Mussarela", price: 2 },
  { name: "Calabresa Acebolada", price: 12 },
  { name: "Hambúrguer sem queijo", price: 5 },
  { name: "Salada", price: 1 },
  { name: "Porção de Batata Frita", price: 10 },
];

const drinks = [
  { name: "Refrigerante 2L", price: 10 },
  { name: "Refrigerante 1L", price: 10 },
  { name: "Refrigerante Lata", price: 6 },
  { name: "Água Mineral 500ml", price: 3 },
  { name: "Sucos", price: 10 },
];

function formatPrice(p) { return 'R$ ' + p.toFixed(2).replace('.', ','); }

// ===== RENDER =====
document.getElementById('year').textContent = new Date().getFullYear();

// WhatsApp links
var defaultLink = getWhatsappLink();
document.getElementById('whatsapp-float').href = defaultLink;
document.getElementById('contato-whatsapp').href = defaultLink;

// Burgers
var burgersGrid = document.getElementById('burgers-grid');
burgers.forEach(function(b, idx) {
  burgersGrid.innerHTML += 
    '<div class="metal-surface rounded-lg overflow-hidden card-hover flex flex-col">' +
      '<div class="relative h-48 overflow-hidden cursor-pointer" onclick="openLightbox(\'' + b.image + '\', \'' + b.name + '\')">' +
        '<img src="' + b.image + '" alt="' + b.name + '" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110" loading="lazy" />' +
        '<div class="absolute top-3 right-3 bg-primary text-primary-foreground font-bold px-3 py-1 rounded-md text-sm">' + formatPrice(b.price) + '</div>' +
        '<div class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg></div>' +
      '</div>' +
      '<div class="p-4 flex flex-col flex-1 gap-2">' +
        '<h3 class="font-display text-xl text-primary tracking-wider">' + b.name + '</h3>' +
        '<p class="text-muted-foreground text-sm flex-1">' + b.description + '</p>' +
        '<button onclick="addToCart(' + idx + ')" class="add-to-cart-btn mt-2">🛒 Adicionar ao pedido</button>' +
      '</div>' +
    '</div>';
});

// Addons
var addonsGrid = document.getElementById('addons-grid');
addons.forEach(function(item, i) {
  addonsGrid.innerHTML += 
    '<div class="flex items-center justify-between px-5 py-3 border-b border-border ' + (i % 2 !== 0 ? 'bg-white/5' : '') + '">' +
      '<span class="text-foreground font-medium uppercase text-sm tracking-wide">' + item.name + '</span>' +
      '<div class="flex items-center gap-3">' +
        '<span class="text-primary font-bold text-sm whitespace-nowrap">' + formatPrice(item.price) + '</span>' +
        '<button onclick="addAddonToCart(' + i + ')" class="add-to-cart-btn" style="width:auto;padding:0.3rem 0.6rem;font-size:0.75rem;">+ 🛒</button>' +
      '</div>' +
    '</div>';
});

// Drinks
var drinksList = document.getElementById('drinks-list');
drinks.forEach(function(item, i) {
  drinksList.innerHTML += 
    '<div class="flex items-center justify-between px-5 py-4 border-b border-border ' + (i % 2 !== 0 ? 'bg-white/5' : '') + '">' +
      '<span class="text-foreground font-medium uppercase text-sm tracking-wide">' + item.name + '</span>' +
      '<div class="flex items-center gap-3">' +
        '<span class="text-primary font-bold whitespace-nowrap">' + formatPrice(item.price) + '</span>' +
        '<button onclick="addDrinkToCart(' + i + ')" class="add-to-cart-btn" style="width:auto;padding:0.3rem 0.6rem;font-size:0.75rem;">+ 🛒</button>' +
      '</div>' +
    '</div>';
});

// ===== SIDEBAR =====
function openSidebar() { document.getElementById('sidebar-overlay').classList.add('open'); }
function closeSidebar() { document.getElementById('sidebar-overlay').classList.remove('open'); }

// ===== INTERSECTION OBSERVER (fade-in) =====
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-section').forEach(function(el) { observer.observe(el); });

// ===== LIGHTBOX =====
function openLightbox(src, alt) {
  var lb = document.getElementById('lightbox');
  var img = document.getElementById('lightbox-img');
  var caption = document.getElementById('lightbox-caption');
  img.src = src;
  img.alt = alt;
  caption.textContent = alt;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeLightbox();
});

// ===== CART =====
var cart = []; // { type: 'burger'|'addon'|'drink', index: number, qty: number }

function bounceCartIcon() {
  var badge = document.getElementById('cart-badge');
  var btn = badge.parentElement;
  btn.classList.remove('cart-bounce');
  void btn.offsetWidth; // reflow to restart animation
  btn.classList.add('cart-bounce');
}

function addToCart(burgerIndex) {
  var existing = cart.find(function(c) { return c.type === 'burger' && c.index === burgerIndex; });
  if (existing) { existing.qty++; } else { cart.push({ type: 'burger', index: burgerIndex, qty: 1 }); }
  renderCart(); bounceCartIcon();
}
function removeFromCart(type, index) {
  var existing = cart.find(function(c) { return c.type === type && c.index === index; });
  if (!existing) return;
  existing.qty--;
  if (existing.qty <= 0) { cart = cart.filter(function(c) { return !(c.type === type && c.index === index); }); }
  renderCart();
}
function addAddonToCart(addonIndex) {
  var existing = cart.find(function(c) { return c.type === 'addon' && c.index === addonIndex; });
  if (existing) { existing.qty++; } else { cart.push({ type: 'addon', index: addonIndex, qty: 1 }); }
  renderCart(); bounceCartIcon();
}
function addDrinkToCart(drinkIndex) {
  var existing = cart.find(function(c) { return c.type === 'drink' && c.index === drinkIndex; });
  if (existing) { existing.qty++; } else { cart.push({ type: 'drink', index: drinkIndex, qty: 1 }); }
  renderCart(); bounceCartIcon();
}

function getCartItemData(c) {
  if (c.type === 'burger') return burgers[c.index];
  if (c.type === 'addon') return addons[c.index];
  return drinks[c.index];
}

function clearCart() { cart = []; renderCart(); }

function toggleCart() {
  var panel = document.getElementById('cart-panel');
  var overlay = document.getElementById('cart-overlay');
  var isOpen = panel.classList.contains('open');
  if (isOpen) { panel.classList.remove('open'); overlay.classList.remove('open'); }
  else { panel.classList.add('open'); overlay.classList.add('open'); }
}

function renderCart() {
  var container = document.getElementById('cart-items');
  var footer = document.getElementById('cart-footer');
  var badge = document.getElementById('cart-badge');
  var totalEl = document.getElementById('cart-total-value');
  var whatsBtn = document.getElementById('cart-whatsapp-btn');

  var totalQty = cart.reduce(function(s, c) { return s + c.qty; }, 0);
  badge.style.display = totalQty > 0 ? 'flex' : 'none';
  badge.textContent = totalQty;

  if (cart.length === 0) {
    container.innerHTML = '<p class="cart-empty">Seu carrinho está vazio</p>';
    footer.style.display = 'none';
    return;
  }

  var total = 0;
  var html = '';
  var typeEmoji = { burger: '🍔', addon: '➕', drink: '🥤' };
  cart.forEach(function(c) {
    var item = getCartItemData(c);
    var subtotal = item.price * c.qty;
    total += subtotal;
    var imgHtml = item.image
      ? '<img src="' + item.image + '" alt="' + item.name + '" />'
      : '<div style="width:3.5rem;height:3.5rem;border-radius:0.375rem;background:hsl(0 0% 18%);display:flex;align-items:center;justify-content:center;font-size:1.2rem;">' + typeEmoji[c.type] + '</div>';
    html += '<div class="cart-item">' +
      imgHtml +
      '<div class="cart-item-info">' +
        '<div class="cart-item-name">' + item.name + '</div>' +
        '<div class="cart-item-price">' + formatPrice(subtotal) + '</div>' +
      '</div>' +
      '<div class="cart-qty-controls">' +
        '<button class="cart-qty-btn" onclick="removeFromCart(\'' + c.type + '\',' + c.index + ')">−</button>' +
        '<span class="cart-qty">' + c.qty + '</span>' +
        '<button class="cart-qty-btn" onclick="' + (c.type === 'burger' ? 'addToCart(' : c.type === 'addon' ? 'addAddonToCart(' : 'addDrinkToCart(') + c.index + ')">+</button>' +
      '</div>' +
    '</div>';
  });
  container.innerHTML = html;
  footer.style.display = 'flex';
  totalEl.textContent = formatPrice(total);

  // Build WhatsApp message
  var msg = 'Olá! Gostaria de fazer o seguinte pedido:\n\n';
  var typeLabel = { burger: '🍔 Burgers', addon: '➕ Adicionais', drink: '🥤 Bebidas' };
  ['burger', 'addon', 'drink'].forEach(function(type) {
    var items = cart.filter(function(c) { return c.type === type; });
    if (items.length > 0) {
      msg += typeLabel[type] + ':\n';
      items.forEach(function(c) {
        var item = getCartItemData(c);
        msg += '  • ' + c.qty + 'x ' + item.name + ' (' + formatPrice(item.price * c.qty) + ')\n';
      });
      msg += '\n';
    }
  });
  msg += '*Total: ' + formatPrice(total) + '*';
  var notes = document.getElementById('cart-notes').value.trim();
  if (notes) {
    // Sanitize: limit length and remove potentially harmful chars
    notes = notes.substring(0, 500).replace(/[<>]/g, '');
    msg += '\n\n📝 Observações: ' + notes;
  }
  whatsBtn.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
}

// Update WhatsApp link when notes change
document.getElementById('cart-notes').addEventListener('input', function() {
  if (cart.length > 0) renderCart();
});



