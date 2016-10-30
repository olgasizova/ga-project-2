const { MongoClient } = require('mongodb');
const dbConnection = 'mongodb://localhost:27017/employeeDB';



const findEmployee = (req, res, next) => {
   MongoClient.connect(dbConnection, (err, db) => {
     if (err) return next(err);

     db.collection('employees')
       .find(req.requestObject)
       .toArray((arrayError, data) => {
         if (arrayError) return next(arrayError);

          // return data
          res.findEmployee = data;
          return next();
       });
   });
};

const addEmployee = (req, res, next) => {
   MongoClient.connect(dbConnection, (err, db) => {
     if (err) return next(err);

     let userExistsFilter = {};
     userExistsFilter.email=req.requestObject.email;
//   check if emloyee exists

       db.collection('employees')
       .find(userExistsFilter)
       .toArray((arrayError, data) => {
          if (arrayError) return next(arrayError);

          if (data.length) res.status(500).send({ error: 'User exists' });

          return next();
       });

       // actual add new  employee
       db.collection('employees')
       .insert(req.requestObject,
                function(err,records){
                  res.addedEmployee = records[0];
                  console.log("Record added as " + records[0]._id);

                  res.newEmployee = records[0];

                  return next();
                });
      return false;


   });



  return { employeeDB };
};

module.exports = {
  findEmployee,
  addEmployee
};
