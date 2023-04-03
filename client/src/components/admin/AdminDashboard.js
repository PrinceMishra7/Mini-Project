import React from 'react'
import Sidebar from './Sidebar';
import Navbar from './Navbar';
const AdminDashboard = () => {
    
  return (
    <div>

<Navbar/>
<Sidebar active='1' />


{/* 
        <div><button onClick={()=>navigate('/admin/campaignlist')}>All Campaigns</button></div>
        <div><button onClick={()=>navigate('/admin/approval')}>Approval</button></div>
        <div><button onClick={()=>navigate('/admin/manage')}>Manage Campaigns</button></div> */}
    </div>
  )
}

export default AdminDashboard