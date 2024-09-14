import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import Homepage from "./pages/Homepage/Homepage";
import MusicalPage from "./pages/Musical/MusicalPage";
import PlayPage from "./pages/Play/PlayPage";
import ConcertPage from "./pages/Concert/ConcertPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import RegionPage from "./pages/Region/RegionPage";
import RankingPage from "./pages/Ranking/RankingPage";
import MySelectPage from "./pages/MySelect/MySelectPage";
import DancePage from "./pages/Dance/DancePage";
import CircusMagicPage from "./pages/CircusMagic/CircusMagicPage";
import CompositePage from "./pages/Composite/CompositePage";
import GugakPage from "./pages/Gugak/GugakPage";
import PublicDancePage from "./pages/PublicDance/PublicDancePage";
import ClassicPage from "./pages/Classic/ClassicPage";
import Login from "./pages/Login/Login";
import { GlobalProvider } from "./pages/DetailPage/GlobalContext";
import PrivateRoute from "./pages/Login/PrivateRoute";
import SearchResultsPage from "./pages/SearchResults/SearchResultsPage"; // 새로 추가된 검색 결과 페이지
// 홈페이지
// 뮤지컬 전체 페이지 /musicals
// 연극 전체 페이지 /theaters
// 콘서트 전체 페이지 /concerts
// 공연 상세 페이지 /goods/:id
// 지역별 페이지 /regions
// 랭킹 페이지 /rankings
// 나의 찜 페이지 /my-select
function App() {
  const [authenticate, setAuthenticate] = useState(
    localStorage.getItem("authenticate") === "true" || false
  ); // 로그인 성공 유무

  useEffect(() => {
    console.log("Check Login :", authenticate);
    localStorage.setItem("authenticate", authenticate);
  }, [authenticate]);

  return (
    <GlobalProvider>
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout
              authenticate={authenticate}
              setAuthenticate={setAuthenticate}
            />
          }
        />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route
            path="/login"
            element={<Login setAuthenticate={setAuthenticate} />}
          />
          <Route
            path="/play"
            element={
              <PrivateRoute authenticate={authenticate}>
                <PlayPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/musical"
            element={
              <PrivateRoute authenticate={authenticate}>
                <MusicalPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/concert"
            element={
              <PrivateRoute authenticate={authenticate}>
                <ConcertPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dance"
            element={
              <PrivateRoute authenticate={authenticate}>
                <DancePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/publicdance"
            element={
              <PrivateRoute authenticate={authenticate}>
                <PublicDancePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/classic"
            element={
              <PrivateRoute authenticate={authenticate}>
                <ClassicPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/gugak"
            element={
              <PrivateRoute authenticate={authenticate}>
                <GugakPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/circusmagic"
            element={
              <PrivateRoute authenticate={authenticate}>
                <CircusMagicPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/composite"
            element={
              <PrivateRoute authenticate={authenticate}>
                <CompositePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/goods/:id"
            element={
              <PrivateRoute authenticate={authenticate}>
                <DetailPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/region"
            element={
              <PrivateRoute authenticate={authenticate}>
                <RegionPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/ranking"
            element={
              <PrivateRoute authenticate={authenticate}>
                <RankingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-select"
            element={
              <PrivateRoute authenticate={authenticate}>
                <MySelectPage />
              </PrivateRoute>
            }
          />
          <Route path="/play" element={<PlayPage />} />
          <Route path="/musical" element={<MusicalPage />} />
          <Route path="/concert" element={<ConcertPage />} />
          <Route path="/dance" element={<DancePage />} />
          <Route path="/publicdance" element={<PublicDancePage />} />
          <Route path="/classic" element={<ClassicPage />} />
          <Route path="/gugak" element={<GugakPage />} />
          <Route path="/circusmagic" element={<CircusMagicPage />} />
          <Route path="/composite" element={<CompositePage />} />
          <Route path="/goods/:id" element={<DetailPage />} />
          <Route path="/region" element={<RegionPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/my-select" element={<MySelectPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
        </Route>
      </Routes>
    </GlobalProvider>
  );
}

export default App;
