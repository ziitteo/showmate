/* Footer.js 수정 */
import React from 'react';
import './Footer.style.css'; // 스타일을 위한 CSS 파일
import { Container } from 'react-bootstrap';

const Footer = () => {
  const footerItems = ['회사소개', '|', '이용약관', '|', '개인정보처리방침', '|', '위치기반서비스 이용약관', '|', '티켓판매안내', '|', '공지사항', '|', '고객센터', '|', 'Language']

  return (
    <footer>
      {/* 상단 메뉴 */}
      <div className="footer-top-menu">
        <Container className="footer-top-menu-list">
          {footerItems.map((item,idx) => (
            <a 
              href='#!' 
              key={idx} 
              className={`${idx%2 !== 0 ? 'text-gray' : ''}`}
            >
              {item}
            </a>
          ))}
        </Container>
        <Container className="footer-top-menu-list-mobile">
        {footerItems.map((item, idx) => {
          if (idx < 2 || idx > 12 || idx === 7) return null; // idx가 2 미만, 12 초과, 또는 7일 때 제외
          return (
            <React.Fragment key={idx}>
              {idx === 8 && <br />} {/* idx가 8일 때 br 태그 추가 해서 줄바꿈 */}
              <a 
                href='#!' 
                className={`${idx % 2 !== 0 ? 'text-gray' : ''}`}
              >
                {item}
              </a>
            </React.Fragment>
          );
        })}


        </Container>
      </div>

      {/* 하단 정보 */}
      <Container className="footer-main">
        <div className="footer-section1">
          <h4>(주)쇼메이트</h4>
          <p>
            주소: 서울 서초구 강남대로 447<br />
            사업자등록번호: 824-81-02515<br />
            통신판매업신고: 2024-서울-서초-2319<br />
            대표이사: 김빛나
          </p>
        </div>
        <div className="footer-section2">
          <h4>고객센터</h4>
          <p>
            티켓: 1544-1555 | 팩스: 02-830-7807<br />
            이메일: helpdesk@showmate.com<br />
            해외: 02-3479-4399<br />
            국번없이 1544-1555
          </p>
        </div>
        <div className="footer-section3">
          <h4>전자금융거래 분쟁처리 담당</h4>
          <p>
            티켓: 1544-1555 | 팩스: 02-830-8295<br />
            이메일: intersolution@showmate.com<br />
            개인정보 보호책임자: cpo@showmate.com
          </p>
        </div>
      </Container>
      {/* 하단 저작권 표시 */}
      <Container className="footer-bottom">
        <p>
          (주)쇼메이트는 통신판매중개자의 지위를 가지며, 해당상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게 있습니다.
          <br />
          (주)쇼메이트는 통신판매중개자로서 통신판매자가 제공하는 상품 정보의 외무자적 책임이 없으며, 개별 판매자가 제공하는 상품 정보를 확인하십시오.<br />
          개별 판매자가 등록한 오픈마켓 상품에 대해서 (주)쇼메이트는 일체 책임을 지지 않습니다.<br />
          Copyright © ShowMate Corp. All Rights Reserved.
        </p>
      </Container>

    </footer>
  );
};

export default Footer;
