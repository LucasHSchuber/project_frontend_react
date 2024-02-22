import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Howl } from 'howler';

//import images
import img1 from '../../assets/images/space2.jpg';

// Importing api url and enpoints
import { URL, BASE_URL, BASE_URL2, AUDIO_ENDPOINT, CATEGORY_ENDPOINT, INFORMATION_ENDPOINT, UNIT_ENDPOINT } from '../../api';

//import css
import '../../assets/css/main.css';
import '../../assets/css/buttons.css';
import '../../assets/css/global.css';

//import api.js



//start apge
function Home() {

    //define states
    const [audios, setAudios] = useState([]);


    const fetchAudios = async () => {

        try {
            const response = await axios.get("http://localhost:5111/api/audioapi");
            console.log(response.data);
            setAudios(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAudios();
    }, [])

    console.log(`${URL}/imgupload/${audios.ImageName}`);

    

    return (
        <div className='home-wrapper' id="home-wrapper" >

            {/* <img src={img1} className="bg-video" alt='bg video' style={{ opacity: '0.9' }}></img> */}

            <div className='home-content'>

                {audios.map((audio) => (
                    <div key={audio.audioID}>
                        <h3>{audio.title}</h3>
                        <h3>{audio.description}</h3>
                        <audio class="audio my-4" controls src={`${URL}/audioupload/${audio.filePath}`}></audio>
                        <img className='audio-image' src={`${URL}/imgupload/${audio.imageName}`} alt={audio.audioID} />
                    </div>
                ))}
            </div>

            <div class="">
            </div>

        </div>
    );


}

export default Home;
