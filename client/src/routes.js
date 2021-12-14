import React from "react";
import {Routes, Route} from "react-router-dom";
import {CartPage} from "./pages/CartPage";
import {AuthPage} from "./pages/AuthPage";
import {IndexPage} from "./pages/IndexPage";
import {MenuPage} from "./pages/MenuPage";
import {ContactsPage} from "./pages/ContactsPage";
import {AboutPage} from "./pages/AboutPage";
import {OfertaPage} from "./pages/OfertaPage";
import {AllFoodsPage} from "./pages/AllFoodsPage";
import {AllCategoriesPage} from "./pages/AllCategoriesPage";
import {AllUsersPage} from "./pages/AllUsersPage";

export const useRoutes = (auth, setAuth) => {
    if (auth.isAuth) {
        return (
            <Routes>
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/oferta" element={<OfertaPage />} />
                <Route path="/admin" element={<AllFoodsPage setAuth={setAuth} />} />
                <Route path="/admin/categories" element={<AllCategoriesPage setAuth={setAuth} />} />
                <Route path="/admin/users" element={<AllUsersPage auth={auth} setAuth={setAuth} />} />
                <Route path="*" element={<IndexPage />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/oferta" element={<OfertaPage />} />
            <Route path="/admin/*" element={<AuthPage auth={auth} setAuth={setAuth} />} />
            <Route path="*" element={<IndexPage />} />
        </Routes>
    )
}