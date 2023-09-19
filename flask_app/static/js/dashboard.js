let NUMBER_OF_STARS;

const addPulse = function( element ){
	const pulseTime = Math.random() * 4000;
	setTimeout( function(){
		element.className += ' pulse';
	}, pulseTime);
}
const stars = []; // An array to store star elements

function addStar(x, y) {
    const aStar = document.createElement('div');
    aStar.className = 'star';
    aStar.style.left = x + 'px';
    aStar.style.top = y + 'px';
    document.body.appendChild(aStar);
    addPulse(aStar);
    stars.push(aStar);
}

let vpWidth = window.innerWidth;

function correctStars(width) {
	if (width >= 1000) {
		NUMBER_OF_STARS = 400;
		console.log("stars", NUMBER_OF_STARS)
		return;
	}
	else if (width >= 768) {
		NUMBER_OF_STARS = 300;
		console.log("stars", NUMBER_OF_STARS)
		return;
	}
	else if (width >= 600) {
		NUMBER_OF_STARS = 250;
		console.log("stars", NUMBER_OF_STARS)
		return;
	}
	else NUMBER_OF_STARS = 150;
	console.log("stars", NUMBER_OF_STARS)
	return
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

// Initial call to add stars when the page loads
for (let jess = 0; jess < NUMBER_OF_STARS; jess++) {
    const windowWidth = document.body.offsetWidth;
    const windowHeight = document.body.offsetHeight;
	// console.log(windowWidth)
	// console.log(windowHeight)
	const minX = 10;
	const maxX = windowWidth - 10;
    const x = Math.floor(Math.random() * (maxX - minX)) + minX;
    const minY = 10; // Minimum Y position (10 pixels from the top)
    const maxY = windowHeight - 10; // Maximum Y position (10 pixels from the bottom)
    const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY; // Calculate random Y within range
    addStar(x, y);
}

let resizeTimer;

function handleResize() {
    const newVpWidth = window.innerWidth;
    if (newVpWidth !== vpWidth) {
        vpWidth = newVpWidth;
        correctStars(vpWidth);
    }
    updateStarPositions();
}

window.addEventListener('resize', handleResize);

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navBar = document.querySelector(".nav-bar");
const navLinks = document.querySelectorAll(".btn");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu () {
	hamburger.classList.toggle("active");
	navBar.classList.toggle("active");
    navMenu.classList.toggle("active");
}

const mediaQuery = window.matchMedia("(max-width: 768px)");

function updateNavLinksClasses() {
    navLinks.forEach(function(navLink) {
        navLink.classList.remove("btn", "btn-info");
        navLink.classList.add("nav-link");
    });
}

function revertChanges() {
	navLinks.forEach(function(navLink) {
		navLink.classList.remove("nav-link");
		navLink.classList.add("btn", "btn-info")
	})
}

(mediaQuery.matches) ? updateNavLinksClasses() : revertChanges();

mediaQuery.addEventListener("change", (event) => {
    if (event.matches) {
        updateNavLinksClasses();
    } else {
		revertChanges();
    }
});

message = document.getElementById("connect").innerHTML; // $ = taking a new line
distance = 150; // pixel(s)
speed = 35; // milliseconds

var txt="",
	num=0,
	num4=0,
	flyofle="",
	flyofwi="",
	flyofto="",
	fly=document.getElementById("connect");


function stfly() {
	for(i=0;i != message.length;i++) {
		if(message.charAt(i) != "$")
			txt += "<span style='position:relative;visibility:hidden;' id='n"+i+"'>"+message.charAt(i)+"<\/span>";
		else
			txt += "<br>";
	}
	fly.innerHTML = txt;
	txt = "";
	flyofle = fly.offsetLeft;
	flyofwi = fly.offsetWidth;
	flyofto = fly.offsetTop;
	fly2b();
}

function fly2b() {
	if(num4 != message.length) {
		if(message.charAt(num4) != "$") {
			var then = document.getElementById("n" + num4);
			then.style.left = flyofle - then.offsetLeft + flyofwi / 2;
			then.style.top = flyofto - then.offsetTop + distance;
			fly3(then.id, parseInt(then.style.left), parseInt(then.style.left) / 5, parseInt(then.style.top), parseInt(then.style.top) / 5);
		}
		num4++;
		setTimeout("fly2b()", speed);
	}
}

function fly3(target,lef2,num2,top2,num3) {
	if((Math.floor(top2) != 0 && Math.floor(top2) != -1) || (Math.floor(lef2) != 0 && Math.floor(lef2) != -1)) {
		if(lef2 >= 0)
			lef2 -= num2;
		else
			lef2 += num2 * -1;
		if(Math.floor(lef2) != -1) {
			document.getElementById(target).style.visibility = "visible";
			document.getElementById(target).style.left = Math.floor(lef2);
		} else {
			document.getElementById(target).style.visibility = "visible";
			document.getElementById(target).style.left = Math.floor(lef2 + 1);
		}
		if(lef2 >= 0)
			top2 -= num3
		else
			top2 += num3 * -1;
		if(Math.floor(top2) != -1)
			document.getElementById(target).style.top = Math.floor(top2);
		else
			document.getElementById(target).style.top = Math.floor(top2 + 1);
            setTimeout("fly3('"+target+"',"+lef2+","+num2+","+top2+","+num3+")",25)
        }
    }
    stfly()
