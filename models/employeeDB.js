const { MongoClient } = require('mongodb');
const dbConnection = 'mongodb://localhost:27017/employeeDB';



function findEmployee(req, res, next){
   MongoClient.connect(dbConnection, (err, db) => {
     if (err) return next(err);

     db.collection('employees')
       .find(req.body)
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



module.exports = {
  findEmployee,
  addEmployee
};
