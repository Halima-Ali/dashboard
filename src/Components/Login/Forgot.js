import React from "react";
import "./authentication.css"
import { useNavigate } from "react-router-dom";
import {sendPasswordResetEmail } from "firebase/auth"
import {auth} from "../../firebase";

export default function Forgot() {
 const [formData, setFormData] = React.useState({
    email: "",
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

 function forgot(event) {
  event.preventDefault();

  let re =
   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(formData.email)) {
   alert("invalid email");
   setError("email");
  }else {
   setError("");
   console.log("no error");
   auth.sendPasswordResetEmail(formData.email)
    .then(() => {
     console.log("password reset email sent successfully");
     navigate("/", { replace: true });
    })
    .catch((error) => {
     alert(error.message);
    });
  }
 }
 return (
   <div className="wrapper">
     <h1>Forgot</h1>
     <div className="description">
       Enter the email associated with your acoount and we will send you a 
        <span>link to reset you password</span>
     </div>
     <form>
       <input
         type="email"
         placeholder="Email"
         name="email"
         onChange={handleChange}
         value={formData.email}
       />
     </form>
     <button onClick={forgot}>Forgot</button>
   </div>
 );
}