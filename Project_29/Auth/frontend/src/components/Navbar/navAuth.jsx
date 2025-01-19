/* eslint-disable no-unused-vars */
// NavbarAuth.js

import React from "react";

const NavbarAuth = ({ title = "BookMyResource" }) => {
	return (
		<div className="navbar bg-blue-600 shadow-md p-3.5 fixed top-0 left-0 w-full z-50">
			<a className="btn btn-ghost normal-case text-3xl text-white">{title}</a>
		</div>
	);
};

export default NavbarAuth;
