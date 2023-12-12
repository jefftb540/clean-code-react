import { Input } from "@/presentation/components";
import { Box, Button } from "@nimbus-ds/components";

import { useLoginStore } from "@/presentation/pages/Login/login.store";
import { Props } from "./form.types";

const Form: React.FC<Props> = ({ onSubmit }) => {
  const { values, errors, isLoading, setValues } = useLoginStore();
  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ [evt.target.name]: evt.target.value });
  };

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
        appearance={errors.email ? "danger" : "neutral"}
        helpText={errors.email}
        value={values.email}
        onChange={onChange}
      />
      <Input
        type="password"
        name="password"
        label="Senha"
        appearance={errors.password ? "danger" : "neutral"}
        helpText={errors.password}
        value={values.password}
        onChange={onChange}
      />
      <Box display="flex" justifyContent="flex-end">
        <Button appearance="primary" type="submit" disabled={isLoading}>
          Acessar
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
