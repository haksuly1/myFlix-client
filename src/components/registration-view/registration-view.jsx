import React, { useState } from "react";
import PropTypes from "prop-types";

import "./registration-view.scss";

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ Birthday, setBirthday] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, Birthday);
    /* Send a request to the server for authentication */
    /* then call props on registored user(username) */
    props.onRegistration(username);
  };

  return (

    <div className="registration-view">
    <h2>Please register:</h2>

    <form className="registration-form">

      <div className="registration-form__line">
        <label className="registration-form__line-label">Username:</label>
          <input className="registration-form__line__input-field" type="text" value={username} onChange={e => setUsername(e.target.value)} />
            <span className="registration-form__label-tips">5+ characters, no spaces</span>
      </div>
      
      <div class="registration-form__line">
        <label className="registration-form__line-label">Enter password:</label>
          <input className="registration-form__line__input-field" type="text" value={password} onChange={e => setPassword(e.target.value)} />
            <span className="registration-form__label-tips">Must not be blank</span>
      </div>
      
      <div className="registration-form__line">
        <label className="registration-form__line-label">Email:</label>
          <input className="registration-form__line__input-field" type="text" value={email} onChange={e => setEmail(e.target.value)} />
            <span className="registration-form__label-tips">required</span>
      </div>
      
      <div className="registration-form__line">
        <label class="registration-form__line-label">Birthday:</label>
          <input className="registration-form__line__input-field" type="text" value={Birthday} onChange={e => setBirthday(e.target.value)} />
            <span className="registration-form__label-tips">optional</span>
      </div>
      

      <button type="submit" onClick={handleSubmit}>Register</button>
    </form>
  </div>
)
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};