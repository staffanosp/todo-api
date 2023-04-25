const addTodoOptions = (newTodo, todos) => {
  return {
    optimisticData: [...todos, { ...newTodo, isPending: true }],
    rollbackOnError: false,
    populateCache: false,
    revalidate: true,
  };
};

const updateTodoOptions = (id, body) => {
  return {
    optimisticData: (todos) => {
      const index = todos.findIndex((item) => item.id === id);
      todos[index] = { ...todos[index], ...body };
      return [...todos];
    },
    rollbackOnError: true,
    populateCache: false,
    revalidate: false,
  };
};

const deleteTodoOptions = (id) => {
  return {
    //TODO: FIX MUTATION PROBLEMS. todos should not be spliced in place
    optimisticData: (todos) => {
      const index = todos.findIndex((item) => item.id === id);
      todos.splice(index, 1);
      return [...todos];
    },
    rollbackOnError: true,
    populateCache: false,
    revalidate: false,
  };
};

const deleteTodosOptions = (ids) => {
  return {
    optimisticData: (todos) => todos.filter((todo) => !ids.includes(todo.id)),
    rollbackOnError: true,
    populateCache: false,
    revalidate: false,
  };
};

export {
  addTodoOptions,
  updateTodoOptions,
  deleteTodoOptions,
  deleteTodosOptions,
};
