import { describe } from "vitest";
import { render, screen } from "@testing-library/react";

import Login from "./Login";

vi.mock("@/components/LoginForm", () => ({
  default: () => <div data-testid="login-form">Login form component</div>,
}));

describe("Login Page Component", () => {
  // Cek apakah login form terender
  it("should render login form", () => {
    render(<Login />);

    const loginFormElement = screen.getByTestId("login-form");
    expect(loginFormElement).toBeInTheDocument();
    expect(loginFormElement).toHaveTextContent("Login form component");
  });
});
