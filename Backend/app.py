# ==========================================================
# FINAL HACKATHON FAKE NEWS DETECTION SYSTEM (COMPLETE)
# ==========================================================

from flask import Flask, render_template, request, jsonify
import pickle
import shap
import numpy as np
from textblob import TextBlob
import os
from dotenv import load_dotenv
import os
import google.generativeai as genai

load_dotenv()# ==========================================================
# FINAL HACKATHON FAKE NEWS DETECTION SYSTEM (COMPLETE)
# ==========================================================

from flask import Flask, render_template, request, jsonify
import pickle
import shap
import numpy as np
from textblob import TextBlob
import os

# ----------------------------------------------------------
# Initialize Flask with explicit template folder
# ----------------------------------------------------------

template_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "templates")
app = Flask(__name__, template_folder=template_dir)

# ----------------------------------------------------------
# Load Trained Model & Vectorizer
# ----------------------------------------------------------

model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

# Extract underlying model for SHAP (if calibrated)
try:
    real_model = model.calibrated_classifiers_[0].estimator
except:
    real_model = model

# Initialize SHAP Explainer for linear models
explainer = shap.LinearExplainer(
    real_model,
    vectorizer.transform(["sample text"])
)

# ----------------------------------------------------------
# Core Analysis Function
# ----------------------------------------------------------

def analyze_news(news):

    tfidf = vectorizer.transform([news])
    prediction = model.predict(tfidf)[0]
    probabilities = model.predict_proba(tfidf)[0]

    confidence = round(max(probabilities) * 100, 2)
    final_prediction = "Real" if prediction == 1 else "Fake"

    # Confidence Warning System
    if confidence >= 60:
        warning = "High confidence"
    else:
        warning = "⚠ Low Confidence - Needs Manual Verification"

    # Emotional Intensity (0–100 scale)
    emotion = abs(TextBlob(news).sentiment.polarity)
    emotion_score = round(emotion * 100, 2)

    # Bias Detection (Simple heuristic)
    bias_level = "High Bias" if emotion_score > 60 else "Low Bias"

    # Source Credibility (demo logic)
    source_credibility = 70  # default score (can be dynamic later)

    # Adversarial Robustness Test
    modified_text = news + " shocking unbelievable secret conspiracy"
    adv_prediction = model.predict(vectorizer.transform([modified_text]))[0]
    robustness = "Stable" if adv_prediction == prediction else "Vulnerable"

    # SHAP Explanation
    shap_values = explainer(tfidf)
    feature_names = vectorizer.get_feature_names_out()

    word_importance = dict(zip(feature_names, shap_values.values[0]))
    top_words = sorted(
        word_importance.items(),
        key=lambda x: abs(x[1]),
        reverse=True
    )[:5]

    highlighted_words = [word for word, value in top_words]

    return {
        "prediction": final_prediction,
        "confidence": confidence,
        "fake_probability": round(probabilities[0] * 100, 2),
        "real_probability": round(probabilities[1] * 100, 2),
        "confidence_warning": warning,
        "emotional_intensity_score": emotion_score,
        "bias_level": bias_level,
        "source_credibility": source_credibility,
        "robustness": robustness,
        "highlighted_words": highlighted_words
    }

# ----------------------------------------------------------
# HTML ROUTES
# ----------------------------------------------------------

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():

    news = request.form["news"]
    result = analyze_news(news)

    return render_template(
        "index.html",
        result=result["prediction"],
        confidence=result["confidence"],
        fake_prob=result["fake_probability"],
        real_prob=result["real_probability"],
        emotion_score=result["emotional_intensity_score"],
        bias=result["bias_level"],
        credibility=result["source_credibility"],
        robustness=result["robustness"],
        warning=result["confidence_warning"],
        highlighted=result["highlighted_words"]
    )

# ----------------------------------------------------------
# JSON API ROUTE (For Postman / External Use)
# ----------------------------------------------------------

@app.route("/api/predict", methods=["POST"])
def api_predict():

    data = request.json
    news = data.get("news")

    result = analyze_news(news)

    return jsonify(result)

# ----------------------------------------------------------

if __name__ == "__main__":
    app.run(debug=True)

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
# ----------------------------------------------------------
# Initialize Flask with explicit template folder
# ----------------------------------------------------------

template_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "templates")
app = Flask(__name__, template_folder=template_dir)

# ----------------------------------------------------------
# Load Trained Model & Vectorizer
# ----------------------------------------------------------

model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

# Extract underlying model for SHAP (if calibrated)
try:
    real_model = model.calibrated_classifiers_[0].estimator
except:
    real_model = model

# Initialize SHAP Explainer for linear models
explainer = shap.LinearExplainer(
    real_model,
    vectorizer.transform(["sample text"])
)

# ----------------------------------------------------------
# Core Analysis Function
# ----------------------------------------------------------

def analyze_news(news):

    tfidf = vectorizer.transform([news])
    prediction = model.predict(tfidf)[0]
    probabilities = model.predict_proba(tfidf)[0]

    confidence = round(max(probabilities) * 100, 2)
    final_prediction = "Real" if prediction == 1 else "Fake"

    # Confidence Warning System
    if confidence >= 60:
        warning = "High confidence"
    else:
        warning = "⚠ Low Confidence - Needs Manual Verification"

    # Emotional Intensity (0–100 scale)
    emotion = abs(TextBlob(news).sentiment.polarity)
    emotion_score = round(emotion * 100, 2)

    # Bias Detection (Simple heuristic)
    bias_level = "High Bias" if emotion_score > 60 else "Low Bias"

    # Source Credibility (demo logic)
    source_credibility = 70  # default score (can be dynamic later)

    # Adversarial Robustness Test
    modified_text = news + " shocking unbelievable secret conspiracy"
    adv_prediction = model.predict(vectorizer.transform([modified_text]))[0]
    robustness = "Stable" if adv_prediction == prediction else "Vulnerable"

    # SHAP Explanation
    shap_values = explainer(tfidf)
    feature_names = vectorizer.get_feature_names_out()

    word_importance = dict(zip(feature_names, shap_values.values[0]))
    top_words = sorted(
        word_importance.items(),
        key=lambda x: abs(x[1]),
        reverse=True
    )[:5]

    highlighted_words = [word for word, value in top_words]

    return {
        "prediction": final_prediction,
        "confidence": confidence,
        "fake_probability": round(probabilities[0] * 100, 2),
        "real_probability": round(probabilities[1] * 100, 2),
        "confidence_warning": warning,
        "emotional_intensity_score": emotion_score,
        "bias_level": bias_level,
        "source_credibility": source_credibility,
        "robustness": robustness,
        "highlighted_words": highlighted_words
    }

# ----------------------------------------------------------
# HTML ROUTES
# ----------------------------------------------------------

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():

    news = request.form["news"]
    result = analyze_news(news)

    return render_template(
        "index.html",
        result=result["prediction"],
        confidence=result["confidence"],
        fake_prob=result["fake_probability"],
        real_prob=result["real_probability"],
        emotion_score=result["emotional_intensity_score"],
        bias=result["bias_level"],
        credibility=result["source_credibility"],
        robustness=result["robustness"],
        warning=result["confidence_warning"],
        highlighted=result["highlighted_words"]
    )

# ----------------------------------------------------------
# JSON API ROUTE (For Postman / External Use)
# ----------------------------------------------------------

@app.route("/api/predict", methods=["POST"])
def api_predict():

    data = request.json
    news = data.get("news")

    result = analyze_news(news)

    return jsonify(result)

# ----------------------------------------------------------

if __name__ == "__main__":
    app.run(debug=True)