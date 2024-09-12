import React, { useEffect, useRef, useState } from 'react';
import ItemCard from '../ItemCard/ItemCard';
import './ItemCarousel.style.css';

const ItemCarousel = ({ data }) => {
  // 현재 슬라이드 개수의 상태를 관리
  const [slideCount, setSlideCount] = useState(5);
  // 현재 슬라이드의 인덱스를 관리, 초기값은 0으로 설정
  const [currentIndex, setCurrentIndex] = useState(0);
  // 슬라이드의 px 단위 너비를 관리
  const [slideWidth, setSlideWidth] = useState(0);

  // 슬라이드 간격을 설정 20px
  const slideGap = 20;

  // 슬라이드 컨테이너를 참조하는 Ref
  const containerRef = useRef(null);
  // 슬라이드 리스트를 참조하는 Ref
  const slideRef = useRef(null);

  const visibleDataLength = Math.min(10, data.length); // 실제로 보여줄 데이터 개수 (최대 10개)

  // 슬라이드 너비 계산 및 브라우저 크기 변경에 따른 재설정
  const calculateSlideWidth = () => {
    // containerRef.current가 존재하는지 확인
    if (containerRef.current) {
      // 컨테이너 너비를 기준으로 슬라이드 너비 계산
      const containerWidth = containerRef.current.clientWidth;

      // 슬라이드 너비 = (컨테이너 너비 - (슬라이드 간격 * (슬라이드 개수 -1)) / 슬라이드 개수
      const calculatedSlideWidth = (containerWidth - slideGap * (slideCount - 1)) / slideCount;

      // 슬라이드 너비 상태 업데이트
      setSlideWidth(calculatedSlideWidth);

      // 브라우저 너비가 1180px 이상이면 5개, 768px 이상이면 2개, 그 미만이면 1개로 설정
      setSlideCount(containerWidth >= 1180 ? 5 : containerWidth >= 768 ? 2 : 1);
    }
  };

  // 슬라이드 너비 계산 및 브라우저 크기 변경에 따른 재설정
  // 컴포넌트가 처음 렌더링 될 때와 브라우저 크기가 변경될 때마다 호출
  useEffect(() => {
    // 컴포넌트가 완전히 마운트된 후에만 계산하도록 보장
    if (containerRef.current) {
      calculateSlideWidth();
    }

    // 브라우저 크기 변경 이벤트 리스너 등록
    window.addEventListener('resize', calculateSlideWidth);

    // 컴포넌트 언마운트 시 이벤트 리스너 해제
    return () => {
      window.removeEventListener('resize', calculateSlideWidth);
    };
  }, [slideCount]);

  // 다음 슬라이드로 이동하는 함수 (1개씩 이동, 무한 슬라이드 없음)
  const nextSlide = () => {
    // 마지막 슬라이드를 넘어가지 않도록 설정
    if (currentIndex < visibleDataLength - slideCount) {
      setCurrentIndex(currentIndex => currentIndex + 5);
    } else {
      setCurrentIndex(0);
    }
  };

  // 이전 슬라이드로 이동하는 함수 (1개씩 이동, 무한 슬라이드 없음)
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex => currentIndex - 5);
    }
  };

  return (
    <div>
      <div className='item-swiper-container'>
        <div className='item-swiper-wrap' ref={containerRef}>
          <button
            className={`carousel-button prev-button ${currentIndex === 0 ? 'hide' : ''}`}
            onClick={() => {
              prevSlide();
            }}
          />
          <div className='item-swiper-slide'>
            <ul
              ref={slideRef}
              className='item-swiper-list'
              style={{
                transition: 'transform 0.5s ease-in-out',
                transform: `translateX(-${(slideWidth + slideGap) * currentIndex}px)`,
              }}
            >
              {data?.slice(0, 10).map(item => (
                <li
                  key={item.prfseq}
                  className='item-swiper-item'
                  style={{ width: `${slideWidth}px`, flex: `0 0 ${slideWidth}px` }}
                >
                  <ItemCard item={item} />
                </li>
              ))}
            </ul>
          </div>

          <button
            className={`carousel-button next-button ${currentIndex >= visibleDataLength - slideCount ? 'hide' : ''}`}
            onClick={() => {
              nextSlide();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemCarousel;
