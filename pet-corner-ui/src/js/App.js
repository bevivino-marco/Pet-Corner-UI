import React, { useState }  from 'react';
import '../css/Layout.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Sidenav from './components/Sidenav';
import Content from './components/Content';

function App() {
  const [open, setOpen] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [content, setContent] = useState("Home");

  return (
      <div className='App'>
        <Sidenav open={open} setOpen={setOpen} setContent={setContent} />
        <div className='main'>
          <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <div className='content'>
            <Content content={content}/>
          </div>
          <Footer />
        </div>
      </div>
    );
}

export default App;