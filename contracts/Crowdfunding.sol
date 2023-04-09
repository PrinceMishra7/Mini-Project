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
        bool voteApproved;
        uint256 phase;
        uint256 campaignNo;
        address[] donators;
        uint256[] donations;
        address[] voters;
        uint256[] votes;
        string[] documentURL;
        uint256 finalCount;
        address fundraiser;
    }
    
    struct Review{
        string message;
        address reviewer;
        uint256 timestamp;
    }
    address public admin;
    
    mapping(uint => Campaign) public campaigns;
    mapping(uint256=>Review[]) public reviews;
    mapping(uint => uint) public duration;

    uint public campaignsCount;
    uint public approvalCount;
    uint public votingCount;
    uint public donatingCount;
    uint public finishedCount;
    
    constructor() {
        admin = msg.sender;
        campaignsCount = 0;
        approvalCount = 0;
        votingCount = 0;
        finishedCount = 0;
    }
    
    function addReview(uint256 _id,string memory _message) public {
            Review memory review;
            review.message=_message;
            review.reviewer=msg.sender;
            review.timestamp=block.timestamp;
            reviews[_id].push(review);
    }
    
    function getReview(uint256 _id) public view returns(Review[] memory){
        return reviews[_id];
    }

    function createCampaign(address _seeker,string memory _title, string memory _description, uint _goal,string memory _documentURL,string memory _imageURL,uint _duration) public returns(uint256){
        Campaign storage campaign=campaigns[campaignsCount];
        campaign.seeker=_seeker;
        campaign.title=_title;
        campaign.description=_description;
        campaign.approved=false;
        campaign.goal=_goal;
        campaign.voteApproved=false;
        campaign.raised=0;
        campaign.phase=0;
        campaign.campaignNo = campaignsCount;
        campaign.documentURL.push( _documentURL);
        campaign.documentURL.push( _imageURL);
        campaign.finalCount = 0;
        campaign.fundraiser = msg.sender;
        duration[campaignsCount] = _duration;
        campaignsCount++;
        approvalCount++;
        return campaignsCount;
    }

    function approveCampaign(uint256 _id) public {
        require(msg.sender == admin, "Only admin can approve campaigns");
        Campaign storage campaign = campaigns[_id];
        campaign.approved=true;
        campaign.phase=1;
        approvalCount--;
        votingCount++;
    }

    function rejectCampaign(uint256 _id) public {
        require(msg.sender == admin, "Only admin can approve campaigns");
        Campaign storage campaign = campaigns[_id];
        campaign.phase=1;
        approvalCount--;
        votingCount++;
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
        votingCount--;
        uint256 len=campaign.votes.length;
        uint256 posVote=0;
        duration[_id] = (duration[_id]*86400) + block.timestamp;
        for(uint256 i=0;i<len;i++){
            if(campaign.votes[i]==1){
                posVote++;
            }
        }
        campaign.finalCount = posVote;
        if(len%2==0){
            if(posVote>=len/2){
                campaign.voteApproved=true;
                donatingCount++;
            }
            else{
                campaign.voteApproved=false;
            }
        }
        else
        {
            if(posVote>=((len/2)+1)){
                campaign.voteApproved=true;
                donatingCount++;
            }
            else{
                campaign.voteApproved=false;
            }
        }
        
        
    }

    function donateToCampaign(uint256 _id) public payable{
        Campaign storage campaign = campaigns[_id];
        require(campaign.phase == 2,"Voting result not yet declared");

        uint256 amount = msg.value;
        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);
        (bool sent,) = payable(campaign.seeker).call{value: amount}("");
        if(sent) {
            campaign.raised = campaign.raised + (amount/ 1 ether);
        }
    }

    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](campaignsCount);
        for(uint i = 0; i < campaignsCount; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }
        return allCampaigns;
    }

    function getPendingAdminCampaigns() public view returns (Campaign[] memory) {
        uint256 temp =0;
        Campaign[] memory allCampaigns = new Campaign[](approvalCount);
        for(uint i = 0; i < campaignsCount; i++) {
            if(campaigns[i].phase != 0) continue;
            Campaign storage item = campaigns[i];
            allCampaigns[temp] = item;
            temp++;
        }
        return allCampaigns;
    }

    function getUserVotingCampaigns() public view returns (Campaign[] memory) {
        uint256 temp =0;
        Campaign[] memory allCampaigns = new Campaign[](votingCount);
        for(uint i = 0; i < campaignsCount; i++) {
            if(campaigns[i].phase != 1) continue;
            Campaign storage item = campaigns[i];
            allCampaigns[temp] = item;
            temp++;
        }
        return allCampaigns;
    }

    function getUserDonatingCampaigns() public view returns (Campaign[] memory) {
        uint256 temp =0;
        Campaign[] memory allCampaigns = new Campaign[](donatingCount);
        for(uint i = 0; i < campaignsCount; i++) {
            if(campaigns[i].voteApproved!=true) continue;
            if(campaigns[i].phase != 2) continue;
            if(duration[i] < block.timestamp) continue;
            Campaign storage item = campaigns[i];
            allCampaigns[temp] = item;
            temp++;
        }
        return allCampaigns;
    }

    function getDetailCampaign(uint256 _id) public view returns(Campaign memory){
        return campaigns[_id];
    }

    function votedDonationCampaigns() public view returns(Campaign[] memory){
        uint temp = 0;
        for(uint i = 0 ; i<campaignsCount;i++){
            for(uint j=0 ;j<campaigns[i].voters.length;j++){
                if((campaigns[i].voters[j] == msg.sender) && campaigns[i].voteApproved==true && campaigns[i].phase==2){
                    temp++;
                }
            }
        }
        Campaign[] memory allCampaigns = new Campaign[](temp);
        uint p = 0;
        for(uint i = 0 ; i<campaignsCount;i++){
            for(uint j=0 ;j<campaigns[i].voters.length;j++){
                if((campaigns[i].voters[j] == msg.sender) && campaigns[i].voteApproved==true && campaigns[i].phase==2){
                    allCampaigns[p]=campaigns[i];
                    p++;
                }
            }
        }
        return allCampaigns;
    }

    function votedCampaigns() public view returns(Campaign[] memory){
        uint temp = 0;
        for(uint i = 0 ; i<campaignsCount;i++){
            for(uint j=0 ;j<campaigns[i].voters.length;j++){
                if((campaigns[i].voters[j] == msg.sender) && campaigns[i].phase==1 ){
                    temp++;
                }
            }
        }
        Campaign[] memory allCampaigns = new Campaign[](temp);
        uint p = 0;
        for(uint i = 0 ; i<campaignsCount;i++){
            for(uint j=0 ;j<campaigns[i].voters.length;j++){
                if((campaigns[i].voters[j] == msg.sender) && campaigns[i].phase==1){
                    allCampaigns[p]=campaigns[i];
                    p++;
                }
            }
        }
        return allCampaigns;
    }

    function donatedCampaigns() public view returns(Campaign[] memory){
        uint temp = 0;
        for(uint i = 0 ; i<campaignsCount;i++){
            for(uint j=0 ;j<campaigns[i].donators.length;j++){
                if((campaigns[i].donators[j] == msg.sender) && campaigns[i].phase==2 ){
                    temp++;
                }
            }
        }
        Campaign[] memory allCampaigns = new Campaign[](temp);
        uint p = 0;
        for(uint i = 0 ; i<campaignsCount;i++){
            for(uint j=0 ;j<campaigns[i].donators.length;j++){
                if((campaigns[i].donators[j] == msg.sender) && campaigns[i].phase==2){
                    allCampaigns[p]=campaigns[i];
                    p++;
                }
            }
        }
        return allCampaigns;
    }

    function myCampaigns() public view returns(Campaign[] memory){
        uint temp = 0;
        for(uint i = 0 ; i<campaignsCount;i++){
            if(campaigns[i].fundraiser == msg.sender ){
                temp++;
            }
        }
        
        Campaign[] memory allCampaigns = new Campaign[](temp);
        uint p = 0;
        for(uint i = 0 ; i<campaignsCount;i++){
            if(campaigns[i].fundraiser == msg.sender ){
                allCampaigns[p]=campaigns[i];
                p++;
            }
        }
        return allCampaigns;
    }
}