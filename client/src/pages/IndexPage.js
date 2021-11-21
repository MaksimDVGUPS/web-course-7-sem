import React from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import '../assets/css/index.scss'
import tomyam from '../assets/images/tomyam.png'
import ananas from '../assets/images/ananas.png'
import karri from '../assets/images/karri.png'
import salat from '../assets/images/salat.png'
import {Link} from "react-router-dom";

export const IndexPage = () => {
    return (
        <>
            <Header h1='Ресторан тайской кухни' />
            <Nav />
            <div className="block" id="mainBlock">
                <div className="blackFilter">
                    <div className="wrapper">
                        <div className="popular">
                            <img src={tomyam} alt="Суп 'Том Ям'" title="Суп 'Том Ям'" />
                            <div className="popularContainer">
                                <h2 className="header">Популярные блюда</h2>
                                <div className="description">
                                    В меню вы найдете самые популярные блюда тайской кухни,
                                    приготовленные по аутентичным рецептам с настоящими тайскими
                                    специями и соусами.
                                </div>
                                <Link to='/menu' className={"button header"}>
                                    <div className="header">МЕНЮ</div>
                                </Link>
                            </div>
                        </div>
                        <div className="cardsWrapper">
                            <div className="card">
                                <img src={ananas} alt="Ананасовый жаренный рис"
                                     title="Ананасовый жаренный рис" />
                                <div className="cardHeader">Ананасовый жаренный рис</div>
                                <div className="cardDescriptor">
                                    Аппетитный жаренный рис с креветками, кешью,
                                    кусоками овощей и ананаса. Блюдо не острое,
                                    а значит порадует и детей.
                                </div>
                            </div>
                            <div className="card">
                                <img src={karri} alt="Зелённое карри с курицей"
                                     title="Зелённое карри с курицей" />
                                <div className="cardHeader">Зелённое карри с курицей</div>
                                <div className="cardDescriptor">
                                    Аутентичное тайское карри, куда мы не пожалели
                                    листьев кафир-лайма и базилика, чтобы вкус
                                    был максимально насыщенным.
                                </div>
                            </div>
                            <div className="card">
                                <img src={salat}
                                     alt="Салат «лап му» с рисовой крошкой и мятой — это нечто невероятное!"
                                     title="Острый мясной салат" />
                                <div className="cardHeader">Острый мясной салат</div>
                                <div className="cardDescriptor">
                                    Салат «лап му» с рисовой крошкой и мятой — это нечто невероятное!
                                </div>
                            </div>
                        </div>
                        <Link to='/delivery' className="button" >
                            <div className="header">Онлайн заказ тайской еды в Москве</div>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}