import React from 'react'
import kavichka from '../assets/images/kavichka.svg'
import {Link} from "react-router-dom";

function Nav(props) {
    return (
        <div className="block" id="nav">
            <div className="wrapper">
                <img src={kavichka} alt="Кавычка-ёлочка" title="Кавычка-ёлочка" />
                <Link to='/menu'>Меню</Link>
                <Link to='/cart'>Корзина</Link>
                <Link to='/contacts'>Контакты</Link>
                <Link to='/about'>О нас</Link>
                <img src={kavichka} alt="Кавычка-ёлочка" title="Кавычка-ёлочка" />
            </div>
        </div>
    )
}

export default Nav