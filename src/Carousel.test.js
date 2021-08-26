import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

// Smoke Test
test("it renders without crashing", () => {
  render(<Carousel/>);
});

// Snapshot Test
test("it matches snapshot", () => {
  const {asFragment} = render(<Carousel/>);

  expect(asFragment()).toMatchSnapshot();
});

// Specialized Test
test("it works when you click on the left arrow", () => {
  const {queryByAltText, queryByTestId} = render(<Carousel/>);

  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  //expect the second image to show but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  //expect the first image to show but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

test("it works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

test("there is no left arrow on first image", () => {
  const {queryByTestId} = render(<Carousel/>);
  const leftArrow = queryByTestId("left-arrow");
  
  expect(leftArrow).not.toBeInTheDocument();
});

test("there is no right arrow on last image", () => {
  const {queryByTestId} = render(<Carousel/>);
  const rightArrow = queryByTestId("right-arrow");

  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  expect(rightArrow).not.toBeInTheDocument();
})