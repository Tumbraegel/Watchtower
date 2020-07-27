// https://tobiasahlin.com/blog/chartjs-charts-to-get-you-started/#8-grouped-bar-chart
export const reviewCriteriaChartData = {
    type: 'bar',
    data: {
        labels: ['1','2','3','4','5','6','7','8','9','10'],
        datasets: [
            {
              label: "Diversity",
              backgroundColor: "#3cba9f",
              data: [2,3,2,5,2,7,5,12,15,7]
            },
            {
              label: "Gender Equality",
              backgroundColor: "#4775d1",
              data: [4,1,6,7,3,8,7,13,4,7]
            },
            {
              label: "Queer Friendliness",
              backgroundColor: "#b30059",
              data: [6,8,5,4,13,12,5,8,6,7]
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

export default reviewCriteriaChartData;