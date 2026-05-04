let counter = 0;

export function generateId(prefix) {
  counter += 1;
  return `${prefix}-${counter}`;
}

export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function required(value, fieldName) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${fieldName} is required`);
  }
  return value.trim();
}

export function validEmail(value) {
  const email = required(value, "email");
  if (!email.includes("@")) throw new Error("email must be valid");
  return email;
}
