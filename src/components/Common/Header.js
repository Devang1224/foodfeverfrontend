// facebook app id: 901674227490930

import React,{useState} from 'react'
import'../styles/details.css'
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import logo from "../../assets/logo.png"
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

Modal.setAppElement('#root');

const responseFacebook =(response)=>{
  console.log(response); 
}



export default function Header() {

const [isLoginModalOpen,setLoginModal] = useState(false)
const [isRegisterModalOpen,setRegisterModal] = useState(false)

//states for login/register
const[userDetails,setUserDetails]=useState({
  name:'',
  email:'',
  password:''

})


const saveRegistrationDetails=(user)=>{

  userDetails.name=user.userName;
  userDetails.email=user.userEmail;
  userDetails.password=user.userPassword;

 setUserDetails({...userDetails})

 fetch('https://foodfever.onrender.com/register',{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify(userDetails)
 }).then(response=>response.json)
 .then(data=>{console.log(data.message)})

}


let userData={}


  return (
    <div className="divHeader">
     <nav>
        <a href="/"><img className="logo1" src={logo}/></a>
        <div style={{height: 52 ,paddingTop:14}}>
            <a href="#" className="login" onClick={()=>setLoginModal(true)}>Login</a>
            <a href="#" className="create" onClick={()=>setRegisterModal(true)}>Create an account</a>
        </div>
    </nav>
    
    <Modal 
     isOpen={isLoginModalOpen}
     style={customStyles}
    >
      <div>
        <h2>Login modal
           <button onClick={()=>setLoginModal(false)} className="btn btn-danger"a>X</button>
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
   isOpen={isRegisterModalOpen}
   style={customStyles}
  >
       <div>
        <h2>Register
           <button onClick={()=>{setRegisterModal(false);}} className="btn btn-danger" style={{float:'right'}}>X</button>
        </h2>
      </div>
      <div>
        
         <form>
         <label for='name'>Name: </label>  <input name="name" type="text" placeholder="Enter Your name" onChange={(e)=>{userData.userName=e.target.value}}></input><br/><br/>
         <label for='email'>Email: </label>  <input name="email" type="email" placeholder="Enter Your email" onChange={(e)=>{userData.userEmail=e.target.value}}></input><br/><br/>
         <label for='password'>Password: </label> <input name="password" type="Password" placeholder="Enter Your Password" onChange={(e)=>{userData.userPassword=e.target.value}}></input><br/><br/>
          <button className="btn btn-primary" onClick={()=>{saveRegistrationDetails(userData)}}>Register</button>
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




    </div>



  )
}
