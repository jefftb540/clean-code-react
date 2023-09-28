import { Input } from "@/presentation/components";
import { Box, Button } from "@nimbus-ds/components";

import { useLogin } from "@/presentation/pages/Login/hooks";
import { Props } from "./form.types";

const Form: React.FC<Props> = ({ onSubmit }) => {
  const { state, onChange } = useLogin();

  return (
    <Box
      as="form"
      data-testid="form"
      display="flex"
      flexDirection="column"
      gap="4"
      onSubmit={onSubmit}
    >
      <Input
        type="text"
        name="email"
        label="E-mail"
        appearance={!!state.errors.email ? "danger" : "neutral"}
        helpText={state.errors.email}
        value={state.values.email}
        onChange={onChange}
      />
      <Input
        type="password"
        name="password"
        label="Senha"
        appearance={!!state.errors.password ? "danger" : "neutral"}
        helpText={state.errors.password}
        value={state.values.password}
        onChange={onChange}
      />
      <Box display="flex" justifyContent="flex-end">
        <Button appearance="primary" type="submit" disabled={state.isLoading}>
          Acessar
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
