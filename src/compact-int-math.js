bitcoin_repl.math = (function() {

    var negate = function(hexString) {
        var result, isZero;

        isZero = /^[x0]+$/.test(hexString);

        if (isZero) {
            result = hexString;
        } else {
            result = hexString ^ signMask(hexString);
        }

        return intToHex(result);
    };

    var applyPrefix = function(hexString) {
        return "0x" + hexString;
    };

    var signMask = function(hexString) {
        return "0x" + "8" + new Array(hexString.length - 2).join("0");
    };

    var isNegative = function(hexString) {
        return (hexString & signMask(hexString)) > 0;
    };

    var intToHex = function (int) {
        var hexString;

        hexString = Math.abs(int).toString(16);

        if (hexString.length % 2 !== 0) {
            hexString = "0" + hexString;
        }

        hexString = applyPrefix(hexString);

        if (int < 0) {
            hexString = negate(hexString);
        }

        return hexString;
    };

    var hexToInt = function (hexString) {
        var int;

        if (isNegative(hexString)) {
            hexString = negate(hexString);

            int = parseInt(hexString, 16);
            int *= -1;
        } else {
            int = parseInt(hexString, 16);
        }

        return int;
    };

    var sum = function(operands) {
        var sum, i;

        sum = 0;
        for (i = 0; i < operands.length; i++) {
            console.log(hexToInt(operands[i]));
            sum += hexToInt(operands[i]);
        }
        console.log(sum);
        return intToHex(sum);
    };

    var abs = function(hexString) {
        return isNegative(hexString) ? negate(hexString) : hexString;
    };

    var bool = function(hexString) {
        return hexToInt(hexString) === 0;
    };

    return {
        negate: negate,
        intToHex: intToHex,
        sum: sum,
        abs: abs,
        bool: bool
    };

})();