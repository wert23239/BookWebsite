// __tests__/components/SignUpPage.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUpPage from "@/app/signup/page";
import { useRouter } from "next/navigation";
import { json } from "stream/consumers";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn();

describe("SignUpPage", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: "User created" }),
    });
  });

  it("renders the signup form", () => {
    render(<SignUpPage />);
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
  });

  it("submits the form with user data", async () => {
    render(<SignUpPage />);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: expect.any(String),
      });

      const bodyObj = JSON.parse(
        (global.fetch as jest.Mock).mock.calls[0][1].body
      );
      expect(bodyObj).toEqual({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });

  it("displays error message when signup fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: "User already exists" }),
    });

    render(<SignUpPage />);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText("User already exists")).toBeInTheDocument();
    });
  });
});
