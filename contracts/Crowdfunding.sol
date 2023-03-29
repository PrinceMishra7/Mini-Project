// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Crowdfunding {
    address public campaignOwner;
    uint public campaignGoal;
    uint public totalDonated;
    uint public votingEndTime;
    uint public donationEndTime;
    uint public yesVotes;
    uint public noVotes;
    bool public votingEnded;
    bool public donationEnabled;

    mapping(address => bool) public backers;
    mapping(address => uint) public donations;

    event CampaignStarted(address indexed owner, uint goal, uint votingEnd, uint donationEnd);
    event VoteCasted(address indexed backer, bool choice);
    event DonationMade(address indexed backer, uint amount);

    modifier onlyOwner() {
        require(msg.sender == campaignOwner, "Only the campaign owner can call this function.");
        _;
    }

    modifier votingPeriod() {
        require(block.timestamp <= votingEndTime, "Voting period has ended.");
        _;
    }

    modifier donationPeriod() {
        require(donationEnabled, "Donation period has not yet started.");
        require(block.timestamp <= donationEndTime, "Donation period has ended.");
        _;
    }

    function startCampaign(uint _campaignGoal, uint _votingDuration, uint _donationDuration) public {
        require(!votingEnded, "Voting has already ended.");
        require(_campaignGoal > 0, "Campaign goal must be greater than zero.");
        require(_votingDuration > 0, "Voting duration must be greater than zero.");
        require(_donationDuration > 0, "Donation duration must be greater than zero.");

        campaignOwner = msg.sender;
        campaignGoal = _campaignGoal;
        votingEndTime = block.timestamp + _votingDuration;
        donationEndTime = votingEndTime + _donationDuration;
        votingEnded = false;
        donationEnabled = false;
        
        emit CampaignStarted(campaignOwner, campaignGoal, votingEndTime, donationEndTime);
    }

    function castVote(bool _choice) public votingPeriod {
        require(!backers[msg.sender], "You have already voted.");
        if (_choice) {
            yesVotes++;
        } else {
            noVotes++;
        }
        backers[msg.sender] = true;
        emit VoteCasted(msg.sender, _choice);
    }

    function startDonation() public onlyOwner votingPeriod {
        require(!votingEnded, "Voting has already ended.");
        votingEnded = true;
        donationEnabled = yesVotes > noVotes;
    }

    function makeDonation() public payable donationPeriod {
        require(donationEnabled, "Donations are not enabled yet.");
        require(!backers[msg.sender], "You have already donated.");
        backers[msg.sender] = true;
        donations[msg.sender] = msg.value;
        totalDonated += msg.value;
        payable(campaignOwner).transfer(msg.value);
        emit DonationMade(msg.sender, msg.value);
    }
}
