import React from 'react';
import './RankingList.style.css';

const RankingList = ({ rankings }) => {
    if (!rankings || rankings.length === 0) {
        return <div>표시할 랭킹 데이터가 없습니다.</div>;
    }

    return (
        <div className="ranking-page-list">
            {rankings.map((rankingItem, index) => (
                <div className="ranking-page-item-wrapper" key={index}>
                    <div className={`ranking-page-number ${index < 3 ? 'ranking-page-top-rank' : 'ranking-page-other-rank'}`}>
                        {index + 1}
                    </div>
                    <div className="ranking-page-item">
                        <img
                            src={rankingItem.poster || '이미지 없음'}
                            alt={rankingItem.prfnm || '제목 없음'}
                            className="ranking-page-poster"
                        />
                        <div className="ranking-page-info">
                            <div className="ranking-page-title">{rankingItem.prfnm || '제목 없음'}</div>
                            <div className="ranking-page-details">
                                <span>{rankingItem.prfplcnm || '공연 장소 정보 없음'}</span>
                                <span>{rankingItem.prfpd || '상영 날짜 정보 없음'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RankingList;
