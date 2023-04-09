import React, {useEffect,useState} from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Chart from "../elements/chart/Chart";
import "../elements/featuredInfo/featuredInfo.css";
import { userData } from "../elements/dummyData";
import WidgetSm from "../elements/widgetSm/WidgetSm";
import WidgetLg from "../elements/widgetLg/WidgetLg";
import { getCampaign,campaignCount,pendingCount,donatingcount } from "../config";
import "./home.css";
const AdminDashboard = () => {
  const [campaigncount,setCampaignCount] = useState(0);
  const [pendingcount,setPendingCount] = useState(0);
  const [donationcount,setDonationCount] = useState(0);
  const [mycampaign, setmycampaign] = useState(null);
  useEffect(() => {
    getCampaign().then(res => setmycampaign(res));
    campaignCount().then(res=>setCampaignCount(Number(res)));
    pendingCount().then(res=>setPendingCount(Number(res)));
    donatingcount().then(res=>setDonationCount(Number(res)));
  }, []);
  return (
    <div >
      <Navbar />
      <div className="flex ">
        <Sidebar active="1" />
        <main className="container w-4/5  px-5 my-5">
        <div className="home">
        <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Total Campaigns</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{campaigncount}</span>
          {/* <span className="featuredMoneyRate">
            -11.4 <ArrowDownward  className="featuredIcon negative"/>
          </span> */}
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Campaigns under donation</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{donationcount}</span>
          {/* <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative"/>
          </span> */}
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Pending Campaign</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{pendingcount}</span>
          {/* <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span> */}
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
    </div>
        <div>
        <h2 class="mb-2 mt-2 ml-2 text-4xl font-medium leading-tight text-primary">
            All Campaigns
          </h2>
          {mycampaign ?
            <div className="widgetLg">
              <table className="widgetLgTable">
                <tr className="widgetLgTr">
                  <th className="widgetLgTh">Receipent</th>
                  <th className="widgetLgTh">Title</th>
                  <th className="widgetLgTh">Goal</th>
                  <th className="widgetLgTh">Phase</th>
                </tr>
                {mycampaign.map((campaign) =>
                  <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                      <span className="widgetLgName">{campaign[2]}</span>
                    </td>
                    <td className="widgetLgDate">{campaign[0]}</td>
                    <td className="widgetLgAmount">eth {Number(campaign[3])}</td>
                    <td className="widgetLgStatus">
                      <td className="widgetLgStatus">
                        {Number(campaign[7])==0? <div className="widgetLgButton Pending">Review</div>:
                         Number(campaign[7])==1? <div className="widgetLgButton Voting">Voting</div>:
                         Number(campaign[7])==2 && !campaign[6]? <div className="widgetLgButton Declined">Rejected</div>:
                         Number(campaign[7])==2 && campaign[6]? <div className="widgetLgButton Approved">Donation</div>:
                         null
                         }
                        
                      </td>
                    </td>
                  </tr>
                )}
              </table>
            </div>
            : null}
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
