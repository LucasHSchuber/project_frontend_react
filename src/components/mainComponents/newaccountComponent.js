import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Howl } from 'howler';

//import sounds
import mp3 from '../../assets/sounds/click2.mp3';
import mp32 from '../../assets/sounds/bgsound.mp3';
import mp33 from '../../assets/sounds/username.mp3';
import mp34 from '../../assets/sounds/name.mp3';

import mp4 from '../../assets/videos/lines.mp4';
import img1 from '../../assets/images/space2.jpg';

// Importing api url and enpoints
import { URL, USER_ENDPOINT } from '../../api';

//import css
import '../../assets/css/main.css';
import '../../assets/css/buttons.css';
import '../../assets/css/global.css';


//start apge
function Newaccount() {

  //define states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRPassword] = useState("");



  const postNewUser = async (e) => {
    e.preventDefault();

    console.log(username);
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(rpassword);

    console.log(`${URL}/${USER_ENDPOINT}`);
    try {

      const response = await axios.post(`${URL}/${USER_ENDPOINT}/?rpassword=${rpassword}`, {
        Username: username,
        Name: name,
        Email: email,
        PasswordHash: password
      });
      console.log(response.data);

    } catch (error) {
      console.log(error);
    }

  }



  // const KeyboardSoundEffect = () => {
  //   useEffect(() => {
  //     const handleKeyDown = (event) => {

  //       if (event.key.match(/^[ -~]$/)
  //       ) {

  //         const sound = new Howl({
  //           src: [mp3],
  //           volume: 0.3
  //         });
  //         sound.play();
  //       };

  //     }

  //     const inputElement = document.querySelectorAll('input');

  //     inputElement.forEach(el => {
  //       el.addEventListener('keydown', handleKeyDown);
  //     });

  //     // Cleanup function to remove the event listener when the component unmounts
  //     return () => {
  //       inputElement.forEach(el => {
  //         el.removeEventListener('keydown', handleKeyDown);
  //       });
  //     };
  //   }, []);

  //   return null; // This component doesn't render anything visible
  // };


  // const KeyboardSoundEffect2 = () => {
  //   useEffect(() => {
  //     let usernameVoice;

  //     const handleKeyDown = (event) => {

  //       if (event.target.matches('input[name="username"]')) {
  //         if (!usernameVoice || !usernameVoice.playing()) {
  //           // If usernameVoice is not defined or not playing, create a new Howl instance
  //           usernameVoice = new Howl({
  //             src: [mp33],
  //             volume: 0.3
  //           });
  //           usernameVoice.play();
  //         }
  //       }
  //     };

  //     const inputElement = document.querySelector('input[name="username"]');
  //     console.log('Input element:', inputElement);

  //     inputElement.addEventListener('click', handleKeyDown);

  //     return () => {
  //       // Cleanup: remove event listener
  //       inputElement.removeEventListener('click', handleKeyDown);
  //     };
  //   }, []);

  //   return null; // This component doesn't render anything visible
  // };




  // const KeyboardSoundEffect3 = () => {
  //   useEffect(() => {
  //     let nameVoice;

  //     const handleKeyDown = (event) => {
  //       if (event.target.matches('input[name="name"]')) {
  //         if (!nameVoice || !nameVoice.playing()) {
  //           // If nameVoice is not defined or not playing, create a new Howl instance
  //           nameVoice = new Howl({
  //             src: [mp34],
  //             volume: 0.3
  //           });
  //           nameVoice.play();
  //         }
  //       }
  //     };

  //     const inputElement = document.querySelector('input[name="name"]');
  //     console.log('Input element:', inputElement);

  //     inputElement.addEventListener('click', handleKeyDown);

  //     return () => {
  //       // Cleanup: remove event listener
  //       inputElement.removeEventListener('click', handleKeyDown);
  //     };
  //   }, []);

  //   return null;
  // };




  // let bgSound;

  // const playBgSound = () => {
  //   // Check if bgSound is already initialized to prevent multiple instances
  //   if (!bgSound) {
  //     bgSound = new Howl({
  //       src: [mp32],
  //       volume: 0.5
  //     });
  //   }

  //   bgSound.play(); // Play the background sound
  // };

  // const pauseBgSound = () => {
  //   if (bgSound && bgSound.playing()) {
  //     bgSound.pause(); // Pause the background sound if it's playing
  //   }
  // };



  return (
    <div className='newaccount-wrapper' id="newaccount-wrapper" >

      {/* <video autoPlay muted loop className="bg-video">
        <source src={mp4} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

      <img src={img1} className="bg-video" alt='bg video' style={{ opacity: '0.9' }}></img>

      <div className='page-content'>
        <form onSubmit={postNewUser}>
          <h3 className='mb-4'>Create new account</h3>

          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder=""
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          >
          </input>

          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          >
          </input>

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          >
          </input>

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          >
          </input>

          <label>Reapeat password</label>
          <input
            type="password"
            name="rpassword"
            placeholder=""
            value={rpassword}
            onChange={(e) => setRPassword(e.target.value)}
            required
          >
          </input>

          <button className="gradient-button my-3" type='sumbit'>Create</button>
        </form>

        <div className="create-account-section">
          <p>Already have an account?</p>
          <Nav.Link as={Link} to="/login" className="create-account-link">
            Log in here!
          </Nav.Link>
        </div>

        {/* <KeyboardSoundEffect />
        <KeyboardSoundEffect2 />
        <KeyboardSoundEffect3 /> */}
      </div>

      {/* <div class="">
        <div className='music-controls-menu'>
          <button onClick={playBgSound}><i style={{ color: 'white' }} class="fa-solid fa-1x fa-play"></i></button>
          <button onClick={pauseBgSound}><i style={{ color: 'white' }} class="fa-solid fa-1x fa-pause"></i></button>
        </div>
      </div> */}

    </div>
  );


}

export default Newaccount;
