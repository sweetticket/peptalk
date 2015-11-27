pushing_db.sh

How to push local db into remote server

mongodump -h 127.0.0.1:3001 -d meteor -o dbDump/

meteor mongo --url www.cornellcoursereview.me

mongodb://client-24d75576:87ba947e-0576-fb4a-b72d-a91ec03796d9@production-db-a2.meteor.io:27017/www_cornellcoursereview_me

mongodb://client:PASSWORD@sky.member1.mongolayer.com:27017/YOURSITE_meteor_com

mongorestore -u client -h database-url.com:27017 -d myapp_meteor_com -p 'password' dbDump/meteor

mongorestore -u client-24d75576 -h production-db-a2.meteor.io:27017 -d www_cornellcoursereview_me -p 87ba947e-0576-fb4a-b72d-a91ec03796d9 dbDump/meteor