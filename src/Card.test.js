import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from './Card';

// Smoke Test
test("it renders without crashing", () => {
    render(<Card/>);
});

// Snapshot Test
test("it matches snapshot", () => {
    const {asFragment} = render(<Card/>);
    expect(asFragment()).toMatchSnapshot()
});