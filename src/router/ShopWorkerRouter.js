import React, { useState } from "react";
import { Route, Switch,  Redirect } from "react-router-dom";
import SwHome from "../views/d_sworker/SwHome";
import SwProds from "../views/d_sworker/prod/SwProds";
import SwProdAdd from "../views/d_sworker/prod/SwProdAdd";
import SwProdInfo from "../views/d_sworker/prod/SwProdInfo";

export default function ShopWorkerRouter(props) {
	const [homeLink] = useState("/sworker/home");
	console.log("ShopWorkerRouter");
	return (
		<Switch>
			<Route exact path={homeLink}>
				<SwHome homeLink={homeLink} />
			</Route>
			<Route exact path={homeLink + '/prods'}>
				<SwProds homeLink={homeLink} />
			</Route>
			<Route exact path={homeLink + '/prods/prodAdd'}>
				<SwProdAdd homeLink={homeLink} />
			</Route>
			<Route exact path={homeLink + '/prods/:_id'}>
				<SwProdInfo homeLink={homeLink} />
			</Route>


			<Redirect to={homeLink} />
		</Switch>
	);
}
