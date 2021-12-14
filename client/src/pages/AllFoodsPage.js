import React, {useEffect, useState} from "react";
import AdminLayout from "../components/AdminLayout";
import AdminHeader from "../components/AdminHeader";
import axios from "axios";
import trashIcon from "../assets/images/trash.svg";
import Modal from "../components/Modal";

export const AllFoodsPage = ({ setAuth }) => {
    const [foods, setFoods] = useState([])
    const [addModalVisible, setAddModalVisible] = useState(false)
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [waitForDelete, setWaitForDelete] = useState('')

    useEffect(() => {
        async function fetchFoods () {
            const response = await axios.get('http://localhost:5000/api/category/with-foods')
            setFoods(response.data)
        }
        fetchFoods()
    }, [])

    function showAddModal () {
        setAddModalVisible(true)
    }

    function showDeleteModal (e) {
        setWaitForDelete(e.currentTarget.attributes['data-delete'].value)
        setDeleteModalVisible(true)
    }

    function hideModal () {
        setAddModalVisible(false)
        setDeleteModalVisible(false)
    }

    async function addFood (e) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const response = await axios.post('http://localhost:5000/api/food', formData)

        if (response.status === 201) {
            setFoods(response.data.foods)
            setAddModalVisible(false)
        }
    }

    async function deleteFood () {
        const response = await axios.delete('http://localhost:5000/api/food', {
            params: { _id: waitForDelete }
        })

        if (response.status === 200) {
            setFoods(response.data.foods)
            setDeleteModalVisible(false)
        }
    }

    return (
        <AdminLayout setAuth={setAuth}>
            <AdminHeader title="Все блюда" btnText="Добавить блюдо" onClick={showAddModal} />
            <div className="admin-list">
                {foods.map(category => {
                    return (
                        <div key={category._id} id={category._id}>
                            <div className="sectionName admin-category-name">{category.title}</div>
                            <div className="cardWrapper">
                                {category && category.foods.length > 0 ? category.foods.map(food => {
                                    return (
                                        <div className="card admin-card" key={food._id} id={food._id}>
                                            <div className="imgWrapper">
                                                <img src={`http://localhost:5000/${food.img}`} alt={food.title}
                                                     title={food.title} />
                                            </div>
                                            <div className="title">{food.title}</div>
                                            <div className="description">{food.description}</div>
                                            <div className="cardFooter">
                                                <div className="price">{food.price}₽</div>
                                                <button className="cardCart" onClick={showDeleteModal} data-delete={food._id}>
                                                    <img src={trashIcon} alt="Удалить"/>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                                : <p className="admin-list__empty">Категория пуста</p>}
                            </div>
                        </div>
                    )
                })}
            </div>
            {addModalVisible &&
                <Modal hideModal={hideModal}>
                    <form className="add-food" onSubmit={addFood}>
                        <h3 className="modal__title">Добавить блюдо</h3>
                        <div className="modal__field">
                            <label>Название блюда</label>
                            <input type="text" name="title" required/>
                        </div>
                        <div className="modal__field">
                            <label>Описание</label>
                            <input type="text" name="description" required/>
                        </div>
                        <div className="modal__field">
                            <label>Цена</label>
                            <input type="number" min="0.01" max="9999" step="0.01" name="price" required/>
                        </div>
                        <div className="modal__field">
                            <label>Категория</label>
                            <select name="categoryId" required>
                                <option value="">Выберите категорию</option>
                                {foods.map(category => {
                                    return (
                                        <option key={category._id} value={category._id}>{category.title}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="modal__field">
                            <label>Изображение</label>
                            <input type="file" accept=".png" name="img" required/>
                        </div>
                        <button className="modal__success-btn" type="submit">Добавить блюдо</button>
                    </form>
                </Modal>
            }
            {deleteModalVisible &&
                <Modal hideModal={hideModal}>
                    <h3 className="modal__title">Вы уверены, что хотите удалить это блюдо?</h3>
                    <div className="modal__btns">
                        <button className="modal__danger-btn" onClick={hideModal}>Отменить</button>
                        <button className="modal__success-btn" onClick={deleteFood}>Удалить блюдо</button>
                    </div>
                </Modal>
            }
        </AdminLayout>
    )
}