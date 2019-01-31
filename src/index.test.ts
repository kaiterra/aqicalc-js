import { AQICalc } from "./";


function testAQISteps(standard, testTable) {
    for (let pollutant in testTable) {
        let pollutantInputs = testTable[pollutant].µgm3;
        let expectedAQIs = testTable[pollutant].expectedAQI;
        for (var i = 0; i < pollutantInputs.length; ++i) {
            let pollutantInput = pollutantInputs[i];
            let expectedAQI = expectedAQIs[i];
            let shouldString = standard + 
                ' should return ' + expectedAQI +
                ' when ' + pollutant +
                ' is ' + pollutantInput +
                ' and others are 0';
            it(shouldString, () => {
                var testData = { SO2: 0, NO2: 0, PM10: 0, CO: 0, O3: 0, PM2_5: 0, CO2: 0, TVOC: 0 };
                testData[pollutant] = pollutantInput;
                expect(AQICalc(testData, standard)).toEqual([{ aqi: expectedAQI, pollutant: pollutant == 'PM2_5' ? 'PM2.5' : pollutant }]);
            });
        }
    }
}

/**
 * Test for AQI China Data
 */
describe('aqicalc', function() {

    let standard = 'CN'

    // Test toggling between TVOC-driven and PM2.5-driven output AQI
    it(standard + ' should be TVOC-driven when PM2.5 AOI is slightly lower than TVOC AQI', () => {
        let data = { PM2_5: 150, TVOC: 605 };
        expect(AQICalc(data, standard)).toEqual([{ aqi: 201, pollutant: 'TVOC' }]);
    });
    it(standard + ' should be PM2.5-driven when PM2.5 AOI is slightly higher than TVOC AQI', () => {
        let data = { PM2_5: 151, TVOC: 600 };
        expect(AQICalc(data, standard)).toEqual([{ aqi: 201, pollutant: 'PM2.5' }]);
    });


    it(standard + ' should be empty when all zero value', () => {
        let data = { SO2: 0, NO2: 0, PM10: 0, CO: 0, O3: 0, PM2_5: 0 };
        expect(AQICalc(data, standard)).toEqual([]);
    });
    it(standard + ' should be aqi=123, primary=SO2 when 300, 0, 0, 0, 0, 0', () => {
        let data = { SO2: 300, NO2: 0, PM10: 0, CO: 0, O3: 0, PM2_5: 0 };
        expect(AQICalc(data, standard)).toEqual([{ aqi: 123, pollutant: "SO2" }]);
    });
    it(standard + ' should be aqi=207, primary=NO2 when 0, 300, 0, 0, 0, 0', () => {
        let data = { SO2: 0, NO2: 300, PM10: 0, CO: 0, O3: 0, PM2_5: 0 };
        expect(AQICalc(data, standard)).toEqual([{ aqi: 207, pollutant: "NO2" }]);
    });
    it(standard + ' should be aqi=344, primary=PM10 when 0, 0, 460, 0, 0, 0', () => {
        let data = { SO2: 0, NO2: 0, PM10: 460, CO: 0, O3: 0, PM2_5: 0 };
        expect(AQICalc(data, standard)).toEqual([{ aqi: 344, pollutant: "PM10" }]);
    });
//    it('should be aqi=195, primary=CO when 0, 0, 0, 23, 0, 0', () => {
//        let data = { SO2: 0, NO2: 0, PM10: 0, CO: 230, O3: 0, PM2_5: 0 };
//        expect(AQICalc(data, standard)).toEqual([{ aqi: 195, pollutant: "CO" }]);
//    });
    it(standard + ' should be aqi=108, primary=O3 when 0, 0, 0, 0, 216, 0', () => {
        let data = { SO2: 0, NO2: 0, PM10: 0, CO: 0, O3: 216, PM2_5: 0 };
        expect(AQICalc(data, standard)).toEqual([{ aqi: 108, pollutant: "O3" }]);
    });
    it(standard + ' should be aqi=283, primary=PM2.5 when 0, 0, 0, 0, 0, 233', () => {
        let data = { SO2: 0, NO2: 0, PM10: 0, CO: 0, O3: 0, PM2_5: 233 };
        expect(AQICalc(data, standard)).toEqual([{ aqi: 283, pollutant: "PM2.5" }]);
    });
    it(standard + ' should be aqi=0, primary=PM2.5 when -10, -1, -4, -3, -2, -1', () => {
        let data = { SO2: -10, NO2: -1, PM10: -4, CO: -3, O3: -2, PM2_5: -1 };
        expect(AQICalc(data, standard)).toEqual([]);
    });
    it(standard + ' should be aqi=500, primary=PM2.5 when 10, 10, 10, 10, 10, 10000', () => {
        let data = { SO2: 10, NO2: 10, PM10: 10, CO: 10, O3: 10, PM2_5: 10000 };
        expect(AQICalc(data, standard)).toEqual([{ aqi: 500, pollutant: "PM2.5" }]);
    });
    it(standard + ' should be aqi=0, primary=TVOC when 125, 10, 10, 10, 10, 10, 10', () => {
        let data = { TVOC: 126, SO2: 0, NO2: 0, PM10: 0, CO: 0, O3: 0, PM2_5: 0 };
        expect(AQICalc(data, standard)).toEqual([{ aqi: 1, pollutant: "TVOC" }]);
    });
    it(standard + ' should be aqi=500, primary=TVOC when 10000, 10, 10, 10, 10, 10, 10', () => {
        let data = { TVOC: 10000, SO2: 10, NO2: 10, PM10: 10, CO: 10, O3: 10, PM2_5: 10 };
        expect(AQICalc(data, standard)).toEqual([{ aqi: 500, pollutant: "TVOC" }]);
    });
    it(standard + ' should be aqi=200, primary=CO2 when 1000, 10, 10, 10, 10, 10, 10, 10', () => {
        let data = { CO2: 2500, TVOC: 10, SO2: 10, NO2: 10, PM10: 10, CO: 0, O3: 10, PM2_5: 10 };
        expect(AQICalc(data, standard)).toEqual([{ aqi: 200, pollutant: "CO2" }]);
    });

    let testTable = {  
        'CO2': {
            µgm3: [1005, 1505, 2005, 2515, 5020, 10005],
            expectedAQI: [51, 101, 151, 201, 301, 500]
        },
        'TVOC': {
            µgm3: [201, 302, 453, 605, 1005, 2001],
            expectedAQI: [51, 101, 151, 201, 301, 500]
        }
    };

    testAQISteps(standard, testTable);
});


