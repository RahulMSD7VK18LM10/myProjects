$(document).ready(function() {
    var curPositionPlay1 = 1;
    var curPositionPlay2 = 1;
    var audio;
    const snake = {
        99: 14,
        52: 28,
        87: 69,
        64: 39,
        34: 8
    };
    const ladder = {
        47: 97,
        70: 93,
        5: 37,
        40: 79,
        12: 50
    };
    var scoreRemaining = 0;
    var playerDice = null;
    $('#dice-id2').css('visibility', 'hidden');
    $("#player1").click(function() {
        playerDice = true;
        var play1Score = Math.floor((Math.random() * 6) + 1);
        $('#specialEvents').css('visibility', 'hidden');
        $("#specialEvents").removeClass();
        $('#player1').attr("disabled", true);
        $('#player2').attr("disabled", false);
        setTimeout(() => {
            if (curPositionPlay1 != 1) {
                $(`#block-${curPositionPlay1}`).css("background", "#77dd77");
            }
            $(`#block-${curPositionPlay1}`).css("font-weight", 'normal');
            curPositionPlay1 = curPositionPlay1 + play1Score;
            if (curPositionPlay1 < 100) {
                curPositionPlay1 = ladderandSnake(curPositionPlay1);
                samePosition(curPositionPlay1, curPositionPlay2);
                $(`#block-${curPositionPlay1}`).css('font-weight', 'bold');
                setTimeout(() => {
                    $("#dice-id1").css("visibility", "hidden");
                    $('#dice-id2').css('visibility', 'visible');
                }, 600);
            } else if (curPositionPlay1 == 100) {
                $(`#block-${curPositionPlay1}`).css("background", "#0275d8");
                $('#player1').attr("disabled", true);
                $('#player2').attr("disabled", true);
                $("#specialEvents").addClass("bg-dark winAnimation");
                $('#specialEvents').text('Player 1 wins the game!!');
                $('#specialEvents').css('visibility', 'visible');
                audio = $("#audioWin")[0];
                audio.play();
            } else {
                curPositionPlay1 = curPositionPlay1 - play1Score;
                samePosition(curPositionPlay1, curPositionPlay2);
                $(`#block-${curPositionPlay1}`).css('font-weight', 'bold');
                scoreRemaining = 100 - curPositionPlay1;
                $('#specialEvents').addClass("text-warning");
                $('#specialEvents').text(`You need to get ${scoreRemaining} to win`);
                $('#specialEvents').css('visibility', 'visible');
                setTimeout(() => {
                    $('#dice-id2').css('visibility', 'visible');
                    $("#dice-id1").css("visibility", "hidden");
                }, 600);
            }
        }, 1500);
        diceRoll(play1Score, playerDice);
    });
    $("#player2").click(function() {
        playerDice = false;
        var play2Score = Math.floor((Math.random() * 6) + 1);
        $('#specialEvents').css('visibility', 'hidden');
        $("#specialEvents").removeClass();
        $('#player1').attr("disabled", false);
        $('#player2').attr("disabled", true);
        setTimeout(() => {
            if (curPositionPlay2 != 1) {
                $(`#block-${curPositionPlay2}`).css("background", "#77dd77");
            }
            $(`#block-${curPositionPlay2}`).css("font-weight", 'normal');
            curPositionPlay2 = curPositionPlay2 + play2Score;
            if (curPositionPlay2 < 100) {
                curPositionPlay2 = ladderandSnake(curPositionPlay2);
                samePosition(curPositionPlay1, curPositionPlay2);
                $(`#block-${curPositionPlay2}`).css('font-weight', 'bold');
                setTimeout(() => {
                    $('#dice-id1').css('visibility', 'visible');
                    $('#dice-id2').css('visibility', 'hidden');
                }, 600);
            } else if (curPositionPlay2 == 100) {
                $(`#block-${curPositionPlay2}`).css("background", "#d9534f");
                $('#player1').attr("disabled", true);
                $('#player2').attr("disabled", true);
                $("#specialEvents").addClass("bg-dark winAnimation");
                $('#specialEvents').text('Player 2 wins the game!!');
                $('#specialEvents').css('visibility', 'visible');
                audio = $("#audioWin")[0];
                audio.play();
            } else {
                curPositionPlay2 = curPositionPlay2 - play2Score;
                samePosition(curPositionPlay1, curPositionPlay2);
                $(`#block-${curPositionPlay2}`).css('font-weight', 'bold');
                scoreRemaining = 100 - curPositionPlay2;
                $('#specialEvents').addClass("text-warning");
                $('#specialEvents').text(`You need to get ${scoreRemaining} to win`);
                $('#specialEvents').css('visibility', 'visible');
                setTimeout(() => {
                    $('#dice-id1').css('visibility', 'visible');
                    $('#dice-id2').css('visibility', 'hidden');
                }, 600);
            }
        }, 1500);
        diceRoll(play2Score, playerDice);
    });

    function ladderandSnake(currentPosition) {
        for (const [key, value] of Object.entries(ladder)) {
            if (currentPosition == key) {
                $("#specialEvents").addClass("text-success");
                $('#specialEvents').text(`WOW you climbed a ladder to ${value}`);
                $('#specialEvents').css('visibility', 'visible');
                audio = $("#audioLadder")[0];
                audio.play();
                setTimeout(() => {
                    audio.pause();
                }, 1000);
                currentPosition = value;
            }
        }
        for (const [key, value] of Object.entries(snake)) {
            if (currentPosition == key) {
                $("#specialEvents").addClass("text-Danger");
                $('#specialEvents').text(`OOPS a snake bite you to ${value}`);
                $('#specialEvents').css('visibility', 'visible');
                audio = $("#audioSnake")[0];
                audio.play();
                setTimeout(() => {
                    audio.pause();
                }, 1000);
                currentPosition = value;
            }
        }
        return currentPosition;
    }

    function diceRoll(diceRoll, playerDice) {
        if (playerDice == true) {
            $("#dice-id1").addClass("shake");
            setTimeout(() => {
                $("#dice-id1").removeClass("shake");
                $("#dice-id1").attr("src", `/assets/images/dice${diceRoll}.png`);
            }, 1000);
        } else {
            $("#dice-id2").addClass("shake");
            setTimeout(() => {
                $("#dice-id2").removeClass("shake");
                $("#dice-id2").attr("src", `/assets/images/dice${diceRoll}.png`);
            }, 1000);
        }
    }

    function samePosition(curPos1, curPos2) {
        if (curPos1 === curPos2) {
            $(`#block-${curPos1}`).css("background", "linear-gradient(to right,  #0275d8 0%, #0275d8 50%, #d9534f 50%, #d9534f 100%)");
        } else {
            if (curPos1 != 1) {
                $(`#block-${curPos1}`).css("background", "#0275d8");
            }
            if (curPos2 != 1) {
                $(`#block-${curPos2}`).css("background", "#d9534f");
            }
        }
    }
    $("#newGame").click(function() {
        location.reload();
        audio.pause();
    });
})