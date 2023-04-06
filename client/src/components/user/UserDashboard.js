import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
const UserDashboard = () => {
    let navigate = useNavigate();
  return (
    <div>
    <Navbar/>
    <div className='flex'>
    <Sidebar active='1' />
    <main>
          <h1>User Dashboard</h1>
    </main>
    </div>



        {/* <div><button onClick={()=>navigate('/user/create')}>Create Campaign</button></div>
        <div><button onClick={()=>navigate('/user/vote')}>Vote Campaign</button></div>
        <div><button onClick={()=>navigate('/user/donate')}>Donate Campaign</button></div> */}
    </div>
  )
}

export default UserDashboard