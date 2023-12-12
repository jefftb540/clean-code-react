import { MemoryRouterProps } from "react-router-dom";
import { act, fireEvent, screen } from "@testing-library/react";
import * as faker from "@ngneat/falso";

import { renderWithHistory, ValidationStub } from "@/presentation/mocks";
import { AuthenticationSpy } from "@/domain/mocks";
import { Login } from "@/presentation/pages";
import { InvalidCredentialsError } from "@/domain/errors";

type SutTypes = {
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError: string;
};

const history = {
  initialEntries: ["/login"],
} satisfies MemoryRouterProps;

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const authenticationSpy = new AuthenticationSpy();
  renderWithHistory({
    history,
    Page: () =>
      Login({ validation: validationStub, authentication: authenticationSpy }),
  });

  return { authenticationSpy };
};

const simulateValidSubmit = async (
  email = faker.randEmail(),
  password = faker.randPassword(),
): Promise<void> => {
  fireEvent.input(screen.getByLabelText("E-mail"), {
    target: { value: email },
  });
  fireEvent.input(screen.getByLabelText("Senha"), {
    target: { value: password },
  });
  await act(() => fireEvent.click(screen.getByText("Acessar")));
};

describe("Login Page", () => {
  it("should correctly display error messages if the form is empty", async () => {
    const validationError = faker.randPhrase();
    makeSut({ validationError });
    await act(() => fireEvent.click(screen.getByText("Acessar")));
    expect(screen.getByTestId("email-text-error").innerHTML).toBe(
      validationError,
    );
    expect(screen.getByTestId("password-text-error").innerHTML).toBe(
      validationError,
    );
  });

  it("should show email error if Validation fails", async () => {
    const validationError = faker.randPhrase();
    makeSut({ validationError });
    fireEvent.input(screen.getByLabelText("E-mail"), {
      target: { value: "email" },
    });
    await act(() => fireEvent.click(screen.getByText("Acessar")));
    expect(screen.getByTestId("email-text-error").innerHTML).toBe(
      validationError,
    );
  });

  it("should show password error if Validation fails", async () => {
    const validationError = faker.randPhrase();
    makeSut({ validationError });
    fireEvent.input(screen.getByLabelText("Senha"), {
      target: { value: "pass" },
    });
    await act(() => fireEvent.click(screen.getByText("Acessar")));
    expect(screen.getByTestId("password-text-error").innerHTML).toBe(
      validationError,
    );
  });

  it("should show valid email state if Validation succeeds", async () => {
    makeSut();
    fireEvent.input(screen.getByLabelText("E-mail"), {
      target: { value: faker.randEmail() },
    });
    await act(() => fireEvent.click(screen.getByText("Acessar")));
    expect(screen.queryByTestId("password-text-error")).toBeNull();
  });

  it("should show valid password state if Validation succeeds", async () => {
    makeSut();
    fireEvent.input(screen.getByLabelText("Senha"), {
      target: { value: faker.randPassword() },
    });
    await act(() => fireEvent.click(screen.getByText("Acessar")));
    expect(screen.queryByTestId("password-text-error")).toBeNull();
  });

  it("should disable the access button to the submit data", async () => {
    makeSut();
    await simulateValidSubmit();
    expect(
      screen.getByText<HTMLButtonElement>("Acessar").disabled,
    ).toBeTruthy();
  });

  it("should call Authentication with correct values", async () => {
    const { authenticationSpy } = makeSut();
    const email = faker.randEmail();
    const password = faker.randPassword();
    await simulateValidSubmit(email, password);
    expect(authenticationSpy.params).toEqual({ email, password });
  });

  it("should not call Authentication if form is invalid", async () => {
    const validationError = faker.randPhrase();
    const { authenticationSpy } = makeSut({ validationError });
    await simulateValidSubmit();
    expect(authenticationSpy.callsCount).toBe(0);
  });

  it("should present error if Authentication fails", async () => {
    const { authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(authenticationSpy, "auth").mockRejectedValueOnce(error);
    await simulateValidSubmit();
    expect(screen.getByText(error.message)).toBeDefined();
  });
});
