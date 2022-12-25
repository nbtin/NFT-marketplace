import React, { useState, useEffect } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";


import { Container, Row, Col } from "reactstrap";

import "../styles/market.css";

import { handleGetMarketAPI } from "../servies/handleGetMarketAPI";

import NftCard3 from "../components/ui/Nft-card3/NftCard3";
import Header from "../components/Header/Header";

const Market = () => {
  const [data, setData] = useState([]);
  const [dataAll, setDataAll] = useState([]);
  const handleCategory = () => {};

  const handleItems = () => {};

  // ====== SORTING DATA BY HIGH, MID, LOW RATE =========
  const handleSort = (e) => {
    const filterValue = e.target.value;

    if (filterValue === "high") {
      const filterData = dataAll.filter((item) => item.currentBid >= 6);

      setData(filterData);
    }

    if (filterValue === "mid") {
      const filterData = dataAll.filter(
        (item) => item.currentBid >= 5.5 && item.currentBid < 6
      );

      setData(filterData);
    }

    if (filterValue === "low") {
      const filterData = dataAll.filter(
        (item) => item.currentBid >= 4.89 && item.currentBid < 5.5
      );

      setData(filterData);
    }
  };

  async function handleMarket() {
    const market = await handleGetMarketAPI();
    setDataAll(market.data);
    setData(market.data);
    console.log(market.data);

}

  useEffect(() => {
      handleMarket();
  },[])

  return (
    <>
    <Header />
      <CommonSection title={"MarketPlace"} />

      <section>
        <Container>
          <Row>

            {data.map((item) => (
                            <Col lg="3" md="4" sm="6" className="mb-4" key={item.token_id}>
                                <NftCard3 item={item} />
                            </Col>
                        ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Market;
