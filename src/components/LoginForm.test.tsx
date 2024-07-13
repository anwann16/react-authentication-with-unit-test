import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";

import { AuthContextProvider } from "@/context/AuthContext";
import LoginForm from "@/components/LoginForm";

describe("LoginForm Component", () => {
  it("renders the login form", () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <LoginForm />
        </AuthContextProvider>
      </BrowserRouter>
    );

    // Memeriksa apakah elemen-elemen di dalam LoginForm dirender dengan benar
    expect(screen.getByText(/Please Login!/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });
});
