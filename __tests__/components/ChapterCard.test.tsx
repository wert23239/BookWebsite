// __tests__/components/ChapterCard.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import ChapterCard from "@/components/ChapterCard";
import { Loader2 } from "lucide-react";

// Mock Lucide icons
jest.mock("lucide-react", () => ({
  Loader2: () => <div data-testid="loading-spinner" />, // Remove the 'Loading Spinner' text
}));

describe("ChapterCard", () => {
  const mockOnSelect = jest.fn();
  const defaultProps = {
    chapterNum: 1,
    isCompleted: false,
    onSelect: mockOnSelect,
    isLoading: null,
  };

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it("renders chapter number correctly", () => {
    render(<ChapterCard {...defaultProps} />);
    expect(screen.getByText(/Chapter 1/i)).toBeInTheDocument();
  });

  it("shows loading state when chapter is loading", () => {
    render(<ChapterCard {...defaultProps} isLoading={1} />);
    expect(screen.getByText(/Loading.../i).closest(".flex")).toHaveClass(
      "items-center gap-2"
    );
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("disables button when any chapter is loading", () => {
    render(<ChapterCard {...defaultProps} isLoading={2} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("shows completed state when chapter is completed", () => {
    render(<ChapterCard {...defaultProps} isCompleted={true} />);
    expect(screen.getByText(/Completed/i)).toBeInTheDocument();
  });

  it("calls onSelect when button is clicked", () => {
    render(<ChapterCard {...defaultProps} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockOnSelect).toHaveBeenCalledWith(1);
  });
});
