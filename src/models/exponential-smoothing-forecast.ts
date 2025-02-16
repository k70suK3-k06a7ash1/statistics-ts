/**
 * 指数平滑法を使用して将来を予測する (シンプルなバージョン)
 * @param data 時系列データ (数値の配列)
 * @param forecastHorizon 予測期間 (未来の時点数)
 * @param smoothingLevel 平滑化係数 (0 < alpha < 1)
 * @returns 予測値の配列
 */
export function exponentialSmoothingForecast(
	data: number[],
	forecastHorizon: number,
	smoothingLevel = 0.2, // デフォルト値
): number[] {
	if (smoothingLevel <= 0 || smoothingLevel >= 1) {
		throw new Error("平滑化係数は 0 より大きく 1 より小さい必要があります。");
	}

	let lastLevel = data[0]; //初期値
	if (data.length > 1) {
		lastLevel = data
			.slice(0)
			.reduce(
				(prevLevel, currentVal) =>
					smoothingLevel * currentVal + (1 - smoothingLevel) * prevLevel,
				0,
			);
	}

	const forecast: number[] = [];
	let currentForecast = lastLevel;

	for (let i = 0; i < forecastHorizon; i++) {
		forecast.push(currentForecast);
		currentForecast =
			smoothingLevel * currentForecast + (1 - smoothingLevel) * currentForecast; // 同じ値を予測
	}

	return forecast;
}
