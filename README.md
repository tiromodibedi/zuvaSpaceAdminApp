# zuvaSpaceAdmin MEAN-Stack Application

* This project uses AngularJS on the Front-end and NodeJS on the Back-end. Data is saved on MongoDB Database.
* Image File upload are saved on the cloud usin ["Cloudinary"](https://cloudinary.com)


## Running
1. Follow the Setup steps in the server README file
2. Follow the Setup steps in the client README file
3. Download ["Moesif CORS"](https://www.moesif.com/) on chrome to enable *cross origin resources charing*
4. Reload browser and register a new user example:
  * username: thanos
  * password: infinityGems
5. Then Navigate to mongodb directory .. in my machine `C:\Program Files\MongoDB\Server\3.4\bin` then run `mongo` and follow these steps on the command line:
  * `use testDatabase`
  * `db.users.update({username:"thanos"},{$set:{admin:true}})`
  * These steps will make the above user an admin.
6. Logout of the app and login again
