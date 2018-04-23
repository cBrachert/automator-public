
class Automation(object):

    def __init__(self, op, title, conditions, actions):
        self.original_op = op
        self.title = title
        self.is_active = True
        if op == 'and':
            self.op = lambda conditions: False not in [c.is_valid() for c in conditions]
        elif op == 'or':
            self.op = lambda conditions: True in [c.is_valid() for c in conditions]
        else:
            raise Exception('Invalid operation {}'.format(op))

        self.conditions = conditions
        self.actions = actions

    def is_valid(self):
        if self.op(self.conditions):
            for a in self.actions:
                a.run()
            return True
        return False
    def serialize(self):
        return {
            "op": self.original_op,
            "title": self.title,
            "is_active": self.is_active,
            "conditions": [c.serialize() for c in self.conditions],
            "actions": [a.serialize() for a in self.actions]
        }