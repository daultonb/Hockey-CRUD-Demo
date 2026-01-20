import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Navbar from "../components/Navbar";

describe("Navbar Component", () => {
  describe("Rendering", () => {
    it("should render the navbar", () => {
      render(<Navbar />);

      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("should render the brand icon with DB text", () => {
      render(<Navbar />);

      const brandIcon = screen.getByText("DB");
      expect(brandIcon).toBeInTheDocument();
      expect(brandIcon).toHaveClass("brand-icon");
    });

    it("should render the brand link pointing to daultonb.com", () => {
      render(<Navbar />);

      const brandLink = screen.getByRole("link", { name: /db/i });
      expect(brandLink).toHaveAttribute("href", "https://daultonb.com");
      expect(brandLink).toHaveClass("navbar-brand");
    });

    it("should render LinkedIn link", () => {
      render(<Navbar />);

      const linkedInLink = screen.getByRole("link", { name: /linkedin/i });
      expect(linkedInLink).toBeInTheDocument();
      expect(linkedInLink).toHaveAttribute(
        "href",
        "https://www.linkedin.com/in/daultonbaird/"
      );
      expect(linkedInLink).toHaveAttribute("target", "_blank");
      expect(linkedInLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("should render GitHub link", () => {
      render(<Navbar />);

      const githubLink = screen.getByRole("link", { name: /github/i });
      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute("href", "https://github.com/daultonb");
      expect(githubLink).toHaveAttribute("target", "_blank");
      expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("should render the mobile menu toggle button", () => {
      render(<Navbar />);

      const toggleButton = screen.getByRole("button", {
        name: /toggle navigation/i,
      });
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton).toHaveClass("navbar-toggler");
    });

    it("should have correct aria-expanded attribute initially", () => {
      render(<Navbar />);

      const toggleButton = screen.getByRole("button", {
        name: /toggle navigation/i,
      });
      expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("Mobile Menu Toggle", () => {
    it("should toggle menu open when toggle button is clicked", () => {
      render(<Navbar />);

      const toggleButton = screen.getByRole("button", {
        name: /toggle navigation/i,
      });
      const navCollapse = document.querySelector(".navbar-collapse");

      expect(navCollapse).not.toHaveClass("show");
      expect(toggleButton).not.toHaveClass("active");

      fireEvent.click(toggleButton);

      expect(navCollapse).toHaveClass("show");
      expect(toggleButton).toHaveClass("active");
      expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    });

    it("should toggle menu closed when toggle button is clicked again", () => {
      render(<Navbar />);

      const toggleButton = screen.getByRole("button", {
        name: /toggle navigation/i,
      });
      const navCollapse = document.querySelector(".navbar-collapse");

      // Open menu
      fireEvent.click(toggleButton);
      expect(navCollapse).toHaveClass("show");

      // Close menu
      fireEvent.click(toggleButton);
      expect(navCollapse).not.toHaveClass("show");
      expect(toggleButton).not.toHaveClass("active");
      expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    });

    it("should close menu when brand link is clicked", () => {
      render(<Navbar />);

      const toggleButton = screen.getByRole("button", {
        name: /toggle navigation/i,
      });
      const brandLink = screen.getByRole("link", { name: /db/i });
      const navCollapse = document.querySelector(".navbar-collapse");

      // Open menu first
      fireEvent.click(toggleButton);
      expect(navCollapse).toHaveClass("show");

      // Click brand link
      fireEvent.click(brandLink);
      expect(navCollapse).not.toHaveClass("show");
    });

    it("should close menu when LinkedIn link is clicked", () => {
      render(<Navbar />);

      const toggleButton = screen.getByRole("button", {
        name: /toggle navigation/i,
      });
      const linkedInLink = screen.getByRole("link", { name: /linkedin/i });
      const navCollapse = document.querySelector(".navbar-collapse");

      // Open menu first
      fireEvent.click(toggleButton);
      expect(navCollapse).toHaveClass("show");

      // Click LinkedIn link
      fireEvent.click(linkedInLink);
      expect(navCollapse).not.toHaveClass("show");
    });

    it("should close menu when GitHub link is clicked", () => {
      render(<Navbar />);

      const toggleButton = screen.getByRole("button", {
        name: /toggle navigation/i,
      });
      const githubLink = screen.getByRole("link", { name: /github/i });
      const navCollapse = document.querySelector(".navbar-collapse");

      // Open menu first
      fireEvent.click(toggleButton);
      expect(navCollapse).toHaveClass("show");

      // Click GitHub link
      fireEvent.click(githubLink);
      expect(navCollapse).not.toHaveClass("show");
    });
  });

  describe("CSS Classes", () => {
    it("should have navbar-dark class on nav element", () => {
      render(<Navbar />);

      const nav = document.querySelector("nav");
      expect(nav).toHaveClass("navbar");
      expect(nav).toHaveClass("navbar-dark");
    });

    it("should have container class on inner div", () => {
      render(<Navbar />);

      const container = document.querySelector(".container");
      expect(container).toBeInTheDocument();
    });

    it("should have ms-auto class on navbar-nav for right alignment", () => {
      render(<Navbar />);

      const navList = document.querySelector(".navbar-nav");
      expect(navList).toHaveClass("ms-auto");
    });

    it("should render three toggler icon spans", () => {
      render(<Navbar />);

      const togglerIcons = document.querySelectorAll(".navbar-toggler-icon");
      expect(togglerIcons).toHaveLength(3);
    });
  });

  describe("Accessibility", () => {
    it("should have proper nav landmark", () => {
      render(<Navbar />);

      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();
    });

    it("should have aria-label on toggle button", () => {
      render(<Navbar />);

      const toggleButton = screen.getByRole("button", {
        name: /toggle navigation/i,
      });
      expect(toggleButton).toHaveAttribute("aria-label", "Toggle navigation");
    });

    it("should update aria-expanded when menu is toggled", () => {
      render(<Navbar />);

      const toggleButton = screen.getByRole("button", {
        name: /toggle navigation/i,
      });

      expect(toggleButton).toHaveAttribute("aria-expanded", "false");

      fireEvent.click(toggleButton);
      expect(toggleButton).toHaveAttribute("aria-expanded", "true");

      fireEvent.click(toggleButton);
      expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    });
  });
});
