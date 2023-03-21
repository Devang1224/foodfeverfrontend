import React,{Component} from 'react'
import { Link } from 'react-router-dom';
import '../styles/mealtype.css'


export default function Mealtype(props) {
    

  return ( 
            <div className="col-sm-12 col-md-6 col-lg-4" >
             <Link to={`/filter?mealType=${props.item.name}`} style={{ textDecoration: 'none' }}>  <div className="tileContainer foodbox">
                    <div className="tileComponent1 foodimage">
                        <img class ="mealImage" src={ require(`../../${props.item.image}`)} height="150" width="140" />
                    </div>
                    <div className="tileComponent2 foodheading">
                        <div className="componentHeading foodheading1">
                            {props.item.name}
                        </div>
                        <div className="componentSubHeading foodsubheding">
                            {props.item.content}
                        </div>
                    </div>
                </div>
             
              </Link> 
            
            </div>
  )
}
