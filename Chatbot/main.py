from flask import Flask, request, jsonify
from Chatbot import Chatbot

app = Flask(__name__)

chatbot = Chatbot()

@app.route('/chatbot', methods=['POST'])
def post():
    payload = request.get_json(force=True)
    pregunta = payload.get('pregunta', '')
    
    if pregunta:
        respuesta = chatbot.hacer_pregunta(pregunta).content
        return jsonify({'respuesta': respuesta})
    else:
        return jsonify({'error': 'No se proporcionó ninguna pregunta.'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
