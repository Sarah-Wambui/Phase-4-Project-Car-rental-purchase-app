import React, { useState, useEffect } from 'react';
import CarsList from './CarsList';
import "./style.css";
import CarAddForm from './CarAddForm';




function App() {
    const [cars, setCars] = useState([]);

    console.log(cars)

    useEffect(() => {
        fetch("http://localhost:4500/cars")
            .then((resp) => resp.json())
            .then((cars) => {
                setCars(cars);
            })
            .catch((error) => {
                console.error("Error fetching cars:", error);
            });
    }, []);

    const handleAddCar = (newCar) => {
        setCars([...cars, newCar]);
    };





    return (
        <div>

            <CarsList cars={cars} />
            <CarAddForm onAddCar={handleAddCar} />



        </div>
    );

}
export default App