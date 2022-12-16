type ParseResult = any;

enum State {
  INITIAL = 1,
  KEY_OPEN = 2,
  KEY_END = 3,
  KEY = 4,
  VALUE = 5,
  VALUE_OPEN = 6,
  VALUE_END = 7
}

function isAlpha(char: string) {
  return /[0-9a-zA-Z+-,.$]*/.test(char);
}

export function outputTargetData(
  originData: Record<string, any>,
  key: string
): ParseResult {
  let stringifyJSON = JSON.stringify(originData);
  // 全局匹配   value不是嵌套形式的话，这个正则匹配就算成功了，但是万一是b: {a:{c:{d:1}}} 这种就貌似没办法了
  const reg = new RegExp(
    '"' + key + '":("([^""]+)"|[[^[]+]|{[^{]+}|true|false|[0-9a-zA-Z+-,.$]*)',
    "g"
  );
  const matchedResult = stringifyJSON.match(reg);
  const final = matchedResult?.map(
    item => item.replace(new RegExp(`"${key}":`), "").slice(1, -1) // 去除 前后的"  "
  );
  // 有限自动机  vue3 编译篇
  const valueStack: string[] = [];
  const keyStack: string[] = [];

  let isTarget = false;
  let isKeyState = false;

  let currentState: State = State.INITIAL;
  while (stringifyJSON) {
    const char = stringifyJSON[0];
    switch (currentState) {
      case State.INITIAL:
        if (char === '"') {
          currentState = State.KEY_OPEN;
          stringifyJSON = stringifyJSON.slice(1);
        } else if (char === "[" || char === "{") {
          isKeyState = false;
          currentState = State.VALUE_OPEN;
          valueStack.push(char);
          stringifyJSON = stringifyJSON.slice(1);
        }
        break;
      case State.KEY_OPEN:
        currentState = State.KEY;
        keyStack.push(char);
        stringifyJSON = stringifyJSON.slice(1);
        break;
      case State.VALUE_OPEN:
        currentState = State.VALUE;
        valueStack.push(char);
        stringifyJSON = stringifyJSON.slice(1);
        break;
      case State.KEY:
        if (isAlpha(char)) {
          keyStack.push(char);
          stringifyJSON = stringifyJSON.slice(1);
        } else if (char === '"') {
          currentState = State.KEY_END;
          if (key === keyStack.join("")) {
            isTarget = true; // 找到对应的key
          }
          keyStack.length = 0;
          stringifyJSON = stringifyJSON.slice(1);
        }
        break;
      case State.VALUE:
        // if (isAlpha(char)) {
        //   if(isTarget){
        //     valueStack.push(char);
        //   }
        //   stringifyJSON = stringifyJSON.slice(1);
        // }else if(){
        //     valueStack.push(char)
        // }
        break;
      case State.KEY_END:
        if (char === ":" || char === ",") {
          currentState = State.INITIAL;
          stringifyJSON = stringifyJSON.slice(1);
        } else if (char === "]" || char === "}") {
          stringifyJSON = stringifyJSON.slice(1);
        }
        break;
    }
  }
  console.log(stringifyJSON);
  console.log(matchedResult);
  console.log(final);
  return final;
}

// 对称性
function isSymmetry(str: string) {
  let stack: string[] = [];
  let flag = true
  while (str) {
    let char = str[0];
    switch (char) {
      case "{":
        stack.push("{");
        str = str.slice(1);
        break;
      case "[":
        stack.push("[");
        str = str.slice(1);
        break;
      case "]":
        if (!stack.pop()) {
          flag = false;
        }
        str = str.slice(1);
        break;
      case "}":
        if (!stack.pop()) {
          flag = false;
        }
        str = str.slice(1);
        break;
      default:
        str = str.slice(1);
        break;
    }
  }
  console.log("stack===>", JSON.stringify(stack));
  if (stack.length !== 0) {
    flag = false
  }
  return flag
}
console.log(isSymmetry(
  '{g:"很简单","a":{"b":{"h":true,"c":{"d":1}},"e":["name","age","password",{"f":"找得到我吗？"}]}}'
));
