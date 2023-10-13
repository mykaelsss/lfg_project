let NUMBER_OF_STARS: number = 0;

const addPulse = function(element: HTMLElement) {
    const pulseTime: number = Math.random() * 4000;
    setTimeout( function(){
		element.className += ' pulse';
	}, pulseTime);
}

const stars: HTMLElement[] = [];

function addStar(x: number, y: number) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    document.body.appendChild(star);
    addPulse(star);
    stars.push(star);
}

let vpWidth: number = window.innerWidth;

function correctStars(width: number) {
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
	else NUMBER_OF_STARS = 150;
	console.log("stars", NUMBER_OF_STARS);
	return;
}

correctStars(vpWidth);

function updateStarPositions() {
    const windowWidth: number = document.body.offsetWidth;
    const windowHeight: number  = document.body.offsetHeight;

        // Update the positions of existing stars
        stars.forEach((star) => {
            const minX: number = 10;
            const maxX: number = windowWidth - 10;
            const x: number = Math.floor(Math.random() * (maxX - minX)) + minX;
            const minY: number = 10; // Minimum Y position (10 pixels from the top)
            const maxY: number = windowHeight - 10; // Maximum Y position (10 pixels from the bottom)
            const y: number = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
            star.style.left = x + 'px';
            star.style.top = y + 'px';
        });
}

for (let i:number = 0; i < NUMBER_OF_STARS; i++) {
    const windowWidth: number = document.body.offsetWidth;
    const windowHeight: number = document.body.offsetHeight;
	const minX: number = 10;
	const maxX: number = windowWidth - 10;
    const x: number = Math.floor(Math.random() * (maxX - minX)) + minX;
    const minY: number = 10; // Minimum Y position (10 pixels from the top)
    const maxY: number = windowHeight - 10; // Maximum Y position (10 pixels from the bottom)
    const y: number = Math.floor(Math.random() * (maxY - minY + 1)) + minY; // Calculate random Y within range
    addStar(x, y);
}

function handleResize() {
    const newVpWidth: number = window.innerWidth;
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

    const message: string | null = document.getElementById("connect")?.innerHTML || null;
    const distance: number = 150; // pixel(s)
    const speed: number = 35; // milliseconds

    let txt: string = "";
	let num: number = 0;
	let num4: number = 0
	let flyofleft: any = "";
	let flyofwidth: any = "";
	let flyoftop: any = "";
	const fly: HTMLElement | null = document.getElementById("connect");

    function stfly() {
        for (let i:number = 0; i != message?.length; i++) {
            if (message?.charAt(i) != "$")
                txt += "<span style='position:relative;visibility:hidden;' id='n"+i+"'>"+message?.charAt(i)+"<\/span>";
            else
                txt += "<br>";
        }
        if (fly) {
            fly.innerHTML = txt;
        }
        txt = "";
        flyofleft = fly?.offsetLeft;
        flyofwidth = fly?.offsetWidth;
        flyoftop = fly?.offsetTop;
        fly2b();
    }

    function fly2b() {
        if (num4 != message?.length) {
            if (message?.charAt(num4) != "$") {
                const then: any | null = document.getElementById("n" + num4);
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

    function fly3(target: string, lef2: number, num2: number, top2: number, num3: number) {
        if ((Math.floor(top2) != 0 && Math.floor(top2) != -1) || (Math.floor(lef2) != 0 && Math.floor(lef2) != -1)) {
            const element: any | null = document.getElementById(target);
            if (lef2 >= 0)
                lef2 -= num2;
            else
                lef2 += num2 * -1;
            if (Math.floor(lef2) != -1) {
                if (element) {
                    element.style.visibility = "visible";
                    element.style.left = Math.floor(lef2);
                }
            } else {
                if (element) {
                    element.style.visibility = "visible";
                    element.style.left = Math.floor(lef2 + 1);
                }
            }
            if (lef2 >= 0)
                top2 -= num3
            else
                top2 += num3 * -1;
            if (Math.floor(top2) != -1)
                if (element)
                    element.style.top = Math.floor(top2);
            else {
                if (element) {
                    element.style.top = Math.floor(top2 + 1);
                    setTimeout("fly3('"+target+"',"+lef2+","+num2+","+top2+","+num3+")",25)
                }
            }
            }
        }

stfly()
