/*==========================================
 A Square Premium Website
 script.js - Part 1
==========================================*/

// ---------------- Loader ----------------

window.addEventListener("load",()=>{

setTimeout(()=>{

document.getElementById("loader").style.display="none";

},1800);

});

// ---------------- Scroll Progress ----------------

const progressBar=document.getElementById("progressBar");

window.addEventListener("scroll",()=>{

const totalHeight=document.documentElement.scrollHeight-window.innerHeight;

const progress=(window.scrollY/totalHeight)*100;

progressBar.style.width=progress+"%";

});

// ---------------- Back To Top ----------------

const backTop=document.getElementById("backTop");

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

backTop.style.display="flex";

}else{

backTop.style.display="none";

}

});

backTop.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

// ---------------- Mobile Menu ----------------

const menuBtn=document.getElementById("menuBtn");

const navLinks=document.querySelector(".nav-links");

menuBtn.addEventListener("click",()=>{

navLinks.classList.toggle("active");

});

// ---------------- Theme ----------------

const themeBtn=document.getElementById("themeBtn");

themeBtn.onclick=()=>{

document.body.classList.toggle("dark");

};

// ---------------- Search ----------------

const search=document.getElementById("productSearch");

if(search){

search.addEventListener("keyup",()=>{

const value=search.value.toLowerCase();

document.querySelectorAll(".product-card").forEach(card=>{

const text=card.innerText.toLowerCase();

card.style.display=text.includes(value)?"block":"none";

});

});

}

// ---------------- Counter ----------------

const counters=document.querySelectorAll(".counter");

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter=entry.target;

const target=+counter.dataset.target;

let count=0;

const speed=target/120;

const update=()=>{

count+=speed;

if(count<target){

counter.innerText=Math.floor(count);

requestAnimationFrame(update);

}else{

counter.innerText=target;

}

};

update();

observer.unobserve(counter);

}

});

});

counters.forEach(counter=>{

observer.observe(counter);

});

// ---------------- Cart ----------------

let cart=[];

const cartDrawer=document.getElementById("cartDrawer");

const cartBtn=document.getElementById("cartBtn");

const closeCart=document.getElementById("closeCart");

const cartItems=document.getElementById("cartItems");

const cartCount=document.getElementById("cartCount");

const subtotal=document.getElementById("subtotal");

const grandTotal=document.getElementById("grandTotal");

cartBtn.onclick=()=>{

cartDrawer.classList.add("active");

};

closeCart.onclick=()=>{

cartDrawer.classList.remove("active");

};

// Add Product

document.querySelectorAll(".cart-btn").forEach(btn=>{

btn.onclick=()=>{

const card=btn.closest(".product-card");

const name=btn.dataset.name;

const price=parseInt(btn.dataset.price);

const qty=parseInt(card.querySelector("input").value);

cart.push({

name,

price,

qty

});

updateCart();

};

});

// Update Cart

function updateCart(){

cartItems.innerHTML="";

let total=0;

cart.forEach((item,index)=>{

total+=item.price*item.qty;

cartItems.innerHTML+=`

<div class="cart-item">

<div>

<h4>${item.name}</h4>

<p>

₹${item.price} × ${item.qty}

</p>

</div>

<button onclick="removeItem(${index})">

❌

</button>

</div>

`;

});

cartCount.innerText=cart.length;

subtotal.innerText="₹"+total;

grandTotal.innerText="₹"+total;

localStorage.setItem("asquareCart",JSON.stringify(cart));

}

// Remove Item

function removeItem(index){

cart.splice(index,1);

updateCart();

}

window.removeItem=removeItem;

// Load Saved Cart

const savedCart=localStorage.getItem("asquareCart");

if(savedCart){

cart=JSON.parse(savedCart);

updateCart();

  }
/*==========================================
A Square Premium Website
script.js - Part 2
==========================================*/

// ---------------- Quantity Buttons ----------------

document.querySelectorAll(".product-card").forEach(card=>{

const minus=card.querySelector(".minus");
const plus=card.querySelector(".plus");
const input=card.querySelector("input");

plus.addEventListener("click",()=>{

input.value=parseInt(input.value)+1;

});

minus.addEventListener("click",()=>{

if(parseInt(input.value)>1){

input.value=parseInt(input.value)-1;

}

});

});

// ---------------- Coupon System ----------------

const couponInput=document.getElementById("coupon");
const couponBtn=document.getElementById("applyCoupon");

let discount=0;

