import React, { useState } from "react";
import SignUp from "./SignUp";
import "./AuthForm.css"; // Import CSS file for styling

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="auth-form-container">
      {showLogin ? (
        <>
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="youremail@gmail.com"
              id="email"
              name="email"
            />
            <label htmlFor="password">Password</label>
            <input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              placeholder="********"
              id="password"
              name="password"
            />
            <button type="submit">Log In</button>
          </form>
          <button className="link-btn" onClick={() => setShowLogin(false)}>
            Don't have an account? Sign Up here.
          </button>
        </>
      ) : (
        <SignUp setShowLogin={setShowLogin} />
      )}
    </div>
  );
};

export default Login;
