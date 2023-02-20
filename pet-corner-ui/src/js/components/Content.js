import React from "react";
import Adopt from "./adopt/adopt";
import Login from "./Login";
import Profile from "./profile/Profile";
import Registration from "./Registration";
import Therapy from "./therapy/therapy";
import Sitter from "./sitter/Sitter";
import Trainer from "./trainer/Trainer";
import Homepage from "./homepage/homepage";

function Content({ content, setContent, setLoggedIn, setUsername, username }) {
  const [success, setSuccess] = React.useState("");

  if (content === "Login") {
    return (
      <Login
        success={success}
        setSuccess={setSuccess}
        setContent={setContent}
        setLoggedIn={setLoggedIn}
        setUsername={setUsername}
      />
    );
  }

  if (content === "Registration") {
    return <Registration setContent={setContent} setSuccess={setSuccess} />;
  }

  if (content === "Adozione") {
    return <Adopt />;
  }

  if (content === "Profile") {
    return (
      <Profile
        username={username}
        setContent={setContent}
        setLoggedIn={setLoggedIn}
      />
    );
  }

  if (content === "Pet Therapy") {
    return <Therapy />;
  }

  if (content === "Pet Sitter") {
    return <Sitter />;
  }

  if (content === "Training") {
    return <Trainer />;
  }

  if (content === "Home") {
    return <Homepage setContent={setContent} />;
  }

  return "Not implemented yet";
}

export default Content;
