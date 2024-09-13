import React from 'react';
import './GenreRankingTab.style.css';

const GenreRankingTab = ({ selectedGenre, setSelectedGenre }) => {
    const genres = [
        { name: '연극' },
        { name: '뮤지컬' },
        { name: '콘서트' },
        { name: '서양/한국무용' },
        { name: '대중무용' },
        { name: '클래식' },
        { name: '국악' },
        { name: '서커스/마술' },
        { name: '복합예술공연' }
    ];

    return (
        <div className="ranking-genre-tab">
            {genres.map((genre) => (
                <button
                    key={genre.name}
                    className={`ranking-genre-button ${selectedGenre === genre.name ? 'active' : ''}`}
                    onClick={() => setSelectedGenre(genre.name)}
                >
                    {genre.name}
                    {genre.detail && <span className="ranking-genre-detail">{genre.detail}</span>}
                </button>
            ))}
        </div>
    );
};

export default GenreRankingTab;