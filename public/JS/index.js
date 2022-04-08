console.log("Welcome to my portfolio website");
// variables declarations
let mobileMenu = document.querySelector(".mobileMenu");
let nav = document.querySelector(".mobileNav");

let navbar = document.querySelector("#navbar");
let navLinks = Array.from(document.querySelectorAll(".item a"));
let navLinksMobile = Array.from(document.querySelectorAll(".mobile_link a"));
let homeText = document.querySelector("#home div text");
var width = 0;
var text = 'A Full Stack Web Developer';
var speed = 100;
var i = 0;

// update width function
function updateWidth() {
    width = document.body.clientWidth;
}

setInterval(updateWidth, 1000);

if (width <= 753) {
    function display() {
        navbar.classList.toggle("mobileMenuDisplay");
        setTimeout(() => { nav.classList.toggle("d_block"); }, 250)
        console.log('you clicked mobile menu', width);
    }
    mobileMenu.addEventListener("click", display);
}

// active link
navLinks[0].onclick = () => {
    for (i = 1; i <= 3; i++) {
        navLinks[i].classList.remove("active");
    }
    navLinks[0].classList.toggle("active");

}
navLinks[1].onclick = () => {
    navLinks[0].classList.remove("active");
    navLinks[2].classList.remove("active");
    navLinks[3].classList.remove("active");
    navLinks[1].classList.toggle("active");
}
navLinks[2].onclick = () => {
    navLinks[0].classList.remove("active");
    navLinks[1].classList.remove("active");
    navLinks[3].classList.remove("active");
    navLinks[2].classList.toggle("active");
}
navLinks[3].onclick = () => {
    for (i = 0; i < 3; i++) {
        navLinks[i].classList.remove("active");
    }
    navLinks[3].classList.toggle("active");
}

// active link for mobile
if (width <= 753) {
    navLinksMobile[0].onclick = () => {
        for (i = 1; i <= 3; i++) {
            navLinksMobile[i].classList.remove("mobile_active");
        }
        navLinksMobile[0].classList.toggle("mobile_active");
        navbar.classList.toggle("mobileMenuDisplay");
        nav.classList.toggle("d_block");
        console.log('you clicked link1');

    }
    navLinksMobile[1].onclick = () => {
        navLinksMobile[0].classList.remove("mobile_active");
        navLinksMobile[2].classList.remove("mobile_active");
        navLinksMobile[3].classList.remove("mobile_active");
        navLinksMobile[1].classList.toggle("mobile_active");
        navbar.classList.toggle("mobileMenuDisplay");
        nav.classList.toggle("d_block");
        console.log('you clicked link2');
    }
    navLinksMobile[2].onclick = () => {
        navLinksMobile[0].classList.remove("mobile_active");
        navLinksMobile[1].classList.remove("mobile_active");
        navLinksMobile[3].classList.remove("mobile_active");
        navLinksMobile[2].classList.toggle("mobile_active");
        navbar.classList.toggle("mobileMenuDisplay");
        nav.classList.toggle("d_block");
        console.log('you clicked link3');
    }
    navLinksMobile[3].onclick = () => {
        for (i = 0; i < 3; i++) {
            navLinksMobile[i].classList.remove("mobile_active");
        }
        navLinksMobile[3].classList.toggle("mobile_active");
        navbar.classList.toggle("mobileMenuDisplay");
        nav.classList.toggle("d_block");
        console.log('you clicked link4');
    }
}
window.onresize = () => {
    if (document.body.clientWidth > 753) {
        navbar.classList.remove("mobileMenuDisplay");
        nav.classList.remove("d_block");
    }
}

// function for home page text typing effect
function homeTextEffect() {
    if (i < text.length) {
        homeText.innerHTML += text.charAt(i);
        i++;
    }
}

let textEffect = setInterval(homeTextEffect, speed);

// clearing interval
setTimeout(() => {
    console.log(i==text.length);
    if(i===text.length){
        clearInterval(textEffect);
    }
}, 4000);
