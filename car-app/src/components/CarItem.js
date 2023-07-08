import React, { useState } from "react";
import CarUpdateForm from './CarUpdateForm';



function CarItem({ car, onUpdateCar }) {
    const { model, color, year, engine, mileage, category, status, image, review } = car;

    const [showUpdateForm, setShowUpdateForm] = useState(false);

    function handleUpdate() {
        setShowUpdateForm(true);
    }


    return (
        <div className="car-item">
            <img src={image} alt={model} />
            <h2>{model}</h2>
            <p>Color: {color}</p>
            <p>Year: {year}</p>
            <p>Engine: {engine}</p>
            <p>Mileage: {mileage}</p>
            <p>Category: {category}</p>
            <p>Status: {status}</p>
            <p>Reviews: {review}</p>
            <div id="btn-cont">
                <button id="btn-update" onClick={handleUpdate}>
                    Update
                </button>
                {/* <button id="btn-delete" onClick={handleDelete}>
                    Delete
                </button> */}


                {showUpdateForm && (
                    <CarUpdateForm car={car} onUpdateCar={onUpdateCar} />
                )}
            </div>
        </div>
    );
};




export default CarItem;