import React,{useEffect,useState} from 'react'
import Header from '../Common/Header'
import '../styles/filter.css'
import SearchResult from '../Filters/searchResult'

import queryString from 'query-string'



export default function Filter() {
  

const [filter,setFilter]=useState({
  city_id:'',
  cuisine:[],
  lcost:'',
  hcost:'',
  sort:1
})

const [restaurants,setRestaurantsFilter]=useState([])
const [locations,setRestaurantsLocations]=useState([])
const [currentPage,setCurrentPage]=useState(1)
const [PageCount,setPageCount]=useState(0)





  useEffect(()=>{
  
    fetch(`https://foodfever.onrender.com/filter/${currentPage}`,
    {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(filter)
    })

    .then(response=>response.json())
    .then(data=>{setRestaurantsFilter(data.city);setPageCount(data.totalRestaurants/2)})
   

  },[filter,currentPage]) //we will call the api whenever the array values are updated



const fetchLocations=()=>{
     fetch('https://foodfever.onrender.com/location',{method:'GET'})
    .then(response=>response.json()) 
     .then(data=>setRestaurantsLocations(data.data))
}



const handleSort=(value)=>{

  filter.sort=value
  setFilter({...filter})  //spread operator ... 


}

const handleCost=(lCost,hCost)=>{
  filter.lcost=lCost;
  filter.hcost=hCost;
  setFilter({...filter})
  
}

const handleCuisine = (e)=>{
 
if(e.target.checked)
{
  filter.cuisine.push(e.target.value)
}
else{
      let index= filter.cuisine.indexOf(e.target.value)   //getting the index of value we want to remove
      if(index>-1)
      {
        filter.cuisine.splice(index,1);
      }
   }
     
   setFilter({...filter})


}




  let searchResult = restaurants.length==0?"":restaurants.map(item=><SearchResult key={item.name} item={item}></SearchResult>);
  let RestaurantLocations = locations.length && locations.map(item=><option value={item.city_id} key={item.name}>{item.name}</option> )
  let paginationItems =[];
  for(let i=1;i<=PageCount;i++)
  {
    paginationItems[i]=<a href={`#${i}`} className="page" key={i} onClick={()=>{setCurrentPage(i)}}>{i}</a>;
  }

const meal=queryString.parse(window.location.search).mealType
 

  return (
    

    <div>
      <Header></Header>
      <h2>{meal}</h2>
    <section className="section-1">
       
      <div className="filters">
        <div className="location">
            <h3 className="filters-heading">Filters</h3>
            <h4 className="select-location">Select Location</h4>
            <select className="Rectangle-2236" onClick={()=>{fetchLocations()}}>
              <option value="0">Select</option>
             {RestaurantLocations}
            </select>
        </div>


        <div className="cuisine">
          <h4 className="cuisine-heading">Cuisine</h4>
          <div><input type="checkbox" id="checkbox-1" value="North Indian" onChange={(e)=>{handleCuisine(e)}}/><label for="checkbox-1" className="checkbox">North Indian</label></div>
          <div><input type="checkbox" id="checkbox-2" value="South Indian" onChange={(e)=>{handleCuisine(e)}}/><label for="checkbox-2" className="checkbox">South Indian</label></div>
          <div><input type="checkbox" id="checkbox-3" value="Chinese" onChange={(e)=>{handleCuisine(e)}}/><label for="checkbox-3" className="checkbox">Chinese</label></div>
          <div><input type="checkbox" id="checkbox-4" value="Fast Food" onChange={(e)=>{handleCuisine(e)}}/><label for="checkbox-4" className="checkbox">Fast Food</label></div>
          <div> <input type="checkbox" id="checkbox-5" value="Street Food" onChange={(e)=>{handleCuisine(e)}}/><label for="checkbox-5" className="checkbox">Street Food</label></div>
        </div>


        <div className="cost">
          <h4 className="cost-heading">Cost For Two</h4>
            <div><input type="radio" id="radio-1" name="cost" onChange={()=>{handleCost(0,500)}}/><label for="radio-1" className="radio">Less than `500</label></div>
            <div><input type="radio" id="radio-2" name="cost" onChange={()=>{handleCost(500,1000)}}/><label for="radio-2" className="radio">`500 to `1000</label></div>
            <div><input type="radio" id="radio-3" name="cost" onChange={()=>{handleCost(1000,1500)}}/><label for="radio-3" className="radio">`1000 to `1500</label></div>
            <div><input type="radio" id="radio-4" name="cost" onChange={()=>{handleCost(1500,2000)}}/><label for="radio-4" className="radio">`1500 to `2000</label></div>
            <div><input type="radio" id="radio-5" name="cost" onChange={()=>{handleCost(2000,500000)}}/><label for="radio-5" className="radio">`2000+</label></div>
        </div>


        <div className="sort">
          <h4 className="sort-heading">Sort</h4>
          <div><input type="radio" id="sort-1" name="sort" checked={filter.sort==1} onChange={()=>handleSort(1)}/><label for="sort-1" className="radio" >Price low to high</label></div>
            <div><input type="radio" id="sort-2" name="sort"  checked={filter.sort==-1} onChange={()=>handleSort(-1)}/><label for="sort-2" className="radio">Price high to low</label></div>
        </div>

      </div>




      <div className="cards">

        {searchResult}


         <div className="pagination">
          {paginationItems}
         </div>
        
      </div>


     </section>
   </div>

  )
}
