import './TodoApp.css'
import { useState } from 'react'

export default function TodoApp(){
    return (
        <div className="TodoApp">
            <LoginComponent></LoginComponent>
        </div>
    )
}

function LoginComponent(){

    const [userName, setUserName]= useState('User Name')

    const [password, setPassword]= useState('')

    function handleUserNameChange(event){
        setUserName(event.target.value)

    }

    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    

    return (
        <div className="Login">
            <div className="LoginForm">
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" value= {userName}
                    onChange = {handleUserNameChange}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value= {password}
                    onChange = {handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name ="login">Login</button>
                </div>
            </div>
        </div>
    )
}

function WelcomeComponent(){
    return (
        <div className="Welcome">
            Welcome Component
        </div>
    )
}