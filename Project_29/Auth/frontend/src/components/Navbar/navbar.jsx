// Navbar.js

// eslint-disable-next-line no-unused-vars
import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"; // To navigate after logout

const Navbar = () => {
  const { authUser, setAuthUser } = useAuthContext(); // Get authUser and setAuthUser from context
  const navigate = useNavigate(); // React Router navigation hook

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem("user");
    setAuthUser(null); // Clear authUser context
    navigate("/login"); // Redirect to login page
  };

  const profilePic =
    authUser?.profilePic ||
    "https://s.yimg.com/fz/api/res/1.2/J4TevxamjPFZU8KwMxk1VA--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD05Njt3PTk2/https://tse1.mm.bing.net/th?q=Dummy+Profile+PNG&pid=Api&mkt=en-US&cc=US&setlang=en&adlt=strict&t=1"; // Fallback to default

  return (
    <div className="navbar bg-blue-600 shadow-md p-3.5 fixed top-0 left-0 w-full z-50">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-3xl text-white">BookMyResource</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Profile Avatar" src={profilePic} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[4] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li>
              <button
                className="btn btn-outline btn-error text-white w-full h-5 mt-3 p-2 rounded-lg transition duration-300 ease-in-out transform hover:bg-red-400 hover:text-white hover:scale-95"
                onClick={handleLogout} // Attach logout handler
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
