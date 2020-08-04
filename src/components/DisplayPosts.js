import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './DisplayPosts.css'
import Post from './DisplayPosts_Post'
import Footer from './Footer'
import { useSelector, useDispatch } from 'react-redux';
import {setPosts} from '../Redux/ActionCreators'
import Axios from 'axios';
import './FullScreenLoading.css';
import NavBar from './NavBar'


export default function DisplayPosts(props){

  const store = useSelector(state => state)
  const [isLoading,setLoading]=React.useState(false);
  const [filter,setFilter] = React.useState({type:'',category:''})
  const [sort,setSort] = React.useState('')
  const dispatch = useDispatch()
  

  const headers=  {headers: {

  Authorization: 'Bearer ' + store.user_details.token,
      }
      }

      useEffect(() => {    
        getPosts();
    },[]);

    const getPosts = async ()=>{
      setLoading(true);
      await Axios.post("http://localhost:8080/posts/getPosts",filter,headers)
      .then(response=>{ dispatch(setPosts(response.data)); setLoading(false);  })
      .catch(err => { console.log(`error occoured in fetching posts ${err}` ) } )
      
    }

    const onFilter = (e) =>{
      e.preventDefault()
        getPosts(); 
      
      }


    const onSort = (e)=>{
      e.preventDefault()
      if(sort!=''){
      switch(sort){
        case 'az':
              store.posts.sort( (a,b) => {   a = a.title.toLowerCase();  b = b.title.toLowerCase(); 
              return (a < b) ? -1 : (a > b) ? 1 : 0;  } )
              break     
        case 'za':
              store.posts.sort( (a,b) => {   a = a.title.toLowerCase();  b = b.title.toLowerCase(); 
              return (a < b) ? 1 : (a > b) ? -1 : 0;  } )          
              break
        case 'latest': 
              store.posts.sort( (a,b) => { return new Date(b.datePosted) - new Date(a.datePosted)    })
              break
      case 'oldest':
            store.posts.sort( (a,b) => { return new Date(a.datePosted) - new Date(b.datePosted)    })
            break
      default: break 

    }
  }
      dispatch(setPosts(store.posts))

    }
   


    const filter_sort = <React.Fragment>
  
    <nav class="col-md-2 py-5 d-none d-md-block bg-light sidebar"> 
    
    <div class="sidebar-sticky">

<button class="btn btn-primary btn-lg btn-block" type="button" data-toggle="collapse" data-target="#filter" aria-expanded="false" aria-controls="collapseExample"> 
Filter 
</button> 


<div class="collapse" id="filter"> 
<div class="my-2 card card-body"> 
<form onSubmit={onFilter}>
 <div class="form-group"> 
<label for="category">Category</label>   
 <select name="type" class="form-control" id="category" onChange= { e => setFilter( {...filter, type:e.target.value} )} >  
    <option selected={filter.type=='' && true} value=''>All categories</option>
    <option selected={filter.type=='post_item' && true} value='post_item'>Product/Item Listings</option>
    <option selected={filter.type=='post_service' && true} value='post_service'>Service Listings</option> 
    <option selected={filter.type=='request_item' && true} value='request_item'>Product/Item requests</option>
    <option selected={filter.type=='request_service' && true} value='request_service'>Service requests</option> 
</select>
</div>

<div class="form-group">
  <label for="subcategory">Sub-Category</label>
  <select name="category" class="form-control" id="subcategory" onChange= { e => setFilter( {...filter, category:e.target.value} )}> 
  <option selected={filter.category=='' && true} value=''>All Sub categories</option>
      <optgroup label="Product/Item categories">

          <option value="Electronics" selected={filter.category=="Electronics" && true}>Electronics</option> 
          <option value="Clothing" selected={filter.category=="Clothing" && true}>Clothing</option> 
          <option value="Outdoor" selected={filter.category=="Outdoor" && true}>Outdoor recreation</option>
          <option value="Indoor" selected={filter.category=="Indoor" && true}>Indoor appliances</option> 
          <option value="Others" selected={filter.category=="Others" && true}>Others</option>
          </optgroup>

      <optgroup label="Service categories">      
          <option value="Education" selected={filter.category=="Education" && true}>education and training</option> 
          <option value="Delivery" selected={filter.category=="Delivery" && true}>Delivery services</option> 
          <option value="Cooking" selected={filter.category=="Cooking" && true}>Food Catering</option> 
          <option value="Others" selected={filter.category=="Others" && true}>Others</option>

      </optgroup>
  </select> 

</div> 

<button class="ml-1 my-2 btn btn-success  btn-sm btn-block" type="submit" id="filter_submit">Filter</button>
</form> 


</div> 
</div> 
<button class="my-3 ml-1 btn bg-secondary btn-primary btn-lg btn-block" type="button" data-toggle="collapse" data-target="#sort" aria-expanded="false" aria-controls="collapseExample"> 
Sort 
</button> 
<div class="collapse" id="sort"> 
<div class="card card-body"> 

<form onSubmit={onSort}> 
<div class="form-group"> 
 <label for="label_price">Alphabetical</label>
  <select name="price" class="form-control" id="label_price" onChange= { e => setSort( e.target.value )}>
      <option selected={sort.order=='' && true} value=''>select</option>

      <option selected={sort.order=='az' && true} value="az">A-Z</option> 
      <option selected={sort.order=='za' && true} value="za">Z-A</option>
 </select>

</div>
<div class="form-group">
  <label for="label_date">Date</label>
 <select name="date_posted" class="form-control" id="label_date" onChange= { e => setSort( e.target.value )}>> 
      <option selected={sort.order=='' && true} value=''>select</option>
   <option selected={sort.order=='latest' && true} value="latest">New - Old</option>
      <option selected={sort.order=='oldest' && true} value="oldest">Old - New</option>
  </select>

</div>
<button class="btn btn-success btn-sm btn-block" type="submit" id="sort_submit">Sort</button>
</form> 
</div> 
</div>
</div>
  </nav>

  </React.Fragment>

    return(
      <React.Fragment>
      <NavBar page="viewPosts" />

<div className="row">
{filter_sort}  

  <div className="col-md-10 album">
  <div className="row px-5">
      
  {isLoading &&
       
       <div className='loader'>      
            <img id='loadicon' alt='Loading...' src={process.env.PUBLIC_URL+'/img/loading.gif'} />
       </div> 
  }

      {store.posts.length ? store.posts.map(
        ({ title,description,id,category,duration_price,photo }) => {
          return ( <Post
            title={title}
            description={description}
            id={id}
            category={category}
            duration_price={duration_price}
            photo={photo!=null && photo}

            />
            );
        }
      )
      
      : 
      <div className='col-md-10'>
        <h3 className='text-muted' style={{position:'absolute',marginTop:'80px',left:'35%'}}> No results to display</h3> 
      </div>
      }
      
 
       

</div>
</div>
</div>

</React.Fragment>
);
}

