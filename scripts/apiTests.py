import requests

url = "https://washu-sacc-app-api.herokuapp.com/teams?team=wsoc"

response = requests.get(url)

print(response.text)