// import React from "react";
import CarItem from "./CarItem";

function CarsList({ cars , setCars, handleDelete}) {
    // const [carsList, setCarsList] = useState([]);

    function handleUpdateCar(updatedCar) {
        const updatedCarsArr = cars.map((car) => {
            if (car.id === updatedCar.id) {
                return updatedCar;
            }
            return car;
        });
        setCars(updatedCarsArr);
    }



    return (
        <div className = "cars-container">
            {cars.map((car) => (
                <CarItem key={car.id} car={car} onUpdateCar={handleUpdateCar} handleDelete={handleDelete}/>
            ))}
        </div>
    );
};

export default CarsList;