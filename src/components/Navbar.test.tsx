import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import Navbar from "./Navbar";
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

const mockAuthContextValue: AuthContextType = {
  user: mockUser,
  handleLogin: vi.fn(),
  handleLogout: mockHandleLogout,
};

describe("Navbar Component", () => {
  // 1. Cek apakah navbar dirender saat user sudah login
  it("should render navbar component when user is logged in", () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={mockAuthContextValue}>
          <Navbar />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    // Memeriksa apakah elemen-elemen di dalam Navbar dirender dengan benar
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
  });

  // 2. Cek function button handleLogout saat di klik
  it("calls handleLogout when logout is clicked", () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={mockAuthContextValue}>
          <Navbar />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    // Buka dropdown menu
    waitFor(() => {
      const avatar = screen.getByRole("img");
      fireEvent.click(avatar);
    });

    waitFor(() => {
      // Klik tombol logout
      const logoutButton = screen.getByText("Logout");
      fireEvent.click(logoutButton);

      // cek apakah handleLogout dipanggil
      expect(mockHandleLogout).toHaveBeenCalled();
    });
  });
});
