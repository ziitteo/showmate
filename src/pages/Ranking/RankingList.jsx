// RankingList.jsx
import React from 'react';
import './RankingList.style.css';

const RankingList = ({ rankings }) => {
    if (!rankings || rankings.length === 0) {
        return <div className="ranking-list-no-data">표시할 랭킹 데이터가 없습니다.</div>;
    }

    return (
        <div className="ranking-list-container">
            {rankings.map((rankingItem, index) => {
                const imageUrl =
                    rankingItem.poster && rankingItem.poster.startsWith('/upload')
                        ? `http://www.kopis.or.kr${rankingItem.poster}`
                        : rankingItem.poster || '이미지 없음';

                const title = Array.isArray(rankingItem.prfnm)
                    ? rankingItem.prfnm.join('')
                    : rankingItem.prfnm || '제목 없음';
                const location = Array.isArray(rankingItem.prfplcnm)
                    ? rankingItem.prfplcnm.join('')
                    : rankingItem.prfplcnm || '공연 장소 정보 없음';
                const period = Array.isArray(rankingItem.prfpd)
                    ? rankingItem.prfpd.join('')
                    : rankingItem.prfpd || '상영 날짜 정보 없음';

                return (
                    <div className="ranking-list-item-wrapper" key={index}>
                        <div
                            className={`ranking-list-number ${index < 3 ? 'ranking-list-top-rank' : 'ranking-list-other-rank'
                                }`}
                        >
                            {index + 1}
                        </div>
                        <div className="ranking-list-item">
                            <img
                                src={imageUrl}
                                alt={title}
                                className="ranking-list-poster"
                                onError={(e) => {
                                    e.target.src = '이미지 없음';
                                }}
                            />
                            <div className="ranking-list-info">
                                <div className="ranking-list-item-title">{title}</div>
                                <div className="ranking-list-details">
                                    <span>{location}</span>
                                    <span>{period}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default RankingList;