import React from "react";
import {
  Button
} from "react-bootstrap";
import { Container, Row, Col } from "reactstrap";
import getCookie from "../Cookie/getCookie"
import CommonSection from "../components/ui/Common-section/CommonSection";
import NftCard from "../components/ui/Nft-card/NftCard";
import img from "../assets/images/img-01.jpg";
import avatar from "../assets/images/ava-01.png";
import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import "../styles/create-item.css";
import { useNavigate } from "react-router-dom";
import {configs} from "../configs/configs";
import { toast } from 'react-toastify';

const Create = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  let data;
  let user = '';
  let linkImage = '';
  let server = configs();
  let navigate = useNavigate();
  if(selectedImage != null) linkImage=URL.createObjectURL(selectedImage);
  const item = {
    token_id: "01",
    title: title,
    description: description,
    image: linkImage,
    creator_id_id: getCookie("user_id"),
    price: 0,
    owner_id_id: getCookie("user_id")
  };

  function handleCreate() {
    console.log(data);
    console.log(selectedImage);
    const uploadData = new FormData();
    uploadData.append('title', title);
    uploadData.append('description', description);
    uploadData.append('creatorId', getCookie("user_id"));
    uploadData.append('image', selectedImage);
    fetch(server + '/create', {
      method: "POST",
      header:
      {
        "Content-Type": "multipart/form-data"
      },
      body: uploadData
    })
      .then(resp => resp.json()).then(resp => { user = resp; }).then(error => console.log(error));
    // loadingData();
    console.log("thanh cong create");
    toast.success(`Create success`);
    document.getElementById("texttitle").value = "";
    document.getElementById("textdesc").value = "";
    document.getElementById("imagenft").value = null;
    setSelectedImage(null);
    setTitle('');
  }
  return (
    <>
     <Header />
      <CommonSection title="Create Item" />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="4" sm="6">
              <h5 className="mb-4 text-light">Preview Item</h5>
              <NftCard item={item} />
            </Col>

            <Col lg="9" md="8" sm="6">
              <div className="create__item">
                <form>
                  <div className="form__input">
                    <label htmlFor="">Upload File</label>
                    <input type="file" className="upload__input" id="imagenft"
                      onChange={(event) => {
                        setSelectedImage(event.target.files[0]);
                      }}
                    />
                  </div>


                  <div className="form__input">
                    <label htmlFor="">Title</label>
                    <input
                      type="text"
                      id="texttitle"
                      placeholder="Enter title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Description</label>
                    <textarea
                      name=""
                      id="textdesc"
                      rows="7"
                      placeholder="Enter description"
                      className="w-100"
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className = "div-center">
                  <Button className="button-log"
                    type="button"
                    value={description}
                    onClick={() => handleCreate()}
                  >
                    Create
                  </Button>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Create;
