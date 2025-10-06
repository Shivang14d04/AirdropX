import { describe, it, expect } from "vitest";
import calculateTotal from "./calculateTotal";

describe("calculateTotal", () => {
  // ✅ Basic functionality
  it("sums valid numbers", () => {
    expect(calculateTotal("100,200,300")).toBe(600);
  });

  it("handles whitespace", () => {
    expect(calculateTotal("100, 200, 300")).toBe(600);
  });

  it("handles empty string", () => {
    expect(calculateTotal("")).toBe(0);
  });

  it("handles invalid inputs mixed with valid ones", () => {
    expect(calculateTotal("abc,100,def")).toBe(100);
  });

  it("handles trailing comma", () => {
    expect(calculateTotal("100,200,")).toBe(300);
  });

  // ⚡️ Additional edge cases
  it("handles newlines as separators", () => {
    expect(calculateTotal("100\n200\n300")).toBe(600);
  });

  it("handles decimal numbers", () => {
    expect(calculateTotal("10.5,20.3")).toBeCloseTo(30.8);
  });

  it("handles negative numbers", () => {
    expect(calculateTotal("100,-50,25")).toBe(75);
  });

  it("returns 0 when all inputs are invalid", () => {
    expect(calculateTotal("abc,xyz")).toBe(0);
  });

  it("handles mixed whitespace and separators", () => {
    expect(calculateTotal("  100 ,\n 200 , 300 ")).toBe(600);
  });
});
