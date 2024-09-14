import React, { useState } from 'react';
import './Navbar.style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const genres = ['연극', '뮤지컬', '콘서트', '서양/한국무용', '대중무용', '클래식', '국악', '서커스/마술', '복합예술공연'];
  const genres_eng = ['play', 'musical', 'concert', 'dance', 'publicdance', 'classic', 'gugak', 'circusmagic', 'composite'];
  const navigate = useNavigate();

  const handleGenreClick = (genreEng) => {
    navigate(`/${genreEng}`); // 절대 경로로 설정
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    } else {
      navigate(`/search?query=`);
    }
  };

  return (
    <Container>
      <div className='nav-top'>
        <a className='nav-logo' href='/'>
          <img
            width='200px'
            src={'/text-wide.jpeg'}
            alt='logo'
          />
        </a>
        <a className='nav-logo-mobile' href='/'>
          <img
            width='200px'
            src={'/icon-logo.png'}
            alt='logo'
          />
        </a>
        <form onSubmit={handleSearch} className='nav-input'>
          <div className='nav-input-box'>
            <input
              type='text'
              placeholder='검색어를 입력하세요'
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
            />
            <img
              width='50px'
              src='https://static.vecteezy.com/system/resources/previews/009/652/218/non_2x/magnifying-glass-icon-isolated-on-white-background-search-illustration-vector.jpg'
              alt='search-icon'
              className='nav-search-icon'
              onClick={handleSearch}
            />
          </div>
        </form>
        <div className='nav-top-items'>
          <span onClick={() => handleGenreClick('login')}>로그인</span>
          <span onClick={() => handleGenreClick('my-select')}>내가 찜한 리스트</span>
        </div>
      </div>
      <div className='nav-bottom'>
        {genres.map((genre, idx) => (
          <span
            key={idx}
            onClick={() => handleGenreClick(genres_eng[idx])} // navigate 사용
          >
            {genre}
          </span>
        ))}
        <a className='text-gray'> | </a>
        <span onClick={() => handleGenreClick('ranking')} className='main-color'>
          랭킹
        </span>
        <span onClick={() => handleGenreClick('region')} className='main-color'>
          지역별
        </span>

      </div>




    </Container>
  );
};

export default Navbar;
