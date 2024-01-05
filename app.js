const express = require("express");
const app = express();

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const https = require("https");

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
	// res.send("khidki se mu nikal ke dekh le");
	const query = req.body["city name"];
	const apikey = "fbed2b2691f322df242cdf3f5f30f3ff";
	const url =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		query +
		"&units=metric&appid=" +
		apikey;
	https.get(url, function (response) {
		response.on("data", function (data) {
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const feelsLike = weatherData.main.feels_like;
			const description = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			const iconurl =
				"https://openweathermap.org/img/wn/" + icon + "@2x.png";

			res.write(`
				<body style="background:#A64253;">
					<div
						style="display: grid;
			grid-template-areas:
			  'header header header header header header'
			  'menu main main main right right'
			  'menu footer footer footer right right';
			padding: 10px;"
						class="grid-container"
					>
						<div
							style="background-color: white;
			text-align: center;
			padding: 20px 0;
			font-size: 30px;grid-area: header; "
							class="item1"
						>
							<img style='height:9rem;' src="${iconurl}">
						</div>
						<div
							style="background-color: black;
			text-align: center;
			padding: 20px 0;
			font-size: 30px;grid-area: menu;color:white;font-family:Rajhdhani; "
							class="item2"
						>
							<h1>${temp}&deg</h1>
						</div>
						<div
							style="background-color: black;
			text-align: center;
			padding: 20px 0;
			font-size: 30px;grid-area: main;color:white"
							class="item3"
						>
							<h1>${description}</h1>
						</div>
						<div
							style="background-color:#70C1B3;
			text-align: center;
			padding: 20px 0;
			font-size: 30px;grid-area: right;"
							class="item4"
						>
							<h1>feels like <br>${feelsLike}&deg</h1>
						</div>
						<div
							style="background-color: black;
			text-align: center;
			padding: 20px 0;
			font-size: 30px;grid-area: footer;color:white"
							class="item5"
						>
							<h1>${query}</h1>
						</div>
					</div>
				</body>`);

			res.send();
		});
	});
});

app.listen(3000, function () {
	console.log("server is up and running");
});

{
	/* <body style='background:#A64253;display:grid;grid-template-rows: auto auto;grid-template-columns: 1fr 1fr 1fr;justify-content:center;align-items:center;height:100vh; margin:0; padding:0; box-sizing:border-box;'>
				  <div style='grid-column: span 3; background:white; display:flex; justify-content:center; align-items:center;'>
					  <img style='height:7rem;' src="${iconurl}">
				  </div>
				  <div style="background:black;color:white; display:grid; grid-template-columns: 1fr 1fr 1fr; justify-content:center; align-items:center;">
					<h1 style='text-transform: uppercase; font-size: 35px; font-weight: 100;'>${temp}&deg;</h1>
					<h1 style='text-transform: uppercase; font-size: 35px; font-weight: 100;'>${description}</h1>
					<h1 style='text-transform: uppercase; font-size: 35px; font-weight: 100;'>${query}</h1>
				  </div>
				  <div style="background:#70C1B3; color:black; display:flex; justify-content:center; align-items:center;">
					  <h1 style='text-transform: uppercase; font-size: 35px; font-weight: 100;'>feels like ${feelsLike}&deg;</h1>
				  </div>
				</body> */
}
