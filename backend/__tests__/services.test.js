const {
  isValidServiceDuration
} = require("../utils");


const services = [
  { id: 1, name: "Haircut", duration: 30 },
  { id: 2, name: "Consultation", duration: 45 },
  { id: 3, name: "Follow-up Session", duration: 20 },
];


describe("services array", () => {
  test("services array is not empty", () => {
    expect(services.length).toBeTruthy();
  });
});

describe("service duration", () => {
  test("valid service with duration returns true", () => {
    expect(isValidServiceDuration("Haircut", services)).toBe(true);
  });
  test("invalid service without duration returns false", () => {
    expect(isValidServiceDuration("Dog Wash", services)).toBe(false);
  });
});