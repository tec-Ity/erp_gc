import React, { useState } from "react";
import { Route, Switch,  Redirect } from "react-router-dom";
import TestPage from "../views/a_global/TestPage";
import SwHome from "../views/d_sworker/SwHome";


export default function ShopWorkerRouter(props) {
	const [homeLink] = useState("/sworker/home");
	console.log("ShopWorkerRouter");
	return (
		<Switch>
			<Route exact path={homeLink}>
				<SwHome homeLink={homeLink} />
			</Route>

			<Route exact path="/test" component={TestPage} />

			<Redirect to={homeLink} />
		</Switch>
	);
}
