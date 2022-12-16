import { assert, describe, expect, it } from "vitest";
import { outputTargetData } from "./parseData";
describe("suite name", () => {

  const originData = {
    g: '很简单',
    a: {
      b: {
        h: true,
        c: {
          d: 1
        }
      },
      e: ['name', 'age', 'password', {
        f: '找得到我吗？'
      }]
    }
  }

  it("output target data", () => {
    const output = outputTargetData(originData, "b");
    assert.equal(output[0], "找得到我吗？");
  });

});
