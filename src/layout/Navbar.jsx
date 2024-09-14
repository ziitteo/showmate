import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import "./Navbar.style.css";
import "./Hamburger.style.css"

const Navbar = ({ authenticate, setAuthenticate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  // value for humburger toggle 
  const [rightOpen, setRightOpen] = useState(false);

  const genres = [
    "연극",
    "뮤지컬",
    "콘서트",
    "서양/한국무용",
    "대중무용",
    "클래식",
    "국악",
    "서커스/마술",
    "복합예술공연",
  ];
  const genres_eng = [
    "play",
    "musical",
    "concert",
    "dance",
    "publicdance",
    "classic",
    "gugak",
    "circusmagic",
    "composite",
  ];
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

  const handleLogout = () => {
    setAuthenticate(false); // 로그아웃 처리
    navigate("/");
  };
  return (
    <Container>

      <div className="nav-top">
        <a className="nav-logo" href="/">
          <img width="200px" src={"/text-wide.jpeg"} alt="logo" />
        </a>
        <a className="nav-logo-mobile" href="/">
          <img width="200px" src={"/icon-logo.png"} alt="logo" />
        </a>
        <form onSubmit={handleSearch} className="nav-input">
          <div className="nav-input-box">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <img
              width="50px"
              src="https://static.vecteezy.com/system/resources/previews/009/652/218/non_2x/magnifying-glass-icon-isolated-on-white-background-search-illustration-vector.jpg"
              alt="search-icon"
              className="nav-search-icon"
              onClick={handleSearch}
            />
          </div>
        </form>
        <div className="nav-top-items">
          <button 
            className="nav-favorite-button"
            onClick={() => handleGenreClick("my-select")}
          >
            ☆
          </button>

          {/* 사이드바 */}
          <div  className={`sidenav ${rightOpen ? 'open' : ''}`} tag="nav">
            <span href="#!" className="closebtn" onClick={() => setRightOpen(false)}>
              &times;
            </span>
            {genres.map((genre, idx) => (
              <span
                key={idx}
                onClick={() => handleGenreClick(genres_eng[idx])} // navigate 사용
              >
                {genre}
              </span>
            ))}
            <span className="text-bold" onClick={() => handleGenreClick("ranking")}>랭킹</span>
            <span className="text-bold" onClick={() => handleGenreClick("region")}>지역별</span>
          </div>

          {/* 사이드바 열기 버튼 */}
          <div className="nav-hamburger">
            <MDBBtn onClick={() => setRightOpen(!rightOpen)}>
              <MDBIcon icon='hamburger' />
            </MDBBtn>
          </div>

          {authenticate ? (
            <a href="#" onClick={handleLogout}>
              로그아웃
            </a>
          ) : (
            <a href="/login">로그인</a>
          )}
          <span onClick={() => handleGenreClick("my-select")}>
            내가 찜한 리스트
          </span>
        </div>
      </div>
      <div className="nav-bottom">
        {genres.map((genre, idx) => (
          <span
            key={idx}
            onClick={() => handleGenreClick(genres_eng[idx])} // navigate 사용
          >
            {genre}
          </span>
        ))}
        <a className="text-gray"> | </a>
        <span
          onClick={() => handleGenreClick("ranking")}
          className="main-color"
        >
          랭킹
        </span>
        <span onClick={() => handleGenreClick("region")} className="main-color">
          지역별
        </span>
      </div>
    </Container>
  );
};

export default Navbar;
