export function getLastInvalidation() {
  const now = new Date();
  const last = new Date(now);
  if (now.getMinutes() >= 3) {
    last.setMinutes(3, 0, 0);
  } else {
    last.setHours(now.getHours() - 1, 3, 0, 0);
  }
  return last.getTime();
}