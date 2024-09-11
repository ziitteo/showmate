/* Footer.js 수정 */
import React from 'react';
import './Footer.style.css'; // 스타일을 위한 CSS 파일

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* 상단 메뉴 */}
      <div className="footer-top-menu">
        <ul className="top-menu-list">
          <li><a href="/about">회사소개</a></li>
          <li><a href="/terms">이용약관</a></li>
          <li><a href="/howto">이용방법</a></li>
          <li><a href="/ticketinfo">티켓판매안내</a></li>
          <li><a href="/notice">공지사항</a></li>
          <li><a href="/support">고객센터</a></li>
        </ul>
      </div>

      {/* 하단 정보 */}
      <div className="footer-main">
        <div className="footer-section">
          <h4>(주)인터파크트리플</h4>
          <p>
            주소: 서울 서초구 강남대로 447<br />
            사업자등록번호: 824-81-02515<br />
            통신판매업신고: 2024-서울-서초-2319<br />
            대표이사: 최휘영
          </p>
        </div>
        <div className="footer-section">
          <h4>고객센터</h4>
          <p>
            티켓: 1544-1555<br />
            팩스: 02-830-7807<br />
            이메일: helpdesk@interpark.com<br />
            해외: 02-3479-4399<br />
            국번없이 1544-1555
          </p>
        </div>
        <div className="footer-section">
          <h4>전자금융거래 분쟁처리 담당</h4>
          <p>
            티켓: 1544-1555<br />
            팩스: 02-830-8295<br />
            이메일: intersolution@interpark.com<br />
            개인정보 보호책임자: cpo@interpark.com
          </p>
        </div>
      </div>

      {/* 하단 저작권 표시 */}
      <div className="footer-bottom">
        <p>
          (주)인터파크트리플은 항공사 및 판매자가 제공하는 상품 정보의 외무자적 책임이 없으며, 개별 판매자가 제공하는 상품 정보를 확인하십시오.<br />
          Copyright © InterparkTriple Corp. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
