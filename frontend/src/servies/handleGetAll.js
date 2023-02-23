import getCookie from "../Cookie/getCookie"
import { configs } from "../configs/configs"
async function handleGetAll() {
    let user = ""
    let server = configs();
    await fetch(server + '/collection?type=all', {
        method: "GET",
        header:
        {
            "Content-Type": "application/json"
        }
    })
        .then(resp => resp.json()).then(resp => { user = resp; }).then(error => console.log(error));
    return user;
}



export { handleGetAll }