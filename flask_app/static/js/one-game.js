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
    const textArea = document.getElementById("des");
    if (window.innerWidth <=767) textArea.rows = 5;
    else textArea.rows = 10;
}
window.addEventListener("resize", adjustRows);
adjustRows();
