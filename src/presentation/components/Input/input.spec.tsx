import { render, screen } from "@testing-library/react";
import * as faker from "@ngneat/falso";

import { Input, InputProps } from "./";

const makeSut = (props?: InputProps): void => {
  render(<Input {...props} />);
};

describe("Input Component", () => {
  it("should rendering the label properly sent", () => {
    const props = {
      label: faker.randDatabaseColumn(),
      id: faker.randDatabaseColumn(),
    } satisfies InputProps;

    makeSut(props);
    expect(screen.getByText(props.label)).toBeDefined();
  });

  it("should rendering the error text properly sent", () => {
    const props = { helpText: faker.randPhrase() } satisfies InputProps;
    makeSut(props);
    expect(screen.getByText(props.helpText)).toBeDefined();
  });

  it("should rendering the name in prop if the id is not sent in the input element", () => {
    const props = {
      helpText: faker.randPhrase(),
      name: faker.randDatabaseColumn(),
      "data-testid": "element-input",
    } satisfies InputProps;

    makeSut(props);
    const input = screen.getByTestId<HTMLInputElement>(props["data-testid"]);
    expect(input.id).toBe(props.name);
    expect(input.type).toBe("text");
  });

  it("should rendering name on the case prop of the case the id is not sent in the label element", () => {
    const props = {
      helpText: faker.randPhrase(),
      name: faker.randDatabaseColumn(),
      label: faker.randDatabaseColumn(),
      type: "password",
      "data-testid": "element-input",
    } satisfies InputProps;

    makeSut(props);
    const label = screen.getByText<HTMLLabelElement>(props.label);
    const input = screen.getByTestId<HTMLInputElement>(props["data-testid"]);
    expect(label.htmlFor).toBe(props.name);
    expect(input.id).toBe(props.name);
    expect(input.type).toBe("password");
  });

  it("should render the password input", () => {
    const props = {
      "data-testid": "element-input",
      type: "password",
      id: faker.randDatabaseColumn(),
      name: faker.randDatabaseColumn(),
    } satisfies InputProps;

    makeSut(props);
    const input = screen.getByTestId<HTMLInputElement>(props["data-testid"]);
    expect(input.type).toBe("password");
  });
});
