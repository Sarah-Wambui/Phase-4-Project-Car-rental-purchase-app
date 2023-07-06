// import React from "react";
import React, { useState } from "react";
import CarItem from "./CarItem";

function CarsList({ cars }) {
    const [carsList, setCarsList] = useState(cars);

    function handleUpdateCar(updatedCar) {
        const updatedCarsArr = carsList.map((car) => {
            if (car.id === updatedCar.id) {
                return updatedCar;
            }
            return car;
        });
        setCarsList(updatedCarsArr);
    }



    return (
        <div>
            {cars.map((car) => (
                <CarItem key={car.id} car={car} onUpdateCar={handleUpdateCar} />
            ))}
        </div>
    );
};

export default CarsList;