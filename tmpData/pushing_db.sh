pushing_db.sh

How to push local db into remote server

mongodump -h 127.0.0.1:3001 -d meteor -o dbDump/

meteor mongo --url http://cornellcoursereview.meteor.com/

mongodb://client-82f74e50:a2a83a39-c493-25df-b6df-a262329798e3@production-db-a2.meteor.io:27017/cornellcoursereview_meteor_com





mongodb://client:PASSWORD@sky.member1.mongolayer.com:27017/YOURSITE_meteor_com

mongorestore -u client -h database-url.com:27017 -d myapp_meteor_com -p 'password' dbDump/meteor

mongorestore -u client-82f74e50 -h production-db-a2.meteor.io:27017 -d cornellcoursereview_meteor_com -p a2a83a39-c493-25df-b6df-a262329798e3 dbDump/meteor