"use strict";
var _a;
let NUMBER_OF_STARS = 0;
const addPulse = function (element) {
    const pulseTime = Math.random() * 4000;
    setTimeout(function () {
        element.className += ' pulse';
    }, pulseTime);
};
const stars = [];
function addStar(x, y) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    document.body.appendChild(star);
    addPulse(star);
    stars.push(star);
}
let vpWidth = window.innerWidth;
function correctStars(width) {
    if (width >= 1000) {
        NUMBER_OF_STARS = 400;
        console.log("stars", NUMBER_OF_STARS);
        return;
    }
    else if (width >= 768) {
        NUMBER_OF_STARS = 300;
        console.log("stars", NUMBER_OF_STARS);
        return;
    }
    else if (width >= 600) {
        NUMBER_OF_STARS = 250;
        console.log("stars", NUMBER_OF_STARS);
        return;
    }
    else
        NUMBER_OF_STARS = 150;
    console.log("stars", NUMBER_OF_STARS);
    return;
}
correctStars(vpWidth);
function updateStarPositions() {
    const windowWidth = document.body.offsetWidth;
    const windowHeight = document.body.offsetHeight;
    // Update the positions of existing stars
    stars.forEach((star) => {
        const minX = 10;
        const maxX = windowWidth - 10;
        const x = Math.floor(Math.random() * (maxX - minX)) + minX;
        const minY = 10; // Minimum Y position (10 pixels from the top)
        const maxY = windowHeight - 10; // Maximum Y position (10 pixels from the bottom)
        const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
        star.style.left = x + 'px';
        star.style.top = y + 'px';
    });
}
for (let i = 0; i < NUMBER_OF_STARS; i++) {
    const windowWidth = document.body.offsetWidth;
    const windowHeight = document.body.offsetHeight;
    const minX = 10;
    const maxX = windowWidth - 10;
    const x = Math.floor(Math.random() * (maxX - minX)) + minX;
    const minY = 10; // Minimum Y position (10 pixels from the top)
    const maxY = windowHeight - 10; // Maximum Y position (10 pixels from the bottom)
    const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY; // Calculate random Y within range
    addStar(x, y);
}
function handleResize() {
    const newVpWidth = window.innerWidth;
    if (newVpWidth !== vpWidth) {
        vpWidth = newVpWidth;
        correctStars(vpWidth);
    }
    updateStarPositions();
}
window.addEventListener('resize', handleResize);
// const hamburger: HTMLElement | null = document.querySelector(".hamburger");
// const navMenu: HTMLElement | null = document.querySelector(".nav-menu");
// const navBar: HTMLElement | null = document.querySelector(".nav-bar");
// const navLinks: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".btn");
// if (hamburger) {
//     hamburger.addEventListener("click", mobileMenu);
//     }
//     function mobileMenu () {
//         if (hamburger) {
//             hamburger.classList.toggle("active");
//         }
//         if (navBar) {
//             navBar.classList.toggle("active");
//         }
//         if (navMenu) {
//             navMenu.classList.toggle("active");
//         }
//     }
//     const mediaQuery: MediaQueryList = window.matchMedia("(max-width: 768px)");
//     function updateNavLinksClasses() {
//         navLinks.forEach(function(navLink) {
//             navLink.classList.remove("btn", "btn-info");
//             navLink.classList.add("nav-link");
//         });
//     }
//     function revertChanges() {
//         navLinks.forEach(function(navLink) {
//             navLink.classList.remove("nav-link");
//             navLink.classList.add("btn", "btn-info")
//         })
//     }
//     (mediaQuery.matches) ? updateNavLinksClasses() : revertChanges();
//     mediaQuery.addEventListener("change", (event) => {
//         (event.matches) ? updateNavLinksClasses() : revertChanges();
//     });
const message = ((_a = document.getElementById("connect")) === null || _a === void 0 ? void 0 : _a.innerHTML) || null;
const distance = 150; // pixel(s)
const speed = 35; // milliseconds
let txt = "";
let num = 0;
let num4 = 0;
let flyofleft = "";
let flyofwidth = "";
let flyoftop = "";
const fly = document.getElementById("connect");
function stfly() {
    for (let i = 0; i != (message === null || message === void 0 ? void 0 : message.length); i++) {
        if ((message === null || message === void 0 ? void 0 : message.charAt(i)) != "$")
            txt += "<span style='position:relative;visibility:hidden;' id='n" + i + "'>" + (message === null || message === void 0 ? void 0 : message.charAt(i)) + "<\/span>";
        else
            txt += "<br>";
    }
    if (fly) {
        fly.innerHTML = txt;
    }
    txt = "";
    flyofleft = fly === null || fly === void 0 ? void 0 : fly.offsetLeft;
    flyofwidth = fly === null || fly === void 0 ? void 0 : fly.offsetWidth;
    flyoftop = fly === null || fly === void 0 ? void 0 : fly.offsetTop;
    fly2b();
}
function fly2b() {
    if (num4 != (message === null || message === void 0 ? void 0 : message.length)) {
        if ((message === null || message === void 0 ? void 0 : message.charAt(num4)) != "$") {
            const then = document.getElementById("n" + num4);
            if (then) {
                // const id: string | undefined = then.id;
                then.style.left = flyofleft - then.offsetLeft + flyofwidth / 2;
                then.style.top = flyoftop - then.offsetTop + distance;
                fly3(then.id, parseInt(then.style.left), parseInt(then.style.left) / 5, parseInt(then.style.top), parseInt(then.style.top) / 5);
            }
        }
        num4++;
        setTimeout("fly2b()", speed);
    }
}
function fly3(target, lef2, num2, top2, num3) {
    if ((Math.floor(top2) != 0 && Math.floor(top2) != -1) || (Math.floor(lef2) != 0 && Math.floor(lef2) != -1)) {
        const element = document.getElementById(target);
        if (lef2 >= 0)
            lef2 -= num2;
        else
            lef2 += num2 * -1;
        if (Math.floor(lef2) != -1) {
            if (element) {
                element.style.visibility = "visible";
                element.style.left = Math.floor(lef2);
            }
        }
        else {
            if (element) {
                element.style.visibility = "visible";
                element.style.left = Math.floor(lef2 + 1);
            }
        }
        if (lef2 >= 0)
            top2 -= num3;
        else
            top2 += num3 * -1;
        if (Math.floor(top2) != -1)
            if (element)
                element.style.top = Math.floor(top2);
            else {
                if (element) {
                    element.style.top = Math.floor(top2 + 1);
                    setTimeout("fly3('" + target + "'," + lef2 + "," + num2 + "," + top2 + "," + num3 + ")", 25);
                }
            }
    }
}
stfly();
