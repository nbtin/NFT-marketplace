<<<<<<< HEAD

import {configs} from "../configs/configs"
async function handleLoginAPI(email, password) {
    let user ="";
    let server = configs();
    console.log(server+'/login');
    await fetch(server+'/login', {
=======
import {configs} from "../configs/configs"

async function handleLoginAPI(email, password) {
    let user =""
    let server = configs();
    await fetch(server + '/login', {
>>>>>>> 788a95ab5d0b405c0dbf211a95b076dd46890156
        method: "POST",
        header:
        {
            "Content-Type": "application/json",
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