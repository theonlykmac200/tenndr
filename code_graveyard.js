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


//dropdown menu for workout type
<a href="#" class="dropdown-button btn" data-activates="my_data" ></a> <span class="bolded">Workout Focus Area:

<ul class="dropdown-content" id="my_data">
                <li><a href="#!">Cardio</a></li>
                <li><a href="#!">Strength</a></li>
                <li><a href="#!">Flexibility</a></li>
                <li><a href="#!">Balance</a></li>
                <li><a href="#!">Endurance</a></li>
                <li><a href="#!">Power</a></li>
                <li><a href="#!">Speed</a></li>
                <li><a href="#!">Coordination</a></li>
                <li><a href="#!">Agility</a></li>
                <li><a href="#!">Reaction Time</a></li>
                <li><a href="#!">Stamina</a></li>
                <li><a href="#!">Muscle Tone</a></li>
               </ul>


{/* /* //for db */ */}
<h1>
        <%=tenndr.sets%>
    </h1>
    <h1>
        <%=tenndr.reps%>
    </h1>

    <h1>
                <%=tenndr.workout%>
            </h1>
            <h1>
                <%=tenndr.description%>
            </h1>
            <h1>
                <%=tenndr.duration_in_mins%>
            </h1>
            <h1>
                <%=tenndr.mood_before%>
            </h1>
            <h1>
                <%=tenndr.mood_after%>
            </h1>


{/* dashboard */}

<h2> Workout history</h2>
        
        <div>
            <ul>
                <% for (var i = 0; i < tenndr.length; i++) { %>
                    <li>
                        <a href="/tenndr/<%= tenndr[i]._id %>">
                            <%= tenndr[i].workout %>
                        </a>
                    </li>
                <% } %>
            </ul>
        </div>
        <div>
          <h2>Mood Chart</h2>
            <ul>
              <% for (var i = 0; i < tenndr.length; i++) { %>
                  <li>
                      <a href="/tenndr/<%= tenndr[i]._id %>">
                          <%= tenndr[i].mood_after %>
                      </a>
                  </li>
                  <% } %>
            </ul>

            <form action="/sessions?_method=DELETE" method="POST">
                <input class ="waves-effect amber waves-light btn" type="submit" value="Log Out" />
              </form>
      <a class ="waves-effect amber waves-light btn" href="/tenndr/new"><span class="white-text darken-3">Add a workout</span></a>

   
      
