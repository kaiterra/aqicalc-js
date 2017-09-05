import { AQICalc } from "./";

/**
 * Test for AQI China Data
 */
describe('aqicalc', function() {
    it('should be empty when all zero value', () => {
        let data = { SO2: 0, NO2: 0, PM10: 0, CO: 0, O3: 0, PM2_5: 0 };
        expect(AQICalc(data, 'CN')).toEqual([]);
    });
    it('should be aqi=123, primary=SO2 when 300, 0, 0, 0, 0, 0', () => {
        let data = { SO2: 300, NO2: 0, PM10: 0, CO: 0, O3: 0, PM2_5: 0 };
        expect(AQICalc(data, 'CN')).toEqual([{ aqi: 123, pollutant: "SO2" }]);
    });
    it('should be aqi=207, primary=NO2 when 0, 300, 0, 0, 0, 0', () => {
        let data = { SO2: 0, NO2: 300, PM10: 0, CO: 0, O3: 0, PM2_5: 0 };
        expect(AQICalc(data, 'CN')).toEqual([{ aqi: 207, pollutant: "NO2" }]);
    });
    it('should be aqi=344, primary=PM10 when 0, 0, 460, 0, 0, 0', () => {
        let data = { SO2: 0, NO2: 0, PM10: 460, CO: 0, O3: 0, PM2_5: 0 };
        expect(AQICalc(data, 'CN')).toEqual([{ aqi: 344, pollutant: "PM10" }]);
    });
    it('should be aqi=195, primary=CO when 0, 0, 0, 23, 0, 0', () => {
        let data = { SO2: 0, NO2: 0, PM10: 0, CO: 23, O3: 0, PM2_5: 0 };
        expect(AQICalc(data, 'CN')).toEqual([{ aqi: 195, pollutant: "CO" }]);
    });
    it('should be aqi=108, primary=O3 when 0, 0, 0, 0, 216, 0', () => {
        let data = { SO2: 0, NO2: 0, PM10: 0, CO: 0, O3: 216, PM2_5: 0 };
        expect(AQICalc(data, 'CN')).toEqual([{ aqi: 108, pollutant: "O3" }]);
    });
    it('should be aqi=283, primary=PM2.5 when 0, 0, 0, 0, 0, 233', () => {
        let data = { SO2: 0, NO2: 0, PM10: 0, CO: 0, O3: 0, PM2_5: 233 };
        expect(AQICalc(data, 'CN')).toEqual([{ aqi: 283, pollutant: "PM2.5" }]);
    });
    it('should be aqi=0, primary=PM2.5 when -10, -1, -4, -3, -2, -1', () => {
        let data = { SO2: -10, NO2: -1, PM10: -4, CO: -3, O3: -2, PM2_5: -1 };
        expect(AQICalc(data, 'CN')).toEqual([]);
    });
    it('should be aqi=500, primary=PM2.5 when 10, 10, 10, 10, 10, 10000', () => {
        let data = { SO2: 10, NO2: 10, PM10: 10, CO: 10, O3: 10, PM2_5: 10000 };
        expect(AQICalc(data, 'CN')).toEqual([{ aqi: 500, pollutant: "PM2.5" }]);
    });
    it('should be aqi=0, primary=TVOC when 125, 10, 10, 10, 10, 10, 10', () => {
        let data = { TVOC: 126, SO2: 0, NO2: 0, PM10: 0, CO: 0, O3: 0, PM2_5: 0 };
        expect(AQICalc(data, 'CN')).toEqual([{ aqi: 1, pollutant: "TVOC" }]);
    });
    it('should be aqi=500, primary=TVOC when 10000, 10, 10, 10, 10, 10, 10', () => {
        let data = { TVOC: 10000, SO2: 10, NO2: 10, PM10: 10, CO: 10, O3: 10, PM2_5: 10 };
        expect(AQICalc(data, 'CN')).toEqual([{ aqi: 500, pollutant: "TVOC" }]);
    });
    it('should be aqi=200, primary=CO2 when 1000, 10, 10, 10, 10, 10, 10, 10', () => {
        let data = { CO2: 2500, TVOC: 10, SO2: 10, NO2: 10, PM10: 10, CO: 0, O3: 10, PM2_5: 10 };
        expect(AQICalc(data, 'CN')).toEqual([{ aqi: 200, pollutant: "CO2" }]);
    });
});


/**
 * Test for AQI US Data
 */
 describe('aqicalc', function() {
     it('should be empty when all zero value', () => {
         let data = { SO2: 0, NO2: 0, PM10: 0, CO: 0, O3: 0, PM2_5: 0 };
         expect(AQICalc(data, 'US')).toEqual([]);
     });
     it('should be aqi=100, primary=O3 when 0, 0, 0, 0, 216, 0', () => {
         let data = { SO2: 0, NO2: 0, PM10: 0, CO: 0, O3: 250, PM2_5: 0 };
         expect(AQICalc(data, 'US')).toEqual([{ aqi: 100, pollutant: "O3" }]);
     });
     it('should be aqi=283, primary=PM2.5 when 0, 0, 0, 0, 0, 233', () => {
         let data = { SO2: 0, NO2: 0, PM10: 0, CO: 0, O3: 0, PM2_5: 233 };
         expect(AQICalc(data, 'US')).toEqual([{ aqi: 283, pollutant: "PM2.5" }]);
     });
 });
