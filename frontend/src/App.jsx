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
  NewsCreate,
  NewsPage,
  NotFound,
  Schools,
  UpdateNews,
} from "./page";
import PrivateRoute from "./middleware/Private";
import News from "./page/Home/News";
import Chart from "./page/Home/Chart";
import About from "./page/Home/About";
import Gallery from "./page/Home/Gallery";
import Addrress from "./page/Home/Address";
import DetailAbout from "./page/Home/About/Detail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/about" element={<About />} />
        <Route path="/about/:uuid" element={<DetailAbout />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/address" element={<Addrress />} />

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

        <Route
          path="/admin/news"
          element={
            <PrivateRoute>
              <NewsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/news/create"
          element={
            <PrivateRoute>
              <NewsCreate />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/news/:id"
          element={
            <PrivateRoute>
              <UpdateNews />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
