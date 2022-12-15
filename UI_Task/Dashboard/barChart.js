var xValuesBar = ["1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM"];
var yValuesBar = [55, 49, 44, 24, 15, 22, 13, 15];
var barColors = [
  "#F4F5F9",
  "#F4F5F9",
  "#2884FF",
  "#F4F5F9",
  "#F4F5F9",
  "#F4F5F9",
  "#F4F5F9",
];

new Chart("barChart", {
  type: "bar",
  data: {
    labels: xValuesBar,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValuesBar,
        fill: false,
        labels: [],
      },
    ],
  },
  options: {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            display: false,
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
        },
      ],
    },
  },
});

var xValuesLine = [
  "7 AM",
  "9 AM",
  "11 AM",
  "1 PM",
  "3 PM",
  "5 PM",
  "7 PM",
  "9 PM",
];
var yValuesLine = [
  20, 120, 180, 50, 55, 70, 100, 70, 50, 80, 30, 20, 20, 50, 70, 100,
];

new Chart("lineChart", {
  type: "line",
  data: {
    labels: xValuesLine,
    datasets: [
      {
        data: yValuesLine,
        backgroundColor: "rgba(255, 118, 76, 0.24)",
        fill: true,
      },
    ],
  },
  options: {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            display: false,
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
        },
      ],
    },
  },
});
