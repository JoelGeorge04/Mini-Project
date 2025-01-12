// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Home.css";

function HomePage() {
  const handleLogout = () => {
    console.log("Logged out");
    window.location.href = "/login";
  };

  return (
    <div>
      <header className="header">
        <h1 className="title">Booking.Go</h1>
        <nav>
          <ul className="navList">
            <li><a href="/dashboard" className="navLink">Dashboard</a></li>
            <li><a href="/profile" className="navLink">Profile</a></li>
            <li><a href="/settings" className="navLink">Settings</a></li>
            <li><button onClick={handleLogout} className="logoutButton">Logout</button></li>
          </ul>
        </nav>
      </header>
      <main className="main">
        <section className="welcomeSection">
          <h2>Welcome Back!</h2>
          <p>We’re glad to have you here. Start exploring your dashboard or manage your resources efficiently.</p>
        </section>
        <section className="contentSection">
          <h3>Your Activity</h3>
          <p>Recent updates and notifications will appear here.</p>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
