import pandas as pd
import os
import glob
import time
import numpy as np
import scann
from utils.TIUday import Searcher, CLIPFeatureExtractor, Indexing
import json
from googletrans import Translator


def load_model(features, index):
    SEARCHER = Searcher(index=index, features=features)
    CLIP = CLIPFeatureExtractor()
    MODELS = {
        "SEACHER": SEARCHER,
        "EXTRACTOR": CLIP
    }
    return MODELS


features = np.load("features.npy")
index = np.load("index.npy")
MODELS = load_model(features, index)


def handle_query(query, MODELS):
    text_embedding = MODELS["EXTRACTOR"](query)
    results = MODELS["SEACHER"](np.array(text_embedding).reshape(-1))
    return results


if __name__ == "__main__":
    while True:
        f = open('Query.json', 'r')
        raw_data = f.read()
        f.close()
        if raw_data == "":
            continue
        data = json.loads(raw_data)
        if data['Vietnamese'] != "":
            translator = Translator()
            English = translator.translate(data['Vietnamese'] , src='vi', dest='en').text
        else:
            English = data['English']
        f = open('Query.json', 'w')
        f.close()
        print(English)
        start = time.time()
        results = handle_query(English, MODELS)
        results = pd.DataFrame(results)
        results_frame = [results[0][i] +"_" +results[1][i] for i in range(len(results))]
        with open("Ans_query.json", "w") as output:
            json.dump(results_frame, output)
        end = time.time()
        print(end - start)
