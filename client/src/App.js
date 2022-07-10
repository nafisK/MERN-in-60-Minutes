import "./App.css"
import { useState, useEffect } from "react"
import Axios from "axios"

function App() {
  const [listOfUsers, setListOfUsers] = useState([
    { id: 1, name: "John", age: 25, username: "johnDoe" },
  ])
  const [newUser, setNewUser] = useState("")
  const [newUserAge, setNewUserAge] = useState(0)
  const [newUserUsername, setNewUserUsername] = useState("")

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers")
      .then(res => {
        setListOfUsers(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const createUser = () => {
    Axios.post("http://localhost:3001/createUser", {
      name: newUser,
      age: newUserAge,
      username: newUserUsername,
    })
      .then(res => {
        setListOfUsers([...listOfUsers, res.data])
        alert("User created successfully")
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className='App'>
      <div className='usersDisplay'>
        {listOfUsers.map(user => {
          return (
            <div key={user.id}>
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Handle: {user.username}</h1>
              <hr />
            </div>
          )
        })}
      </div>

      <div className='userForm'>
        <input
          type='text'
          placeholder='Name'
          onChange={e => {
            setNewUser(e.target.value)
          }}
        />
        <input
          type='text'
          placeholder='Age'
          onChange={e => {
            setNewUserAge(e.target.value)
          }}
        />
        <input
          type='text'
          placeholder='Username'
          onChange={e => {
            setNewUserUsername(e.target.value)
          }}
        />
        <button onClick={createUser}>Add User</button>
      </div>
    </div>
  )
}

export default App
