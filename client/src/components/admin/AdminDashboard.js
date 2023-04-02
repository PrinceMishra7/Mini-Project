import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
    let navigate = useNavigate();
  return (
    <div>
        <div><button onClick={()=>navigate('/admin/campaignlist')}>All Campaigns</button></div>
        <div><button onClick={()=>navigate('/admin/approval')}>Approval</button></div>
        <div><button onClick={()=>navigate('/admin/manage')}>Manage Campaigns</button></div>
    </div>
  )
}

export default AdminDashboard