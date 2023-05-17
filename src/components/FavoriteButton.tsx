import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

interface Item {
  id: number;
}

const FavoriteButton: React.FC<Item> = ({ id, }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(
    localStorage.getItem(`favorite_${id}`) === 'true'
  );

  const handleFavoriteClick = () => {
    const newIsFavorite = !isFavorite;
    setIsFavorite(newIsFavorite);
    localStorage.setItem(`favorite_${id}`, newIsFavorite.toString());
  };

  return (
    <button style={{border:'none', background:'transparent'}} onClick={handleFavoriteClick}>
      {isFavorite? <HeartFilled style={{color:'red'}} onClick={handleFavoriteClick} /> :<HeartOutlined onClick={handleFavoriteClick}/>}
    </button>
  );
};

export default FavoriteButton;