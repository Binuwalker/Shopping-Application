import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutSuccess } from '../../slices/loginSlice';
import './Header.css';

const TopNav = () => {

    const { emailSuccess, passwordSuccess } = useSelector(state => state.loginState);
    const cartCount = JSON.parse(localStorage.getItem('cart-list')) || [];

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let userValue = localStorage.getItem('userKey');

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logoutSuccess());
        navigate('/')
        localStorage.removeItem('userKey')
        if (emailSuccess && passwordSuccess) {
            userValue = JSON.parse(userValue);
        }
    }

    return (
        <div className='navbar-bg'>
            <Navbar expand="lg" className='navBg'>
                <Container>
                    <Link to='/home' className='nav-link nav-Brand'>ShoppyDo</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {(emailSuccess && passwordSuccess) || userValue ? (<Link onClick={handleLogout} className='nav-link navLink'>Logout</Link>)
                                : (<Link to='/' className='nav-link navLink'>Login</Link>)}
                            <Link to='/cart' className='nav-link navLink'>Cart({cartCount.length ? cartCount.length : 0})</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div >
    )
}

export default TopNav