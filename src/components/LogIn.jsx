import React from 'react'

function LogIn() {
    return (
        <div>
            <h1>Login</h1>
            <p>Welcome back! Lettuce show you some more recipes to fall in love with!</p>

            <form>
                <input 
                    type='text'
                    name='Email'
                    placeholder='Email'
                />
                <input 
                    type='password'
                    name='Password'
                    placeholder='Password'
                />
                <button>Let's get cook'n</button>
                <p>Sign Up or Learn More</p>
            </form>
        </div>
    )
}

export default LogIn
