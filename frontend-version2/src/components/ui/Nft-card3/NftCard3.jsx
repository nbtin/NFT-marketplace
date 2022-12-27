import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { configs } from "../../../configs/configs"
import getCookie from "../../../Cookie/getCookie";
import Modal2 from "../Modal3/Modal3";
import avt from "../../../assets/images/avt.png";
const NftCard3 = (props) => {
  const { title, token_id, price, creator_id_id, image, owner_id_id } = props.item;
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [buyed,setBuyed] = useState(false);
  let server = configs();
  let stylebuy = '';
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

  function findArrayElementByTitle(array, token_id) {
    return array.find((element) => {
      return element.token_id === token_id;
    })
  }

  const [showFollow, setShowFollow] = useState(false)
  useEffect(() => {
    fetch(server + '/follow/' + getCookie("user_id"), {
      method: "GET",
      header:
      {
        "Content-Type": "application/json"
      },
    })
      .then(resp => resp.json()).then(resp => { setShowFollow(findArrayElementByTitle(resp.data, token_id) ? true : false) }).then(error => console.log(error));

  }, []);

  function handleFollow() {
    fetch(server + '/follow', {
      method: "POST",
      header:
      {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: getCookie("user_id"),
        nft_id: token_id
      })
    })
      .then(resp => resp.json())
      .then(resp => console.log("res <<< ", resp))
      .then(error => console.log(error));
    setShowFollow(true)
    console.log("follow success")
  }


  function handleUnfollow() {
    fetch(server + '/unfollow', {
      method: "DELETE",
      header:
      {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: getCookie("user_id"),
        nft_id: token_id
      })
    })
      .then(resp => resp.json())
      .then(resp => console.log("res <<< ", resp))
      .then(error => console.log(error));
    setShowFollow(false)
    console.log("unfollow success")
  }

  return (
    <>
      <div className= {buyed === true ? 'style-buyed' : 'nft__fl'} >
        {
          showFollow ?
            <span onClick={() => handleUnfollow()} className='fl'  >

              <i className="fas fa-heart fa-lg"></i>
            </span>
            :
            <span onClick={() => handleFollow()} className="unfl">
              <i className="fas fa-heart fa-lg"></i>
            </span>
        }
      </div>
      <div className= {buyed === true ? 'style-buyed' : 'single__nft__card'}>
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
                <h6>Owner By</h6>
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
              <i class="ri-shopping-bag-line"></i> Buy
            </button>

            {showModal && <Modal2 setShowModal={setShowModal} infor={props} setBuyed={setBuyed}/>}

            <span className="history__link">
              <Link to="#">View History</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NftCard3;
