import React, { useState } from "react";



function CarUpdateForm({ car, onUpdateCar }) {
    const [formData, setFormData] = useState({
        model: car.model,
        color: car.color,
        year: car.year,
        engine: car.engine,
        mileage: car.mileage,
        category: car.category,
        image: car.image,
        status: car.status,
    });



    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmitForm = (event) => {
        event.preventDefault();
        fetch(`http://localhost:4500/cars/${car.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((r) => r.json())
            .then((updatedCar) => onUpdateCar(updatedCar));
    };






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
                <button type="submit">Update Car</button>
            </form>
        </div>
    );
}

export default CarUpdateForm;