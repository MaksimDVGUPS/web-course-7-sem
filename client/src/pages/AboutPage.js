import React from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import '../assets/css/about.scss'

export const AboutPage = () => {
    return (
        <>
            <Header h1='Меню нашего ресторана' />
            <Nav />
            <div className="block" id="contacts">
                <div className="blackFilter">
                    <div className="wrapper">
                        <div className="section">
                            <h2 className="sectionName">Реквизиты</h2>
                            <p>ООО «ТАЙЖГУЧ»</p>
                            <p>ИНН/КПП 9728023881/ 772801001</p>
                            <p>ОГРН 1207700503911</p>
                            <p>Юридический адрес:</p>
                            <p>117463 Г.Москва ВН.ТЕР.Г. МУНИЦИПАЛЬНЫЙ ОКРУГ ЯСЕНЕВО ПР-КТ НОВОЯСЕНЕВСКИЙ Д. 32, К. 1
                                ЭТАЖ/ПОМЕЩ. 1/VI КОМ./ОФИС 2/322</p>
                            <p>Телефон/факс: +79853971606</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}