






const openFormButtons = document.querySelectorAll('[data-form-target]')
const closeFormButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openFormButtons.forEach(button => {
    button.addEventListener('click', () =>{
        const form = document.querySelector(button.dataset.formTarget)
        openForm(form)
    } )
})

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
