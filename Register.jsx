import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const register = async (e) => {
    e.preventDefault();
    let register_url = window.location.origin + "/djangoapp/register";
    
    const res = await fetch(register_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "userName": username,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
      }),
    });

    const json = await res.json();
    if (json.status) {
        sessionStorage.setItem('username', json.userName);
        window.location.href = window.location.origin;
    } else if (json.error === "Already Registered") {
        alert("The username is already taken. Please choose another.");
    }
  };

  return (
    <div className="register_container" style={{width: "50%", margin: "auto", paddingTop: "5%"}}>
      <form onSubmit={register} className="register_form">
        <h2 className="header_title">Sign Up</h2>
        <hr/>
        <div className="input_group">
          <input type="text" placeholder="Username" className="input_field" onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="input_group">
          <input type="text" placeholder="First Name" className="input_field" onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div className="input_group">
          <input type="text" placeholder="Last Name" className="input_field" onChange={(e) => setLastName(e.target.value)} required />
        </div>
        <div className="input_group">
          <input type="email" placeholder="Email" className="input_field" onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input_group">
          <input type="password" placeholder="Password" className="input_field" onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="register_button">Register</button>
      </form>
    </div>
  );
};

export default Register;
