import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Howl } from 'howler';
import { Modal } from 'react-bootstrap';
import AudioInfoModal from "../../assets/js/AudioInfoModal";

//import images
import logo from '../../assets/images/pray.png';
import img1 from '../../assets/images/space2.jpg';
import sound from '../../assets/images/sound.png';

// Importing api url and enpoints
import { URL, USER_ENDPOINT, USERLIST_ENDPOINT, USERAUDIO_ENDPOINT, AUDIO_ENDPOINT, LIKE_ENDPOINT } from '../../api';

//import css
import '../../assets/css/main.css';
import '../../assets/css/buttons.css';
import '../../assets/css/global.css';



//start apge
function Myfavorite() {
    //define states
    // const [audios, setAudios] = useState([]);
    const [userAudios, setUserAudios] = useState([]);
    const [listedAudios, setListedAudios] = useState([]);
    const [userAudioIDs, setUserAudioIDs] = useState([]);

    const [userFavoriteIDs, setUserFavoriteIDs] = useState([]);

    const [playingAudio, setPlayingAudio] = useState("");
    const [playingAudioList, setPlayingAudioList] = useState([]);

    const [showValidationMessage, setShowValidationMessage] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');

    const [audiosByCategory, setAudiosByCategory] = useState([]);

    //modal states
    const [openModal, setOpenModal] = useState(false);
    const [modalAudio, setModalAudio] = useState([]);






    //fetch all favorite audios 
    const fetchUserAudios = async () => {
        let id = sessionStorage.getItem("userid");
        try {
            const response = await axios.get(`${URL}/${LIKE_ENDPOINT}/${id}/myfavorites`);
            console.log(response.data);
            setUserAudios(response.data);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        // fetchAudios();
        fetchUserAudios();
    }, [])




    // FAVORITE METHODS

    //fetches all already added audios thats on the user list
    const getAddedFavoriteAudios = async () => {

        let id = sessionStorage.getItem("userid");
        console.log(id);

        try {
            const response = await axios.get(`${URL}/${LIKE_ENDPOINT}/${id}`);
            // console.log(response.data);
            const likeAudioIDs = response.data.map(like => like.audioID);
            setUserFavoriteIDs(likeAudioIDs);
            console.log(likeAudioIDs);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAddedFavoriteAudios();
    }, [])


    //adds an audio to the list
    const addToFavoriteList = async (audioid) => {

        let id = sessionStorage.getItem("userid");
        console.log(id);
        console.log(audioid);

        const data = {
            UserId: id,
            AudioId: audioid
        };
        try {
            const response = await axios.post(`${URL}/${LIKE_ENDPOINT}`, data);
            console.log(response.data);
            getAddedFavoriteAudios();

            setShowValidationMessage(true);
            setValidationMessage('Added to favorites <i class="fa-solid fa-check-double"></i>')
            setTimeout(() => {
                setShowValidationMessage(false);
            }, 2000);

        } catch (error) {
            console.log(error);
        }
    }

    //remove an audio from the list
    const removeFromFavoriteList = async (audioId) => {

        let userId = sessionStorage.getItem("userid");
        console.log(userId);
        console.log(audioId);

        try {
            const response = await axios.delete(`${URL}/${LIKE_ENDPOINT}/${userId}/${audioId}`);
            console.log(response.data);
            getAddedFavoriteAudios();
            fetchUserAudios();

            setShowValidationMessage(true);
            setValidationMessage('Removed from favorites <i class="fa-solid fa-check-double"></i>')
            setTimeout(() => {
                setShowValidationMessage(false);
            }, 2000);

        } catch (error) {
            console.log(error);
        }
    }








    // LIST METHODS

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

            setShowValidationMessage(true);
            setValidationMessage('Added to list <i class="fa-solid fa-check-double"></i>')
            setTimeout(() => {
                setShowValidationMessage(false);
            }, 2000);

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
            getAddedAudios();
            fetchUserAudios();

            setShowValidationMessage(true);
            setValidationMessage('Removed from list <i class="fa-solid fa-check-double"></i>')
            setTimeout(() => {
                setShowValidationMessage(false);
            }, 2000);

        } catch (error) {
            console.log(error);
        }
    }




    // autoplay audio 
    const handleAudioPlay = (audioid) => {
        if (!playingAudioList.includes(audioid)) {
            console.log("Music started playing" + audioid);
            setPlayingAudio(audioid);
            setPlayingAudioList([...playingAudioList, audioid]);
        }

        console.log("Music started playing" + audioid);
    };
    const handleAudioPause = (audioid) => {
        if (playingAudioList.includes(audioid)) {
            console.log("Music paused playing" + audioid);
            const audioElement = document.getElementById(`${audioid}`);
            if (audioElement) {
                audioElement.pause(); // Pause the audio
            }


            setPlayingAudio(null);
            setPlayingAudioList(playingAudioList.filter(id => id !== audioid)); // Remove audioid from list
        }
    };
    console.log(playingAudioList);



    //fetches all audios in a specific category
    const fetchAudiosByCategory = async (category) => {

        console.log(category);

        try {
            const response = await axios.get(`${URL}/${AUDIO_ENDPOINT}/bycategory/${category}`);
            console.log(response.data);
            setAudiosByCategory(response.data);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        // fetchAudios();
        getAddedAudios();
        fetchAudiosByCategory();
    }, [])



    //open info modal
    const openInfoModal = (audio) => {
        setOpenModal(!openModal);
        setModalAudio(audio);
    }




    return (
        <div className='mylist-wrapper' id="mylist-wrapper" >
            <div className='mylist-content'>

                <div className='container mb-5'>
                    <h4>My favorites  <i class="fa-regular fa-heart"></i></h4>
                </div>

                <div className="audio-cards-container container">
                    {userAudios.map((audio) => (
                        <div key={audio.audioID} className="audio-card">
                            <div className="audio-image" style={{ backgroundImage: `url(${URL}/imgupload/${audio.imageName})` }}>
                                <audio className="audio" id={audio.audioID} controls src={`${URL}/audioupload/${audio.filePath}`}
                                    onPause={() => handleAudioPause(audio.audioID)}
                                    onPlay={() => handleAudioPlay(audio.audioID)}
                                ></audio>
                                <div className='audio-image-text'>
                                    <h5 className='text'>{audio.title}</h5>
                                    <p className='text'>  <img className="" style={{ width: "18px", marginBottom: "0.4em" }} src={logo} alt="logo img" ></img> {audio.categoryName}</p>
                                </div>
                                <div className='playing-soundwave-cards' style={{ opacity: playingAudioList.includes(audio.audioID) ? 1 : 0, transition: 'opacity 0.5s' }}>
                                    {playingAudioList.includes(audio.audioID) && (
                                        <img src={sound} alt={sound} style={{ width: "30px" }}></img>
                                    )}
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
                                        onClick={() => { userFavoriteIDs.includes(audio.audioID) ? removeFromFavoriteList(audio.audioID) : addToFavoriteList(audio.audioID) }}
                                    >
                                        {userFavoriteIDs.includes(audio.audioID) ? <i class="fa-solid fa-heart-circle-minus"></i> : <i class="fa-regular fa-heart"></i>}
                                    </button>
                                    <button
                                        className='addtolist-button'
                                        onClick={() => {
                                            openInfoModal(audio);
                                            fetchAudiosByCategory(audio.categoryName);
                                        }
                                        }
                                    >
                                        <i class="fa-solid fa-chevron-down"></i>
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* Audio info modal */}
            {openModal && (
                <AudioInfoModal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    openInfoModal={openInfoModal}
                    modalAudio={modalAudio}
                    setAudiosByCategory={setAudiosByCategory}
                    userAudioIDs={userAudioIDs}
                    removeFromList={removeFromList}
                    addToList={addToList}
                    userFavoriteIDs={userFavoriteIDs}
                    removeFromFavoriteList={removeFromFavoriteList}
                    addToFavoriteList={addToFavoriteList}
                    audiosByCategory={audiosByCategory}
                    URL={URL}
                />
            )}

            {showValidationMessage && (
                <div className="validation-message" dangerouslySetInnerHTML={{ __html: validationMessage }} />
            )}

        </div>
    );

}

export default Myfavorite;
