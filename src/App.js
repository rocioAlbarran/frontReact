import React,{useState} from 'react'
import Index from './views/Process/Index'
import HomeW from './views/Home/HomeW'
 
const Home = () => <h1>Home Page</h1>
const Users = () => <h1>Users</h1>
const App = ()=>{
  const[page,setPage] = useState(()=>{
    const {pathname}= window.location
    const page = pathname.slice(1)
    return page
  });
  const getContent = () =>{
    if (page === 'users'){
      return <Index/>
    }else {
      return <HomeW/>
    }
  }
  const toPage = page => event =>{
    event.preventDefault()
    window.history.pushState(null, '', `/${page}`)
    setPage(page)
  }
  return (
    <div>
      
      {getContent()}</div>
  )
}

export default App;
