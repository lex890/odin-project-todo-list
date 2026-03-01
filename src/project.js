export function createProject({ id, name, todos = [] }) {

  return {
    id: id ?? crypto.randomUUID(),
    name,
    todos,
    addTodo(todo) {
      this.todos.push(todo)
    },
    removeTodo(todo) {
      this.todos = this.todos.filter(t => t.id !== todo.id);
    }
  };
} 