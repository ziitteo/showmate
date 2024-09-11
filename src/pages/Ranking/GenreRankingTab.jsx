import React from 'react';
import './GenreRankingTab.style.css';

const GenreRankingTab = ({ selectedGenre, setSelectedGenre }) => {
    const genres = [
        { name: '연극', detail: '' },
        { name: '뮤지컬', detail: '' },
        { name: '콘서트', detail: '' },
        { name: '무용', detail: '(서양/한국무용)' },
        { name: '대중무용', detail: '' },
        { name: '서양음악', detail: '(클래식)' },
        { name: '한국음악', detail: '(국악)' },
        { name: '서커스/마술', detail: '' }
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
