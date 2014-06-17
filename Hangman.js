var map = new Object();
var unknownChar = "˗";
var successSound = new Audio("media/successful.mp3");
var correctChoice = new Audio("media/click_char.mp3");
var wrongChoice = new Audio("media/enter_invalid.mp3");

function HangmanData() {
	this.question = new Array();
	this.answer = new Array();
	this.AnswerArray = new Array();
	this.CurrAnswer = new Array();
	this.quesDisplay = new Array();
	this.count = 0;
	this.remainingAttempts = 6;
	this.num = 0;
	this.layout = 'default';
	this.startTime = null;
	this.endTime = null;
}
function timeElapsed(weeks, days, hours, minutes, seconds, milliseconds) {
	// three elements in interval, first is minutes, second is seconds, third is
	// milliseconds
	var interval = new Array();
	interval[0] = weeks;
	interval[1] = days;
	interval[2] = hours;
	interval[3] = minutes;
	interval[4] = seconds;
	interval[5] = milliseconds;
	return interval;
}

function calculateTime(gStartTime, gEndTime) {
	var milliseconds = 0;
	var seconds = 0;
	var minutes = 0;
	var hours = 0;
	var days = 0;
	var weeks = 0;
	if (gStartTime == undefined) {
		return timeElapsed(0, 0, 0);
	}
	if (gEndTime == undefined) {
		return timeElapsed(0, 0, 0);
	}

	var diff = gEndTime - gStartTime;
	milliseconds = diff;

	if (milliseconds >= 1000) {
		seconds = Math.floor(milliseconds / 1000);
		milliseconds = milliseconds % 1000;
	}

	if (seconds >= 60) {
		minutes = Math.floor(seconds / 60);
		seconds = seconds % 60;
	}

	if (minutes >= 60) {
		hours = Math.floor(minutes / 60);
		minutes = minutes % 60;
	}

	if (hours >= 24) {
		days = Math.floor(hours / 24);
		hours = hours % 24;
	}
	if (days >= 7) {
		weeks = Math.floor(days / 7);
		days = days % 7;
	}

	var interval = new Array();
	interval[0] = weeks;
	interval[1] = days;
	interval[2] = hours;
	interval[3] = minutes;
	interval[4] = seconds;
	interval[5] = milliseconds;
	return interval;
}

function showTime(gStartTime, gEndTime, gameNo) {
	var interval = calculateTime(gStartTime, gEndTime);
	var timeStr = "Time taken: ";
	var weeksStr = "";
	var daysStr = "";
	var hoursStr = "";
	var minutesStr = "";
	var secondsStr = "";
	var beforeFirst = true;
	// for weeks info

	if (interval[0] > 1) {
		weeksStr = interval[0] + " weeks ";
		beforeFirst = false;
	} else if (interval[0] == 1) {
		weeksStr = interval[0] + " week ";
		beforeFirst = false;
	} else if (interval[0] == 0) {
		if (beforeFirst == false) {
			weeksStr = interval[0] + " week ";
		}
	}

	// for days info
	if (interval[1] > 1) {
		daysStr = interval[1] + " days ";
		beforeFirst = false;
	} else if (interval[1] == 1) {
		daysStr = interval[1] + " day ";
		beforeFirst = false;
	} else if (interval[1] == 0) {
		if (beforeFirst == false) {
			daysStr = interval[1] + " day ";
		}
	}
	// for hours info
	if (interval[2] > 1) {
		hoursStr = interval[2] + " hours ";
		beforeFirst = false;
	} else if (interval[2] == 1) {
		hoursStr = interval[2] + " hour ";
		beforeFirst = false;
	} else if (interval[2] == 0) {
		if (beforeFirst == false) {
			hoursStr = interval[2] + " hour ";
		}
	}
	// for minutes info
	if (interval[3] > 1) {
		minutesStr = interval[3] + " minutes ";
		beforeFirst = false;
	} else if (interval[3] == 1) {
		minutesStr = interval[3] + " minute ";
		beforeFirst = false;
	} else if (interval[3] == 0) {
		if (beforeFirst == false) {
			minutesStr = interval[3] + " minute ";
		}
	}
	// for seconds info
	if (interval[4] > 1) {
		secondsStr = interval[4] + " seconds ";
	} else {
		secondsStr = interval[4] + " second ";
	}
	timeStr = timeStr + weeksStr + daysStr + hoursStr + minutesStr + secondsStr;
	// alert(timeStr);
	return timeStr;
}

