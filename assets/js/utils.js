/**
 *
 * @param arr
 * @param elm
 * @returns {*}
 */
function arrayIndexOf(arr, elm) {
    for (var i in arr) {
        if (arr[i] == elm) {
            return parseInt(i);
        }
    }

    return -1;
}

/**
 *Generate random number from min to max
 * @param min is minimum number.
 * @param max is maximum number.
 * @returns {*} random number.
 */
function randomNumber(max, min) {
    return Math.floor(Math.random() * max) + (min == undefined ? 0 : min);
}

/**
 * Generates random color.
 * @returns {{r: number, g: number, b: number}}
 */
function rgb() {
    return {
        r: randomNumber(256),
        g: randomNumber(256),
        b: randomNumber(256),
        // Override toString();
        toString: function () {
            return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
        }
    };
}

/**
 * Generates array of shakeColors.
 * @param count how many shakeColors generate.
 * @returns {Array} with shakeColors.
 */
function shakeColors(count) {
    var array = [];

    for (var i = 0; i < count; i++) {
        array.push(rgb());
    }

    return array;
}