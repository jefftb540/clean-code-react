import { Box, Text } from '@nimbus-ds/components';
import { ToDo as ToDoProps } from '@/domain/models/to-do-model';

const Todo = ({ completed, todo}: ToDoProps) => {
  return <Box display='flex' gap='2' justifyContent='space-between'>
    <Text>{todo}</Text>
    <Text color={completed ? "success-interactive" : "danger-interactive"}>{completed? 'Concluído' : 'Pendente'}</Text>

  </Box>;
};

export { Todo }
