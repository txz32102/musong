# connect to the remote sql db

mysql -h rm-uf6ck3u12o3frjt10jo.mysql.rds.aliyuncs.com -P 3306 -u tester1 -p

# dashboard

https://wakatime.com/dashboard

# open backend

uvicorn main:app --reload --port 8000

# backend design

1. (query id, date, text, images (this can be multiply), files (this can be multiply), audio)


```sql
CREATE DATABASE user_history;

USE user_history;

-- Main table for storing query data
CREATE TABLE user_query (
    query_id INT AUTO_INCREMENT PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    text TEXT,
    UNIQUE KEY query_id (query_id)
);

-- Table for storing multiple images associated with a query
CREATE TABLE query_images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    query_id INT,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (query_id) REFERENCES user_query(query_id) ON DELETE CASCADE
);

-- Table for storing multiple files associated with a query
CREATE TABLE query_files (
    file_id INT AUTO_INCREMENT PRIMARY KEY,
    query_id INT,
    file_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (query_id) REFERENCES user_query(query_id) ON DELETE CASCADE
);

-- Table for storing multiple audio files associated with a query
CREATE TABLE query_audio (
    audio_id INT AUTO_INCREMENT PRIMARY KEY,
    query_id INT,
    audio_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (query_id) REFERENCES user_query(query_id) ON DELETE CASCADE
);
```

