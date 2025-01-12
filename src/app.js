const App = {
    loading: false,
    contracts: {},
    web3Provider: null,
    accounts: [],
    todoList: null,

    init: async () => {
        await App.loadWeb3();
        await App.loadAccount();
        await App.loadContract();
        await App.render();
    },

    loadWeb3: async () => {
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            window.web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log('Ethereum enabled');
            } catch (error) {
                console.error('User denied account access', error);
            }
        } else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
            window.web3 = new Web3(window.web3.currentProvider);
            console.log('Legacy dapp browser detected');
        } else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    },

    loadAccount: async () => {
        App.accounts = await window.web3.eth.getAccounts();
    },

    loadContract: async () => {
        const todoList = await $.getJSON('TodoList.json');
        App.contracts.TodoList = TruffleContract(todoList);
        App.contracts.TodoList.setProvider(App.web3Provider);
        App.todoList = await App.contracts.TodoList.deployed();
    },

    render: async () => {
        if (App.loading) return;

        App.setLoading(true);
        $('#account').html(App.accounts[0]);
        await App.renderTasks();
        App.setLoading(false);
    },

    setLoading: (loading) => {
        App.loading = loading;
        const loader = $('#loader');
        const content = $('#content');
        if (loading) {
            loader.show();
            content.hide();
        } else {
            loader.hide();
            content.show();
        }
    },

    renderTasks: async () => {
        const taskCount = await App.todoList.taskCount();
        const $taskTemplate = $('.taskTemplateDefault');

        $('#taskList').children().not('.taskTemplateDefault').remove();
        $('#completedTaskList').empty();

        for (let i = 1; i <= taskCount; i++) {
            const task = await App.todoList.tasks(i);
            const taskId = task[0].toNumber();
            const taskContent = task[1];
            const taskCompleted = task[2];
            const taskTimestamp = task[3].toNumber();
            const taskTimeSince = `created ${moment(taskTimestamp * 1000).fromNow()}`;
            const $newTaskTemplate = $taskTemplate.clone();
            $newTaskTemplate.attr('class', 'taskItem');
            $newTaskTemplate.find('.content').html(taskContent);
            $newTaskTemplate.find('input')
                .prop('name', taskId)
                .prop('checked', taskCompleted)
                .on('click', App.toggleCompleted);
            $newTaskTemplate.find('.timestamp').html(taskTimeSince);

            if (taskCompleted) {
                $('#completedTaskList').append($newTaskTemplate);
            } else {
                $('#taskList').append($newTaskTemplate);
            }
            $newTaskTemplate.show();
        }
    },

    createTask: async () => {
        const content = $('#newTask').val();
        console.log('Creating task with content:', content);
        await App.todoList.createTask(content, { from: App.accounts[0] });
        await App.loadContract();
        $('#newTask').val('');
        await App.render();
    },

    toggleCompleted: async (e) => {
        const taskId = e.target.name;
        console.log('Toggling task completion for task ID:', taskId);
        await App.todoList.toggleCompleted(taskId, { from: App.accounts[0] });
        await App.render();
    }
};

$(() => {
    $(window).on('load', App.init);
});
