var intToHex = function(num) {

    var hex;

    hex = parseInt(num).toString(16);

    if (hex.length % 2 !== 0) {
        hex = "0" + hex;
    }

    return "0x" + hex;
};

var math = bitcoin_repl.math;


QUnit.test( "Test OP_1NEGATE, OP_TRUE, OP_NOP", function( assert ) {
    var testedCommands = {
        OP_1NEGATE: "0x81",
        OP_TRUE: "0x01",
        OP_NOP: ""
    };

    for (var property in testedCommands) {
        // If the property is truly an OP name...
        if (testedCommands.hasOwnProperty(property)) {
            var command = property;
            var state = bitcoin_repl.state(command);
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
        var state = bitcoin_repl.state(command);
        state.eval();

        var result = state.toString().trim().replace(" ", "");
        var expectation = "(" + intToHex(i) + ")";

        assert.equal(result, expectation, "Expected '" + command + "' to evaluate to '" + expectation + "'.");
    }
});

QUnit.test( "Test OP_ADD", function( assert ) {

    for (var i = 1; i <= 16; i+=3) {
        for (var j = 1; j <= 16; j+=4) {
            var command = "OP_" + i + " OP_" + j + " OP_ADD";
            var state = bitcoin_repl.state(command);
            state.eval();

            var result = state.toString().trim().replace(" ", "");
            var expectation = "(" + intToHex(i + j) + ")";

            assert.equal(result, expectation, "Expected '" + command + "' to evaluate to '" + expectation + "'.");
        }
    }
});

QUnit.test( "Test OP_SUB", function( assert ) {

    for (var i = 1; i <= 16; i+=3) {
        for (var j = 1; j <= 16; j+=4) {
            var command = "OP_" + i + " OP_" + j + " OP_SUB";
            var state = bitcoin_repl.state(command);
            state.eval();

            var result = state.toString().trim().replace(" ", "");
            var expectation = "(" + math.intToHex(i - j) + ")";

            assert.equal(result, expectation, "Expected '" + command + "' to evaluate to '" + expectation + "'.");
        }
    }
});

QUnit.test( "Test OP_NEGATE", function( assert ) {

    for (var i = -100; i <= 100; i+=19) {
        var command = "( " + math.intToHex(i) +") OP_NEGATE";
        var state = bitcoin_repl.state(command);
        state.eval();

        var result = state.toString().trim().replace(" ", "");
        var expectation = "(" + math.intToHex(-1 * i) + ")";

        assert.equal(result, expectation, "Expected '" + command + "' to evaluate to '" + expectation + "'.");
    }
});

QUnit.test( "Test OP_ABS", function( assert ) {

    for (var i = -100; i <= 100; i+=19) {
        var command = "( " + math.intToHex(i) +") OP_ABS";
        var state = bitcoin_repl.state(command);
        state.eval();

        var result = state.toString().trim().replace(" ", "");
        var expectation = "(" + math.intToHex(Math.abs(i)) + ")";

        assert.equal(result, expectation, "Expected '" + command + "' to evaluate to '" + expectation + "'.");
    }
});

QUnit.test( "Test OP_EQUAL", function( assert ) {

    for (var i = -20; i <= 20; i+=10) {
        for (var j = -20; j <= 20; j+=10) {
            var command = "( " + i + " " + j + ") OP_EQUAL";
            var state = bitcoin_repl.state(command);
            state.eval();

            var result = state.toString().trim().replace(" ", "");
            var expectation = "(" + (i === j ? "0x01" : "0x00") + ")";

            assert.equal(result, expectation, "Expected '" + command + "' to evaluate to '" + expectation + "'.");
        }
    }
});

QUnit.test( "Test OP_1ADD", function( assert ) {

    for (var i = -100; i <= 100; i+=19) {
        var command = "( " + math.intToHex(i) +") OP_1ADD";
        var state = bitcoin_repl.state(command);
        state.eval();

        var result = state.toString().trim().replace(" ", "");
        var expectation = "(" + math.intToHex(i + 1) + ")";

        assert.equal(result, expectation, "Expected '" + command + "' to evaluate to '" + expectation + "'.");
    }
});

QUnit.test( "Test OP_1SUB", function( assert ) {

    for (var i = -100; i <= 100; i+=19) {
        var command = "( " + math.intToHex(i) +") OP_1SUB";
        var state = bitcoin_repl.state(command);
        state.eval();

        var result = state.toString().trim().replace(" ", "");
        var expectation = "(" + math.intToHex(i - 1) + ")";

        assert.equal(result, expectation, "Expected '" + command + "' to evaluate to '" + expectation + "'.");
    }
});

QUnit.test( "Test OP_NOT", function( assert ) {
    for (var i = -2; i <= 2; i++) {
        var command = "( " + math.intToHex(i) +") OP_NOT";
        var state = bitcoin_repl.state(command);
        state.eval();

        var result = state.toString().trim().replace(" ", "");

        var expectation = "(0x00)";
        if (i === 0) {
            expectation = "(0x01)";
        } else if (i === 1) {
            expectation = "(0x00)";
        }

        assert.equal(result, expectation, "Expected '" + command + "' to evaluate to '" + expectation + "'.");
    }
});

QUnit.test( "Test OP_0NOTEQUAL", function( assert ) {
    for (var i = -2; i <= 2; i++) {
        var command = "( " + math.intToHex(i) +") OP_0NOTEQUAL";
        var state = bitcoin_repl.state(command);
        state.eval();

        var result = state.toString().trim().replace(" ", "");

        var expectation = "(0x01)";
        if (i === 0) {
            expectation = "(0x00)";
        }

        assert.equal(result, expectation, "Expected '" + command + "' to evaluate to '" + expectation + "'.");
    }
});

QUnit.test( "Test OP_SHA256", function( assert ) {
    var testedCommands = {
        "OP_1 OP_SHA256": "0x4bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459a",
        "OP_1 OP_SHA256 OP_SHA256": "0x9c12cfdc04c74584d787ac3d23772132c18524bc7ab28dec4219b8fc5b425f70",
        "OP_16 OP_SHA256": "0xc555eab45d08845ae9f10d452a99bfcb06f74a50b988fe7e48dd323789b88ee3",
        "OP_16 OP_SHA256 OP_SHA256": "0x1405870ede7c8bede02298a878e66eba9e764a1ba55ca16173f7df470fb4089d"
    };

    for (var property in testedCommands) {
        // If the property is truly an OP name...
        if (testedCommands.hasOwnProperty(property)) {
            var command = property;
            var state = bitcoin_repl.state(command);
            state.eval();

            var result = state.toString().trim().replace(" ", "");
            var expectation = "(" + testedCommands[property] + ")";

            assert.equal(result, expectation, "Expected '" + command + "' to evaluate to '" + expectation + "'.");
        }
    }
});

QUnit.test( "Test OP_SHA1", function( assert ) {
    var testedCommands = {
        "OP_1 OP_SHA1": "0xbf8b4530d8d246dd74ac53a13471bba17941dff7",
        "OP_1 OP_SHA1 OP_SHA1": "0x0a2b2a825165ae9742c63b0c6ddafc22f0bd3b1e",
        "OP_16 OP_SHA1": "0x6e14a407faae939957b80e641a836735bbdcad5a",
        "OP_16 OP_SHA1 OP_SHA1": "0x852627551364cf8b374507d5a63093a0cb26fb6b"
    };

    for (var property in testedCommands) {
        // If the property is truly an OP name...
        if (testedCommands.hasOwnProperty(property)) {
            var command = property;
            var state = bitcoin_repl.state(command);
            state.eval();

            var result = state.toString().trim().replace(" ", "");
            var expectation = "(" + testedCommands[property] + ")";

            assert.equal(result, expectation, "Expected '" + command + "' to evaluate to '" + expectation + "'.");
        }
    }
});
