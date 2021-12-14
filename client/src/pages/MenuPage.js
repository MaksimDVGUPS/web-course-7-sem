import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import cart from '../assets/images/add_to_cart.svg'
import '../assets/css/menu.scss'
import axios from "axios";

export const MenuPage = () => {
    const [foods, setFoods] = useState([])

    useEffect(() => {
        async function fetchFoods () {
            const response = await axios.get('http://localhost:5000/api/category/with-foods')
            setFoods(response.data)
        }
        fetchFoods()
    }, [])

    function addToCart (e) {
        const foodID = e.target.closest('.card').attributes.getNamedItem('id').value

        let cart = []

        if (localStorage && localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))

            const indexInCart = cart.indexOf(cart.find(food => food.id === foodID))

            if (indexInCart !== -1) {
                cart[indexInCart].quantity++
            } else {
                cart.push({
                    id: foodID,
                    quantity: 1
                })
            }
        } else {
            cart = [{
                id: foodID,
                quantity: 1
            }]
        }

        localStorage.setItem('cart', JSON.stringify(cart))
    }

    return (
        <>
            <Header h1='Меню нашего ресторана' />
            <Nav />
            <div className="block" id="menu">
                <div className="blackFilter">
                    <div className="wrapper">
                        <div className="categories">
                            {foods.map(category => {
                                return (
                                    <a className="category" key={category._id} href={`#${category._id}`}>{category.title}</a>
                                )
                            })}
                        </div>
                        <div className="menu">
                            {foods.map(category => {
                                if (category.foods.length !== 0) {
                                    return (
                                        <div key={category._id} id={category._id}>
                                            <div className="sectionName">{category.title}</div>
                                            <div className="cardWrapper">
                                                {category.foods.map(food => {
                                                    return (
                                                        <div className="card" key={food._id} id={food._id}>
                                                            <div className="imgWrapper">
                                                                <img src={`http://localhost:5000/${food.img}`} alt={food.title}
                                                                     title={food.title} />
                                                            </div>
                                                            <div className="title">{food.title}</div>
                                                            <div className="description">{food.description}</div>
                                                            <div className="cardFooter">
                                                                <div className="price">{food.price}₽</div>
                                                                <button onClick={addToCart} className="cardCart">
                                                                    <img src={cart} alt="Добавить в корзину"
                                                                         title="Добавить в корзину" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                }
                                return undefined
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}