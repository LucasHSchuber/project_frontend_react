import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Howl } from 'howler';
import { Modal } from 'react-bootstrap';

//import images
import img1 from '../../assets/images/space2.jpg';

// Importing api url and enpoints
import { URL, USERAUDIO_ENDPOINT, AUDIO_ENDPOINT, USER_ENDPOINT, AVATAR_ENDPOINT } from '../../api';

//import css
import '../../assets/css/main.css';
import '../../assets/css/buttons.css';
import '../../assets/css/global.css';

//import api.js



//start apge
function Myaccount() {

    //define states
    const [userInfo, setUserInfo] = useState([]);
    const [avatars, setAvatars] = useState([]);
    const [chosenAvatar, setChosenAvatar] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [userData, setUserData] = useState({
        email: '',
        name: '',
        username: '',
        userinfo: ''
    });


    const fetchAvatas = async () => {
        try {
            const response = await axios.get(`${URL}/${AVATAR_ENDPOINT}`);
            console.log(response.data);
            setAvatars(response.data)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchAvatas();
    }, [])

    //When user selects an avatar
    const selectedAvatar = async (avatarid) => {

        let userid = sessionStorage.getItem("userid");
        console.log(userid);
        console.log(avatarid);

        try {
            const response = await axios.post(`${URL}/${USER_ENDPOINT}/avatar?avatar=${avatarid}&userid=${userid}`);
            console.log(response.data);
            fetchUser(); // load user again to update avatar img
        } catch (error) {
            console.log(error);
        }
    }



    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const updatePersonalInfo = () => {
        // Implement the logic to save changes to personal information
    };




    //fetch user audios
    const fetchUser = async () => {
        let id = sessionStorage.getItem("userid");
        try {
            const response = await axios.get(`${URL}/${USER_ENDPOINT}/${id}`);
            console.log(response.data);
            setUserInfo(response.data);
            console.log(userInfo);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchUser();
    }, [])





    //format date method
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }


    //toggle modal
    const toggleModal = () => {
        setOpenModal(!openModal);
    }




    const handleImgUpload = async (event) => {

        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('img', file);


        let id = sessionStorage.getItem("userid");
        console.log(id);
        console.log('FormData:', formData);

        try {
            const response = await axios.post(`${URL}/${USER_ENDPOINT}/uploadimg/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log(response.data);

        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className='myaccount-wrapper' id="myaccount-wrapper">
            <div className='container'>

                {userInfo && (
                    <div key={userInfo.userId} className='d-flex'>
                        <h3>Your account</h3>
                        <p className='mx-5' style={{ fontWeight: "700", fontSize: "0.85em", marginTop: "0.8em" }} >Member since {formatDate(userInfo.created)}</p>
                    </div>
                )}

                <hr className='hr'></hr>

                {/* Personal Information Section */}
                <div className="personal-info-section d-flex flex-column flex-md-row">
                    <div className="mb-3">
                        <h5>Personal Information</h5>
                        {userInfo.avatar && (
                            <div key={userInfo.userId} className='my-4'>
                                <img className="settings-avatar-image" src={`${URL}/imgupload/${userInfo.avatar.avatarImageName}`} alt="Avatar" />
                                <button onClick={toggleModal}>change</button>
                            </div>
                        )}
                        <div>
                            <label htmlFor="avatarUpload" className="btn btn-primary">Upload picture</label>
                            <input type="file" id="avatarUpload" name="avatarUpload" style={{ display: 'none' }} onChange={handleImgUpload} />
                        </div>
                    </div>
                    <div className="personal-info-labels mb-3 mb-md-0">
                        <div className="form-group">
                            {userInfo && userInfo.avatar && (
                                <div key={userInfo.userId}>
                                    <p> <span>{userInfo.email}</span></p>
                                    <p>Name: <span>{userInfo.name}</span></p>
                                    <p>Username: <span>{userInfo.username}</span></p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="personal-info-values">
                        <div className="form-group">
                            <input className='account-input mb-3 mb-md-0' type="email" id="email" name="email" value={userData.email} onChange={handleInputChange} />
                            <input className='account-input mb-3 mb-md-0' type="text" id="name" name="name" value={userData.name} onChange={handleInputChange} />
                            <input className='account-input mb-3 mb-md-0' type="text" id="username" name="username" value={userData.username} onChange={handleInputChange} />
                        </div>
                    </div>
                </div>

                <hr className='hr'></hr>

                <div className="security-section d-flex flex-column flex-md-row">
                    <div className="mb-3">
                        <h5>Security</h5>
                    </div>
                    <div className="security-labels mb-3 mb-md-0">
                        <div className="form-group">
                            {userInfo && (
                                <div key={userInfo.userId}>
                                    <p>Password: ********</p>

                                </div>
                            )}
                        </div>
                    </div>
                    <div className="security-values">
                        <div className="form-group">
                            <input className='account-input mb-3 mb-md-0' placeholder="Change password" type="email" id="email" name="email" value={userData.password} onChange={handleInputChange} />
                        </div>
                    </div>
                </div>

            </div>





            <Modal show={openModal} onHide={toggleModal}>
                <Modal.Header>
                    <Modal.Title>Change Avatar</Modal.Title>
                    <button type="button" className="close" aria-label="Close" onClick={toggleModal}>
                        <i style={{ color: "white" }} class="fa-solid fa-xmark"></i>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className='row py-4'>
                        {avatars.slice(1).map((avatar) => (
                            <div
                                key={avatar.avatarId}
                                className='col-4 avatar-image-box'
                                value={avatar.avatarId}
                                onClick={() => setChosenAvatar(avatar.avatarId)}
                            >
                                <img
                                    className={`avatar-image ${chosenAvatar === avatar.avatarId ? 'selected-avatar' : ''}`}
                                    src={`${URL}/imgupload/${avatar.avatarImageName}`}
                                    alt={avatar.avatarId}
                                    style={{
                                        filter: chosenAvatar === avatar.avatarId ? 'brightness(100%) drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.9))' : 'none',
                                        transition: 'filter 0.3s ease', // Add a transition for smoother effect
                                    }}
                                />
                            </div>
                        ))}


                        <div style={{ margin: "0 auto" }}>
                            <button className="gradient-button my-3" type='submit' onClick={() => selectedAvatar(chosenAvatar)}>Choose avatar</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>


        </div>

    );


}

export default Myaccount;
