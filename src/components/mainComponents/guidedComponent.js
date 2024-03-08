import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Howl } from 'howler';
import { Modal } from 'react-bootstrap';

//import images
import img1 from '../../assets/images/space2.jpg';
import logo from '../../assets/images/pray.png';
import sound from '../../assets/images/sound.png';

// Importing api url and enpoints
import { URL, USER_ENDPOINT, USERLIST_ENDPOINT, USERAUDIO_ENDPOINT, AUDIO_ENDPOINT, LIKE_ENDPOINT } from '../../api';
//import css
import '../../assets/css/main.css';
import '../../assets/css/buttons.css';
import '../../assets/css/global.css';



//start apge
function Guided() {
    //defining variables etc.
    const CategoryPageName = "guided";

    //define states
    const [audios, setAudios] = useState([]);
    const [userAudioIDs, setUserAudioIDs] = useState([]);
    const [userFavoriteIDs, setUserFavoriteIDs] = useState([]);

    const [showHeroDetails, setShowHeroDetails] = useState(true);
    const [minimizeBox, setMinimizeBox] = useState(true);
    const [playingAudio, setPlayingAudio] = useState("");
    const [playingAudioList, setPlayingAudioList] = useState([]);
    const [audiosByCategory, setAudiosByCategory] = useState([]);
    const [randomInt, setRandomInt] = useState(0);
    const [screenSize, setScreenSize] = useState(0);

    const [showValidationMessage, setShowValidationMessage] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');

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


    // METHOD LIST

    //fetches all already added audios thats on the user list
    const getAddedAudios = async () => {

        let id = sessionStorage.getItem("userid");
        console.log(id);


        try {
            const response = await axios.get(`${URL}/${USERAUDIO_ENDPOINT}/${id}`);
            console.log(response.data);
            const addedAudioIDs = response.data.map(userAudio => userAudio.audioId);
            setUserAudioIDs(addedAudioIDs);

        } catch (error) {
            console.log(error);
        }
    }
    //adds an audio to the list
    const addToList = async (audioid) => {

        let id = sessionStorage.getItem("userid");

        const data = {
            UserId: id,
            AudioId: audioid
        };
        try {
            const response = await axios.post(`${URL}/${USERAUDIO_ENDPOINT}`, data);
            console.log(response.data);
            getAddedAudios();

            setShowValidationMessage(true);
            setValidationMessage('Added to your list <i class="fa-solid fa-check-double"></i>')
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

        try {
            const response = await axios.delete(`${URL}/${USERAUDIO_ENDPOINT}/${userId}/${audioId}`);
            console.log(response.data);
            getAddedAudios(); // Refresh the list of added audios

            setShowValidationMessage(true);
            setValidationMessage('Removed from your list <i class="fa-solid fa-check-double"></i>')
            setTimeout(() => {
                setShowValidationMessage(false);
            }, 2000);

        } catch (error) {
            console.log(error);
        }
    }





    // FAVORITE METHODS

    //fetches all already added audios thats on the user list
    const getAddedFavoriteAudios = async () => {

        let id = sessionStorage.getItem("userid");

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

        try {
            const response = await axios.delete(`${URL}/${LIKE_ENDPOINT}/${userId}/${audioId}`);
            console.log(response.data);
            getAddedFavoriteAudios();

            setShowValidationMessage(true);
            setValidationMessage('Removed from favorites <i class="fa-solid fa-check-double"></i>')
            setTimeout(() => {
                setShowValidationMessage(false);
            }, 2000);

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

    //Minimize box on hero after time
    useEffect(() => {
        const timout = setTimeout(() => {
            setShowHeroDetails(false);
        }, 3000);
        const timout2 = setTimeout(() => {
            setMinimizeBox(false);
        }, 4000);
    }, []);


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

    //print different amount of cards dependning on window.innerWidth
    useEffect(() => {
        const screenSizeHandler = () => {
            if (window.innerWidth > 1846) {
                setScreenSize(7);
            }
            else if (window.innerWidth > 1588) {
                setScreenSize(6);
            } else if (window.innerWidth > 1320) {
                setScreenSize(5);
            } else {
                setScreenSize(4);
            }
        };

        window.addEventListener("resize", screenSizeHandler);
        screenSizeHandler();

        return () => {
            window.removeEventListener("resize", screenSizeHandler);
        };
    }, []);



    return (
        <div className='mylist-wrapper' id="mylist-wrapper" >
            <div className='mylist-content'>

                <div className='container mb-5'>
                    <h4>Body scan</h4>
                </div>

                <div className="audio-cards-container container">
                    {audios.filter(natureAudios => natureAudios.categoryName.toLowerCase() === CategoryPageName).map((audio) => (
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
                                        className='addtolist-button'
                                        // value={audio.audioID}
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
            {
                modalAudio && (
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
                                    <p className="category"> {modalAudio.categoryName} </p>
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
                                            onClick={() => { userFavoriteIDs.includes(modalAudio.audioID) ? removeFromFavoriteList(modalAudio.audioID) : addToFavoriteList(modalAudio.audioID) }}
                                        >
                                            {userFavoriteIDs.includes(modalAudio.audioID) ? <i class="fa-solid fa-heart-circle-minus"></i> : <i class="fa-regular fa-heart"></i>}
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
                                                    <p>{categoryAudio.description.length > 50 ? categoryAudio.description.substring(0, 50) + "..." : categoryAudio.description}</p>
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
                                                            onClick={() => { userFavoriteIDs.includes(categoryAudio.audioID) ? removeFromFavoriteList(categoryAudio.audioID) : addToFavoriteList(categoryAudio.audioID) }}
                                                        >
                                                            {userFavoriteIDs.includes(categoryAudio.audioID) ? <i class="fa-solid fa-heart-circle-minus"></i> : <i class="fa-regular fa-heart"></i>}
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
                )
            }


            {
                showValidationMessage && (
                    <div className="validation-message" dangerouslySetInnerHTML={{ __html: validationMessage }} />
                )
            }

        </div>
    );
}
export default Guided;
