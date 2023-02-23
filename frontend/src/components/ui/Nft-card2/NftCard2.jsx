import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { configs } from "../../../configs/configs"
import "./nft-card2.css";
import avt from "../../../assets/images/avt.png";
import Modal2 from "../Modal2/Modal2";
import History from "../History/History";
const NftCard2 = (props) => {
  const { title, token_id, price, creator_id_id, image, owner_id_id, for_sale } = props.item;
  const [priceNow, setPriceNow] = useState(price);
  const [showModal, setShowModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [userName, setUserName] = useState('');
  const [sale, setSale] = useState(for_sale === true ? 'Selling' : 'Sell');
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
      .then(resp => resp.json()).then(resp => { setUserName(resp.data.username) }).then(error => console.log(error));
  }, []);
  function handleUnSell(){
    if(sale == 'Selling'){
      fetch(server + '/postforsale', {
        method: "POST",
        header:
        {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token_id: token_id,
          price: "-1"
        })
      })
        .then(resp => resp.json()).then(resp => { console.log(resp) }).then(error => console.log(error));
      setSale('Sell');
    }
    else{
      setShowModal(true);
    }
     
  };

  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <Link to={`/nfts/${token_id}`}>
          <img src={server + '/' + image} alt="" className="w-100" />

        </Link>
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
              <h6>Created By</h6>
              <p className="name-overflow">{userName}</p>
            </div>
            <div>
              <h6>Current Price</h6>
              <p>{priceNow} ETH</p>
            </div>

          </div>
        </div>

        <div className=" mt-3 d-flex align-items-center justify-content-between">
          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={() => { handleUnSell();}}
          >
            <i class="ri-shopping-bag-line"
            ></i>
            {sale}
          </button>

          {showModal && <Modal2 setShowModal={setShowModal} infor={props} setSale={setSale} setPriceNow={setPriceNow} />}

          <span className="history__link">
            <span onClick={() => setShowHistory(true)}
            >View History</span>
          </span>
          {showHistory && <History setShowHistory={setShowHistory} infor={props} />}
        </div>
      </div>
    </div>
  );
};

export default NftCard2;
