import { data as DATA } from './data';

export default function state() {
    return {
        dataType: "json",                               // It can be JSON, CSV and other, but starts from JSON
        dataLink :  DATA?.default?.link || "",          // Link to data source 
        abortControllerTimeout: 8000,                   // Timeout for aborting the fetch request (ms)
        retriesLoadData: 3,                             // Implement retry logic for loading data. Set `retriesLoadData` to 3, retrying the fetch process before returning `null` in case of failure.
        selectedJson: "default",                        // Default selected JSON data type
        selectedJsonFile: Object.keys(DATA || {}).map(key => [key, DATA[key]?.["select-name"] || ""]), // Parse all data to contain pairs [key, select-name] for first options block
        isProcessing: false,                            // Disables user interaction while data is being loaded or processed
        pathNode: " ==> ",                              // Used to display the navigation path to the data in the description section
        xAxis: null,                                    // Array for non-numeric data, typically used for categorical or time-based labels on the chart
        yAxis: null,                                    // Array for numeric data, typically representing the values or measurements in the chart
        selectedXAxis: null,                            // Non nuneric value to display into option section and next will be used to processing svg image
        selectedYAxis: null,                            // Numeric value to display into option section and next will be used to processing svg image
        infoData: null,                                 // Holds information like updates, time intervals, or other details for display in the chart's bottom section 
        selectedInfoData: null,                         // Array of values, selected by user from infoData array
        dataStore: {},                                  // it can be array, object and other types, but now it's don't supported
        isTest: false,                                  // it will disable all fields to user select, if we'll begun tests
        isAddLink: false,                               // that flag will toggle display style between hide/show to insert link
        selectedChartType: "bar"                        // here contain chart type for next processing
    }
}
    
    
    
    
 /*
 fieldsToSelect : DATA.default.fields,
 selectedField: DATA.default.fields[0].
 */   