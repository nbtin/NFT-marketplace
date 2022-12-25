import React, { useState, useEffect } from "react";
import { configs } from "../../../configs/configs"
import { Container } from "react-bootstrap";
import "./modal3.css";
import getCookie from "../../../Cookie/getCookie";

const Modal3 = (props) => {
  const { title, token_id, creator_id_id, image, owner_id_id,price } = props.infor.item;
  const [balance, setBalance] = useState(0);
  let server = configs();
  function handleTransaction() {
    fetch(server + '/transaction', {
      method: "POST",
      header:
      {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token_id: token_id,
        gas_price: 0.04,
        buyer_id: getCookie("user_id"),
        seller_id: owner_id_id,
        transaction_fee: 5

      })
    })
      .then(resp => resp.json()).then(resp => { console.log(resp) }).then(error => console.log(error));
    props.setShowModal(false);
    props.setBuyed(true);
  }
  useEffect(() => {
    fetch(server + '/getwallet', {
        method: "POST",
        header:
        {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            wallet_id: getCookie('wallet_address')
        })
    })
        .then(resp => resp.json()).then(resp => { setBalance(resp.data.wallet_balance);}).then(error => console.log(error));
}
    , [])

  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i class="ri-close-line" onClick={() => props.setShowModal(false)}></i>
        </span>
        <h6 className="text-center text-light">BUY</h6>

        <img className='img-sell' src={server + '/' + image} alt="" />

        <div className=" d-flex align-items-center justify-content-between">
          <p>Balance:</p>
          <span className="money">{balance}</span>
        </div>

        <div className=" d-flex align-items-center justify-content-between">
          <p>Price:</p>
          <span className="money">{price}</span>
        </div>

        <div className=" d-flex align-items-center justify-content-between ">
          <p>New balance:</p>
          <span className="money">{balance - price > 0 ? balance - price : 0 }</span>
        </div>

        <button className="place__bid-btn"
          onClick={() => handleTransaction()}
        >Buy</button>
      </div>
    </div>
  );
};

export default Modal3;
