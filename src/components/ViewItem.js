import React, { useEffect } from 'react'
import Axios from 'axios';
import { useSelector } from 'react-redux';
import {Link,useHistory} from 'react-router-dom'
import './ViewItem.css'
import './FullScreenLoading.css'
import NavBar from './NavBar';

export default function ViewItem(props){
    const store = useSelector(state => state); //hook provided by redux
    const [post,setPost] = React.useState({})
    const [isLoading,setLoading]=React.useState(true);

    let history = useHistory()

    const getPost = async () =>{
        const headers = {  headers: { Authorization: 'Bearer ' + store.user_details.token }  }
         await Axios.get('http://localhost:8080/posts/viewPost/'+props.match.params.id,headers)
        .then(response =>   { setPost(response.data); 
            setLoading(false)
            
        })
        .catch( err=>
           console.log(err) 
             
           )
       
    }
    useEffect( () => {
        getPost()
        },[])

    


    return ( 

        <React.Fragment>
            <NavBar/>
{isLoading? 
            <div className='loader'>      
            <img id='loadicon' alt='Loading...' src={process.env.PUBLIC_URL+'/img/loading.gif'} ></img>      
            </div> 
     :
<main class='container' role="main">
    <fieldset>
    <div class="card" className='box-shadow' >
	
	<div className="card-header text-center">
            <p className='display-3 font-weight-normal'>{post.title} </p>
    </div>             
            <div class="card-body">
                <h3 class='font-weight-bold ml-3'>Description </h3>                          
                <article class="row single-post  no-gutters">
                    <div class="col-md-7">
                        <div class="single-post-content-wrapper p-3">
                        <h5 class='lead font-weight-normal'>{post.description} </h5>
                        
            </div>
            </div>
            <div class='col-md-5'>
                <img className='sideImg' src={process.env.PUBLIC_URL+'/img/posts/'+post.id}  alt="no img provided"></img>
            </div>
            <hr/>
           
            </article>

            <h5 class='ml-3 font-weight-bold'>Contact Details </h5>
            <article class="row">
            <div class="col-md-8">

                        <div class="single-post-content-wrapper ml-2">
                        <h5 class='lead'>{post.contactDetails} </h5>
                        </div>
                        </div>

        
            </article>
        
            <div class="card-footer text-muted">
                    <span>Posted By: {post.userName}</span>
                    <span className='float-right'>Date Posted: {post.datePosted} </span><br/>
                    <span>Category: {post.category} </span>
            </div>
        </div>
        </div>

    </fieldset> 
    
    <br/>
                            
    {post.type && post.type.startsWith("request") &&
    <div>
        <p class='lead text-right'>Think you can provide this product/service? <strong>Make a listing!</strong></p>
        <Link to="/makeNewPost"> <button type="submit" name="UserAction" value="new_listing" class="add float-right btn btn-success btn-lg">Provide Listing</button> </Link>
    </div>
    }
                                                        
     <button onClick={ ()=> history.goBack()}class="btn btn-danger btn-lg">Back </button>                       

</main>
}
</React.Fragment>
);  


}
