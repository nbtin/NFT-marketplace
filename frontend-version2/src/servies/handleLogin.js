

async function handleLoginAPI(email, password) {
    let user =""
    await fetch('http://localhost:8000/login', {
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