module.exports = function check(str, bracketsConfig) {
  // let's assume that str is valid and has only brackets from bracketsConfig

  if (str.length % 2) {
    return false;
  }

  const brackets = {};
  bracketsConfig.map(([left, right]) => (brackets[left] = right));

  // stack of left brackets
  let stack = [];

  const isEmptyStack = stack => stack.length === 0;
  const isMonoBracket = bracket => brackets[bracket] === bracket;
  const isBracketsPair = (left, right) => brackets[left] === right;
  const isLeftBracket = (bracket, stack) => {
    if (!isMonoBracket(bracket)) {
      return bracket in brackets;
    } else {
      return isEmptyStack(bracket) || !isBracketsPair(stack[stack.length - 1], bracket);
    }
  };

  for (const bracket of str) {
    if (isLeftBracket(bracket, stack)) {
      stack.push(bracket);
    } else {
      if (isEmptyStack(stack)) {
        return false;
      }
      const lastLeftBracket = stack.pop();
      if (!isBracketsPair(lastLeftBracket, bracket)) {
        return false;
      }
    }
  }
  if (!isEmptyStack(stack)) {
    return false;
  }
  return true;
};
