import Home from "./components/Home/Home";
import RestaurantDetails from "./components/Details/RestaurantDetails";
import Filter from "./components/Filters/Filter";

import {
 createBrowserRouter,
 RouterProvider,
 Route
} from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  }
  ,
  {
    path:"/filter",
    element: <Filter/>
  }
  ,
  {
    path:"/details/:rName",
    element: <RestaurantDetails/>
  }
])


function App() {


  return( 
  

   <RouterProvider router={router}/>


  )
      
    
  

}

export default App;