/**
 * Test for AQI India Data
 */
describe('aqicalc', function() {

    let standard = 'IN';

    it(standard + ' should be empty when all zero value', () => {
        let data = { SO2: 0, NO2: 0, PM10: 0, CO: 0, O3: 0, PM2_5: 0 };
        expect(AQICalc(data, standard)).toEqual([]);
    });


    it(standard + ' should be aqi=0, primary=PM2.5 when -10, -1, -4, -3, -2, -1', () => {
        let data = { SO2: -10, NO2: -1, PM10: -4, CO: -3, O3: -2, PM2_5: -1 };
        expect(AQICalc(data, standard)).toEqual([]);
    });

    it(standard + ' should be 103 for CO:800, PM25:7, O3:102', () => {
        let data = { SO2: 0, NO2: 0, PM10: 0, CO: 800, O3: 102, PM2_5: 7 };
        expect(AQICalc(data, standard)).toEqual([{ aqi: 103, pollutant: 'O3' }]);
    });

    // Test toggling between TVOC-driven and PM2.5-driven output AQI
    it(standard + ' should be TVOC-driven when PM2.5 AOI is slightly lower than TVOC AQI', () => {
        let data = { PM2_5: 90, TVOC: 605 };
        expect(AQICalc(data, standard)).toEqual([{ aqi: 201, pollutant: 'TVOC' }]);
    });
    it(standard + ' should be PM2.5-driven when PM2.5 AOI is slightly higher than TVOC AQI', () => {
        let data = { PM2_5: 91, TVOC: 600 };
        expect(AQICalc(data, standard)).toEqual([{ aqi: 203, pollutant: 'PM2.5' }]);
    });

    let testTable = {
        'PM10': {
            µgm3: [51, 101, 251, 351, 431, 510],
            expectedAQI: [51, 101, 201, 301, 401, 500]
        },
        'PM2_5': {
            µgm3: [31, 61, 91, 121, 252, 380],
            expectedAQI: [52, 103, 203, 301, 402, 500]
        },
        'NO2': {
            µgm3: [41, 81, 181, 281, 404, 900],
            expectedAQI: [51, 101, 201, 301, 403, 500]
        },
        'O3': {
            µgm3: [51, 101, 169, 211, 750, 1287],
            expectedAQI: [51, 101, 203, 301, 400, 500]
        },
        'CO': {
            µgm3: [1010, 2100, 10100, 17100, 34100, 51000],
            expectedAQI: [51, 101, 201, 301, 401, 500]
        },
        'SO2': {
            µgm3: [41, 82, 385, 810, 1610, 2400],
            expectedAQI: [51, 101, 201, 301, 401, 500]
        },
        'CO2': {
            µgm3: [1005, 1505, 2005, 2515, 5025, 10005],
            expectedAQI: [51, 101, 201, 301, 401, 500]
        },
        'TVOC': {
            µgm3: [201, 302, 453, 605, 1005, 2001],
            expectedAQI: [51, 101, 151, 201, 301, 500]
        }
    };

    testAQISteps(standard, testTable);
});


