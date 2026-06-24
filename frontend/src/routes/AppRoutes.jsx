import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";

import CategoryList from "../pages/categories/CategoryList";

import ModuleList from "../pages/modules/ModuleList";

import QueryList from "../pages/queryDefinitions/QueryList";
import CreateQuery from "../pages/queryDefinitions/CreateQuery";
import EditQuery from "../pages/queryDefinitions/EditQuery";
import PermissionList from "../pages/permissions/PermissionList";

import QueryPreview from "../pages/queryDefinitions/QueryPreview";
import QueryVersions from "../pages/queryDefinitions/QueryVersions";

import HistoryList from "../pages/history/HistoryList";
import AuditLogList from "../pages/audit/AuditLogList";
import Settings from "../pages/settings/Settings";

import UserList from "../pages/users/UserList";
import RoleList from "../pages/roles/RoleList";

import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/roles"
          element={
            <ProtectedRoute>
              <RoleList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/audit"
          element={
            <ProtectedRoute>
              <AuditLogList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/permissions"
          element={
            <ProtectedRoute>
              <PermissionList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <CategoryList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/modules"
          element={
            <ProtectedRoute>
              <ModuleList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/query-definitions"
          element={
            <ProtectedRoute>
              <QueryList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/query-definitions/create"
          element={
            <ProtectedRoute>
              <CreateQuery />
            </ProtectedRoute>
          }
        />

        <Route
          path="/query-definitions/:id/edit"
          element={
            <ProtectedRoute>
              <EditQuery />
            </ProtectedRoute>
          }
        />

        <Route
          path="/query-definitions/:id/preview"
          element={
            <ProtectedRoute>
              <QueryPreview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/query-definitions/:id/versions"
          element={
            <ProtectedRoute>
              <QueryVersions />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
