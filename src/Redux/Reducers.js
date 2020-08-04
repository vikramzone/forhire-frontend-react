import { persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage' //to tell redux to use localstorage as default storage 
import { combineReducers } from "redux"

let store={
    user_details:undefined,
    posts:[]
}

//reducer modifies the state. It must be a pure sync funtion. so we need to use action creator with thunk middleware for api calls

const reducer = (state=store,action) =>{


switch(action.type){
    
        
    case "SET_LOADING_TRUE": 
        return {
            ...state,
            loading:true
        }
    
    case "SET_LOADING_FALSE":  
        return {
        ...state,
        loading:false,
        }

    case "SET_USER_DETAILS":
        return{
            ...state,
           user_details:action.user_details
        }
    case "CLEAR_STATE": //Remove user details from State
        return store

    case "SET_POSTS":
        
        return {
            ...state,
        posts:action.posts
        }
    
    default:
        return state
}
}



export default reducer;