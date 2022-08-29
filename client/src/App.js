import React from "react";
import { Register, Error, Landing, ProtectedRoute } from "./pages";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom"
import {
  AddJob,
  AllJobs,
  Profile,
  SharedLayout,
  Stats
} from "./pages/Dashboard"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Stats />} />
          <Route path='/all-jobs' element={<AllJobs />} />
          <Route path='/add-job' element={<AddJob />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/landing" element={<Landing />} />
        <Route exact path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
