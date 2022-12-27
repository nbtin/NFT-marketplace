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
    if (filterValue === "all") {

      setData(dataAll);
    }
    if (filterValue === "high") {
      const filterData = dataAll.filter((item) => item.price >= 6);

      setData(filterData);
    }

    if (filterValue === "mid") {
      const filterData = dataAll.filter(
        (item) => item.price >= 5.5 && item.price < 6
      );

      setData(filterData);
    }
    

    if (filterValue === "low") {
      const filterData = dataAll.filter(
        (item) => item.price < 5.5
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
          <Col lg="12" className="mb-5">
              <div className="market__product__filter d-flex align-items-center justify-content-between">
                <div className="filter__left d-flex align-items-center gap-5">
                  <div className="all__category__filter">
                    <select onChange={handleCategory}>
                      <option>All Categories</option>
                      <option value="art">Art</option>
                      <option value="music">Music</option>
                      <option value="domain-name">Domain Name</option>
                      <option value="virtual-world">Virtual World</option>
                      <option value="trending-card">Trending Cards</option>
                    </select>
                  </div>

                  <div className="all__items__filter">
                    <select onChange={handleItems}>
                      <option>All Items</option>
                      <option value="single-item">Single Item</option>
                      <option value="bundle">Bundle</option>
                    </select>
                  </div>
                </div>

                <div className="filter__right">
                  <select onChange={handleSort}>
                    <option>Sort By</option>
                    <option value="all">All Rate</option>
                    <option value="high">High Rate</option>
                    <option value="mid">Mid Rate</option>
                    <option value="low">Low Rate</option>
                  </select>
                </div>
              </div>
            </Col>
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
