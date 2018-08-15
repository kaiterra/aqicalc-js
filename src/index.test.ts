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
//    it('should be aqi=195, primary=CO when 0, 0, 0, 23, 0, 0', () => {
//        let data = { SO2: 0, NO2: 0, PM10: 0, CO: 230, O3: 0, PM2_5: 0 };
//        expect(AQICalc(data, 'CN')).toEqual([{ aqi: 195, pollutant: "CO" }]);
//    });
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
 * Test for AQI India Data
 */
describe('aqicalc', function() {

    it('should be empty when all zero value', () => {
        let data = { SO2: 0, NO2: 0, PM10: 0, CO: 0, O3: 0, PM2_5: 0 };
        expect(AQICalc(data, 'IN')).toEqual([]);
    });


    it('should be aqi=0, primary=PM2.5 when -10, -1, -4, -3, -2, -1', () => {
        let data = { SO2: -10, NO2: -1, PM10: -4, CO: -3, O3: -2, PM2_5: -1 };
        expect(AQICalc(data, 'IN')).toEqual([]);
    });

    let testTable = {
        'PM10':  {input: [51, 101, 251, 351, 431, 600],
                  expected: [51, 101, 201, 301, 401, 500]},
        'PM2_5': {input: [31, 61, 91, 121, 252, 500],
                  expected: [52, 103, 203, 301, 401, 500]},
        'NO2': {input: [41, 81, 181, 281, 404, 900],
                expected: [51, 101, 201, 301, 401, 500]},
        'O3':  {input: [51, 101, 169, 211, 750, 1000],
                expected: [51, 101, 203, 301, 401, 500]},
        'CO':  {input: [1010, 2100, 10100, 17100, 34100, 49000],
                expected: [51, 101, 201, 301, 401, 500]},
        'SO2': {input: [41, 82, 385, 810, 1610, 2620],
                expected: [51, 101, 201, 301, 401, 500]}
    };

    for (let pollutant in testTable) {
        let pollutantInputs = testTable[pollutant].input;
        let expectedAQIs = testTable[pollutant].expected;
        for (var i = 0; i < pollutantInputs.length; ++i) {
            let pollutantInput = pollutantInputs[i];
            let expectedAQI = expectedAQIs[i];
            let shouldString = 'should return ' + expectedAQI + 
                            ' when ' + pollutant + 
                            ' is ' + pollutantInput + 
                            ' and others are 0';;
            it(shouldString, () => {
                var testData = { SO2: 0, NO2: 0, PM10: 0, CO: 0, O3: 0, PM2_5: 0, CO2: 0, TVOC: 0 };
                testData[pollutant] = pollutantInput;
                expect(AQICalc(testData, 'IN')).toEqual([{ aqi: expectedAQI, pollutant: pollutant == 'PM2_5' ? 'PM2.5' : pollutant }]);
            });
        }
    }
});


/**
 * Test for AQI US Data
 */
 describe('aqicalc', function() {
     it('should be empty when all zero value', () => {
         let data = { SO2: 0, NO2: 0, PM10: 0, CO: 0, O3: 0, PM2_5: 0 };
         expect(AQICalc(data, 'US')).toEqual([]);
     });

     let testTable = {
        'PM10':  { input: [55, 155, 255, 355, 425, 605],
                   expected: [51, 101, 151, 201, 301, 500] },
        'PM2_5': { input: [12.5, 35.6, 56.4, 151.4, 251.4, 500.4],
                   expected: [51, 101, 151, 201, 301, 500] },
        'NO2': { input: [66.4, 127, 451, 804, 1542, 2034],
                 expected: [51, 101, 151, 201, 301, 500] },
        'O3':  { input: [115, 151, 348, 436, 855, 1070],
                 expected: [51, 101, 151, 201, 301, 500] },
        'CO':  { input: [5500, 11650, 15350, 19100, 37550, 49800],
                 expected: [51, 101, 151, 201, 301, 500] },
        'SO2': { input: [100.7, 218, 530, 867, 1707, 2832],
                 expected: [51, 101, 151, 201, 301, 500] },
    };

    for (let pollutant in testTable) {
        let pollutantInputs = testTable[pollutant].input;
        let expectedAQIs = testTable[pollutant].expected;
        for (var i = 0; i < pollutantInputs.length; ++i) {
            let pollutantInput = pollutantInputs[i];
            let expectedAQI = expectedAQIs[i];
            let shouldString = 'should return ' + expectedAQI + 
                            ' when ' + pollutant + 
                            ' is ' + pollutantInput + 
                            ' and others are 0';;
            it(shouldString, () => {
                var testData = { SO2: 0, NO2: 0, PM10: 0, CO: 0, O3: 0, PM2_5: 0, CO2: 0, TVOC: 0 };
                testData[pollutant] = pollutantInput;
                expect(AQICalc(testData, 'US')).toEqual([{ aqi: expectedAQI, pollutant: pollutant == 'PM2_5' ? 'PM2.5' : pollutant }]);
            });
        }
    }
 });
