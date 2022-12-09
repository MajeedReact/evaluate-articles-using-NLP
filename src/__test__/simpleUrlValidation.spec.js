import { simpleUrlValidation } from "../client/js/simpleUrlValidation";

describe("Testing the simpleUrlValidation functionality", () => {
  test("Testing whether simpleUrlValidation function exist or not", () => {
    expect(simpleUrlValidation).toBeDefined();
  });
  test("Testing the simpleUrlValidation function", () => {
    //passing invalid url
    let valid = simpleUrlValidation("google");
    //function should return false
    expect(valid).toBeFalsy();
  });
});
