
import {configs} from "../configs/configs"
async function handleGetMarketAPI() {
    let user =""
    let server = configs();
    await fetch(server + '/collection?type=market', {
        method: "GET",
        header:
        {
            "Access-Control-Allow-Origin": "*",
        }
    })
        .then( resp => resp.json()).then(resp => { user=resp; }).then(error => console.log(error));
    return user;
}



export { handleGetMarketAPI }