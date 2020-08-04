import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import './FullScreenLoading.css'
import {Link,useHistory} from 'react-router-dom'
import NavBar from './NavBar'




export default function PostAds(props) {
  
let history = useHistory()

  const store = useSelector(state => state)
  const [isLoading,setLoading]=React.useState(false);
  const [error,setError] = React.useState(false);
  const [postForm, setPostForm] = React.useState({})
  const dispatch = useDispatch()


  const headers=  {headers: {
    Authorization: 'Bearer ' + store.user_details.token
}}

    const submitPost = async (e) =>{
        setLoading(true)
        e.preventDefault()
        const formData = new FormData()
        Object.keys(postForm).forEach( key=>{
            formData.append(key,postForm[key])
        })
        
        await Axios.post("http://localhost:8080/posts/newPost",formData,headers)
        setLoading(false)
        return (
        <div className='container' style={{backgroundColor:'ghostwhite'}}>
        
        <h1 class='display-2 text-center text-success'>Success!</h1>  
        <Link to='/'>   <button type="btn btn-md btn-primary">Go Back</button>    </Link>
           <button onClick= {()=> history.goBack()} type='btn btn-md btn-secondary'>Go to Homepage</button>
        
        </div>
        )
        }

    
        return( 
            
            <React.Fragment>
            <NavBar/>

           { isLoading?
            <div className='loader'>      
            <img id='loadicon' alt='Loading...' src={process.env.PUBLIC_URL+'/img/loading.gif'} />
           </div> 

        :

    <div class='container' style={{background:'rgba(10,5,5,0.05)',padding:'20px'}}>
        <form onSubmit={submitPost}>
    <h1 class="text-left display-4 m-1 "> {props.type == "post" ? 'Tell us about your offering!' : 'What would you like to see in our site?'}</h1>

        <div class="form-group">
            <label class='lead' for="Select1">Choose a category</label>
            
            <select required={true} name="type" class="form-control" id="Select1"  onChange={e =>  setPostForm({ ...postForm, type: e.target.value })} >
                <option disabled={true} selected={true} value=''>Please select an option</option>
                <option value={props.type=="post"?'post_item':'request_item'}>Product/Item</option>
                <option value={props.type=="post"?'post_service':'request_service'}>Service</option>
            </select>
        </div>

        <div class="form-group">
            <label class='lead' for="title">Title</label>
            <input name="title" onChange={e => setPostForm({ ...postForm, title: e.target.value })} class="form-control"
             placeholder="Title.. ex: Camera, Maid service" required  />
        </div>
        
        <div class="form-group">
            <label class='lead' for="desc">Description </label>
            <textarea name="description" onChange={e => setPostForm({ ...postForm, description: e.target.value })}
                minlength="10" rows='4' class="form-control"
                placeholder="Give a brief description about your offering.....(minimum 32 characters)" required >
            </textarea>
        </div>

        <div class="form-group">
            <label class='lead' for="Select2">Choose a sub-category</label>
            <select  required={true} name="category" class="form-control" id="Select2" onChange={e=>  setPostForm(  {...postForm, category:e.target.value}  )}>
            <option disabled selected value=''>Select a Category</option>
            <optgroup label="Product/Item categories">
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Outdoor">Outdoor recreation</option>
                <option value="Indoor">Indoor appliances</option>
                <option value="Kids">Kids toys</option>
                <option value="Others">Other items</option>
             </optgroup>   
            <optgroup label="Service categories">
                <option value="Education">Education and Training</option>
                <option value="Delivery">Delivery services</option>
                <option value="Cooking">Food catering</option>
                <option value="Others">Other services</option>
            </optgroup> 
        </select>
        </div>

        <div class="form-group"><label class='lead' for="price">Enter pricing information</label>
            <input onChange={e=>  setPostForm(  {...postForm, duration_price:e.target.value}  )}  name="duration_price" class="form-control" placeholder="cost per Hour ($)" required={true}  /> 
      </div>
            <div class="form-group">
                <p class='lead'>Upload an image (Optional) </p>
                <input type="file"  onChange={e=>  setPostForm(  {...postForm,photo:e.target.files[0]}  ) } name="photo" accept='image/*' class="form-control-file" placeholder="upload image" /> 
      </div>
               
                <div class="form-group">
                    <label class='lead' for="address">Contact Details </label>
                    <textarea id="address" onChange={e=> setPostForm( {...postForm, contactDetails:e.target.value} )} rows='4' class="form-control" placeholder="Enter the Product Location" required ></textarea>
                </div>
               
                <div class="form-group my-4">
                    <button class="btn btn-lg btn-success" type="submit">Submit</button>
                    <Link to="/"><button type="button" class="ml-3 btn btn-danger btn-lg">Cancel</button></Link>
                </div> 
                </form>
                         </div>
}
        </React.Fragment>
        )
}