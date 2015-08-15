/*jslint
    browser: true
*/
/*global
    $
*/
/**
 * P. Brockfeld, 2015-08-04
 *
 * JavaScript for TrainTimer
 *
 */

var reactionTime = 200, //in milliseconds
    startTime = 0,
    cycleCount = 0,
    activeTime = 30, //in seconds
    pauseTime = 30, //in seconds
    isAudioUsed = false,
    timeLeft = 30, //in seconds
    isActive = false,
    isTimerRunning = false,
    displayDiv = {},
    audioPlayer = {};

function incrementTime() {
    'use strict';
    var targetTime = 0,
        currentTime = 0,
        timeLeftToNextIncrement = 0;
    timeLeft = timeLeft - 1;
    if (timeLeft <= 0) {
        if (isActive) {
            isActive = false;
            timeLeft = pauseTime;
        } else {
            isActive = true;
            timeLeft = activeTime;
        }
        $("#mainPart").toggleClass("ui-body-a ui-body-b");
    }
    displayDiv.innerHTML = timeLeft.toString();
    if (timeLeft === 5 && isAudioUsed) {
        audioPlayer.play();
    }

    cycleCount = cycleCount + 1;
    targetTime = startTime + cycleCount * 1000;
    currentTime = Date.now();
    timeLeftToNextIncrement = targetTime - currentTime;
    if (timeLeftToNextIncrement < 0) {
        //something went horribly wrong 
        isTimerRunning = false;
    } else {
        if (isTimerRunning) {
            window.setTimeout(incrementTime, timeLeftToNextIncrement);
        }
    }
}

function stopTimer() {
    'use strict';
    isTimerRunning = false; //
}

function startTimer() {
    'use strict';
    startTime = Date.now() - reactionTime;
    isActive = true;
    cycleCount = 0;
    timeLeft = activeTime + 1;
    isTimerRunning = true;
    incrementTime();
}

function toggleTimer() {
    'use strict';
    var toggleButton = document.getElementById("toggleButton");
    if (isTimerRunning) {
        isTimerRunning = false;
        toggleButton.innerHTML = "Start";
        stopTimer();
    } else {
        isTimerRunning = true;
        toggleButton.innerHTML = "Stop";
        startTimer();
    }
    $("#toggleButton").toggleClass("ui-btn-a ui-btn-b");
}

function saveSettings() {
    'use strict';
    var activeTimeInputField = document.getElementById("activeTime"),
        pauseTimeInputField = document.getElementById("pauseTime"),
        reactionTimeInputField = document.getElementById("reactionTime"),
        isAudioUsedInputField = document.getElementById("audioCheckbox"),
        settings = {};

    //crave the settings from the input fields:
    activeTime = parseInt(activeTimeInputField.value, 10);
    pauseTime = parseInt(pauseTimeInputField.value, 10);
    reactionTime = parseInt(reactionTimeInputField.value, 10);
    isAudioUsed = isAudioUsedInputField.checked;

    //put the settings in a single object:
    settings.activeTime = activeTime;
    settings.pauseTime = pauseTime;
    settings.reactionTime = reactionTime;
    settings.isAudioUsed = isAudioUsed;

    //store the whole object into local storage
    localStorage.setItem("TrainTimerSettings", JSON.stringify(settings));

    //reinitialize the timer according to the new settings:
    timeLeft = activeTime;

    displayDiv.innerHTML = timeLeft.toString();
    isTimerRunning = true;
    toggleTimer();
}

function initSettings() {
    'use strict';
    var activeTimeInputField = document.getElementById("activeTime"),
        pauseTimeInputField = document.getElementById("pauseTime"),
        reactionTimeInputField = document.getElementById("reactionTime"),
        isAudioUsedInputField = document.getElementById("audioCheckbox");
    activeTimeInputField.value = activeTime;
    pauseTimeInputField.value = pauseTime;
    reactionTimeInputField.value = reactionTime;

    if (isAudioUsed) {
        isAudioUsedInputField.setAttribute("checked", "checked");
    } else {
        isAudioUsedInputField.setAttribute("checked", "");
    }

    $("#audioCheckbox").flipswitch('refresh');
}

function init() {
    'use strict';
    //try to read from local storage
    var settings = JSON.parse(localStorage.getItem("TrainTimerSettings"));

    if (settings !== null) {
        //initialize globals:
        activeTime = settings.activeTime;
        pauseTime = settings.pauseTime;
        reactionTime = settings.reactionTime;
        isAudioUsed = settings.isAudioUsed;
    } else {
        //if nothing was found in local storage use some defaults:
        activeTime = 30;
        pauseTime = 30;
        reactionTime = 200;
        isAudioUsed = true;
    }

    //fill the display:
    timeLeft = activeTime;
    displayDiv = document.getElementById("timeLeft");
    audioPlayer = document.getElementById("audioPlayer");

    displayDiv.innerHTML = timeLeft.toString();

    //prepare the "settings" page:
    $(document).on("pageinit", "#settings", initSettings);

    isTimerRunning = true;
    toggleTimer();
}

$(document).on('pageinit', '#theTimer', init);