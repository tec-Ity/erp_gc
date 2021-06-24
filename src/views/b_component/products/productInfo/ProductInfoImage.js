import React, { useState, useEffect, useRef } from "react";
import { Form, Col, Button, Card } from "react-bootstrap";
import axios from "axios";
import { get_DNS, put_Prom, get_Prom } from "../../../a_global/Api";
export default function ProductInfoImage(props) {
  const [image, set_image] = useState([]);
  const [imgData, setImgData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const addImg = useRef(null);

  useEffect(() => {
    async function func() {
      const result = await get_Prom("/Pd/" + props._id);
      console.log(result.data.object);
      const productImage = result.data.object.img_urls;
      const imgs = productImage?.map((img) => get_DNS() + img);
      console.log(imgs);
      set_image(imgs);
    }
    func();
  }, [props.productImage, props.newImage]);

  const handleImage = (e) => {
    const imgs = e.target.files && e.target.files;
    console.log(imgs);
    for (let i = 0; i < imgs.length; i++) {
      set_image((image) => [...image, URL.createObjectURL(imgs[i])]);
      setImgData((imgData) => [...imgData, imgs[i]]);
    }
  };

  const handleUpdatePdImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(imgData);
    for (let i = 0; i < imgData.length; i++) {
      formData.append("image_" + i, imgData[i]);
      console.log(i);
      console.log(formData.get("image_" + i));
    }
    // formData.append()
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    console.log(props._id);
    const result2 = await axios.put(
      get_DNS() + "/api/v1/PdPut_ImgPost/" + props._id,
      formData,
      {
        headers: {
          "content-type": "application/json",
          authorization: "accessToken " + accessToken,
        },
      }
    );
    
    console.log(result2);
    if (result2.status === 200) {
      setShowAdd(false);
      const pd = result2.data.object;
      props.setNewImage(pd);
      alert("商品信息修改成功！");
    } else {
      alert(result2.message);
    }
  };
  return (
    <div>
      <div className='d-flex justify-content-between my-4 '>
        <h1>产品图片</h1>
        {!showAdd && !showDelete && (
          <div>
            <Button
              variant='primary'
              className=''
              onClick={() => {
                addImg.current.click();
                setShowAdd(true);
              }}>
              添加图片
            </Button>

            <Button
              variant='danger'
              className='ml-3'
              onClick={() => {
                setShowDelete(true);
              }}>
              删除图片
            </Button>
          </div>
        )}
      </div>
      <Form onSubmit={handleUpdatePdImage}>
        <Form.Row>
          <Col>
            <Form.Group>
              <div className='d-flex justify-content-start align-items-center flex-wrap'>
                {image?.length > 0 ? (
                  image?.map((img, index) => {
                    return (
                      <Card
                        style={{ width: "100px" }}
                        className='m-2'
                        key={img._id}>
                        <Card.Img
                          variant='top'
                          key={index}
                          src={img}
                          //   width='50px'
                          // height='100%'
                          alt='产品图片'
                        />
                        {showDelete && (
                          <Card.Body>
                            <Button
                              variant='danger'
                              onClick={async (e) => {
                                e.preventDefault();
                                const result = await put_Prom(
                                  "/PdPut_ImgDelete/" + props._id,
                                  {
                                    del_imgs: {
                                      img_urls: [img.split(get_DNS())[1]],
                                    },
                                  }
                                );
                                if (result.status === 200) {
                                  props.setNewImage(result.data.object);
                                  const i = image?.indexOf(img);
                                  console.log(i);
                                  // console.log(image.splice(i,1))
                                  // set_image(image.splice(i,1))
                                  console.log("删除成功");
                                }
                              }}>
                              删除
                            </Button>
                          </Card.Body>
                        )}
                      </Card>
                    );
                  })
                ) : (
                  <h3>暂无图片</h3>
                )}
              </div>
              <Form.File
                ref={addImg}
                style={{ display: "none" }}
                className='my-4'
                as='file'
                name='file'
                data-browse='选择文件'
                label='请选择产品图片'
                onChange={handleImage}
                multiple
                id='pdLogo'
                custom
              />
            </Form.Group>
          </Col>
        </Form.Row>
        {showAdd && (
          <Button className='mt-3' variant='success' type='submit'>
            完成添加
          </Button>
        )}
        {showDelete && (
          <Button
            className='mt-3'
            variant='success'
            type='submit'
            onClick={() => setShowDelete(false)}>
            完成删除
          </Button>
        )}
      </Form>
    </div>
  );
}
