
QUnit.test( "Test OP_1NEGATE, OP_TRUE, OP_NOP", function( assert ) {
    var testedCommands = {
        OP_1NEGATE: "-1",
        OP_TRUE: "1",
        OP_NOP: ""
    };

    for (var property in testedCommands) {
        // If the property is truly an OP name...
        if (testedCommands.hasOwnProperty(property)) {
            var command = property;
            var state = bitcoin_repl.State(command);
            state.eval();

            var result = state.toString().trim().replace(" ", "");
            var expectation = "(" + testedCommands[property] + ")";

            assert.equal(result, expectation, "Expected '" + command + "' to evaluate to '" + expectation + "'.");
        }
    }
});


QUnit.test( "Test OP_1-OP_16", function( assert ) {

    for (var i = 1; i <= 16; i++) {
        var command = "OP_" + i;
        var state = bitcoin_repl.State(command);
        state.eval();

        var result = state.toString().trim().replace(" ", "");
        var expectation = "(" + i + ")";

        assert.equal(result, expectation, "Expected '" + command + "' to evaluate to '" + expectation + "'.");
    }
});

QUnit.test( "Test OP_ADD", function( assert ) {

    for (var i = 1; i <= 16; i+=3) {
        for (var j = 1; j <= 16; j+=4) {
            var command = "OP_" + i + " OP_" + j + " OP_ADD";
            var state = bitcoin_repl.State(command);
            state.eval();

            var result = state.toString().trim().replace(" ", "");
            var expectation = "(" + (i + j) + ")";

            assert.equal(result, expectation, "Expected '" + command + "' to evaluate to '" + expectation + "'.");
        }
    }
});

QUnit.test( "Test OP_SUB", function( assert ) {

    for (var i = 1; i <= 16; i+=3) {
        for (var j = 1; j <= 16; j+=4) {
            var command = "OP_" + i + " OP_" + j + " OP_SUB";
            var state = bitcoin_repl.State(command);
            state.eval();

            var result = state.toString().trim().replace(" ", "");
            var expectation = "(" + (i - j) + ")";

            assert.equal(result, expectation, "Expected '" + command + "' to evaluate to '" + expectation + "'.");
        }
    }
});

QUnit.test( "Test OP_NEGATE", function( assert ) {

    for (var i = -100; i <= 100; i+=19) {
        var command = "( " + i +") OP_NEGATE";
        var state = bitcoin_repl.State(command);
        state.eval();

        var result = state.toString().trim().replace(" ", "");
        var expectation = "(" + (-1 * i) + ")";

        assert.equal(result, expectation, "Expected '" + command + "' to evaluate to '" + expectation + "'.");
    }
});

QUnit.test( "Test OP_ABS", function( assert ) {

    for (var i = -100; i <= 100; i+=19) {
        var command = "( " + i +") OP_ABS";
        var state = bitcoin_repl.State(command);
        state.eval();

        var result = state.toString().trim().replace(" ", "");
        var expectation = "(" + Math.abs(i) + ")";

        assert.equal(result, expectation, "Expected '" + command + "' to evaluate to '" + expectation + "'.");
    }
});

QUnit.test( "Test OP_EQUAL", function( assert ) {

    for (var i = -20; i <= 20; i+=10) {
        for (var j = -20; j <= 20; j+=10) {
            var command = "( " + i + " " + j + ") OP_EQUAL";
            var state = bitcoin_repl.State(command);
            state.eval();

            var result = state.toString().trim().replace(" ", "");
            var expectation = "(" + (i === j ? 1 : 0) + ")";

            assert.equal(result, expectation, "Expected '" + command + "' to evaluate to '" + expectation + "'.");
        }
    }
});

QUnit.test( "Test OP_1ADD", function( assert ) {

    for (var i = -100; i <= 100; i+=19) {
        var command = "( " + i +") OP_1ADD";
        var state = bitcoin_repl.State(command);
        state.eval();

        var result = state.toString().trim().replace(" ", "");
        var expectation = "(" + (i + 1) + ")";

        assert.equal(result, expectation, "Expected '" + command + "' to evaluate to '" + expectation + "'.");
    }
});

QUnit.test( "Test OP_1SUB", function( assert ) {

    for (var i = -100; i <= 100; i+=19) {
        var command = "( " + i +") OP_1SUB";
        var state = bitcoin_repl.State(command);
        state.eval();

        var result = state.toString().trim().replace(" ", "");
        var expectation = "(" + (i - 1) + ")";

        assert.equal(result, expectation, "Expected '" + command + "' to evaluate to '" + expectation + "'.");
    }
});

QUnit.test( "Test OP_NOT", function( assert ) {

    for (var i = -2; i <= 2; i++) {
        var command = "( " + i +") OP_NOT";
        var state = bitcoin_repl.State(command);
        state.eval();

        var result = state.toString().trim().replace(" ", "");

        var expectation = "(0)";
        if (i === 0) {
            expectation = "(1)";
        } else if (i === 1) {
            expectation = "(0)";
        }

        assert.equal(result, expectation, "Expected '" + command + "' to evaluate to '" + expectation + "'.");
    }
});