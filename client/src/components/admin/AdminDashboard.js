import React from 'react'
import Sidebar from './Sidebar';
import Navbar from './Navbar';
const AdminDashboard = () => {
  
    
  return (
    <div>

<Navbar/>
<div className="flex">
<Sidebar active='1' />
<main>
<h1>Admin Dashboard</h1>
</main>
</div>



{/* 
        <div><button onClick={()=>navigate('/admin/campaignlist')}>All Campaigns</button></div>
        <div><button onClick={()=>navigate('/admin/approval')}>Approval</button></div>
        <div><button onClick={()=>navigate('/admin/manage')}>Manage Campaigns</button></div> */}
    </div>
  )
}

export default AdminDashboard