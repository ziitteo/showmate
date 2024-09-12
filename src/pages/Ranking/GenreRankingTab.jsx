// GenreRankingTab.jsx
import React from 'react';
import './GenreRankingTab.style.css';

const GenreRankingTab = ({ selectedGenre, setSelectedGenre }) => {
    const genres = ['연극', '뮤지컬', '대중음악', '무용(서양/한국무용)', '대중무용', '서양음악(클래식)', '한국음악(국악)', '서커스/마술'];

    return (
        <div className="genre-ranking-tab">
            {genres.map(genre => ( // 괄호 제거
                <button
                    key={genre}
                    className={`genre-tab-button ${selectedGenre === genre ? 'active' : ''}`}
                    onClick={() => setSelectedGenre(genre)}
                >
                    {genre}
                </button>
            ))}
        </div>
    );
};

export default GenreRankingTab;
