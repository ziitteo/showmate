import React, { useEffect, useRef, useState } from 'react';
import ItemCard from '../ItemCard/ItemCard';
import './AllItem.style.css';

const AllItem = ({ data, fetchNextPage, hasNextPage }) => {
  // 한 줄에 보여 줄 아이템 개수를 상태로 관리 (초기값: 5개)
  const [itemCount, setItemCount] = useState(5);
  // 슬라이드의 px 단위 너비를 상태로 관리
  const [itemWidth, setItemWidth] = useState(0);

  // 아이템 간의 간격을 설정 (20px)
  const slideGap = 20;

  // 아이템 리스트를 감싸는 컨테이너를 참조하기 위한 Ref
  const containerRef = useRef(null);
  // 무한 스크롤을 감지하기 위한 Ref
  const observerRef = useRef(null);

  // 슬라이드 너비 계산 및 브라우저 크기 변경에 따른 재설정
  const calculateItemWidth = () => {
    if (containerRef.current) {
      // 컨테이너 너비를 기준으로 아이템 너비를 계산
      const containerWidth = containerRef.current.clientWidth;
      // (컨테이너 너비 - (아이템 간격 * (아이템 개수 - 1))) / 아이템 개수
      const calculatedWidth = (containerWidth - slideGap * (itemCount - 1)) / itemCount;

      // 슬라이드 너비 상태 업데이트
      setItemWidth(calculatedWidth);

      // 브라우저 너비에 따라 아이템 개수를 설정
      setItemCount(containerWidth >= 1180 ? 5 : containerWidth >= 768 ? 2 : 1);
    }
  };

  // 컴포넌트가 마운트될 때 슬라이드 너비를 계산하고, 브라우저 리사이즈 시 이벤트를 등록
  useEffect(() => {
    calculateItemWidth();

    // 브라우저 리사이즈 이벤트 리스너 등록
    window.addEventListener('resize', calculateItemWidth);

    // 컴포넌트 언마운트 시 이벤트 리스너 해제
    return () => window.removeEventListener('resize', calculateItemWidth);
  }, [itemCount]); // itemCount가 변경될 때마다 재실행

  // 무한 스크롤 처리
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        console.log('Observer entries:', entries);
        if (entries[0].isIntersecting && hasNextPage) {
          console.log('Fetching next page...');
          fetchNextPage(); // 다음 페이지 데이터 요청
        }
      },
      { threshold: 0.1 }, // 10%가 보이면 트리거
    );

    if (observerRef.current) {
      observer.observe(observerRef.current); // observer 감지 시작
      console.log('Observer attached', observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current); // 감지 해제
        console.log('Observer detached');
      }
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <div className='all-item-container' ref={containerRef}>
      <div className='item-grid'>
        {/* 데이터 렌더링 */}
        {data.map((item, index) => (
          <div key={index} style={{ width: `${itemWidth}px`, marginBottom: '20px' }}>
            <ItemCard item={item} />
          </div>
        ))}
        {/* 무한 스크롤을 감지할 요소 */}
        <div ref={observerRef} className='loading-indicator'>
          {hasNextPage ? 'Loading more items...' : 'No more items to load'}
        </div>
      </div>
    </div>
  );
};

export default AllItem;
