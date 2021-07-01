import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { delete_Prom } from "../../../a_global/Api";

export default function ProdInfoTitle(props) {
  return (
    <div className='d-flex justify-content-between my-4'>
      <h1>商品信息</h1>
      <div>
        {props.isDisabled === true && (
          <div>
            <Button
              variant='warning'
              className=''
              onClick={() => {
                props.setIsDisabled(false);
              }}>
              修改信息
            </Button>

              <Button
                variant='danger'
                className='ml-3'
                onClick={async () => {
                  const result = await delete_Prom("/ProdDelete/" + props._id);
                  if (result.status === 200) {
                    alert("删除成功！");
                    window.location.replace(props.homeLink+'/prods')
                  } else {
                    alert(result.message);
                  }
                }}>
                删除产品
              </Button>
          </div>
        )}
      </div>
    </div>
  );
}
