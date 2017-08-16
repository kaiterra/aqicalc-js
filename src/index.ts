import * as d3Scale from "d3-scale";

const IAQI_SCALE = [0, 50, 100, 150, 200, 300, 400, 500];

const SO2_SCALE = <AirQualityBreakpoints>{
  CN: [0, 50, 150, 475, 800, 1600, 2100, 2620],
  US: [0, 35, 75, 185, 304, 604, 804, 1004]
}
const NO2_SCALE = <AirQualityBreakpoints>{
  CN: [0, 40, 80, 180, 280, 565, 750, 940],
  US: [0, 99.64, 188, 676.8, 1220, 2350, 3100, 3850]
}
const PM10_SCALE = <AirQualityBreakpoints>{
  CN: [0, 50, 150, 250, 350, 420, 500, 600],
  US: [0, 54, 154, 254, 354, 424, 504, 600]
}
const CO_SCALE = <AirQualityBreakpoints>{
  CN: [0, 2, 4, 14, 24, 36, 48, 60],
  US: [0, 5.038, 10.763, 14.198, 17.633, 34.35, 46.258, 57.708]
}
const O3_SCALE = <AirQualityBreakpoints>{
  CN: [0, 160, 200, 300, 400, 800, 1000, 1200],
  US: [0, 160, 250, 328, 408, 808, 1008, 1208]
}
const PM25_SCALE = <AirQualityBreakpoints>{
  CN: [0, 35, 75, 115, 150, 250, 350, 500],
  US: [0, 12, 34.5, 55.4, 150.4, 250.4, 350.4, 500.4]
}
const TVOC_SCALE = <AirQualityBreakpoints>{
  CN: [0, 125, 200, 300, 500, 600, 1000, 2000],
  US: [0, 125, 200, 300, 500, 600, 1000, 2000]
}

const Constrain = (min: number, max: number) => (x: number) =>
    x < min ? min : (x > max ? max : x);

const IAQI_Scale = d3Scale.scaleLinear<number, number>().range(IAQI_SCALE);

const AQI_Constraint = Constrain(0, 500);

export interface AirQualityIndexComponents {
    SO2: number;
    NO2: number;
    PM10: number;
    CO: number;
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
  US: number[];
}

export const AQICalc = (components: AirQualityIndexComponents, standard: string): PrimaryPollutantValue[] =>
    [
        { aqi: IAQI_Scale.domain(SO2_SCALE[standard])(components.SO2), pollutant: "SO2" },
        { aqi: IAQI_Scale.domain(NO2_SCALE[standard])(components.NO2), pollutant: "NO2" },
        { aqi: IAQI_Scale.domain(PM10_SCALE[standard])(components.PM10), pollutant: "PM10" },
        { aqi: IAQI_Scale.domain(CO_SCALE[standard])(components.CO), pollutant: "CO" },
        { aqi: IAQI_Scale.domain(O3_SCALE[standard])(components.O3), pollutant: "O3" },
        { aqi: IAQI_Scale.domain(PM25_SCALE[standard])(components.PM2_5), pollutant: "PM2.5" },
        { aqi: IAQI_Scale.domain(TVOC_SCALE[standard])(components.TVOC), pollutant: "TVOC" }
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
