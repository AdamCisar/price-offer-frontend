Number.prototype.round = function (decimals = 2) {
    const value = Number(this);

    if (isNaN(value)) {
        return 0;
    }

    const factor = Math.pow(10, decimals);
    const rounded = Math.round(value * factor) / factor;

    return rounded.toLocaleString('sk-SK', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
};