pragma solidity ^0.5.0;

contract Crowdseed {
    string public name;
    uint public ideaCount = 0;
    mapping(uint => Idea) public Ideas;

    struct Idea {
        uint id;
        string name;
        uint goal;
        string description;
        address payable owner;
        bool seeded;
    }

    event IdeaCreated(
        uint id,
        string name,
        uint goal,
        string description,
        address payable owner,
        bool seeded
    );

    event IdeaSeeded(
        uint id,
        string name,
        uint amount,
        address payable owner,
        bool seeded
    );

    constructor() public {
        name = "Crowdseed";
    }

    function createIdea(string memory _name, uint _goal, string memory _description) public {
        // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid price
        require( _goal > 0);
        // Require a valid Description
        require(bytes(_description).length > 0);
        // Increment idea count
        ideaCount ++;
        // Create the idea
        Ideas[ideaCount] = Idea(ideaCount, _name, _goal,_description, msg.sender, false);
        // Trigger an event
        emit IdeaCreated(ideaCount, _name, _goal, _description ,msg.sender, false);
    }

    function seedIdea(uint _id) public payable {
        // Fetch the idea
        Idea memory _Idea = Ideas[_id];
        // Fetch the owner
        address payable _ideaCreator = _Idea.owner;
        // Make sure the idea has a valid id
        require(_Idea.id > 0 && _Idea.id <= ideaCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= _Idea.goal);
        // Require that the Creator is not the Seeder
        require(_ideaCreator != msg.sender);
        //Require that the seeder is giving less than the goal amount 
        require(msg.value <= _Idea.goal);
        // Mark as seeded
        _Idea.seeded = true;
        // Update the idea
        Ideas[_id] = _Idea;
        // Pay the Creator by sending them Ether
        address(_ideaCreator).transfer(msg.value);
        // Trigger an event
        emit IdeaSeeded(ideaCount, _Idea.name, _Idea.goal, msg.sender, true);
    }
}
