class ScatterPlot {
    async fetchData(data, reviewCriteria) {
       const collectedCriteriaAndTheiritems = []
       for(const criterion of reviewCriteria) {
        collectedCriteriaAndTheiritems.push({name: criterion, results: []})
       }

       for(const entry of data) {
        for(const list of entry.criteria) {
            for(const item of list) {
                for(const criterion of collectedCriteriaAndTheiritems) {
                    if (item.name == criterion.name)
                      criterion.results.push({
                        score: Number(item.result),
                        genre: entry.genre,
                      })
                    }
                }
            }
        }
       const preparedData = await this.prepareData(collectedCriteriaAndTheiritems)
       return preparedData
    }

    prepareData(data) {
       const result = []

       for(const entry of data) {
        const list = {criterion: entry.name, results: []}

            for(const value of entry.results) {
                const extractedGenres = value.genre.split(',')
                for(const item of extractedGenres) {
                    list.results.push({genre: item.replace(/\s/g,''), score: value.score})
                }
            }
            result.push(list)
        }
       return result
    }

    createPlot(preparedData, genres, criterion) {
        const result = {}
        const data = []
        const xAxisData = genres
        const yAxisData = []

        for(const entry of preparedData) {    
            if(entry.criterion == criterion) {
                for(const genre of genres) {
                    yAxisData.push([]) // push empty array for each existing genre
                    for(const item of entry.results) {   
                        if(item.genre == genre) {
                            const genreIndex = genres.indexOf(genre)
                            yAxisData[genreIndex].push(item.score)
                        }
                    }    
                }
            }
        }

        for(let i=0; i<xAxisData.length; i++) {
            const result = {
                type: 'box',
                y: yAxisData[i],
                name: xAxisData[i],
                boxpoints: 'all',
                jitter: 0.5,
                whiskerwidth: 0.3,
                fillcolor: 'cls',
                marker: {
                    size: 5
                },
                line: {
                    width: 1
                }
            }
            data.push(result)
        }

          
        const layout = {
            title: 'Collected Review Scores Regarding "' + criterion + '" for all Genres',
            yaxis: {
                autorange: true,
                showgrid: true,
                zeroline: true,
                dtick: 1,
                gridcolor: 'rgb(255, 255, 255)',
                gridwidth: 1,
                zerolinecolor: 'rgb(255, 255, 255)',
                zerolinewidth: 2
            },
            margin: {
                l: 40,
                r: 30,
                b: 40,
                t: 100
            },
            paper_bgcolor: 'rgb(243, 243, 243)',
            plot_bgcolor: 'rgb(243, 243, 243)',
            showlegend: false
        }

        result.data = data
        result.layout = layout
        return result
    }
}

export default new ScatterPlot()