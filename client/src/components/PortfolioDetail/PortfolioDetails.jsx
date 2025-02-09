import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PortfolioDetails.css"; // ✅ Add a CSS file for styling

const PortfolioDetails = () => {
  const { id } = useParams(); // ✅ Get Portfolio ID from URL
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/portfolio/${id}`);
        const data = await response.json();
        console.log("Portfolio Details Fetched:", data);
        if (response.ok) {
          setPortfolio(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Error fetching portfolio details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioDetails();
  }, [id]);

  if (loading) return <p>Loading portfolio details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="portfolio-details">
      <div className="header">
        <h1>{portfolio.name}</h1>
        <p className="email">{portfolio.email}</p>
      </div>

      <div className="content">
        <div className="section">
          <h2>About Me</h2>
          <p>{portfolio.aboutMe || "No information provided."}</p>
        </div>

        <div className="section">
          <h2>Skills</h2>
          <p>{portfolio.skills?.join(", ") || "No skills listed."}</p>
        </div>

        <div className="section">
          <h2>Experience</h2>
          {portfolio.experience.length > 0 ? (
            <ul>
              {portfolio.experience.map((exp, index) => (
                <li key={index}>
                  <strong>{exp.position}</strong> at {exp.company} ({exp.startDate} - {exp.endDate})
                  <p>{exp.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No experience details available.</p>
          )}
        </div>

        <div className="section">
          <h2>Education</h2>
          {portfolio.education.length > 0 ? (
            <ul>
              {portfolio.education.map((edu, index) => (
                <li key={index}>
                  <strong>{edu.degree}</strong> in {edu.fieldOfStudy} from {edu.institution}
                </li>
              ))}
            </ul>
          ) : (
            <p>No education details available.</p>
          )}
        </div>

        <div className="section">
          <h2>Projects</h2>
          {portfolio.projects.length > 0 ? (
            <ul>
              {portfolio.projects.map((proj, index) => (
                <li key={index}>
                  <strong>{proj.title}</strong>: {proj.description}
                </li>
              ))}
            </ul>
          ) : (
            <p>No projects listed.</p>
          )}
        </div>

        <div className="section">
          <h2>Certifications</h2>
          <p>{portfolio.certifications?.join(", ") || "No certifications listed."}</p>
        </div>

        <div className="section">
          <h2>Social Links</h2>
          {portfolio.socialLinks.length > 0 ? (
            <ul>
              {portfolio.socialLinks.map((link, index) => (
                <li key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No social links available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetails;
