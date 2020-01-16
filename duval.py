import sys
import json
from flask import Flask, send_from_directory, render_template, make_response, jsonify, request, abort

application = Flask(__name__)

@application.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r

@application.route("/")
def duval():
    return render_template('bugval.html') 

@application.route("/keyboard")
def keyboard():
    return render_template('keyboard.html') 

@application.route("/abstractions")
def abs():
    return render_template('abstractions.html') 

if __name__ == "__main__":
    application.run(host='0.0.0.0')
