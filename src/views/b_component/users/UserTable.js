import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { get_Prom } from "../../a_global/Api";
import {  Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function UserTable(props) {
	const{newUser, set_LoadingModalShow, homeLink}=props;
  const [Users, setUsers] = useState(null);
  const [UserList, setUserList] = useState();
  const [userRole] = useState({
    1: "拥有者",
    3: "管理者",
    5: "超级员工",
    101: "店铺老板",
    105: "店铺员工",
  });

  useEffect(() => {
    const getUserList = async () => {
      try {
        const result = await get_Prom("/Users");
        const users = result.data?.objects;
        setUsers(users);
        set_LoadingModalShow(true);
      } catch {
        // setUsers(null);
      }
    };
	getUserList();
  }, [newUser, set_LoadingModalShow]);

  useEffect(() => {
    let userList;
    if (Users !== null) {
     set_LoadingModalShow(false);
    } else {
     set_LoadingModalShow(true);
    }
    if (Users === null) {
    } else {
      userList = (
        <tbody>
          {Users?.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.nome}</td>
              <td>{user.code}</td>
              <td>{userRole[user.role]}</td>
              <td>
                + {user.phonePre.slice(2, 4)} {user.phone}
              </td>
              <td>
                {localStorage.getItem("role_crUser") < user.role && (
                  <Link to={homeLink + "/users/" + user._id}>
                    <Button variant='success'>管理</Button>
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      );
    }
    setUserList(userList);
  }, [Users, set_LoadingModalShow, homeLink, userRole]);

  return (
    <div className='container'>

      
      <Table striped hover>
        <thead>
          <tr>
            <th>序号</th>
            <th>姓名</th>
            <th>编号</th>
            <th>职位</th>
            <th>手机号</th>
            <th>管理员工</th>
          </tr>
        </thead>
        {Users !== null && UserList}
      </Table>
    </div>
  );
}
