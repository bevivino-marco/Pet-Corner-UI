import React, { useState }  from 'react';
import '../css/Layout.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Sidenav from './components/Sidenav';
import Content from './components/Content';

function App() {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [content, setContent] = useState("Login");
  const [username, setUsername] = useState("");

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