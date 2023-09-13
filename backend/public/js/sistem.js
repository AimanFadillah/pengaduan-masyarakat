const formCreate = document.querySelector("#formCreate");

formCreate.addEventListener("submit",async (e) => {
    e.preventDefault();
    if(await setupFecth(formCreate,formCreate.getAttribute("action"),formCreate.getAttribute("method"))){
        redirect(formCreate.getAttribute("data-redirect"));
    }
})