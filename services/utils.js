function getFirstWord(str) {
    let spacePosition = str.indexOf(' ');
    if (spacePosition === -1)
        return str;
    else
        return str.substr(0, spacePosition);
};

function getCommand(text) {
    return getFirstWord(text).toLowerCase();
}

function getSearchTerm(text, command) {
    return text.substring(command.length).trimLeft();
}

function escapeSymbols(text) {
    if (typeof text === "undefined") return text;
    return text
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');    
}