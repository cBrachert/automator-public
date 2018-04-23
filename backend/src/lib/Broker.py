from collections import defaultdict

class Broker(object):

    def __init__(self, external):
        self.external = external
        self.listeners = defaultdict(list)
        self.external_getters = {
            'battery_charge': self.external.get_battery_charge,
            'car_location': self.external.get_location
        }

    def subscribe(self, fieldname, cb):
        self.listeners[fieldname].append(cb)
    
    def reset(self):
        self.listeners = defaultdict(list)

    def update_fields(self):
        for k in self.listeners.keys():
            try:
                value = self.external_getters[k]()
                for l in self.listeners[k]:
                    l(value)
            except KeyError:
                print('Key Error: {}'.format(k))