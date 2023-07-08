//form to add cars

import React, { useState } from "react";

function CarAddForm({ onAddCar }) {

    const [formData, setFormData] = useState({
        model: "",
        color: "",
        year: "",
        engine: "",
        mileage: "",
        category: "",
        status: "",
        imageurl: "",
    });

    function handleSubmitForm(event) {
        event.preventDefault();
        // TODO: Send form data to server

        const carsData = {
            model: formData.model,
            color: formData.color,
            year: formData.year,
            engine: formData.engine,
            mileage: formData.mileage,
            category: formData.category,
            image: formData.image,
            status: formData.status,
        };
        setFormData({
            model: "",
            color: "",
            year: "",
            engine: "",
            mileage: "",
            category: "",
            image: "",
            status: "",
        });
        // // navigate to view submitted form
        // history.push("/submitted-form");

        fetch("http://localhost:4500/cars", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(carsData),
        })
            .then((r) => r.json())
            .then((newCar) => onAddCar(newCar));
    }

    function handleChange(event) {
        const { name, value } = event.target;
        const newValue = value;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: newValue,
        }));
    }



    return (

        <div id="form-container">
            <form id="form" onSubmit={handleSubmitForm}>
                <div>
                    <label htmlFor="model">Model:</label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="color">Color:</label>
                    <input
                        type="text"
                        id="color"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="year">Year:</label>
                    <input
                        type="text"
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="engine">Engine:</label>
                    <input
                        type="text"
                        id="engine"
                        name="engine"
                        value={formData.engine}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="mileage">Mileage:</label>
                    <input
                        type="text"
                        id="mileage"
                        name="mileage"
                        value={formData.mileage}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="sale">Car For Sale</option>
                        <option value="rental">Rental Car</option>

                    </select>
                </div>
                <div>
                    <label htmlFor="image">Image:</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="">--Please choose an option--</option>
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                    </select>
                </div>
                <button type="submit">Add Car</button>
            </form>
        </div>
    );
}

export default CarAddForm;