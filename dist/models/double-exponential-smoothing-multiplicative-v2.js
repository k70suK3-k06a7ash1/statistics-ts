// 改善された doubleExponentialSmoothingMultiplicative
export function doubleExponentialSmoothingMultiplicative(data, alpha, beta) {
    if (alpha <= 0 || alpha > 1 || beta <= 0 || beta > 1) {
        throw new Error("Alpha and Beta must be between 0 and 1.");
    }
    if (data.length < 2 || data.some(function (d) { return d <= 0; })) {
        throw new Error("Data must contain at least two positive data points for initialization.");
    }
    /**
     * Applies the double exponential smoothing multiplicative method to a time series data.
     *
     * @param {number[]} data - The time series data as an array of numbers.
     * @param {number} alpha - The smoothing factor for the level (0 < alpha <= 1).
     * @param {number} beta - The smoothing factor for the trend (0 < beta <= 1).
     * @returns {{ level: number[]; trend: number[]; smoothedData: number[]; forecast: (steps: number) => number[] }} - An object containing the level, trend, smoothed data, and a forecast function.
     *
     * @throws {Error} If alpha or beta are not between 0 and 1.
     * @throws {Error} If the data array contains less than two positive data points.
     *
     * Usage:
     * ```typescript
     * const data = [10, 12, 14, 18, 24, 30];
     * const alpha = 0.5;
     * const beta = 0.3;
     * const result = doubleExponentialSmoothingMultiplicative(data, alpha, beta);
     *
     * console.log(result.level);
     * console.log(result.trend);
     * console.log(result.smoothedData);
     *
     * const forecastValues = result.forecast(3);
     * console.log(forecastValues);
     * ```
     */
    var level = [data[0]];
    var trend = [data[1] / data[0]];
    var smoothedData = [data[0]];
    for (var i = 1; i < data.length; i++) {
        var currentLevel = alpha * data[i] + (1 - alpha) * level[i - 1] * trend[i - 1];
        var currentTrend = beta * (currentLevel / level[i - 1]) + (1 - beta) * trend[i - 1];
        level.push(currentLevel);
        trend.push(currentTrend);
        smoothedData.push(currentLevel * currentTrend);
    }
    var forecast = function (steps) {
        var lastLevel = level[level.length - 1];
        var lastTrend = trend[trend.length - 1];
        return Array.from({ length: steps }, function (_, i) { return lastLevel * Math.pow(lastTrend, (i + 1)); });
    };
    return { level: level, trend: trend, smoothedData: smoothedData, forecast: forecast };
}
