from flask import Flask
from flask import jsonify
from user_timestamp import *
from datetime import timedelta
import json


app = Flask(__name__)

tasks = [
    {
        'id': 1,
        'title': u'Buy groceries',
        'description': u'Milk, Cheese, Pizza, Fruit, Tylenol',
        'done': False
    },
    {
        'id': 2,
        'title': u'Learn Python',
        'description': u'Need to find a good Python tutorial on the web',
        'done': False
    }
]

@app.route('/podcast/timestamp')
def index():
    f = open('full_data.json',)
    response = json.load(f)
    f.close()
    res = process_timestamp(response, 16.0)
    res3 = []
    for i in res:
        res3.append(i)

    return json.dumps(res)



if __name__ == "__main__":
    app.run(debug=True)
