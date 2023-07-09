import React,{useState} from 'react'

function SignUp({setUser}) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        fetch("/signup",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                username, 
                password, 
                email,
            }),
        })
        .then(resp => resp.json())
        .then(user => setUser(user))
        .catch((error) => {
            console.error("Error fetching cars:", error);
        })
    }

  return (
    <div>
        <form action='/signup' onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input 
            type="text" 
            name="username"
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} autoComplete='off' required />
            <label htmlFor="email">Email:</label>
            <input 
            type="text" 
            name="email"
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} autoComplete='off' required />
            <label htmlFor="password">Password:</label>
            <input 
            type="password" 
            name="password"
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} required/>
            <button>Submit</button>
        </form>
       
    </div>
  )
}

export default SignUp