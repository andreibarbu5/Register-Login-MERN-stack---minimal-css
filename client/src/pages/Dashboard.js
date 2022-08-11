import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [quote, setQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");
  const navigate = useNavigate();

  const populateDashboard = async () => {
    const req = await fetch("http://localhost:4700/api/dashboard", {
      headers: { "x-access-token": localStorage.getItem("token") },
    });
    const data = await req.json();
    if (data.quote) {
      setQuote(data.quote);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userinfo = decodeToken(token);
      if (userinfo) {
        populateDashboard();
      } else {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  });

  const updateQuote = async (e) => {
    e.preventDefault();
    const req = await fetch("http://localhost:4700/api/dashboard", {
      method: "POST",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tempQuote,
      }),
    });
    const data = await req.json();
    if (data.status === "ok") {
      if (tempQuote) {
        setQuote(tempQuote);
      } else {
        setQuote(quote);
      }
      setTempQuote("");
    } else {
      alert("Not the good token");
    }
  };

  return (
    <div>
      <div className="hero">
        <h1>Your Quote: </h1>
        <h2>{quote || "No quote"}</h2>
      </div>
      <div className="input">
        <form onSubmit={updateQuote}>
          <input
            placeholder="Add quote"
            value={tempQuote}
            onChange={(e) => setTempQuote(e.target.value)}
          />
          <input type="submit" id="but" />
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
