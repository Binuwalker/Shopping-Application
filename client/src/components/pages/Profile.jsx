import React, { useEffect, useState } from 'react';
import { logoutSuccess } from '../../slices/loginSlice';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Loading from '../plugins/Loading';
import { FaWindows } from 'react-icons/fa';

const Profile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userValue, setUserValue] = useState();

    const { id } = useParams();

    let user = [];

    useEffect(() => {
        const asyncFunc = async () => {
            await axios.get(`http://localhost:3001/users/${id}`).then(response => {
                const res = response.data;
                user.push(res);
                setUserValue(user[0])
            })
        }
        asyncFunc();
    },[])

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
                    <div>
                        <div className='profile'>
                            <div className='container'>
                                <div>{userValue.username}</div >
                                <div>{userValue.email}</div >
                                <button onClick={handleLogout}>Logout</button>
                            </div >
                        </div >
                    </div>)
            }
        </div>

    )
}

export default Profile;