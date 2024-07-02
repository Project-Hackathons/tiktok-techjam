from datetime import datetime
from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

conn = sqlite3.connect('TT.db', check_same_thread=False)
cursor = conn.cursor()

app = Flask(__name__)
CORS(app)

def username_exists(username):
    cursor.execute("select 1 from users where username = ?", (username,))
    return cursor.fetchone() is not None

def insert_user(username, email, display_name, balance=0):
    cursor.execute("insert into users (username, email, display_name, balance) values (?,?,?,?)", (username, email, display_name, balance))
    conn.commit()
    return cursor.lastrowid

def insert_user_if_not_exist(username, email, display_name, balance):
    if not username_exists(username):
        return insert_user(username, email, display_name, balance)
    return -1

def address_exists(address):
    cursor.execute("select 1 from stores where address = ?", (address,))
    return cursor.fetchone() is not None

def insert_store(address, lat, lng, name, withdrawal):
    cursor.execute("insert into stores (address, lat, lng, name, withdrawal) values (?,?,?,?,?)", (address, lat, lng, name, withdrawal))
    conn.commit()
    return cursor.lastrowid

def get_user(uid):
    cursor.execute("""select u.uid, u.username, u.email, u.display_name, u.balance, t.tid, t.to_uid, t.to_balance_before, t.to_balance_after, t.from_uid, t.from_balance_before, t.from_balance_after, t.fee, t.timestamp 
                        from users u
                        left join transactions t on u.uid = t.to_uid or u.uid = t.from_uid
                        where u.uid = ?
                        order by t.timestamp""", (uid,))
    return cursor.fetchall()

@app.route('/')
def hello_world():
    return "{'status': 'alive'}"

@app.route('/user/<uid>')
def user(uid):
    data = get_user(uid), 200
    if data is None:
        return jsonify({'error': 'user not found'}), 404
    data = data[0]
    txs = []
    for i in data:
        print(i)
        txs.append({
                    'tid': i[5],
                    'to': {
                        'uid': i[6],
                        'balance_before': i[7],
                        'balance_after': i[8],
                        },
                    'from': {
                        'uid': i[9],
                        'balance_before': i[10],
                        'balance_after': i[11]
                        },
                    'fee': i[12],
                    'timestamp': i[13]
                    })
    data = data[0]
    return jsonify({
            'uid': data[0],
            'username': data[1],
            'email': data[2],
            'display_name': data[3],
            'balance': data[4],
            'transactions': txs
            }), 200

@app.route('/create_user', methods=['POST'])
def create_user():
    data = request.json
    if data is None:
        return {"uid": -1}, 200
    username = data.get("username")
    email = data.get("email")
    display_name = data.get("display_name")
    balance = data.get("balance")
    if username_exists(username):
        return {"uid": -2}, 200
    return {"uid": insert_user(username, email, display_name, balance)}, 200


@app.route('/stores')
def fetch_stores():
    cursor.execute("select address, lat, lng, name, withdrawal from stores")
    stores = cursor.fetchall()
    stores_json = []
    for store in stores:
        store_dict = {
                'address': store[0],
                'lat': store[1],
                'lng': store[2],
                'name': store[3],
                'withdrawal': store[4]
        }
        stores_json.append(store_dict)
    return jsonify(stores_json), 200

@app.route('/create_store', methods=['POST'])
def create_store():
    data = request.json
    if data is None: 
        return {"sid": -1}, 200
    address = data.get("address")
    lat = data.get("lat")
    lng = data.get("lng")
    name = data.get("name")
    withdrawal = data.get("withdrawal")
    if address_exists(address):
        return {"sid": -2}, 200
    return {"sid": insert_store(address, lat, lng, name, withdrawal)}, 200

fee = 1
@app.route('/transfer', methods=['POST'])
def transfer():
    data = request.json
    if data is None:
        return {"tid": -1}, 200
    to_uid = data.get("to")
    from_uid = data.get("from")
    amount = data.get("amount")
    cursor.execute("select balance from users where uid = ?", (from_uid,))
    from_bal = cursor.fetchone()
    if from_bal is None:
        return {"error": "from_uid doesn't exist"}, 200
    from_bal = from_bal[0]
    if from_bal - amount < 0:
        return {"error": "insufficient balance"}, 200
    cursor.execute("select balance from users where uid = ?", (to_uid,))
    to_bal = cursor.fetchone()
    if to_bal is None:
        return {"error": "to_uid doesn't exist"}, 200
    to_bal = to_bal[0]

    from_aft_bal = from_bal - amount
    to_aft_bal = to_bal + amount - fee
    cursor.execute("update users set balance = ? where uid = ?", (from_aft_bal, from_uid))
    cursor.execute("update users set balance = ? where uid = ?", (to_aft_bal, to_uid))
    cursor.execute("""insert into transactions
                            ( to_uid , to_balance_before , to_balance_after , from_uid , from_balance_before , from_balance_after , fee , timestamp )
                            values 
                            (?,?,?,?,?,?,?,?)
                   """, (to_uid, to_bal, to_aft_bal, from_uid, from_bal, from_aft_bal, fee, int(round(datetime.now().timestamp()))))
    conn.commit()
    return jsonify({
        'tid': cursor.lastrowid,
        'to': {
            'uid': to_uid,
            'balance_before': to_bal,
            'balance_after': to_aft_bal,
            },
        'from': {
            'uid': from_uid,
            'balance_before': from_bal,
            'balance_after': from_aft_bal 
            },
        'fee': fee
        })

















