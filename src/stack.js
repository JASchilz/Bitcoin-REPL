bitcoin_repl.stack = function(text) {

    var tokens = [];

    if (text !== "") {
        tokens = text.trim().split(" ").map(function (token) {
            return bitcoin_repl.math.isBytes(token) ? token : parseInt(token, 10);
        });
    }

    function push(newElements) {
        tokens = tokens.concat(newElements);
    }

    function pop(num) {
        var ret = tokens.slice(tokens.length - num);
        tokens = tokens.slice(0, tokens.length - num);

        return ret;
    }

    function toString() {
        return "(" + tokens.join(" ") + ")";
    }

    return {
        push: push,
        pop: pop,
        toString: toString
    }
};