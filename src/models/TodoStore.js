const {
  makeObservable,
  observable,
  action,
  computed,
  autorun,
} = require("mobx");

const _round2 = (value) => Number.parseFloat(String(value)).toFixed(2);

class TodoStore {
  todos = [];
  pendingRequests = 0;

  constructor() {
    makeObservable(this, {
      todos: observable,
      pendingRequests: observable,
      completedTodosCount: computed,
      addTodo: action,
      report: computed,
    });

    autorun(() => console.log(this.report));
  }

  get completedTodosCount() {
    return this.todos.filter((todo) => todo.competed === true).length;
  }

  addTodo = (task, competed) =>
    this.todos.push({
      task: task,
      competed: competed ? competed : false,
      assignee: null,
    });

  get report() {
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

todo.addTodo("Try MobX in own project");
todo.addTodo("Try MobX", true);
todo.addTodo("Read MobX Tutorial", true);

console.log(todo.todos);

// export default Todo;
