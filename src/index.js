module.exports = function check(str, bracketsConfig) {
    const bracketsMap = new Map(bracketsConfig);
    let openedBrackets = [];
    let closedBrackets = [];
    function popFromArrays() {
        openedBrackets.pop();
        closedBrackets.pop();
    }
    function pushToArrays(openedBracket, closedBracket) {
        openedBrackets.push(openedBracket);
        closedBrackets.push(closedBracket);
    }

    for (let symbol of str) {
        closedBracket = bracketsMap.get(symbol);
        if (
            closedBrackets.length &&
            symbol === closedBrackets[closedBrackets.length - 1]
        ) {
            popFromArrays();
            continue;
        }
        const openBracket = bracketsMap.has(symbol);
        if (openBracket) {
            pushToArrays(symbol, closedBracket);
        } else {
            if (symbol === closedBrackets[closedBrackets.length - 1]) {
                popFromArrays();
            } else {
                return false;
            }
        }
    }
    return !openedBrackets.length && !closedBrackets.length;
};
