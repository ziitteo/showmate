import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppLayout from './layout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import MusicalPage from './pages/Musical/MusicalPage';
import PlayPage from './pages/Play/PlayPage';
import ConcertPage from './pages/Concert/ConcertPage';
import DetailPage from './pages/Detail/DetailPage';
import RegionPage from './pages/Region/RegionPage';
import RankingPage from './pages/Ranking/RankingPage';
import MySelectPage from './pages/MySelect/MySelectPage';
import DancePage from './pages/Dance/DancePage';
import CircusMagicPage from './pages/CircusMagic/CircusMagicPage';
import CompositePage from './pages/Composite/CompositePage';
import GugakPage from './pages/Gugak/GugakPage';
import PublicDancePage from './pages/PublicDance/PublicDancePage';
import Login from './pages/Login/Login';

// 홈페이지
// 뮤지컬 전체 페이지 /musicals
// 연극 전체 페이지 /theaters
// 콘서트 전체 페이지 /concerts
// 공연 상세 페이지 /goods/:id
// 지역별 페이지 /regions
// 랭킹 페이지 /rankings
// 나의 찜 페이지 /my-select
function App() {
  const [authenticate, setAuthenticate] = useState(false); // 로그인 성공 유무

  useEffect(() => {
    console.log('Check Login :', authenticate);
  }, [authenticate]);

  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<Homepage />} />
        <Route path='/login' element={<Login setAuthenticate={setAuthenticate} />} />
        <Route path='/musical' element={<MusicalPage />} />
        <Route path='/play' element={<PlayPage />} />
        <Route path='/concert' element={<ConcertPage />} />
        <Route path='/dance' element={<DancePage />} />
        <Route path='/circusmagic' element={<CircusMagicPage />} />
        <Route path='/composite' element={<CompositePage />} />
        <Route path='/gugak' element={<GugakPage />} />
        <Route path='/publicdance' element={<PublicDancePage />} />
        <Route path='/goods' element={<DetailPage />} />
        <Route path='/region' element={<RegionPage />} />
        <Route path='/ranking' element={<RankingPage />} />
        <Route path='/my-select' element={<MySelectPage />} />
      </Route>
    </Routes>
  );
}

export default App;
