import React, { useState } from 'react';
// import {useNavigate} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import '../../styles/Signup.css';

const Signup = () => {

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNUmber] = useState("");
    const [password, setPassword] = useState("");

    // const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let signupValues = { username, email, phoneNumber, password }
        const asyncFunc = async () => {
            const config = {
                headers: {
                    'content-type':'application/json'
                }
            }
            await axios.post(`http://localhost:3001/users`, JSON.stringify({...signupValues}), config)
                .then(res => {
                    alert("Registered Successfully", res)
                })
                .catch(err => {
                    alert(err)
                })
        }
        asyncFunc();

    }

    return (
        <div className='signup'>
            <div className='container'>
                <form className='signupForm mt-5 mb-5 w-60 shadow-lg p-4' style={{ marginLeft: '20%' }} onSubmit={handleSubmit}>
                    <div style={{ fontSize: '25px', fontWeight: 680, textAlign: 'center' }}>Signup</div>
                    <div className='float-start mt-3' style={{ width: '49%' }}>
                        <TextField id="outlined-basic" value={username} onChange={(e) => setUserName(e.target.value)} label="User Name" variant="outlined" className='w-100' />
                    </div>
                    <div className='float-start mt-3' style={{ width: '49%', marginLeft: '2%' }}>
                        <TextField id="outlined-basic" value={email} onChange={(e) => setEmail(e.target.value)} label="Email Id" variant="outlined" className='w-100' />
                    </div>
                    <div className='float-start mt-3' style={{ width: '49%' }}>
                        <TextField id="outlined-basic" value={phoneNumber} onChange={(e) => setPhoneNUmber(e.target.value)} label="phoneNumber" variant="outlined" className='w-100' />
                    </div>
                    <div className='float-start mt-3' style={{ width: '49%', marginLeft: '2%' }}>
                        <TextField id="outlined-basic" value={password} onChange={(e) => setPassword(e.target.value)} label="Password" variant="outlined" className='w-100' />
                    </div>
                    <button className='signup-btn w-100 mt-3' style={{ height: '45px' }}>SIGNUP</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;