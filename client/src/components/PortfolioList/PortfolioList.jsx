import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ Import JWT decoder
import "./PortfolioList.css"; // ✅ Import CSS for styling

const PortfolioList = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ Decode JWT token to get user email
  const token = localStorage.getItem("token");
  let userEmail = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);
      userEmail = decodedToken.email; 
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  useEffect(() => {
    const fetchPortfolios = async () => {
      if (!userEmail) return; // ✅ Do not fetch if email is missing

      try {
        const response = await fetch(`http://localhost:5000/portfolio/user/${userEmail}`);
        const data = await response.json();
        console.log("Portfolios fetched:", data);

        if (response.ok) {
          setPortfolios(data);
        } else {
          setError(data.message || "Failed to fetch portfolios.");
        }
      } catch (error) {
        setError("Error fetching portfolios. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, [userEmail]);

  // ✅ Navigate to portfolio details page when a portfolio is clicked
  const handlePortfolioClick = (id) => {
    navigate(`/portfolio/${id}`);
  };

  return (
    <div className="portfolio-list">
      <h2>Your Portfolios</h2>

      {loading && <p className="loading">Loading portfolios...</p>}
      {error && <p className="error">{error}</p>}

      <div className="portfolio-container">
        {portfolios.length > 0 ? (
          portfolios.map((portfolio) => (
            <div key={portfolio._id} className="portfolio-card" onClick={() => handlePortfolioClick(portfolio._id)}>
              <h3>{portfolio.name}</h3>
              <p><strong>Email:</strong> {portfolio.email}</p>
              <p><strong>Skills:</strong> {portfolio.skills?.join(", ") || "N/A"}</p>
            </div>
          ))
        ) : (
          !loading && <p className="no-portfolios">No portfolios found. Create one to get started!</p>
        )}
      </div>
    </div>
  );
};

export default PortfolioList;
