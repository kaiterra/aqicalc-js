export interface AirQualityIndexComponents {
    SO2: number;
    NO2: number;
    PM10: number;
    CO: number;
    CO2: number;
    O3: number;
    PM2_5: number;
    TVOC: number;
    TVOC_SGP: number;
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
export declare const AQICalc: (components: AirQualityIndexComponents, standard: string) => PrimaryPollutantValue[];
export declare const AQI_BREAKPOINTS: AirQualityBreakpoints;
export declare const TVOC_BREAKPOINTS: AirQualityBreakpoints;
export declare const PM10_BREAKPOINTS: AirQualityBreakpoints;
export declare const PM25_BREAKPOINTS: AirQualityBreakpoints;
export declare const CO_BREAKPOINTS: AirQualityBreakpoints;
export declare const CO2_BREAKPOINTS: AirQualityBreakpoints;
export declare const NO2_BREAKPOINTS: AirQualityBreakpoints;
export declare const O3_BREAKPOINTS: AirQualityBreakpoints;
export declare const SO2_BREAKPOINTS: AirQualityBreakpoints;
export declare const TVOC_SGP_BREAKPOINT: AirQualityBreakpoints;
