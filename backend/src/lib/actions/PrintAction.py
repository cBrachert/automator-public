class PrintAction():

    def run(self):
        print('jey')

    def serialize(self):
        return {
            "op": "print"
        }
    
    @staticmethod
    def from_JSON(data):
        return PrintAction()