import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Howl } from 'howler';

//import images
import img1 from '../../assets/images/space2.jpg';

// Importing api url and enpoints
import { URL, USERAUDIO_ENDPOINT, AUDIO_ENDPOINT } from '../../api';

//import css
import '../../assets/css/main.css';
import '../../assets/css/buttons.css';
import '../../assets/css/global.css';

//import api.js



//start apge
function Home() {

    //define states
    const [audios, setAudios] = useState([]);
    const [userAudioIDs, setUserAudioIDs] = useState([]);

    //fetch all audios to print on screen
    const fetchAudios = async () => {

        try {
            const response = await axios.get(`${URL}/${AUDIO_ENDPOINT}`);
            console.log(response.data);
            setAudios(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAudios();
    }, [])


    //adds an audio to the list
    const addToList = async (audioid) => {

        let id = sessionStorage.getItem("userid");
        console.log(id);
        console.log(audioid);

        const data = {
            UserId: id,
            AudioId: audioid
        };
        try {
            const response = await axios.post(`${URL}/${USERAUDIO_ENDPOINT}`, data);
            console.log(response.data);
            getAddedAudios();

        } catch (error) {
            console.log(error);
        }
    }


    //remove an audio from the list
    const removeFromList = async (audioId) => {

        let userId = sessionStorage.getItem("userid");
        console.log(userId);
        console.log(audioId);

        try {
            const response = await axios.delete(`${URL}/${USERAUDIO_ENDPOINT}/${userId}/${audioId}`);
            console.log(response.data);
            getAddedAudios(); // Refresh the list of added audios
        } catch (error) {
            console.log(error);
        }
    }



    //fetches all already added audios thats on the user list
    const getAddedAudios = async () => {

        let id = sessionStorage.getItem("userid");
        console.log(id);

        try {
            const response = await axios.get(`${URL}/${USERAUDIO_ENDPOINT}/${id}`);
            console.log(response.data);
            const addedAudioIDs = response.data.map(userAudio => userAudio.audioId);
            setUserAudioIDs(addedAudioIDs);
            console.log(addedAudioIDs);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAddedAudios();
    }, [])


    return (
        <div className='home-wrapper' id="home-wrapper" >

            <div className="audio-cards-container">
                {audios.map((audio) => (
                    <div key={audio.audioID} className="audio-card">
                        <div className="audio-image" style={{ backgroundImage: `url(${URL}/imgupload/${audio.imageName})` }}>
                            <audio className="audio" controls src={`${URL}/audioupload/${audio.filePath}`}></audio>
                            <h5 className='text'>{audio.title}</h5>
                            <p className='text'>{audio.categoryName}</p>
                        </div>
                        <div className="audio-details">
                            <h3>{audio.title}</h3>
                            <p>{audio.description}</p>
                            <div className='d-flex'>
                                <button
                                    className='addtolist-button'
                                    // value={audio.audioID}
                                    onClick={() => { userAudioIDs.includes(audio.audioID) ? removeFromList(audio.audioID) : addToList(audio.audioID) }}
                                >
                                    {userAudioIDs.includes(audio.audioID) ? <i className="fa-solid fa-minus"></i> : <i className="fa-solid fa-plus"></i>}
                                </button>
                                <button
                                    className='addtolist-button'
                                >
                                    <i class="fa-regular fa-heart"></i>
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="">
            </div>
        </div>
    );


}

export default Home;
