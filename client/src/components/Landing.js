import React from 'react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
    let navigate = useNavigate();
    return (
    <div>
        <div><button onClick={()=>navigate('/admin/dashboard')}>Admin</button></div>
        <div><button onClick={()=>navigate('/user/dashboard')}>User</button></div>
    </div>
  )
}

export default Landing