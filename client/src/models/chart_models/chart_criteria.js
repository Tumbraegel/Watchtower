class ReviewCriteriaChartService {

  async fetchReviewCriteria(reviews) {
    await this.sleep(1000);
    const diversity = [];
    const genderEquality = [];
    const queerFriendliness = [];

    const reviewCriteria = { diversity, genderEquality, queerFriendliness };

    for (const review of reviews) {
      for (const value of review.reviewCriteria) {
        if (value.name == "Diversity") diversity.push(value.result);
        else if (value.name == "Gender Equality")
          genderEquality.push(value.result);
        else if (value.name == "Queer Friendliness")
          queerFriendliness.push(value.result);
      }
    }
    return reviewCriteria;
  }

  getReviewCriteriaData(reviewCriteria) {
    const reviewCriteriaChartData = {
      // https://tobiasahlin.com/blog/chartjs-charts-to-get-you-started/#8-grouped-bar-chart
      type: "bar",
      data: {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
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
    };
    return reviewCriteriaChartData;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new ReviewCriteriaChartService();
