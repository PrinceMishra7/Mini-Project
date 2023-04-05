import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Chart from "../elements/chart/Chart";
import FeaturedInfo from "../elements/featuredInfo/FeaturedInfo";
import { userData } from "../elements/dummyData";
import WidgetSm from "../elements/widgetSm/WidgetSm";
import WidgetLg from "../elements/widgetLg/WidgetLg";
import "./home.css";
const AdminDashboard = () => {
  return (
    <div>
      <div className="flex">
        <Sidebar active="1" />
        <main className="container w-5/5  px-5 my-5">
        <div className="home">
        <FeaturedInfo />
        <Chart
          data={userData}
          title="User Analytics"
          grid
          dataKey="Active User"
        />
        <div className="homeWidgets">
          {/* <WidgetSm /> */}
          <WidgetLg />
        </div>
      </div>
        </main>
      </div>

     

      {/* 
        <div><button onClick={()=>navigate('/admin/campaignlist')}>All Campaigns</button></div>
        <div><button onClick={()=>navigate('/admin/approval')}>Approval</button></div>
        <div><button onClick={()=>navigate('/admin/manage')}>Manage Campaigns</button></div> */}
    </div>
  );
};

export default AdminDashboard;
