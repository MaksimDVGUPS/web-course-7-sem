import React from "react"
import {BrowserRouter as Router} from "react-router-dom"
import {useRoutes} from "./routes"
import './assets/css/template.scss'

function App() {
    const routes = useRoutes(true)

    return (
        <Router>
            <div className="App">
                {routes}
            </div>
        </Router>
    )
}

export default App
