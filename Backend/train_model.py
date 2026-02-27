# ==================================================
# HACKATHON-WINNING FAKE NEWS DETECTION SYSTEM
# ==================================================

import pandas as pd
import numpy as np
import re
import string
import pickle

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import LinearSVC
from sklearn.calibration import CalibratedClassifierCV
from sklearn.metrics import accuracy_score, classification_report
from sklearn.ensemble import VotingClassifier

from textblob import TextBlob

from transformers import pipeline

print("Loading dataset...")

fake = pd.read_csv("Fake.csv", encoding="latin1")
real = pd.read_csv("True.csv", encoding="latin1")

fake["label"] = 0
real["label"] = 1

data = pd.concat([fake, real], ignore_index=True)

# -----------------------
# Text Cleaning
# -----------------------

def clean_text(text):
    text = str(text).lower()
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"\d+", "", text)
    text = text.translate(str.maketrans("", "", string.punctuation))
    return text.strip()

data["text"] = data["text"].apply(clean_text)

# Emotional Feature
data["emotion"] = data["text"].apply(
    lambda x: abs(TextBlob(x).sentiment.polarity)
)

# -----------------------
# Train Test Split
# -----------------------

X_train, X_test, y_train, y_test = train_test_split(
    data["text"], data["label"],
    test_size=0.2,
    random_state=42
)

# -----------------------
# TF-IDF
# -----------------------

vectorizer = TfidfVectorizer(
    max_features=8000,
    ngram_range=(1, 2),
    stop_words="english"
)

X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

# -----------------------
# Classical Models
# -----------------------

log_reg = LogisticRegression(max_iter=3000)
svm = LinearSVC()
rf = RandomForestClassifier()

log_reg.fit(X_train_tfidf, y_train)
svm.fit(X_train_tfidf, y_train)
rf.fit(X_train_tfidf, y_train)

# Calibrated confidence model
calibrated_log = CalibratedClassifierCV(log_reg)
calibrated_log.fit(X_train_tfidf, y_train)

# -----------------------
# Evaluation
# -----------------------

print("\nModel Evaluation:\n")

for model, name in [(log_reg,"LogReg"),(svm,"SVM"),(rf,"RandomForest")]:
    preds = model.predict(X_test_tfidf)
    print(name, "Accuracy:", round(accuracy_score(y_test, preds)*100,2), "%")

print("\nDetailed Report (LogReg):")
print(classification_report(y_test, log_reg.predict(X_test_tfidf)))

# -----------------------
# Load BERT Pipeline
# -----------------------

print("\nLoading BERT model...")
bert_model = pipeline("text-classification", model="distilbert-base-uncased-finetuned-sst-2-english")

# -----------------------
# Save Models
# -----------------------

pickle.dump(calibrated_log, open("model.pkl","wb"))
pickle.dump(vectorizer, open("vectorizer.pkl","wb"))

print("\nSystem training complete.")