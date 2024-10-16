// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract TodoList {
    uint public taskCount = 0;

    struct Task {
        uint id;
        string content;
        bool completed;
        uint creationDate;
    }

    // Hash table to store tasks
    mapping(uint => Task) public tasks;

    event TaskCreated(
        uint id,
        string content,
        bool completed,
        uint creationDate
    );

    constructor() public {
        createTask("Try adding a task to the list");
    }

    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false, block.timestamp); 
        emit TaskCreated(taskCount, _content, false, block.timestamp);
    }
}