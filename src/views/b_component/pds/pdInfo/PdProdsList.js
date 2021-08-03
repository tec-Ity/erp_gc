import React from "react";
import { get_DNS } from "../../../a_global/Api";
import { Table } from "react-bootstrap";

export default function PdProdsList(props) {
  const { prods } = props;

  const prodsList = prods.map((prod, index) => {
    return (
      <tr key={prod._id}>
        <td>{index}</td>
        <td>
          <div>
            {prod.Shop.code}
            <img scr={get_DNS() + prod.Shop.img_url} alt={prod.Shop._id} />
          </div>
        </td>
        <td>{prod.price}</td>
      </tr>
    );
  });

  return (
    <Table>
      <thead>
        <tr>
          <th>序号</th>
          <th>所属商店</th>
          <th>商品价格</th>
        </tr>
      </thead>
      <tbody>{prodsList}</tbody>
    </Table>
  );
}
