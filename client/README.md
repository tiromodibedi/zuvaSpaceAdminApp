# zuvaSpaceAdminClient-AngularJS Application
============================================

* This sample project uses AngularJS a.k.a **Angular 1**

* What does this project do?
  * A single Page Web Application for ZuvaSpace Classified adverts management.
  * Upload and manage Classifieds adverts.
  * Image Files for the Classifieds are saved in the cloud using ["Cloudinary"](https://cloudinary.com).

## Configuration
* There are two settings to change for this demo to work. Copy or rename `app/scripts/config.js.sample` to `app/scripts/config.js` and edit the following:
  * **cloud_name** - Should be change to the cloud name you received when you registered for a Cloudinary account.
  * **upload_preset** - You should first "Enable unsigned uploads" in the ["Upload Settings"](https://cloudinary.com/console/settings/upload) of your Cloudinary console and assign the resulting preset name to that field. Note, you may want to tweak and modify the upload preset's parameters.


## Setup
* This project uses Gulp to automate tasks and compile a web app that can be run on the server.

* For client side package management Bower is used.
  * run `bower install` on the command to install packages

* For the Gulp Task runner Node Package Manager is used to manage packages necessary to run Gulp.
  * run `npm install` on the command to install the packages

## Running
* run the command `gulp watch` to run the project on the Browser.
