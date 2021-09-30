import React, { useState } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import SbHome from "../views/d_sboss/SbHome";
import SbUsers from "../views/d_sboss/user/SbUsers";
import SbUserInfo from "../views/d_sboss/user/SbUserInfo";
import NotFound from "../views/a_global/NotFound";

export default function ShopBossRouter() {
  const [homeLink] = useState("/sboss/home");
  let hist = useHistory();

  return (
    <Switch>
      <Route exact path={homeLink} component={SbHome} />

      <Route exact path={homeLink + "/users/"}>
        <SbUsers homeLink={homeLink} />
      </Route>
      <Route exact path={homeLink + "/users/:_id"}>
        <SbUserInfo homeLink={homeLink} />
      </Route>
      <Route path='*'>
        <NotFound />
      </Route>
      <Redirect exact from='/' to={homeLink} />

      <Route path='/404'>
        <NotFound hist={hist} />
      </Route>

      <Redirect from='*' to='/404' />
    </Switch>
  );
}
