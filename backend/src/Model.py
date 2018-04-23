
from lib.Automation import Automation
from lib.conditions.BatteryCharge import BatteryCharge
from lib.conditions.Location import Location
from lib.actions.PrintAction import PrintAction
from lib.actions.EmailAction import EmailAction
from lib.external.external import External 
from lib.Broker import Broker

conditionLookup = {
    'battery': BatteryCharge,
    'location': Location
}

actionLookup = {
    'print': PrintAction,
    'mail': EmailAction
}

class AutomationModel(object):

    def __init__(self, broker):
        self.broker = broker
        self.automations = []
    
    def add(self, automation):
        self.automations.append(automation)
    
    def reset(self):
        self.automations = []
        self.broker.reset()
    
    def add_from_JSON(self, data):
        conditions = [conditionLookup[d['condition']].from_JSON(d, self.broker) for d in data['conditions']]
        actions = [actionLookup[d['op']].from_JSON(d) for d in data['actions']]
        automation = Automation(data['op'], data['title'], conditions, actions)
        self.add(automation)
        return automation.serialize()

    def serializeAutomations(self):
        return [a.serialize() for a in self.automations]

    def update_values_and_check(self):
        self.broker.update_fields()
        for i, a in enumerate(self.automations):
            if a.is_active and a.is_valid():
                self.automations[i].is_active = False