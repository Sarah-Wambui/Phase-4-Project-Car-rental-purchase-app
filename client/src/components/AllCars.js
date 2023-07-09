import React, {useEffect, useState} from 'react'
import CarsList from './CarsList';
import CarAddForm from './CarAddForm';
import Header from './Header';


function AllCars() {
    const [cars, setCars] = useState([]);
    const [category, setCategory] = useState("all");

    console.log(cars)

    useEffect(() => {
        fetch("/cars")
            .then((resp) => resp.json())
            .then(setCars)
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
    
    function handleDelete(id){
        fetch(`/cars/${id}`,{
            method: "DELETE",
        })
        .then(resp => resp.json())
        .then(() =>{
            const updatedCars = cars.filter((car) => car.id !== id )
            setCars(updatedCars)
        })
    }

    const filteredCars =
        category === "all" ? cars : cars.filter((car) => car.category === category);



    return (
        <div>
            <Header />
            <CarsList cars={filteredCars}  handleSearch={handleSearch} onCategoryClick={onCategoryClick} setCars={setCars}  handleDelete={handleDelete} />
            <CarAddForm handleAddCar={handleAddCar}/>




        </div>
    );

  
}

export default AllCars
