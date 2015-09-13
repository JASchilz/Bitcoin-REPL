bitcoin_repl.commands = (function() {

    var command_defs = {
        help: function(args) {
            return bitcoin_repl.constants.help;
        },
        about: function(args) {
            return bitcoin_repl.constants.about;
        },
        operations: function(args) {
            var valid_and_implemented = [];
            var valid_and_not_implemented = [];
            var disabled = [];

            var op_defs = bitcoin_repl.op_defs;

            // Iterate over the properties (usually an OP name) of op_defs...
            for (var property in op_defs) {
                // If the property is truly an OP name...
                if (op_defs.hasOwnProperty(property)) {

                    if (!op_defs[property][bitcoin_repl.IS_ENABLED]) {
                        disabled.push(property);
                    } else if (!op_defs[property][bitcoin_repl.IS_IMPLEMENTED]) {
                        valid_and_not_implemented.push(property);
                    } else {
                        valid_and_implemented.push(property);
                    }

                }
            }

            return  "Valid, implemented operations: \n" +
                    valid_and_implemented.join(", ") + "\n\n" +
                    "Valid operations which are not yet implemented in BITCOIN-REPL: \n" +
                    valid_and_not_implemented.join(", ") + "\n\n" +
                    "Operations described as 'disabled' in the Script spec: \n" +
                    disabled.join(", ") + "\n";
        }
    };

    function doCommand(command) {
        var command_split = command.split(" ");
        var base_command = command_split.shift().replace(":", "");

        if (!command_defs.hasOwnProperty(base_command)) {
            throw "Unrecognized command " + base_command;
        }

        return command_defs[base_command](command_split);
    }

    return {
        doCommand: doCommand
    }
})();