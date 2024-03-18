import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import the pages
import Home from "./pages/Home";
import Login from "./pages/Login";
// Import the components
import Layout_mountain from './components/Layout_mountain';
import Layout_forest from './components/Layout_forest';
import Layout_ocean from './components/Layout_ocean';
import RequireAuthentication from './components/RequireAuthentication';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout_mountain />}>
        <Route index element={<Home lay="1" />} />
        <Route path="login" element={<Login lay="1" />} />
        </Route>

        <Route path="/vaihtoehto2" element={<Layout_ocean />}>
          <Route index element={<Home lay="2" />} />
          <Route path="login" element={<Login lay="2" />} />
        </Route>

        {/* <Route element={<RequireAuthentication />}>
          <Route path="user" element={<User />} />
          <Route path="appt" element={<UserAppt />} />
          <Route path="createappt" element={<UserCreateAppt />} />
          <Route path="admin" element={<Admin />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="createappointments" element={<AdminCreateAppointments />} />
        </Route> */}
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;
