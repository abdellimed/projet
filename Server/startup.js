const express = require('express')
const ContentBasedRecommender = require('content-based-recommender')
const recommender = new ContentBasedRecommender({
    minScore: 0.07,
    maxSimilarDocuments: 100
  });
  
const app = express()
const port = 8080
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

const { ObjectId } = require('mongodb')

app.get('/', (req, res) => {

    // SELECT **** ORDER BY ...  => FIND sort
    
    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        var Relatic = db.db('Relatic');

        var query = {'Funding Type': 'Debt Financing'}
        Relatic.collection('startups').find(query).toArray(function(err,company){

            
            console.log(company);
            
            db.close();

        })
  
    })



    

    res.send('Hello World!')
})


app.get('/api',(req, res)=>{

    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        var Relatic = db.db('Relatic');

        //var query = {"Full_Description":{$ne: ""}}
        var query = {"Full_Description":{$ne: ""}}
        startups=Relatic.collection('startups')
        startups.find(query).project({_id:1 ,Full_Description:1}).toArray(function(err,company){

            
            const data=company;

            let idModified = data.map(
                obj => {
                    return {
                        "id" : obj._id,
                        "content":obj.Full_Description
                       
                    }
                }
            );

            console.log(typeof idModified[0].content);
            
            // Ajouter à la liste l'investisseur de recommendation
            
            recommender.train(idModified);
            const similarDocuments = recommender.getSimilarDocuments("61c1ad9b04542ca203b0b9aa", 0, 10);

            //console.log(typeof similarDocuments);
            
            
            res.send({'status':true,similarDocuments})


            
            db.close();

        })
  
    })


})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})