import React, { useState } from "react";



function CarUpdateForm({ car, onUpdateCar, setShowUpdateForm }) {
    const [formData, setFormData] = useState({
        name: car.name,
        color: "",
        year: car.year,
        engine: car.engine,
        mileage: car.mileage,
        category: car.category,
        image_url: car.image_url,
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
        fetch(`/cars/${car.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((r) => r.json())
            .then((updatedCar) =>{
                onUpdateCar(updatedCar)
            });
    };






    return (

        <div id="form-container">
            <form id="form" onSubmit={handleSubmitForm}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
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
                    <label htmlFor="image_url">image_url:</label>
                    <input
                        type="text"
                        id="image_url"
                        name="image_url"
                        value={formData.image_url}
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
                <button id="buton"type="submit">Update Car</button>
                <button id="btn" onClick={() => setShowUpdateForm(false)}>Hide Form</button>
            </form>
        </div>
    );
}

export default CarUpdateForm;