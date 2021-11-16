import requests
from bs4 import BeautifulSoup


def saveTeam(data):
    url = "http://localhost:3000/teams"
    response = requests.post(url=url, data=data)
    print(response.text)


def savePlayer(data):
    url = "http://localhost:3000/athletes"
    response = requests.post(url=url, data=data)
    print(response.text)


sports = [
    {
        "sport": "Men's Baseball",
        "url": "https://www.washubears.com/sports/bsb/2020-21/roster",
        "team_abbreviation": "bsb",
    },
    {
        "sport": "Men's Basketball",
        "url": "https://www.washubears.com/sports/mbkb/2021-22/roster",
        "team_abbreviation": "mbkb",
    },
    {
        "sport": "Men's Football",
        "url": "https://www.washubears.com/sports/fball/2021-22/roster",
        "team_abbreviation": "fball",
    },
    {
        "sport": "Men's Soccer",
        "url": "https://www.washubears.com/sports/msoc/2021-22/roster",
        "team_abbreviation": "msoc",
    },
    {
        "sport": "Men's Tennis",
        "url": "https://www.washubears.com/sports/mten/2021-22/roster",
        "team_abbreviation": "mten",
    },
    {
        "sport": "Women's Basketball",
        "url": "https://www.washubears.com/sports/wbkb/2021-22/roster",
        "team_abbreviation": "wbkb",
    },
    {
        "sport": "Women's Golf",
        "url": "https://www.washubears.com/sports/wgolf/2021-22/roster",
        "team_abbreviation": "wgolf",
    },
    {
        "sport": "Women's Soccer",
        "url": "https://www.washubears.com/sports/wsoc/2021-22/roster",
        "team_abbreviation": "wsoc",
    },
    {
        "sport": "Women's Softball",
        "url": "https://www.washubears.com/sports/sball/2021-22/roster",
        "team_abbreviation": "sball",
    },
    {
        "sport": "Women's Tennis",
        "url": "https://www.washubears.com/sports/wten/2021-22/roster",
        "team_abbreviation": "wten",
    },
    {
        "sport": "Women's Volleyball",
        "url": "https://www.washubears.com/sports/wvball/2021-22/roster",
        "team_abbreviation": "wvball",
    },
]

detailsKey = {
    "No.:": "number",
    "Pos.:": "position",
    "Ht.:": "height",
    "Wt.:": "weight",
    "Cl.:": "grade",
    "Yr.:": "grade",
}

for sport in sports:

    sport_name = sport["sport"]
    sport_abbreviation = sport["team_abbreviation"]

    team = {}
    team["team"] = sport_name
    team["team_abbreviation"] = sport_abbreviation
    saveTeam(team)

    link = sport["url"]
    headers = {
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
    }
    response = requests.get(link, headers=headers)
    html = response.text

    soup = BeautifulSoup(html, "html.parser")
    athletes = soup.find_all("tr")

    for athlete_soup in athletes:

        player = {}
        player["team"] = sport_name
        player["team_abbreviation"] = sport_abbreviation

        # name
        name = athlete_soup.find("th").find("a")
        if name != None:
            trimmed = name.text.strip()
            parts = trimmed.split()
            player["first_name"] = parts[0]
            player["last_name"] = " ".join(parts[1:])

        # image
        image = athlete_soup.find("img")
        if image != None:
            player["image_url"] = "https://washubears.com" + image["data-src"]

        # player details
        otherDetails = athlete_soup.find_all("td")
        for detail in otherDetails:
            value = detail.text.strip()
            parts = value.split()
            if (
                parts[0] != "Hometown/High"
                and parts[0] in detailsKey.keys()
                and len(parts) > 1
            ):
                key = detailsKey[parts[0]]
                value = parts[1]
                player[key] = value
            else:
                player["hometown"] = " ".join(parts[2:])

        if name != None:
            savePlayer(player)
