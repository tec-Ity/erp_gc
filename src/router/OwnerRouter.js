import React, { useState } from "react";
import { Route, Switch,   Redirect } from "react-router-dom";
import OwHome from "../views/d_owner/OwHome";
import OwShops from "../views/d_owner/shop/OwShops";
import OwShopInfo from "../views/d_owner/shop/OwShopInfo";
import OwUsers from "../views/d_owner/user/OwUsers";
import OwUserInfo from "../views/d_owner/user/OwUserInfo";

export default function OwnerRouter() {
	const [homeLink] = useState("/owner/home");
	console.log("OwnerRouter");

	return (
		<Switch>
			<Route exact path={homeLink} component={OwHome} />

			<Route exact path={homeLink + "/shops/"}>
				<OwShops homeLink={homeLink} />
			</Route>
			<Route exact path={homeLink + "/shops/:_id"}>
				<OwShopInfo />
			</Route>

			<Route exact path={homeLink + "/users/"}>
				<OwUsers homeLink={homeLink} />
			</Route>
			<Route exact path={homeLink + "/users/:_id"}>
				<OwUserInfo />
			</Route>

			<Redirect to={homeLink}/>
		</Switch>
	);
}
