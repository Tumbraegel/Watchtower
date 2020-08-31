// https://plotly.com/javascript/bar-charts/#colored-and-styled-bar-chart
// LAST ACCESSED: 26/08/2020

class ReviewCriteriaChartService {

  async fetchReviewCriteria(reviews, currentReviewCriteria) {
    const data = []
    
    for(const criterion of currentReviewCriteria) {
      data.push({name: criterion, results: []})
    }

    for (const review of reviews) {
      for (const value of review.reviewCriteria) {
        for(const entry of data) {
          if(entry.name == value.name) entry.results.push(value.result)
        }
      }
    }
    return data
  }

  calculateCollectedCriteriaResults(reviewCriteria) {
    const lists = {}
    const scores = {
      0: 1,
      1: 1.5,
      2: 2,
      3: 2.5,
      4: 3,
      5: 3.5,
      6: 4,
      7: 4.5,
      8: 5,
      9: 5.5,
      10: 6,
      11: 6.5,
      12: 7,
      13: 7.5,
      14: 8,
      15: 8.5,
      16: 9,
      17: 9.5,
      18: 10,
    }
    console.log(reviewCriteria)
    for(const criterion of reviewCriteria) {
      let results = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      for(const [key, value] of Object.entries(scores)) {
        for(const entry of criterion.results) {
          if(entry == value) {
            results[key] += 1
          }
          lists[criterion.name] = results
        }
      }
    }
    return lists
  }

  getReviewCriteriaData(reviewCriteria) {
    const result = this.calculateCollectedCriteriaResults(reviewCriteria)
    const data = []

    // fixed values
    const xAxisValues = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10] 
    const colorArray = ['#b30059','#3cba9f','#4d79ff','#e83e8c']
    let count = -1

    if(Object.keys(result).length != 0) {
      for(const [key, value] of Object.entries(result)) {
        count += 1
        this[key] = {
          x: xAxisValues,
          y: value,
          name: key.charAt(0).toUpperCase() + key.slice(1), 
          marker: {color: colorArray[count]},
          type: 'bar'
        }
        data.push(this[key])
      }
    }

    const layout = {
      title: 'How users reviewed further',
      titlefont: {size: 14},
      margin: {
        l: 40,
        r: 40,
        b: 40,
        t: 150
      },
      height: 450,
      width: 500,
      xaxis: {
        title: 'Score',
          titlefont: {
            size: 12,
            color: 'rgb(107, 107, 107)'
          },
        tickfont: {  
          size: 12,
          color: 'rgb(107, 107, 107)'
        }},
      yaxis: {
        tickformat: ',d',
        title: 'Amount of reviews',
        titlefont: {
          size: 12,
          color: 'rgb(107, 107, 107)'
        },
        tickfont: {
          size: 12,
          color: 'rgb(107, 107, 107)'
        }
      },
      legend: {
        orientation:'h',
        yanchor:'bottom',
        y:1.02,
        xanchor:'bottom',
        x:0,
        bgcolor: 'rgba(255, 255, 255, 0)',
        bordercolor: 'rgba(255, 255, 255, 0)'
      },
      barmode: 'group',
      bargap: 0.1,
      bargroupgap: 0.1
    }

    result.data = data
    result.layout = layout
    return result
  }
}

export default new ReviewCriteriaChartService()
