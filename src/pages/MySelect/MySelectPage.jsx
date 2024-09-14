import React, { useEffect, useState } from "react";
import ItemCard from "../../common/components/ItemCard/ItemCard";
import "./MySelectPage.style.css";

const MySelectPage = () => {
  const [wishItems, setWishItems] = useState([]);

  useEffect(() => {
    const savedItems = localStorage.getItem("savedItems");
    setWishItems(savedItems ? JSON.parse(savedItems) : []);
  }, []);

  const handleRemoveItem = (itemId) => {
    setWishItems((prevItems) =>
      prevItems.filter((item) => item.mt20id !== itemId)
    );
  };

  return (
    <div className="my-select-page">
      <h2 className="my-select-page-title">내가 찜한 리스트</h2>
      {wishItems.length > 0 ? (
        <div className="favorite-items-container">
          {wishItems.map((item) => (
            <ItemCard
              key={item.mt20id}
              item={item}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>
      ) : (
        <div className="empty-container">
          <p>찜한 콘텐츠가 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default MySelectPage;
