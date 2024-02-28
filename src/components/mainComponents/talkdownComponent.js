import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Howl } from 'howler';
//import images
import img1 from '../../assets/images/space2.jpg';
import logo from '../../assets/images/pray.png';
// Importing api url and enpoints
import { URL, USER_ENDPOINT, USERLIST_ENDPOINT, USERAUDIO_ENDPOINT, AUDIO_ENDPOINT } from '../../api';
//import css
import '../../assets/css/main.css';
import '../../assets/css/buttons.css';
import '../../assets/css/global.css';



//start apge
function Talkdown() {
    //define states
    const [audios, setAudios] = useState([]);
    const [listedAudios, setListedAudios] = useState([]);
    const [userAudioIDs, setUserAudioIDs] = useState([]);

    //defining variables etc.
    const CategoryPageName = "talk down";



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
        try {
            const response = await axios.delete(`${URL}/${USERAUDIO_ENDPOINT}/${userId}/${audioId}`);
            console.log(response.data);
            getAddedAudios();
            fetchAudios();
        } catch (error) {
            console.log(error);
        }
    }

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
        // fetchAudios();
        fetchAudios();
        getAddedAudios();
    }, [])



    return (
        <div className='mylist-wrapper' id="mylist-wrapper" >
            <div className='mylist-content'>

                <div className='container mb-5'>
                    <h4>Talk down</h4>
                </div>

                <div className="audio-cards-container container">
                    {audios.filter(natureAudios => natureAudios.categoryName.toLowerCase() === CategoryPageName).map((audio) => (
                        <div key={audio.audioID} className="audio-card">
                            <div className="audio-image" style={{ backgroundImage: `url(${URL}/imgupload/${audio.imageName})` }}>
                                <audio className="audio" controls src={`${URL}/audioupload/${audio.filePath}`}></audio>
                                <div className='audio-image-text'>
                                    <h5 className='text'>{audio.title}</h5>
                                    <p className='text'>  <img className="" style={{ width: "18px", marginBottom: "0.4em" }} src={logo} alt="logo img" ></img> {audio.categoryName}</p>
                                </div>
                            </div>
                            <div className="audio-details">
                                <h3>{audio.title}</h3>
                                <p>{audio.description.length > 50 ? audio.description.substring(0, 50) + "..." : audio.description}</p>
                                <div className='d-flex'>
                                    <button
                                        // value={audio.audioID}
                                        className='addtolist-button'
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
            </div>
        </div>
    );
}
export default Talkdown;
