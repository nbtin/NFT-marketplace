import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { configs } from "../../../configs/configs"
import "./nft-card2.css";

import Modal2 from "../Modal2/Modal2";

const NftCard2 = (props) => {
  const { title, token_id, price, creator_id_id, image, owner_id_id } = props.item;
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState('');
  let server = configs();
  useEffect(() => {
    fetch(server + '/getuser', {
      method: "POST",
      header:
      {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: creator_id_id
    })
  })
      .then( resp => resp.json()).then(resp => { setUserName(resp.data.username) }).then(error => console.log(error));
}, []);

  console.log(server + '/;' + image)
  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <img src={server + '/' + image} alt="" className="w-100" />
      </div>

      <div className="nft__content">
        <h5 className="nft__title">
          <Link to={`/market/${token_id}`}>{title}</Link>
        </h5>

        <div className="creator__info-wrapper d-flex gap-3">
          <div className="creator__img">
            <img src={creator_id_id} alt="" className="w-100" />
          </div>

          <div className="creator__info w-100 d-flex align-items-center justify-content-between">
            <div>
              <h6>Created By</h6>
              <p>{userName}</p>
            </div>
            <div>
              <h6>Current Price</h6>
              <p>{price} ETH</p>
            </div>

          </div>
        </div>

        <div className=" mt-3 d-flex align-items-center justify-content-between">
          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={() => setShowModal(true)}
          >
            <i class="ri-shopping-bag-line"></i> Sell
          </button>

          {showModal && <Modal2 setShowModal={setShowModal} infor={props} />}

          <span className="history__link">
            <Link to="#">View History</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default NftCard2;
