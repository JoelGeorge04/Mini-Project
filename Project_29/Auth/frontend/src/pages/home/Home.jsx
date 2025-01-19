// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/navbar.jsx";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);  // Added loading state

  useEffect(() => {
    // Simulating a fetch or localStorage retrieval for user data
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUserData);
    setLoading(false);  // Set loading to false once data is fetched
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // You can replace this with a spinner or placeholder
  }

  return (
    <div>
      <Navbar profilePic={userData?.profilePic} />  {/* Pass the profilePic */}
      <div className="flex items-center justify-center h-screen relative">
        <h1 className="text-4xl font-bold text-center text-gray-700 z-10">
          Project Updates Soon...
        </h1>
		<div className="h-5 w-5 rounded-full border-dotted border-4 border-blue-500 animate-spin-slow"></div>
		</div>
    </div>
  );
};

export default App;
