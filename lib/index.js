"use strict";
exports.__esModule = true;
var d3Scale = require("d3-scale");
var IAQI_SCALE_CN = [0, 50, 100, 150, 200, 300, 400, 500];
var IAQI_SCALE_IN = [0, 50, 100, 200, 300, 400, 500];
var IAQI_SCALE_US = [0, 50, 100, 150, 200, 300, 500];
var IAQI_SCALE_AU = [0, 33, 66, 99, 149, 200, 99999];
var AQI_SCALE = {
    CN: IAQI_SCALE_CN,
    IN: IAQI_SCALE_IN,
    US: IAQI_SCALE_US,
    AU: IAQI_SCALE_AU
};
var SO2_SCALE = {
    CN: [0, 50, 150, 475, 800, 1600, 2100, 2620],
    IN: [0, 40, 80, 380, 800, 1600, 2620],
    US: [0, 98.7, 212, 522, 857, 1700, 2832],
    AU: [0, 524]
};
var NO2_SCALE = {
    CN: [0, 40, 80, 180, 280, 565, 750, 940],
    IN: [0, 40, 80, 180, 280, 400, 900],
    US: [0, 65.4, 123, 444, 800, 1540, 2034],
    AU: [0, 225.6]
};
var PM10_SCALE = {
    CN: [0, 50, 150, 250, 350, 420, 500, 600],
    IN: [0, 50, 100, 250, 350, 430, 600],
    US: [0, 54, 154, 254, 354, 424, 604],
    AU: [0, 50]
};
var CO_SCALE = {
    CN: [0, 2000, 4000, 14000, 24000, 36000, 48000, 60000],
    IN: [0, 1000, 2000, 10000, 17000, 34000, 49000],
    US: [0, 5427, 11600, 15300, 19000, 37500, 49800],
    AU: [0, 10305]
};
var CO2_SCALE = {
    CN: [400, 1000, 1500, 2000, 2500, 5000, 7500, 10000],
    IN: [400, 1000, 1500, 2000, 2500, 5000, 10000],
    US: [400, 1000, 1500, 2000, 2500, 5000, 10000],
    AU: [400, 1500]
};
var O3_SCALE = {
    CN: [0, 160, 200, 300, 400, 800, 1000, 1200],
    IN: [0, 50, 100, 168, 208, 748, 1000],
    US: [0, 0, 262, 347, 431, 854, 1070],
    AU: [0, 200]
};
var PM25_SCALE = {
    CN: [0, 35, 75, 115, 150, 250, 350, 500],
    IN: [0, 30, 60, 90, 120, 250, 500],
    US: [0, 12, 35.4, 55.4, 150.4, 250.4, 500.4],
    AU: [0, 25]
};
var TVOC_SCALE = {
    CN: [125, 200, 300, 450, 600, 1000, 1500, 2000],
    IN: [125, 200, 300, 450, 600, 1000, 2000],
    US: [125, 200, 300, 450, 600, 1000, 2000],
    AU: [125, 300]
};
var TVOC_SGP_SCALE = {
    CN: [0, 220, 660, 2200, 3300, 4400, 4950, 5500],
    IN: [0, 220, 660, 2200, 3300, 4400, 5500],
    US: [0, 220, 660, 2200, 3300, 4400, 5500],
    AU: [0, 660]
};
var HCHO_SCALE = {
    CN: [0, 27, 54, 81, 360, 550, 650, 750],
    IN: [0, 27, 54, 81, 360, 550, 750],
    US: [0, 27, 54, 81, 360, 550, 750],
    AU: [0, 54]
};
function IAQI_Scale(standard) {
    if (standard == 'CN') {
        return d3Scale.scaleLinear().range(IAQI_SCALE_CN);
    }
    else if (standard == 'IN') {
        return d3Scale.scaleLinear().range(IAQI_SCALE_IN);
    }
    else if (standard == "AU") {
        return d3Scale.scaleLinear().range([0, 100]);
    }
    return d3Scale.scaleLinear().range(IAQI_SCALE_US);
}
var AQI_Constraint = function (x, standard) {
    var breakpoints = AQI_SCALE[standard];
    if (breakpoints && breakpoints.length > 0) {
        var maxAQI = breakpoints[breakpoints.length - 1];
        var minAQI = breakpoints[0];
        return x < minAQI ? minAQI : (x > maxAQI ? maxAQI : x);
    }
    else {
        return x;
    }
};
function computeO3AQI(standard, µgm3) {
    if ((standard == 'US') && (µgm3 < 263)) {
        return 0;
    }
    return IAQI_Scale(standard).domain(O3_SCALE[standard])(µgm3);
}
exports.AQICalc = function (components, standard) {
    return [
        { aqi: IAQI_Scale(standard).domain(SO2_SCALE[standard])(components.SO2), pollutant: "SO2" },
        { aqi: IAQI_Scale(standard).domain(NO2_SCALE[standard])(components.NO2), pollutant: "NO2" },
        { aqi: IAQI_Scale(standard).domain(PM10_SCALE[standard])(components.PM10), pollutant: "PM10" },
        { aqi: IAQI_Scale(standard).domain(CO_SCALE[standard])(components.CO), pollutant: "CO" },
        { aqi: IAQI_Scale(standard).domain(CO2_SCALE[standard])(components.CO2), pollutant: "CO2" },
        { aqi: computeO3AQI(standard, components.O3), pollutant: "O3" },
        { aqi: IAQI_Scale(standard).domain(PM25_SCALE[standard])(components.PM2_5), pollutant: "PM2.5" },
        { aqi: IAQI_Scale(standard).domain(TVOC_SCALE[standard])(components.TVOC), pollutant: "TVOC" },
        { aqi: IAQI_Scale(standard).domain(TVOC_SGP_SCALE[standard])(components.TVOC_SGP), pollutant: "TVOC" },
        { aqi: IAQI_Scale(standard).domain(HCHO_SCALE[standard])(components.HCHO), pollutant: "HCHO" }
    ]
        .map(function (d) { return Object.assign({}, d, { aqi: AQI_Constraint(d.aqi, standard) }); })
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
exports.AQI_BREAKPOINTS = AQI_SCALE;
exports.TVOC_BREAKPOINTS = TVOC_SCALE;
exports.PM10_BREAKPOINTS = PM10_SCALE;
exports.PM25_BREAKPOINTS = PM25_SCALE;
exports.CO_BREAKPOINTS = CO_SCALE;
exports.CO2_BREAKPOINTS = CO2_SCALE;
exports.NO2_BREAKPOINTS = NO2_SCALE;
exports.O3_BREAKPOINTS = O3_SCALE;
exports.SO2_BREAKPOINTS = SO2_SCALE;
exports.TVOC_SGP_BREAKPOINT = TVOC_SGP_SCALE;
exports.HCHO_BREAKPOINT = HCHO_SCALE;
//# sourceMappingURL=index.js.map