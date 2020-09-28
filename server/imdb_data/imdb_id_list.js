// Get IMDb IDs from name.basics.tsv file provided by https://datasets.imdbws.com/
// https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line

const fs = require('fs')
const readline = require('readline')

class IMDbData {
    async getListOfIDs() {
        const listOfIDs = []
        const fileStream = fs.createReadStream('./imdb_data/test.tsv')

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        })
        // Note: we use the crlfDelay option to recognize all instances of CR LF
        // ('\r\n') in input.txt as a single line break.

        for await (const line of rl) {
            // replace everything after the first tab with an empty string to only get the IMDb ID from each line
            const filmId = line.replace(/\t.*/, '')
            listOfIDs.push(filmId)
        }
        
        return listOfIDs
    }
}

module.exports = new IMDbData()