

BatteryOps = {
    'less': lambda c_value, target: c_value < target,
    'equal': lambda c_value, target: c_value == target,
    'greater': lambda c_value, target: c_value > target
}

class BatteryCharge(object): 

    def __init__(self, publisher, title, description, op, target_value):
        super(BatteryCharge, self).__init__()
        self.title = title
        self.description = description
        self.op_val = op
        self.op = BatteryOps[op]
        self.target_value = target_value
        self.current_value = None 
        publisher.subscribe('battery_charge', self.set_battery_charge)

    def set_battery_charge(self, charge):
        self.current_value = charge

    def is_valid(self):
        if self.current_value is None:
            return False
        else:
            return self.op(self.current_value, self.target_value)

    @staticmethod
    def from_JSON(data, publisher):
        return BatteryCharge(publisher, data['title'], data['description'], data['op'], data['value'])

    def serialize(self):
        return {
            "op": self.op_val,
            "condition": "battery",
            "value": self.target_value,
            "title": self.title,
            "description": self.description
        }
