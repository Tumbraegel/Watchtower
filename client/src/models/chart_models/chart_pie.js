// https://plotly.com/javascript/pie-charts/#donut-chart
// LAST ACCESSED: 26/08/2020

class ScoreChartService {

  fetchScores(reviews) {
    const result = {type: 'rating', values: [], labels: ['1.0 - 2.5', '3.0 - 5.0', '5.5 - 7.5', '8.0 - 10.0']}
    const scoreData = []
    const scores = [0,0,0,0]
    
    for(const review of reviews) {
      scoreData.push(review.rating)
    }

    // count number of times this rating exists
    const counts = {}
    scoreData.forEach(function(x) { counts[x] = (counts[x] || 0) + 1 })

    let range1 = 0 // 1.0 - 2.5
    let range2 = 0 // 3.0 - 5.0
    let range3 = 0 // 5.5 - 7.5
    let range4 = 0 // 8.0 - 10.0

    // increment respective array element if rating in range
    for (const [key, value] of Object.entries(counts)) {
      if (key == '1' || key == '1.5' || key == '2' || key == '2.5') range1 += value
      else if (key == '3' || key == '3.5' || key == '4' || key == '4.5' || key == '5') range2 += value
      else if (key == '5.5' || key == '6' || key == '6.5' || key == '7' || key == '7.5') range3 += value
      else range4 += value
    }

    scores[0] = Number(range1)
    scores[1] = Number(range2)
    scores[2] = Number(range3)
    scores[3] = Number(range4)

    result.values = scores

    return result
  }

  fetchCriteriaScores(reviews, currentReviewCriteria) {
    const result = {type: 'reviewCriteria', values: [], labels: []}
    const data = []

    for(const criterion of currentReviewCriteria) {
      data.push({name: criterion, amount: 0})
    }

    for(const review of reviews) {
      for(const value of review.reviewCriteria) {
        for(const entry of data) {
          if(entry.name == value.name) {
            entry.amount += 1
          }
        }
      }
    }
    for(const entry of data) {
      result.labels.push(entry.name)
      result.values.push(entry.amount)
    }
    console.log(result)
    return result
  }

  getScoreData(data) {
    console.log(data.labels)
    const result = {}
    
    var chartData = [
      {
        values: data.values,
        labels: data.labels,
        name: 'Score',
        hoverinfo: 'label+percent',
        hole: .6,
        type: 'pie',
        marker: {
          colors: ["#e83e8c", "#3cba9f","#4d79ff", "#b30059"]
        }
      }
    ]

    var layout = {
      annotations: [
        {
          font: {
            size: 16
          },
          showarrow: false,
          text: 'Score',
        },
      ],
      margin: {
        l: 40,
        r: 40,
        b: 40,
        t: 40
      },
      legend: {
        orientation:'h',
      },
      height: 250,
      width: 300,
      showlegend: true
    }

    result.data = chartData
    result.layout = layout
    return result
  }
}

export default new ScoreChartService()