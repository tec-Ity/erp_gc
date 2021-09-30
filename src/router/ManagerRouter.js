import React, { useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import MgHome from "../views/d_manager/MgHome";
import MgShops from "../views/d_manager/shop/MgShops";
import MgShopInfo from "../views/d_manager/shop/MgShopInfo";
import NotFound from "../views/a_global/NotFound";
import SbUserInfo from "../views/d_sboss/user/SbUserInfo";
import SbUsers from "../views/d_sboss/user/SbUsers";

export default function ManagerRouter() {
  const [homeLink] = useState("/manager/home");
  let hist = useHistory();

  return (
    <Switch>
      <Route exact path={homeLink}>
        <MgHome homeLink={homeLink} />
      </Route>

      <Route exact path={homeLink + "/shops/"}>
        <MgShops homeLink={homeLink} />
      </Route>
      <Route exact path={homeLink + "/shops/:_id"}>
        <MgShopInfo homeLink={homeLink} />
      </Route>

      <Route exact path={homeLink + "/users/"}>
        <SbUsers homeLink={homeLink} />
      </Route>
      <Route exact path={homeLink + "/users/:_id"}>
        <SbUserInfo homeLink={homeLink} />
      </Route>

      <Redirect exact from='/' to={homeLink} />

      <Route path='/404'>
        <NotFound hist={hist} />
      </Route>

      <Redirect from='*' to='/404' />
    </Switch>
  );
}
