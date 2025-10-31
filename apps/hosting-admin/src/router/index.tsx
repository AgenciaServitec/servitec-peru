import { Navigate, Route, Routes } from "react-router-dom";
import * as A from "../pages";
import { AdminLayout } from "../components";
import { PrivateRoute } from "./PrivateRoute";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<A.Login />} />
      <Route path="/register" element={<A.Register />} />
      <Route
        path="/quotations/:quotationId/sheets"
        element={<A.QuotationSheets />}
      />

      <Route element={<PrivateRoute />}>
        <Route
          path="/home"
          element={
            <AdminLayout>
              <A.Home />
            </AdminLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <AdminLayout>
              <A.Profile />
            </AdminLayout>
          }
        />
        <Route
          path="/quotations"
          element={
            <AdminLayout>
              <A.QuotationsIntegrations />
            </AdminLayout>
          }
        />
        <Route
          path="/quotations/:quotationId"
          element={
            <AdminLayout>
              <A.QuotationIntegration />
            </AdminLayout>
          }
        />
        <Route
          path="/assistances"
          element={
            <AdminLayout>
              <A.AssistancesIntegration />
            </AdminLayout>
          }
        />
        <Route
          path="/assistances/assistance"
          element={
            <AdminLayout>
              <A.AssistanceIntegration />
            </AdminLayout>
          }
        />
        <Route
          path="/assistances/register"
          element={
            <AdminLayout>
              <A.FaceRegistration />
            </AdminLayout>
          }
        />
        <Route
          path="/users"
          element={
            <AdminLayout>
              <A.Users />
            </AdminLayout>
          }
        />
        <Route
          path="/users/:userId"
          element={
            <AdminLayout>
              <A.UserIntegration />
            </AdminLayout>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
