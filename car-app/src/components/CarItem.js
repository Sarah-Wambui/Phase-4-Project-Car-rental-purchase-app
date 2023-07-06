import React from "react";


function CarItem({ car }) {
    const { id, model, color, year, engine, mileage, category, status, imageurl, review } = car;


    return (
        <div className="car-item">
            <img src={imageurl} alt={model} />
            <h2>{model}</h2>
            <p>Color: {color}</p>
            <p>Year: {year}</p>
            <p>Engine: {engine}</p>
            <p>Mileage: {mileage}</p>
            <p>Category: {category}</p>
            <p>Status: {status}</p>
            <p>Reviews: {review}</p>
        </div>
    );
};


export default CarItem;