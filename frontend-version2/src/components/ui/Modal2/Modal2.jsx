import React, {useState} from "react";
import { configs } from "../../../configs/configs"
import "./modal2.css";

const Modal2 = (props) => {
  const { title, token_id, creator_id_id, image, owner_id_id } = props.infor.item;
  const[price,setPrice] = useState(0);
  let server = configs();
  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i class="ri-close-line" onClick={() => props.setShowModal(false)}></i>
        </span>
        <h6 className="text-center text-light">SELL</h6>
      
        <img className = 'img-sell' src={server + '/' + image} alt=""  />

        <div className="input__item mb-4">
          <h6>Set Price</h6>
          <input type="number" placeholder="0.0 ETH"onChange={(event) => setPrice(event.target.value)}/>
        </div>
        <div className=" d-flex align-items-center justify-content-between">
          <p>Price to be paid by the buyer:</p>
          <span className="money">{price}</span>
        </div>

        <div className=" d-flex align-items-center justify-content-between">
          <p>Transaction fee:</p>
          <span className="money">5%</span>
        </div>

        <div className=" d-flex align-items-center justify-content-between">
          <p>Gas price:</p>
          <span className="money">0.04%</span>
        </div>

        <div className=" d-flex align-items-center justify-content-between ">
          <p>Total you get after sale:</p>
          <span className="money">{Math.round((price - price*0.05 - price*0.0004)*100)/100}</span>
        </div>

        <button className="place__bid-btn">Sell</button>
      </div>
    </div>
  );
};

export default Modal2;
