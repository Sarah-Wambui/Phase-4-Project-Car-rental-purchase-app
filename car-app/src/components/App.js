import React, { useState, useEffect } from 'react';
import Header from './Header';
import NavBar from './NavBar';
import CarsList from './CarsList';
import "./style.css";
import CarAddForm from './CarAddForm';






function App() {
    const [cars, setCars] = useState([]);
    const [category, setCategory] = useState("all");

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
    const onCategoryClick = (category) => {
        setCategory(category);
    };
    function handleSearch(filteredCars) {
        setCars(filteredCars);
    }

    const filteredCars =
        category === "all"
            ? cars
            : cars.filter((car) => car.category === category);






    return (
        <div>
            <Header />
            <NavBar
                onCategoryClick={onCategoryClick}
                cars={cars}
                onSearch={handleSearch}
            />
            <CarsList cars={filteredCars} />
            <CarAddForm onAddCar={handleAddCar} />




        </div>
    );

}
export default App