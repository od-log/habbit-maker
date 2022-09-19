export default class habit_presenter {
  constructor(habits) {
    this.habits = habits;
  }

  getHabits() {
    return this.habits;
  }

  increment(habit, update) {
    this.habits = this.habits.map((item) => {
      if (item.id === habit.id) {
        return { ...habit, count: habit.count + 1 };
      }
      return item;
    });
    update(this.habits);
  }

  decrement(habit, update) {
    this.habits = this.habits.map((item) => {
      if (item.id === habit.id) {
        const count = habit.count - 1;
        return { ...habit, count: count < 0 ? 0 : count };
      }
      return item;
    });
    update(this.habits);
  }

  delete(habit, update) {
    console.log("this.habits", this.habits);
    this.habits = this.habits.filter((item) => item.id !== habit.id);
    console.log("after this.habits", this.habits);
    update(this.habits);
  }

  add(name, update) {
    this.habits = [...this.habits, { id: Date.now(), name, count: 0 }];
    update(this.habits);
  }

  reset(update) {
    this.habits = this.habits.map((habit) => {
      if (habit.count !== 0) {
        return { ...habit, count: 0 };
      }
      return habit;
    });
    update(this.habits);
  }
}
