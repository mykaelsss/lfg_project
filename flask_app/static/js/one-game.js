const openFormButtons = document.querySelectorAll('[data-form-target]')
const closeFormButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openFormButtons.forEach(button => {
    button.addEventListener('click', () => {
        const formId = button.dataset.formTarget;
        const form = document.querySelector(formId);
        openForm(form);
    });
});

overlay.addEventListener('click', () => {
    const forms = document.querySelectorAll('.create_form.active')
    forms.forEach( form => {
        closeForm(form)
    })
})

closeFormButtons.forEach(button => {
    button.addEventListener('click', () =>{
        const form = button.closest('.create_form')
        closeForm(form)
    } )
})

function openForm(form){
    if (form == null) {
        return
    }
    form.classList.add('active')
    overlay.classList.add('active')
}

function closeForm(form){
    if (form == null) {
        return
    }
    form.classList.remove('active')
    overlay.classList.remove('active')
}


const gameIdNav = document.querySelector('[game-data-id]');
const gameIdBody = document.querySelector('[game-body-id]');
const gameIDValue = gameIdNav.getAttribute('game-data-id');

function game(gameNav, gameBody, gameID) {
    if (gameID === '1') {
        gameNav.id = "d2-nav";
        gameBody.id = "d2_apex-body"
    }
    else if (gameID === '2') {
        gameNav.id = "wz-nav";
        gameBody.id = "wz-body"
    }
    else if (gameID === '3') {
        gameNav.id = "apex-nav";
        gameBody.id = "d2_apex-body"
    }
    else if (gameID === '4') {
        gameNav.id = "ov-nav";
        gameBody.id = "ov-body"
    }
    else if (gameID === '5') {
        gameNav.id = "valorant-nav";
        gameBody.id = "valorant-body"
    }
    else if (gameID === '6') {
        gameNav.id = "fort-nav";
        gameBody.id = "fort-body"
    }
}

game(gameIdNav, gameIdBody, gameIDValue);

function adjustRows() {
    const textArea = document.getElementById("content");
    if (window.innerWidth <=767) textArea.rows = 5;
    else textArea.rows = 10;
}
window.addEventListener("resize", adjustRows);
adjustRows();

const posts = document.querySelectorAll("#posts");
const postsArr = Array.from(posts);
const postsPerPage = 10;
let currentPage = 1;

const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");

function updateNextButton() {
    nextButton.disabled = currentPage === Math.ceil(postsArr.length / postsPerPage);
}

function updatePrevButton() {
    prevButton.disabled = currentPage === 1;
}

updateNextButton();
updatePrevButton();

function showPosts(pageNumber) {
    const indexOfLastPost = pageNumber * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    postsArr.forEach((post, index) => {
        if (index >= indexOfFirstPost && index < indexOfLastPost) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }
    });
}

showPosts(currentPage);

let totalPages = Math.ceil(postsArr.length / postsPerPage);

const select = document.getElementById("pages");

for (let i = 0; i < totalPages; i++) {
    const option = document.createElement("option");
    option.value = i + 1;
    option.text = i + 1;
    select.appendChild(option);
}


function paginate(pageNumber) {
    currentPage = pageNumber;
    showPosts(currentPage);
    updateNextButton();
    updatePrevButton();

    const options = document.querySelectorAll('#pages option');
    options.forEach(option => {
        if (option.value == currentPage) {
            option.selected = true;
        } else {
            option.selected = false;
        }
    });
}

paginate(1);
