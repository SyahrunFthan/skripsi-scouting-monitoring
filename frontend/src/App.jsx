import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Activities,
  ContributionCreate,
  Contributions,
  CreataActivities,
  CreateSchools,
  Dashboard,
  EditActivities,
  EditContribution,
  EditSchools,
  NotFound,
  Schools,
} from "./page";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/activities/create" element={<CreataActivities />} />
        <Route path="/activities/edit/:id" element={<EditActivities />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/schools/create" element={<CreateSchools />} />
        <Route path="/schools/edit/:id" element={<EditSchools />} />
        <Route path="/contributions" element={<Contributions />} />
        <Route path="/contributions/create" element={<ContributionCreate />} />
        <Route path="/contributions/edit/:id" element={<EditContribution />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
