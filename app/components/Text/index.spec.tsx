import React from "react";
import { render, screen } from "@testing-library/react-native";

import { Text } from "./index";

describe("Componets/Text", () => {
  it("should render the component", () => {
    render(<Text>Test</Text>);
    expect(screen.getByText("Test")).toBeTruthy();
  });
});
