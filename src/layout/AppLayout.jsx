import React, { useState } from 'react';
import './AppLayout.style.css';


const Applayout = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = () => {
    // e.preventDefault();
    // 검색 기능 로직 추가 가능
    // console.log("검색어:", searchTerm);
  };
  return (
    <div>
      <div className='nav-top'>
        <div className='nav-logo-search-area'>
          <img width='200px' src='https://www.creativefabrica.com/wp-content/uploads/2020/04/12/Ticket-Logo-Graphics-3851465-1.jpg'  alt="profile"/>
          <form  onSubmit={handleSearch}>
            <div className='nav-input-box'>
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchTerm}
                onChange={setSearchTerm}
              />
              <img 
                width='50px' 
                src='https://static.vecteezy.com/system/resources/previews/009/652/218/non_2x/magnifying-glass-icon-isolated-on-white-background-search-illustration-vector.jpg'  
                alt="search-icon"
              />
            </div>
          </form>
        </div>  
        <div className='nav-top-items'>
          <a href='#!'>로그인</a>
          <a href='#!'>회원가입</a>
          <a href='#!'>마이페이지</a>
        </div>
      </div>
      <div className='nav-bottom'>

      </div>
    </div>
  )
};

export default AppLayout;
