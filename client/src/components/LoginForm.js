import React,{useState} from 'react'

function LoginForm({setUser}) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setErrors] = useState([])

  function handleSubmit(e){
    e.preventDefault()
    setErrors([])
    fetch("/login", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password}),
    })
    .then((r) =>{
      if (r.ok){
        r.json()
        .then((user) => setUser(user))
      }else {
        alert("Incorrect username or password!")
      }
    })
    .catch((error) => {
      console.error('Error logging in:', error);
    })
}
  return (
    <div>
      <form onSubmit={handleSubmit} id="login">
        <h3>Login</h3>
        <label htmlFor="username">Username:</label>
        <input 
        type="text" 
        id="username"
        name="username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        autoComplete='off' required />
        <label htmlFor="password">Password:</label>
        <input 
        type="password" 
        name="password"
        id="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        autoComplete='off' required />
        <button type="submit" id="loginbtn">Submit</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

export default LoginForm




// {/* <form onSubmit={handleSubmit} >
// <label htmlFor='username' >Username:</label>
// <input type="text" id="username" value={pass} required  />
// <label htmlFor="Password">Password:</label>
// <input type="text" required />
// <button type="submit" >Submit</button>
// </form> */}