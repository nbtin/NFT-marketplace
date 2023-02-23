import getCookie from "../Cookie/getCookie"
import { configs } from "../configs/configs"
async function handlGetFollowing() {
    let user = ""
    let server = configs();
    await fetch(server + '/follow/' + getCookie("user_id"), {
        method: "GET",
        header:
        {
            "Content-Type": "application/json"
        }
    })
        .then(resp => resp.json()).then(resp => { user = resp; }).then(error => console.log(error));
    return user;
}



export { handlGetFollowing }