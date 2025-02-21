// __tests__/components/PDFViewer.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import PDFViewer from "@/components/PDFViewer";

// Mock react-pdf
jest.mock("react-pdf", () => ({
  Document: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="pdf-document">{children}</div>
  ),
  Page: () => <div data-testid="pdf-page">PDF Page</div>,
  pdfjs: {
    GlobalWorkerOptions: {
      workerSrc: "",
    },
  },
}));

describe("PDFViewer", () => {
  const defaultProps = {
    pdfUrl: "/test.pdf",
  };

  it("renders PDF viewer with controls", () => {
    render(<PDFViewer {...defaultProps} />);
    expect(screen.getByTestId("pdf-document")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("handles page navigation", () => {
    render(<PDFViewer {...defaultProps} />);
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    expect(screen.getByText("Page 2 of")).toBeInTheDocument();
  });
});
