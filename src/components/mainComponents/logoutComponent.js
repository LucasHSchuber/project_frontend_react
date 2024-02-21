import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { PulseLoader } from 'react-spinners';
import { MoonLoader } from 'react-spinners';
import { RingLoader } from 'react-spinners';



function Logout() {
    // Define states
    const [loading, setLoading] = useState(true);
    const Navigate = useNavigate();

    useEffect(() => {
        // Function to logout user and remove token from sessionStorage
        const logoutUser = () => {
            // Remove token from sessionStorage
            sessionStorage.removeItem('token');

            let token = sessionStorage.getItem("token");
            console.log(token);

            setTimeout(() => {
                setLoading(false);
                Navigate('/index');
            }, 1500);
        };

        // Call the logout function when the component mounts
        logoutUser();
    }, [Navigate]);



    return (
        <div className='logout-wrapper'>
            <div className="" style={{ height: '100vh' }}>
                <h4 className="mt-3 mb-4">Signing out</h4>
                <div>
                    {/* <BeatLoader color="#007bff" loading={loading} className="BeatLoader" />
                    <PulseLoader color="#007bff" loading={loading} size={15} margin={5} /> */}
                    <MoonLoader className="MoonLoader" color="#fff" loading={loading} size={60} />
                    {/* <RingLoader color="#007bff" loading={loading} size={80} margin={10} /> */}
                </div>
            </div>

        </div>

    );
}

export default Logout;
