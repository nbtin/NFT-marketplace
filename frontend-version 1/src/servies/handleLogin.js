

async function handleLoginAPI(email, password) {
    let user =""
    await fetch('https://c205-14-0-25-109.ap.ngrok.io/login', {
        method: "POST",
        header:
        {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then( resp => resp.json()).then(resp => { user=resp; }).then(error => console.log(error));
    return user;
}



export { handleLoginAPI }