import React, { useState, useEffect } from "react";
import { configs } from "../../../configs/configs"
import { Container, Row, Col } from "reactstrap";
import "./History.css";

const History = (props) => {
    const { title, token_id, creator_id_id, image, owner_id_id } = props.infor.item;
    const [history, setHistory] = useState([]);
    let server = configs();
    useEffect(() => {
        fetch(server + '/history/' + token_id, {
            method: "GET",
            header:
            {
                "Content-Type": "application/json"
            }
        })
            .then(resp => resp.json()).then(resp => { setHistory(resp.data); }).then(error => console.log(error));
    }, []);
    function fixName(name){
        if(name.length <25)
            return name
        else{
            let newName = '';
            for (let i = 0; i < 22; i++) {
                newName+=name[i];
              }
            return newName+ "...";
        }
    }
    return (
        <div className="modal__wrapper">
            <div className="single__modal4">
                <span className="close__modal">
                    <i class="ri-close-line" onClick={() => props.setShowHistory(false)}>X</i>
                </span>
                <h6 className="text-center text-light">ACTIVITY HISTORY</h6>
                <div>
                <div className="history-app">
                    <table>
                        <tr>
                            <th >Name</th>
                            <th>Action</th>
                            <th>Price</th>
                            <th>Time</th>
                        </tr>
                        {history.map((item) => {
                            return (
                                <tr key={item.time}>
                                    <td  className="item-history-name">{fixName(item.name)}</td>
                                    <td>{item.action}</td>
                                    <td>{item.price === "" ? "": item.price+ ' ETH'}</td>
                                    <td>{item.time}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
                </div>
            </div>
        </div>
    );
};

export default History;