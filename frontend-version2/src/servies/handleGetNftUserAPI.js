import getCookie from "../Cookie/getCookie"
import {configs} from "../configs/configs"
async function handleGetNftUserAPI() {
    let user =""
    let server = configs();
    await fetch(server + '/collection/' + getCookie("username"), {
        method: "GET",
        header:
        {
            "Content-Type": "application/json"
        }
    })
        .then( resp => resp.json()).then(resp => { user=resp; }).then(error => console.log(error));
    return user;
}



export { handleGetNftUserAPI }