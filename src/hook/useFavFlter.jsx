import { useState } from "react";
import { useSelector } from "react-redux";

const useFavFlter = () => {
  const favArr = useSelector((state) => state.favorites.favArr);
  const [newArray, setNewArray] = useState([]);

  const handleflt = (searchInput) => {
    const results = favArr.filter(item =>
      item.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setNewArray(results);
  };

  return { newArray, handleflt };
};

export default useFavFlter;
