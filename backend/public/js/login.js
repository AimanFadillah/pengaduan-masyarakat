const formCreate = document.querySelector("#formCreate");



formCreate.addEventListener("submit",async (e) => {
    e.preventDefault()
    const response = await fetch(window.location.href,{
        body:new FormData(formCreate),
        method:"post",
    })
    const data = await response.json();
    if(data.status === "danger"){
       return alert(data.msg);
    }

    
    return window.location.href = "/";
})