import React from 'react'
import '../styles/filter.css'
import {Link} from 'react-router-dom'
export default function searchResult(props) {

let cuisineList = props.item.Cuisine && <ul>{props.item.Cuisine.map(item=><span key={item.name}>{item.name}&nbsp;,&nbsp;</span>)}</ul> 


  return (
    <Link to={`/Details/${props.item.name}`} style={{ textDecoration: 'none',color:'black' }}>
          <div className="card">
           <div className="about">
             <div className="about_image"><img className="img" src={props.item.thumb}/></div>
             <div className="about_heading">
                <h3 className="about_heading-1">{props.item.name}</h3>
                <h5 className="fort_heading">{props.item.locality}</h5>
                <p className="address">{props.item.address}</p>
             </div>
           </div>
           <hr/>
           <div className="info">
            <p className="info-1">CUISINES:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {cuisineList}</p>
            <p className="info-1">COST FOR TWO: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &#8377;{props.item.cost}</p>
           </div>
        </div>
   </Link>
  )
}
