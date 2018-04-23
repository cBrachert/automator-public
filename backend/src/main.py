from lib.external.external import External 
from lib.Broker import Broker
import Model

from thread import start_new_thread
import server.main as server

import time


with open('key.pem', 'r') as file:
    private_key = ''.join(file.readlines())

with open('car.txt', 'r') as token:
    car_token = token.readline()
      

e = External(private_key, car_token)
b = Broker(e)
model = Model.AutomationModel(b)

if __name__ == "__main__":
    start_new_thread(server.init_app, (model, ))
    while True:
        time.sleep(1)
        try:
            model.update_values_and_check()
        except Exception as ex:
            print type(ex)
            print ex.args
            print ex
