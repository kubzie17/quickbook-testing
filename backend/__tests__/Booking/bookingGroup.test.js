const { 
    groupBookingsByService
 } = require("../../utils");

describe("groupBookingsByService", () => {
  test("groups bookings by service", () => {
    const bookings = [
      { id: 1, name: "A", service: "walk", date: "2026-01-01", time: "10:00" },
      { id: 2, name: "B", service: "walk", date: "2026-01-01", time: "11:00" },
      { id: 3, name: "C", service: "groom", date: "2026-01-01", time: "12:00" },
    ];
 

    const result = groupBookingsByService(bookings);

    expect(result).toEqual({
      walk: [
        { id: 1, name: "A", service: "walk", date: "2026-01-01", time: "10:00" },
        { id: 2, name: "B", service: "walk", date: "2026-01-01", time: "11:00" },
      ],
      groom: [{ id: 3, name: "C", service: "groom", date: "2026-01-01", time: "12:00" }],
    });
  });

  test("returns empty object for empty array", () => {
    const result = groupBookingsByService([]);

    expect(result).toEqual({});
  });
});
