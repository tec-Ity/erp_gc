import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { get_Prom, get_DNS } from "../../a_global/Api";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PdList(props) {
  const { newPd, homeLink, set_LoadingModalShow, crShop, syncProd, SyncProd } =
    props;
  const [Pds, setPds] = useState(null);
  const [PdList, setPdList] = useState();

  useEffect(() => {
    const popObj = [
      {
        path: "Categ",
        select: "code Categ_far",
        populate: [{ path: "Categ_far", select: "code" }],
      },
    ];
    console.log("loading");
    const getPdList = async () => {
      try {
        const resultPds = await get_Prom(
          "/Pds?populateObjs=" + JSON.stringify(popObj)
        );
        const pds = resultPds.data?.objects;
        console.log(pds);
        setPds(pds);
      } catch {
        // setPds(null);
      }
    };
    getPdList();
  }, [newPd]);

  useEffect(() => {
    if (Pds !== null) {
      set_LoadingModalShow(false);
    } else {
      set_LoadingModalShow(true);
    }
  }, [set_LoadingModalShow, Pds]);

  useEffect(() => {
    console.log("listing");
    const isSynced = (Prods) => {
      for (let i = 0; i < Prods.length; i++) {
        if (Prods[i].Shop === crShop) {
          return true;
        }
      }
      return false;
    };
    let pdList;
    if (Pds !== null) {
      set_LoadingModalShow(false);
    } else {
      set_LoadingModalShow(true);
    }
    if (Pds === null) {
    } else {
      pdList = (
        <tbody>
          {Pds?.map((pd, index) => (
            <tr key={pd._id}>
              <td className=' align-middle'>{index + 1}</td>
              <td className=' align-middle'>
                {pd.img_urls.length > 0 ? (
                  <img
                    width='50px'
                    height='50px'
                    style={{ objectFit: "scale-down" }}
                    src={get_DNS() + pd.img_urls[0]}
                    alt={pd.code}
                  />
                ) : (
                  <img
                    width='50px'
                    src={process.env.PUBLIC_URL + "/Pd_default.png"}
                    alt={pd._id}
                  />
                )}
              </td>
              <td className=' align-middle' title={pd.code_bar}>
                {pd.nome}
              </td>
                {console.log('pd',pd)}
              <td className=' align-middle'>{pd.Categ?.Categ_far.code}</td>
              <td className=' align-middle'>{pd.Categ?.code}</td>
              <td className=' align-middle'>{pd.price_regular}</td>
              <td className=' align-middle'>{pd.unit}</td>
              <td className=' align-middle'>{pd.Brand?.code}</td>
              <td className=' align-middle'>{pd.Nation.code}</td>
              <td className=' align-middle'>{pd.sort}</td>
              <td className=' align-middle'>
                {syncProd === true ? (
                  isSynced(pd.Prods) ? (
                    <Button variant='secondary' disabled>
                      已同步
                    </Button>
                  ) : (
                    <Button variant='success' value={pd._id} onClick={SyncProd}>
                      同步
                    </Button>
                  )
                ) : (
                  localStorage.getItem("role_curUser") < 100 && (
                    <Link to={homeLink + "/pds/" + pd._id}>
                      <Button variant='success'>管理</Button>
                    </Link>
                  )
                )}
              </td>
            </tr>
          ))}
        </tbody>
      );
    }
    setPdList(pdList);
  }, [Pds, SyncProd, crShop, homeLink, set_LoadingModalShow, syncProd]);

  return (
    <div className='container'>
      <Table striped hover className='text-center'>
        <thead>
          <tr>
            <th>序号</th>
            <th>图片</th>
            <th title='条形码'>产品名</th>
            <th>一级分类</th>
            <th>二级分类</th>
            <th>默认价格</th>
            <th>单位</th>
            <th>品牌</th>
            <th>国家</th>
            <th>优先级</th>

            <th>查看更多</th>
          </tr>
        </thead>
        {Pds !== null ? (
          PdList
        ) : (
          <tbody>
            <tr>
              <td colSpan='6'>
                {/*<Spinner animation="border" variant="primary" />
								{"   "}加载中。。。*/}
              </td>
            </tr>
          </tbody>
        )}
      </Table>
    </div>
  );
}
