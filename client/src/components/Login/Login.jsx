import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

  const [formData, setFormData] = useState({
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
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login Successful!");
        navigate("/portfolios");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };


  // return (
  //   <div className="main">  
  //     <input type="checkbox" id="chk" aria-hidden="true" />
      
  //     <div className="signup">
  //       <form>
  //         <label htmlFor="chk" aria-hidden="true">Sign up</label>
  //         <input type="text" name="txt" placeholder="User name" required />
  //         <input type="email" name="email" placeholder="Email" required />
  //         <input type="password" name="pswd" placeholder="Password" required />
  //         <button>Sign up</button>
  //       </form>
  //     </div>

  //     <div className="login">
  //       <form onSubmit={handleSubmit}>
  //         <label htmlFor="chk" aria-hidden="true">Login</label>
  //         <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
  //         <input type="password" name="pswd" placeholder="Password" required onChange={handleChange}/>
  //         <button type="submit">Login</button>
  //       </form>
  //     </div>
  //   </div>
  // );
  return (
    <div className="main">  
      <div className="signup">
        <form onSubmit={handleSubmit}>
          <label>Login</label>
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
