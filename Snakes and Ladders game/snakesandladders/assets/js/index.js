$(document).ready(function() {
    var curPositionPlay1 = 1;
    var curPositionPlay2 = 1;
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
            $(`#block-${curPositionPlay1}`).removeClass("bg-primary");
            $(`#block-${curPositionPlay1}`).css("font-weight", 'normal');
            curPositionPlay1 = curPositionPlay1 + play1Score;
            if (curPositionPlay1 < 100) {
                curPositionPlay1 = ladderandSnake(curPositionPlay1);
                $(`#block-${curPositionPlay1}`).addClass("bg-primary");
                $(`#block-${curPositionPlay1}`).css('font-weight', 'bold');
                setTimeout(() => {
                    $("#dice-id1").css("visibility", "hidden");
                    $('#dice-id2').css('visibility', 'visible');
                }, 600);
            } else if (curPositionPlay1 == 100) {
                $(`#block-${curPositionPlay1}`).addClass("bg-primary");
                $('#player1').attr("disabled", true);
                $('#player2').attr("disabled", true);
                $("#specialEvents").addClass("text-white bg-dark");
                $('#specialEvents').text('Player 1 wins the game!!');
                $('#specialEvents').css('visibility', 'visible');
            } else {
                curPositionPlay1 = curPositionPlay1 - play1Score;
                $(`#block-${curPositionPlay1}`).addClass("bg-primary");
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
            $(`#block-${curPositionPlay2}`).removeClass("bg-danger");
            $(`#block-${curPositionPlay2}`).css("font-weight", 'normal');
            curPositionPlay2 = curPositionPlay2 + play2Score;
            if (curPositionPlay2 < 100) {
                curPositionPlay2 = ladderandSnake(curPositionPlay2);
                $(`#block-${curPositionPlay2}`).addClass("bg-danger");
                $(`#block-${curPositionPlay2}`).css('font-weight', 'bold');
                setTimeout(() => {
                    $('#dice-id1').css('visibility', 'visible');
                    $('#dice-id2').css('visibility', 'hidden');
                }, 600);
            } else if (curPositionPlay2 == 100) {
                $(`#block-${curPositionPlay2}`).addClass("bg-danger");
                $('#player1').attr("disabled", true);
                $('#player2').attr("disabled", true);
                $("#specialEvents").addClass("text-white bg-dark");
                $('#specialEvents').text('Player 2 wins the game!!');
                $('#specialEvents').css('visibility', 'visible');
            } else {
                curPositionPlay2 = curPositionPlay2 - play2Score;
                $(`#block-${curPositionPlay2}`).addClass("bg-danger");
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
                currentPosition = value;
            }
        }
        for (const [key, value] of Object.entries(snake)) {
            if (currentPosition == key) {
                $("#specialEvents").addClass("text-Danger");
                $('#specialEvents').text(`OOPS a snake bite you to ${value}`);
                $('#specialEvents').css('visibility', 'visible');
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
                $("#dice-id1").attr("src", `assets/images/dice${diceRoll}.png`);
            }, 1000);
        } else {
            $("#dice-id2").addClass("shake");
            setTimeout(() => {
                $("#dice-id2").removeClass("shake");
                $("#dice-id2").attr("src", `assets/images/dice${diceRoll}.png`);
            }, 1000);
        }
    }
})