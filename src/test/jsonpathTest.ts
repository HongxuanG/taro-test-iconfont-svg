const jp = require('jsonpath')

const cities = {
  g: "很简单",
  a: {
    b: {
      h: true,
      c: {
        d: 1
      }
    },
    e: [
      "name",
      "age",
      "password",
      {
        f: "找得到我吗？"
      }
    ]
  }
};

const names = jp.query(cities, "$..e");

console.log(names);
