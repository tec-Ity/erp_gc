import React, { useState, useRef } from "react";
import { Form, Col, Button, Card } from "react-bootstrap";
import { axios_Prom, get_DNS, put_Prom } from "../Api";

export default function InfoImageSection(props) {
  const { _id, infoImage, sectionName, sectionApi, isSingle } = props;

  const [imageURL, set_imageURL] = useState(
    infoImage
      ? isSingle
        ? infoImage[0]
          ? [get_DNS() + infoImage[0]]
          : []
        : infoImage.map((img) => get_DNS() + img)
      : []
  );
  const [prevImageURL, set_prevImageURL] = useState(
    infoImage
      ? isSingle
        ? infoImage[0]
          ? [get_DNS() + infoImage[0]]
          : []
        : infoImage.map((img) => get_DNS() + img)
      : []
  );

  const [imgPath, setImgPath] = useState([]);
  const [prevImgPath, setPrevImgPath] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showModify, setShowModify] = useState(false);

  const addImg = useRef(null);

  const handleModifyImage = (e) => {
    if (e.target.files?.length > 0) {
      const imgs = e.target.files;
      console.log(imgs);
      if (Boolean(isSingle)) {
        set_imageURL([URL.createObjectURL(imgs[0])]);
        setImgPath([imgs[0]]);
      } else {
        for (let i = 0; i < imgs.length; i++) {
          set_imageURL((imageURL) => [
            ...imageURL,
            URL.createObjectURL(imgs[i]),
          ]);
          console.log(imgs[i]);
          setImgPath((imgPath) => [...imgPath, imgs[i]]);
        }
      }
    }
  };

  const handleCancelModify = (e) => {
    e.preventDefault();
    console.log("prev", prevImageURL);
    console.log("cur", imageURL);
    set_imageURL(prevImageURL);
    setImgPath(prevImgPath);
    setShowAdd(false);
    setShowDelete(false);
    setShowModify(false);
  };

  const handleUpdateImageToServer = async (e) => {
    console.log(111);
    e.preventDefault();
    console.log("path", imgPath);
    console.log(prevImgPath);
    if (!imgPath.length > 0 || imgPath === prevImgPath) {
      alert("请选择新图片");
      setShowModify(false);
      setShowAdd(false);
    } else {
      const formData = new FormData();
      console.log(imgPath);
      for (let i = 0; i < imgPath.length; i++) {
        formData.append("image" + i, imgPath[i]);
        console.log(i);
        console.log(formData.get("image" + i));
      }
      const imgResult = await axios_Prom(
        "PUT",
        "/" + sectionApi + "_ImgPost/" + _id,
        formData
      );

      console.log(imgResult);
      if (imgResult.status === 200) {
        setShowAdd(false);
        setShowModify(false);
        // const pd = imgResult.data.object;
        alert("图片修改成功！");

        const imgURLs = isSingle
          ? [get_DNS() + imgResult.data.object.img_url]
          : imgResult.data.object.img_urls.map((img) => {
              return get_DNS() + img;
            });

        const imgPaths = isSingle
          ? [imgResult.data.object.img_url]
          : imgResult.data.object.img_urls;

        console.log("server url", imgURLs);
        console.log("server path", imgPaths);
        setPrevImgPath(imgPaths);
        setImgPath(imgPaths);
        set_prevImageURL(imgURLs);
        set_imageURL(imgURLs);
      } else {
        alert(imgResult.message);
      }
    }
  };

  const handleDeleteImage = (img) => async (e) => {
    try {
      console.log(img);
      const imgURL = img.split(get_DNS())[1];
      console.log(imgURL);
      const delObj = { img_urls: [imgURL] };
      const resultDelete = await put_Prom(
        "/" + sectionApi + "_ImgDelete/" + _id,
        { delObj }
      );

      console.log(resultDelete);
      if (resultDelete.status === 200) {
        console.log("删除成功");
        const imgURLs = isSingle
          ? [get_DNS() + resultDelete.data.object.img_url]
          : resultDelete.data.object.img_urls.map((img) => {
              return get_DNS() + img;
            });

        const imgPaths = isSingle
          ? [resultDelete.data.object.img_url]
          : resultDelete.data.object.img_urls;

        console.log("server url", imgURLs);
        console.log("server path", imgPaths);
        setPrevImgPath(imgPaths);
        setImgPath(imgPaths);
        set_prevImageURL(imgURLs);
        set_imageURL(imgURLs);
      } else {
        alert(resultDelete.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const imagesList = imageURL?.map((img, index) => {
    console.log(img);
    return (
      <Card style={{ width: "100px" }} className='m-2' key={img._id}>
        <Card.Img
          variant='top'
          key={index}
          src={img}
          width='80px'
          height='80px'
          style={{ objectFit: "scale-down" }}
          alt={img._id}
        />
        {showDelete && (
          <Card.Footer>
            <Button variant='danger' onClick={handleDeleteImage(img)}>
              删除
            </Button>
          </Card.Footer>
        )}
      </Card>
    );
  });

  const displayButton = () => {
    if (!isSingle && !showAdd && !showDelete && !showModify) {
      return (
        <div>
          {addButton}
          {deleteButton}
        </div>
      );
    } else if (Boolean(isSingle) && !showAdd && !showDelete && !showModify) {
      return imageURL[0] && imageURL?.length > 0 ? (
        <div>
          {modifyButton}
          {deleteButton}
        </div>
      ) : (
        <div>{addButton}</div>
      );
    }
  };

  const addButton = (
    <Button
      variant='primary'
      className=''
      onClick={() => {
        addImg.current.click();
        setShowAdd(true);
      }}>
      添加图片
    </Button>
  );

  const modifyButton = (
    <Button
      variant='primary'
      className=''
      onClick={() => {
        addImg.current.click();
        setShowModify(true);
      }}>
      更改图片
    </Button>
  );

  const deleteButton = (
    <Button
      variant='danger'
      className='ml-3'
      onClick={() => {
        setShowDelete(true);
      }}>
      删除图片
    </Button>
  );

  return (
    <div>
      <div className='d-flex justify-content-between my-4 '>
        <h1>{sectionName}图片</h1>
        {displayButton()}
      </div>
      <Form onSubmit={handleUpdateImageToServer}>
        <Form.Row>
          <Col>
            <Form.Group>
              <div className='d-flex justify-content-start align-items-center flex-wrap'>
                {imageURL?.length > 0 ? imagesList : <h3>暂无图片</h3>}
              </div>
              <Form.File
                ref={addImg}
                style={{ display: "none" }}
                className='my-4'
                name='file'
                data-browse='选择文件'
                label={`请选择${sectionName}图片`}
                onChange={handleModifyImage}
                multiple={isSingle ? false : true}
                id={sectionName + "img"}
                custom
              />
            </Form.Group>
          </Col>
        </Form.Row>
        {showAdd && (
          <>
            <Button className='mt-3 mr-3' variant='success' type='submit'>
              完成添加
            </Button>
            <Button
              className='mt-3'
              variant='danger'
              onClick={handleCancelModify}>
              取消添加
            </Button>
          </>
        )}
        {showModify && (
          <>
            <Button
              className='mt-3 mr-3'
              variant='success'
              type='submit'>
              完成更改
            </Button>
            <Button
              className='mt-3'
              variant='danger'
              onClick={handleCancelModify}>
              取消更改
            </Button>
          </>
        )}
        {showDelete && (
          <>
            <Button
              className='mt-3 mr-3'
              variant='success'
              onClick={(e) => {
                e.preventDefault();
                setShowDelete(false);
              }}>
              完成删除
            </Button>
            <Button
              className='mt-3'
              variant='danger'
              onClick={handleCancelModify}>
              取消删除
            </Button>
          </>
        )}
      </Form>
    </div>
  );
}
