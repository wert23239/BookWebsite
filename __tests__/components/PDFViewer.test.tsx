// __tests__/components/PDFViewer.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import PDFViewer from "@/components/PDFViewer";

// Mock all the imports we need
jest.mock("react-pdf", () => ({
  Document: ({ children, onLoadSuccess }) => {
    // Simulate PDF load
    onLoadSuccess?.({ numPages: 5 });
    return <div data-testid="pdf-document">{children}</div>;
  },
  Page: ({ pageNumber }) => (
    <div data-testid="pdf-page">PDF Page {pageNumber}</div>
  ),
  pdfjs: {
    GlobalWorkerOptions: {
      workerSrc: "",
    },
  },
}));

// Mock framer-motion to avoid animation issues
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }) => children,
}));

// Mock react-swipeable
jest.mock("react-swipeable", () => ({
  useSwipeable: () => ({
    handlers: {},
  }),
}));

describe("PDFViewer", () => {
  const defaultProps = {
    pdfUrl: "/test.pdf",
  };

  it("renders initial page number correctly", () => {
    render(<PDFViewer {...defaultProps} />);
    // Look for the exact text as it appears in your span
    expect(screen.getByText("Page 1 of 5")).toBeInTheDocument();
  });

  it("updates page number when clicking next", () => {
    render(<PDFViewer {...defaultProps} />);
    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);
    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    render(<PDFViewer {...defaultProps} />);
    const prevButton = screen.getByRole("button", { name: /previous/i });
    expect(prevButton).toBeDisabled();
  });

  it("shows zoom controls", () => {
    render(<PDFViewer {...defaultProps} />);
    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();
  });
});
