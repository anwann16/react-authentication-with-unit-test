import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import Home from "./Home";
import { AuthContext, AuthContextType } from "../context/AuthContext";

// Mock data
const mockUser = {
  id: 1,
  username: "testuser",
  email: "testemail@x.dummyjson.com",
  firstName: "Emily",
  lastName: "Johnson",
  gender: "female",
  image: "https://dummyjson.com/icon/emilys/128",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJtaWNoYWVsdyIsImVtYWlsIjoibWljaGFlbC53aWxsaWFtc0B4LmR1bW15anNvbi5jb20iLCJmaXJzdE5hbWUiOiJNaWNoYWVsIiwibGFzdE5hbWUiOiJXaWxsaWFtcyIsImdlbmRlciI6Im1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL21pY2hhZWx3LzEyOCIsImlhdCI6MTcxNzYxMTc0MCwiZXhwIjoxNzE3NjE1MzQwfQ.eQnhQSnS4o0sXZWARh2HsWrEr6XfDT4ngh0ejiykfH8",
  refreshToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJtaWNoYWVsdyIsImVtYWlsIjoibWljaGFlbC53aWxsaWFtc0B4LmR1bW15anNvbi5jb20iLCJmaXJzdE5hbWUiOiJNaWNoYWVsIiwibGFzdE5hbWUiOiJXaWxsaWFtcyIsImdlbmRlciI6Im1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL21pY2hhZWx3LzEyOCIsImlhdCI6MTcxNzYxMTc0MCwiZXhwIjoxNzIwMjAzNzQwfQ.YsStJdmdUjKOUlbXdqze0nEScCM_RJw9rnuy0RdSn88",
};

const mockHandleLogout = vi.fn();

const mockAuthContextValueLoggedIn: AuthContextType = {
  user: mockUser,
  handleLogin: vi.fn(),
  handleLogout: mockHandleLogout,
};
const mockAuthContextValueNotLoggedIn: AuthContextType = {
  user: null,
  handleLogin: vi.fn(),
  handleLogout: mockHandleLogout,
};

describe("Home Component", () => {
  // 1. Cek apakah welcome message dirender saat user sudah login
  it("should render welcome message when user is logged in", () => {
    render(
      <AuthContext.Provider value={mockAuthContextValueLoggedIn}>
        <Home />
      </AuthContext.Provider>
    );

    // Memeriksa apakah welcome message dirender saat user sudah login
    waitFor(() => {
      expect(
        screen.getByText(
          `Welcome back, ${mockUser.firstName} ${mockUser.lastName}!`
        )
      ).toBeInTheDocument();
    });
  });

  // 2. Cek apakah welcome message tidak dirender saat user tidak login
  it("should not render welcome message when user not logged in", () => {
    render(
      <AuthContext.Provider value={mockAuthContextValueNotLoggedIn}>
        <Home />
      </AuthContext.Provider>
    );

    // Memeriksa apakah welcome message tidak dirender saat user sudah login
    waitFor(() => {
      expect(
        screen.getByText(
          `Welcome back, ${mockUser.firstName} ${mockUser.lastName}!`
        )
      ).toBeNull();
    });
  });
});
