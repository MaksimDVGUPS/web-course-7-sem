import React from 'react'
import {Link} from "react-router-dom";
import fire_1 from '../assets/images/fire_1.png'
import fire_2 from '../assets/images/fire_2.png'
import fire_3 from '../assets/images/fire_3.png'
import pepper from '../assets/images/pepper.png'


function Header({h1}) {
    return (
        <div className="block" id="headerBlock">
            <div className="blackFilter">
                <img className="fire_1" src={fire_1} alt="Огонь png" title="Огонь" />
                <img className="fire_2" src={fire_2} alt="Огонь png" title="Огонь" />
                <img className="fire_3" src={fire_3} alt="Огонь png" title="Огонь" />
                <div className="wrapper">
                    <Link to='/'>
                        <img src={pepper} alt="Перец" title="Перец" />
                        <div className="headerText">ТАИ<span className="headerText-alt">ЖГУЧ</span></div>
                    </Link>
                    <h1 className="headerDescription niceText">
                        {h1}
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Header