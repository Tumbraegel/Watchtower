// https://plotly.com/javascript/bar-charts/#colored-and-styled-bar-chart
// LAST ACCESSED: 26/08/2020

class ReviewCriteriaChartService {

  async fetchReviewCriteria(reviews) {
    const diversity = []
    const genderEquality = []
    const queerFriendliness = []

    const reviewCriteria = { diversity, genderEquality, queerFriendliness }

    for (const review of reviews) {
      for (const value of review.reviewCriteria) {
        if (value.name == "Diversity") {
          diversity.push(value.result)
        } else if (value.name == "Gender Equality")
          genderEquality.push(value.result)
        else if (value.name == "Queer Friendliness")
          queerFriendliness.push(value.result)
      }
    }
    return reviewCriteria
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
    for(const [criterionKey, criterionValues] of Object.entries(reviewCriteria)) {
      let results = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      for(const [key, value] of Object.entries(scores)) {
        for(const entry of criterionValues) {
          if(entry == value) {
            results[key] += 1
          }
          lists[criterionKey] = results
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
    const colorArray = ['#3cba9f', '#b30059', '#4775d1']
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
      height: 400,
      width: 550,
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
