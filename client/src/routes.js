import React from "react";
import {Routes, Route} from "react-router-dom";
import {CartPage} from "./pages/CartPage";
import {AuthPage} from "./pages/AuthPage";
import {IndexPage} from "./pages/IndexPage";
import {MenuPage} from "./pages/MenuPage";
import {ContactsPage} from "./pages/ContactsPage";
import {AboutPage} from "./pages/AboutPage";
import {OfertaPage} from "./pages/OfertaPage";
import {AdminPage} from "./pages/AdminPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/oferta" element={<OfertaPage />} />
                <Route path="/admin" element={<AdminPage />} />
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
            <Route path="/admin" element={<AuthPage />} />
            <Route path="*" element={<IndexPage />} />
        </Routes>
    )
}