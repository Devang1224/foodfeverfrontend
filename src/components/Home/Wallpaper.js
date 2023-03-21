import React, { Component ,useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../styles/home.css'
import Modal from 'react-modal';
import FacebookLogin from 'react-facebook-login';
import logo from '../../assets/logo.png'


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
};

const responseFacebook =(response)=>{
  console.log(response); 
}


let useData={};
let userdata={}

const saveRegistrationDetails=(Name,Email,Password)=>{

let data={name:Name,email:Email,password:Password}

 fetch('https://foodfever.onrender.com/register',{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify(data)
 }).then(response=>response.json)
 .then(data=>{console.log(data.message)})




}

export default class wallpaper extends Component {

constructor(){
  super();
  this.state={
    locations:[],
    restaurants:[],
    login:'',
    register:'',
    name:'',
    email:'',
    password:''
  }
}


componentDidMount(){

  fetch('https://foodfever.onrender.com/location',{method:'GET'})
  .then(response=>response.json())
  .then(data=>this.setState({locations:data.data}))
}




fetchRestaurants = (event)=>{
  fetch(`https://foodfever.onrender.com/restaurants/city/${event.target.value}`,{method:'GET'})
  .then(response=>response.json())
  .then(data=>{this.setState({restaurants:data.data.splice(0,6)})})


  
}




  render() {

  let locationList = this.state.locations.length && this.state.locations.map(item=>
    <option value={item.city_id} key={item.name}>{item.name}</option>  
  )



let restaurauntList = this.state.restaurants.length 
&&
<ul className="restaurantUl">{this.state.restaurants.map(item=><li className="lists" key={item.name}><Link className="ListLinks" to={`/details/${item.name}`}>{item.name}</Link></li>)}</ul>

if(!restaurauntList)restaurauntList=[]

    return (
      <>
        <div className="hero">
      <div className="account">
        <a className="login" href="#" onClick={()=>this.setState({login:true})}>Login</a>
        <a className="createaccount" href="#" onClick={()=>this.setState({register:true})}>Create an account</a>
      </div>
      {/* <h1 className="logo1">Z</h1> */}
      <div className="second">
       <div className="logodiv"><img className="logo2" src={logo}/></div> 
        <h2 className="firstheading">Find the best restraunts,cafes,and bars</h2>
       <div className="inputs">
             <select className="locationDropdown" onChange={this.fetchRestaurants}>
                <option value="0" selected disabled>Please select a location</option>
                {locationList}
            </select>

         <div className="search">
          <span className="material-icons icon SearchIcon" >
            search
            </span>
          <input className="restaurantsinput" type="text" placeholder="search for restraunts" />
            {restaurauntList}
         </div>
       </div>
       </div>

      </div>


      <Modal 
     isOpen={this.state.login}
     style={customStyles}
    >
      <div>
        <h2>Login modal
           <button onClick={()=>this.setState({login:false})} className="btn btn-danger"a>X</button>
        </h2>
      </div>

 {/* three different ways of login */}
      <div>
         <form>
         <label for='username'>Username: </label> <input name='username' type="text" placeholder="Enter Your Username"></input><br/><br/>
         <label for='password'>Password: </label> <input type="Password" placeholder="Enter Your Password"></input><br/><br/>
          <button className="btn btn-primary">Login</button>
         </form>
      </div>


    </Modal>

    <Modal
   isOpen={this.state.register}
   style={customStyles}
  >

       <div>
        <h2>Register
           <button onClick={()=>{this.setState({register:false})}} className="btn btn-danger" style={{float:'right'}}>X</button>
        </h2>
      </div>
      <div>
        
         <form>
         <label for='name'>Name: </label>  <input name="name" type="text" placeholder="Enter Your name" onChange={(e)=>{this.setState({name:e.target.value})}}></input><br/><br/>
         <label for='email'>Email: </label>  <input name="email" type="email" placeholder="Enter Your email" onChange={(e)=>{this.setState({email:e.target.value})}}></input><br/><br/>
         <label for='password'>Password: </label> <input name="password" type="Password" placeholder="Enter Your Password" onChange={(e)=>{this.setState({password:e.target.value})}}></input><br/><br/>
         
          <button className="btn btn-primary" onClick={()=>{saveRegistrationDetails(this.state.name,this.state.email,this.state.password)}}>Register</button>
        </form>
      </div>
      <br/>

-------OR-------
<br/>
<br/>

    <div>
    <FacebookLogin
    appId="901674227490930"
    autoLoad={true}
    fields="name,email,picture"

    callback={responseFacebook} />
    </div>


  </Modal>




      </>
    )
  }
}