def init_db():
    cursor.execute("""create table if not exists users (
                            uid integer primary key autoincrement, 
                            username text not null unique,
                            email text not null unique,
                            display_name text not null,
                            balance integer not null
                      )""")
    cursor.execute("""create table if not exists transactions (
                            tid integer primary key autoincrement, 
                            to_uid int not null,
                            to_balance_before int not null,
                            to_balance_after int not null,
                            from_uid int not null,
                            from_balance_before int not null,
                            from_balance_after int not null,
                            fee int not null,
                            timestamp integer not null,
                            foreign key (to_uid) references users (to_uid),
                            foreign key (from_uid) references users (from_uid)
                      )""")
    cursor.execute("""create table if not exists stores (
                            sid integer primary key autoincrement,
                            address text not null,
                            lat real not null,
                            lng real not null,
                            name text not null,
                            withdrawal int not null
                    )""")
    print('inserted', insert_user_if_not_exist('alex', 'alex@gmail.com', 'Alex Lim', balance=100))
    print('inserted', insert_user_if_not_exist('alex', 'alex@gmail.com', 'Alex Lim', balance=100))
    stores = [
        {
            "address": 'Singapore 467360',
            "lat": 1.324592,
            "lng": 103.9292631,
            "name": '7-Eleven',
            "withdrawal": 500
            },
        {
            "address": '705 E Coast Rd, Singapore 459062',
            "lat": 1.3119873,
            "lng": 103.9223542,
            "name": '7-Eleven + Mr Softee',
            "withdrawal": 100
            },
        {
            "address": '750 Chai Chee Rd, #01-32, Singapore 469000',
            "lat": 1.3234063,
            "lng": 103.9221309,
            "name": '7-Eleven',
            "withdrawal": 200
            },
        {
            "address": '25 New Upper Changi Rd, #01-626, Singapore 462025',
            "lat": 1.3235676,
            "lng": 103.9337613,
            "name": '7-Eleven',
            "withdrawal": 100
            },
        {
            "address": '20 Chai Chee Rd, #01-426, Singapore 461020',
            "lat": 1.3263519,
            "lng": 103.9231012,
            "name": '7-Eleven',
            "withdrawal": 300
            },
        {
            "address": '123 Bedok North Street 2, #01-158, Singapore 460123',
            "lat": 1.3292945,
            "lng": 103.9373334,
            "name": '7-Eleven',
            "withdrawal": 900
            },
        {
            "address": '57 Marine Ter, #01-125, Singapore 440057',
            "lat": 1.306474,
            "lng": 103.9153155,
            "name": '7-Eleven',
            "withdrawal": 400
            },
        {
                "address": '1110 East Coast Parkway, #01-01/02, Cyclist Park, Singapore 449880',
                "lat": 1.3044096,
                "lng": 103.9238689,
                "name": '7-Eleven',
                "withdrawal": 0
                },
  {
          "address": '56 New Upper Changi Rd, #01-1298, Ixora 461056',
          "lat": 1.3247114,
          "lng": 103.9407488,
          "name": '7-Eleven',
          "withdrawal": 200
          },
  {
          "address": '18 Jln Masjid, #01-05 Kembangan Plaza, Singapore 418944',
          "lat": 1.3203746,
          "lng": 103.9124957,
          "name": '7-Eleven',
          "withdrawal": 900
          },
  {
          "address": '89 Bedok North Street 4, #01-83, Singapore 460089',
          "lat": 1.3320551,
          "lng": 103.9381182,
          "name": '7-Eleven',
          "withdrawal": 0
          },
  {
          "address": '392 E Coast Rd, Singapore 428992',
          "lat": 1.308735,
          "lng": 103.9116708,
          "name": '7-Eleven',
          "withdrawal": 200
          },
  {
          "address": '168 Bedok South Ave 3, #01-477 Siglap East, Singapore 460168',
          "lat": 1.3202846,
          "lng": 103.9445132,
          "name": '7-Eleven',
          "withdrawal": 0
          },
  {
          "address": '412 Bedok North Ave 2, #01-128, Singapore 460412',
          "lat": 1.3293002,
          "lng": 103.9311212,
          "name": '7-Eleven',
          "withdrawal": 900
          },
  {
          "address": '121 Bedok Reservoir Rd, #01-198 Eunos Vista, Singapore 470121',
          "lat": 1.3313255,
          "lng": 103.9096189,
          "name": '7-Eleven',
          "withdrawal": 0
          },
  {
          "address": '744 Bedok Reservoir Rd, #01-3061 Reservoir Village, Singapore 470744',
          "lat": 1.3375907,
          "lng": 103.9220182,
          "name": '7-Eleven',
          "withdrawal": 800
          },
  {
          "address": '58 Marine Ter, #01-59 Haven, Singapore 440058',
          "lat": 1.306067,
          "lng": 103.9138188,
          "name": '7-Eleven',
          "withdrawal": 200
          },
  {
          "address": '213 E Coast Rd, No.213, Singapore 428912',
          "lat": 1.3073755,
          "lng": 103.9067524,
          "name": '7-Eleven',
          "withdrawal": 600
          },
  {
          "address": 'Blk 83 Marine Parade Central, #01-574, Singapore 440083',
          "lat": 1.3027784,
          "lng": 103.9062377,
          "name": '7-Eleven',
          "withdrawal": 700
          },
  {
          "address": '1A Eunos Cres, #01-2469/2471, Singapore 401001',
          "lat": 1.321351,
          "lng": 103.9027665,
          "name": '7-Eleven + Mr Softee',
          "withdrawal": 600
          }
  ]
    for store in stores:
        address = store["address"]
        lat = store["lat"]
        lng = store["lng"]
        name = store["name"]
        withdrawal = store["withdrawal"]
        if not address_exists(address):
            insert_store(address, lat, lng, name, withdrawal)
    conn.commit()

init_db()

