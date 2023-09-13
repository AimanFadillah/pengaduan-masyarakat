const formCreate = document.querySelector("#formCreate");



formCreate.addEventListener("submit",async (e) => {
    e.preventDefault()
    if(await setupFecth(formCreate)){
        return window.location.href = "/";
    }
})