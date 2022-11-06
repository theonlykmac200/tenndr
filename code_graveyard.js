//delete
tenndrRouter.delete("/:id", (req, res) => {
    User.findById(req.session.currentUser, (err, foundUser) => {
        foundUser.tenndrs.id(req.params.id).remove();
        foundUser.save((err, data) => {
            res.redirect("/tenndr");
        });
    });
});


// chart work for mood tracking


<style>
* {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
.chartMenu {
  width: 100vw;
  height: 40px;
  background: #1A1A1A;
  color: rgba(255, 26, 104, 1);
}
.chartMenu p {
  padding: 10px;
  font-size: 20px;
}
.chartCard {
  width: 100vw;
  height: calc(100vh - 40px);
  background: rgba(255, 26, 104, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.chartBox {
  width: 700px;
  padding: 20px;
  border-radius: 20px;
  border: solid 3px rgba(255, 26, 104, 1);
  background: white;
}
</style>
</head>
<body>
<div class="chartMenu">
<p>WWW.CHARTJS3.COM (Chart JS 3.9.1)</p>
</div>
<div class="chartCard">
<div class="chartBox">
  <canvas id="myChart"></canvas>
  <input id="barvalue" onkeyup="updateChart(this)" type="number">
  <input onkeyup="updateLabel(this)" type="text"> 
</div>
</div>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
// setup 
const data = {
labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
datasets: [{
  label: 'Mood Tracker',
  data: [0, 1, 1, 2, 2, 3, 3],
  backgroundColor: [
    'rgba(0, 0, 0, 0.2)'
  ],
  borderColor: [
    'rgba(0, 0, 0, 1)'
  ],
  tension: 0.4
}]
};

// config 
const config = {
type: 'line',
data,
options: {
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        maxTicksLimit: 4,
        callback: ((context, index)=> {
            let response;
            if(context === 1) {
                response = "ᕙ( ︡'︡益'︠)ง";
            }else if (context === 2) {
                response = "v( ‘.’ )v";
            }else if (context === 3) {
                response = "ᕙ(`▿´)ᕗ";
            }else {
                response = "(╥﹏╥)";
            }
            return response;
            })
        }
      }
    }
  }
};

// render init block
const myChart = new Chart(
document.getElementById('myChart'),
config
);

function updateChart(barvalues) {
console.log(barvalues.value);
myChart.config.data.datasets[0].data.push(barvalues.value);
myChart.config.data.datasets[0].data.shift();
myChart.update();
}

function updateLabel(labelname){
myChart.config.data.datasets[0].label = labelname.value
myChart.update();
}
</script>
