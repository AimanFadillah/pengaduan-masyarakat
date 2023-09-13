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

function redirect (link) {
    return window.location.href = link;
}