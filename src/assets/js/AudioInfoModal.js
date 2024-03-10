// Import useState from React
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

// Define the AudioInfoModal function component
const AudioInfoModal = ({ openInfoModal, openModal, setOpenModal, modalAudio, setAudiosByCategory, userAudioIDs, removeFromList, addToList, userFavoriteIDs, removeFromFavoriteList, addToFavoriteList, audiosByCategory, URL }) => {


    return (
        <Modal show={openModal} onHide={() => setOpenModal(false)} className='info-modal'>



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
    );
};
export default AudioInfoModal;
