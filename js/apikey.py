import requests


url = "https://www.dnd5eapi.co/api/2024"


payload = {}
headers = {
  'Accept': 'application/json'
}


response = requests.request("GET", url, headers=headers, data=payload)


print(response.text)


