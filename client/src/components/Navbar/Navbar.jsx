// import React from "react";
// import "./Navbar.css";

// function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         <a href="#" className="nav-logo">
//           <img
//             src="https://flowbite.com/docs/images/logo.svg"
//             alt="Logo"
//             className="logo"
//           />
//           <span>Portfolio Displayer</span>
//         </a>

//         <div className="nav-links">
//           <ul className="nav-menu">
//             <li><a href="#" className="active">Home</a></li>
//             <li><a href="#">About</a></li>
//             <li><a href="#">Services</a></li>
//             <li><a href="#">Contact</a></li>
//           </ul>
//         </div>

//         <div className="nav-buttons">
//           <button className="btn primary">Login</button>
//           <button className="btn secondary">Signup</button>
//         </div>

//         <button className="mobile-menu-btn">
//           <span className="sr-only">Toggle Menu</span>
//           <svg className="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M1 1h15M1 7h15M1 13h15"
//             />
//           </svg>
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;



import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token"); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from storage
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo Section */}
        <Link to="/" className="nav-logo">
          <img src="https://flowbite.com/docs/images/logo.svg" alt="Logo" className="logo" />
          <span>Portfolio Displayer</span>
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          <ul className="nav-menu">
            <li><Link to="/" className="active">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>

            {/* Protected Routes (Only visible if logged in) */}
            {isAuthenticated && (
              <>
                <li><Link to="/create">Create Portfolio</Link></li>
                <li><Link to="/portfolios">My Portfolios</Link></li>
              </>
            )}
          </ul>
        </div>

        {/* Authentication Buttons */}
        <div className="nav-buttons">
          {isAuthenticated ? (
            <button className="btn logout" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <button className="btn primary" onClick={() => navigate("/login")}>Login</button>
              <button className="btn secondary" onClick={() => navigate("/signup")}>Signup</button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn">
          <span className="sr-only">Toggle Menu</span>
          <svg className="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
