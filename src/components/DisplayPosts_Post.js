import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './DisplayPosts.css'
import {Link} from 'react-router-dom'

export default function Post(props){
 
  const cardImgStyle={
    height: "225px",
    width: "300px"
 }

  return (
      
    <div className="row">
        <div className="card mb-4 m-3" >
            
            <img className="card-img-top" alt="No img" src={process.env.PUBLIC_URL+'/img/posts/'+props.photo}  data-holder-rendered="true" style={cardImgStyle}/>
            <div className="card-body">
                <h4 className="card-text">{props.title}</h4><small className="card-text text-muted float-right">{props.duration_price} $ per hour</small><br/>
                <hr/>
                <h4 className="lead font-weight-normal card-text">{props.description.substring(0,28) + '....'}</h4>
                <div className="d-flex justify-content-between align-items-center">
                    <form method="get" action="">
                    <Link to={"/viewPost/"+props.id}><button type="submit" className="float-left btn btn-md btn-primary">View</button></Link>
                    </form>
                        
                </div>
            </div>
        </div> 
    </div>

      
      
  ); }
