// Get IMDb IDs from name.basics.tsv file provided by https://datasets.imdbws.com/
// https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line

const fs = require('fs');
const readline = require('readline');

class IMDbData {
    async processLineByLine() {
        const listOfIDs = [];
        let finalListOfIDs = [];
        const fileStream = fs.createReadStream('./imdb_data/test.tsv');

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        // Note: we use the crlfDelay option to recognize all instances of CR LF
        // ('\r\n') in input.txt as a single line break.

        for await (const line of rl) {
            // replace everything after the first tab with an empty string to only get the IMDb ID from each line
            const firstValue = line.replace(/\t.*/, '');

            const splitString = line.split("\t");

            // check if film is from the year 2020
            if (splitString.includes("2020") && splitString.includes("movie")) {
                listOfIDs.push(firstValue);
            }
        }
        
        // >> Count actual length of list to splice accordingly
        // var count1 = 0;
        // for (var i = 0; i < listOfIDs.length; ++i) {
        //     count1++;
        // }
        
        // console.log(listOfIDs)
        // DONT RUN THIS BEFORE CHECKING IF SPLICE ACTUALLY ONLY REQUESTS UNDER 1000 ITEMS!!!!
        // finalListOfIDs = listOfIDs.splice(0, 800);

        return finalListOfIDs;
    }
}

module.exports = new IMDbData();