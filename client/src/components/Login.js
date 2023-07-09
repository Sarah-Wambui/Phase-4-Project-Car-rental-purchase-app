import React, {useState} from 'react'
import SignUp from './SignUp'
import LoginForm from './LoginForm'

function Login({setUser}) {
    const [showLogin, setShowLogin] = useState(true)


  return (
    <div>
        <h2>CarMarket</h2>
        {showLogin ?  (
            <> 
               <LoginForm setUser={setUser} />
              <p>Don't have an acoount? Sign up here
                <button onClick={() => setShowLogin(false)} >Sign Up</button>
              </p>
            </>

        ) : (
            <>
              <SignUp setUser={setUser} /> 
              <p>Already have an account? Login in here: 
                <button onClick={() => setShowLogin(true)} >Log In</button>
              </p>  
            </>
        )}
    </div>
  )
}

export default Login