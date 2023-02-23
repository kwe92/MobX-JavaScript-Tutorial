const _round2 = (value) => Number.parseFloat(String(value)).toFixed(2);

class TodoStore {
  todos = [];

  get completedTodosCount() {
    return this.todos.filter((todo) => todo.competed === true).length;
  }

  addTodo = (task, competed) =>
    this.todos.push({
      task: task,
      competed: competed ? competed : false,
      assignee: null,
    });

  report() {
    if (this.todos.length === 0) {
      return "<none>";
    }
    const nextTodo = this.todos.find((todo) => todo.competed === false);
    return (
      `Next Todo: "${nextTodo ? nextTodo.task : "<none>"}". ` +
      `Progress: ${_round2(
        (this.completedTodosCount / this.todos.length) * 100
      )}%`
    );
  }
}

let todo = new TodoStore();

todo.addTodo("Reading");
todo.addTodo("Coding", true);
todo.addTodo("Writing", true);

console.log(todo.todos);
console.log(todo.report());

// export default Todo;
