import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Howl } from 'howler';

//import images
import img1 from '../../assets/images/space2.jpg';

// Importing api url and enpoints
import { URL, USER_ENDPOINT } from '../../api';

//import css
import '../../assets/css/main.css';
import '../../assets/css/buttons.css';
import '../../assets/css/global.css';



//start apge
function Index() {

    //define states
    const [email, setEmail] = useState("");

    const Navigate = useNavigate();



    const checkEmail = async (e) => {
        e.preventDefault();

        console.log(email);

        console.log(`${URL}/${USER_ENDPOINT}/checkEmail`);
        try {
            const response = await axios.post(`${URL}/${USER_ENDPOINT}/checkEmail?email=${email}`);
            console.log(response.data);

            if (response.data.exists == true) {
                Navigate("/login");
            } else {
                Navigate("/newaccount");
            }

        } catch (error) {
            console.log(error);

        }

    }



    return (
        <div className='index-wrapper' id="index-wrapper" >

            <img src={img1} className="bg-video" alt='bg video' style={{ opacity: '0.9' }}></img>

            <div className='index-content'>
                <h1 className='my-3'>Unlimited meditations, whenever and wherever you want.</h1>
                <h4 className='mb-4'>Ready to start? Enter you're email to create or login to your account.</h4>

                <form className="index-form" onSubmit={checkEmail}>
                    <div className='index-input-box'>
                        <label htmlFor='email'>Email</label>
                        <input
                            name='email'
                            type='email'
                            placeholder=''
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </div>

                    <button className='btn index-btn mx-1'>Sign in <i class="fa-solid fa-angles-right"></i> </button>
                </form>
            </div>

            <div class="">
            </div>

        </div>
    );


}

export default Index;
