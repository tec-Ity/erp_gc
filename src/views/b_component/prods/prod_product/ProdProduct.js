import React, { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import ProdProductList from "./ProdProductList";
import ProductModalAdd from "./ProductModalAdd";

export default function ProdProduct(props) {
  const [showAdd, set_showAdd] = useState();
  const [DefaultProduct, setDefaultProduct] = useState();
  const [Products, setProducts] = useState();
  useEffect(() => {
    setDefaultProduct(props.ProdInfo?.Products[0]);
    setProducts(props.ProdInfo?.Products);
  }, [props.ProdInfo]);

  return (
    <div className='container pl-0'>
      <div className='d-flex justify-content-between my-4'>
        <h3>SKU列表</h3>
        <Button variant='success' onClick={() => set_showAdd(true)}>
          增加SKU
        </Button>
        {showAdd === true && (
          <ProductModalAdd
            _id={props._id}
            Attrs={props.ProdInfo?.Attrs}
            Products={Products}
            show={showAdd}
            onHide={() => set_showAdd(false)}
            DefaultProduct={DefaultProduct}
            newSKU={props.newSKU}
            setNewSKU={props.setNewSKU}
          />
        )}
      </div>
      <ProdProductList
        Products={Products}
        Attrs={props.ProdInfo?.Attrs}
        setNewSKU={props.setNewSKU}
      />
    </div>
  );
}
