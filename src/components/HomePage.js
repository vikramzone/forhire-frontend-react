import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Carousal from './HomePage_Carousal';
import Marketing from './HomePage_Marketing'
import './HomePage.css'
import Footer from './Footer'
import $ from 'jquery'
import NavBar from './NavBar';

export default function HomePage(props){

    
return (

<React.Fragment>
<NavBar/>
<Carousal/>
<Marketing/>
</React.Fragment>

);
}