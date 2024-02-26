import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
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
    // const [userData, setUserData] = useState({
    //     email: '',
    //     name: '',
    //     username: '',
    //     password: ''
    // });
    const [newEmail, setNewEmail] = useState("");
    const [newName, setNewName] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");


    const Navigate = useNavigate();

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


    //update user info
    const updateUser = async () => {
        let id = sessionStorage.getItem("userid");
        const data = {
            UserId: id,
            Email: newEmail,
            Username: newUsername,
            Name: newName
        };
        console.log(data);
        try {
            const response = await axios.put(`${URL}/${USER_ENDPOINT}/${id}`, data);
            console.log(response.data);
            setNewEmail("");
            setNewName("");
            setNewUsername("");

        } catch (error) {
            console.log(error);
        }
    };

    //update user password
    const updatePassword = async () => {
        let id = sessionStorage.getItem("userid");
        const data = {
            UserId: id,
            PasswordHash: newPassword
        };
        console.log(data);
        try {
            const response = await axios.put(`${URL}/${USER_ENDPOINT}/${id}`, data);
            console.log(response.data);
            setNewPassword("");

        } catch (error) {
            console.log(error);
        }
    };
    //delete user account
    const deleteAccount = async () => {
        let id = sessionStorage.getItem("userid");
        try {
            const response = await axios.delete(`${URL}/${USER_ENDPOINT}/${id}`);
            console.log(response.data);

            sessionStorage.removeItem('token');
            sessionStorage.removeItem('userid');

            Navigate("/index");

        } catch (error) {
            console.log(error);
        }
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




    // const handleImgUpload = async (event) => {

    //     const file = event.target.files[0];
    //     const formData = new FormData();
    //     formData.append('img', file);


    //     let id = sessionStorage.getItem("userid");
    //     console.log(id);
    //     console.log('FormData:', formData);

    //     try {
    //         const response = await axios.post(`${URL}/${USER_ENDPOINT}/uploadimg/${id}`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         })

    //         console.log(response.data);

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }



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
                <div className="personal-info-section">
                    <div className="mb-3">
                        <h5>Personal Information</h5>
                    </div>
                    <div className="personal-info">
                        <div className="form-group">
                            {userInfo && userInfo.avatar && (
                                <div key={userInfo.userId}>
                                    <div className='d-flex input-box'>
                                        <label> {userInfo.email}</label>
                                        <input className='account-input mb-3 mb-md-0' type="email" id="email" name="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                                    </div>
                                    <div className='d-flex input-box'>
                                        <label>Name: {userInfo.name}</label>
                                        <input className='account-input mb-3 mb-md-0' type="text" id="name" name="name" value={newName} onChange={(e) => setNewName(e.target.value)} />
                                    </div>
                                    <div className='d-flex input-box'>
                                        <label>Username: {userInfo.username}</label>
                                        <input className='account-input mb-3 mb-md-0' type="text" id="username" name="username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                                    </div>
                                    <button onClick={updateUser}>Change</button>
                                </div>

                            )}
                        </div>
                    </div>
                    <div>
                        {userInfo.avatar && (
                            <div key={userInfo.userId} className='my-4'>
                                <img className="settings-avatar-image" src={`${URL}/imgupload/${userInfo.avatar.avatarImageName}`} alt="Avatar" />
                                <button className="link-button mx-3" onClick={toggleModal}>Change&nbsp;<i class="fa-solid fa-right-left"></i></button>
                            </div>
                        )}
                    </div>
                </div>

                <hr className='hr'></hr>

                <div className="security-section">
                    <div>
                        <div className="mb-3">
                            <h5>Security</h5>
                        </div>
                        <div className="security-labels">
                            <div className="form-group">
                                {userInfo && (
                                    <div key={userInfo.userId}>
                                        <label>Password: ********</label>
                                        <input className='account-input mb-3 mb-md-0' placeholder="Change password" type="email" id="email" name="email" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                        <button onClick={updatePassword}>Update password</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='delete-account-box'>
                        <h6><b>Delete account</b></h6>
                        <p><em>Be aware of that once you have deleted your account your account will be lost forever</em></p>
                        <button className='delete-button' onClick={deleteAccount}>Delete account</button>
                    </div>
                </div>

            </div>



            {/* change avatar modal */}
            <Modal show={openModal} onHide={toggleModal} className='avatar-modal'>
                <Modal.Header className='avatar-modal-header'>
                    <Modal.Title >Change Avatar</Modal.Title>
                    <button type="button" className="close" aria-label="Close" onClick={toggleModal}>
                        <i style={{ color: "white" }} class="fa-solid fa-xmark"></i>
                    </button>
                </Modal.Header>
                <Modal.Body className='row py-4 avatar-modal-body'>
                    <div className='row py-4 avatar-modal-content' >
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
