import React from "react";
import { NavLink } from "react-router-dom";
import { useFoods } from "../../context/FoodContext";
import "./Home.css";

export const Home = () => {
  const { cuisineData, restaurantsData, filterTypeId, setFilterTypeId } =
    useFoods();

  return (
    <div className="home__container">
      <h1 className="home__title">Food Ordering App</h1>
      <h4 className="home__select_cuisine_title">Select Your Cuisine:</h4>
      <div className="button__container">
        {cuisineData.map(({ id, name }) => (
          <button
            className={`${filterTypeId === id ? "selected__button" : ""}`}
            onClick={() => setFilterTypeId(id)}
            key={id}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="restuarant__content__container">
        <div className="restuarant__content">
          {restaurantsData.map((item) => (
            <div>
              <h4>Dishes by {item.name}</h4>
              <div className="restuarant__dishes">
                {item.menu.map((dish, i) => (
                  <React.Fragment key={i}>
                    <NavLink
                      to={`/${item.name.split(" ").join("-")}`}
                      style={{
                        textDecoration: "none",
                        color: "#000",
                      }}
                    >
                      <div className="dish">
                        <img src={dish.imgSrc} alt={dish.name} />
                        <div className="dish__content_container">
                          <h4>{dish.name}</h4>
                          <p className="dish__content">
                            Rs. {dish.price} for {dish.qty}
                          </p>
                          <p className="dish__content">{item.name}</p>
                        </div>
                      </div>
                    </NavLink>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
