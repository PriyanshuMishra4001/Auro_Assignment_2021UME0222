import Portfolio from "../models/Portfolio.js";

// Create Portfolio
export const createPortfolio = async (req, res) => {
  try {
    const portfolio = new Portfolio(req.body);
    await portfolio.save();
    res.status(201).json({ message: "Portfolio created successfully", portfolio });
  } catch (error) {
    res.status(500).json({ message: "Error creating portfolio", error: error.message });
  }
};

// Get All Portfolios
export const getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.status(200).json(portfolios);
  } catch (error) {
    res.status(500).json({ message: "Error fetching portfolios", error: error.message });
  }
};

// Get Portfolio by ID
export const getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: "Error fetching portfolio", error: error.message });
  }
};

export const getPortfoliosByUser = async (req, res) => {
    try {
        console.log("Request ke parameters are...",req.params);
        const { userEmail } = req.params;
        const portfolios = await Portfolio.find({ email: userEmail });  // ✅ Correct field name
        
    
      if (portfolios.length === 0) {  // ✅ Fixed Undefined Error
        return res.status(404).json({ message: "No portfolios found for this user" });
      }
  
      res.status(200).json(portfolios);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user portfolios", error: error.message });
    }
  };


  
  
// Delete Portfolio by ID
export const deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    res.status(200).json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting portfolio", error: error.message });
  }
};
