import React, { useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import SwHome from "../views/d_sworker/SwHome";
import SwProds from "../views/d_sworker/prod/SwProds";
import SwProdAdd from "../views/d_sworker/prod/SwProdAdd";
import SwProdInfo from "../views/d_sworker/prod/SwProdInfo";
import NotFound from "../views/a_global/NotFound";

export default function ShopWorkerRouter() {
  const [homeLink] = useState("/sworker/home");
  console.log("ShopWorkerRouter");
  let hist = useHistory();
  return (
    <Switch>
      <Route exact path={homeLink}>
        <SwHome homeLink={homeLink} />
      </Route>
      <Route exact path={homeLink + "/prods"}>
        <SwProds homeLink={homeLink} />
      </Route>
      <Route exact path={homeLink + "/prodAdd"}>
        <SwProdAdd homeLink={homeLink} />
      </Route>
      <Route exact path={homeLink + "/prods/:_id"}>
        <SwProdInfo homeLink={homeLink} />
      </Route>
      <Redirect exact from='/' to={homeLink} />

      <Route path='/404'>
        <NotFound hist={hist} />
      </Route>

      <Redirect from='*' to='/404' />
    </Switch>
  );
}
