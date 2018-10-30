// TO DO LIST APP


// object with to do list array & methods to change the array
var todoList = {
	// empty to dos array
	todos: [],

	// each to do item is an object because is needs these attributes - the item text and whether it's complete or not
	addTodos: function(todoText) {
		this.todos.push({
			todoText: todoText,
			isCompleted: false,
		});
	},
	// redefine the text of the item (todoText) - find it by its position in the array
	changeTodos: function(position, todoText) {
		this.todos[position].todoText = todoText;
	},
	// remove an item by its position in the array. we only need to remove one at a time so the amount can remain as 1
	deleteTodo: function(position) {
		this.todos.splice(position, 1);
	},
	// mark a single item complere by chaning its boolean value - also found by array position
	toggleCompleted: function(position) {
		var todo = this.todos[position];
		todo.isCompleted = !todo.isCompleted;
	},
	// mark all items either completed or not
	toggleAll: function() {
		var totalTodos = this.todos.length;
		var completedTodos = 0; 

		// get number of completed todos and add to the completedTodos variable
		for (var i = 0; i < totalTodos; i++) {
			if (this.todos[i].isCompleted === true) {
				completedTodos++;
			}
		}
		
		// if all are completed, mark them all incomplete
		if ( completedTodos === totalTodos ) {
			for (var i = 0; i < totalTodos; i++) {
				this.todos[i].isCompleted = false;
			}
		// otherwise, mark them all complete
		} else {
			for (var i = 0; i < totalTodos; i++) {
				this.todos[i].isCompleted = true;
			}
		}
	}
}

// object with methods to handle user/btn events
var handlers = {
	toggleAll: function() {
		todoList.toggleAll();
		view.displayTodos();
	},
	addTodo: function() {
		var addInput = document.getElementById('addTodoText');
		todoList.addTodos(addInput.value);
		// clear the input
		addInput.value = '';
		view.displayTodos();
	},
	changeTodos: function(){
		var changePositionInput = document.getElementById('changePositionInput');
		var changeTextInput = document.getElementById('changeTextInput');
		todoList.changeTodos(changePositionInput.valueAsNumber, changeTextInput.value);
		changePositionInput.value = '';
		changeTextInput.value = '';
		view.displayTodos();
	},
	deleteTodo: function(position) {
		todoList.deleteTodo(position);
		deletePositionInput.value = '';
		view.displayTodos();

	},
	toggleCompleted: function() {
		var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
		todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
		toggleCompletedPositionInput.value = '';
		view.displayTodos();
	}
};


// onject to show what the list looks like
var view = {
	displayTodos: function() {
		// get the ul element
		var todosUl = document.querySelector('ul');

		// clear out the list before doing anything
		todosUl.innerHTML = '';

		// loop through items and create an li for each
		for (var i = 0; i < todoList.todos.length; i++) {
			var todoLi = document.createElement('li');
			var todoTextWithCompletion = '';
			var todo = todoList.todos[i];

			if (todo.isCompleted === true) {
				todoTextWithCompletion = '(x) ' + todo.todoText;
			} else {
				todoTextWithCompletion = '( ) ' + todo.todoText;
			};

			todoLi.id = i;
			todoLi.textContent = todoTextWithCompletion;
			todoLi.appendChild(this.createDeleteButton())
			todosUl.appendChild(todoLi);
		}
	},
	createDeleteButton: function() {
		var deleteButton = document.createElement('button');
		deleteButton.textContent = 'delete';
		deleteButton.className = 'deleteButton';
		return deleteButton;
	},
	setupEventListeners: function() {
		var todosUl = document.querySelector('ul');

		todosUl.addEventListener('click', function(event) {
		console.log(event.target.parentNode.id)

		var elementClicked = event.target;

		if (elementClicked.className === 'deleteButton') {
			handlers.deleteTodo(elementClicked.parentNode.id);
		}
		});
	}
};

view.setupEventListeners();