couponBtn.onclick=()=>{

const code=couponInput.value.trim().toLowerCase();

if(code==="asquare10"){

discount=10;

alert("🎉 ASquare10 Applied! You got 10% OFF.");

}else{

discount=0;

alert("❌ Invalid Coupon Code.");

}

let total=0;

cart.forEach(item=>{

total+=item.price*item.qty;

});

const finalTotal=Math.round(total-(total*discount/100));

subtotal.innerText="₹"+total;

grandTotal.innerText="₹"+finalTotal;

};

// ---------------- WhatsApp Checkout ----------------

const checkout=document.getElementById("checkout");
const popup=document.getElementById("checkoutPopup");
const placeOrder=document.getElementById("placeOrder");

checkout.onclick=()=>{

if(cart.length===0){

alert("🛒 Your cart is empty.");

return;

}

popup.style.display="flex";

};

placeOrder.onclick=()=>{

const name=document.getElementById("customerName").value.trim();
const phone=document.getElementById("customerPhone").value.trim();
const address=document.getElementById("customerAddress").value.trim();
const city=document.getElementById("customerCity").value.trim();
const pin=document.getElementById("customerPin").value.trim();

if(!name||!phone||!address||!city||!pin){

alert("Please fill all details.");

return;

}

let order="";

let total=0;

cart.forEach(item=>{

order+=`${item.name} x ${item.qty} = ₹${item.price*item.qty}\n`;

total+=item.price*item.qty;

});

const finalTotal=Math.round(total-(total*discount/100));

const message=

`*🛒 A Square New Order*

👤 Name : ${name}

📞 Phone : ${phone}

🏠 Address :
${address}

🏙 City : ${city}

📮 Pincode : ${pin}

-----------------------

${order}

-----------------------

Subtotal : ₹${total}

Coupon : ${discount>0?"ASquare10":"None"}

Discount : ${discount}%

Grand Total : ₹${finalTotal}

Thank You ❤️`;

window.open(

"https://wa.me/918830626573?text="+

encodeURIComponent(message),

"_blank"

);

popup.style.display="none";

};

// ---------------- Wishlist ----------------

document.querySelectorAll(".wishlist").forEach(btn=>{

btn.onclick=()=>{

btn.classList.toggle("active");

btn.innerHTML=

btn.classList.contains("active")

?'<i class="fa-solid fa-heart"></i>'

:'<i class="fa-regular fa-heart"></i>';

};

});

// ---------------- Contact Form ----------------

const contactForm=document.getElementById("contactForm");

if(contactForm){

contactForm.addEventListener("submit",(e)=>{

e.preventDefault();

alert("✅ Thank you! We'll contact you soon.");

contactForm.reset();

});

}

// ---------------- Newsletter ----------------

const newsletterBtn=document.querySelector(".newsletter-form button");

if(newsletterBtn){

newsletterBtn.onclick=()=>{

const email=document.querySelector(".newsletter-form input").value;

if(email===""){

alert("Enter your email.");

return;

}

alert("🎉 Successfully Subscribed!");

document.querySelector(".newsletter-form input").value="";

};

}
/*==========================================
A Square Premium Website
script.js - Part 3
==========================================*/

// ---------------- Scroll Reveal ----------------

const revealObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:0.15
});

document.querySelectorAll("section,.product-card,.review-card,.about-box,.stat-card").forEach(el=>{

el.classList.add("hidden");

revealObserver.observe(el);

});

// ---------------- Active Navbar ----------------

const sections=document.querySelectorAll("section");
const navItems=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-150;

const height=section.clientHeight;

if(pageYOffset>=top){

current=section.getAttribute("id");

}

});

navItems.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

// ---------------- Smooth Anchor Scroll ----------------

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

// ---------------- Floating Navbar ----------------

window.addEventListener("scroll",()=>{

const header=document.querySelector("header");

if(window.scrollY>100){

header.classList.add("sticky");

}else{

header.classList.remove("sticky");

}

});

// ---------------- Image Hover ----------------

document.querySelectorAll(".product-card img").forEach(img=>{

img.addEventListener("mousemove",()=>{

img.style.transform="scale(1.08) rotate(-3deg)";

});

img.addEventListener("mouseleave",()=>{

img.style.transform="scale(1)";

});

});

// ---------------- Loading Finished ----------------

console.log("🚀 A Square Premium Website Loaded Successfully!");

console.log("Fuel Your Day, A Healthy Way 💪");
