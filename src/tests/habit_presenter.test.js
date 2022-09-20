import habitPresenter from "../habit_presenter";

describe("HabitPresenter", () => {
  const habits = [
    { id: 1, name: "Reading", count: 1 },
    { id: 2, name: "Running", count: 0 },
  ];
  let presenter;
  let update;

  beforeEach(() => {
    presenter = new habitPresenter(habits, 3);
    update = jest.fn();
  });

  it("inits with habits", () => {
    expect(presenter.getHabits()).toEqual(habits);
  });

  it("increments habit count and call update callback", () => {
    expect(presenter.increment(habits[0], update));
    expect(presenter.getHabits()[0].count).toBe(2);
    checkUpdateIsCalled();
  });

  it("decrements habit count and call update callback", () => {
    expect(presenter.decrement(habits[0], update));
    expect(presenter.getHabits()[0].count).toBe(0);
  });

  it("does not set the count value below 0 when decrements", () => {
    expect(presenter.decrement(habits[0], update));
    expect(presenter.decrement(habits[0], update));
    expect(presenter.getHabits()[0].count).toBe(0);
  });

  it("delete habit from the list and call update", () => {
    presenter.delete(habits[0], update);
    expect(presenter.getHabits().length).toBe(1);
    expect(presenter.getHabits()[0].name).toBe("Running");
    checkUpdateIsCalled();
  });

  it("add new habit to the list", () => {
    presenter.add("Eating", update);
    expect(presenter.getHabits().length).toBe(3);
    expect(presenter.getHabits()[2].name).toBe("Eating");
    expect(presenter.getHabits()[2].count).toBe(0);
    checkUpdateIsCalled();
  });

  it("throws an error when the max habits limit is exceeded", () => {
    presenter.add("Eating", update);
    expect(() => {
      presenter.add("Eating", update);
    }).toThrow(`습관의 갯수는 3 이상이 될 수 없습니다.`);
  });

  describe("reset", () => {
    it("resets all habit counts to 0", () => {
      presenter.reset(update);
      expect(presenter.getHabits()[0].count).toBe(0);
      expect(presenter.getHabits()[1].count).toBe(0);
      checkUpdateIsCalled();
    });

    it("does not create new object when count is 0", () => {
      const habits = presenter.getHabits();
      presenter.reset(update);
      const updatedHabits = presenter.getHabits();

      expect(updatedHabits[1]).toBe(habits[1]); //object 불변성 테스트 object의 참조값을 검사 .toEqual()은 내용을 비교.
    });
  });

  function checkUpdateIsCalled() {
    expect(update).toHaveBeenCalledTimes(1); //1번 호출
    expect(update).toHaveBeenCalledWith(presenter.getHabits());
  }
});
