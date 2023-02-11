import React, { useState }  from 'react';
import '../css/Layout.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Sidenav from './components/Sidenav';
import Content from './components/Content';
import jwt from 'jwt-decode';

function App() {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [content, setContent] = useState("Login");
  const [username, setUsername] = useState("");

  React.useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');
    if(token){
        var decode = jwt(token);
        setUsername(decode.sub);
        sessionStorage.setItem("access_token", "Bearer " + token);
        setLoggedIn(true);
        setContent('Profile');
        return;
    }

    if(sessionStorage.access_token){
        var oldToken = sessionStorage.access_token.replace("Bearer ", "");
        decode = jwt(oldToken);
        setUsername(decode.sub);
        setLoggedIn(true);
        setContent('Profile');
    }
},[]);

  return (
      <div className='App'>
        <Sidenav open={open} setOpen={setOpen} setContent={setContent} />
        <div className='main'>
          <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} setContent={setContent} username={username} />
          <div className='content'>
            <Content content={content} setContent={setContent} setLoggedIn={setLoggedIn} setUsername={setUsername} username={username} />
          </div>
          <Footer />
        </div>
      </div>
    );
}

export default App;