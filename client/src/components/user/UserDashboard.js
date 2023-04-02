import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserDashboard = () => {
    let navigate = useNavigate();
  return (
    <div>
        <div><button onClick={()=>navigate('/user/create')}>Create Campaign</button></div>
        <div><button onClick={()=>navigate('/user/vote')}>Vote Campaign</button></div>
        <div><button onClick={()=>navigate('/user/donate')}>Donate Campaign</button></div>
    </div>
  )
}

export default UserDashboard