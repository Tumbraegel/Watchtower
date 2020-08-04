import axios from 'axios';

const API_URL = 'http://localhost:8000/film';

class ScoreChartService {

  async getReviewDataOfSelectedFilm(filmId) {
    let films = [];
      if(filmId != '') {
        await axios.get(API_URL + '/reviews/' + filmId).then(res => {
          films = res.data;
        });
      } 
    return films;
  }

  fetchScores(films) {
    const scoreData = [];
    const scores = [0,0,0,0];
    
    for(const film of films) {
      scoreData.push(film.rating);
    }

    // count number of times this rating exists
    const counts = {};
    scoreData.forEach(function(x) { counts[x] = (counts[x] || 0) + 1; });

    let range1 = 0; // 1.0 - 2.5
    let range2 = 0; // 3.0 - 5.0
    let range3 = 0; // 5.5 - 7.5
    let range4 = 0; // 8.0 - 10.0

    // increment respective array element if rating in range
    for (const [key, value] of Object.entries(counts)) {
      if (key == '1' || key == '1.5' || key == '2' || key == '2.5') range1 += value;
      else if (key == '3' || key == '3.5' || key == '4' || key == '4.5' || key == '5') range2 += value;
      else if (key == '5.5' || key == '6' || key == '6.5' || key == '7' || key == '7.5') range3 += value;
      else range4 += value;
    }

    scores[0] = Number(range1);
    scores[1] = Number(range2);
    scores[2] = Number(range3);
    scores[3] = Number(range4);

    return scores;
  }

  getScoreData(scores) {
    console.log(scores);

    const scoreChartData = {
      // https://tobiasahlin.com/blog/chartjs-charts-to-get-you-started/#6-doughnut-chart
        type: 'doughnut',
        data: {
            labels: ['1.0 - 2.5', '3.0 - 5.0', '5.5 - 7.5', '8.0 - 10.0'],
            datasets: [
              {
                label: "General Score",
                backgroundColor: ["#e83e8c", "#3cba9f","#4d79ff", "#b30059"],
                data: scores
              }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'General Score'
            },
            responsive: true
        }
    }
    return scoreChartData;
  }
}

export default new ScoreChartService();