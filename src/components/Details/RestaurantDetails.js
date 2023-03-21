//razorpay key :rzp_test_FuqjXQF8QQHDhn
//secret key: JEX9Y3ii9IScSpMzMdgnZ1xe
import React,{useEffect,useState} from 'react'
import Header from '../Common/Header'
import Image from '../../assets/breakfast.jpg'
import'../styles/details.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {useParams} from 'react-router-dom';  //hooks are only used in function based components
import Modal from 'react-modal';
import veg from '../../assets/veg.png'
import nonveg from '../../assets/nonveg.png'


const customStyles = {
   content: {
     top: '50%',
     left: '50%',
     right: 'auto',
     bottom: 'auto',
     marginRight: '-50%',
     transform: 'translate(-50%, -50%)',
     overflowY:'auto',
     maxHeight:'80vh'
   }
 };


Modal.setAppElement('#root');// otherwise it will give an error that app element is not defined

// In function based component you cannot use commentDidMount to fetch an api
export default function RestaurantDetails() {

   //Hooks

let {rName} = useParams();   //Object Distructring Syntax

const [restaurant,setRestaurant] = useState({})
const [isOpenMenuModal,setOpenMenuModal] = useState(false)
const [menu,setMenu] = useState([])
const [totalPrice,setTotalPrice] = useState(0)






useEffect(() => {
   fetch(`https://foodfever.onrender.com/restaurantDetails/${rName}`,{method:'GET'})
   .then(response=>response.json())
   .then(data=>setRestaurant(data.data))

   }
, [])


const getMenu=()=>{

   fetch(`https://foodfever.onrender.com/menu/${rName}`,{method:'GET'})
   .then(response=>response.json())
   .then(data=>setMenu(data.data))

}


const calcTotalPrice=(itemPrice)=>{

   let price=totalPrice+itemPrice;
   setTotalPrice(price);
}


const loadScript =(rpScript)=>{

return new Promise((resolve)=>{

  const script = document.createElement('script')
  script.src=rpScript;
  
  script.onload=()=>{
    console.log("success");

    openRazorpayWindow();
    resolve(true)
  }

  script.onerror=()=>{
    console.log('failure');
    resolve(false) 
   }

   document.body.appendChild(script);


})

}

const openRazorpayWindow=async()=>{

  let orderData ;

  orderData=await fetch('https://foodfever.onrender.com/payment/order',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({amount:totalPrice})
    
  })
  .then(response=>response.json())




  const options={
    key:'rzp_test_FuqjXQF8QQHDhn',
    amount: orderData.amount/100,
    order_id: orderData.id,
    currency: orderData.currency,
    name: 'Zomato food Delivery',
    prefill: {
      email:'xyz@gmail.com',
      contact:'202-555-8183'
    },
    
    handler:function(response){   // if the payment is successful then this function will be called
     
   // api which will save the transaction onto mongodb
          fetch('https://foodfever.onrender.com/payment/save',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(response)
            
          })
          .then(response=>response.json())
          .then(data=>console.log(data))
          
    }
  
  } 

  const paymentWindow = new window.Razorpay(options)
  paymentWindow.open()
  ``
}



const {name,thumb,cost,address,Cuisine} = restaurant
const cuisineList = !(Cuisine==undefined) && Cuisine.length && <ul>{Cuisine.map(item=><li className='cuisinelist' key={item.name}>{item.name}</li>)}</ul>


  return (
  
  <div>
     <Header/>

     <div className='ImageContainer'> 
      <img src={thumb}></img>

        
     </div>

     <h2>{name}</h2>
     <button className="btn btn-danger" style={{float:'right',marginRight:'30px'}} onClick={()=>{setOpenMenuModal(true);getMenu()}}>Place online order</button>

     <div className='myTabs mb-5'>
       <Tabs>
         <TabList>
             <Tab >Overview</Tab>
             <Tab >Contact</Tab>
         </TabList>

         <TabPanel>
          <div className="aboutheading">About This Place</div>
          <div className="cuisine">Cuisine</div>
            {cuisineList}
          <div className="avgcost">Average Cost</div>
          <div className="cost"> &#8377;{cost}</div>
         </TabPanel>

         <TabPanel>
          <div className="phno">Phone Number</div>
          <div className="no">+91-9983498967</div>
          <h4 className="hname">{name}</h4>
          <div className="address">{address}</div>

          </TabPanel>
       </Tabs>

     </div>

     <Modal
      isOpen={isOpenMenuModal}
      style={customStyles}
      >
       <h2>
          {name}
         <button className="btn btn-danger" onClick={()=>{setOpenMenuModal(false)}} style={{float:'right'}}>X</button>
       </h2>
       
       <ul style={{listStyle:'none'}}>
         { 
             
        menu.length==0?"":menu.map((item,index)=>

        <li key={index} className="menuContent" >
         <div>
          
          <div>
           {item.isVeg ?<span className="iconBox" ><img src={veg} className="typeoffoodIcon"></img></span>:<span className="iconBox"><img src={nonveg} className="typeoffoodIcon"></img></span>}
          </div>

          <div className="dishName">
           {item.itemName}
          </div>

          <div className="dishPrice">
           {item.itemPrice}
          </div>

          <div className="dishDescription">
            {item.itemDescription}
          </div>
           
           
<hr></hr>
         </div>
  
  <div style={{position:'relative'}}>
    <img src={thumb} className="dishImage"></img>
    <div className="addButton">
       <button className="btn btn-primary addButton-primary" onClick={()=>calcTotalPrice(item.itemPrice)}>Add</button>
    </div>
  </div>
        
  
  
        </li>
     )
   }
       </ul>


       <h3>
         Total Price:{totalPrice}
        {totalPrice>0?<button className="btn btn-danger" style={{float:'right'}} onClick={()=>{setOpenMenuModal(false); loadScript('https://checkout.razorpay.com/v1/checkout.js')}}>Pay Now</button>:null}
       </h3>


     </Modal>


  </div>
   
  )
}




