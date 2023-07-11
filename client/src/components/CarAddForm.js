//form to add cars

import React, { useState } from "react";

function CarAddForm({ handleAddCar }) {
    const [formData, setFormData] = useState({
        name: "",
        color: "",
        year: "",
        engine: "",
        mileage: "",
        category: "",
        status: "",
        image_url: "",
    });

    function handleSubmitForm(event) {
        event.preventDefault();
        fetch("/cars", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((r) => r.json())
            .then((newCar) => handleAddCar(newCar));
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
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>
                </div>

                <div>
                    <label htmlFor="color">Color:</label>
                    <input type="text" id="color" name="color" value={formData.color} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="year">Year:</label>
                    <input type="text" id="year" name="year" value={formData.year} onChange={handleChange}
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
                    <label htmlFor="image_url">Image_url:</label>
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
                <button id="buton" type="submit">Add Car</button>
            </form>
        </div>
    );
}

export default CarAddForm;