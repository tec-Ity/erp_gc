import React from "react";
import { Form, Col } from "react-bootstrap";

export default function AddImage(props) {
  const { sectionName, image, handleImage, isSingle } = props;
  return (
    <Form.Row>
      <Col>
        <Form.Group>
          <Form.Label>{sectionName}图片</Form.Label>
          <div className='d-flex justify-content-start align-items-center flex-wrap'>
            {image.length > 0 &&
              image?.map((img, index) => {
                console.log(img)
                return (
                  <img
                    key={index}
                    className=' m-2 d-block'
                    src={img}
                    width='10%'
                    height='100%'
                    alt='产品图片'
                  />
                );
              })}
          </div>
          <Form.File
            required
            name='file'
            data-browse='选择文件'
            label={`请选择${sectionName}图片`}
            onChange={handleImage}
            multiple={isSingle?false:true}
            id={sectionName+'Add'}
            custom
          />
        </Form.Group>
      </Col>
    </Form.Row>
  );
}
