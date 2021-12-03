import requests
from bs4 import BeautifulSoup

def saveEvent(data):
    url = "http://localhost:3000/events"
    response = requests.post(url=url, data=data)
    print(response)

dateDict = {
    "Jan": "01",
    "Nov": "11",
    "Dec": "12",
}

url = "https://washubears.com/landing/index"

headers = {
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
}

response = requests.get(url=url, headers=headers)

html = response.text

soup = BeautifulSoup(html, "html.parser")

events = soup.find_all("div", {"class": "event-box"})

for event in events:
    sport = event.find("span", {"class": "sport"}).text.strip()
    time = event.find("span", {"class": "status"}).text.strip()
    opponent_parts = event.find("span", {"class": "team-name"}).text.strip().split()
    date_array = event.find("div", {"class": "date clearfix"}).text.split()

    month = dateDict[date_array[0]]
    day = date_array[1]
    year = "2021"
    if month == "01":
        year = "2022"

    date_string = month + "-" + day + "-" + year

    opponent = "-1"
    if len(opponent_parts) == 2:
        opponent = opponent_parts[1]

    if opponent != "-1" and "Final" not in time:
        event = {}
        event["name"] = sport + " at " + opponent
        event["date"] = date_string
        event["time"] = time
        event["description"] = "Come out to support the " + sport + " on " + date_string
        # print(event)
        saveEvent(event)
