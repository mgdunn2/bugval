import sys
import json
import sqlite3
import subprocess
import threading
from db import transaction
from flask_httpauth import HTTPBasicAuth
from flask import Flask, send_from_directory, render_template, make_response, jsonify, request, abort, url_for, redirect

application = Flask(__name__)
auth = HTTPBasicAuth()

confData = json.load(open('bugval.json'))
users = confData["users"]
sql_file = confData["sqlfile"]
home_dir = confData["home_dir"]

@application.route('/admin/submit', methods = ['GET', 'POST'])
@auth.login_required
def submit():
    if request.method == 'POST':
        print(request.form)
        print(home_dir)
        insertWisdom(request.form['title'], request.form['wisdom'].replace('\r', ''))
    return render_template('submit.html')

@auth.get_password
def get_password(username):
    for user in users:
        if user["user"] == username:
            return user["password"]
    return None

@transaction(sql_file)
def insertWisdom(cursor, title, wisdom):
    cursor.execute('insert into `wisdoms` values(?, ?)', (title, wisdom))
    cursor.execute('insert into `builds` values(?, ?)', (title, 0))

def publish():
    if fetchShouldPublish():
        print("running build")
        updateIsPublished()
        subprocess.call("./build.sh", shell=True, cwd=home_dir)
    threading.Timer(5, publish).start()

@transaction(sql_file)
def fetchShouldPublish(cursor):
    cursor.execute('SELECT count(*) from `builds` where `isPublished` = 0')
    results = cursor.fetchall()
    return results[0][0] != 0

@transaction(sql_file)
def updateIsPublished(cursor):
    cursor.execute('UPDATE `builds` set `isPublished` = 1')


@application.before_first_request
def startup():
    threading.Timer(5, publish).start()
    
if __name__ == "__main__":
    application.run(host='0.0.0.0')
