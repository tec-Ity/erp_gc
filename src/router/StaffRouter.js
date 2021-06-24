import React, { useState } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import TestPage from "../views/a_global/TestPage";
import SfHome from "../views/d_staff/SfHome";
import SfProducts from "../views/d_staff/product/SfProducts";
import SfProductInfo from "../views/d_staff/product/SfProductInfo";
import SfBrands from "../views/d_staff/brand/SfBrands";
import SfBrandInfo from "../views/d_staff/brand/SfBrandInfo";
import SfCategs from '../views/d_staff/categ/SfCategs'
// import SfUsers from "../views/d_staff/user/SfUsers"
// import SfUserInfo from "../views/d_staff/user/SfUserInfo"

export default function StaffRouter(props) {
	const [homeLink] = useState("/staff/home");
	console.log("StaffRouter");
	return (
		<Switch>
			<Route exact path="/staff/home/">
				<SfHome homeLink={homeLink} />
			</Route>

			<Route exact path="/staff/home/products">
				<SfProducts homeLink={homeLink} />
			</Route>
			<Route exact path="/staff/home/products/:_id">
				<SfProductInfo homeLink={homeLink} />
			</Route>

			<Route exact path="/staff/home/brands">
				<SfBrands homeLink={homeLink} />
			</Route>
			<Route exact path="/staff/home/brands/:_id">
				<SfBrandInfo homeLink={homeLink} />
			</Route>

			<Route exact path="/staff/home/categs">
				<SfCategs homeLink={homeLink} />
			</Route>

			<Route exact path="/test" component={TestPage} />

			<Redirect to={homeLink} />
		</Switch>
	);
}