/**
 * Test for AQI US Data
 */
 describe('aqicalc', function() {

    let standard = 'US';

     it(standard + ' should be empty when all zero value', () => {
         let data = { SO2: 0, NO2: 0, PM10: 0, CO: 0, O3: 0, PM2_5: 0 };
         expect(AQICalc(data, standard)).toEqual([]);
     });

    it(standard + ' O3 below the O3 inclusion threshold not figured into AQI', () => {
        let data = { SO2: 0, NO2: 0, PM10: 0, CO: 800, O3: 262, PM2_5: 7 };
        expect(AQICalc(data, standard)).toEqual([{ aqi: 29, pollutant: 'PM2.5' }]);
    });

    it(standard + ' O3 just above the O3 inclusion threshold *is* figured into AQI', () => {
        let data = { SO2: 0, NO2: 0, PM10: 0, CO: 800, O3: 263, PM2_5: 7 };
        expect(AQICalc(data, standard)).toEqual([{ aqi: 101, pollutant: 'O3' }]);
    });

    // Test toggling between TVOC-driven and PM2.5-driven output AQI
    it(standard + ' should be 201 with TVOC high when TVOC is 605 and PM2.5 is 150', () => {
        let data = { PM2_5: 150, TVOC: 605 };
        expect(AQICalc(data, standard)).toEqual([{ aqi: 201, pollutant: 'TVOC' }]);
    });
    it(standard + ' should be 201 with PM2.5 high when TVOC is 604 and PM2.5 is 151.4', () => {
        let data = { PM2_5: 151.4, TVOC: 600 };
        expect(AQICalc(data, standard)).toEqual([{ aqi: 201, pollutant: 'PM2.5' }]);
    });


    let testTable = {
         'PM10': {
             µgm3: [55, 155, 255, 355, 425, 605],
             expectedAQI: [51, 101, 151, 201, 301, 500]
         },
         'PM2_5': {
             µgm3: [12.5, 35.6, 56.4, 151.4, 251.4, 500.4],
             expectedAQI: [51, 101, 151, 201, 301, 500]
         },
         'NO2': {
             µgm3: [66.4, 127, 451, 804, 1542, 2034],
             expectedAQI: [51, 101, 151, 201, 301, 500]
         },
         'O3': {
             µgm3: [348, 436, 855, 1070],
             expectedAQI: [151, 201, 301, 500]
         },
         'CO': {
             µgm3: [5500, 11650, 15350, 19100, 37550, 49800],
             expectedAQI: [51, 101, 151, 201, 301, 500]
         },
         'SO2': {
             µgm3: [100.7, 218, 530, 867, 1707, 2832],
             expectedAQI: [51, 101, 151, 201, 301, 500]
         },
         'CO2': {
             µgm3: [1005, 1505, 2005, 2515, 5020, 10005],
             expectedAQI: [51, 101, 151, 201, 301, 500]
         },
         'TVOC': {
             µgm3: [201, 302, 453, 605, 1005, 2001],
             expectedAQI: [51, 101, 151, 201, 301, 500]
         }
    };

     testAQISteps(standard, testTable);
 });
