import { createContext, useContext, useState } from "react";
import { cuisineData, restaurantsData } from "../Data";

const FoodContext = createContext();

export function FoodProvider({ children }) {
  const [filterTypeId, setFilterTypeId] = useState(0);
  const [data, setData] = useState(
    localStorage.getItem("restaurantData") !== null
      ? JSON.parse(localStorage.getItem("restaurantData"))
      : restaurantsData
  );

  const filteredRestaurantData =
    filterTypeId !== 0
      ? data.filter((item) => item.cuisine_id === filterTypeId)
      : data;

  const addReview = (rating, id) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, ratings: [rating, ...item.ratings] } : item
    );
    
    setData(updatedData);
    localStorage.setItem("restaurantData", JSON.stringify(updatedData));
  };

  return (
    <FoodContext.Provider
      value={{
        cuisineData,
        restaurantsData: filteredRestaurantData,
        filterTypeId,
        setFilterTypeId,
        addReview,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
}
export const useFoods = () => useContext(FoodContext);
