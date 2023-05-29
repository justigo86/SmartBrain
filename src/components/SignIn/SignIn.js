import React, { useState } from "react";

const SignIn = ({ onRouteChange, loadUser }) => {
  const [signInEmail, setSignInEmail] = useState("default");
  const [signInPassword, setSignInPassword] = useState("default2");
  const onEmailChange = (e) => {
    setSignInEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setSignInPassword(e.target.value);
  };
  const onSubmitSignIn = () => {
    fetch("http://localHost:3000/signin", {
      //if using Heroku
      // fetch("https://floating-waters-88143.herokuapp.com/signin", {
      //fetching server API from localhost
      method: "post", //ensuring method is POST
      headers: { "Content-Type": "application/json" }, //clarifying header info
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }), //stringify the json data
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.id) {
          //user must have an id
          loadUser(user);
          onRouteChange("home");
        }
      });
  };
  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure center">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                onChange={onEmailChange}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                onChange={onPasswordChange}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmitSignIn}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange("register")}
              href="#0"
              className="f6 link dim black db pointer"
            >
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  );
};

export default SignIn;
