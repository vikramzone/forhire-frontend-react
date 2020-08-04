import React from 'react';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom'
import DisplayAds from './components/DisplayPosts';
import PostAds from './components/PostAds'
import { useSelector } from 'react-redux';
import ViewItem from './components/ViewItem';

function App() {

  const store = useSelector(state => state)

  
  return (
   
        <div className="App">
  {store.user_details==undefined?  
  <React.Fragment>
    <HomePage />
  </React.Fragment>
  :
  
  <Router>
    <Switch>
            <Route exact path="/" component ={HomePage} />            
            <Route exact path="/viewPosts" component ={DisplayAds} />
            <Route exact path="/viewPost/:id" component ={ViewItem} />
            <Route exact path="/makeNewPost" render={ ()=> <PostAds type="post" />}  />
            <Route exact path="/makeNewRequest" render={ ()=> <PostAds type="request" />}  />        
            <Route path='*' component={HomePage} />
     </Switch>
  </Router>      
}
          
        <Footer/>
        </div>
      
  );
}

export default App;
