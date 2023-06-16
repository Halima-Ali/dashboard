import React from "react";
import "./authentication.css";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";


export default function Login() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [error, setError] = React.useState(" ");
  const navigate = useNavigate();
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function login(event) {
    event.preventDefault();

    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(formData.email)) {
      alert("invalid email");
      setError("email");
    } else if (formData.password === "") {
      alert("Password Required");
      setError("password");
    } else {
      setError("");
      console.log("no error");
      auth
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then((auth) => {
          console.log(auth);
          navigate("/dashboard", {replace:true});
        })
        .catch((error) => {
          alert(error.message);
        });
    }


  }
  return (
    <div className="login-container">
      <div className="wrapper">
        <h1>Login</h1>
        <form>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </form>
        <div className="recover">
          <Link to="./forgot" replace style={{textDecoration:"none", color:"#333"}}>Forgot password?</Link>
        </div>
        <button onClick={login}>Login</button>
        <div className="member">
          Don't Have an account?{" "}
          <Link to="/signup" replace className="link">
            Sign Up
          </Link>
        </div>
        {!error && <span style={{ color: "green" }}>Valid Inputs</span>}
      </div>
    </div>
  );
}
