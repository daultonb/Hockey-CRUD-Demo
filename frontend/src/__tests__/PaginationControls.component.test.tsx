import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import PaginationControls from "../components/players/PaginationControls";

describe("PaginationControls Component", () => {
  const mockOnPageChange = jest.fn();
  const mockOnItemsPerPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Items Per Page", () => {
    it("should render items per page selector", () => {
      render(
        <PaginationControls
          currentPage={1}
          totalPages={5}
          itemsPerPage={20}
          totalItems={100}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
        />
      );

      expect(screen.getByLabelText(/Items per page/i)).toBeInTheDocument();
      expect(screen.getByRole("combobox")).toHaveValue("20");
    });

    it("should call onItemsPerPageChange when value changes", () => {
      render(
        <PaginationControls
          currentPage={1}
          totalPages={5}
          itemsPerPage={20}
          totalItems={100}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
        />
      );

      const select = screen.getByRole("combobox");
      fireEvent.change(select, { target: { value: "50" } });

      expect(mockOnItemsPerPageChange).toHaveBeenCalledWith(50);
    });

    it("should disable items per page selector when disabled prop is true", () => {
      render(
        <PaginationControls
          currentPage={1}
          totalPages={5}
          itemsPerPage={20}
          totalItems={100}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
          disabled={true}
        />
      );

      expect(screen.getByRole("combobox")).toBeDisabled();
    });
  });

  describe("Single Page", () => {
    it("should not show pagination controls when totalPages is 1", () => {
      render(
        <PaginationControls
          currentPage={1}
          totalPages={1}
          itemsPerPage={20}
          totalItems={15}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
        />
      );

      expect(
        screen.queryByLabelText(/Go to previous page/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByLabelText(/Go to next page/i)
      ).not.toBeInTheDocument();
    });

    it("should not show pagination controls when totalPages is 0", () => {
      render(
        <PaginationControls
          currentPage={1}
          totalPages={0}
          itemsPerPage={20}
          totalItems={0}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
        />
      );

      expect(
        screen.queryByLabelText(/Go to previous page/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByLabelText(/Go to next page/i)
      ).not.toBeInTheDocument();
    });
  });

  describe("Previous Button", () => {
    it("should disable previous button on first page", () => {
      render(
        <PaginationControls
          currentPage={1}
          totalPages={5}
          itemsPerPage={20}
          totalItems={100}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
        />
      );

      const prevButton = screen.getByLabelText(/Go to previous page/i);
      expect(prevButton).toBeDisabled();
    });

    it("should enable previous button when not on first page", () => {
      render(
        <PaginationControls
          currentPage={3}
          totalPages={5}
          itemsPerPage={20}
          totalItems={100}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
        />
      );

      const prevButton = screen.getByLabelText(/Go to previous page/i);
      expect(prevButton).not.toBeDisabled();
    });

    it("should call onPageChange with previous page number when clicked", () => {
      render(
        <PaginationControls
          currentPage={3}
          totalPages={5}
          itemsPerPage={20}
          totalItems={100}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
        />
      );

      const prevButton = screen.getByLabelText(/Go to previous page/i);
      fireEvent.click(prevButton);

      expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it("should not call onPageChange when clicking disabled previous button", () => {
      render(
        <PaginationControls
          currentPage={1}
          totalPages={5}
          itemsPerPage={20}
          totalItems={100}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
        />
      );

      const prevButton = screen.getByLabelText(/Go to previous page/i);
      fireEvent.click(prevButton);

      expect(mockOnPageChange).not.toHaveBeenCalled();
    });
  });

  describe("Next Button", () => {
    it("should disable next button on last page", () => {
      render(
        <PaginationControls
          currentPage={5}
          totalPages={5}
          itemsPerPage={20}
          totalItems={100}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
        />
      );

      const nextButton = screen.getByLabelText(/Go to next page/i);
      expect(nextButton).toBeDisabled();
    });

    it("should enable next button when not on last page", () => {
      render(
        <PaginationControls
          currentPage={3}
          totalPages={5}
          itemsPerPage={20}
          totalItems={100}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
        />
      );

      const nextButton = screen.getByLabelText(/Go to next page/i);
      expect(nextButton).not.toBeDisabled();
    });

    it("should call onPageChange with next page number when clicked", () => {
      render(
        <PaginationControls
          currentPage={3}
          totalPages={5}
          itemsPerPage={20}
          totalItems={100}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
        />
      );

      const nextButton = screen.getByLabelText(/Go to next page/i);
      fireEvent.click(nextButton);

      expect(mockOnPageChange).toHaveBeenCalledWith(4);
    });

    it("should not call onPageChange when clicking disabled next button", () => {
      render(
        <PaginationControls
          currentPage={5}
          totalPages={5}
          itemsPerPage={20}
          totalItems={100}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
        />
      );

      const nextButton = screen.getByLabelText(/Go to next page/i);
      fireEvent.click(nextButton);

      expect(mockOnPageChange).not.toHaveBeenCalled();
    });
  });

  describe("Page Numbers - Small Total Pages", () => {
    it("should show all page numbers when total pages <= 7", () => {
      render(
        <PaginationControls
          currentPage={3}
          totalPages={5}
          itemsPerPage={20}
          totalItems={100}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
        />
      );

      expect(screen.getByLabelText(/Go to page 1/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Go to page 2/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Go to page 3/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Go to page 4/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Go to page 5/i)).toBeInTheDocument();

      // Should not show ellipsis
      expect(screen.queryByText("...")).not.toBeInTheDocument();
    });

    it("should mark current page as active", () => {
      render(
        <PaginationControls
          currentPage={3}
          totalPages={5}
          itemsPerPage={20}
          totalItems={100}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
        />
      );

      const page3Button = screen.getByLabelText(/Go to page 3/i);
      expect(page3Button).toHaveClass("active");
      expect(page3Button).toHaveAttribute("aria-current", "page");
    });

    it("should call onPageChange when page number is clicked", () => {
      render(
        <PaginationControls
          currentPage={1}
          totalPages={5}
          itemsPerPage={20}
          totalItems={100}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
        />
      );

      const page4Button = screen.getByLabelText(/Go to page 4/i);
      fireEvent.click(page4Button);

      expect(mockOnPageChange).toHaveBeenCalledWith(4);
    });
  });

  describe("Page Numbers - Many Pages (Near Beginning)", () => {
    it("should show first 3 pages, ellipsis, and last 3 pages", () => {
      render(
        <PaginationControls
          currentPage={2}
          totalPages={20}
          itemsPerPage={20}
          totalItems={400}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
        />
      );

      // Should show pages 1, 2, 3
      expect(screen.getByLabelText("Go to page 1")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 2")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 3")).toBeInTheDocument();

      // Should show ellipsis
      expect(screen.getByText("...")).toBeInTheDocument();

      // Should show last 3 pages (18, 19, 20)
      expect(screen.getByLabelText("Go to page 18")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 19")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 20")).toBeInTheDocument();

      // Current page (2) should be marked as active
      const currentPageButton = screen.getByLabelText("Go to page 2");
      expect(currentPageButton).toHaveClass("active");
      expect(currentPageButton).toHaveAttribute("aria-current", "page");
    });
  });

  describe("Page Numbers - Many Pages (Near End)", () => {
    it("should show first 3 pages, ellipsis, and last 3 pages when current page is near end", () => {
      render(
        <PaginationControls
          currentPage={18}
          totalPages={20}
          itemsPerPage={20}
          totalItems={400}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
        />
      );

      // Should show pages 1, 2, 3
      expect(screen.getByLabelText("Go to page 1")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 2")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 3")).toBeInTheDocument();

      // Should show ellipsis
      expect(screen.getByText("...")).toBeInTheDocument();

      // Should show last 3 pages (18, 19, 20)
      expect(screen.getByLabelText("Go to page 18")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 19")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 20")).toBeInTheDocument();

      // Current page (18) should be marked as active
      const currentPageButton = screen.getByLabelText("Go to page 18");
      expect(currentPageButton).toHaveClass("active");
      expect(currentPageButton).toHaveAttribute("aria-current", "page");
    });
  });

  describe("Page Numbers - Many Pages (In Middle)", () => {
    it("should show first 3 pages, current page, and last 3 pages when current page is in middle", () => {
      render(
        <PaginationControls
          currentPage={10}
          totalPages={20}
          itemsPerPage={20}
          totalItems={400}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
        />
      );

      // Should show pages 1, 2, 3
      expect(screen.getByLabelText("Go to page 1")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 2")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 3")).toBeInTheDocument();

      // Should show two ellipses (before and after current page)
      const ellipses = screen.getAllByText("...");
      expect(ellipses).toHaveLength(2);

      // Should show current page (10)
      const currentPageButton = screen.getByLabelText("Go to page 10");
      expect(currentPageButton).toBeInTheDocument();
      expect(currentPageButton).toHaveClass("active");
      expect(currentPageButton).toHaveAttribute("aria-current", "page");

      // Should show last 3 pages (18, 19, 20)
      expect(screen.getByLabelText("Go to page 18")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 19")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 20")).toBeInTheDocument();
    });

    it("should show page 4 when current page is 4", () => {
      render(
        <PaginationControls
          currentPage={4}
          totalPages={20}
          itemsPerPage={20}
          totalItems={400}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
        />
      );

      // Should show pages 1, 2, 3
      expect(screen.getByLabelText("Go to page 1")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 2")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 3")).toBeInTheDocument();

      // Should show two ellipses
      const ellipses = screen.getAllByText("...");
      expect(ellipses).toHaveLength(2);

      // Should show current page (4)
      const currentPageButton = screen.getByLabelText("Go to page 4");
      expect(currentPageButton).toBeInTheDocument();
      expect(currentPageButton).toHaveClass("active");
      expect(currentPageButton).toHaveAttribute("aria-current", "page");

      // Should show last 3 pages (18, 19, 20)
      expect(screen.getByLabelText("Go to page 18")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 19")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 20")).toBeInTheDocument();
    });
  });

  describe("Disabled State", () => {
    it("should disable all page number buttons when disabled prop is true", () => {
      render(
        <PaginationControls
          currentPage={3}
          totalPages={5}
          itemsPerPage={20}
          totalItems={100}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
          disabled={true}
        />
      );

      const page1Button = screen.getByLabelText(/Go to page 1/i);
      const page2Button = screen.getByLabelText(/Go to page 2/i);
      const page3Button = screen.getByLabelText(/Go to page 3/i);

      expect(page1Button).toBeDisabled();
      expect(page2Button).toBeDisabled();
      expect(page3Button).toBeDisabled();
    });

    it("should disable previous and next buttons when disabled prop is true", () => {
      render(
        <PaginationControls
          currentPage={3}
          totalPages={5}
          itemsPerPage={20}
          totalItems={100}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
          disabled={true}
        />
      );

      const prevButton = screen.getByLabelText(/Go to previous page/i);
      const nextButton = screen.getByLabelText(/Go to next page/i);

      expect(prevButton).toBeDisabled();
      expect(nextButton).toBeDisabled();
    });
  });

  describe("Edge Cases", () => {
    it("should handle exactly 7 pages correctly", () => {
      render(
        <PaginationControls
          currentPage={4}
          totalPages={7}
          itemsPerPage={20}
          totalItems={140}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
        />
      );

      // Should show all 7 pages
      for (let i = 1; i <= 7; i++) {
        expect(screen.getByLabelText(`Go to page ${i}`)).toBeInTheDocument();
      }

      // Should not show ellipsis
      expect(screen.queryByText("...")).not.toBeInTheDocument();
    });

    it("should handle exactly 8 pages correctly", () => {
      render(
        <PaginationControls
          currentPage={1}
          totalPages={8}
          itemsPerPage={20}
          totalItems={160}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
        />
      );

      // Should show ellipsis since totalPages > 7
      expect(screen.getByText("...")).toBeInTheDocument();

      // Should show pages 1, 2, 3
      expect(screen.getByLabelText("Go to page 1")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 2")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 3")).toBeInTheDocument();

      // Should show last 3 pages (6, 7, 8)
      expect(screen.getByLabelText("Go to page 6")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 7")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to page 8")).toBeInTheDocument();
    });

    it("should handle page 1 of 2 correctly", () => {
      render(
        <PaginationControls
          currentPage={1}
          totalPages={2}
          itemsPerPage={20}
          totalItems={40}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
        />
      );

      expect(screen.getByLabelText(/Go to page 1/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Go to page 2/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Go to previous page/i)).toBeDisabled();
      expect(screen.getByLabelText(/Go to next page/i)).not.toBeDisabled();
    });
  });
});
