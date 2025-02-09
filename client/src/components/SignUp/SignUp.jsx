import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";


function SignUp() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Signup Successful! Please log in.");
        navigate("/login");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  // return (
  //   <div className="main">  
  //     <input type="checkbox" id="chk" aria-hidden="true" />
      
  //     <div className="signup">
  //       <form onSubmit={handleSubmit}>
  //         <label htmlFor="chk" aria-hidden="true">Sign up</label>
  //         <input type="text" name="txt" placeholder="User name" required onChange={handleChange}/>
  //         <input type="email" name="email" placeholder="Email" required onChange={handleChange}/>
  //         <input type="password" name="pswd" placeholder="Password" required onChange={handleChange}/>
  //         <button type="submit">Sign up</button>
  //       </form>
  //     </div>

  //     <div className="login">
  //       <form>
  //         <label htmlFor="chk" aria-hidden="true">Login</label>
  //         <input type="email" name="email" placeholder="Email" required />
  //         <input type="password" name="pswd" placeholder="Password" required />
  //         <button>Login</button>
  //       </form>
  //     </div>
  //   </div>
  // );
  return (
    <div className="main">  
      <div className="signup">
        <form onSubmit={handleSubmit}>
          <label>Sign up</label>
          <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
