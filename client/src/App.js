import { Routes, Route, BrowserRouter} from "react-router-dom";
import CreateCampaign from './components/client/CreateCampaign';
import CampaignList from './components/admin/CampaignList';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/admin/campaignList' element={<CampaignList/>} />
        <Route path='/user/createcampaign' element={<CreateCampaign/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
