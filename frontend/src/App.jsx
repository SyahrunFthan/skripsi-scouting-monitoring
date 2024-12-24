import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Activities,
  Auth,
  ContributionCreate,
  Contributions,
  CreataActivities,
  CreateSchools,
  Dashboard,
  EditActivities,
  EditContribution,
  EditSchools,
  Home,
  NotFound,
  Schools,
} from "./page";
import PrivateRoute from "./middleware/Private";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Home />} />

        <Route path="/admin/auth" element={<Auth />} />

        <Route path="/admin" element={<Navigate to="/admin/auth" replace />} />

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/activities"
          element={
            <PrivateRoute>
              <Activities />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/activities/create"
          element={
            <PrivateRoute>
              <CreataActivities />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/activities/edit/:id"
          element={
            <PrivateRoute>
              <EditActivities />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/schools"
          element={
            <PrivateRoute>
              <Schools />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/schools/create"
          element={
            <PrivateRoute>
              <CreateSchools />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/schools/edit/:id"
          element={
            <PrivateRoute>
              <EditSchools />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/contributions"
          element={
            <PrivateRoute>
              <Contributions />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/contributions/create"
          element={
            <PrivateRoute>
              <ContributionCreate />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/contributions/edit/:id"
          element={
            <PrivateRoute>
              <EditContribution />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
