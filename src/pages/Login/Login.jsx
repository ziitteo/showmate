import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Login.style.css';

const Login = ({ setAuthenticate }) => {
  const navigate = useNavigate();

  const loginUser = event => {
    if (event) {
      event.preventDefault();
    }
    console.log('login user function issue');
    setAuthenticate(true);
    navigate('/');
  };

  return (
    <div className='login-container'>
      <div className='logo-container'>
        <img
          src='https://img.freepik.com/free-photo/human-face-with-music-note-design-3d-rendered-illustration_460848-11274.jpg'
          alt='Showmate icon Logo'
          className='login-logo'
        />
        <img
          src='https://showmate.com.ng/wp-content/uploads/2024/07/Showmate-white-logo-1-1.jpg'
          alt='Showmate text Logo'
          className='login-logo'
        />
      </div>

      <Container className='login-form'>
        <Form onSubmit={event => loginUser(event)}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label className='form-label'>아이디</Form.Label>
            <Form.Control type='email' placeholder='아이디 입력' className='form-control' />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label className='form-label'>비밀번호</Form.Label>
            <Form.Control type='password' placeholder='비밀번호 입력' className='form-control' />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicCheckbox'>
            <Form.Check type='checkbox' label='로그인 상태 유지' className='form-check' />
          </Form.Group>

          <Button variant='danger' type='submit' className='login-button'>
            로그인
          </Button>
        </Form>
      </Container>

      <div className='social-login'>
        <img
          src='https://cdn.imweb.me/upload/S20210304872ba49a108a8/89a68d1e3674a.png'
          alt='Kakao'
          className='social-icon'
          onClick={() => loginUser()}
        />
        <img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPyoXHvqXNUbu5TDiJOFxlcHSlzennwbaQQ&s'
          alt='Naver'
          className='social-icon'
          onClick={() => loginUser()}
        />
        <img
          src='https://e7.pngegg.com/pngimages/180/164/png-clipart-apple-logo-apple-logo-thumbnail.png'
          alt='Apple'
          className='social-icon'
          onClick={() => loginUser()}
        />
      </div>
    </div>
  );
};

export default Login;
