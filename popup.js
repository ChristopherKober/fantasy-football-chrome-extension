function onExecuted(result) {
    try {
        var data = result[0];

        if (data.error) {
            document.getElementsByTagName('h1')[0].textContent = data.error;
            Array.from(document.getElementsByClassName('horizontal-list')).forEach(e => {
                e.style.display = "none";
            });
            return;
        }

        document.getElementById('left-name').textContent = data.left.name;
        document.getElementById('left-points').textContent = "Lost Points: " + data.left.lostPoints;
        document.getElementById('right-name').textContent = data.right.name;
        document.getElementById('right-points').textContent = "Lost Points: " + data.right.lostPoints;

        Array.from(document.getElementsByClassName('horizontal-list')).forEach(e => {
            e.style.display = "flex";
        });
    }
    catch {}
}

function onError(error) {
    console.log(`Error: ${error}`);
}

document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');

    checkPageButton.addEventListener('click', function() {
        try {
            chrome.tabs.executeScript({
                file: `./js/utilities.js`
            });
            chrome.tabs.executeScript({
                file: `./js/scraper.js`
            });

            chrome.tabs.executeScript({
                file: `./js/logic.js`
            });

            chrome.tabs.executeScript({
                file: `./js/yahoo-matchup-scrape.js`
            }, onExecuted);

        }
        catch {}
    }, false);
  }, false);