import { defineStore } from "pinia";

export const useCounterStore = defineStore({
  id: "counterStore",
  state: () => ({
    count: 10,
  }),
  actions: {
    increaseCount() {
      this.count++;
    },
  },
});
