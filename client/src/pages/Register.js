import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import login from "../resources/login.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const req = await fetch("http://localhost:4700/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await req.json();
    if (data.user === "ok") {
      navigate("/login");
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
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
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
          <input type="Submit" placeholder="Register" className="enter" />
        </form>
      </div>
    </div>
  );
};

export default Register;
