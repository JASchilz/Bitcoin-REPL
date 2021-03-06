bitcoin_repl.interpreter = (function() {

    var encodeNum = function(text) {
        var hex;

        if (bitcoin_repl.math.isBytes(text)) {
            hex = text.substring(2);
        } else {
            throw "Invalid bytes '" + text + "' found on stack";
        }
        return CryptoJS.enc.Hex.parse(hex)
    };

    var op_defs = {
        constants: {
            NUM_INPUTS: 0,
            NUM_OUTPUTS: 1,
            IS_ENABLED: 2,
            IS_IMPLEMENTED: 3,
            CLOSURE: 4
        },
        OP_0: [             0,  1, true, true, function() { return ["0x"]; }],
        OP_FALSE: [         0,  1, true, true, function() { return ["0x"]; }],
        OP_PUSHDATA1: [     0,  1, true, false, function() { return [0]; }],
        OP_PUSHDATA2: [     0,  1, true, false, function() { return [0]; }],
        OP_PUSHDATA4: [     0,  1, true, false, function() { return [0]; }],
        OP_1NEGATE: [       0,  1, true, true, function() { return ["0x81"]; }],
        OP_TRUE: [          0,  1, true, true, function() { return ["0x01"]; }],
        OP_1: [             0,  1, true, true, function() { return ["0x01"]; }],
        OP_2: [             0,  1, true, true, function() { return ["0x02"]; }],
        OP_3: [             0,  1, true, true, function() { return ["0x03"]; }],
        OP_4: [             0,  1, true, true, function() { return ["0x04"]; }],
        OP_5: [             0,  1, true, true, function() { return ["0x05"]; }],
        OP_6: [             0,  1, true, true, function() { return ["0x06"]; }],
        OP_7: [             0,  1, true, true, function() { return ["0x07"]; }],
        OP_8: [             0,  1, true, true, function() { return ["0x08"]; }],
        OP_9: [             0,  1, true, true, function() { return ["0x09"]; }],
        OP_10: [            0,  1, true, true, function() { return ["0x0a"]; }],
        OP_11: [            0,  1, true, true, function() { return ["0x0b"]; }],
        OP_12: [            0,  1, true, true, function() { return ["0x0c"]; }],
        OP_13: [            0,  1, true, true, function() { return ["0x0d"]; }],
        OP_14: [            0,  1, true, true, function() { return ["0x0e"]; }],
        OP_15: [            0,  1, true, true, function() { return ["0x0f"]; }],
        OP_16: [            0,  1, true, true, function() { return ["0x10"]; }],
        OP_NOP: [           0,  0, true, true, function() { return []; }],
        OP_IF: [            0,  0, true, false, function() { return []; }],
        OP_NOTIF: [         0,  0, true, false, function() { return []; }],
        OP_ELSE: [          0,  0, true, false, function() { return []; }],
        OP_ENDIF: [         0,  0, true, false, function() { return []; }],
        OP_VERIFY: [        0,  0, true, false, function() { return []; }],
        OP_RETURN: [        0,  0, true, false, function() { return []; }],
        OP_TOALTSTACK: [    0,  0, true, false, function() { return []; }],
        OP_FROMALTSTACK: [  0,  0, true, false, function() { return []; }],
        OP_IFDUP: [         1,  2, true, true, function(args) { return math.bool(args[0]) == "0x01" ? [args[0], args[0]] : [args[0]]; }],
        OP_DEPTH: [         0,  0, true, false, function() { return []; }],
        OP_DROP: [          1,  0, true, true, function(args) { return []; }],
        OP_DUP: [           1,  2, true, true, function(args) { return [ args[0], args[0] ]; }],
        OP_NIP: [           2,  1, true, true, function(args) { return [ args[1] ]; }],
        OP_OVER: [          2,  3, true, true, function(args) { return [ args[0], args[1], args[0] ]; }],
        OP_PICK: [          0,  0, true, false, function() { return []; }],
        OP_ROLL: [          0,  0, true, false, function() { return []; }],
        OP_ROT: [           3,  3, true, true, function(args) { return [ args[1], args[2], args[0] ]; }],
        OP_SWAP: [          2,  2, true, true, function(args) { return [ args[1], args[0] ]; }],
        OP_TUCK: [          2,  3, true, true, function(args) { return [ args[1], args[0], args[1] ]; }],
        OP_2DROP: [         2,  0, true, true, function(args) { return []; }],
        OP_2DUP: [          2,  4, true, true, function(args) { return [ args[0], args[1], args[0], args[1] ]; }],
        OP_3DUP: [          3,  6, true, true, function(args) { return [ args[0], args[1], args[2], args[0], args[1], args[2] ]; }],
        OP_2OVER: [         4,  6, true, true, function(args) { return [ args[0], args[1], args[2], args[3], args[0], args[1] ]; }],
        OP_2ROT: [          6,  6, true, true, function(args) { return [ args[2], args[3], args[4], args[5], args[0], args[1] ]; }],
        OP_2SWAP: [         4,  4, true, true, function(args) { return [ args[2], args[3], args[0], args[1] ]; }],
        OP_CAT: [           0,  0, false, false, function() { return []; }],
        OP_SUBSTR: [        0,  0, false, false, function() { return []; }],
        OP_LEFT: [          0,  0, false, false, function() { return []; }],
        OP_RIGHT: [         0,  0, false, false, function() { return []; }],
        OP_SIZE: [          0,  0, true, false, function() { return []; }],
        OP_INVERT: [        0,  0, false, false, function() { return []; }],
        OP_AND: [           0,  0, false, false, function() { return []; }],
        OP_OR: [            0,  0, false, false, function() { return []; }],
        OP_XOR: [           0,  0, false, false, function() { return []; }],
        OP_EQUAL: [         2,  1, true, true, function(args) { return args[0] === args[1] ? ["0x01"] : ["0x00"]; }],
        OP_EQUALVERIFY: [   0,  0, true, false, function() { return []; }],
        OP_1ADD: [          1,  1, true, true, function(args) { return [math.sum([args[0], "0x01"])]; }],
        OP_1SUB: [          1,  1, true, true, function(args) { return [math.sum([args[0], "0x81"])]; }],
        OP_2MUL: [          0,  0, false, false, function() { return []; }],
        OP_2DIV: [          0,  0, false, false, function() { return []; }],
        OP_NEGATE: [        1,  1, true, true, function(args) { return [ math.negate(args[0]) ]; }],
        OP_ABS: [           1,  1, true, true, function(args) { return [ math.abs(args[0])]; }],
        OP_NOT: [           1,  1, true, true, function(args) { return [ math.not(args[0]) ]; }],
        OP_0NOTEQUAL: [     1,  1, true, true, function(args) { return [ math.bool(args[0]) ]; }],
        OP_ADD: [           2,  1, true, true, function(args) {return [math.sum([args[0], args[1]])];}],
        OP_SUB: [           2,  1, true, true, function(args) {return [math.sum([args[0], math.negate(args[1])])];}],
        OP_MUL: [           0,  0, false, false, function() { return []; }],
        OP_DIV: [           0,  0, false, false, function() { return []; }],
        OP_MOD: [           0,  0, false, false, function() { return []; }],
        OP_LSHIFT: [        0,  0, false, false, function() { return []; }],
        OP_RSHIFT: [        0,  0, false, false, function() { return []; }],
        OP_BOOLAND: [       0,  0, true, false, function() { return []; }],
        OP_BOOLOR: [        0,  0, true, false, function() { return []; }],
        OP_NUMEQUAL: [      0,  0, true, false, function() { return []; }],
        OP_NUMEQUALVERIFY: [0,  0, true, false, function() { return []; }],
        OP_NUMNOTEQUAL: [   0,  0, true, false, function() { return []; }],
        OP_LESSTHAN: [      0,  0, true, false, function() { return []; }],
        OP_GREATERTHAN: [   0,  0, true, false, function() { return []; }],
        OP_LESSTHANOREQUAL: [   0,  0, true, false, function() { return []; }],
        OP_GREATERTHANOREQUAL: [0,  0, true, false, function() { return []; }],
        OP_MIN: [           0,  0, true, false, function() { return []; }],
        OP_MAX: [           0,  0, true, false, function() { return []; }],
        OP_WITHIN: [        0,  0, true, false, function() { return []; }],
        OP_RIPEMD160: [     1,  1, true, true, function(args) { return [ "0x" + CryptoJS.RIPEMD160(encodeNum(args[0])) ]; }],
        OP_SHA1: [          1,  1, true, true, function(args) { return [ "0x" + CryptoJS.SHA1(encodeNum(args[0])) ]; }],
        OP_SHA256: [        1,  1, true, true, function(args) { return [ "0x" + CryptoJS.SHA256(encodeNum(args[0])) ]; }],
        OP_HASH160: [       1,  1, true, true, function(args) { return [ "0x" + CryptoJS.RIPEMD160(CryptoJS.SHA256(encodeNum(args[0]))) ]; }],
        OP_HASH256: [       1,  1, true, true, function(args) { return [ "0x" + CryptoJS.SHA256(CryptoJS.SHA256(encodeNum(args[0]))) ]; }],
        OP_CODESEPARATOR: [ 1,  1, true, false, function(args) { return []; }],
        OP_CHECKSIG: [      1,  1, true, false, function(args) { return []; }],
        OP_CHECKSIGVERIFY: [1,  1, true, false, function(args) { return []; }],
        OP_CHECKMULTISIG: [ 1,  1, true, false, function(args) { return []; }],
        OP_CHECKMULTISIGVERIFY: [ 1,  1, true, false, function(args) { return []; }]
    };

    /* script */
    var script = function(text) {

        var ops = [];
        if (text !== "") {
            ops = text.split(" ");
        }

        function verify(ops) {

            for (var i = 0; i < ops.length; i++) {
                if (!op_defs.hasOwnProperty(ops[i])) {
                    throw "Unrecognized operation " + ops[i];
                }

                if (!op_defs[ops[i]][op_defs.constants.IS_ENABLED]) {
                    throw "The operation " + ops[i] + " is described as 'disabled' in the script spec and not " +
                    "available in Bitcoin-REPL.";
                }

                if (!op_defs[ops[i]][op_defs.constants.IS_IMPLEMENTED]) {
                    throw "The operation " + ops[i] + " is recognized as a valid operation, however it is not " +
                    "yet implemented in Bitcoin-REPL.";
                }
            }

        }

        verify(ops);

        function pop() {
            return ops.shift();
        }

        function toString() {
            return ops.join(" ")
        }

        return {
            pop: pop,
            toString: toString,
            isEmpty: function() { return ops.length <= 0; }
        }
    };

    return {
        op_defs: op_defs,
        script: script
    };

})();