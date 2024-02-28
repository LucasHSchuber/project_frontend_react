import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
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
import { URL, USER_ENDPOINT, AVATAR_ENDPOINT } from '../../api';

//import css
import '../../assets/css/main.css';
import '../../assets/css/buttons.css';
import '../../assets/css/global.css';


//start apge
function ChooseAvatar() {

    //define states
    const [avatars, setAvatars] = useState([]);
    const [chosenAvatar, setChoosenAvatar] = useState("");

    const Navigate = useNavigate();



    const chooseAvatar = async () => {
        try {
            const response = await axios.get(`${URL}/${AVATAR_ENDPOINT}`);
            console.log(response.data);
            setAvatars(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        chooseAvatar();
    }, [])



    //When user selects an avatar
    const selectedAvatar = async (avatarid) => {
        let userid = sessionStorage.getItem("userid");
        try {
            const response = await axios.post(`${URL}/${USER_ENDPOINT}/avatar?avatar=${avatarid}&userid=${userid}`);
            console.log(response.data);
            Navigate("/home");
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    //When user doesnt select an avatar - choose later - btn
    const storeDefaultAvatar = async () => {
        let id = sessionStorage.getItem("userid");
        try {
            const response = await axios.post(`${URL}/${USER_ENDPOINT}/defaultavatar/${id}`);
            console.log(response.data);
            Navigate("/home");
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className='avatar-wrapper' id="chooseavatar-wrapper" >
            <img src={img1} className="bg-video" alt='bg video' style={{ opacity: '0.9' }}></img>

            <div className='avatar-content'>

                <h3>Choose avatar</h3>
                <p></p>

                <div className='row py-4'>
                    {avatars.slice(1).map((avatar) => (
                        <div
                            key={avatar.avatarId}
                            className='col-4 avatar-image-box'
                            value={avatar.avatarId}
                            // onChange={(e) => setChoosenAvatar(e.target.value)}
                            onClick={() => setChoosenAvatar(avatar.avatarId)}
                        >
                            <img className={`avatar-image ${chosenAvatar === avatar.avatarId ? 'selected-avatar' : ''}`} src={`${URL}/imgupload/${avatar.avatarImageName}`} alt={avatar.avatarId}
                                style={{
                                    filter: chosenAvatar === avatar.avatarId ? 'brightness(100%) drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.9))' : 'none',
                                    transition: 'filter 0.3s ease',
                                }}
                            />
                        </div>
                    ))}
                </div>

                <button className="gradient-button mt-5" type='submit' onClick={() => selectedAvatar(chosenAvatar)}>Choose avatar</button>
                <button className="normal-button mt-2" type='submit' onClick={() => storeDefaultAvatar()}>Choose later</button>

            </div>
        </div>
    );
};
export default ChooseAvatar;
