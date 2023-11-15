async function setupFecth (form,link = window.location.href,method = "POST"){
    const response = await fetch(link,{
        method:"POST",
        body: new FormData(form),
        Headers:{
            "X-HTTP-Method-Override" : method
        }
    })
    const data = await response.json();
    if(data.status === "danger"){
        alert(data.msg);
        return false;
    }
    return data;
}

function buttonLoadingOn (button) {
    button.innerHTML = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> ` + button.innerHTML;
    button.disabled = true;
}

function buttonLoadingOff (button) {
    const span = button.querySelector(".spinner-border");
    button.removeChild(span);
    button.disabled = false;
}

function redirect (link) {
    return window.location.href = link;
}