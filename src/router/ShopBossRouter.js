import React, { useState } from "react";
import { Route, Switch,   Redirect } from "react-router-dom";
import SbHome from "../views/d_sboss/SbHome";
// import SbShops from "../views/d_sboss/shop/SbShops";
// import SbShopInfo from "../views/d_sboss/shop/SbShopInfo";
import SbUsers from "../views/d_sboss/user/SbUsers";
import SbUserInfo from "../views/d_sboss/user/SbUserInfo";

export default function ShopBossRouter() {
	const [homeLink] = useState("/sboss/home");
	console.log("ShopBossRouter");

	return (
		<Switch>
			<Route exact path={homeLink} component={SbHome} />

			<Route exact path={homeLink + "/users/"}>
				<SbUsers homeLink={homeLink} />
			</Route>
			<Route exact path={homeLink + "/users/:_id"}>
				<SbUserInfo />
			</Route>

			<Redirect to={homeLink}/>
		</Switch>
	);
}
