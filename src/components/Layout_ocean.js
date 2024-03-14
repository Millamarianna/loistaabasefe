import { Outlet, Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';


import Header_ocean from './Header_ocean';
import Footer_ocean from "./Footer_ocean";


//Import useAuth hook
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
//import { BiSolidLock } from "react-icons/bi";
//import { BiSolidLockOpen } from "react-icons/bi";

const Layout_ocean = () => {



    return (
        <Container className="layout-container" fluid>
            <Header_ocean />
            
            <Outlet />
            <Footer_ocean />
        </Container>
    );
};


export default Layout_ocean;