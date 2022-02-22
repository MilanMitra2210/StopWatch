$(function () {
    var mode = 0;
    var timeCounter = 0;
    var lapCounter = 0;
    var action;
    var lapNumber = 0;

    var timeMinutes, timeSeconds, timeCentiSeconds, lapMinutes, lapSeconds, lapCentiSeconds;

    hideShowButtons("#startButton", "#lapButton");

    $("#startButton").click(function () {
        mode = 1;
        hideShowButtons("#stopButton", "#lapButton");

        startAction();
    });

    $("#stopButton").click(function () {
        hideShowButtons("#resumeButton", "#resetButton");

        clearInterval(action);
    });
    $("#resumeButton").click(function () {
        hideShowButtons("#stopButton", "#lapButton");

        startAction();
    });
    $("#resumeButton").click(function () {
        hideShowButtons("#stopButton", "#lapButton");

        startAction();
    });
    $("#resetButton").click(function () {
        location.reload();
        
    });
    $("#lapButton").click(function () {
        if (mode) {
            clearInterval(action);
            lapCounter = 0;
            addLap();

            startAction();
        }

    });










    function hideShowButtons(x, y) {
        $(".control").hide();
        $(x).show();
        $(y).show();
    }
    function startAction() {
        action = setInterval(() => {
            timeCounter++;
            if (timeCounter == 100*60*100) {
                timeCounter = 0;
            }
            lapCounter++;
            if (lapCounter == 100*60*100) {
                lapCounter = 0;
            }
            updateTime();
        }, 10);
    }
    function updateTime() {
        timeMinutes = Math.floor(timeCounter / 6000);
        timeSeconds = Math.floor((timeCounter % 6000) / 100);
        timeCentiSeconds = (timeCounter % 6000) % 100;

        $("#timeMinute").text(format(timeMinutes));
        $("#timeSecond").text(format(timeSeconds));
        $("#timeCentiSeconds").text(format(timeCentiSeconds));

        lapMinutes = Math.floor(lapCounter / 6000);
        lapSeconds = Math.floor((lapCounter % 6000) / 100);
        lapCentiSeconds = (lapCounter % 6000) % 100;

        $("#lapMinute").text(format(lapMinutes));
        $("#lapSecond").text(format(lapSeconds));
        $("#lapCentiSeconds").text(format(lapCentiSeconds));
    }
    function format(number) {
        if (number < 10) {
            return '0' + number;
        }else{
            return number;
        }
    }
    function addLap() {
        lapNumber++;
        var myLapDetails = 
        '<div class = "lap">'+
            '<div class = "lapTimeTitle">'+
            'Lap'+ lapNumber +
            '</div>'+
            '<div class = "lapTime">'+
                '<span>' + format(lapMinutes) + ':</span>'+
                '<span>' + format(lapSeconds) + ':</span>'+
                '<span>' + format(lapCentiSeconds) + '</span>'+
            '</div>'+
        '</div>';
        $(myLapDetails).prependTo("#laps");
    }
});
