from flask import Flask, request, redirect, render_template

from speech2text import real_time_transcription

app = Flask(__name__)


# @app.route('/')
# def hello_world():  # put application's code here
#     return 'Hello World!'
#
#
# @app.route('/hello/<name>')
# def hello_name(name):
#     return 'Hello %s!' % name


@app.route("/", methods=["GET", "POST"])
def index():
    return render_template('index.html')

@app.route("/translate", methods=["GET", "POST"])
def translate():
    return render_template('translate.html')

@app.route("/transcript", methods=["GET", "POST"])
def transcript():
    transcript = ""
    if request.method == "POST":
        print("FORM DATA RECEIVED")
        print(request.files["file"])

        if "file" not in request.files:
            print("FIle not Found")
            return redirect(request.url)

        file = request.files["file"]
        if file.filename == "":
            print("Empty File")
            return redirect(request.url)

        if file:
            print("Started Transcribing")
            transcript = real_time_transcription(file)
    return render_template('translate.html', transcript=transcript)


if __name__ == '__main__':
    app.run(debug=True)