function playSound(filePath) {
	var snd = new Audio(filePath); // buffers automatically when created
	snd.play();
}
function chkAnswer(OuterDiv) {
	var Hdata2 = map[OuterDiv];
	for ( var i = 0; i < Hdata2.AnswerArray.length; i++) {
		if (Hdata2.AnswerArray[i] != Hdata2.CurrAnswer[i]) {
			return false;
		}
	}
	successSound.play();
	return true;
}
function createProblemDiv(OuterDiv, showQuestion, showAnswer) {
	var Hdata = map[OuterDiv];
	Hdata.remainingAttempts = 6;
	var outerDivObj = document.getElementById(OuterDiv);
	var ProblemDiv = document.createElement("div");
	var QuestionArray = showQuestion.split(" ");
	var QuestionLabel = document.createElement("label");
	QuestionLabel.id = OuterDiv + "lb_Question";
	QuestionLabel.innerHTML = showQuestion;
	ProblemDiv.appendChild(QuestionLabel);
	ProblemDiv.className = 'problemContainer';
	ProblemDiv.id = OuterDiv + "div_problem";

	var br = document.createElement('br');
	ProblemDiv.appendChild(br);

	var AnswerArray = new Array(showAnswer.length);
	var CurrAnswer = new Array(showAnswer.length);

	for ( var i = 0; i < AnswerArray.length; i++) {
		if ((showAnswer.charCodeAt(i) >= 65 && showAnswer.charCodeAt(i) <= 90)
				|| (showAnswer.charCodeAt(i) >= 97 && showAnswer.charCodeAt(i) <= 122)
				|| (showAnswer.charCodeAt(i) >= 48 && showAnswer.charCodeAt(i) <= 57)) {
			AnswerArray[i] = showAnswer.charAt(i);
			CurrAnswer[i] = unknownChar;
			var thelabel = document.createElement("label");
			var textNode = document.createTextNode(unknownChar);
			thelabel.appendChild(textNode);
			thelabel.id = OuterDiv + "lb_answer" + i;
			thelabel.value = i;
			ProblemDiv.appendChild(thelabel);
		} else {
			AnswerArray[i] = showAnswer.charAt(i);
			CurrAnswer[i] = showAnswer.charAt(i);
			var thelabel = document.createElement("label");
			var textNode = document.createTextNode(showAnswer.charAt(i));
			thelabel.appendChild(textNode);
			thelabel.id = OuterDiv + "lb_answer" + i;
			thelabel.value = i;
			ProblemDiv.appendChild(thelabel);
		}
	}
	outerDivObj.appendChild(ProblemDiv);
	Hdata.AnswerArray = AnswerArray;
	Hdata.CurrAnswer = CurrAnswer;
	map[OuterDiv] = Hdata;
}
function createSolveDiv(OuterDiv) {
	var outerDivObj = document.getElementById(OuterDiv);
	var SolveDiv = document.createElement("div");

	SolveDiv.className = 'container4';
	SolveDiv.id = OuterDiv + "div_solve";
	for ( var i = 65; i <= 90; i++) {
		var thelabel = document.createElement("label");
		var textNode = document.createTextNode(String.fromCharCode(i));
		thelabel.appendChild(textNode);
		thelabel.id = OuterDiv + "lb_solve" + i;
		thelabel.value = String.fromCharCode(i);
		thelabel.className = 'labelcolor1';
		thelabel.onclick = function() {
			var Hdata = map[OuterDiv];
			if (Hdata.startTime == null) {
				Hdata.startTime = new Date();
			}
			var bool = false;
			var correct = false;
			var str = this.value;
			var str2 = String.fromCharCode(str.charCodeAt(0) + 32);
			for ( var i = 0; i < Hdata.AnswerArray.length; i++) {
				// alert(Hdata.AnswerArray[i]);
				if (Hdata.AnswerArray[i] == str) {
					var a = document.getElementById(OuterDiv + "lb_answer" + i);
					var newChild = document.createTextNode(str);
					var oldChild = a.childNodes[0];
					a.replaceChild(newChild, oldChild);
					Hdata.CurrAnswer[i] = str;
					this.className = 'labelcolor3';
					bool = true;
					correct = true;
					map[OuterDiv] = Hdata;
					correctChoice.play();
					// playSound("media/click_char.mp3");
					if (chkAnswer(OuterDiv)) {
						callFunction(OuterDiv);
						return;
					}

				} else if (Hdata.AnswerArray[i] == str2) {
					var a = document.getElementById(OuterDiv + "lb_answer" + i);
					var newChild = document.createTextNode(str2);
					var oldChild = a.childNodes[0];
					a.replaceChild(newChild, oldChild);
					Hdata.CurrAnswer[i] = str2;
					this.className = 'labelcolor3';
					bool = true;
					correct = true;
					map[OuterDiv] = Hdata;
					correctChoice.play();
					// playSound("media/click_char.mp3");
					if (chkAnswer(OuterDiv)) {
						// alert("You did it!!!");
						setTimeout(callFunction(OuterDiv), 2000);
						return;
					}
				}
			}
			if (!bool) {
				wrongChoice.play();
				// playSound("media/enter_invalid.mp3");
				this.className = 'labelcolor2';
			}
			if (!correct) {
				Hdata.remainingAttempts -= 1;
				map[OuterDiv] = Hdata;
				refreshImage(OuterDiv);
				if (Hdata.remainingAttempts == 0) {
					exitGame(OuterDiv);
					// alert("Game Over");
					return;
				}
			}
			this.onclick = function() {

			}
		}
		SolveDiv.appendChild(thelabel);
		var space = document.createElement("label");
		var spaceNode = document.createTextNode(" ");
		space.appendChild(spaceNode);
		SolveDiv.appendChild(space);
	}
	var br = document.createElement('br');
	SolveDiv.appendChild(br);
	for ( var i = 48; i <= 57; i++) {
		var thelabel = document.createElement("label");
		var textNode = document.createTextNode(String.fromCharCode(i));
		thelabel.appendChild(textNode);
		thelabel.id = OuterDiv + "lb_solve" + i;
		thelabel.value = String.fromCharCode(i);
		thelabel.className = 'labelcolor1';
		thelabel.onclick = function() {
			var Hdata = map[OuterDiv];
			if (Hdata.startTime == null) {
				Hdata.startTime = new Date();
			}
			var correct = false;
			var bool = false;
			var str = this.value;
			for ( var i = 0; i < Hdata.AnswerArray.length; i++) {
				if (Hdata.AnswerArray[i] == str) {
					var a = document.getElementById(OuterDiv + "lb_answer" + i);
					var newChild = document.createTextNode(str);
					var oldChild = a.childNodes[0];
					a.replaceChild(newChild, oldChild);
					Hdata.CurrAnswer[i] = str;
					this.className = 'labelcolor3';
					correct = true;
					bool = true;
					map[OuterDiv] = Hdata;
					correctChoice.play();
					if (chkAnswer(OuterDiv)) {
						callFunction(OuterDiv);
						return;
					}
				}
			}
			if (!bool) {
				wrongChoice.play();
				this.className = 'labelcolor2';
			}
			if (!correct) {
				Hdata.remainingAttempts -= 1;
				map[OuterDiv] = Hdata;
				refreshImage(OuterDiv);
				if (Hdata.remainingAttempts == 0) {
					exitGame(OuterDiv);
					return;
				}
			}
			this.onclick = function() {

			}
		}
		SolveDiv.appendChild(thelabel);
		var space = document.createElement("label");
		var spaceNode = document.createTextNode(" ");
		space.appendChild(spaceNode);
		SolveDiv.appendChild(space);
	}
	outerDivObj.appendChild(SolveDiv);
}
function createImageDiv(OuterDiv) {
	var outerDivObj = document.getElementById(OuterDiv);
	var ImageDiv = document.createElement("div");
	ImageDiv.className = 'container1';
	ImageDiv.id = OuterDiv + "div_image";
	outerDivObj.appendChild(ImageDiv);
}
function refreshImage(OuterDiv) {
	var Hdata = map[OuterDiv];
	var layout = Hdata.layout;
	var imgNo = 7 - Hdata.remainingAttempts;
	var elem = document.createElement("img");
	elem.setAttribute("src", "images/hang_" + imgNo + ".gif");
	if (layout === "regular") {
		elem.className = "regularLayout";
	}
	if (layout === "wide") {
		elem.className = "wideLayout";
	}
	if (layout === "tall") {
		elem.className = "tallLayout";
	}

	var imgDiv = document.getElementById(OuterDiv + "div_image");
	while (imgDiv.hasChildNodes()) {
		imgDiv.removeChild(imgDiv.lastChild);
	}
	imgDiv.appendChild(elem);
}

