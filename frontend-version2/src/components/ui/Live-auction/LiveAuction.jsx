import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import NftCard3 from "../Nft-card3/NftCard3";
import { NFT__DATA } from "../../../assets/data/data.js";
import { handleGetMarketAPI } from "../../../servies/handleGetMarketAPI";
import "./live-auction.css";

const LiveAuction = () => {
  const [dataNft, setDataNft] = useState([]);
  async function handleMyCollection() {
    let data = await handleGetMarketAPI();
    let datatemp = [];
    const length = data.data.length < 4 ? data.data.length : 4;
    for(let i = 0; i < length; i++) {
      datatemp.push(data.data[i])
    }
    setDataNft(datatemp);
  }
  useEffect(() => {
    handleMyCollection()
    console.log("haha");
  }, []);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="live__auction__top d-flex align-items-center justify-content-between ">
              <h3>Market</h3>
              <span>
                <Link to="/market">Explore more</Link>
              </span>
            </div>
          </Col>

          {console.log(dataNft)}
          {       
          dataNft.map((item) => (
            <Col lg="3" md="4" sm="6" className="mb-4" key={item.token_id}>
              <NftCard3 item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default LiveAuction;
