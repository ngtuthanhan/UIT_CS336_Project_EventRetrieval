import os
import pandas as pd
import json

df = pd.read_table('all.tsv',  names=['url', 'text'], header=None)

keyframes = []

for i in range(len(df)):
    url = df['url'][i]
    os.system(f"wget {url} -O video/{i}.gif")
    os.system(f"""ffmpeg -skip_frame nokey -i video/{i}.gif -vf "select='eq(pict_type,I)'" keyframe/{i}_%d.jpeg""")

    frames = os.listdir("keyframe")
    frame_temp = []
    for frame in frames: 
        video, frame_id = frame.split("_")
        if video == str(i):
            frame_temp.append(frame_id)
    
    frame_temp.sort()
    for j, frame_id in enumerate(frame_temp):
        
        keyframes.append({
            "url": url,
            "video": str(i) + ".gif",
            "keyframe": str(i) +"_"+ frame_id,
            "frame_id": frame_id,
            "frame_position": j
        })
with open("../Dockerfile_mongo/keyframe.json", "w") as outfile:
    json.dump(keyframes, outfile)

        
