var constants = {

    greetings: '' +
    '   _______   __    __                          __                    _______   ________  _______   __        \n' +
    '  /       \\ /  |  /  |                        /  |                  /       \\ /        |/       \\ /  |       \n' +
    '  $$$$$$$  |$$/  _$$ |_     _______   ______  $$/  _______          $$$$$$$  |$$$$$$$$/ $$$$$$$  |$$ |       \n' +
    '  $$ |__$$ |/  |/ $$   |   /       | /      \\ /  |/       \\  ______ $$ |__$$ |$$ |__    $$ |__$$ |$$ |       \n' +
    '  $$    $$< $$ |$$$$$$/   /$$$$$$$/ /$$$$$$  |$$ |$$$$$$$  |/      |$$    $$< $$    |   $$    $$/ $$ |       \n' +
    '  $$$$$$$  |$$ |  $$ | __ $$ |      $$ |  $$ |$$ |$$ |  $$ |$$$$$$/ $$$$$$$  |$$$$$/    $$$$$$$/  $$ |       \n' +
    '  $$ |__$$ |$$ |  $$ |/  |$$ \\_____ $$ \\__$$ |$$ |$$ |  $$ |        $$ |  $$ |$$ |_____ $$ |      $$ |_____  \n' +
    '  $$    $$/ $$ |  $$  $$/ $$       |$$    $$/ $$ |$$ |  $$ |        $$ |  $$ |$$       |$$ |      $$       | \n' +
    '  $$$$$$$/  $$/    $$$$/   $$$$$$$/  $$$$$$/  $$/ $$/   $$/         $$/   $$/ $$$$$$$$/ $$/       $$$$$$$$/  \n' +
    '\n',

    motd: '' +
    '              MOTD: \n' +
    '              Welcome to Bitcoin REPL. Do NOT use this program to generate live txs: it is not bug-for-bug\n' +
    '              compatible with bitcoin-core. Nor are all operations yet implemented. Try typing ":help" or \n' +
    '              ":operations".\n\n',

    help: '' +
    'For more information about the Bitcoin Script language, visit https://en.bitcoin.it/wiki/Script. \n\n' +
    'To begin, type a set of commands at the terminal prompt. For example: \n' +
    '    >>> OP_1 OP_2 OP_ADD \n' +
    'is a valid script. Pressing "enter" to evaluate the script yields:\n' +
    '    ( 3)\n\n' +
    'Elements in parentheses represent stack contents, with the stack head on the right. \n\n' +
    'You may also press "shift:enter" to evaluate a single step in the script.\n',

    about: '' +
    'The home of Bitcoin-REPL is https://github.com/JASchilz/Bitcoin-REPL. \n\n' +
    'Terminal is provided by http://terminal.jcubic.pl/'

};