import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes } from 'react-router-dom';
import * as A from '../pages';
import { AdminLayout } from '../components/layout';
export function Router() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(A.Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(A.Register, {}) }), _jsx(Route, { path: "/home", element: _jsx(AdminLayout, { children: _jsx(A.Home, {}) }) }), _jsx(Route, { path: "/profile", element: _jsx(AdminLayout, { children: _jsx(A.Profile, {}) }) }), _jsx(Route, { path: "/quotations", element: _jsx(AdminLayout, { children: _jsx(A.Quotations, {}) }) }), _jsx(Route, { path: "/quotations/:quotationId", element: _jsx(AdminLayout, { children: _jsx(A.QuotationIntegration, {}) }) }), _jsx(Route, { path: "/users", element: _jsx(AdminLayout, { children: _jsx(A.Users, {}) }) })] }));
}
