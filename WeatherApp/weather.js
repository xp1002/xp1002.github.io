

/* called when new weather arrives */

function callbackFunction(data) {
	var cityinfo = data.query.results.channel;

	var time = new Date();
	var locale = cityinfo.language;
	timeday = time.toLocaleString(locale, { hour: 'numeric',minute:'numeric', hour12: true });
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    document.getElementById("today").innerHTML = "Today " + timeday.toLocaleLowerCase();
    document.getElementById("today1").innerHTML = "Today " + timeday.toLocaleLowerCase();
	document.getElementById("date").innerHTML = monthNames[time.getMonth()] + ' ' + time.toLocaleString(locale,{day:'numeric'}) + ', ' + time.toLocaleString(locale,{year:'numeric'});

	var text = ["Partly Sunny","Rain","Cloudy","Sunny","Mostly Cloudy","Partly Cloudy","Mostly Sunny","Breezy","Windy","Thunder","Snow","Clear"];
	var pic = ["../WeatherApp/part-sun.png","../WeatherApp/rain.png","../WeatherApp/cloudy.png", "../WeatherApp/sunny.png","../WeatherApp/cloudy.png","../WeatherApp/part-sun.png","../WeatherApp/snow.png","../WeatherApp/snow.png","../WeatherApp/snow.png","../WeatherApp/thunder.png","../WeatherApp/snow.png","../WeatherApp/snow.png"];
	document.getElementById("pic").src = pic[text.indexOf(cityinfo.item.condition.text)];

	document.getElementById("city").innerHTML = cityinfo.location.city + ", " + cityinfo.location.region;
	document.getElementById("degree").innerHTML = cityinfo.item.condition.temp;
	document.getElementById("drop").innerHTML = cityinfo.atmosphere.humidity + "%";
	document.getElementById("wind").innerHTML = cityinfo.wind.speed + "mph";
	document.getElementById("condition").innerHTML = cityinfo.item.condition.text.toLocaleLowerCase();

	var days = document.getElementsByClassName("day");
	var weathers = document.getElementsByClassName("weather");
	var wtexts = document.getElementsByClassName("wtext");
	var high = document.getElementsByClassName("high");
	var low = document.getElementsByClassName("low");

	var n = days.length;
	for (i = 0; i < n; i++) { 
		days[i].textContent = cityinfo.item.forecast[i].day;
		weathers[i].src = pic[text.indexOf(cityinfo.item.forecast[i].text)];
		wtexts[i].textContent = cityinfo.item.forecast[i].text.toLocaleLowerCase();
		high[i].innerHTML = cityinfo.item.forecast[i].high + "°";
		low[i].innerHTML = cityinfo.item.forecast[i].low + "°";
	}
}

function init() {

	var left = 0;
	var range = document.getElementById("range"); 
	var rangeWidth = range.clientWidth;
	var container = range.parentElement;
	var inwidth = container.clientWidth;
	var steppers = document.getElementsByClassName("stepper");
	var forecast = document.getElementsByClassName("forecast"); 

	var n = steppers.length; 
	for (i = 0; i < n; i++) { 
		if (left < i*rangeWidth) {
			left = left+20;
		}
		forecast[i].style.width = (inwidth - 240 )/ 5 + "px";
		steppers[i].style.left = left+"px";
	} 
}

function buttonLeft() {
	// left = 0;
	var range = document.getElementById("range"); 
	var rangeWidth = range.clientWidth;
	var container = range.parentElement;
	var inwidth = container.clientWidth;

	var steppers = document.getElementsByClassName("stepper"); 
	var forecast = document.getElementsByClassName("forecast"); 

	picwidth = (inwidth - 240 )/ 5;

	var n = steppers.length;
	var index = 5;
	for (i = 0; i < n; i++) { 
		var temp = parseFloat(steppers[i].style.left);
		if (temp < 0) {
			temp = parseFloat(steppers[i].style.left) + picwidth + 20;
		}
		steppers[i].style.left = temp+"px";
	} 
}

function buttonRight() {
	var range = document.getElementById("range"); 
	var rangeWidth = range.clientWidth;
	var container = range.parentElement;
	var inwidth = container.clientWidth;

	var steppers = document.getElementsByClassName("stepper"); 
	var forecast = document.getElementsByClassName("forecast"); 

	picwidth = (inwidth - 240 )/ 5; 
	var n = steppers.length; 
	var index = 5;
	for (i = 0; i < n; i++) { 
		var temp = parseFloat(steppers[i].style.left);
		if (temp > -(5*picwidth + (index-i)*20)) {	
			var temp = parseFloat(steppers[i].style.left) - picwidth - 20;
		}
		steppers[i].style.left = temp+"px";
	} 
}

function gotNewPlace() {
	// get what the user put into the textbox
	var newPlace = document.getElementById("zipbox").value;

	// make a new script element
	var script = document.createElement('script');

	// start making the complicated URL
	script.src = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+newPlace+"')&format=json&callback=callbackFunction"
	script.id = "jsonpCall";

	// remove old script
	var oldScript = document.getElementById("jsonpCall");
	if (oldScript != null) {
		document.body.removeChild(oldScript);
	}

	// put new script into DOM at bottom of body
	document.body.appendChild(script);
}