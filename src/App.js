import { Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './layout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import MusicalPage from './pages/Musicals/MusicalPage';
import MusicalDetailPage from './pages/MusicalDetail/MusicalDetailPage';
import TheaterPage from './pages/Theaters/TheaterPage';
import TheaterDetailPage from './pages/TheaterDetail/TheaterDetailPage';
import ConcertPage from './pages/Concerts/ConcertPage';
import ConcertDetailPage from './pages/ConcertDetail/ConcertDetailPage';
import RegionPage from './pages/Region/RegionPage';
import RankingPage from './pages/Ranking/RankingPage';
import MySelectPage from './pages/MySelect/MySelectPage';

// 홈페이지
// 뮤지컬 전체 페이지 /musicals
// 뮤지컬 상세 페이지 /musicals/:id
// 연극 전체 페이지 /theaters
// 연극 상세 페이지 /theaters/:id
// 콘서트 전체 페이지 /concerts
// 콘서트 상세 페이지 /concerts/:id
// 지역별 페이지 /regions
// 랭킹 페이지 /rankings
// 나의 찜 페이지 /my-select
function App() {
  return (
    <Routes>
      <Route path='/' element={AppLayout}>
        <Route index element={<Homepage />} />
        <Route path='/musicals'>
          <Route index element={<MusicalPage />} />
          <Route path=':id' element={<MusicalDetailPage />} />
        </Route>
        <Route path='/theaters'>
          <Route index element={<TheaterPage />} />
          <Route path=':id' element={<TheaterDetailPage />} />
        </Route>
        <Route path='/concerts'>
          <Route index element={<ConcertPage />} />
          <Route path=':id' element={<ConcertDetailPage />} />
        </Route>
        <Route path='/regions' element={<RegionPage />} />
        <Route path='/rankings' element={<RankingPage />} />
        <Route path='/my-select' element={<MySelectPage />} />
      </Route>
    </Routes>
  );
}

export default App;
