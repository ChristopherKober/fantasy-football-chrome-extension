function getTables() {
    return document.getElementById('matchup').getElementsByTagName('table');
}

function getStartingTable() {
    return getTables()[0]
}

function getBenchTable() {
    return getTables()[1]
}

function getStatsFromTable(table) {
    var body = table.getElementsByTagName('tbody')[0];
    var rows = body.getElementsByTagName('tr');

    var result = {"left":[],"right":[]}

    Array.from(rows).forEach(row => {
        eles = Array.from(row.children).filter(n => !n.classList.contains('Hidden'));

        console.log(eles);

        try {
            result.left.push({
                position: getPlayerPositionFromElement(eles[1]),
                points: getPointsFromElement(eles[3])
            });
        }
        catch {}
        try {
            result.right.push({
                position: getPlayerPositionFromElement(eles[7]),
                points: getPointsFromElement(eles[5])
            });
        }
        catch {}
    });

    return result;
}

function getPlayerPositionFromElement(ele) {
    return Array.from(ele.getElementsByTagName('span'))
                .filter(e => e.textContent.match(/ - /g) != null)[0]
                .textContent.split('-')[1]
                .trim()
                .toLowerCase();
}

function getPointsFromElement(ele) {
    var n =  Number(getMostInnerChild(ele).textContent);
    return Number.isNaN(n) ? 0 : n;
}

function getContainerPositionFromElement(ele) {
    return ele.textContent;
}

function getNameFromElement(ele) {
    return ele.children[0].children[1].children[0].children[0].textContent;
}

function getStartingStats () {
    return getStatsFromTable(getStartingTable());
}

function getBenchStats () {
    return getStatsFromTable(getBenchTable());
}

function getLineupSlots() {
    var rows = Array.from(getStartingTable().getElementsByTagName('tbody')[0]
                                                     .getElementsByTagName('tr'));

    var result = {
        "qb":0,
        "rb":0,
        "wr":0,
        "te":0,
        "flex":0,
        "def":0,
        "k":0
    }

    rows.forEach(row => {
        switch (getContainerPositionFromElement(Array.from(row.getElementsByTagName('td')).filter(n => !n.classList.contains('hidden'))[4])) {
            case "QB":
                result.qb += 1;
                break;
            case "RB":
                result.rb += 1;
                break;
            case "WR":
                result.wr += 1;
                break;
            case "TE":
                result.te += 1;
                break;
            case "W/R/T":
                result.flex += 1;
                break;
            case "K":
                result.k += 1;
                break;
            case "DEF":
                result.def += 1;
                break;
            default:
                break;
        }
    });

    return result;
}

function getTeamNames() {
    var eles = Array.from(document.getElementById('yspmaincontent').getElementsByTagName('a'))
                    .filter(e => e.href.match(/https:\/\/football\.fantasysports\.yahoo\.com\/f1\/\d*\/\d+/g) != null )
                    .filter(e => e.textContent != null && e.textContent != "" && e.textContent != " ");

    return {
        "left": eles[0].textContent,
        "right": eles[1].textContent
    }
}