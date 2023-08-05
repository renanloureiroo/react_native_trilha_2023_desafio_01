import React from "react";
import {
  fireEvent,
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react-native";
import { Input } from ".";

import "@react-navigation/native";

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useIsFocused: jest.fn().mockReturnValue(true),
  useFocusEffect: jest.fn(),
}));

describe("Components/Input", () => {
  it("renders correctly with default props", () => {
    const { getByTestId } = render(<Input />);
    const inputWrapper = getByTestId("input-wrapper");
    const input = getByTestId("input");

    expect(inputWrapper).toBeTruthy();
    expect(input).toBeTruthy();
  });

  it("renders with the correct placeholder text color", () => {
    const { getByTestId } = render(<Input placeholder="Username" />);
    const input = getByTestId("input");

    expect(input.props.placeholderTextColor).toBe("#808080");
    expect(input.props.placeholder).toBe("Username");
  });

  it("should call the onChange function when the input value changes", async () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<Input onChangeText={onChange} />);
    const input = getByTestId("input");

    await userEvent.type(input, "test");

    expect(onChange).toHaveBeenCalledTimes(4);
  });

  it("should focus styles when the input is focused", async () => {
    const { getByTestId } = render(<Input />);
    const input = getByTestId("input");
    const inputWrapper = getByTestId("input-wrapper");

    fireEvent(input, "focus");

    expect(inputWrapper.props.style[1]).toEqual({
      borderWidth: 1,
      borderColor: "#8284FA",
    });
  });
});
