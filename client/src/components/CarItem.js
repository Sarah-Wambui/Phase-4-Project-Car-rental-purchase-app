import React, { useState } from "react";
import CarUpdateForm from './CarUpdateForm';



function CarItem({ car, onUpdateCar , handleDelete}) {
    const { id, name, model, color, year, engine, mileage, category, status, image_url} = car;

    const [showUpdateForm, setShowUpdateForm] = useState(false);

    function handleUpdate() {
        setShowUpdateForm(true);
    }


    return (
        <div className="car-item">
            <h2>Name: {name}</h2>
            <img src={image_url} alt={model} />
            <h2>{model}</h2>
            <p>Color: {color}</p>
            <p>Year: {year}</p>
            <p>Engine: {engine}</p>
            <p>Mileage: {mileage}</p>
            <p>Category: {category}</p>
            <p>Status: {status}</p>
            <div id="btn-cont">
                <button id="btn-update" onClick={handleUpdate}>
                    Update
                </button>
                 <button id="btn-delete" onClick={() => handleDelete(id)}>
                    Delete
                </button> 


                {showUpdateForm && (
                    <CarUpdateForm car={car} onUpdateCar={onUpdateCar} />
                )}
            </div>
        </div>
    );
};




export default CarItem;