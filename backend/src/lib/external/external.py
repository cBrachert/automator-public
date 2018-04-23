import jwt
import time
import uuid
import requests

class External(object):

    def __init__(self, private_key, car_token):
        payload={
            'api_version':'1.0',
            "app_id": "",
            "aud": "https://rest-api.high-mobility.com/auto/v1",
            "iat": time.time(),
            "jti": str(uuid.uuid4()),
            "access_token": car_token
        }

        self.header = {'Authorization': 'Bearer ' +  jwt.encode(payload, private_key, algorithm='HS256')}

    def getUrl(self, url):
        return requests.get(url, headers=self.header).json()

    def get_battery_charge(self):
        response = self.getUrl("https://rest-api.high-mobility.com/auto/v1/charging")
        return response["batteryLevel"]

    def get_location(self):
        response = self.getUrl("https://rest-api.high-mobility.com/auto/v1/location")
        return response["coordinates"]
  