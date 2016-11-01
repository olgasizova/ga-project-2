const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
const dbConnection = 'mongodb://localhost:27017/employeeDB';



function findEmployee(req, res, next){
   MongoClient.connect(dbConnection, (err, db) => {
     if (err) return next(err);

     let query = {};
     if(req.query._id){
       query._id = ObjectId(req.query._id);
     }

     db.collection('employees')
       .find(query)
       .toArray((arrayError, data) => {
         if (arrayError) return next(arrayError);
         if(data.length > 0){
            console.log('user found:');
            console.log(data);
            // return data
            res.findEmployee = data;
         }else{
            //return error
            console.log('user not found');
            res.error='User not found.';
         }
         db.close;
         return next();
       });
       return false;
   });
   return false;
};

function addEmployee(req, res, next){
  MongoClient.connect(dbConnection, (err, db) => {
     if (err) return next(err);

     let userExistsFilter = {};
     console.log("User email filter = " + req.body.email);
     userExistsFilter.email=req.body.email;
//   check if emloyee exists

       db.collection('employees')
       .find(userExistsFilter)
       .toArray((arrayError, data) => {
          if (arrayError) return next(arrayError);

          console.log(data.length);

          if (data.length>0) {
            console.log('user exists');
            res.error='User exists.';
            db.close();
            return next(res.error);

          }
          return false;

       });



       // actual add new  employee
       db.collection('employees')
       .insertOne(req.body,
                function(err,record){
                  if(err) return next(err);
                  console.log("Record inserted:");
                  console.log(record.ops);

                  res.newEmployee = record.ops;
                  console.log("Record added as " + record.insertedId);
                  db.close();
                  return next();
                });
        return false;
       });



  return false;
};

function updateEmployee(req, res, next){
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) return next(err);

// credit for ObjectID and delete: http://stackoverflow.com/questions/8233014/how-do-i-search-for-an-object-by-its-objectid-in-the-console
    let updFilter = {_id:ObjectId(req.body._id)};
    delete req.body._id;
    let updObj = {$set:req.body};
    let sortObj = [['_id','asc']];

    //actual add new  employee
    //credit: http://stackoverflow.com/questions/24269827/how-to-return-full-document-in-a-mongodb-update-in-node

    db.collection('employees')
    .findAndModify(updFilter,sortObj,updObj,{"new": true},
            function(err,record){
              if(err) return next(err);
              console.log("Record updated:");
              console.log(record);

              res.updEmployee = record.value;
              console.log("Record updated as " + record.value._id);
              db.close();
              return next();
            });

      // db.collection('employees')
      // .update(updFilter,updObj,
      //         function(err,result){
      //           if(err) return next(err);

      //           console.log(result.result);
      //           console.log("Record updated:" + result.result.nModified);

      //         });


      // db.collection('employees')
      //  .find(updFilter)
      //  .toArray((arrayError, data) => {
      //    if (arrayError) return next(arrayError);
      //    if(data.length > 0){
      //       console.log('user found:');
      //       console.log(data);
      //       // return data
      //       res.updEmployee = data;
      //    }else{
      //       //return error
      //       console.log('user not found');
      //       res.error='User not found.';
      //    }
      //    db.close;
      //    return next();
      //  });

    });



  return false;
};


module.exports = {
  findEmployee,
  addEmployee,
  updateEmployee
};
