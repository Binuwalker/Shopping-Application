import React, { useEffect, useState } from 'react';
import '../../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaExclamationCircle } from 'react-icons/fa';
import { AiFillCheckCircle } from 'react-icons/ai';
import { login } from '../../actions/loginAction';
import { loginEmailSuccess, loginPasswordSuccess } from '../../slices/loginSlice';

const Login = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { emailError, emailSuccess, emailErrorMsg, passwordError, passwordSuccess, passwordErrorMsg } = useSelector(state => state.loginState);

  let userValue = localStorage.getItem('userKey');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password, userValue }))
    setData({ email, password })
    if (emailSuccess && passwordSuccess) {
      userValue = JSON.parse(userValue);
      console.log(userValue);
    }
  }

  useEffect(() => {
    if (emailSuccess && passwordSuccess) {
      navigate('/home')
      localStorage.setItem('userKey', JSON.stringify(data))
    }
    if (userValue) {
      dispatch(loginEmailSuccess());
      dispatch(loginPasswordSuccess());
    }

  }, [emailSuccess, passwordSuccess, navigate, data, dispatch, userValue])

  return (
    <div className='login'>
      <div className='container'>
        <div className='login-form-container'>
          <div className='login-dummy'></div>
          <form className='login-form' onSubmit={submitHandler}>
            <div className='container'>
              <div className='login-heading'>LOGIN</div>
              <label className='login-emailLabel'>Email:</label>
              <input
                className='login-emailInput'
                type='text'
                placeholder='Please enter the email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <div>
                <div className='login-emailError'>{emailErrorMsg}</div>
                <div className='login-StatusIcons'>
                  {emailError ? <FaExclamationCircle className='login-StatusIcon-exclamation' /> : null}
                  {emailSuccess ? <AiFillCheckCircle className='login-StatusIcon-check' /> : null}
                </div>
              </div>
              <label className='login-passwordLabel'>Password:</label>
              <input
                className='login-passwordInput'
                type='password'
                placeholder='Please enter the password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <div>
                <div className='login-passwordError'>{passwordErrorMsg}</div>
                <div className='login-StatusIcons'>
                  {passwordError ? <FaExclamationCircle className='login-StatusIcon-exclamation' /> : null}
                  {passwordSuccess ? <AiFillCheckCircle className='login-StatusIcon-check' /> : null}
                </div>
              </div>
              <button className='login-btn'>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;