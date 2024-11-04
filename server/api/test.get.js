export default defineEventHandler(async (event) => {
  return {
    msg: "hello world",
    event,
  };
});
