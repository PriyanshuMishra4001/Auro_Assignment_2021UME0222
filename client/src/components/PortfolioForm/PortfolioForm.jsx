import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PortfolioForm.css";

const PortfolioForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        aboutMe: "",
        resume: "",
        skills: "",
        experience: [],
        education: [],
        projects: [],
        certifications: [],
        socialLinks: [],
        achievements: [],
        testimonials: [],
        theme: "default",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Handle input change for basic fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle nested input changes for arrays (e.g., experience, education, etc.)
    const handleNestedChange = (e, index, field, section) => {
        const newSection = [...formData[section]];
        newSection[index] = { ...newSection[index], [field]: e.target.value };
        setFormData({ ...formData, [section]: newSection });
    };

    // Add new empty entry for nested sections
    const addNestedField = (section) => {
        setFormData({
            ...formData,
            [section]: [...formData[section], {}],
        });
    };

    // Remove an entry from nested sections
    const removeNestedField = (index, section) => {
        const newSection = [...formData[section]];
        newSection.splice(index, 1);
        setFormData({ ...formData, [section]: newSection });
    };

    // Validate form before submission
    const validateForm = () => {
        let newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Enter a valid email.";
        if (formData.phone && !/^\d{10}$/.test(formData.phone)) newErrors.phone = "Enter a 10-digit phone number.";
        if (!formData.resume.match(/^https?:\/\/.+$/)) newErrors.resume = "Provide a valid resume URL.";
        if (!formData.skills.trim()) newErrors.skills = "Skills cannot be empty.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await fetch("http://localhost:5000/portfolio/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Portfolio Created Successfully!");
                    navigate("/portfolio");
                } else {
                    alert(`Error: ${data.message}`);
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                alert("Failed to submit portfolio");
            }
        }
    };

    return (
        <form className="portfolio-form" onSubmit={handleSubmit}>
            <h1>Create Portfolio</h1>

            {/* Basic Information */}
            <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Phone</label>
                <input type="text" name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>About Me</label>
                <textarea name="aboutMe" placeholder="Tell something about yourself" value={formData.aboutMe} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Resume Link</label>
                <input type="url" name="resume" placeholder="Provide resume link" value={formData.resume} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Skills</label>
                <input type="text" name="skills" placeholder="Skills (comma-separated)" value={formData.skills} onChange={handleChange} required />
            </div>

            {/* Work Experience */}
            <h3>Work Experience</h3>
            {formData.experience.map((exp, index) => (
                <div key={index} className="form-group">
                    <input type="text" placeholder="Company" value={exp.company || ''} onChange={(e) => handleNestedChange(e, index, 'company', 'experience')} required />
                    <input type="text" placeholder="Position" value={exp.position || ''} onChange={(e) => handleNestedChange(e, index, 'position', 'experience')} />
                    <label>Start Date</label>
                    <input type="date" value={exp.startDate || ''} onChange={(e) => handleNestedChange(e, index, 'startDate', 'experience')} />
                    <label>End Date</label>
                    <input type="date" value={exp.endDate || ''} onChange={(e) => handleNestedChange(e, index, 'endDate', 'experience')} />
                    <textarea placeholder="Description" value={exp.description || ''} onChange={(e) => handleNestedChange(e, index, 'description', 'experience')} />
                    <button type="button" className="remove-button" onClick={() => removeNestedField(index, 'experience')}>Remove</button>
                </div>
            ))}
            <button type="button" className="add-button" onClick={() => addNestedField('experience')}>Add Experience</button>

            {/* Education */}
            <h3>Education</h3>
            {formData.education.map((edu, index) => (
                <div key={index} className="form-group">
                    <input type="text" placeholder="Institution" value={edu.institution || ''} onChange={(e) => handleNestedChange(e, index, 'institution', 'education')} required />
                    <input type="text" placeholder="Degree" value={edu.degree || ''} onChange={(e) => handleNestedChange(e, index, 'degree', 'education')} />
                    <input type="text" placeholder="Field of Study" value={edu.fieldOfStudy || ''} onChange={(e) => handleNestedChange(e, index, 'fieldOfStudy', 'education')} />
                    <button type="button" className="remove-button" onClick={() => removeNestedField(index, 'education')}>Remove</button>
                </div>
            ))}
            <button type="button" className="add-button" onClick={() => addNestedField('education')}>Add Education</button>

            {/* Projects */}
            <h3>Projects</h3>
            {formData.projects.map((proj, index) => (
                <div key={index} className="form-group">
                    <input type="text" placeholder="Project Title" value={proj.title || ''} onChange={(e) => handleNestedChange(e, index, 'title', 'projects')} required />
                    
                    {/* ✅ Corrected Field Name for Project Description */}
                    <textarea placeholder="Project Description" value={proj.description || ''} onChange={(e) => handleNestedChange(e, index, 'description', 'projects')} required />
                    
                    <button type="button" className="remove-button" onClick={() => removeNestedField(index, 'projects')}>Remove</button>
                </div>
            ))}
            <button type="button" className="add-button" onClick={() => addNestedField('projects')}>Add Project</button>

            {/* Submit Button */}
            <button type="submit">Submit</button>
        </form>
    );
};

export default PortfolioForm;
