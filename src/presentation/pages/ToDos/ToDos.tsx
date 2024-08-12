import { ToDo } from "@/domain/models/to-do-model";
import { makeToDoManager } from "@/main/factories/usecases/manage-to-do-factory";
import Todo from "@/presentation/components/ToDo";
import { Box } from "@nimbus-ds/components";
import React, { useEffect, useState } from "react";

const ToDos: React.FC = () => {
  const todoManager = makeToDoManager();
  const [todos, setTodos] = useState<ToDo[]>();
  useEffect(() => {
    const getData = async () => {
      if (!todos) {
        const { todos } = await todoManager.list();
        setTodos(todos);
      }
    };
    getData();
  }, []);
  return (
    <Box display='flex' flexDirection='column' gap="2" padding='20'>

      {todos?.map(({ id, completed, todo }) => {
        return <Todo key={id} completed={completed} todo={todo} />;
      })}
    </Box>
  );
};

export { ToDos };
