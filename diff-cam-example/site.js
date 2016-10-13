var video = document.getElementById('video');
var canvas = document.getElementById('motion');
var score = document.getElementById('score');
var isPoolFree = document.getElementById('isPoolFree');
var scoreSample = [];
var timeSetInSec = 5;
var scoreVal;

setInterval(function(){
	if(scoreVal!=null) scoreSample.push(scoreVal);
 }, 1000);

function initSuccess() {
	DiffCamEngine.start();
}

function initError() {
	alert('Something went wrong.');
}

function capture(payload) {
	scoreVal = payload.score;
	//score.textContent = payload.score;

	if(scoreSample.length == timeSetInSec){
		var scoreTotal = 0;
		scoreSample.forEach(function(element) {
			scoreTotal += element;
		}, this);
		var scoreAvg = scoreTotal/scoreSample.length;
		scoreSample = [];
		//score.textContent = scoreAvg;
		isPoolFree.textContent = scoreAvg > 40 ? 'NO!' : 'YES!';
	}
	
}

DiffCamEngine.init({
	video: video,
	motionCanvas: canvas,
	initSuccessCallback: initSuccess,
	initErrorCallback: initError,
	captureCallback: capture
});
