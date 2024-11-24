/*
    Fields data contain next values: 
    1. How it was display in select options
    2. JSON path, where data for two axis contain
    3. Name for x axis
    4. Name for y axis
    For example 3rd and 4th values will looks like 2nd value + one of them : data-date or data-GDP
    5. Contain type of data into x-y axis. For example in default data type by 2nd el is array.
    It mean, that we destructuring data. [3rd value, 4th value] ([date, GDP] => ["2019-11-12", "547.1"])
    If value by 3rd and 4th key is simple, select "str"
*/

export const data = {

    "default": {
        "link" : "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json",
        "select-name": "---FCC default---",
        "fields": [["Gross Domestic Product", "data", "date", "GDP", "array"]],
        
    },
    
    "covid-all-world-data": {
        "link": "https://disease.sh/v3/covid-19/countries",
        "select-name": "Covid 2019 All countries",
        "fields": [
            ["Count of cases", "cases", "country", "cases", "str"], 
            ["Count of recovered", "recovered", "country", "recovered", "str"], 
            ["Count of deaths", "deaths", "country", "deaths", "str"], 
            ["Count of cases per million", "casesPerOneMillion", "country", "casesPerOneMillion", "str"],
            ["Count of deaths per million", "deathsPerOneMillion", "country", "casdeathsPerOneMilliones", "str"],
            ["Count of tests", "tests", "country", "tests", "str"],
        ]
    }
}

