/**
 * import dependencies
 */
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('../verify');
var Classifieds = require('../../models/classifiedModel'); // import the schema
//var multer = require('multer');
//var cloudinary = require('cloudinary');
//var cloudinaryStorage = require('multer-storage-cloudinary');

/**
 *  Configure cloudinary Settings
 */
/*cloudinary.config({
  cloud_name : 'prime-48',
  api_key : '982294955718622',
  api_secret : 'eQMfUmK8zhUyw-c_etLTSicpklo'
});*/

/**
 * Configure cloudinaryStorage for file upload
 */
/*var storage = cloudinaryStorage({
  cloudinary : cloudinary,
  folder : 'zuvaSpaceAdminImageUploads',
  allowedFormats : ['jpg','png','gif','jpeg'],
  filename : function (req, file, callback) {
    callback(null, Date.now() + file.originalname)
  }
})*/

/**
 * Create an upload variable
 */

/*var upload = multer({
  storage: storage
});*/


/**
 * Create an express router and apply the json body-parser middleware
 */
var classifiedRouter = express.Router();
classifiedRouter.use(bodyParser.json());

/**
 * Process Routes to "...host/classifieds/  "
 * GET, POST, DELETE methods
 */
classifiedRouter.route('/')
    .get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Classifieds.find(req.query)
            .populate('postedBy')
            .exec(function (err, classified) {
                if (err) {
                    return next(err);
                }
                res.json(classified);
            });
    })
    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
      /*
        cloudinary.uploader.upload(req, function (result) {
          req.body.image = result.secure_url;
          //console.log(result.secure_url);
        })*/
        req.body.postedBy = req.decoded._id;
        Classifieds.create(req.body, function (err, classified) {
            if (err) {
                return next(err);
            }
            console.log("Property created");
            var id = classified._id;
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("Added the classified ad with id: " + id)
        });
    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Classifieds.remove({}, function (err, result) {
            res.end('Deleting all Classifieds');
            res.json(result)
        })
    });

/**
 * Process Routes to "host/classifieds/id/" for a specific classified
 * GET, PUT, DELETE methods
 */
classifiedRouter.route('/:ID')
    .get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Classifieds.findById(req.params.ID)
            .populate('postedBy')
            .exec(function (err, classified) {
                if (err) {
                    return next(err);
                }
                res.json(classified);
            });
    })
    .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Classifieds.findByIdAndUpdate(req.params.ID, { $set: req.body },
            { new: true }, function (err, classified) {
                if (err) {
                    return next(err);
                }
                res.json(classified);
            });
    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Classifieds.findByIdAndRemove(req.params.ID, function (err, result) {
            if (err) {
                return next(err);
            }
            res.json(result);
        });
    })
    ;

module.exports = classifiedRouter;
