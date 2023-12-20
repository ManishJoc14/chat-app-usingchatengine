import { useState } from "react";
import "../app.css";
import axios from "axios";

const AuthPage = (props) => {

  const [username, setUsername] = useState('');
  const [secret, setSecret] = useState('');
  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [hasAccount, setHasAccount] = useState(true);

  const onLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { username, secret })
      .then((r) => props.onAuth({ ...r.data, secret })) // NOTE: over-ride secret
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  };

  const onSignup = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/signup", {
        username,
        secret,
        email,
        first_name,
        last_name,
      })
      .then((r) => props.onAuth({ ...r.data, secret })) // NOTE: over-ride secret
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  };
  return (
    <div className="background">
      {hasAccount ? (
        <form onSubmit={onLogin} className="form-card">
          <div className="form-title">Login 👋</div>

          <div className="auth">
            <div className="label">Username</div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className="auth-input"
            />
            <div className="label">Password</div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setSecret(e.target.value)}
              className="auth-input"
            />
            <button className="auth-button" type="submit">
              login
            </button>
          </div>
          <div className="signup">
            New here -{" "}
            <span onClick={() => setHasAccount(false)}>
              <u>Signup</u>
            </span>
          </div>
        </form>
      ) : (
        <form onSubmit={onSignup} className="form-card">
          <div className="form-title">SignUp 👋</div>
          <div className="auth">
            <div className="label">Username</div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className="auth-input"
            />

            <div className="label">Password</div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setSecret(e.target.value)}
              className="auth-input"
            />

            <div className="label">Email</div>
            <input
              type="email"
              name="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
            />

            <div className="label">First Name</div>
            <input
              type="text"
              name="fname"
              placeholder="first name"
              onChange={(e) => setFirstName(e.target.value)}
              className="auth-input"
            />

            <div className="label">Last Name</div>
            <input
              type="text"
              name="lname"
              placeholder="last name"
              onChange={(e) => setLastName(e.target.value)}
              className="auth-input"
            />

            <button className="auth-button" type="submit">
              create account
            </button>
          </div>
          <div className="signin">
            Has account -{" "}
            <span onClick={() => setHasAccount(true)}>
              <u>sign in</u>
            </span>
          </div>
        </form>
      )}
    </div>
  );
};

export default AuthPage;
