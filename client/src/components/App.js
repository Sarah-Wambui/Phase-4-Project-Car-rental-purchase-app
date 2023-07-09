import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom"
import AllCars from './AllCars';
import NavBar from './NavBar';
import "./style.css";
import CarAddForm from './CarAddForm';
import Login from './Login';


function App() {
    const [user, setUser] = useState(null)
    console.log(user)

    useEffect(() =>{
        fetch("/check_session")
        .then(resp => resp.json())
        .then(user => setUser(user))

    },[])

    if (!user) return <Login setUser={setUser}/>
  

    return (
        <div>
            <NavBar user={user} setUser={setUser} /> 
            <main>
                <Router>
                    <Routes>
                        <Route  exact path="/" element={<AllCars/>}></Route>
                        <Route path="/new" element={<CarAddForm/>}></Route>
                    </Routes>
                </Router>

                
            </main>

        </div>
    );

}
export default App


// <NavBar
// onCategoryClick={onCategoryClick}
// cars={cars}
// onSearch={handleSearch}
// />