import React, { Component } from 'react'
import Mealtype from './mealtype'
import '../styles/home.css'
import { CircularProgress } from '@material-ui/core'


export default class  QuickSearch extends Component {

 constructor()
 {
    super();
    this.state={
        mealtype:[]
    }
 }

 componentDidMount()
 {
    fetch('https://foodfever.onrender.com/mealtype',{method:'GET'})
    .then(response=>response.json())
    .then(data=>this.setState({mealtype:data.data}))
 }

  render() {

    let mealtypes = this.state.mealtype.length && this.state.mealtype.map(item=>
        
         <Mealtype item={item} key={item.name} mealtTypeId={item.id}></Mealtype>

     )
    


    return (

  <div className="secondsection">
      
      <div className="secondheadings">
        <h2 className="searches">Quick searches</h2>
        <h6 className="subheading">Discover restaurants by type of meal</h6>
      </div>

      <div className="container-fluid foodsearches">

            <div className="row">
               {mealtypes?mealtypes:(<div className='Loader'> <CircularProgress /><br/>
        Loading </div>)}
            </div>
      </div>
  </div>
    )
  }
}




