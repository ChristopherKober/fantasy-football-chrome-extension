function getMaxPointsFromStats(input,slots) {
    var stats = [...input];

    var result = 0;

    result += getHighestPointsLoop(stats,slots.qb,["qb"]);
    result += getHighestPointsLoop(stats,slots.rb,["rb"]);
    result += getHighestPointsLoop(stats,slots.te,["te"]);
    result += getHighestPointsLoop(stats,slots.wr,["wr"]);
    result += getHighestPointsLoop(stats,slots.k,["k"]);
    result += getHighestPointsLoop(stats,slots.def,["def"]);
    result += getHighestPointsLoop(stats,slots.flex,["rb","te","wr"]);

    return result;
}

function getHighestPointsLoop(stats, slots, acceptablePositions) {
    var result = 0;

    for (var i = 0; i < slots; i++) {
        var h = getHighestPoints(stats, acceptablePositions);

        if (h.maxIndex != -1) {
            result += h.points;
            stats.splice(h.maxIndex, 1);    
        }
    }

    return result;
}

function getHighestPoints(stats,acceptablePositions) {
    maxIndex = -1;

    for (var i = 0; i < stats.length; i++) {
        if (acceptablePositions.includes(stats[i].position) && 
            stats[i].points > 0 && 
            (maxIndex == -1 || stats[maxIndex].points < stats[i].points)) {

            maxIndex = i;
        }   
    }

    return {"points": maxIndex == -1 ? 0 : stats[maxIndex].points, "maxIndex":maxIndex};
}

function getLostStats(startingStats, benchStats, slots) {
    return getMaxPointsFromStats(combineStats(startingStats,benchStats),slots) - 
                getMaxPointsFromStats(startingStats,slots);
}

function performLostPointsCalc() {
    if (window.location.href.match(/https:\/\/football\.fantasysports\.yahoo\.com\/f1\/\d*\/matchup/g) == null) {
        return { "error": "Can't Handle This Page" };
    }

    try {
        var startingStats = getStartingStats();
        var benchStats = getBenchStats();
        var slots = getLineupSlots();
        var names = getTeamNames()
        
        return {
            "left": {
                "name": names.left,
                "lostPoints": getLostStats(startingStats.left,benchStats.left,slots).toFixed(2)
            },
            "right": {
                "name": names.right,
                "lostPoints": getLostStats(startingStats.right,benchStats.right,slots).toFixed(2)
            }
        }
    }
    catch {
        return { "error": "Something Went Wrong..." };
    }
}