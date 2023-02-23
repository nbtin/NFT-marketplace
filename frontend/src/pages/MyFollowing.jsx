import React, { useState, useRef, useEffect } from "react";
import CommonSection from "../components/ui/Common-section/CommonSection";
import Header from "../components/Header/Header"
import getCookie from "../Cookie/getCookie"
import { Container, Row, Col } from "reactstrap";

import NftCard3 from "../components/ui/Nft-card3/NftCard3";
import { handlGetFollowing } from "../servies/handleGetFollowing";
const MyFollowing = () => {
    const [dataNft, setDataNft] = useState([]);
    async function handleMyFollowing() {
        const data = await handlGetFollowing();
        setDataNft(data.data);

    }
    useEffect(() => {
        if(getCookie("logged") =="1"){
            handleMyFollowing();
        }
        else{
            
        }
        
    }, []);
    return (
        <>
            <Header />
            <CommonSection title={"My Following"} />
            <section>
                <Container>
                    <Row>
                        {console.log(dataNft)}
                        {dataNft.map((item) => (
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

export default MyFollowing;
