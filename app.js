/**
 * Created by Gianluca on 09/09/15.
 */

/* import jsonReader.js for JSON parser */
var jsonReader = require('./jsonReader');
var fs = require('fs');

/* import Underscore.js lib*/
var _ = require('underscore');

/* function to extract parameter from input */
var extractFileNameFromArgvParameter = function(parameterIndex) {
    var fileName;

    // If parameterIndex is not set, set the default value to 0
    parameterIndex = parameterIndex || 0;

    try {
        return process.argv[parameterIndex];
    } catch(exception) {
        console.log(exception);
    }
};

var fileName = extractFileNameFromArgvParameter(2);
var dateFromInput = extractFileNameFromArgvParameter(3);

if (fileName == 3){

    fileName = ('Portfolios/3.json');

} else if (fileName == 4){

    fileName = ('Portfolios/4.json');

} else {console.log("file not found. Insert 3 or 4");}

/* call jsonReader to parse the JSON */
jsonReader.loadJsonFromFile(fileName, function(err, portfolio) {

    if(err) {

        console.log(err);

    } else {

        // get the security ID from the array

        var getSecurityById = _.filter(portfolio[0].transactions, function (result) {

            for (i = 0; i < portfolio[0].transactions.length; i++) {

                if (result.date === dateFromInput) {

                    var securityID = result.securityId;
                    return result;

                }
            }
        });

        // get the security amount from the array after compering the date from input and date inside the json

        var getSecurityValue = _.filter(portfolio[0].transactions, function (value) {

            for (i = 0; i < portfolio[0].transactions.length; i++) {

                if (value.date === dateFromInput) {

                    var securityValue = value.amount;
                    return securityValue;

                }
            }
        });

        // get security ID from array after selecton */
        var security = getSecurityById[0].securityId;

        // get amount from array after selecton */
        var amount = getSecurityValue[0].amount;
        console.log("Portfolio amount is:", amount);
        // start json parse for securities JSON files

        var securityJson = JSON.parse(fs.readFileSync("Securities/" + security + ".json", 'utf8'));
        var securityDate = securityJson.historyDetails;

        // get the security value from the array after compering the date from input and date inside the json

        var getSecurity = _.filter(securityDate, function (price) {

            for (i = 0; i < securityDate.length; i++) {

                if (price.endDate === dateFromInput) {

                    var securityValue = price.value;
                    return securityValue;

                }
            }
        });

        var price = getSecurity[0].value;
        console.log("The price for share "+ security + " on date "+ dateFromInput + " is ", price);

        var total = amount/price;
        console.log("We have " + total + " shares of security " + security);

    }

    });



