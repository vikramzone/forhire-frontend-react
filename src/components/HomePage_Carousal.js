
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'


export default function Carousal(){
    const store = useSelector(state => state)

    return(
        
        <React.Fragment>        
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
        <div className="carousel-item active">
        <img className="first-slide" src={process.env.PUBLIC_URL + '/img/4.jpg'} alt="First slide"></img>
        <div className="container">
        <div className="carousel-caption text-left">
            <h1>Planning to play a sport this weekend but don't have the kit?</h1>
        
            <p> {store.user_details == undefined && 'Join us Today and'} Checkout our Outdoor recreation section before buying the whole expensive kit !</p>
            
            {store.user_details == undefined ?<button data-toggle="modal" data-target="#signup" className='float-left btn btn-lg btn-success'>Sign Up</button> : <Link to="/viewAds"> <button className='float-left btn btn-lg btn-success'>View Listings</button></Link> }
        </div>
        </div>
        </div>
        
        <div className="carousel-item">
        <img className="second-slide" src={process.env.PUBLIC_URL + '/img/5.jpg'}  alt="Second slide"></img>
        <div className="container">
        <div className="carousel-caption text-right">
            <h1> Want to earn some side cash with your new MacBook ? </h1>
            <p> {store.user_details == undefined && 'Join us Today and'} Make a Listing at ForHire! The world's largest rental market place! Get instant access to thousands of people looking for your product! </p>
            {store.user_details == undefined ?<button data-toggle="modal" data-target="#signup" className='float-left btn btn-lg btn-success'>Sign Up</button> : <Link to="/postAd"> <button className='float-left btn btn-lg btn-success'>Make a Listing</button></Link> }
        </div>
        </div>
        </div>
        <div className="carousel-item">
        <img className="third-slide" src={process.env.PUBLIC_URL + '/img/2.jpg'} alt="Third slide"></img>
        <div className="container">
        <div className="carousel-caption text-left">
            <h1>Thinking of turning your awesome photography skills into profit ?</h1>
            <p>{store.user_details == undefined && 'Join Us Today and'} Advertise your skills at ForHire! The world's largest rental market place! 
        
             Get instant access to thousands of people looking for a skilled photographer! </p>
    {store.user_details == undefined ?<button data-toggle="modal" data-target="#signup" className='float-left btn btn-lg btn-success'>Sign Up</button> : <Link to="/postAd"> <button className='float-left btn btn-lg btn-success'>Make a Listing</button></Link> }
</div>
        </div>
        </div>
        </div>
        <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
        </a>
        </div>
        </React.Fragment>
    );
}