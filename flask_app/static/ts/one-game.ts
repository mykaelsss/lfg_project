const openFormButtons: NodeListOf<HTMLElement> = document.querySelectorAll('[data-form-target]');
const closeFormButtons: NodeListOf<HTMLElement> = document.querySelectorAll('[data-close-button]');
const overlay: HTMLElement | null = document.getElementById('overlay');

openFormButtons.forEach(button => {
    button.addEventListener('click', () => {
        let formId: string = "";
        if (button.dataset.formTarget) {
            formId = button.dataset.formTarget
        }
        const form: HTMLElement | null = document.querySelector(formId);
        if (form) openForm(form);
    });
});

function openForm(form: HTMLElement){
    if (form == null) return;
    form.classList.add('active');
    overlay?.classList.add('active');
}

function closeForm(form: HTMLElement){
    if (form == null) return;
    form.classList.remove('active');
    overlay?.classList.remove('active');
}

const gameIdNav: HTMLElement | null = document.querySelector('[game-data-id]');
const gameIdBody: HTMLElement | null = document.querySelector('[game-body-id]');
const gameIDValue: string | null = gameIdNav?.getAttribute('game-data-id') ?? null;


function game(gameNav: HTMLElement, gameBody: HTMLElement, gameID: string) {
    if (gameID == '1') {
        gameNav.id = "d2-nav";
        gameBody.id = "d2_apex-body"
    }
    else if (gameID == '2') {
        gameNav.id = "wz-nav";
        gameBody.id = "wz-body"
    }
    else if (gameID === '3') {
        gameNav.id = "apex-nav";
        gameBody.id = "d2_apex-body"
    }
    else if (gameID == '4') {
        gameNav.id = "ov-nav";
        gameBody.id = "ov-body"
    }
    else if (gameID == '5') {
        gameNav.id = "valorant-nav";
        gameBody.id = "valorant-body"
    }
    else if (gameID == '6') {
        gameNav.id = "fort-nav";
        gameBody.id = "fort-body"
    }
}

(gameIdNav && gameIdBody && gameIDValue) ? game(gameIdNav, gameIdBody, gameIDValue) : null;

function adjustRows() {
    const textArea: HTMLTextAreaElement | null = document.getElementById("content") as HTMLTextAreaElement;
    if (window.innerWidth <=767) textArea.rows = 5;
    else textArea.rows = 10;
}
window.addEventListener("resize", adjustRows);
adjustRows();

const posts: NodeListOf<HTMLElement> = document.querySelectorAll("#posts");
const postsArr: HTMLElement[] = Array.from(posts);
const postsPerPage: number = 10;
let currentPage: number = 1;

const nextButton: HTMLButtonElement | null = document.getElementById("nextButton") as HTMLButtonElement;
const prevButton: HTMLButtonElement | null = document.getElementById("prevButton") as HTMLButtonElement;

function updateNextButton() {
    if (nextButton) nextButton.disabled = currentPage === Math.ceil(postsArr.length / postsPerPage);
}

function updatePrevButton() {
    if (prevButton) prevButton.disabled = currentPage === 1;
}

updateNextButton();
updatePrevButton();

function showPosts(pageNumber: number) {
    const indexOfLastPost: number = pageNumber * postsPerPage;
    const indexOfFirstPost: number = indexOfLastPost - postsPerPage;

    postsArr.forEach((post, index) => {
        if (index >= indexOfFirstPost && index < indexOfLastPost) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }
    });
}

showPosts(currentPage);

let totalPages: number = Math.ceil(postsArr.length / postsPerPage);

const select: HTMLSelectElement = document.getElementById("pages") as HTMLSelectElement;

for (let i = 0; i < totalPages; i++) {
    const option: HTMLOptionElement = document.createElement("option");
    option.value = (i + 1).toString();
    option.text = (i + 1).toString();
    select.appendChild(option);
}


function paginate(pageNumber: number) {
    currentPage = pageNumber;
    showPosts(currentPage);
    updateNextButton();
    updatePrevButton();

    const options: NodeListOf<HTMLOptionElement> = document.querySelectorAll('#pages option');
    options.forEach(option => {
        if (option.value == currentPage.toString()) {
            option.selected = true;
        } else {
            option.selected = false;
        }
    });
}

paginate(1);
