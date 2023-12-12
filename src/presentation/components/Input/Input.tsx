import React from "react";
import { Props } from "./input.types";
import { Box, Label, Text, Input as NimbusInput } from "@nimbus-ds/components";

const Input: React.FC<Props> = ({ label, type, helpText, ...props }) => (
  <Box display="flex" flexDirection="column" gap="2">
    {label && <Label htmlFor={props.id ?? props.name}>{label}</Label>}
    {type !== "password" && (
      <NimbusInput id={props.id ?? props.name} {...props} />
    )}
    {type === "password" && (
      <NimbusInput.Password id={props.id ?? props.name} {...props} />
    )}
    {helpText && (
      <Text
        data-testid={`${props.name}-text-error`}
        color="danger-textLow"
        fontSize="caption"
      >
        {helpText}
      </Text>
    )}
  </Box>
);

export default Input;
