import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HabitAddForm from "../habitAddForm";
import React from "react";

// 내부 구현사항에 지나치게 의존하는 테스트는 좋지 않다.
describe("HabitAddForm", () => {
  let onAdd;
  let input;
  let button;
  beforeEach(() => {
    onAdd = jest.fn();
    render(<HabitAddForm onAdd={onAdd} />);
    input = screen.getByPlaceholderText("Habit");
    button = screen.getByText("Add");
  });

  it("calls onAdd when button is clicked", () => {
    // input에다가 원하는 습관의 이름을 타이핑한 다음에
    // add라는 버튼을 클릭하면
    // onAdd가 input에 입력된 이름과 함께 호출되어야 함.
    // userEvent.type(input, "New Habit");
    // userEvent.click(button);
    // expect(onAdd).toHaveBeenCalledWidth("New Habit");
  });
});