function createPuzzles(OuterDiv, Question, Answer, gameProgress) {

	var OuterDivObj = document.getElementById(OuterDiv);
	while (OuterDivObj.hasChildNodes()) {
		OuterDivObj.removeChild(OuterDivObj.lastChild);
	}
	createImageDiv(OuterDiv);
	if (map[OuterDiv].count > 1) {
		createStatusDiv(OuterDiv, gameProgress);
	}
	createProblemDiv(OuterDiv, Question, Answer);
	createSolveDiv(OuterDiv);

	createTextBox(OuterDiv);
	refreshImage(OuterDiv);

}
function hangmanApp(div_id, questions, answers, count, layout) {
	ques = questions.split("\n");
	ans = answers.split("\n");
	quesCount = ques.length;
	ansCount = ans.length;
	map[div_id] = new HangmanData();
	var setData = map[div_id];
	setData.count = count;
	if(count===0){
		   setData.count = ansCount;
		}else{
			setData.count = count;
			}
	setData.layout = layout;
	var i = 0;
	while (i != ansCount) {
		if (i >= (quesCount - 1)) {
			setData.question[i] = ques[quesCount - 1];
		} else {
			setData.question[i] = ques[i]; //populating the questions for game object
		}
		setData.answer[i] = ans[i];// populating the answers for game object
		i++;
	}
	if (count > ansCount) {
		while (i != count) {//till this point i will be equal to no. of questions captured.
			randomPicker = Math.floor((Math.random() * (ansCount)));
			setData.question[i] = ques[randomPicker];// picking the questions randomly to match the count value
			setData.answer[i] = ans[randomPicker];// picking the answers(for same index as question) randomly to match the count value
			i++;
		}
	}

	generateHangman(div_id);
}
function generateHangman(div_id) {//TODO : fix this method for picking questions randomly from the entire collection.
	map[div_id].quesDisplay = new Array(map[div_id].count);

	var tempMap = new Object();
	tempMap["quest"] = map[div_id].question;
	tempMap["ans"] = map[div_id].answer;

	tempMap = shuffle(tempMap);

	map[div_id].question = tempMap["quest"];
	map[div_id].answer = tempMap["ans"];

	for(var i=0;i<map[div_id].count;i++){
        map[div_id].quesDisplay[i] = i;
	}

	callFunction(div_id);
}

