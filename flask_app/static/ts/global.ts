const hamburger: HTMLElement | null = document.querySelector(".hamburger");
const navMenu: HTMLElement | null = document.querySelector(".nav-menu");
const navBar: HTMLElement | null = document.querySelector(".nav-bar");
const navLinks: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".nav-btn");
const link: HTMLElement | null = document.querySelector(".nav-btn")!;

if (hamburger) hamburger.addEventListener("click", mobileMenu);

function mobileMenu () {
    navBar?.classList.toggle("active");
	hamburger?.classList.toggle("active");
    navMenu?.classList.toggle("active");
}

const mediaQuery = window.matchMedia("(max-width: 768px)");
const styles = window.getComputedStyle(link);
const bgColor = styles.backgroundColor;

function updateNavLinksClasses() {
    navLinks.forEach(function(navLink) {
        navLink.classList.remove("btn", "nav-btn");
        navLink.classList.add("nav-link");
        navLink.style.backgroundColor = "";
    });
}

function revertChanges() {
	navLinks.forEach(function(navLink) {
		navLink.classList.remove("nav-link");
		navLink.classList.add("btn", "nav-btn")
        navLink.style.backgroundColor = bgColor;
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

const showPassword = document.querySelector("#show-password");
const passwordFields = document.querySelectorAll(".password-toggle");

showPassword?.addEventListener("click", function (this: any) {
    this.style.cursor = "pointer";
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash", !this.classList.contains("fa-eye"));

    passwordFields.forEach(function (field) {
        const type = (field.getAttribute("type") === "password") ? "text" : "password";
        field.setAttribute("type", type);
    });
});
