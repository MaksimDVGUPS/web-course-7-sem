import React, {useEffect, useState} from "react";
import AdminLayout from "../components/AdminLayout";
import AdminHeader from "../components/AdminHeader";
import Modal from "../components/Modal";
import axios from "axios";
import trashIcon from "../assets/images/trash.svg";

export const AllCategoriesPage = ({ setAuth }) => {
    const [categories, setCategories] = useState([])
    const [addModalVisible, setAddModalVisible] = useState(false)
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [waitForDelete, setWaitForDelete] = useState('')

    useEffect(() => {
        async function fetchCategories () {
            const response = await axios.get('http://localhost:5000/api/category')
            setCategories(response.data)
        }
        fetchCategories()
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

    async function addCategory (e) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const response = await axios.post('http://localhost:5000/api/category', formData)

        if (response.status === 201) {
            setCategories(response.data.categories)
            setAddModalVisible(false)
        }
    }

    async function deleteCategory () {
        const response = await axios.delete('http://localhost:5000/api/category', {
            params: { _id: waitForDelete }
        })

        if (response.status === 200) {
            setCategories(response.data.categories)
            setDeleteModalVisible(false)
        }
    }

    return (
        <AdminLayout setAuth={setAuth}>
            <AdminHeader title="Все категории блюд" btnText="Добавить категорию" onClick={showAddModal} />
            <div className="admin-list">
                {categories.length > 0 ? categories.map(category => {
                    return (
                        <div key={category._id} className="admin-list__item">
                            <div className="admin-list__info">
                                <span className="admin-list__name">{category.title}</span>
                                <span className="admin-list__count">(Количество блюд: {category.foods.length})</span>
                            </div>
                            {category.foods.length === 0 &&
                                <button className="admin-list__delete" onClick={showDeleteModal} data-delete={category._id}>
                                    <img src={trashIcon} alt="Удалить"/>
                                </button>
                            }
                        </div>
                    )
                })
                : <p className="admin-list__empty">Категорий нет в базе</p>}
            </div>
            {addModalVisible &&
            <Modal hideModal={hideModal}>
                <form className="add-food" onSubmit={addCategory}>
                    <div className="modal__field">
                        <label>Название новой категории</label>
                        <input type="text" name="title" required/>
                    </div>
                    <button className="modal__success-btn" type="submit">Добавить категорию</button>
                </form>
            </Modal>
            }
            {deleteModalVisible &&
            <Modal hideModal={hideModal}>
                <h3 className="modal__title">Вы уверены, что хотите удалить эту категорию?</h3>
                <div className="modal__btns">
                    <button className="modal__danger-btn" onClick={hideModal}>Отменить</button>
                    <button className="modal__success-btn" onClick={deleteCategory}>Удалить категорию</button>
                </div>
            </Modal>
            }
        </AdminLayout>
    )
}