function shuffle(tempMap) {
	var questionArray = tempMap["quest"];
	var answerArray = tempMap["ans"];
    var counter = questionArray.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        var quesTemp = questionArray[counter];
        questionArray[counter] = questionArray[index];
        questionArray[index] = quesTemp;

        var ansTemp = answerArray[counter];
		answerArray[counter] = answerArray[index];
        answerArray[index] = ansTemp;
    }
    tempMap["quest"] = questionArray;
    tempMap["ans"] = answerArray;
    return tempMap;
}


function disable(div_id) {
	for ( var i = 65; i <= 90; i++) {
		var thelabel = document.getElementById(div_id + "lb_solve" + i);
		thelabel.onclick = function() {
		}
	}
	for ( var i = 48; i <= 57; i++) {
		var thelabel = document.getElementById(div_id + "lb_solve" + i);
		thelabel.onclick = function() {
		}
	}
	var txtBox = document.getElementById(div_id + "txt_guess");
	txtBox.style.visibility = "hidden";
	txtBox.blur();
}

function callFunction(div_id) {
	data = map[div_id];
	count = data.quesDisplay.length;
	data.num = data.num + 1;
	map[div_id] = data;
	if (data.num <= count) {
		if (data.num == 1) {
			createPuzzles(div_id,
					data.question[data.quesDisplay[data.num - 1]],
					data.answer[data.quesDisplay[data.num - 1]], data.num)
		} else {
			disable(div_id);
			setTimeout(function() {
				createPuzzles(div_id,
						data.question[data.quesDisplay[data.num - 1]],
						data.answer[data.quesDisplay[data.num - 1]], data.num)
			}, 2000);
		}

	}
	if (data.num > count) {
		a(div_id);
	}
}

