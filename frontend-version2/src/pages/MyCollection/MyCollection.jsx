import React, { useState, useRef, useEffect } from "react";
import "./MyCollection.css"
import CommonSection from "../../components/ui/Common-section/CommonSection";
import Header from "../../components/Header/Header"
import getCookie from "../../Cookie/getCookie"
import { Container, Row, Col } from "reactstrap";
import NftCard2 from "../../components/ui/Nft-card2/NftCard2";
import { handleGetNftUserAPI } from "../../servies/handleGetNftUserAPI"
const MyCollection = () => {
    const [dataNft, setDataNft] = useState([]);
    async function handleMyCollection() {
        const data = await handleGetNftUserAPI();
        setDataNft(data.data);

    }
    useEffect(() => {
        handleMyCollection()
        console.log("haha");
    }, []);
    return (
        <>
            <Header />
            <CommonSection title={"My Collection"} />
            <section>
                <Container>
                    <Row>
                        {console.log(dataNft)}
                        {dataNft.map((item) => (
                            <Col lg="3" md="4" sm="6" className="mb-4">
                                <NftCard2 item={item} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default MyCollection;
