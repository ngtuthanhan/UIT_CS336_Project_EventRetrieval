import glob 
import numpy as np
import pandas as pd
from utils.TIUday import Indexing
extractor = Indexing("../data/keyframe/")
features, index = extractor.get_all_features
with open('features.npy','wb') as f:
    np.save(f,features)

with open('index.npy','wb') as f:
    np.save(f,index)