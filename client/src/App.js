import { Routes, Route, BrowserRouter} from "react-router-dom";
import CreateCampaign from './components/user/CreateCampaign';
import CampaignList from "./components/admin/CampaignList";
import PendingAdminApproval from "./components/admin/PendingAdminApproval";
import VoteCampaign from "./components/user/VoteCampaign"
import FinishVoting from "./components/admin/FinishVoting";
import DonateCampaignList from "./components/user/DonateCampaignList";
import Landing from "./components/Landing";
import UserDashboard from "./components/user/UserDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import DonationCampaign from "./components/user/DonationCampaign";
import './App.css';
import Navbar from './components/navbar';
import Footer from './components/footer';

function App() {
  return (
    <div className="Apps">
      <BrowserRouter>
      {/* <Navbar/> */}
      <Routes>
        <Route path='/admin/campaignlist' element={<CampaignList/>} />
        <Route path='/admin/approval' element={<PendingAdminApproval/>} />
        <Route path='/admin/manage' element={<FinishVoting/>} />
        <Route path='/user/create' element={<CreateCampaign/>} />
        <Route path='/user/vote' element={<VoteCampaign/>} />
        <Route path='/user/donate' element={<DonateCampaignList/>} />
        <Route path='/' element={<Landing/>} />
        <Route path='/user/dashboard' element={<UserDashboard/>} />
        <Route path='/admin/dashboard' element={<AdminDashboard/>} />
        <Route path='/donate/:id' element={<DonationCampaign/>} />
      </Routes>
      {/* <Footer/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
