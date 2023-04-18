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

export { addTodoOptions, updateTodoOptions, deleteTodoOptions };
