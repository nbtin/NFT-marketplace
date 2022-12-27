import React, { useState, useEffect } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";


import LiveAuction from "../components/ui/Live-auction/LiveAuction";

import "../styles/nft-details.css";


import avt from "../assets/images/avt.png";
import { handleGetAllAPI } from "../servies/handleGetAllAPI";
import Header from "../components/Header/Header"
import { configs } from "../configs/configs";

const NftDetails = () => {
  const { token_id } = useParams();
  const [dataAll, setDataAll] = useState([]);
  const [nameCreator, setNameCreator] = useState('');
  const [nameOwner, setNameOwner] = useState('');
  const singleNft = dataAll.find((item) => item.token_id == token_id);

  let server = configs();

  async function handleAll() {
    const market = await handleGetAllAPI();
    setDataAll(market.data);
    console.log(market.data);

  }
  useEffect(() => {
    handleAll();
  }, [])
  useEffect(() => {
    if (singleNft !== undefined) {
      fetch(server + '/getuser', {
        method: "POST",
        header:
        {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: singleNft.owner_id_id
        })
      })
        .then(resp => resp.json()).then(resp => { setNameOwner(resp.data.username) }).then(error => console.log(error));
      fetch(server + '/getuser', {
        method: "POST",
        header:
        {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: singleNft.creator_id_id
        })
      })
        .then(resp => resp.json()).then(resp => { setNameCreator(resp.data.username) }).then(error => console.log(error));


    }
  }, [singleNft]);

  return (
    <>
      {singleNft === undefined ?
        (<div>Error</div>)
        :
        (<>
          <Header />
          <CommonSection title="NFT detail" />

          <section>
            <Container>
              <Row>
                <Col lg="6" md="6" sm="6">
                  <img
                    src={server + '/' + singleNft.image}
                    alt=""
                    className="w-100 single__nft-img"
                  />
                </Col>

                <Col lg="6" md="6" sm="6">
                  <div className="single__nft__content">
                    <h2>{singleNft.title}</h2>

                    <div className=" d-flex align-items-center justify-content-between mt-4 mb-4">

                      <div className=" d-flex align-items-center gap-2 single__nft-more">
                        <span>
                          <i class="ri-send-plane-line">{'Data created: ' + singleNft.date_created}</i>
                        </span>
                        <span>
                          <i class="ri-more-2-line">{'Chain: ' + singleNft.chain}</i>
                        </span>
                      </div>
                    </div>

                    <div className="nft__creator d-flex gap-3 align-items-center">
                      <div className="creator__img">
                        <img src={avt} alt="" className="w-100" />
                      </div>

                      <div className="creator__detail">
                        <p>Created By</p>
                        <h6>{nameCreator}</h6>
                      </div>
                    </div>

                    <div className="nft__creator d-flex gap-3 align-items-center">
                      <div className="creator__img">
                        <img src={avt} alt="" className="w-100" />
                      </div>

                      <div className="creator__detail">
                        <p>Owner By</p>
                        <h6>{nameOwner}</h6>
                      </div>
                    </div>
                    <div className="form__input">
                    <label htmlFor="">Description</label>
                    <textarea
                      value={singleNft.description}
                      disabled
                      rows="7"
                      className="w-100"
                    ></textarea>
                  </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <LiveAuction />
        </>
        )
      }

    </>
  );
};

export default NftDetails;
