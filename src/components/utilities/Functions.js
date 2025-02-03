Number.prototype.round = function (decimals = 2) {
    const value = Number(this);

    if (isNaN(value)) {
        return 0;
    }

    let formattedValue = parseFloat(value).toFixed(decimals);
    return formattedValue.toLocaleString('sk-SK');
};
