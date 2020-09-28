const criterionRepo = require('../repositories/CriterionRepository')
const filmRepo = require('../repositories/FilmRepository')

class TestDataImporter {
    createCriteriaData() {
        const testData = [
            {
                "criterion": "Diversity",
                "test": "DuVernay Test",
                "questions": {
                    "0": "Is there a POC - or someone from another minority - that has a fully realised life?",
                    "1": "Do they act independently?",
                    "2": "Do they act independent from any white characters?"
                }
            },
            {
                "criterion": "Gender Equality",
                "test": "Bechdel Test",
                "questions": {
                    "0": "Does this film have at least two (named) women in it?",
                    "1": "Do the women talk to each other?",
                    "2": "Do they talk about something besides a man?"
                }
            },
            {
                "criterion": "Queer Friendliness",
                "test": "Queer Friendliness Test",
                "questions": {
                    "0": "Is there a queer character that has their own story line?",
                    "1": "Do they act independently?",
                    "2": "Them being queer is not the sole focus of this character's development?"
                }
            }
        ]
        
        for(const entry of testData) {
            criterionRepo.addCriterion(entry)
        }
    }

    createFilmData() {
        const testData = [
            {
                "Title":"Portrait of a Lady on Fire",
                "Year":"2019",
                "Rated":"R",
                "Released":"14 Feb 2020",
                "Runtime":"122 min",
                "Genre":"Drama, Romance",
                "Director":"Céline Sciamma",
                "Writer":"Céline Sciamma",
                "Actors":"Noémie Merlant, Adèle Haenel, Luàna Bajrami, Valeria Golino",
                "Plot":"On an isolated island in Brittany at the end of the eighteenth century, a female painter is obliged to paint a wedding portrait of a young woman.",
                "Language":"French, Italian",
                "Country":"France",
                "Awards":"Nominated for 1 Golden Globe. Another 44 wins & 125 nominations.",
                "Poster":"https://m.media-amazon.com/images/M/MV5BNjgwNjkwOWYtYmM3My00NzI1LTk5OGItYWY0OTMyZTY4OTg2XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
                "imdbID":"tt8613070"
            },
            {
                "Title":"Parasite",
                "Year":"2019",
                "Rated":"R",
                "Released":"08 Nov 2019",
                "Runtime":"132 min",
                "Genre":"Comedy, Drama, Thriller",
                "Director":"Bong Joon Ho",
                "Writer":"Bong Joon Ho (story), Bong Joon Ho (screenplay), Jin Won Han (screenplay)",
                "Actors":"Kang-ho Song, Sun-kyun Lee, Yeo-jeong Jo, Woo-sik Choi",
                "Plot":"Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
                "Language":"Korean, English",
                "Country":"South Korea",
                "Awards":"Won 4 Oscars. Another 270 wins & 253 nominations.",
                "Poster":"https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
                "imdbID":"tt6751668"
            },
            {
                "Title":"Snowpiercer",
                "Year":"2013",
                "Rated":"R",
                "Released":"11 Jul 2014",
                "Runtime":"126 min",
                "Genre":"Action, Drama, Sci-Fi",
                "Director":"Bong Joon Ho",
                "Writer":"Jacques Lob (based on \"Le Transperceneige\" by), Benjamin Legrand (based on \"Le Transperceneige\" by), Jean-Marc Rochette (based on \"Le Transperceneige\" by), Bong Joon Ho (screen story by), Bong Joon Ho (screenplay by), Kelly Masterson (screenplay by)",
                "Actors":"Chris Evans, Kang-ho Song, Ed Harris, John Hurt",
                "Plot":"In a future where a failed climate-change experiment has killed all life except for the lucky few who boarded the Snowpiercer, a train that travels around the globe, a new class system emerges.",
                "Language":"English, Korean, French, Japanese, Czech, German",
                "Country":"South Korea, Czech Republic",
                "Awards":"33 wins & 104 nominations.",
                "Poster":"https://m.media-amazon.com/images/M/MV5BMTQ3NzA1MTY3MV5BMl5BanBnXkFtZTgwNzE2Mzg5MTE@._V1_SX300.jpg",
                "imdbID":"tt1706620"
            },
            {
                "Title":"Pacific Rim: Uprising",
                "Year":"2018",
                "Rated":"PG-13",
                "Released":"23 Mar 2018",
                "Runtime":"111 min",
                "Genre":"Action, Adventure, Sci-Fi",
                "Director":"Steven S. DeKnight",
                "Writer":"Steven S. DeKnight, Emily Carmichael, Kira Snyder, T.S. Nowlin, Travis Beacham (based on characters created by)",
                "Actors":"John Boyega, Scott Eastwood, Cailee Spaeny, Burn Gorman",
                "Plot":"Jake Pentecost, son of Stacker Pentecost, reunites with Mako Mori to lead a new generation of Jaeger pilots, including rival Lambert and 15-year-old hacker Amara, against a new Kaiju threat.",
                "Language":"English, Mandarin, Russian",
                "Country":"UK, China, Japan, USA",
                "Awards":"5 nominations.",
                "Poster":"https://m.media-amazon.com/images/M/MV5BMjI3Nzg0MTM5NF5BMl5BanBnXkFtZTgwOTE2MTgwNTM@._V1_SX300.jpg",
                "imdbID":"tt2557478"
            },
            {
                "Title":"Get Out",
                "Year":"2017",
                "Rated":"R",
                "Released":"24 Feb 2017",
                "Runtime":"104 min",
                "Genre":"Horror, Mystery, Thriller",
                "Director":"Jordan Peele",
                "Writer":"Jordan Peele",
                "Actors":"Daniel Kaluuya, Allison Williams, Catherine Keener, Bradley Whitford",
                "Plot":"A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
                "Language":"English",
                "Country":"USA, Japan",
                "Awards":"Won 1 Oscar. Another 152 wins & 201 nominations.",
                "Poster":"https://m.media-amazon.com/images/M/MV5BMjUxMDQwNjcyNl5BMl5BanBnXkFtZTgwNzcwMzc0MTI@._V1_SX300.jpg",
                "imdbID":"tt5052448"
            },
            {
                "Title":"Hidden Figures",
                "Year":"2016",
                "Rated":"PG",
                "Released":"06 Jan 2017",
                "Runtime":"127 min",
                "Genre":"Biography, Drama, History",
                "Director":"Theodore Melfi",
                "Writer":"Allison Schroeder (screenplay by), Theodore Melfi (screenplay by), Margot Lee Shetterly (based on the book by)",
                "Actors":"Taraji P. Henson, Octavia Spencer, Janelle Monáe, Kevin Costner",
                "Plot":"The story of a team of female African-American mathematicians who served a vital role in NASA during the early years of the U.S. space program.",
                "Language":"English",
                "Country":"USA",
                "Awards":"Nominated for 3 Oscars. Another 37 wins & 85 nominations.",
                "Poster":"https://m.media-amazon.com/images/M/MV5BMzg2Mzg4YmUtNDdkNy00NWY1LWE3NmEtZWMwNGNlMzE5YzU3XkEyXkFqcGdeQXVyMjA5MTIzMjQ@._V1_SX300.jpg",
                "imdbID":"tt4846340"
            },
            {
                "Title":"Captain Marvel",
                "Year":"2019",
                "Rated":"PG-13",
                "Released":"08 Mar 2019",
                "Runtime":"123 min",
                "Genre":"Action, Adventure, Sci-Fi",
                "Director":"Anna Boden, Ryan Fleck",
                "Writer":"Anna Boden (screenplay by), Ryan Fleck (screenplay by), Geneva Robertson-Dworet (screenplay by), Nicole Perlman (story by), Meg LeFauve (story by), Anna Boden (story by), Ryan Fleck (story by), Geneva Robertson-Dworet (story by)",
                "Actors":"Brie Larson, Samuel L. Jackson, Ben Mendelsohn, Jude Law",
                "Plot":"Carol Danvers becomes one of the universe's most powerful heroes when Earth is caught in the middle of a galactic war between two alien races.",
                "Language":"English",
                "Country":"USA, Australia",
                "Awards":"7 wins & 46 nominations.",
                "Poster":"https://m.media-amazon.com/images/M/MV5BMTE0YWFmOTMtYTU2ZS00ZTIxLWE3OTEtYTNiYzBkZjViZThiXkEyXkFqcGdeQXVyODMzMzQ4OTI@._V1_SX300.jpg",
                "imdbID":"tt4154664"
            },
            {
                "Title":"Rogue One: A Star Wars Story",
                "Year":"2016",
                "Rated":"PG-13",
                "Released":"16 Dec 2016",
                "Runtime":"133 min",
                "Genre":"Action, Adventure, Sci-Fi",
                "Director":"Gareth Edwards",
                "Writer":"Chris Weitz (screenplay by), Tony Gilroy (screenplay by), John Knoll (story by), Gary Whitta (story by), George Lucas (based on characters created by)",
                "Actors":"Felicity Jones, Diego Luna, Alan Tudyk, Donnie Yen",
                "Plot":"The daughter of an Imperial scientist joins the Rebel Alliance in a risky move to steal the plans for the Death Star.",
                "Language":"English",
                "Country":"USA",
                "Awards":"Nominated for 2 Oscars. Another 24 wins & 80 nominations.",
                "Poster":"https://m.media-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg",
                "imdbID":"tt3748528"
            },
            {
                "Title":"The Old Guard",
                "Year":"2020",
                "Rated":"R",
                "Released":"10 Jul 2020",
                "Runtime":"125 min",
                "Genre":"Action, Adventure, Fantasy, Thriller",
                "Director":"Gina Prince-Bythewood",
                "Writer":"Greg Rucka (screenplay by), Greg Rucka (based on the graphic novel series by), Leandro Fernandez (illustrated by)",
                "Actors":"Charlize Theron, KiKi Layne, Matthias Schoenaerts, Marwan Kenzari",
                "Plot":"A covert team of immortal mercenaries are suddenly exposed and must now fight to keep their identity a secret just as an unexpected new member is discovered.",
                "Language":"English, Arabic, French, Italian",
                "Country":"USA",
                "Awards":"N/A",
                "Poster":"https://m.media-amazon.com/images/M/MV5BNDJiZDliZDAtMjc5Yy00MzVhLThkY2MtNDYwNTQ2ZTM5MDcxXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_SX300.jpg",
                "imdbID":"tt7556122"
            },
            {
                "Title":"City of God",
                "Year":"2002",
                "Rated":"R",
                "Released":"13 Feb 2004",
                "Runtime":"130 min",
                "Genre":"Crime, Drama",
                "Director":"Fernando Meirelles, Kátia Lund(co-director)",
                "Writer":"Paulo Lins (novel), Bráulio Mantovani (screenplay)",
                "Actors":"Alexandre Rodrigues, Leandro Firmino, Phellipe Haagensen, Douglas Silva",
                "Plot":"In the slums of Rio, two kids' paths diverge as one struggles to become a photographer and the other a kingpin.",
                "Language":"Portuguese",
                "Country":"Brazil, France, Germany",
                "Awards":"Nominated for 4 Oscars. Another 75 wins & 45 nominations.",
                "Poster":"https://m.media-amazon.com/images/M/MV5BNTM4MjZjNWEtMmQxMi00YzY5LTg4ZTAtODJlMDVkZWZmNTVhXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
                "imdbID":"tt0317248"
            },
            {
                "Title":"Moonlight",
                "Year":"2016",
                "Rated":"R",
                "Released":"18 Nov 2016",
                "Runtime":"111 min",
                "Genre":"Drama",
                "Director":"Barry Jenkins",
                "Writer":"Barry Jenkins (screenplay by), Tarell Alvin McCraney (story by)",
                "Actors":"Mahershala Ali, Shariff Earp, Duan Sanderson, Alex R. Hibbert",
                "Plot":"A young African-American man grapples with his identity and sexuality while experiencing the everyday struggles of childhood, adolescence, and burgeoning adulthood.",
                "Language":"English",
                "Country":"USA",
                "Awards":"Won 3 Oscars. Another 226 wins & 289 nominations.",
                "Poster":"https://m.media-amazon.com/images/M/MV5BNzQxNTIyODAxMV5BMl5BanBnXkFtZTgwNzQyMDA3OTE@._V1_SX300.jpg",
                "imdbID":"tt4975722"
            }
        ]
        
        for(const entry of testData) {
            filmRepo.createEntry(entry)
        }
    }
}

module.exports = new TestDataImporter()