import React, { useState, useEffect } from 'react';
import CarsList from './CarsList';

function App() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/cars")
            .then((resp) => resp.json())
            .then((cars) => {
                setCars(cars);
            });
    }, []);



    return (
        <div>

            <CarsList cars={cars} />

        </div>
    );

}
export default App