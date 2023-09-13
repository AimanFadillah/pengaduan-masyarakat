const formCreate = document.querySelector("#formCreate");
const buttonSubmit = document.querySelector("#submit")

formCreate.addEventListener("submit",async (e) => {
    e.preventDefault();
    buttonLoadingOn(buttonSubmit);
    if(await setupFecth(formCreate,formCreate.getAttribute("action"),formCreate.getAttribute("method"))){
        redirect(formCreate.getAttribute("data-redirect"));
    }
    buttonLoadingOff(buttonSubmit);
})