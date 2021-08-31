import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { get_Prom } from "../../a_global/Api";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import TableHeadSort from "../../a_global/filter/TableHeadSort";

export default function UserTable(props) {
  const { urlQuery, setUrlQuery, backPage, setBackPage } = props;
  const { newUser, set_LoadingModalShow, homeLink } = props;
  const [Users, setUsers] = useState([]);
  const [UserList, setUserList] = useState();
  const [atBottom, setAtBottom] = useState(false);
  const [isMore, setIsMore] = useState(true);
  const [userRole] = useState({
    1: "拥有者",
    3: "管理者",
    5: "超级员工",
    101: "店铺老板",
    105: "店铺员工",
  });

  const [userTableHeader] = useState([
    {
      title: "序号",
      value: "",
      width: "10%",
    },
    {
      title: "编号",
      value: "code",
      width: "18%",
    },
    {
      title: "姓名",
      value: "nome",
      width: "18%",
    },
    {
      title: "职位",
      value: "role",
      width: "18%",
    },
    {
      title: "手机号",
      value: "phone",
      width: "18%",
    },
    {
      title: "管理员工",
      value: "",
      width: "18%",
    },
  ]);

  useEffect(() => {
    const getUserList = async () => {
      try {
        if (backPage !== urlQuery.page) {
          set_LoadingModalShow(true);
          const obj = { ...urlQuery };
          let query = "?";
          for (const key in obj) {
            query += "&" + key + "=" + obj[key];
          }
          const result = await get_Prom("/Users".concat(query));
          if (result.status === 200) {
            // set_LoadingModalShow(false);
            if (backPage === 0) {
              setUsers([]);
              setIsMore(true);
            }
            const users = result.data?.objects;
            setIsMore(result.data.count > backPage * urlQuery.pagesize);
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
        set_LoadingModalShow(false);
      } catch {
        set_LoadingModalShow(false);
        alert("读取失败，请重试");
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
    isMore === true && document.addEventListener("scroll", handleScroll);
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

  const handleSortUser = (sortKey, sortVal) => {
    setUrlQuery((prevQuery) => ({
      ...prevQuery,
      sortKey,
      sortVal,
    }));
  };

  return (
    <div className='container' id='userTable'>
      <Table striped hover className='example'>
        <TableHeadSort
          tableHeaderObj={userTableHeader}
          handleSort={handleSortUser}
          restart = {urlQuery.sortKey===""?true:false}
        />
        {Users !== null && UserList}
      </Table>
    </div>
  );
}
