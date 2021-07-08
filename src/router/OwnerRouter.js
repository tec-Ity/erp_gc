import React, { useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import NotFound from "../views/a_global/NotFound";
import OwHome from "../views/d_owner/OwHome";
import MgShops from "../views/d_manager/shop/MgShops";
import MgShopInfo from "../views/d_manager/shop/MgShopInfo";
import MgUsers from "../views/d_manager/user/MgUsers";
import MgUserInfo from "../views/d_manager/user/MgUserInfo";

export default function OwnerRouter() {
  const [homeLink] = useState("/owner/home");
  console.log("OwnerRouter");
  let hist = useHistory();
  return (
    <Switch>
      <Route exact path={homeLink} component={OwHome} />

      {/* shop */}
      <Route exact path={homeLink + "/shops/"}>
        <MgShops homeLink={homeLink} />
      </Route>
      <Route exact path={homeLink + "/shops/:_id"}>
        <MgShopInfo homeLink={homeLink} />
      </Route>

      {/* user */}
      <Route exact path={homeLink + "/users/"}>
        <MgUsers homeLink={homeLink} />
      </Route>
      <Route exact path={homeLink + "/users/:_id"}>
        <MgUserInfo homeLink={homeLink} />
      </Route>




      <Redirect exact from='/' to={homeLink} />

      <Route path='/404'>
        <NotFound hist={hist} />
      </Route>

      <Redirect from='*' to='/404' />
    </Switch>
  );
}
