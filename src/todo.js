export function createToDo({
  id = crypto.randomUUID(),
  title = '',
  description = '',
  dueDate = null,
  priority = 'low',
  checklist = [],
  completed = false
} = {}) {
  return {
    id,
    title,
    description,
    dueDate,
    priority,
    checklist,
    completed,
    toggle() {
      this.completed = !this.completed;
    }
  };
}