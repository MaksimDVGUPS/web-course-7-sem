import React from 'react'
import trashIcon from '../assets/images/trash.svg'

function CartItem({cart, food, count, minusCount, plusCount, onDelete}) {
    const handlePlusClick = () => {
        plusCount(food._id)
    }

    const handleMinusClick = () => {
        minusCount(food._id)
    }

    const handleDeleteClick = () => {
        onDelete(food._id)
    }

    return (
        <div key={food._id} className="cart-item">
            <div className="cart-item__header">
                <img src={`http://localhost:5000/${food.img}`} alt="" className="cart-item__img"/>
                <p className="cart-item__name">{food.title}</p>
            </div>
            <div className="cart-item__controls">
                <button type="button" className="cart-item__controls-btn" onClick={handleMinusClick}>-</button>
                <span className="cart-item__controls-count">
                    {count}
                </span>
                <button type="button" className="cart-item__controls-btn"
                        onClick={handlePlusClick}>+</button>
            </div>
            <div className="cart-item__price">
                <span>{(count * food.price).toFixed(2)}</span>
                <span>₽</span>
            </div>
            <button className="cart-item__delete" onClick={handleDeleteClick}>
                <img src={trashIcon} alt="Удалить"/>
            </button>
        </div>
    )
}

export default CartItem