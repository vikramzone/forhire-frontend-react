import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Logout, setUserDetails } from '../Redux/ActionCreators'
import Axios from 'axios';
import { setPosts } from '../Redux/ActionCreators'
import $ from 'jquery'
import './NavBar.css'




export default function NavBar(props) {


    const [loginCredentials, LoginCredentials] = React.useState({username:'',password:''}); //set the loginCredentials to an empty JSON
    const [signupCredentials, SignupCredentials] = React.useState({email:'',username:'',password:''}); //set the loginCredentials to an empty JSON

    const [loginResponse, LoginResponse] = React.useState(undefined);
    const [signupResponse, SignupResponse] = React.useState(undefined);

    let signupValid=0;

    const [loading, Loading] = React.useState(false);
    const store = useSelector(state => state); //hook provided by redux

    const dispatch = useDispatch();
    
    const onSearch = async (searchKey) => {
        const headers = {  headers: { Authorization: 'Bearer ' + store.user_details.token }  }
        await Axios.post("http://localhost:8080/posts/searchPosts", { key: searchKey }, headers)
        .then(response => { dispatch(setPosts(response.data)) })
        .catch(err => console.log(err))
    }

    const onSignup = async e => {
        e.preventDefault();
        Loading(true);
        await Axios.post("http://localhost:8080/auth/signup", signupCredentials)
            .then(response => {  
                setTimeout(function(){  $("#signup").modal('hide');  $("#login").modal('show'); },2000);
                SignupResponse("Registration Successful ! You can Login now ! ")
            })
            .catch(err => SignupResponse(`OOPS! ${err.response.data.message}`) )

        Loading(false);
    }

    const onLogin =  async e => {
    e.preventDefault();
    Loading(true);
         await Axios.post("http://localhost:8080/auth/login", loginCredentials)
            .then(response => {         
                $("#login").modal('hide');
                dispatch(setUserDetails(response.data));    
            })
            .catch(err => {
                LoginResponse("Error Logging in! Incorrect UserName or Password")
            })
    Loading(false);
    }

    useEffect( ()=>{
        if(loginResponse){  //login response is always an error 
            $('#loginMsg').css('color','red')
            document.getElementById("loginMsg").innerHTML=`${loginResponse}`;   }

        if(signupResponse){ //its either error or successful
            signupResponse.startsWith("OOPS!")? $('#signupMsg').css('color','red'):  $('#signupMsg').css('color','green')
            document.getElementById("signupMsg").innerHTML=`${signupResponse}`;      }     
    },[loginResponse,signupResponse])

    //Validates Signup
    useEffect ( (e)=>{
        let emailRegex=/^[\w\d._-]+@[\w\d_-]+.\w{2,3}$/;
        let userNameRegex =/^[\w\d]{3,15}$/

        Object.keys(signupCredentials).forEach (key => {
            switch(key){
                case 'email':
                    emailRegex.test(signupCredentials.email)? signupValid++ : signupValid--
                    break
                case 'username':
                    userNameRegex.test(signupCredentials.username) ? signupValid++ : signupValid--
                    break
                default:
                    break
            }
        })
        signupValid==2? $('#signupSubmit').prop('disabled',false) : $('#signupSubmit').prop('disabled',true)
        },[signupCredentials])    



    const onLogout = (e) => {
        e.preventDefault();
        dispatch(Logout())
        $("#logout").modal('hide');
        window.location = '/'
    }



    return (store.user_details == undefined ?

        <React.Fragment>

            <div className="d-flex flex-column flex-md-row align-items-center px-md-4 p-2 navbar navbar-dark bg-dark">
                <h5 className='navHeading'>ForHire - The Rental MarketPlace</h5>
                <nav>
                    <button type="button" className="btn btn-primary btn-md navButton " data-toggle="modal" data-target="#login">
                        Login
                    </button>&nbsp;&nbsp;&nbsp;
    <button type="button" className="btn btn-success btn-md navButton " data-toggle="modal" data-target="#signup">
                        Signup
    </button>
                </nav>

            </div>


            <div className="modal fade" id="signup" tabindex="-1" role="dialog" aria-labelledby="modalLabel"
                aria-hidden="true" >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="modalLabel">Join us Today !</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form classNameName="form-signin" onSubmit={onSignup}>
                                <h1 className="h3 mb-3 font-weight-normal">Signup </h1>
                                <div className="form-group">
                                 <input type="email" id='signup_email' className="form-control" onChange={e => SignupCredentials({ ...signupCredentials, email: e.target.value })} 
                                 placeholder="Email address" required autofocus=""></input> 

                                </div>
                                <div className="form-group">
                                    <input  className="form-control" id='signup_username'onChange={e => SignupCredentials({ ...signupCredentials, username: e.target.value })} placeholder='User Name' required autofocus="" ></input>
                                </div>

                                <div className="form-group">
                                    <input id='signup_password' type="password" onChange={e => SignupCredentials({ ...signupCredentials, password: e.target.value })} id="inputPassword" className="form-control" placeholder="Password" required></input>
                                </div>

                                <p id="signupMsg"></p>
                                <button id='signupSubmit' disabled={true} className="btn btn-lg btn-primary btn-block" type='submit'> {loading ? 'Registering...' : 'Sign up'} </button>
                               </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="modalLabel"
                aria-hidden="true" data-dismiss="modal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="modalLabel">Sign In</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form method='post' className="form-signin" onSubmit={onLogin}>
                                <h1 className="h3 mb-3 font-weight-normal">Welcome back !</h1>
                                <div className="form-group">
                                    <label for="inputEmail" className="sr-only">Email address</label>
                                </div>
                                <div className="form-group">
                                    <input onChange={e => LoginCredentials({ ...loginCredentials, username: e.target.value })} name="username" className="form-control" placeholder="Email address" required autofocus=""></input>
                                </div>
                                <div className="form-group">
                                    <label for="inputPassword" className="sr-only">Password</label>
                                </div>
                                <div className="form-group">
                                    <input onChange={e => LoginCredentials({ ...loginCredentials, password: e.target.value })} name="password" type="password" className="form-control" placeholder="Password" required></input>
                                </div>
                                <p id="loginMsg"></p>
                                <button className="btn btn-lg btn-primary btn-block" type='submit'> {loading ? 'Logging in...' : 'Sign in'} </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    
          </React.Fragment >
    :
        <React.Fragment>

            <div className="navbar navbar-dark bg-dark box-shadow">
                <h5 className='navHeading'>Welcome, {store.user_details.username} !</h5>

                <Link to="/">       <button className='btn btn-secondary btn-md navButton'>Home</button>                  </Link>
                <Link to="/viewPosts">    <button className="btn btn-secondary btn-md navButton">View all Listings</button>     </Link>
                <Link to="/makeNewPost" >       <button className='btn btn-secondary btn-md navButton'>List an Item/Service</button>  </Link>
                <Link to="/makeNewRequest" >       <button className='btn btn-secondary btn-md navButton'>Request an Item/Service</button>  </Link>
                {props.page == 'viewPosts' &&
                    <div className='col-md-3'>
                        <input onChange={e => onSearch(e.target.value)} name="title" className="form-control input-lg" type="text" placeholder="             What are you Looking for?" ></input>
                    </div>
                }
                <button type="button" className="btn btn-danger btn-md navButton" data-toggle="modal" data-target="#logout"> Logout </button>


                <div className="modal fade" id="logout" tabindex="-1" role="dialog" aria-labelledby="modalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title" id="modalLabel">Are you sure you want to Log out?</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-signin" onSubmit={onLogout}>
                                    <div className="container form-group">
                                        <button className="btn btn-primary ml-5 my-2 col-md-4 btn-lg" type="submit">Yes</button>
                                        <button className="btn btn-danger mr-5  col-md-4 btn-lg " data-dismiss="modal" aria-label="Close" >No</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

    
)

}



