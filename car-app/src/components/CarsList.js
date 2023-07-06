import React from "react";
import CarItem from "./CarItem";

function CarsList({ cars }) {



    return (
        <div>
            {cars.map((car) => (
                <CarItem key={car.id} car={car} />
            ))}
        </div>
    );
};

export default CarsList;