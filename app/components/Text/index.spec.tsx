import React from "react";
import { render, screen } from "@testing-library/react-native";

import { Text } from "./index";

describe("C1omponets/Text", () => {
  it("should render the component", () => {
    const { debug } = render(<Text>Test</Text>);
    debug();
    expect(screen.getByText("Test")).toBeTruthy();
  });
});
