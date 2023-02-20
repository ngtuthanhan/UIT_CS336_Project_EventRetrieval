# UIT_CS336_Project_EventRetrieval - System for efficient interactive event retrieval from visual data

### Step 1 - Data handling
In CLI, run
```
cd data
mkdir video
mkdir keyframe
python data_handle.py
cd ..
```

### Step 2 - Run our web system
In CLI, run
```
docker-compose up --build
```

### Step 3 - Import data to database and run model
Open new CLI (still open the remaining CLI), excute
```
docker exec -it mongodb_tiuday bash
cd app/Dockerfile_mongo
bash import_db.sh
```
Open 3rd CLI (still open the remaining 2 CLIs), excute
```
cd model
python main.py
```
Wait for the model to load, then execute the query in vietnamese/ english text