function myFunction() {
	myVar = setInterval(function() {
		alert("Hello")
	}, 1000);
}
function a(div_id) {

	disable(div_id);
	data = map[div_id];
	data.endTime = new Date();
	var timeInfo = showTime(data.startTime.getTime(), data.endTime.getTime(),
			div_id);
	alert("You got it right!!\n" + timeInfo + " \n");

}

function createStatusDiv(OuterDiv, gameProgress) {
	// var Hdata = map[OuterDiv];
	var outerDivObj = document.getElementById(OuterDiv);
	var StatusDiv = document.createElement("div");
	StatusDiv.className = 'statusContainer';
	StatusDiv.id = OuterDiv + "div_status";
	var thelabel = document.createElement("label");
	var textNode = document.createTextNode(gameProgress + " / "
			+ map[OuterDiv].count);
	thelabel.appendChild(textNode);
	thelabel.id = OuterDiv + "status";
	thelabel.value = (gameProgress + " / " + map[OuterDiv].count);
	thelabel.className = 'statusLabel';
	StatusDiv.appendChild(thelabel);
	outerDivObj.appendChild(StatusDiv);

}

function createTextBox(OuterDiv) {
	var outerDivObj = document.getElementById(OuterDiv);
	var textDiv = document.createElement("div");
	textDiv.className = 'textboxContainer';
	textDiv.id = OuterDiv + "div_text";
	var textLabel = document.createElement("label");
	var value = document.createTextNode("Guess a letter or a number:");
	textLabel.id = OuterDiv + "lb_text";
	textLabel.appendChild(value);
	textDiv.appendChild(textLabel);

	var textInput = document.createElement("input");
	textInput.setAttribute("type", "text");
	textInput.setAttribute("maxlength", "1");
	textInput.setAttribute("onkeydown", "if (event.keyCode == 13) replaceChar("
			+ OuterDiv + ");");
	textInput.id = OuterDiv + "txt_guess";
	textDiv.appendChild(textInput);

	outerDivObj.appendChild(textDiv);
}
function replaceChar(outerDiv) {
	var Hdata = map[outerDiv];
	if (Hdata.startTime == null)
		Hdata.startTime = new Date();
	var inpBox = document.getElementById(outerDiv + "txt_guess");
	str = inpBox.value;
	if (str.charCodeAt(0) >= 97 && str.charCodeAt(0) <= 122)
		str = String.fromCharCode(str.charCodeAt(0) - 32);

	if ((str.charCodeAt(0) >= 48 && str.charCodeAt(0) <= 57)
			|| (str.charCodeAt(0) >= 65 && str.charCodeAt(0) <= 90)) {
		var id = outerDiv + "lb_solve" + str.charCodeAt(0);
		var thelabel = document.getElementById(id);
		thelabel.click();
	}
	inpBox.value = "";

}

function exitGame(outerDiv) {

	disable(outerDiv);
	alert("Game Over");
	return;
}