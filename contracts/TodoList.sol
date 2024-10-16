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

    event TaskCompleted(
        uint id,
        bool completed
    );

    constructor() public {
        createTask("Try adding a task to the list");
    }

    function createTask(string memory _content) public {
        taskCount++;
        uint createdAt = block.timestamp;
        tasks[taskCount] = Task(taskCount, _content, false, createdAt); 
        emit TaskCreated(taskCount, _content, false, createdAt);
    }

    function toggleCompleted(uint _id) public {
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit TaskCompleted(_id, _task.completed);
    }
}