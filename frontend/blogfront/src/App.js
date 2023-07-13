
import './App.css';

import {BrowserRouter, Routes,Route} from  'react-router-dom'
import Home from './component/Home';
import Layout from './layout/Layout';
import About from './component/About'
import Contact from './component/Contact';
import Articledetail from './component/Articledetail';
import PostBlog from './component/PostBlog'
import SignUp from "./component/SignUp";
import Login from './component/Login'
import EditBlog from './component/EditBlog';

function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
       
        
        <Routes>
          <Route element={<Layout/>}>
            <Route exact path='/' element={<Home/>}/>
            <Route path='blog/:id' element={<Articledetail/>}/>
            <Route path='blog/:id/edit' element={<EditBlog/>}/>
            <Route  path='postarticle' element={<PostBlog/>}/>
            <Route  path='about' element={<About/>}/>
            <Route  path='contact' element={<Contact/>}/>
            <Route  path='login' element={<Login/>}/>
            <Route  path='signup' element={<SignUp/>}/>
            <Route  path='logout' />
            
          </Route>
        </Routes>
        
        </BrowserRouter>
          
        
    </div>
  );
}

export default App;
