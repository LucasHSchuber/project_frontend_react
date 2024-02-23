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
            <div className='home-content'>
                {audios.map((audio) => (
                    <div key={audio.audioID}>
                        <h3>{audio.title}</h3>
                        <h3>{audio.description}</h3>
                        <audio className="audio my-4" controls src={`${URL}/audioupload/${audio.filePath}`}></audio>
                        <img className='audio-image' src={`${URL}/imgupload/${audio.imageName}`} alt={audio.audioID} />
                        <p>{audio.audioID}</p>
                        <button
                            // value={audio.audioID}
                            onClick={() => { userAudioIDs.includes(audio.audioID) ? removeFromList(audio.audioID) : addToList(audio.audioID) }}
                        >
                            {userAudioIDs.includes(audio.audioID) ? <i className="fa-solid fa-minus"></i> : <i className="fa-solid fa-plus"></i>}
                        </button>
                    </div>
                ))}
            </div>

            <div>
                {userAudioIDs.map((liked) =>
                    <div key={liked.userAudioId}>{liked.audioId}</div>
                )}
            </div>

            <div className="">
            </div>
        </div>
    );


}

export default Home;
