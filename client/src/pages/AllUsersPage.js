import React, {useEffect, useState} from "react";
import AdminLayout from "../components/AdminLayout";
import AdminHeader from "../components/AdminHeader";
import Modal from "../components/Modal";
import axios from "axios";
import trashIcon from "../assets/images/trash.svg";

export const AllUsersPage = ({ auth, setAuth }) => {
    const [users, setUsers] = useState([])
    const [addModalVisible, setAddModalVisible] = useState(false)
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [waitForDelete, setWaitForDelete] = useState('')

    useEffect(() => {
        async function fetchUsers () {
            const response = await axios.get('http://localhost:5000/api/auth/user')
            setUsers(response.data)
        }
        fetchUsers()
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

    async function addUser (e) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const response = await axios.post('http://localhost:5000/api/auth/register', formData)

        if (response.status === 201) {
            setUsers(response.data)
            setAddModalVisible(false)
        }
    }

    async function deleteUser () {
        const response = await axios.delete('http://localhost:5000/api/auth/user', {
            params: { _id: waitForDelete }
        })

        if (response.status === 200) {
            setUsers(response.data.users)
            setDeleteModalVisible(false)
        }
    }

    return (
        <AdminLayout setAuth={setAuth}>
            <AdminHeader title="Все пользователи" btnText="Добавить пользователя" onClick={showAddModal} />
            <div className="admin-list">
                {users.length > 0 ? users.map(user => {
                        return (
                            <div key={user._id} className="admin-list__item">
                                <div className="admin-list__info">
                                    <span className="admin-list__name">{user.email}</span>
                                    <p className="admin-list__role">{user.role}</p>
                                </div>
                                {auth.userRole === 'Owner' && auth.userID !== user._id &&
                                    <button className="admin-list__delete" onClick={showDeleteModal} data-delete={user._id}>
                                        <img src={trashIcon} alt="Удалить"/>
                                    </button>
                                }
                            </div>
                        )
                    })
                    : <p className="admin-list__empty">Пользователей нет в базе</p>}
            </div>
            {addModalVisible &&
            <Modal hideModal={hideModal}>
                <form className="add-food" onSubmit={addUser}>
                    <div className="modal__field">
                        <label>E-mail</label>
                        <input type="text" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" name="email" required/>
                    </div>
                    <div className="modal__field">
                        <label>Пароль</label>
                        <input type="password" minLength="6" name="password" required/>
                    </div>
                    <button className="modal__success-btn" type="submit">Добавить пользователя</button>
                </form>
            </Modal>
            }
            {deleteModalVisible &&
            <Modal hideModal={hideModal}>
                <h3 className="modal__title">Вы уверены, что хотите удалить этого пользователя?</h3>
                <div className="modal__btns">
                    <button className="modal__danger-btn" onClick={hideModal}>Отменить</button>
                    <button className="modal__success-btn" onClick={deleteUser}>Удалить пользователя</button>
                </div>
            </Modal>
            }
        </AdminLayout>
    )
}