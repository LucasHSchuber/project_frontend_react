import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Howl } from 'howler';

//import images
import img1 from '../../assets/images/space2.jpg';

// Importing api url and enpoints
import { URL, USER_ENDPOINT, USERLIST_ENDPOINT, USERAUDIO_ENDPOINT } from '../../api';

//import css
import '../../assets/css/main.css';
import '../../assets/css/buttons.css';
import '../../assets/css/global.css';



//start apge
function Mylist() {

    //define states
    const [audios, setAudios] = useState([]);
    const [userAudios, setUserAudios] = useState([]);
    const [listedAudios, setListedAudios] = useState([]);




    //fetches all already added audios thats on the user list
    const getAddedAudios = async () => {

        let id = sessionStorage.getItem("userid");
        console.log(id);

        try {
            const response = await axios.get(`${URL}/${USERAUDIO_ENDPOINT}/${id}`);
            console.log(response.data);
            const audios = response.data.map(userAudio => userAudio.audio);
            setListedAudios(audios);
            console.log(audios);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAddedAudios();
    }, [])


    //fetch user audios
    const fetchUserAudios = async () => {
        let id = sessionStorage.getItem("userid");
        try {
            const response = await axios.get(`${URL}/${USER_ENDPOINT}/${id}/audios`);
            console.log(response.data);
            setUserAudios(response.data.audios);

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        // fetchAudios();
        fetchUserAudios();
    }, [])


    const selectedList = (listId) => {
        console.log(listId);
    }

    return (
        <div className='home-wrapper' id="home-wrapper" >
            <div className='home-content'>
                <div className="audio-cards-container">
                    {listedAudios.map((audio) => (
                        <div key={audio.audioID} className="audio-card">
                            <div className="audio-image" style={{ backgroundImage: `url(${URL}/imgupload/${audio.imageName})` }}>
                                <audio className="audio" controls src={`${URL}/audioupload/${audio.filePath}`}></audio>
                            </div>
                            <div className="audio-details">
                                <h3>{audio.title}</h3>
                                <p>{audio.description}</p>
                                <p>{audio.audioID}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

}

export default Mylist;
