Number.prototype.round = function (decimals = 2) {
    const value = Number(this);

    if (isNaN(value) || isNaN(decimals)) {
        throw new TypeError('Invalid input: both value and decimals must be numbers.');
        return;
    }

    let formattedValue = value.toFixed(decimals);
    return formattedValue.toLocaleString('sk-SK');
};
