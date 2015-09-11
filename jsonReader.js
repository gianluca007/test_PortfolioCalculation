/**
 * Created by Gianluca on 09/09/15.
 */

var fs = require('fs');

var loadJsonFromFile = function(filePath, callback) {
    fs.readFile(filePath, function(err, data) {
        var parsedJson;

        // Handle error
        if (err) {
            return callback(err, null);
        }

        // Parse JSON
        try {
            parsedJson = JSON.parse(data);

        } catch (exception) {

            return callback(exception);
        }

        // Everything is ok
        return callback(null, parsedJson);
    });
};

module.exports.loadJsonFromFile = loadJsonFromFile;
