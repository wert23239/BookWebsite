// __tests__/components/ChapterSelection.test.tsx
import { render, screen } from "@testing-library/react";
import ChapterSelection from "@/components/ChapterSelection";

describe("ChapterSelection", () => {
  const defaultProps = {
    onChapterSelect: jest.fn(),
    completedChapters: [],
    loadingChapter: null,
  };

  it("renders all chapters", () => {
    render(<ChapterSelection {...defaultProps} />);
    // Only look for the CardTitle elements containing "Chapter"
    const chapterTitles = screen.getAllByText(/^Chapter \d$/); // ^ and $ ensure exact match
    expect(chapterTitles).toHaveLength(2);
  });

  it("renders completed chapters correctly", () => {
    render(<ChapterSelection {...defaultProps} completedChapters={[1]} />);
    expect(screen.getByText(/Completed/i)).toBeInTheDocument();
  });

  it("renders correct descriptions", () => {
    render(<ChapterSelection {...defaultProps} />);
    expect(screen.getByText(/Begin your journey/)).toBeInTheDocument();
    expect(screen.getByText(/Continue your story/)).toBeInTheDocument();
  });
});
