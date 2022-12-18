import React, { useState } from "react";
import { Link } from "react-router-dom";
import { configs } from "../../../configs/configs"
import "./nft-card2.css";

import Modal from "../Modal/Modal";

const NftCard2 = (props) => {
  const { title, token_id, price, creator_id_id, image, owner_id_id } = props.item;
  const [showModal, setShowModal] = useState(false);
  let server = configs();
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
              <p>{owner_id_id}</p>
            </div>

            <div>
              <h6>Current Bid</h6>
              <p>{price} ETH</p>
            </div>
          </div>
        </div>

        <div className=" mt-3 d-flex align-items-center justify-content-between">
          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={() => setShowModal(true)}
          >
            <i class="ri-shopping-bag-line"></i> Place Bid
          </button>

          {showModal && <Modal setShowModal={setShowModal} />}

          <span className="history__link">
            <Link to="#">View History</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default NftCard2;
