import requests
from bs4 import BeautifulSoup
import datetime


url = "https://washubears.com/landing/headlines-featured?tmpl=%2Fnews-template&ajax=true&pageSize=1000&pageIndex=0&pageUrl=%2Flanding%2Fheadlines-featured&showThumb=true&showDate=true&showLeadin=true&newsLayout_initialized=true&_=1637604141832"

headers = {
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
}


def getMonthNumber(long_month_name):
    datetime_object = datetime.datetime.strptime(long_month_name, "%B")
    month_number = datetime_object.month
    return month_number


def getDay(day_string):
    day_string = day_string[:-1]
    if day_string[0] == "0":
        day_string = day_string[1:]
    return day_string


def saveArticle(data):
    url = "http://localhost:3000/news"
    response = requests.post(url=url, data=data)
    print(response.text)


response = requests.get(url=url, headers=headers)

html = response.text

soup = BeautifulSoup(html, "html.parser")

articles_section = soup.find("div", {"class": "stories clearfix"})

articles = articles_section.find_all("li")

parsed_articles = []

for art in articles:

    article = {}

    # title
    title = art.find("span", {"class": "title"})
    if title != None:
        article["title"] = title.text

    # image
    image = art.find("img")
    if image != None:
        article["image_url"] = "https://washubears.com" + image["data-src"]

    # link
    link = art.find("a")
    if link != None:
        article["link"] = "https://washubears.com" + link["href"]
        path = link["href"].split("/")[1:]
        if path[0] == "sports":
            article["team_abbreviation"] = path[1]
        else:
            article["team_abbreviation"] = "general"

    # date
    date_container = art.find("div", {"class": "date"})
    date_parts = date_container.find_all("span")
    if len(date_parts) == 3:
        month = int(getMonthNumber(date_parts[0].text))
        day = int(getDay(date_parts[1].text))
        year = int(date_parts[2].text)
        date = datetime.date(year=year, month=month, day=day).isoformat()
        article["date_posted"] = date

    saveArticle(article)
