import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "../views/c_login/LoginPage";
import NavTop from "../views/a_global/NavTop";
import { fetchPost_Prom, logout_Prom } from "../views/a_global/Api";
import OwnerRouter from "./OwnerRouter";
import ManagerRouter from "./ManagerRouter";
import StaffRouter from "./StaffRouter";
import ShopBossRouter from "./ShopBossRouter";
import ShopWorkerRouter from "./ShopWorkerRouter";

export default function App() {
  const [isValid, set_isValid] = useState();
  const [value, setValue] = useState(0); // integer state
  // //create your forceUpdate hook
  // const useForceUpdate = ()=> {
  // setValue((value) => value + 1); // update the state to force render
  // }

  const handleLogout = async () => {
    // setValue((value) => value + 1);
    const result = await logout_Prom();
    if (result.status === 200) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role_curUser");
      localStorage.removeItem("name_curUser");
      localStorage.removeItem("crShop");
    }
    setValue((value) => value + 1);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const code = e.target[0].value;
    const pwd = e.target[1].value;
    const bodyObj = { code, pwd };
    const result = await fetchPost_Prom("/login", bodyObj);
    if (result.status !== 200) {
      set_isValid(false);
    } else {
      const curUser = result.data?.curUser;
      localStorage.setItem("role_curUser", curUser.role);
      localStorage.setItem("name_curUser", curUser.nome);
      localStorage.setItem("accessToken", result.data?.accessToken);
      localStorage.setItem("refreshToken", result.data?.refreshToken);
      console.log(curUser);
      curUser.Shop && localStorage.setItem("crShop", curUser.Shop);
      setValue((value) => {
        return value + 1;
      });
      set_isValid(true);
    }
  };

  const roleRouter = () => {
    const param = parseInt(localStorage.getItem("role_curUser"));
    switch (param) {
      case 1:
        return <OwnerRouter hLink='/owner/home' />;
      case 3:
        return <ManagerRouter hLink='/manager/home' />;
      case 5:
        return <StaffRouter hLink='/staff/home' />;
      case 101:
        return <ShopBossRouter hLink='/sboss/home' />;
      case 105:
        return <ShopWorkerRouter hLink='/sworker/home' />;
      default:
        return (
          <Switch>
            <Route exact path='/'>
              <LoginPage handleLogin={handleLogin} isValid={isValid} />
            </Route>
            <Redirect from='/' to='/' />
          </Switch>
        );
    }
  };

  let router = localStorage.getItem("accessToken") ? (
    <BrowserRouter>
      <NavTop
        icon_img={process.env.PUBLIC_URL + "/favicon.ico"}
        handleLogout={handleLogout}
      />
      {roleRouter()}
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <NavTop
        icon_img={process.env.PUBLIC_URL + "/favicon.ico"}
        handleLogout={handleLogout}
      />
      <Switch>
        <Route exact path='/'>
          <LoginPage handleLogin={handleLogin} isValid={isValid} />
        </Route>
        <Redirect from='/' to='/' />
      </Switch>
    </BrowserRouter>
  );

  return <div id={value}>{router}</div>;
}
