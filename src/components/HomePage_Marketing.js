import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'



function Marketing() {
  const store = useSelector(state => state); //hook provided by redux

    const imgStyle={
        width:"400px",
        height:"200px"
    }
  return (

<div className="container marketing" style={{marginTop: -35 +'px'}}>
<div className="row featurette">
<div className="col-md-7">
<h2 className="featurette-heading">Need a DSLR camera for a party tonight?  </h2>
<p className="lead">Not enough money to buy one? - Well you don't have to, when you can find your favourite DSLR in our Electronics collection for rent ! </p>
{store.user_details?
<Link to='/viewPosts' ><button className='btn btn-md btn-secondary'> View Listings</button></Link>
:
<p className='lead'><button data-toggle="modal" data-target="#signup" className='btn btn-sm col-sm-2 btn-secondary'>Sign Up </button> to Learn more!</p>
}
</div>
<div className="col-md-5">
<img style={imgStyle} className="featurette-image img-fluid mx-auto" alt="500x500" src={process.env.PUBLIC_URL + '/img/6.jpg'} data-holder-rendered="true">
</img></div>
</div>
<hr className="featurette-divider"></hr>
<div className="row featurette">
<div className="col-md-7 order-md-2">
<h2 className="featurette-heading"> Think you have something valuable? Turn it to profit! <br/></h2>
<p className="lead">List your item and you'll have access to thousands of rentees! </p>
{store.user_details?
<Link to='/makeNewPost'><button className='btn btn-md btn-secondary'> Post Your Item</button></Link>
:
<p className='lead'><button data-toggle="modal" data-target="#signup" className='btn btn-sm col-sm-2 btn-secondary'>Sign Up </button> to Learn more!</p>
}
</div>
<div className="col-md-5 order-md-1">
<img className="featurette-image img-fluid mx-auto"  alt="no img" style={imgStyle} src={process.env.PUBLIC_URL + '/img/7.jpg'} data-holder-rendered="true">
</img></div>
</div>
<hr className="featurette-divider"></hr>
<div className="row featurette">
<div className="col-md-7">
<h2 className="featurette-heading">Looking for something Specific?</h2>
<p className="lead">Post your needs in the request section and consider it done!</p>
{store.user_details?
  <Link to="/makeNewRequest"><button className='btn btn-md btn-secondary'>  Post your Request</button></Link>
:
<p className='lead'><button data-toggle="modal" data-target="#signup" className='btn btn-sm col-sm-2 btn-secondary'>Sign Up </button> to Learn more!</p>
}
</div>
<div className="col-md-5">
<img className="featurette-image img-fluid mx-auto" alt="no img" style={imgStyle} src={process.env.PUBLIC_URL + '/img/searching.png'} data-holder-rendered="true">
</img></div>
</div>

<hr className="featurette-divider"></hr>
<div className="row featurette">
<div className="col-md-7">
<h2 className="featurette-heading">Have something to offer? </h2>
<p className="lead">Are you good at tutoring? Are you an expert chef ? Let people know! </p>

{store.user_details?
<Link to='/makeNewPost'><button className='btn btn-md btn-secondary'> Post your Service</button></Link>
:
<p className='lead'><button data-toggle="modal" data-target="#signup" className='btn btn-sm col-sm-2 btn-secondary'>Sign Up </button> to Learn more!</p>}
</div>
<div className="col-md-5">
<img className="featurette-image img-fluid mx-auto" alt="500x500" style={imgStyle} src={process.env.PUBLIC_URL + '/img/make_money.jpg'}  data-holder-rendered="true">
</img></div>
</div>



<br></br><br></br><br></br>

</div>

);
}

export default Marketing;