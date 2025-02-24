// config/jest.setup.tsx
import "@testing-library/jest-dom";
import "jest-environment-jsdom";
import { TextDecoder, TextEncoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock Lucide React
jest.mock("lucide-react", () => ({
  Loader2: () => <div data-testid="loading-spinner" />,
}));

// Mock Framer Motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }) => children,
}));

// Mock pdfjs-dist
jest.mock("pdfjs-dist", () => ({
  GlobalWorkerOptions: {
    workerSrc: "",
  },
}));

// Mock react-pdf more completely
jest.mock("react-pdf", () => ({
  Document: ({ children }) => <div data-testid="pdf-document">{children}</div>,
  Page: ({ pageNumber }) => <div data-testid="pdf-page">Page {pageNumber}</div>,
  pdfjs: {
    GlobalWorkerOptions: {
      workerSrc: "",
    },
  },
}));
