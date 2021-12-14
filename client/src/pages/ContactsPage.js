import React, {useState} from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import '../assets/css/contacts.scss'
import axios from "axios";

export const ContactsPage = () => {
    const [sended, setSended] = useState(false)

    const sendForm = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const response =  await axios.post('http://localhost:5000/api/orders', formData)

        if (response.status === 200) {
            setSended(true)
        }
    }

    return (
        <>
            <Header h1='Меню нашего ресторана' />
            <Nav />
            <div className="block" id="mainBlock">
                <div className="blackFilter">
                    <div className="wrapper">
                        <div className="contacts_wrapper">
                            <form onSubmit={sendForm}>
                                {!sended
                                    ? <>
                                        <h3>Форма связи по любым вопросам</h3>
                                        <div className="field" tabIndex="1">
                                            <p>Ваше имя</p>
                                            <input name="username" type="text" placeholder="Гордон Рамзи" required />
                                        </div>
                                        <div className="field" tabIndex="2">
                                            <p htmlFor="phone">Номер телефона</p>
                                            <input name="phone" type="tel" placeholder="+7(999)999-99-99" required />
                                        </div>
                                        <div className="field" tabIndex="3">
                                            <p htmlFor="message">Ваше сообщение или комментарий</p>
                                            <textarea name="message" placeholder="Хочу узнать о..."></textarea>
                                        </div>
                                        <button type="sumbit">Заказать звонок</button>
                                    </>
                                    : <h3>Спасибо за ваше обращение! В ближайшее время Вам позвонит нащ менеджер.</h3>
                                }
                            </form>
                            <div className="contacts">
                                <div className="object">
                                    <h3>Фактический адрес</h3>
                                    <p>Москва, Ветошный переулок дом 9, Торговый центр «Никольский пассаж».</p>
                                    <p>Станции метро: «Площадь Революции», «Китай-город», «Охотный ряд».</p>
                                </div>
                                <div className="object">
                                    <h3>Электронная почта по всем вопросам</h3>
                                    <p>contact@thaizhguch.com</p>
                                </div>
                                <div className="object">
                                    <h3>Телефон доставки в Зеленограде</h3>
                                    <p>+7 903 273-67-23, Анна</p>
                                </div>
                            </div>
                        </div>
                        <div className="recvizits">
                            <h3>Реквизиты</h3>
                            <p>ООО «ТАЙЖГУЧ» ИНН/КПП 9728023881/ 772801001, ОГРН 1207700503911</p>
                            <p>Юридический адрес:</p>
                            <p>117463 Г.Москва ВН.ТЕР.Г. МУНИЦИПАЛЬНЫЙ ОКРУГ ЯСЕНЕВО ПР-КТ НОВОЯСЕНЕВСКИЙ Д. 32, К. 1
                                ЭТАЖ/ПОМЕЩ. 1/VI КОМ./ОФИС 2/322</p>
                            <p>Телефон/факс: +79853971606</p>

                            <h3>При возникновение проблем с оплатой</h3>
                            <p>Пожалуйста, пишите на электронную почту: contact@thaizhguch.com</p>
                        </div>
                        <iframe
                            src="https://yandex.ru/map-widget/v1/?um=constructor%3A143e14f6a3b336072e5b8762d804bab3372deca4dd80177d6a036f8835f4bd74&amp;source=constructor"
                            width="100%" height="500" frameBorder="0" title="map"></iframe>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}