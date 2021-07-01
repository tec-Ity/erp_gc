import React  from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function NavTop(props) {
	// //create your forceUpdate hook
	// const useForceUpdate = ()=> {
	// 	const [value, setValue] = useState(0); // integer state
	// 	return () => setValue((value) => value + 1); // update the state to force render
	// }

	const name = localStorage.getItem("name_crUser");
	const message = name ? `Hello, ${name}!` : "Please Log in";
	const bar = (
		<nav className="navbar navbar-light bg-light">
			<Link to="/" className="navbar-brand">
				<img src={props.icon_img} alt={name} />
				<h3 className="ml-3 d-inline-block ">TEC</h3>
			</Link>

			{/*				<Link to="/payment">
					<button className="btn btn-secondary">付款</button>
				</Link>**/}

{/*			<Link to="/test">
				<button className="btn btn-warning">test page</button>
			</Link>*/}

			<div>
				<span className="mr-3">{message}</span>

				{name ? (
					<Link to="/">
						<Button
							variant="secondary"
							className="loginButton"
							onClick={() => {
								props.handleLogout();
								// props.useForceUpdate();
							}}
						>
							登出
						</Button>
					</Link>
				) : (
					<Link to="/">
						<Button className="loginButton">登录</Button>
					</Link>
				)}
			</div>
		</nav>
	);
	return bar;
}
