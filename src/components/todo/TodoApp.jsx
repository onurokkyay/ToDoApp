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

    const [showSuccessMessage, setShowSuccessMessage]= useState(false)

    const [showErrorMessage, setShowErrorMessage]= useState(false)

    function handleUserNameChange(event){
        setUserName(event.target.value)
    }

    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    function handleSubmit(){
        if(userName==='dummyUserName' && password==='dummyPassword'){
            console.log('Success')
            setShowSuccessMessage(true)
            setShowErrorMessage(false)
        }
        else {
            console.log('Failed')
            setShowSuccessMessage(false)
            setShowErrorMessage(true)
        }
    }
    
    return (
        <div className="Login">
            {showSuccessMessage && <div className='successMessage'>Authenticated Successfully</div>}
            {showErrorMessage && <div className='errorMessage'>Authentication Failed. Please check your credentials.</div>}
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
                    <button type="button" name ="login" onClick={handleSubmit}>Login</button>
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

