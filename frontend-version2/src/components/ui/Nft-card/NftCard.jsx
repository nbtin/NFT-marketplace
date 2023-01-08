import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { configs } from "../../../configs/configs"
import getCookie from "../../../Cookie/getCookie";
import Modal2 from "../Modal3/Modal3";
import avt from "../../../assets/images/avt.png";
import empty from "../../../assets/images/images.png";

const NftCard = (props) => {
  const { title, token_id, price, creator_id_id, image, owner_id_id } = props.item;
  const [userName, setUserName] = useState('');
  const [buyed,setBuyed] = useState(false);
  let server = configs();
  useEffect(() => {
    fetch(server + '/getuser', {
      method: "POST",
      header:
      {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: owner_id_id 
      })
    })
      .then(resp => resp.json()).then(resp => { setUserName(resp.data.username) }).then(error => console.log(error));
  }, []);

  return (
    <>
      <div className= {buyed === true ? 'style-buyed' : 'single__nft__card'}>
        <div className="nft__img">
          <img src={image === '' ? empty : image} alt="" className="w-100" />
        </div>

        <div className="nft__content">
          <h5 className="nft__title">
            <Link to={`/nfts/${token_id}`}>{title}</Link>
          </h5>

          <div className="creator__info-wrapper d-flex gap-3">
            <div className="creator__img">
              <img src={avt} alt="" className="w-100" />
            </div>

            <div className="creator__info w-100 d-flex align-items-center justify-content-between">
              <div>
                <h6>Owner By</h6>
                <p className="name-overflow">{userName}</p>
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
            >
              <i class="ri-shopping-bag-line"></i> Buy
            </button>


            <span className="history__link">
              <Link to="#">View History</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NftCard;
