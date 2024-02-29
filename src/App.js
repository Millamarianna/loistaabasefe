import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import the pages
import Home from "./pages/Home";
// Import the components
import Layout from './components/Layout';
//import RequireAuthentication from './components/RequireAuthentication';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        {/* <Route element={<RequireAuthentication />}>
          <Route path="user" element={<User />} />
          <Route path="appt" element={<UserAppt />} />
          <Route path="createappt" element={<UserCreateAppt />} />
          <Route path="admin" element={<Admin />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="createappointments" element={<AdminCreateAppointments />} />
        </Route> */}
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
