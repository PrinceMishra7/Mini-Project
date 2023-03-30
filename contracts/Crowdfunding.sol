// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {
    struct Campaign {
        string title;
        string description;
        address seeker;
        uint goal;
        uint raised;
        bool approved;
        bool completed;
        bool voteApproved;
        uint256 phase;
        bool rejected;
        address[] donators;
        uint256[] donations;
        address[] voters;
        uint256[] votes;
    }
    address public admin;
    
    mapping(uint => Campaign) public campaigns;
    uint public campaignsCount;
    
    constructor() {
        admin = msg.sender;
        campaignsCount = 0;
    }
    
    function createCampaign(address _seeker,string memory _title, string memory _description, uint _goal) public returns(uint256){
        Campaign storage campaign=campaigns[campaignsCount];
        campaign.seeker=_seeker;
        campaign.title=_title;
        campaign.description=_description;
        campaign.approved=false;
        campaign.completed=false;
        campaign.goal=_goal;
        campaign.voteApproved=false;
        campaign.raised=0;
        campaign.phase=0;
        campaign.rejected=false;
        campaignsCount++;
        return campaignsCount;
    }

    function approveCampaign(uint256 _id) public {
        require(msg.sender == admin, "Only admin can approve campaigns");
        Campaign storage campaign = campaigns[_id];
        campaign.approved=true;
    }

    function rejectCampaign(uint256 _id) public {
        require(msg.sender == admin, "Only admin can approve campaigns");
        Campaign storage campaign = campaigns[_id];
        campaign.rejected=true;
    }

    function startVoting(uint256 _id) public{
        Campaign storage campaign = campaigns[_id];
        require(msg.sender == admin, "Only admin can start voting");
        require(campaign.approved == true, "Need to be approved by admin first");
        campaign.phase=1;
    }

    function makeVote(uint256 _id,uint256 _val) public{
        Campaign storage campaign = campaigns[_id];
        require(campaign.phase == 1, "Voting closed");
        campaign.voters.push(msg.sender);
        campaign.votes.push(_val);
    }

    function endVoting(uint256 _id) public{
        Campaign storage campaign = campaigns[_id];
        require(msg.sender == admin, "Only admin can end voting");
        require(campaign.phase == 1, "Voting not yet started");
        campaign.phase=2;
    }

  

    function votingResult(uint256 _id) public{
        Campaign storage campaign = campaigns[_id];
        require(msg.sender == admin, "Only admin can declare result");
        require(campaign.phase == 2, "Voting not yet closed");
        campaign.phase=3;
        uint256 len=campaign.votes.length;
        uint256 posVote=0;
        for(uint256 i=0;i<len;i++){
            if(campaign.votes[i]==1){
                posVote++;
            }
        }
        if(posVote>=len/2){
            campaign.voteApproved=true;
            
        }
        else{
            campaign.rejected=true;
            
        }
    }
    function donateToCampaign(uint256 _id) public payable{
        Campaign storage campaign = campaigns[_id];
        require(campaign.phase == 3,"Voting result not yet declared");
        require(campaign.rejected==false,"This Campaign has been rejected");

        uint256 amount = msg.value;
        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);
        (bool sent,) = payable(campaign.seeker).call{value: amount}("");
        if(sent) {
            campaign.raised = campaign.raised + amount;
        }
    }

    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaignPhase(uint256 _id) public view returns(string memory){
        Campaign storage campaign=campaigns[_id];
        uint status=campaign.phase;
        string memory message="";
        if(status==0){
            if(campaign.rejected==true) message="Rejected by admin";  
            else message="not yet approved by admin";   
        }
        else if(status==1){
            message="admin approved, in voting phase";
        }
        else if(status==2){
             message="admin approved, voting has closed";   
        }
        else if(status==3){
            if(campaign.rejected==true) message="admin approved, rejected by people"; 
            else if (campaign.voteApproved==true) message="admin approved, donation phase has started"; 
        }
        return message;
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](campaignsCount);
        for(uint i = 0; i < campaignsCount; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }
        return allCampaigns;
    }

}
