bitcoin_repl.state = function(text) {

    var scriptText, stackText;

    if (text.indexOf(")") !== -1) {
        text = text.split(")");

        stackText = text[0].replace("(", "");
        scriptText = text[1].trim();
    } else {
        stackText = "";
        scriptText = text.trim();
    }

    var thisScript = bitcoin_repl.interpreter.script(scriptText);
    var thisStack = bitcoin_repl.stack(stackText);

    function eval() {
        while (!thisScript.isEmpty()) {
            step();
        }
    }

    function step() {
        if (!thisScript.isEmpty()) {
            var op = bitcoin_repl.interpreter.op_defs[thisScript.pop()];

            var closure = op[bitcoin_repl.interpreter.op_defs.constants.CLOSURE];
            var args = thisStack.pop(op[bitcoin_repl.interpreter.op_defs.constants.NUM_INPUTS]);

            var outputs = closure(args);

            thisStack.push(outputs);
        }
    }

    function toString() {
        return thisStack.toString() + " " + thisScript.toString();
    }

    return {
        step: step,
        eval: eval,
        toString: toString
    }


};