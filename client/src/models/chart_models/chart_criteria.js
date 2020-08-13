class ReviewCriteriaChartService {

  async fetchReviewCriteria(reviews) {
    await this.sleep(1000)
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
    console.log(reviewCriteria)
    return reviewCriteria
  }

  calculateLabels(reviewCriteria) {
    let countGenderEquality = {}
    let countDiversity = {}
    let countQueerFriendliness = {}
    const labels = []
  
    reviewCriteria.diversity.forEach(function(x) {countDiversity[x] = (countDiversity[x] || 0) + 1})
    reviewCriteria.genderEquality.forEach(function(x) {countGenderEquality[x] = (countGenderEquality[x] || 0) + 1})
    reviewCriteria.queerFriendliness.forEach(function(x) {countQueerFriendliness[x] = (countQueerFriendliness[x] || 0) + 1})

    Object.values(countDiversity).forEach(function (value) { if(!(labels.includes(value + "x"))) labels.push(value + "x") })
    Object.values(countGenderEquality).forEach(function (value) { if(!(labels.includes(value + "x"))) labels.push(value + "x") })
    Object.values(countQueerFriendliness).forEach(function (value) { if(!(labels.includes(value + "x"))) labels.push(value + "x") })
    
    return labels
  }

  getReviewCriteriaData(reviewCriteria) {
    const labels = this.calculateLabels(reviewCriteria)
    console.log(labels)

    const reviewCriteriaChartData = {
      // https://tobiasahlin.com/blog/chartjs-charts-to-get-you-started/#8-grouped-bar-chart
      type: "bar",
      data: {
        labels: labels.sort(),
        datasets: [
          {
            label: "Diversity",
            backgroundColor: "#3cba9f",
            data: reviewCriteria.diversity,
          },
          {
            label: "Gender Equality",
            backgroundColor: "#4775d1",
            data: reviewCriteria.genderEquality,
          },
          {
            label: "Queer Friendliness",
            backgroundColor: "#b30059",
            data: reviewCriteria.queerFriendliness,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Review Criteria for this Film",
        },
      },
    }
    return reviewCriteriaChartData
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

export default new ReviewCriteriaChartService()
