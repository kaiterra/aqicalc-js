import * as d3Scale from "d3-scale";

const IAQI_SCALE_CN = [0, 50, 100, 150, 200, 300, 500];
const IAQI_SCALE_IN = [0, 50, 100, 200, 300, 400, 500];
const IAQI_SCALE_US = [0, 50, 100, 150, 200, 300, 500];

/**
 * All pollutant values in these scales are in micrograms (µg) / m^3.
 * 
 * AQI breakpoints were taken from:
 *   China: ?? 
 *   India: http://cpcb.nic.in/displaypdf.php?id=bmF0aW9uYWwtYWlyLXF1YWxpdHktaW5kZXgvQWJvdXRfQVFJLnBkZg==
 *   US: https://en.wikipedia.org/wiki/Air_quality_index#Computing_the_AQI
 * 
 *   As you can see, those tables are expressed in a few different units.
 * 
 *   Conversions from those units to µg/m^3 were done with this this online
 *   calculator:
 *      https://www.lenntech.com/calculators/ppm/converter-parts-per-million.htm
 * 
 */

const SO2_SCALE = <AirQualityBreakpoints>{
  CN: [0, 50, 150, 475, 800, 1600, 2620],
  IN: [0, 40, 80, 380, 800, 1600, 2620],
  US: [0, 98.7, 212, 522, 857, 1700, 2832]
}
const NO2_SCALE = <AirQualityBreakpoints>{
  CN: [0, 40, 80, 180, 280, 565, 940],
  IN: [0, 40, 80, 180, 280, 400, 900],
  US: [0, 65.4, 123, 444, 800, 1540, 2034]
}
const PM10_SCALE = <AirQualityBreakpoints>{
  CN: [0, 50, 150, 250, 350, 420, 600],
  IN: [0, 50, 100, 250, 350, 430, 600],
  US: [0, 54, 154, 254, 354, 424, 604]
}
const CO_SCALE = <AirQualityBreakpoints>{
  CN: [0, 2000, 4000, 14000, 24000, 36000, 60000],
  IN: [0, 1000, 2000, 10000, 17000, 34000, 49000],
  US: [0, 5427, 11600, 15300, 19000, 37500, 49800]
}
const CO2_SCALE = <AirQualityBreakpoints>{
  CN: [400, 1000, 1500, 2000, 2500, 5000, 10000],
  IN: [400, 1000, 1500, 2000, 2500, 5000, 10000],
  US: [400, 1000, 1500, 2000, 2500, 5000, 10000]
}
const O3_SCALE = <AirQualityBreakpoints>{
  CN: [0, 160, 200, 300, 400, 800, 1200],
  IN: [0, 50, 100, 168, 208, 748, 1000],
  US: [0, 114, 148, 347, 431, 854, 1070] 
}
const PM25_SCALE = <AirQualityBreakpoints>{
  CN: [0, 35, 75, 115, 150, 250, 500],
  IN: [0, 30, 60,  90, 120, 250, 500],
  US: [0, 12, 35.4, 55.4, 150.4, 250.4, 500.4]
}
const TVOC_SCALE = <AirQualityBreakpoints>{
  CN: [125, 200, 300, 500, 600, 1000, 2000],
  IN: [125, 200, 300, 500, 600, 1000, 2000],
  US: [125, 200, 300, 500, 600, 1000, 2000]
}

const Constrain = (min: number, max: number) => (x: number) =>
    x < min ? min : (x > max ? max : x);

function IAQI_Scale(standard: string) {
    if (standard == 'CN') {
        return d3Scale.scaleLinear<number, number>().range(IAQI_SCALE_CN);
    }
    else if (standard == 'IN') {
        return d3Scale.scaleLinear<number, number>().range(IAQI_SCALE_IN);
    }
    // Default US
    return d3Scale.scaleLinear<number, number>().range(IAQI_SCALE_US);
}

const AQI_Constraint = Constrain(0, 500);

export interface AirQualityIndexComponents {
    SO2: number;
    NO2: number;
    PM10: number;
    CO: number;
    CO2: number;
    O3: number;
    PM2_5: number;
    TVOC: number;
}

export interface PrimaryPollutantValue {
    aqi: number;
    pollutant: string;
}

export interface AirQualityBreakpoints {
  [key: string]: number[];
  CN: number[];
  IN: number[];
  US: number[];
}

export const AQICalc = (components: AirQualityIndexComponents, standard: string): PrimaryPollutantValue[] =>
    [
        { aqi: IAQI_Scale(standard).domain(SO2_SCALE[standard])(components.SO2), pollutant: "SO2" },
        { aqi: IAQI_Scale(standard).domain(NO2_SCALE[standard])(components.NO2), pollutant: "NO2" },
        { aqi: IAQI_Scale(standard).domain(PM10_SCALE[standard])(components.PM10), pollutant: "PM10" },
        { aqi: IAQI_Scale(standard).domain(CO_SCALE[standard])(components.CO), pollutant: "CO" },
        { aqi: IAQI_Scale(standard).domain(CO2_SCALE[standard])(components.CO2), pollutant: "CO2" },
        { aqi: IAQI_Scale(standard).domain(O3_SCALE[standard])(components.O3), pollutant: "O3" },
        { aqi: IAQI_Scale(standard).domain(PM25_SCALE[standard])(components.PM2_5), pollutant: "PM2.5" },
        { aqi: IAQI_Scale('CN').domain(TVOC_SCALE['CN'])(components.TVOC), pollutant: "TVOC" }
    ]
        .map((d) => Object.assign({}, d, { aqi: AQI_Constraint(d.aqi) }))
        .filter((d) => d.aqi > 0)
        .reduce((a, b) => {
            if (a.length === 0) {
                return [b];
            } else {
                let head = a[0];
                if (head.aqi < b.aqi) {
                    return [b];
                } else if (head.aqi > b.aqi) {
                    return a;
                } else {
                    return a.concat([b]);
                }
            }
        }, [])
        .map((d) => Object.assign({}, d, { aqi: Math.round(d.aqi) }));
