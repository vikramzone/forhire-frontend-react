import Axios from 'axios'


export const startLoading = ()=> {
    return {
        type:"SET_LOADING_TRUE"
    }
}
export const stopLoading = () => {
    return {
        type:"SET_LOADING_FALSE"
    }
}

export const setUserDetails = (user_details) => {

    return {
        type:"SET_USER_DETAILS",
        user_details
    }
}

export const setPosts = (posts) => {

    return {
        type:"SET_POSTS",
        posts:posts
    }
}


export const Logout = () => {
    return {
        type:"CLEAR_STATE"
    }
}






export const fetchPosts = () => {
    
    return function(dispatch){
        
        dispatch(startLoading());
        Axios.get("http://localhost:8081/ads").then( res => dispatch(setPosts(res.data)) ).catch( err => {console.log(err)} )
       
    } 
}

