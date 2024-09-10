import { Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './layout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import MusicalPage from './pages/Musicals/MusicalPage';
import PlayPage from './pages/Plays/PlayPage';
import ConcertPage from './pages/Concerts/ConcertPage';
import DetailPage from './pages/Detail/DetailPage';
import RegionPage from './pages/Region/RegionPage';
import RankingPage from './pages/Ranking/RankingPage';
import MySelectPage from './pages/MySelect/MySelectPage';
import 'bootstrap/dist/css/bootstrap.min.css';

// 홈페이지
// 뮤지컬 전체 페이지 /musicals
// 연극 전체 페이지 /theaters
// 콘서트 전체 페이지 /concerts
// 공연 상세 페이지 /goods/:id
// 지역별 페이지 /regions
// 랭킹 페이지 /rankings
// 나의 찜 페이지 /my-select
function App() {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<Homepage />} />
        <Route path='/musical' element={<MusicalPage />} />
        <Route path='/play' element={<PlayPage />} />
        <Route path='/concert' element={<ConcertPage />} />
        <Route path='/goods' element={<DetailPage />} />
        <Route path='/region' element={<RegionPage />} />
        <Route path='/ranking' element={<RankingPage />} />
        <Route path='/my-select' element={<MySelectPage />} />
      </Route>
    </Routes>
  );
}

export default App;
