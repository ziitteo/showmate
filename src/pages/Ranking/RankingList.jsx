// RankingList.jsx
import React from 'react';
import './RankingList.style.css';

const RankingList = ({ rankings }) => {
    if (!rankings || rankings.length === 0) {
        return <div>표시할 랭킹 데이터가 없습니다.</div>;
    }

    return (
        <div className="ranking-list">
            {rankings.map((rankingItem, index) => (
                <div className="ranking-item-wrapper" key={index}>
                    <div className={`ranking-number ${index === 0 ? 'first-place' : 'other-place'}`}>
                        {index + 1}
                    </div>
                    <div className="ranking-item">
                        <img
                            src={rankingItem.poster?.[0] || '이미지 없음'}
                            alt={rankingItem.prfnm?.[0] || '제목 없음'}
                            className="ranking-poster"
                        />
                        <div className="ranking-info">
                            <div className="ranking-title">{rankingItem.prfnm?.[0] || '제목 없음'}</div>
                            <div className="ranking-details">
                                <span>{rankingItem.prfplcnm?.[0] || '공연 장소 정보 없음'}</span>
                                <span>{rankingItem.prfpd?.[0] || '상영 날짜 정보 없음'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RankingList;
