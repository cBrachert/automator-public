
from geopy.distance import vincenty

LocationOps = {
    'less': lambda c_value, target: c_value < target,
    'equal': lambda c_value, target: c_value == target,
    'greater': lambda c_value, target: c_value > target
}

class Location(object): #should publisher be via di?

    def __init__(self, publisher, title, description, long, lat, op, target_value):
        super(Location, self).__init__()
        self.title = title
        self.description = description
        self.op_val = op
        self.long = long
        self.lat = lat
        self.op = LocationOps[op]
        self.target_value = target_value
        self.current_distance = None 
        publisher.subscribe('car_location', self.set_location)

    def set_location(self, location):
        self.current_distance = vincenty((location['latitude'], location['longitude']),(self.lat, self.long)).meters

    def is_valid(self):
        if self.current_distance is None:
            return False
        else:
            return self.op(self.current_distance, self.target_value)

    def serialize(self):
        return {
            "op": self.op_val,
            "long": self.long,
            "lat": self.lat,
            "condition": "battery",
            "value": self.target_value,
            "title": self.title,
            "description": self.description
        }        
        
    
    @staticmethod
    def from_JSON(data, publisher):
        return Location(publisher, data['title'], data['description'], data['long'], data['lat'], data['op'], data['value'])
