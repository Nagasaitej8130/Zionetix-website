// VANTA WAVES HERO

VANTA.WAVES({
  el: "#hero",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  scale: 1.0,
  waveHeight: 20,
  waveSpeed: 0.8,
  zoom: 0.9
});



// AOS SCROLL ANIMATION

AOS.init();



// SCROLL BUTTONS

const topButton = document.getElementById("topButton");
const bottomButton = document.getElementById("bottomButton");


topButton.onclick = () => {

window.scrollTo({
top:0,
behavior:"smooth"
});

};


bottomButton.onclick = () => {

document.getElementById("contact").scrollIntoView({
behavior:"smooth"
});

};

// SECTION NAVIGATION CLICK

const navDots = document.querySelectorAll(".nav-dot");

navDots.forEach(dot => {

dot.addEventListener("click", () => {

const section = document.getElementById(dot.dataset.section);

section.scrollIntoView({
behavior:"smooth"
});

});

});

// ACTIVE SECTION DETECTION

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

let current = "";

sections.forEach(section => {

const sectionTop = section.offsetTop;

if(pageYOffset >= sectionTop - 200){

current = section.getAttribute("id");

}

});


navDots.forEach(dot => {

dot.classList.remove("active");

if(dot.dataset.section === current){

dot.classList.add("active");

}

});

});

// NAVBAR SCROLL CHANGE

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

if(window.scrollY > 50){
navbar.classList.add("scrolled");
}else{
navbar.classList.remove("scrolled");
}

});

// FAQ ACCORDION

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

item.addEventListener("click", () => {

item.classList.toggle("active");

});

});

// MOBILE MENU

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

navLinks.classList.toggle("active");

});

// HERO PARALLAX

const hero = document.querySelector("#hero");

hero.addEventListener("mousemove", (e) => {

const x = (window.innerWidth / 2 - e.pageX) / 30;
const y = (window.innerHeight / 2 - e.pageY) / 30;

hero.querySelector(".hero-content").style.transform =
`translate(${x}px, ${y}px)`;

});
// EMAILJS INITIALIZE
emailjs.init("wA8pI8FPXfeaFUT1v");


// CONTACT FORM SUBMISSION
document.getElementById("contact-form")
.addEventListener("submit", function(event){

event.preventDefault();

const form = this;
const button = document.getElementById("submit-btn");


// CHANGE BUTTON STATE
button.innerText = "Sending...";
button.disabled = true;


// EMAIL TO YOU
emailjs.sendForm(
"service_5lkdkq9",
"template_8sjrllm",
form
)

.then(function(){

// AUTO REPLY TO CLIENT
emailjs.sendForm(
"service_5lkdkq9",
"template_5al3n74",
form
);


// SAVE LEAD TO GOOGLE SHEETS
const formData = new FormData();

formData.append("name", form.name.value);
formData.append("email", form.email.value);
formData.append("phone", form.phone.value);
formData.append("message", form.message.value);

fetch("https://script.google.com/macros/s/AKfycby7uMqLTMA4G_XqYFicjR338S54TOU9XFMcH0IyawDmiJnW0LLEChrvNztP_F6iAojIig/exec", {
method: "POST",
body: formData
});


button.innerText = "Submitted!";

setTimeout(() => {
button.innerText = "Submit";
button.disabled = false;
}, 3000);

form.reset();

},

function(error){

button.innerText = "Submit";
button.disabled = false;

alert("Something went wrong. Please try again.");

});

});