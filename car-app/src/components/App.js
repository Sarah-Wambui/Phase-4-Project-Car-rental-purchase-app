import React, { useState, useEffect } from 'react';
//import CarsList from './CarsList';
import Login  from './Login';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("/check_session")
            .then((resp) => resp.json())
            .then((user) => {
                setUser(user);
            });
    }, []);

    if (!user) return <Login setUser={setUser}/>

    return (
        <div>

            

        </div>
    );

}

export default App;