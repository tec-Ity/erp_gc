import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MgHome from "../views/d_manager/MgHome";
import MgShops from "../views/d_manager/shop/MgShops";
import MgShopInfo from "../views/d_manager/shop/MgShopInfo";
import MgUsers from "../views/d_manager/user/MgUsers";
import MgUserInfo from "../views/d_manager/user/MgUserInfo";

export default function ManagerRouter() {
	const [homeLink] = useState("/manager/home");
	console.log("ManagerRouter");

	return (
		<Switch>
			<Route exact path={homeLink} component={MgHome} />

			<Route exact path={homeLink + "/shops/"}>
				<MgShops homeLink={homeLink} />
			</Route>
			<Route exact path={homeLink + "/shops/:_id"}>
				<MgShopInfo />
			</Route>

			<Route exact path={homeLink + "/users/"}>
				<MgUsers homeLink={homeLink} />
			</Route>
			<Route exact path={homeLink + "/users/:_id"}>
				<MgUserInfo />
			</Route>

			<Redirect to={homeLink}/>
		</Switch>
	);
}
