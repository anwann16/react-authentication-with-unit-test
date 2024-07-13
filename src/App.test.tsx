import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import App from "./App";
import { AuthContext, AuthContextType } from "./context/AuthContext";

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

describe("App Component", () => {
  // 1. Cek apakah navbar dirender saat user sudah login
  it("should render navbar component when user is logged in", () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={mockAuthContextValueLoggedIn}>
          <App />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    // Memeriksa apakah elemen-elemen di dalam Navbar dirender saat user sudah login
    waitFor(() => {
      expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          (_, element) => element?.textContent === mockUser.email
        )
      ).toBeInTheDocument();

      const avatarImage = screen.getByRole("img");
      expect(avatarImage).toBeInTheDocument();
      expect(avatarImage).toHaveAttribute("src", mockUser.image);
    });

    // Memeriksa apakah konten utama (Outlet) dirender saat user sudah login
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
  });

  // 2. Cek apakah navbar tidak dirender saat tidak login
  it("should not render navbar component when user not logged in", () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={mockAuthContextValueNotLoggedIn}>
          <App />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    // Memeriksa apakah elemen-elemen di dalam Navbar tidak dirender saat user tidak login
    waitFor(() => {
      expect(screen.getByText(/Admin Dashboard/i)).toBeNull();
      expect(
        screen.getByText(
          (_, element) => element?.textContent === mockUser.email
        )
      ).toBeNull();

      const avatarImage = screen.getByRole("img");
      expect(avatarImage).toBeNull();
    });

    waitFor(() => {
      // Memeriksa apakah konten utama (outlet) tidak dirender jika user tidak login
      const mainElement = screen.getByRole("main");
      expect(mainElement).toBeNull();
    });
  });
});
