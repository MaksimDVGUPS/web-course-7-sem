import React, {useState} from "react";
import axios from "axios";

export const AuthPage = ({ auth, setAuth }) => {
    const [error, setError] = useState('')

    const login = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        try {
            const response =  await axios.post('http://localhost:5000/api/auth/login', formData)

            if (response.status === 200) {
                const authResponse = {
                    isAuth: true,
                    token: response.data.token,
                    userID: response.data.userID,
                    userRole: response.data.userRole
                }
                setAuth(authResponse)
                localStorage.setItem('auth_state', JSON.stringify(authResponse))
                return undefined
            }
        } catch (err) {
            setError('Некорректный e-mail и/или пароль')
        }
    }

    return (
        <div className="auth-page">
            <form className="auth-page__form" onSubmit={login}>
                <h1>Авторизация</h1>
                <p className="auth-page__label">E-mail</p>
                <input type="text" name="email" className="auth-page__input" placeholder="email@email.com"
                       pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required/>
                <p className="auth-page__label">Пароль</p>
                <input type="password" name="password" className="auth-page__input" placeholder="Ваш пароль" required/>
                {error ? <p className="auth-page__error">{error}</p> : ''}
                <button className="auth-page__btn">Войти</button>
            </form>
        </div>
    )
}