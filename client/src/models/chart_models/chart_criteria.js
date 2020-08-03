import axios from 'axios';

const API_URL = 'http://localhost:8000';

class ReviewCriteriaChartService {

  async getReviewDataOfSelectedFilm(filmId) {
    console.log(filmId);
    let reviews = [];
    if(filmId != '') {
      await axios.get(API_URL + '/reviews/' + filmId).then(res => {
        reviews = res.data;
      });
    } 
    
  return reviews;
}

  fetchReviewCriteria(reviews) {
    const diversity = [];
    const genderEquality = [];
    const queerFriendliness = [];

    const reviewCriteria = {diversity, genderEquality, queerFriendliness};

    for(const review of reviews) {
      for(const value of review.reviewCriteria) {
        if(value.name == "Diversity") diversity.push(value.result)
        else if (value.name == "Gender Equality") genderEquality.push(value.result)
        else if (value.name == "Queer Friendliness") queerFriendliness.push(value.result)
      }
    }
    return reviewCriteria;
  }

  getReviewCriteriaData(reviewCriteria) {
    console.log(reviewCriteria);
    const reviewCriteriaChartData = {
        // https://tobiasahlin.com/blog/chartjs-charts-to-get-you-started/#8-grouped-bar-chart
          type: 'bar',
          data: {
              labels: ['1','2','3','4','5','6','7','8','9','10'],
              datasets: [
                  {
                    label: "Diversity",
                    backgroundColor: "#3cba9f",
                    data: reviewCriteria.diversity
                  },
                  {
                    label: "Gender Equality",
                    backgroundColor: "#4775d1",
                    data: reviewCriteria.genderEquality
                  },
                  {
                    label: "Queer Friendliness",
                    backgroundColor: "#b30059",
                    data: reviewCriteria.queerFriendliness
                  }
              ],
          },
          options: {
              title: {
                  display: true,
                  text: 'Review Criteria for this Film'
              }
          }
    }
    return reviewCriteriaChartData;
  }
}

export default new ReviewCriteriaChartService();