import React, {useState} from 'react'
import cn from 'classnames'
import {Link} from "react-router-dom";
import '../assets/css/admin.scss'

function AdminLayout({ setAuth, children }) {
    const [navVisible, setNavVisible] = useState(false)

    const logout = () => {
        const authLogout = {
            isAuth: false
        }
        setAuth(authLogout)
        localStorage.setItem('auth_state', JSON.stringify(authLogout))
    }

    return (
        <>
            <nav className="admin-nav">
                <div className="container admin-nav__container">
                    <span className="admin-nav__title">Админ-панель</span>
                    <div className={cn("admin-nav__links", {"active" : navVisible})}>
                        <Link to="/admin" className="admin-nav__link">Блюда</Link>
                        <Link to="/admin/categories" className="admin-nav__link">Категории</Link>
                        <Link to="/admin/users" className="admin-nav__link">Пользователи</Link>
                        <Link to="/admin" className="admin-nav__link" onClick={logout}>Выйти</Link>
                    </div>
                    <div className={cn("admin-nav__toggle", {"active" : navVisible})}
                         onClick={() => {setNavVisible(!navVisible)}}>
                        <div className="admin-nav__toggle-line"></div>
                        <div className="admin-nav__toggle-line"></div>
                        <div className="admin-nav__toggle-line"></div>
                    </div>
                </div>
            </nav>
            <main>
                <div className="container">
                    {children}
                </div>
            </main>
        </>
    )
}

export default AdminLayout