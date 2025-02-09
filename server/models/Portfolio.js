import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, match: /^\S+@\S+\.\S+$/ },
    phone: { type: String, match: /^\d{10}$/ },
    aboutMe: { type: String },
    resume: { type: String, required: true },
    skills: { type: [String], required: true }, // ✅ Changed from String to Array of Strings
    experience: [
      {
        company: String,
        position: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],
    education: [
      {
        institution: String,
        degree: String,
        fieldOfStudy: String,
      },
    ],
    projects: [
      {
        title: String,
        description: String,
      },
    ],
    certifications: [String],
    socialLinks: [String],
    achievements: [String],
    testimonials: [String],
    theme: { type: String, default: "default" },
  },
  { timestamps: true }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);
export default Portfolio;
