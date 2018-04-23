import json
from flask import Flask, request, send_from_directory, jsonify
import os

frontend_path = os.path.normpath(os.path.join(os.path.realpath(__file__), '../../../../frontend/dest'))
index_path = os.path.join(frontend_path, 'index.html')

app = Flask(__name__, static_folder=frontend_path)

def init_app(AutomationModel):

    @app.route('/api/automations', methods=['GET', 'POST'], endpoint='automations')
    def automations():
        if(request.method == 'GET'):
            return jsonify(AutomationModel.serializeAutomations())
        else:
            return jsonify(AutomationModel.add_from_JSON(json.loads(request.data)))

    @app.route('/api/reset', methods=['PUT'])
    def reset():
        AutomationModel.reset()
        return jsonify([])

    @app.route('/<path:path>')
    def send_js(path):
        return send_from_directory(frontend_path, path)

    app.run(host='0.0.0.0')
