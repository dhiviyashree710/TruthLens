# ==========================================================
# FINAL HACKATHON FAKE NEWS DETECTION SYSTEM (CLEAN VERSION)
# ==========================================================

from flask import Flask, send_from_directory, jsonify, request
import pickle
import shap
import numpy as np
from textblob import TextBlob
import os
from dotenv import load_dotenv

# ----------------------------------------------------------
# Flask App Config (React Static Serving)
# ----------------------------------------------------------

app = Flask(__name__, static_folder="static", static_url_path="/")

# ----------------------------------------------------------
# Load Environment Variables
# ----------------------------------------------------------

load_dotenv()

# ----------------------------------------------------------
# Load Model & Vectorizer
# ----------------------------------------------------------

model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

# Extract underlying model for SHAP (if calibrated)
try:
    real_model = model.calibrated_classifiers_[0].estimator
except:
    real_model = model

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

    warning = "High confidence" if confidence >= 60 else "⚠ Low Confidence - Needs Manual Verification"

    emotion = abs(TextBlob(news).sentiment.polarity)
    emotion_score = round(emotion * 100, 2)

    bias_level = "High Bias" if emotion_score > 60 else "Low Bias"

    source_credibility = 70

    modified_text = news + " shocking unbelievable secret conspiracy"
    adv_prediction = model.predict(vectorizer.transform([modified_text]))[0]
    robustness = "Stable" if adv_prediction == prediction else "Vulnerable"

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
# Serve React Frontend
# ----------------------------------------------------------

@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")

# ----------------------------------------------------------
# API Route for React
# ----------------------------------------------------------

@app.route("/api/predict", methods=["POST"])
def api_predict():
    data = request.json
    news = data.get("news")

    result = analyze_news(news)

    return jsonify(result)

# ----------------------------------------------------------
# Run App
# ----------------------------------------------------------

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000)