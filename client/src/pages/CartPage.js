import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import '../assets/css/cart.scss'
import axios from "axios";
import CartItem from "../components/CartItem";

export const CartPage = () => {
    const [cart, setCart] = useState(initialCart())
    const [sended, setSended] = useState(false)

    function initialCart () {
        if (localStorage && localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'))
        } else {
            return null
        }
    }

    const [foodInfo, setFoodInfo] = useState([])

    useEffect(() => {
        async function fetchFoodFromCart (IDs) {
            const response =  await axios.get('http://localhost:5000/api/food/few', {params: {IDs: JSON.stringify(IDs)}})
            setFoodInfo(response.data)
        }

        const IDs = []

        if (cart) {
            for (const food of cart) {
                IDs.push(food.id)
            }

            fetchFoodFromCart(IDs)
        }
    }, [cart])

    const plusCount = (id) => {
        const newCart = cart.filter(item => {
            if (item.id === id) {
                item.quantity++
            }
            return item
        })

        setCart(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
    }

    const minusCount = (id) => {
        const newCart = cart.filter(item => {
            if (item.id === id && item.quantity > 1) {
                item.quantity--
            }
            return item
        })

        setCart(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
    }

    const deleteFood = (id) => {
        const newCart = cart.filter(item => item.id !== id)
        const newFoodInfo = foodInfo.filter(item => item._id !== id)

        setFoodInfo(newFoodInfo)
        setCart(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
    }

    const sendOrder = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        formData.append('cart', JSON.stringify(cart))

        const response =  await axios.post('http://localhost:5000/api/orders', formData)

        if (response.status === 200) {
            localStorage.setItem('cart', JSON.stringify([]))
            setCart([])
            setSended(true)
        }
    }

    return (
        <>
            <Header h1='Ваша корзина' />
            <Nav />
            <div className="block" id="cart">
                <div className="blackFilter">
                    <div className="wrapper">
                        <div className="cart">
                            <h2>Выбранные блюда</h2>
                            <div className="cart__wrapper">
                                {cart && cart.length !== 0 ? foodInfo.map(food => {
                                    return (
                                        <CartItem key={food._id} count={cart.find(cartItem => (cartItem.id === food._id)).quantity} food={food}
                                                  minusCount={minusCount} plusCount={plusCount} onDelete={deleteFood}/>
                                    )
                                }) : (sended)
                                    ? <p>Ваш заказ успешно отправлен! Скоро наш менеджер свяжется с вами!</p>
                                    : <p>В вашей корзине нет товаров</p>}
                            </div>
                            {cart && cart.length !== 0 &&
                                <>
                                    <h2>Заполните форму заказа</h2>
                                    <form className="cart__form" onSubmit={sendOrder}>
                                        <div className="cart__field" tabIndex="1">
                                            <p>
                                                Ваше имя
                                            </p>
                                            <input name="username" type="text" placeholder="Гордон Рамзи" required />
                                        </div>
                                        <div className="cart__field" tabIndex="2">
                                            <p htmlFor="phone">
                                                Номер телефона
                                            </p>
                                            <input name="phone" type="tel" placeholder="+7(999)999-99-99" required />
                                        </div>
                                        <div className="cart__field" tabIndex="3">
                                            <p htmlFor="message">
                                                Ваш адрес
                                            </p>
                                            <input name="address" placeholder="ул. Пушкина, д. Колотушкина..."></input>
                                        </div>
                                        <div className="cart__field" tabIndex="4">
                                            <p htmlFor="message">
                                                Ваш комментарий
                                            </p>
                                            <input name="message" placeholder="Дополнительно..."></input>
                                        </div>
                                        <button className="cart__submit" type="sumbit">Подтвердить заказ</button>
                                    </form>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}