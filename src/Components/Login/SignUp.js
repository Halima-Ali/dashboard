import React from "react";
import "./authentication.css";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    rpassword: "",
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

  function signup(event) {
    event.preventDefault();

    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(formData.email)) {
      alert("invalid email")
      setError("email")
    }else if (formData.password !== formData.rpassword) {
      alert("Passwords do not Match");
      setError("password");
    } else {
      setError("")
      console.log("no error");
      auth
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then((auth) => {
          console.log(auth);
          navigate("/", { replace: true });
        })
        .catch((error) => {
          alert(error.message);
        });


    }

    // if (!error) {
      
    // }
  
  }
  return (
    <div>
      <div className="wrapper">
        <h1>SignUp</h1>
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
          <input
            type="password"
            placeholder="Re-enter Password"
            name="rpassword"
            value={formData.rpassword}
            onChange={handleChange}
          />
        </form>
        <div className="terms">
          By clicking you agree to our <span>terms and conditions</span>
        </div>
        <button onClick={signup}>Sign Up</button>
        <div className="member">
          Already a Member?{" "}
          <Link to="/" replace className="link">
            Login here
          </Link>
        </div>
        {!error && (<span style={{color:"green"}}>Valid Inputs</span>)}
      </div>
    </div>
  );
}
