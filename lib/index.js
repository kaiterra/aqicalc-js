"use strict";
exports.__esModule = true;
var d3Scale = require("d3-scale");
var IAQI_SCALE = [0, 50, 100, 150, 200, 300, 500];
var SO2_SCALE = {
    CN: [0, 50, 150, 475, 800, 1600, 2620],
    US: [0, 35, 75, 185, 304, 604, 1004]
};
var NO2_SCALE = {
    CN: [0, 40, 80, 180, 280, 565, 940],
    US: [0, 99.64, 188, 676.8, 1220, 2350, 3850]
};
var PM10_SCALE = {
    CN: [0, 50, 150, 250, 350, 420, 600],
    US: [0, 54, 154, 254, 354, 424, 600]
};
var CO_SCALE = {
    CN: [0, 2, 4, 14, 24, 36, 60],
    US: [0, 5.038, 10.763, 14.198, 17.633, 34.35, 57.708]
};
var CO2_SCALE = {
    CN: [400, 1000, 1500, 2000, 2500, 5000, 10000],
    US: [400, 1000, 1500, 2000, 2500, 5000, 10000]
};
var O3_SCALE = {
    CN: [0, 160, 200, 300, 400, 800, 1200],
    US: [0, 160, 250, 328, 408, 808, 1208]
};
var PM25_SCALE = {
    CN: [0, 35, 75, 115, 150, 250, 500],
    US: [0, 12, 34.5, 55.4, 150.4, 250.4, 500.4]
};
var TVOC_SCALE = {
    CN: [125, 200, 300, 500, 600, 1000, 2000],
    US: [125, 200, 300, 500, 600, 1000, 2000]
};
var Constrain = function (min, max) { return function (x) {
    return x < min ? min : (x > max ? max : x);
}; };
var IAQI_Scale = d3Scale.scaleLinear().range(IAQI_SCALE);
var AQI_Constraint = Constrain(0, 500);
exports.AQICalc = function (components, standard) {
    return [
        { aqi: IAQI_Scale.domain(SO2_SCALE[standard])(components.SO2), pollutant: "SO2" },
        { aqi: IAQI_Scale.domain(NO2_SCALE[standard])(components.NO2), pollutant: "NO2" },
        { aqi: IAQI_Scale.domain(PM10_SCALE[standard])(components.PM10), pollutant: "PM10" },
        { aqi: IAQI_Scale.domain(CO_SCALE[standard])(components.CO), pollutant: "CO" },
        { aqi: IAQI_Scale.domain(CO2_SCALE[standard])(components.CO2), pollutant: "CO2" },
        { aqi: IAQI_Scale.domain(O3_SCALE[standard])(components.O3), pollutant: "O3" },
        { aqi: IAQI_Scale.domain(PM25_SCALE[standard])(components.PM2_5), pollutant: "PM2.5" },
        { aqi: IAQI_Scale.domain(TVOC_SCALE[standard])(components.TVOC), pollutant: "TVOC" }
    ]
        .map(function (d) { return Object.assign({}, d, { aqi: AQI_Constraint(d.aqi) }); })
        .filter(function (d) { return d.aqi > 0; })
        .reduce(function (a, b) {
        if (a.length === 0) {
            return [b];
        }
        else {
            var head = a[0];
            if (head.aqi < b.aqi) {
                return [b];
            }
            else if (head.aqi > b.aqi) {
                return a;
            }
            else {
                return a.concat([b]);
            }
        }
    }, [])
        .map(function (d) { return Object.assign({}, d, { aqi: Math.round(d.aqi) }); });
};
//# sourceMappingURL=index.js.map