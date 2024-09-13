import React, { useEffect, useRef, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import ItemCard from '../ItemCard/ItemCard';
import './AllItem.style.css';

// data: API에서 받아온 데이터
// fetchNextPage: 다음 페이지 데이터를 가져오는 함수
// hasNextPage: 다음 페이지가 있는지 여부
const AllItem = ({ data, fetchNextPage, hasNextPage }) => {
  // 한 줄에 표시할 아이템 수 (초기값: 5)
  const [itemCount, setItemCount] = useState(5);
  
  // 아이템의 너비를 상태로 저장
  const [itemWidth, setItemWidth] = useState(0);

  // 아이템 간의 간격 설정
  const slideGap = 20;

  // 아이템 리스트를 감싸는 컨테이너 참조 설정
  const containerRef = useRef(null);

  // 무한 스크롤을 감지할 요소 참조 설정
  // observerRef를 IntersectionObserver의 target으로 설정
  const observerRef = useRef(null);

  // 화면 크기 변경 시 아이템 개수와 너비를 계산하는 함수
  const calculateItemWidth = () => {
    // 컨테이너 참조가 존재할 때만 계산
    if (containerRef.current) {
      // 컨테이너의 너비를 가져와서 아이템 너비 계산
      const containerWidth = containerRef.current.clientWidth;
      // 아이템 너비 = (컨테이너 너비 - (아이템 간격 * (아이템 개수 - 1))) / 아이템 개수
      const calculatedWidth = (containerWidth - slideGap * (itemCount - 1)) / itemCount;
      // 화면 크기에 따른 슬라이드 개수
      // 1180px 이상: 5개, 768px 이상: 2개, 768px 미만: 1개
      const newSlideCount = containerWidth >= 1180 ? 5 : containerWidth >= 768 ? 2 : 1;
      // 브라우저 너비에 따라 한 줄에 표시할 아이템 개수 설정
      setItemCount(newSlideCount);
      // 계산된 아이템 너비를 상태로 저장
      setItemWidth(calculatedWidth);
    }
  };

  // 컴포넌트가 마운트될 때 및 브라우저 크기가 변경될 때 아이템 너비를 재계산
  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 아이템 너비 계산
    calculateItemWidth(); // 초기 계산 실행

    // 브라우저 크기가 변경될 때 resize 이벤트를 감지하여 아이템 너비 계산
    window.addEventListener('resize', calculateItemWidth);

    // 컴포넌트 언마운트 시 이벤트 리스너 해제
    return () => window.removeEventListener('resize', calculateItemWidth);
  }, [itemCount]); // itemCount가 변경될 때마다 실행

  // 무한 스크롤을 감지하는 기능: 사용자가 페이지를 스크롤할 때 IntersectionObserver를 사용하여 특정 요소가 보이는지 감지
  useEffect(() => {
    // IntersectionObserver 생성하여 특정 요소가 화면에 보이면 콜백을 실행
    const observer = new IntersectionObserver(
      entries => {
        // 만약 감지된 요소가 화면에 보이고(hasNextPage가 true)
        // 다음 페이지가 있는 경우(fetchNextPage 함수가 존재) 다음 페이지 데이터를 가져옴
        if (entries[0].isIntersecting && hasNextPage) {
          // fetchNextPage 함수를 호출하여 다음 페이지 데이터를 가져옴
          fetchNextPage();
        }
      },
      {
        // threshold: 0이면 요소가 화면에 1px이라도 보이면 콜백 실행
        threshold: 0,
        // rootMargin: '280px'은 뷰포트의 아래에서 280px만큼 떨어진 위치(푸터 높이를 고려하여 설정)
        rootMargin: '280px',
      },
    );

    // observerRef가 존재하면 해당 요소를 감시 대상으로 설정
    if (observerRef.current) {
      // observerRef가 감지될 때 종작
      observer.observe(observerRef.current);
    }

    // 컴포넌트가 언마운트될 때 IntersectionObserver 해제
    return () => {
      if (observerRef.current) {
        // observerRef가 존재하면 해당 요소 감시 종료
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, fetchNextPage]); // hasNextPage 또는 fetchNextPage가 변경될 때마다 실행

  return (
    <div className='all-item-container' ref={containerRef}>
      <div className='item-grid'>
        {/* 데이터를 받아와서 아이템 렌더링 */}
        {Array.isArray(data) && data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} style={{ width: `${itemWidth}px`, marginBottom: '20px' }}>
              <ItemCard item={item} />
            </div>
          ))
        ) : (
          <div></div>
        )}
        {/* 무한 스크롤 감지 요소 */}
        <div ref={observerRef} className='loading-indicator'>
          {hasNextPage ? <Spinner animation='border' variant='warning' /> : ''}
        </div>
      </div>
    </div>
  );
};

export default AllItem;