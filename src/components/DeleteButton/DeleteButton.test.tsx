import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import DeleteButton from "./index";

describe("DeleteButton Component", () => {
  it("renders a button element", () => {
    const deleteHandler = vi.fn();
    render(
      <DeleteButton
        confirmationMessage="delete confirmation message"
        confirmationTitle="delete confirmation title"
        deleteHandler={deleteHandler}
      />
    );
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });
  it("opens confirmation modal on button click", () => {
    const deleteHandler = vi.fn();
    render(
      <DeleteButton
        confirmationMessage="delete confirmation message"
        confirmationTitle="delete  confirmation title "
        deleteHandler={deleteHandler}
      />
    );
    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);
    expect(screen.getByText("delete confirmation title")).toBeInTheDocument();
    expect(screen.getByText("delete confirmation message")).toBeInTheDocument();
  });
  it("calls deleteHandler on confirming deletion", () => {
    const deleteHandler = vi.fn();
    render(
      <DeleteButton
        confirmationMessage="delete confirmation message"
        confirmationTitle="delete confirmation title"
        deleteHandler={deleteHandler}
      />
    );
    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);
    expect(deleteHandler).toHaveBeenCalledTimes(1);
  });
});
