import { useState } from "react";
import { useNavigate } from "react-router-dom";

import login from "../resources/login.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  console.log(email, password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const req = await fetch("http://localhost:4700/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await req.json();
    if (data.user) {
      const token = await data.user;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } else {
      alert("Incorrect email or password");
    }
  };

  return (
    <div className="Register">
      <div className="navbar">
        <div className="logo">Logo</div>
        <div className="login">
          <a href="http://localhost:3000/login">Login </a>
          <div>
            <a href="http://localhost:3000/login">
              <img className="imglogin" src={login} />
            </a>
          </div>{" "}
        </div>
      </div>
      <div className="content">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input className="enter" type="Submit" placeholder="Register" />
        </form>
      </div>
    </div>
  );
};

export default Login;
