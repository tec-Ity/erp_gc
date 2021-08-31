import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { get_Prom } from "../../a_global/Api";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function UserTable(props) {
  const { newUser, set_LoadingModalShow, homeLink } = props;
  const [Users, setUsers] = useState([]);
  const [UserList, setUserList] = useState();
  const [atBottom, setAtBottom] = useState(false);
  const [isMore, setIsMore] = useState(true)
  const [userRole] = useState({
    1: "拥有者",
    3: "管理者",
    5: "超级员工",
    101: "店铺老板",
    105: "店铺员工",
  });

  const { urlQuery, setUrlQuery, backPage, setBackPage } = props;

  useEffect(() => {
    const getUserList = async () => {
      try {

        set_LoadingModalShow(true);
        const obj = { ...urlQuery };
        let query = "?";
        for (const key in obj) {
          query += "&" + key + "=" + obj[key];
        }
        if (backPage !== urlQuery.page) {
          const result = await get_Prom("/Users".concat(query));
          // console.log(result);
          if (result.status === 200) {
            // set_LoadingModalShow(false);
            if (backPage === 0) {
              setUsers([]);
            }
            const users = result.data?.objects;
            if (
              backPage === urlQuery.page - 1 &&
              users.length !== 0 &&
              result.data.count > backPage * urlQuery.pagesize
            ) {
              setBackPage(result.data.page);
              setUsers((prevUsers) => [...prevUsers, ...users]);
            } else if (urlQuery?.page === 1) {
              setUsers(users);
            }
          } else if (result.status === 400) {
            alert(result.message + " ，请后退重试");
          }
        }
        console.log(query)
        set_LoadingModalShow(false);
      } catch {
        set_LoadingModalShow(false);
        alert('读取失败，请重试')
        // setUsers(null);
      }
    };

    getUserList();
  }, [newUser, set_LoadingModalShow, urlQuery, setBackPage, backPage]);

  useEffect(() => {
    const handleScroll = (e) => {
      const element = document.getElementById("userTable");
      if (isBottom(element)) {
        if (!atBottom) {
          setAtBottom(true);
          setUrlQuery((prevQuery) => ({
            ...prevQuery,
            page: backPage + 1,
          }));
        }
      } else {
        setAtBottom(false);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [atBottom, backPage]);

  useEffect(() => {
    let userList;
    userList = (
      <tbody>
        {Users?.map((user, index) => (
          <tr key={user._id}>
            <td>{index + 1}</td>
            <td>{user.code}</td>
            <td>{user.nome}</td>
            <td>{userRole[user.role]}</td>
            <td>
              + {user.phonePre.slice(2, 4)} {user.phone}
            </td>
            <td>
              {localStorage.getItem("role_curUser") < user.role && (
                <Link to={homeLink + "/users/" + user._id}>
                  <Button variant='success'>管理</Button>
                </Link>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    );
    setUserList(userList);
  }, [Users, homeLink, userRole]);

  const isBottom = (element) => {
    return element.getBoundingClientRect().bottom <= window.innerHeight;
  };

  return (
    <div className='container' id='userTable'>
      <Table striped hover className='example'>
        <thead>
          <tr>
            <th width='10%'>序号</th>
            <th width='18%'>编号</th>
            <th width='18%'>姓名</th>
            <th width='18%'>职位</th>
            <th width='18%'>手机号</th>
            <th width='18%'>管理员工</th>
          </tr>
        </thead>
        {Users !== null && UserList}
      </Table>
    </div>
  );
}
