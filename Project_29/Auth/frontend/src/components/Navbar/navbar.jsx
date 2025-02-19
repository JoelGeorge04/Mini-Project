/* eslint-disable no-unused-vars */
import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"; 



const Navbar = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const profilePic = authUser?.profilePic || `https://avatar.iran.liara.run/public/boy?username=${authUser?.username}`;

  const handleLogout = () => {
    localStorage.removeItem("user");
    setAuthUser(null);
    navigate("/login");
  };

  return (
    <div className="navbar bg-blue-600 shadow-md p-3.5 fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-4">
          <a className="btn btn-ghost normal-case text-3xl text-white">
            BookMyResource
          </a>
          {authUser && (
            <span 
              className="text-gold text-lg"
              style={{ marginLeft: "1070px", cursor: "pointer", textAlign: "right" }}
              onMouseEnter={(e) => (e.target.style.color = "yellow")}
              onMouseLeave={(e) => (e.target.style.color = "white")}
            >
              {authUser.fullName}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar w-16 h-16">
              <div className="w-12 rounded-full">
                <img alt="Profile Avatar" src={authUser.profilePic} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[4] mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between cursor-pointer" onClick={() => navigate("/profile")}>Profile</a>
              </li>
              <li><a>Settings</a></li>
              <li>
                <button
                  className="btn btn-outline btn-error text-white w-full h-5 mt-3 p-2 rounded-lg transition duration-300 ease-in-out transform hover:bg-red-400 hover:text-white hover:scale-95"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
