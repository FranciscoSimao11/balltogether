var levelsArr = [];
for (var i = 0; i <= 5.0; i++) {
    levelsArr[i] = i;
}

export const levels = levelsArr;


function toTime(hour: any) {
    var res;
    if (hour % 1 == 0)
        res = ":00";
    else
        res = ":30";
    if (hour < 10)
        res = "0" + parseInt(hour) + res;
    else
        res = parseInt(hour) + res;
    return res;
}

var hoursArr = [];
for (var j = 0; j <= 48; j++) {
    hoursArr[j] = toTime(j / 2);
}

export const hours = hoursArr;

interface StarsObject {
    filledStars: number,
    halfStars: number,
    emptyStars: number
}

export function processRating(rating: string) {
    var res: StarsObject;
    var ratingFloat = parseFloat(rating);
    var ratingInt = parseInt(rating);
    if (ratingFloat == ratingInt) {
        res = { filledStars: ratingInt, halfStars: 0, emptyStars: 5 - ratingInt }
        return res;
    } else {
        if (ratingFloat > Math.round(ratingFloat)) {
            res = { filledStars: Math.round(ratingFloat), halfStars: 0, emptyStars: 5 - Math.round(ratingFloat) }
        } else {
            res = { filledStars: Math.round(ratingFloat) - 1, halfStars: 1, emptyStars: 5 - Math.round(ratingFloat) }
        }

        return res;
    }
}

export function computeAvg(players: any) {
    var avg = 0;
    for (var i = 0; i < players.length; i++) {
        avg += parseFloat(players[i].avgRating);
    }
    return (Math.round(avg / players.length * 100) / 100).toFixed(2);
}
