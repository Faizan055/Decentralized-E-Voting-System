// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    address public owner;
    bool public votingOpen;
    mapping(address => bool) public allowlist;
    mapping(address => bool) public hasVoted;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier onlyAllowlisted() {
        require(allowlist[msg.sender], "You are not allowed to vote");
        _;
    }

    modifier onlyOnce() {
        require(!hasVoted[msg.sender], "You have already voted");
        _;
    }

    constructor() {
        owner = msg.sender;
        votingOpen = false; // Initial state: Voting closed
    }

    struct Candidate {
        string name;
        uint256 age;
        uint256 uniqueId;
        uint256 votes;
    }

    mapping(uint256 => Candidate) public candidates;
    uint256 public totalCandidates;

    event CandidateAdded(uint256 uniqueId, string name, uint256 age);
    event VoteCast(address voter, uint256 uniqueId);
    event VotingClosed();
    event VotingStarted();
    event AllowlistAdded(address allowedAddress);

    // Function to add a candidate
    function addCandidate(string memory _name, uint256 _age, uint256 _uniqueId) public onlyOwner {
        require(!votingOpen, "Voting is currently open. Cannot add new candidates.");

        candidates[_uniqueId] = Candidate(_name, _age, _uniqueId, 0);
        totalCandidates++;
        emit CandidateAdded(_uniqueId, _name, _age);
    }

    // Function to add an address to the allowlist
    function addToAllowlist(address _address) public onlyOwner {
        allowlist[_address] = true;
        emit AllowlistAdded(_address);
    }

    // Public function to cast a vote
    function vote(uint256 _uniqueId) public onlyAllowlisted onlyOnce {
        require(votingOpen, "Voting is closed");
        require(candidates[_uniqueId].uniqueId != 0, "Invalid candidate");

        // Mark the address as voted
        hasVoted[msg.sender] = true;

        // Increment the vote count for the selected candidate
        candidates[_uniqueId].votes++;
        emit VoteCast(msg.sender, _uniqueId);
    }

    // Function to start the voting
    function startVote() public onlyOwner {
        require(!votingOpen, "Voting is already open");

        // Open the voting
        votingOpen = true;
        emit VotingStarted();
    }

    // Function to close the voting
    function closeVote() public onlyOwner {
        require(votingOpen, "Voting is already closed");

        // Close the voting
        votingOpen = false;
        emit VotingClosed();
    }

    // Function to get the winner
    function getWinner() public view returns (string memory winningCandidateName) {
        require(!votingOpen, "Voting is still open");

        uint256 maxVotes = 0;
        for (uint256 i = 1; i <= totalCandidates; i++) {
            if (candidates[i].votes > maxVotes) {
                maxVotes = candidates[i].votes;
                winningCandidateName = candidates[i].name;
            }
        }
    }

    // Function to get the current vote status of all candidates with names
    function getCurrentVoteStatus() public view returns (string[] memory candidateNames, uint256[] memory voteCounts) {
        candidateNames = new string[](totalCandidates);
        voteCounts = new uint256[](totalCandidates);
        for (uint256 i = 1; i <= totalCandidates; i++) {
            candidateNames[i - 1] = candidates[i].name;
            voteCounts[i - 1] = candidates[i].votes;
        }
    }
}
