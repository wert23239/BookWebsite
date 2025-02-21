// __tests__/components/Survey.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Survey from "@/components/Survey";

describe("Survey", () => {
  const mockOnComplete = jest.fn();
  const defaultProps = {
    onComplete: mockOnComplete,
    chapterNumber: 1,
  };

  beforeEach(() => {
    mockOnComplete.mockClear();
    // Mock fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    ) as jest.Mock;
  });

  it("renders first question initially", () => {
    render(<Survey {...defaultProps} />);
    expect(
      screen.getByText("How do you prefer to solve problems?")
    ).toBeInTheDocument();
  });

  it("shows all options for first question", () => {
    render(<Survey {...defaultProps} />);
    expect(
      screen.getByText("Think deeply about all possibilities")
    ).toBeInTheDocument();
    expect(screen.getByText("Take immediate action")).toBeInTheDocument();
    expect(
      screen.getByText("Consider how it affects everyone")
    ).toBeInTheDocument();
  });

  it("advances to next question after selection", async () => {
    render(<Survey {...defaultProps} />);
    const firstOption = screen.getByText(
      "Think deeply about all possibilities"
    );
    fireEvent.click(firstOption);
    expect(
      screen.getByText("What interests you most in a story?")
    ).toBeInTheDocument();
  });
});
