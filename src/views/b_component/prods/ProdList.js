import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { get_Prom, get_DNS } from "../../a_global/Api";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProdList(props) {
  const {query} = props
  const [Prods, setProds] = useState(null);
  const [ProdList, setProdList] = useState();
  const {set_LoadingModalShow} = props

  useEffect(() => {
    const getProdList = async () => {
      try {
        const result = query?await get_Prom('/prods?' + query):await get_Prom("/Prods");
        const prods = result.data?.objects;
        setProds(prods);
      } catch {
        // setProds(null);
      }
    };
    getProdList();
  }, []);

  useEffect(() => {
    if (Prods !== null) {
      set_LoadingModalShow(false);
    } else {
      set_LoadingModalShow(true);
    }
  }, [set_LoadingModalShow, Prods]);

  useEffect(() => {
    let prodList;
    if (Prods !== null) {
      props.set_LoadingModalShow(false);
    } else {
      props.set_LoadingModalShow(true);
    }
    if (Prods === null) {
    } else {
      prodList = (
        <tbody>
          {Prods?.map((prod, index) => (
            <tr key={prod._id}>
              <td className=' align-middle'>{index + 1}</td>
              <td className=' align-middle'>
                {prod.img_urls.length > 0 ? (
                  <img
                    width='50px'
                    height='50px'
                    style={{objectFit:'scale-down'}}
                    src={get_DNS() + prod.img_urls[0]}
                    alt={prod.code}
                  />
                ) : (
                  <img
                    width='50px'
                    src={process.env.PUBLIC_URL + "/Pd_default.png"}
                    alt={prod._id}
                  />
                )}
              </td>
              <td className=' align-middle' title={prod.code_bar}>
                {prod.nome}
              </td>
              <td className=' align-middle'>
                {prod.price_min === prod.price_max
                  ? prod.price
                  : prod.price_min + " - " + prod.price_max}
              </td>
              {/* <td className=' align-middle'>{prod.unit}</td>
              <td className=' align-middle'>{prod.Brand?.code}</td>
              <td className=' align-middle'>{prod.Nation.code}</td> */}
              <td className=' align-middle'>
                {prod.is_discount ? "是" : "否"}
              </td>
              <td className=' align-middle'>{prod.is_sell ? "是" : "否"}</td>
              <td className=' align-middle'>{prod.is_alert ? "是" : "否"}</td>
              <td className=' align-middle'>{prod.is_simple ? "是" : "否"}</td>
              <td className=' align-middle'>{prod.sort}</td>
              <td className=' align-middle'>
                <Link to={props.homeLink + "/prods/" + prod._id}>
                  <Button variant='success'>管理</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      );
    }
    setProdList(prodList);
  }, [Prods, props]);

  return (
    <div className='container'>
      <Table striped hover className='text-center'>
        <thead>
          <tr>
            <th>序号</th>
            <th>图片</th>
            <th title='条形码'>产品名</th>
            <th>价格</th>
            {/* <th>单位</th>
            <th>品牌</th>
            <th>国家</th> */}
            <th>是否折扣</th>
            <th>是否售卖</th>
            <th>库存警告</th>
            <th>单一属性</th>
            <th>优先级</th>

            <th>查看更多</th>
          </tr>
        </thead>
        {Prods !== null && ProdList}
      </Table>
    </div>
  );
}
