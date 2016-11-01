const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
const dbConnection = 'mongodb://localhost:27017/employeeDB';



function findEAddress(req, res, next){
   MongoClient.connect(dbConnection, (err, db) => {
     if (err) return next(err);

     let query = {_id:ObjectId(req.body._id)};

     db.collection('addresses')
       .find(query)
       .toArray((arrayError, data) => {
         if (arrayError) return next(arrayError);
         if(data.length > 0){
            console.log('address found:');
            console.log(data);
            // return data
            res.findEmployee = data;
         }else{
            //return error
            console.log('address not found');
            res.error='address not found.';
         }
         db.close;
         return next();
       });
       return false;
   });
   return false;
};



function updateAddress(req, res, next){
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) return next(err);

// credit for ObjectID and delete: http://stackoverflow.com/questions/8233014/how-do-i-search-for-an-object-by-its-objectid-in-the-console
    let updFilter = {_id:ObjectId(req.body._id)};
    delete req.body._id;
    let updObj = {$set:req.body};
    let sortObj = [['_id','asc']];

    //actual add new  employee
    //credit: http://stackoverflow.com/questions/24269827/how-to-return-full-document-in-a-mongodb-update-in-node

    db.collection('addresses')
    .findAndModify(updFilter,sortObj,updObj,{"new": true, "upsert":true},
            function(err,record){
              if(err) return next(err);
              console.log("Record updated:");
              console.log(record);

              res.updEmployee = record.value;
              console.log("Record updated as " + record.value._id);
              db.close();
              return next();
            });

 

    });



  return false;
};


module.exports = {
  findAddress,
  updateAddress
};
