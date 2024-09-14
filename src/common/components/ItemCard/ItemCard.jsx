import React, { useEffect, useState } from "react";
import "./ItemCard.style.css";
import { useNavigate } from "react-router-dom";

const ItemCard = ({ item, onRemove }) => {
  const navigate = useNavigate();
  const [isWish, setIsWish] = useState(false);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];
    setIsWish(savedItems.some((savedItem) => savedItem.mt20id === item.mt20id));
  }, [item]);

  const toggleWish = (e) => {
    e.stopPropagation();
    const savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];
    if (isWish) {
      // 찜 리스트에서 제거
      const updatedItems = savedItems.filter(
        (savedItem) => savedItem.mt20id !== item.mt20id
      );
      localStorage.setItem("savedItems", JSON.stringify(updatedItems));
      setIsWish(false);

      // onRemove 함수가 있을 때만 호출(찜 리스트 페이지에서만)
      if (onRemove) {
        onRemove(item);
      }
    } else {
      // 찜 리스트에 추가
      savedItems.push(item);
      localStorage.setItem("savedItems", JSON.stringify(savedItems));
      setIsWish(true);
    }
  };

  const showDetail = (item) => {
    navigate(`/goods/${item.mt20id}`);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      key={item.mt20id}
      role="button"
      tabIndex="0"
      className="card-container"
      onClick={() => showDetail(item)}
    >
      <div className="image-container">
        <img src={item.poster} alt={item.prfnm} className="card-image" />
        <button
          className={`favorite-button ${isWish ? "active" : ""}`}
          onClick={toggleWish}
        >
          {isWish ? "★" : "★"}
        </button>
      </div>
      <div className="card-info">
        <h2>{item.prfnm}</h2>
        <p>{item.fcltynm}</p>
        <p className="date-info">
          {item.prfpdfrom === item.prfpdto
            ? item.prfpdfrom
            : `${item.prfpdfrom} - ${item.prfpdto} `}
        </p>
      </div>
    </div>
  );
};

export default ItemCard;
