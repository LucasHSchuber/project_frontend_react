import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Howl } from 'howler';
import { Modal } from 'react-bootstrap';

//import images
import img1 from '../../assets/images/space2.jpg';
import logo from '../../assets/images/pray.png';

//import gifs
// import gif1 from '../../assets/gifs/soundwave.gif';

// Importing api url and enpoints
import { URL, USERAUDIO_ENDPOINT, AUDIO_ENDPOINT } from '../../api';

//import css
import '../../assets/css/main.css';
import '../../assets/css/buttons.css';
import '../../assets/css/global.css';



//start apge
function Home() {

    //define states
    const [audios, setAudios] = useState([]);
    const [userAudioIDs, setUserAudioIDs] = useState([]);
    const [showHeroDetails, setShowHeroDetails] = useState(true);
    const [minimizeBox, setMinimizeBox] = useState(true);
    const [playingAudio, setPlayingAudio] = useState("");
    const [audiosByCategory, setAudiosByCategory] = useState([]);
    const [randomInt, setRandomInt] = useState(0);

    //modal states
    const [openModal, setOpenModal] = useState(false);
    const [modalAudio, setModalAudio] = useState([]);




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
        fetchAudios();
        getAddedAudios();
        fetchAudiosByCategory();
    }, [])


    useEffect(() => {
        const timout = setTimeout(() => {
            setShowHeroDetails(false);
        }, 3000);
        const timout2 = setTimeout(() => {
            setMinimizeBox(false);
        }, 4000);
    }, []);


    const handleAudioPlay = (audioid) => {
        if (playingAudio !== null && playingAudio !== audioid) {
            console.log("Audio file has changed");
            setPlayingAudio(null);
        }
        console.log("Music started playing" + audioid);
        setPlayingAudio(audioid);
    };
    const handleAudioPause = (audioid) => {
        console.log("Music paused playing" + audioid);
        setPlayingAudio(null);
    };



    //get random int to display on hero
    useEffect(() => {
        const indexInt = Math.floor(Math.random() * audios.length);
        setRandomInt(indexInt);
    }, [audios])


    //open info modal
    const openInfoModal = (audio) => {
        setOpenModal(!openModal);
        setModalAudio(audio);
    }




    return (
        <div className='home-wrapper' id="home-wrapper" >

            {/* Hero Section */}
            {audios.length > 0 && (
                <div className="hero-section" style={{ backgroundImage: `url(${URL}/imgupload/${audios[randomInt].imageName})` }}>
                    <div className="hero-details">

                        {/* indicating on playing sound */}
                        <div className='d-flex'>
                            <h1>{audios[randomInt].title}</h1>
                        </div>

                        <div className={`hero-part-details ${!showHeroDetails ? 'hidden' : ''} ${!minimizeBox ? 'hiddenbox' : ''}`} id='hero-part-details'>
                            <p>{audios[randomInt].categoryName}</p>
                            <p>{audios[randomInt].description}</p>
                        </div>

                        <div className='hero-audio-box'>
                            <audio id="hero-audio" className={`hero-audio ${!minimizeBox ? 'hiddenbox' : ''}`} controls autoPlay src={`${URL}/audioupload/${audios[randomInt].filePath}`}
                                onPause={() => handleAudioPause(audios[randomInt].audioID)}
                                onPlay={() => handleAudioPlay(audios[randomInt].audioID)}
                            ></audio>
                        </div>
                        <div className='d-flex mt-2'>
                            <button
                                // value={audio.audioID}
                                className='addtolist-button'
                                onClick={() => { userAudioIDs.includes(audios[randomInt].audioID) ? removeFromList(audios[randomInt].audioID) : addToList(audios[randomInt].audioID) }}
                            >
                                {userAudioIDs.includes(audios[randomInt].audioID) ? <i className="fa-solid fa-minus"></i> : <i className="fa-solid fa-plus"></i>}
                            </button>
                            <button
                                className='addtolist-button'
                            >
                                <i class="fa-regular fa-heart"></i>
                            </button>
                            <button
                                className='moreinfo-button'
                                onClick={() => {
                                    openInfoModal(audios[randomInt]);
                                    fetchAudiosByCategory(audios[randomInt].categoryName);
                                }
                                }
                            >
                                More info &nbsp; <i class="fa-solid fa-chevron-down"></i>
                            </button>
                        </div>

                    </div>
                    {playingAudio === audios[randomInt].audioID && (
                        <div className='soundwave-gif'>
                            <iframe style={{ marginTop: "1em" }} src="https://giphy.com/embed/CpDS8OlJaV3MLsjROZ" width="50" height="70" frameBorder="0" class="giphy-embed" allowFullScreen></iframe> 
                        </div>
                    )}
                </div>
            )}



            {/* Cards containers */}
            <div className="audio-cards-container">
                {audios.map((audio) => (
                    <div key={audio.audioID} className="audio-card">
                        <div className="audio-image" style={{ backgroundImage: `url(${URL}/imgupload/${audio.imageName})` }}>
                            <audio className="audio" controls src={`${URL}/audioupload/${audio.filePath}`}
                                onPause={() => handleAudioPause(audio.filePath)}
                                onPlay={() => handleAudioPlay(audio.filePath)}
                            ></audio>
                            <div className='audio-image-text'>
                                <h5 className='text'>{audio.title}</h5>
                                <p className='text'>{audio.categoryName}</p>
                            </div>
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


            {/* Audio info modal */}
            {modalAudio && (
                <Modal show={openModal} onHide={openInfoModal} className='info-modal'>
                    {/* <Modal.Header>
                        <Modal.Title>{modalAudio.title}</Modal.Title>
                        <button type="button" className="close" aria-label="Close" onClick={openInfoModal}>
                            <i style={{ color: "white" }} class="fa-solid fa-xmark"></i>
                        </button>
                    </Modal.Header> */}
                    <Modal.Body className='info-modal-body'>
                        <button type="button" className="close-button info-modal-close" aria-label="Close" onClick={() => {
                            openInfoModal();
                            setAudiosByCategory([]);
                        }}
                        >
                            <i style={{ color: "white" }} class="fa-solid fa-xmark"></i>
                        </button>

                        <img
                            src={`${URL}/imgupload/${modalAudio.imageName}`}
                            alt={modalAudio.audioID}
                        />

                        <div className='d-flex py-3'>
                            <div className='info-modal-content'>
                                <h5 className="title">{modalAudio.title}</h5>
                                <p className="category"> {modalAudio.categoryName}</p>
                                <p className="description">{modalAudio.description}</p>
                            </div>
                            <div className='info-modal-content'>

                                <audio className="" controls src={`${URL}/audioupload/${modalAudio.filePath}`}></audio>

                                <div className='d-flex'>
                                    <button
                                        className='addtolist-button'
                                        // value={audio.audioID}
                                        onClick={() => { userAudioIDs.includes(modalAudio.audioID) ? removeFromList(modalAudio.audioID) : addToList(modalAudio.audioID) }}
                                    >
                                        {userAudioIDs.includes(modalAudio.audioID) ? <i className="fa-solid fa-minus"></i> : <i className="fa-solid fa-plus"></i>}
                                    </button>
                                    <button
                                        className='addtolist-button'
                                    >
                                        <i class="fa-regular fa-heart"></i>
                                    </button>
                                </div>

                            </div>
                        </div>

                        {audiosByCategory.length > 1 && (
                            <div className='px-4 py-5'>
                                <h4 className='mb-4'>Other meditations you might like</h4>
                                {/* Cards containers in Modal */}
                                <div className="audio-cards-container">
                                    {audiosByCategory.filter(categoryAudio => categoryAudio.audioID !== modalAudio.audioID).map((categoryAudio) => (
                                        <div key={categoryAudio.audioID} className="audio-card">
                                            <div className="audio-image" style={{ backgroundImage: `url(${URL}/imgupload/${categoryAudio.imageName})` }}>
                                                <audio className="audio" controls src={`${URL}/audioupload/${categoryAudio.filePath}`}></audio>
                                                <div className='audio-image-text'>
                                                    <h5 className='text'>{categoryAudio.title}</h5>
                                                    <p className='text'>{categoryAudio.categoryName}</p>
                                                </div>
                                            </div>
                                            <div className="audio-details">
                                                <h3>{categoryAudio.title}</h3>
                                                <p>{categoryAudio.description}</p>
                                                <div className='d-flex'>
                                                    <button
                                                        className='addtolist-button'
                                                        // value={audio.audioID}
                                                        onClick={() => { userAudioIDs.includes(categoryAudio.audioID) ? removeFromList(categoryAudio.audioID) : addToList(categoryAudio.audioID) }}
                                                    >
                                                        {userAudioIDs.includes(categoryAudio.audioID) ? <i className="fa-solid fa-minus"></i> : <i className="fa-solid fa-plus"></i>}
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
                        )}

                    </Modal.Body>
                </Modal>
            )}

        </div >
    );


}

export default Home;
