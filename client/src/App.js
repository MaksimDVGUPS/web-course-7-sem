import React, {useEffect, useState} from "react"
import {BrowserRouter as Router} from "react-router-dom"
import {useRoutes} from "./routes"
import './assets/css/template.scss'
import axios from "axios";

function App() {
    const [auth, setAuth] = useState({
        isAuth: false
    })

    useEffect(() => {
        async function checkToken () {
            if (localStorage && localStorage.getItem('auth_state')) {
                const authData = JSON.parse(localStorage.getItem('auth_state'))
                const response = await axios.post('http://localhost:5000/api/auth/check-auth',
                    { token: authData.token })

                if (response.status === 200) {
                    const authResponse = {
                        isAuth: true,
                        token: response.data.token,
                        userID: response.data.userID,
                        userRole: response.data.userRole
                    }
                    setAuth(authResponse)
                    localStorage.setItem('auth-state', JSON.stringify(authResponse))
                }
            }
        }
        checkToken()
    }, [])

    const routes = useRoutes(auth, setAuth)

    return (
        <Router>
            <div className="App">
                {routes}
            </div>
        </Router>
    )
}

export default App
