import { render, screen } from "@testing-library/react";

function Hello() {
  return <p>hello</p>;
}

it("renders with RTL and jest-dom", () => {
  render(<Hello />);
  expect(screen.getByText("hello")).toBeInTheDocument();
});
