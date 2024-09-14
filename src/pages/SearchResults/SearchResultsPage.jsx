import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSearchQuery from '../../hooks/useSearch';
import ItemCard from '../../common/components/ItemCard/ItemCard';
import './SearchResultsPage.style.css';

const genres = [
    { label: '전체', value: '' },
    { label: '연극', value: 'AAAA' },
    { label: '뮤지컬', value: 'GGGA' },
    { label: '콘서트', value: 'CCCD' },
    { label: '서양/한국무용', value: 'BBBC' },
    { label: '대중무용', value: 'BBBE' },
    { label: '클래식', value: 'CCCA' },
    { label: '국악', value: 'CCCC' },
    { label: '서커스/마술', value: 'EEEB' },
    { label: '복합예술공연', value: 'EEEA' }
];

const saleStatuses = [
    { label: '전체', value: '' },
    { label: '공연중', value: '02' },
    { label: '공연예정', value: '01' },
    { label: '공연종료', value: '03' }
];

const regions = [
    { label: '전체', value: '' },
    { label: '서울특별시', value: '11' },
    { label: '부산광역시', value: '26' },
    { label: '대구광역시', value: '27' },
    { label: '인천광역시', value: '28' },
    { label: '광주광역시', value: '29' },
    { label: '대전광역시', value: '30' },
    { label: '울산광역시', value: '31' },
    { label: '세종특별자치시', value: '36' },
    { label: '경기도', value: '41' },
    { label: '강원특별자치도', value: '51' },
    { label: '충청북도', value: '43' },
    { label: '충청남도', value: '44' },
    { label: '전라북도', value: '45' },
    { label: '전라남도', value: '46' },
    { label: '경상북도', value: '47' },
    { label: '경상남도', value: '48' },
    { label: '제주특별자치도', value: '50' }
];

const SearchResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchTerm = new URLSearchParams(location.search).get('query') || '';
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedSaleStatus, setSelectedSaleStatus] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
    const { data: searchResults, isLoading, isError } = useSearchQuery(
        searchTerm,
        currentPage,
        selectedGenre,
        selectedSaleStatus,
        selectedRegion
    );

    const handleGenreChange = (genre) => {
        setSelectedGenre(genre);
        setCurrentPage(1);
    };

    const handleSaleStatusChange = (status) => {
        setSelectedSaleStatus(status);
        setCurrentPage(1);
    };

    const handleRegionChange = (region) => {
        setSelectedRegion(region);
        setCurrentPage(1);
    };

    const handleReset = () => {
        setSelectedGenre('');
        setSelectedSaleStatus('');
        setSelectedRegion('');
        setCurrentPage(1);
    };

    const toggleFilter = () => {
        if (window.innerWidth <= 1024) {
            setIsFilterOpen(!isFilterOpen);
        } else {
            setIsFilterOpen(true);
        }
    };

    useEffect(() => {
        if (window.innerWidth > 1024) {
            setIsFilterOpen(true);
        }
    }, []);

    const handleSearch = () => {
        navigate(`?query=${searchTerm}&genre=${selectedGenre}&status=${selectedSaleStatus}&region=${selectedRegion}`);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        handleSearch();
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Something went wrong. Please try again.</p>;

    return (
        <div className="search-page-container">
            <aside className={`filter-section ${isFilterOpen ? 'open' : ''}`}>
                <div className="filter-header" onClick={toggleFilter}>
                    <h5 className="filter-title"></h5>
                    <img
                        src="https://tickets.interpark.com/contents/images/icon/search-filter.svg"
                        alt="Filter Icon"
                        className={`toggle-icon ${isFilterOpen ? 'open' : ''}`}
                    />
                </div>
                {isFilterOpen && (
                    <div className="filter-content">
                        <div className="filter-group">
                            <h4>장르</h4>
                            <div className="filter-options">
                                {genres.map((genre) => (
                                    <button
                                        key={genre.value}
                                        onClick={() => handleGenreChange(genre.value)}
                                        className={selectedGenre === genre.value ? 'active' : ''}
                                    >
                                        {genre.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <hr />
                        <div className="filter-group">
                            <h4>공연상태</h4>
                            <div className="filter-options">
                                {saleStatuses.map((status) => (
                                    <button
                                        key={status.value}
                                        onClick={() => handleSaleStatusChange(status.value)}
                                        className={selectedSaleStatus === status.value ? 'active' : ''}
                                    >
                                        {status.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <hr />
                        <div className="filter-group">
                            <h4>지역</h4>
                            <div className="filter-options">
                                {regions.map((region) => (
                                    <button
                                        key={region.value}
                                        onClick={() => handleRegionChange(region.value)}
                                        className={selectedRegion === region.value ? 'active' : ''}
                                    >
                                        {region.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <hr />
                        <button className="reset-button" onClick={handleReset}>초기화</button>
                    </div>
                )}
            </aside>

            <section className="results-section">
                <div className="item-card-list">
                    {searchResults && searchResults.items && searchResults.items.length > 0 ? (
                        searchResults.items.map((item, index) => {
                            const imageUrl =
                                item.poster && item.poster.startsWith('/upload')
                                    ? `http://www.kopis.or.kr${item.poster}`
                                    : item.poster || '이미지 없음';

                            const modifiedItem = {
                                ...item,
                                poster: imageUrl,
                            };

                            return (
                                <div className="search-item-card-wrapper" key={index}>
                                    <ItemCard item={modifiedItem} className="search-item-card" />
                                    <div className="search-item-info">
                                        <div className="search-item-title">{item.prfnm || '제목 없음'}</div>
                                        <div className="search-item-details">
                                            <div>{item.fcltynm || '공연 장소 정보 없음'}</div>
                                            <span>
                                                {item.prfpdfrom === item.prfpdto
                                                    ? item.prfpdfrom
                                                    : `${item.prfpdfrom} - ${item.prfpdto}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>검색 결과가 없습니다.</p>
                    )}
                </div>

                {/* 페이징네이션*/}
                {searchResults && searchResults.totalPages > 1 && (
                    <div className="pagination">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            이전
                        </button>
                        {Array.from({ length: searchResults.totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={currentPage === index + 1 ? 'active' : ''}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === searchResults.totalPages}
                        >
                            다음
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default SearchResultsPage;