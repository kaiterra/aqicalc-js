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
export declare const AQICalc: (components: AirQualityIndexComponents, standard: string) => PrimaryPollutantValue[];
