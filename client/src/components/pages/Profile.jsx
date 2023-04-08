import React, { useEffect, useState } from 'react';
import { logoutSuccess } from '../../slices/loginSlice';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Loading from '../plugins/Loading';
import '../../styles/Profile.css';

const Profile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userValue, setUserValue] = useState();

    const { id } = useParams();

    useEffect(() => {
        const asyncFunc = async () => {
            await axios.get(`http://localhost:3001/users/${id}`).then(response => {
                let user = [];
                const res = response.data;
                user.push(res);
                setUserValue(user[0])
            })
        }
        asyncFunc();
    }, [id])

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logoutSuccess());
        navigate('/');
        localStorage.removeItem('userKey');
        window.location.reload()
    }

    return (
        <div>
            {
                userValue === undefined ? (
                    <Loading />
                ) : (
                    <div className='profile'>
                        <div className='container'>
                            <div className='user-profile-container'>
                                <div className='user-img-container'>
                                    <img src={userValue.img} alt={userValue.username} className='user-img' />
                                </div >
                                <div className='user-details-container'>
                                    <div className='container'>
                                        <div className='user-username'><span className='userValue-key'>User Name: </span>{userValue.username}</div >
                                        <div className='user-email'><span className='userValue-key'>Email: </span>{userValue.email}</div >
                                        <div className='user-phonenumber'><span className='userValue-key'>Phone Number: </span>{userValue.phoneNumber}</div>
                                        <button className='address-btn' onClick={() => navigate('/address')}>Address</button>
                                        <button onClick={handleLogout} className='logout-btn'>Logout</button>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div >
                )
            }
        </div>

    )
}

export default Profile;