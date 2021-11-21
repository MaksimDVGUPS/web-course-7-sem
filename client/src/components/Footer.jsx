import React from 'react'
import {Link} from "react-router-dom";
import whatsApp from '../assets/images/whatsapp.png'
import facebook from '../assets/images/facebook.png'
import inst from '../assets/images/inst.png'

function Footer(props) {
    return (
        <footer className="block" id="footer">
            <div className="wrapper">
                <div className="info"> ООО "ТайЖгуч" © 2021</div>
                <div className="links">
                    <Link to='/cart'>Корзина</Link>
                    <Link to='/contacts'>Информация о компании</Link>
                    <Link to='/oferta'>Публичная оферта</Link>
                </div>
                <div className="shares">
                    <a href="https://api.whatsapp.com/send?phone=66848722727">
                        <img src={whatsApp} alt="WhatsApp" title="WhatsApp" />
                    </a>
                    <a href="https://www.instagram.com/thaizhguch/">
                        <img src={facebook} alt="Facebook" title="Facebook" />
                    </a>
                    <a href="https://www.instagram.com/thaizhguch/">
                        <img src={inst} alt="Instagram" title="Instagram" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer