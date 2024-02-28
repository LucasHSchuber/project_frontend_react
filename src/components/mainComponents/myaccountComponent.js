import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Howl } from 'howler';
import { Modal } from 'react-bootstrap';
import { useAuth } from '../../assets/js/AuthContext';

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
    const [hidePassword, setHidePassword] = useState(true);
    const [showValidationMessage, setShowValidationMessage] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');

    const [openModal, setOpenModal] = useState(false);
    const [deleteAccountModal, setDeleteAccountModal] = useState(false);

    const [newEmail, setNewEmail] = useState("");
    const [newName, setNewName] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState({
        deleteAccount: "",
        updatePassword: "",
        updatePersonalInfo: "",
        personalInfoValidation: "",
        passwordValidation: ""
    })

    const { updateAuthStatus } = useAuth();

    const Navigate = useNavigate();

    //addeventlisters



    const fetchAvatars = async () => {
        try {
            const response = await axios.get(`${URL}/${AVATAR_ENDPOINT}`);
            console.log(response.data);
            setAvatars(response.data)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchAvatars();
    }, [])

    //When user selects an avatar
    const selectedAvatar = async (avatarid) => {

        let userid = sessionStorage.getItem("userid");
        console.log(userid);
        console.log(avatarid);

        try {
            const response = await axios.post(`${URL}/${USER_ENDPOINT}/avatar?avatar=${avatarid}&userid=${userid}`);
            console.log(response.data);
            setOpenModal(!openModal)
            updateAuthStatus(true);
            fetchUser();

        } catch (error) {
            console.log(error);
        }
    }
    //reload page after choosen avatar to update header avatar
    const handleReload = () => {
        setValidationMessage('Avatar updated succesfully <i class="fa-solid fa-check-double"></i>')
        setShowValidationMessage(true);
        setTimeout(() => {
            setShowValidationMessage(false);
            window.location.reload();
        }, 1200);
    };



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

        //checks so input fields are not empty
        if (newEmail != "" || newUsername != "" || newName != "") {

            // eslint-disable-next-line no-restricted-globals
            if (confirm("Are you sure you want to update the following field(s):\n\n" +
                (newEmail != "" ? "New email: " + newEmail + "\n" : "") +
                (newUsername != "" ? "New username: " + newUsername + "\n" : "") +
                (newName != "" ? "New name: " + newName + "\n" : "")
            )) {
                try {
                    const response = await axios.put(`${URL}/${USER_ENDPOINT}/${id}`, data);
                    console.log(response.data);
                    setNewEmail("");
                    setNewName("");
                    setNewUsername("");
                    fetchUser();

                    setShowValidationMessage(true);
                    setValidationMessage('User updated succesfully <i class="fa-solid fa-check-double"></i>')
                    setTimeout(() => {
                        setShowValidationMessage(false);
                    }, 5000);

                    updateAuthStatus(true);
                    setError({ ...error, personalInfoValidation: "" });


                } catch (error) {
                    console.log(error);
                    setError({ ...error, personalInfoValidation: error.response.data });
                }
            } else {
                console.log("Canceled delete account");
            }
        } else {
            setError({ ...error, updatePersonalInfo: "Invalid input" });
            return;
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
        if (newPassword === "") {
            setError({ ...error, updatePassword: "Invalid input" });
            return;
        }
        try {
            const response = await axios.put(`${URL}/${USER_ENDPOINT}/${id}`, data);
            console.log(response.data);
            setNewPassword("");

            setShowValidationMessage(true);
            setValidationMessage('Password updated succesfully <i class="fa-solid fa-check-double"></i>')
            setTimeout(() => {
                setShowValidationMessage(false);
            }, 5000);

            fetchUser();
            setError({...error, passwordValidation: ""})


        } catch (error) {
            console.log(error);
            setError({...error, passwordValidation: error.response.data})
        }
    };

    const toggleDeleteAccountModal = () => {
        setDeleteAccountModal(!deleteAccountModal);
    }
    //delete user account
    const deleteAccount = async () => {
        let id = sessionStorage.getItem("userid");
        if (confirmPassword !== null && confirmPassword !== "") {
            try {
                const response = await axios.delete(`${URL}/${USER_ENDPOINT}/${id}?passwordConfirm=${confirmPassword}`);
                console.log(response.data);

                sessionStorage.removeItem('token');
                sessionStorage.removeItem('userid');

                Navigate("/");

            } catch (error) {
                console.log(error);
                setConfirmPassword("");
                setError({ ...error, deleteAccount: error.response.data });
            }
        } else {
            setError({ ...error, deleteAccount: "Invalid input" });

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
    const toggleAvatarModal = () => {
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

                            {error.personalInfoValidation && (
                                <div className='d-flex justify-content-end'>
                                    <ul className='error my-3 mx-5'>
                                        <li>{error.personalInfoValidation}</li>
                                    </ul>
                                </div>
                            )}

                            {userInfo && userInfo.avatar && (
                                <div key={userInfo.userId}>
                                    <div className='d-flex input-box justify-content-end'>
                                        <label> {userInfo.email}</label>
                                        <input className={`account-input mb-3 mb-md-0 ${error.updatePersonalInfo ? "error border-error" : ""}`} type="email" id="email" name="email" required placeholder={error.updatePersonalInfo ? error.updatePersonalInfo : "Change email"} value={newEmail} onChange={(e) => setNewEmail(e.target.value)} onFocus={() => setError({ ...error, updatePersonalInfo: "" })} />
                                    </div>
                                    <div className='d-flex input-box justify-content-end'>
                                        <label>Name: {userInfo.name}</label>
                                        <input className={`account-input mb-3 mb-md-0 ${error.updatePersonalInfo ? "error border-error" : ""}`} type="text" id="name" name="name" required placeholder={error.updatePersonalInfo ? error.updatePersonalInfo : "Change name"} value={newName} onChange={(e) => setNewName(e.target.value)} onFocus={() => setError({ ...error, updatePersonalInfo: "" })} />
                                    </div>
                                    <div className='d-flex input-box justify-content-end'>
                                        <label>Username: {userInfo.username}</label>
                                        <input className={`account-input mb-3 mb-md-0 ${error.updatePersonalInfo ? "error border-error" : ""}`} type="text" id="username" name="username" required placeholder={error.updatePersonalInfo ? error.updatePersonalInfo : "Change username"} value={newUsername} onChange={(e) => setNewUsername(e.target.value)} onFocus={() => setError({ ...error, updatePersonalInfo: "" })} />
                                    </div>
                                    <button className='normal-button my-1' style={{ float: "right" }} onClick={updateUser}>Update</button>
                                </div>
                            )}

                        </div>
                    </div>
                    <div className='mt-5 mb-3'>
                        {userInfo.avatar && (
                            <div key={userInfo.userId} className='my-4'>
                                <img className="settings-avatar-image" src={`${URL}/imgupload/${userInfo.avatar.avatarImageName}`} alt="Avatar" />
                                <button className="link-button mx-3" onClick={toggleAvatarModal}>Change&nbsp;<i class="fa-solid fa-right-left"></i></button>
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

                                {error.passwordValidation && (
                                    <div className='d-flex justify-content-end'>
                                        <ul className='error my-3 mx-5'>
                                            <li>{error.passwordValidation}</li>
                                        </ul>
                                    </div>
                                )}

                                {userInfo && (
                                    <div key={userInfo.userId} className=''>
                                        <div className='d-flex input-box justify-content-end'>
                                            <label>Password: ******** </label>
                                            <input className={`account-input mb-3 mb-md-0 ${error.updatePassword ? "error border-error" : ""}`} placeholder={error.updatePassword ? error.updatePassword : "Change password"} type={hidePassword ? "password" : "text"} id="newpassword" name="newpassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} onFocus={() => setError({ ...error, updatePassword: "" })}
                                            />
                                            <button className='hide-password-toggle' onClick={() => setHidePassword(!hidePassword)}> {hidePassword ? <i class="fa-regular fa-eye"></i> : <i class="fa-regular fa-eye-slash"></i>} </button>
                                        </div>
                                        <div>
                                            <button className='normal-button my-1' style={{ float: "right" }} onClick={updatePassword}>Update password</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='delete-account-box'>
                        <h6><b>Delete account</b></h6>
                        <p><em>Be aware of that once you have deleted your account your account will be lost forever</em></p>
                        <button className='delete-button' onClick={toggleDeleteAccountModal}>Delete account</button>
                    </div>
                </div>

            </div>



            {/* change avatar modal */}
            <Modal show={openModal} onHide={toggleAvatarModal} className='avatar-modal'>
                <Modal.Header className='avatar-modal-header'>
                    <Modal.Title >Change Avatar</Modal.Title>
                    <button type="button" className="close" aria-label="Close" onClick={toggleAvatarModal}>
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
                            <button className="normal-button my-3" type='submit' onClick={() => { selectedAvatar(chosenAvatar); handleReload(); }}>Choose avatar</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* delete account modal */}
            <Modal show={deleteAccountModal} onHide={toggleDeleteAccountModal} className='delete-account-modal'>
                {/* <Modal.Header>
                    <Modal.Title >Delete account</Modal.Title>
                    <button type="button" className="close" aria-label="Close" onClick={toggleDeleteAccountModal}>
                        <i style={{ color: "white" }} class="fa-solid fa-xmark"></i>
                    </button>
                </Modal.Header> */}
                <Modal.Body>
                    <button type="button" className="close" aria-label="Close" onClick={toggleDeleteAccountModal}>
                        <i style={{ color: "white" }} class="fa-solid fa-xmark"></i>
                    </button>
                    <div className='py-md-2'>
                        <h6>To delete your account enter your password and press "delete account" button</h6>
                        <p><em>This action can not be undone</em></p>
                        <input className={`account-input mb-3 mb-md-0 ${error.deleteAccount ? "error border-error" : ""}`} placeholder={error.deleteAccount ? error.deleteAccount : "Your password"} type="password" id="confirmpassword" name="confirmpassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onFocus={() => setError({ ...error, deleteAccount: "" })} />
                        {error.deleteAccount == "Incorrect password" && (
                            <ul className='error my-2'>
                                <li>{error.deleteAccount}</li>
                            </ul>
                        )}
                    </div>
                    <div>
                        <button className="delete-button my-md-2" type='submit' style={{ width: "100% " }} onClick={deleteAccount}>Delete account</button>
                    </div>
                    {/* <div>
                        <button className="normal-button my-2" type='submit' onClick={toggleDeleteAccountModal} >Close <i class="fa-solid fa-xmark"></i></button>
                    </div> */}
                </Modal.Body>
            </Modal>



            {showValidationMessage && (
                <div className="validation-message" dangerouslySetInnerHTML={{ __html: validationMessage }} />
            )}



        </div >

    );


}

export default Myaccount;
