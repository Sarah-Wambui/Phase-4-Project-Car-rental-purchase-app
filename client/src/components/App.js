import React, { useState, useEffect } from 'react';
import {Routes, Route} from "react-router-dom"
import "./style.css";
import ReviewForm from './ReviewForm';
import Login from './Login';
import NavBar from './NavBar';
import Header from './Header';
import CarsList from './CarsList';
import CarAddForm from './CarAddForm';


function App() {
    const [user, setUser] = useState(null)
    const [cars, setCars] = useState([]);
    const [category, setCategory] = useState("all");

    // console.log(user)
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


    useEffect(() =>{
        fetch("/check_session")
        .then(resp => resp.json())
        .then(user => setUser(user))

    },[])

    if (!user) return <Login setUser={setUser}/>
  

    return (
        <> 
            <Header />
            <NavBar user={user} setUser={setUser} handleSearch={handleSearch} onCategoryClick={onCategoryClick} />    
                   
            <main>
               
                    <Routes>
                        <Route  exact path="/" element={<CarsList cars={filteredCars}    setCars={setCars}  handleDelete={handleDelete} />}></Route>
                        <Route path="/review" element={<ReviewForm/>}></Route>
                        <Route path="/new" element={<CarAddForm handleAddCar={handleAddCar} />}></Route>

                    </Routes>
                

                
            </main>

        </>
    );

}
export default App


// <NavBar
// onCategoryClick={onCategoryClick}
// cars={cars}
// onSearch={handleSearch}
// />