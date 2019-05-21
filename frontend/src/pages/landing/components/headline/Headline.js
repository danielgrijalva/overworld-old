import React from "react";
import { Register } from "../../../app/components/register/Register";
import { LogIn } from "../../../app/components/login/LoginModal";

import "./Headline.css";

export const Headline = () => (
  <section className="landing-header">
    <h1>The social network for video game lovers.</h1>
    <p>
      Start your gaming journal now, it's free!
      <Register />
      Or <LogIn /> if you're already a member.
    </p>
  </section>
);
