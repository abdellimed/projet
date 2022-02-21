const express = require('express')
var stringSimilarity = require("string-similarity");

const ContentBasedRecommender = require('content-based-recommender')
const recommender = new ContentBasedRecommender({
    minScore: 0.07,
    maxSimilarDocuments: 100
  });
  
const app = express()
const port = 5000
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';
var cors = require('cors');
const { result } = require('underscore');
const { ObjectId } = require('mongodb')
app.use(cors());

// parse application/json




app.get('/', (req, res) => {

    // SELECT **** ORDER BY ...  => FIND sort
    
    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        var Relatic = db.db('Relatic');

        var query = {}
        Relatic.collection('invesstis').find(query).toArray(function(err,company){

            
            console.log(company);
            
            db.close();

        })
  
    })

    res.send('Hello World!')
})






app.post('/api/startups/signin',(req,res)=>{

    var body = [];
    req.on('data', (c) => {
        body.push(c);
    }).on('end', () => { 

        let textData = Buffer.concat(body).toString();
        let JsonBody = JSON.parse(textData);

        // check if user is already in the database
        console.log(JsonBody);
        MongoClient.connect(url,function(err,db){
            var eshop = db.db('Relatic');

            eshop.collection('startups').find({email:JsonBody.email,password:JsonBody.password }).toArray(function(err,result){
                if (result.length === 0) {
                    res.send({success:false, message:"Wrong email or password."})

                }else{
                    res.send({ success: true, message:result })
                    
                }
            })
        })
        


        
    })
    



})











app.post('/api/investor/signin',(req,res)=>{

    var body = [];
    req.on('data', (c) => {
        body.push(c);
    }).on('end', () => { 

        let textData = Buffer.concat(body).toString();
        let JsonBody = JSON.parse(textData);

        // check if user is already in the database
        console.log(JsonBody);
        MongoClient.connect(url,function(err,db){
            var eshop = db.db('Relatic');

            eshop.collection('investisors').find({email:JsonBody.email,password:JsonBody.password }).toArray(function(err,result){
                if (result.length === 0) {
                    res.send({success:false, message:"Wrong email or password."})

                }else{
                    res.send({ success: true, message:result })
                    
                }
            })
        })
        


        
    })
    



})








app.post('/api/investissor',(req,res)=>{

    res.send({ success: true, message: "invest saved successfully" })
})



app.post('/create_new_startup',(req,res)=>{

    MongoClient.connect(url, function (err, db) {
        var Relatic = db.db('Relatic');

       

        var body = [];
        req.on('data', (c) => {

            body.push(c);
         }).on('end', () => {

            let textData = Buffer.concat(body).toString();
            let investisor = JSON.parse(textData);
            console.log(investisor);
            
            Relatic.collection('startups').find({"email":investisor.email}).toArray(function(err,result){
                if (result.length === 0) {
                    

                    Relatic.collection('startups').insertOne(investisor, function (err, resInsert) {
                        if (err) {
                                throw err;
                        }
        
                        res.send({ success: true, message: "Enregistrement avec succes" });
        
                        })


                }
                else{

                     res.send({success:false, message:"cet utilisateur existe déja"})
                }
            })
            

           


          });
     
    });

})





app.post('/create_new_investissor',(req,res)=>{

    MongoClient.connect(url, function (err, db) {
        var Relatic = db.db('Relatic');

       

        var body = [];
        req.on('data', (c) => {

            body.push(c);
         }).on('end', () => {

            let textData = Buffer.concat(body).toString();
            let investisor = JSON.parse(textData);
            console.log(investisor);
            
            Relatic.collection('investisors').find({"email":investisor.email}).toArray(function(err,result){
                if (result.length === 0) {
                    

                    Relatic.collection('investisors').insertOne(investisor, function (err, resInsert) {
                        if (err) {
                                throw err;
                        }
        
                        res.send({ success: true, message: "invest saved successfully" });
        
                        })


                }
                else{

                     res.send({success:false, message:"cet investisseur existe dans la base de données ."})
                }
            })
            

            Relatic.collection('startups').find({"Funding Type":investisor['Funding Type'],"Full_Description":{$ne: ""}}).toArray(function(err,result){

            

           
        
            

            
                            
            
            //console.log(result.find({'Money Raised': 1333333}));
           // res.send({result})
          // console.log([result[0].Industries]);


           const data=result;

           /* let idModified = data.map(
                obj => {
                    return {
                        "id" : obj._id,
                        "content":obj.Full_Description.toString().slice(1,50)
                       
                    }
                }
            );*/
           /* const invest={
                "id" : 3,
                "content":investisor.Full_Description.slice(1,50).toString()
            }
            idModified.push(invest)
            console.log(idModified);
                            */
            
            // Ajouter à la liste l'investisseur de recommendation
            
            
            
            //res.send({'status':true,similarDocuments})

            })


          });
     
    });

})

app.get('/:nom_investisseur', (req, res) => {

    // SELECT **** ORDER BY ...  => FIND sort
    
    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        var Relatic = db.db('Relatic');

        const nom_investisseur=req.params.nom_investisseur


        Relatic.collection('investisors').find({"investor_name":nom_investisseur}).toArray(function(err,invest){
            console.log(nom_investisseur);
            if (err) {
                throw err;
                
            }

            if (invest.length==0) {
                console.log("veillez vérifier le nom d'investisseur que vous entré");
                res.send({'status':"err"})
            } 
            
            else {
                Relatic.collection('startups').find({"Funding Type":invest[0]['Funding Type'],"Full_Description":{$ne: ""},"Full_Description":{$ne: NaN}}).toArray(function(err,startups){
                    const data=startups;

                   
                      //console.log(result);
                    const vls=startups.filter(word => {
                        return word['Industries'].some(elm=>{return invest[0].Industries.includes(elm)})

                

                         // return word['Industries'].includes(' Software');


                        });

            


                    let idModified = vls.map(


                        obj => {
                            return {
                                "id" : obj._id,
                                "content":obj.Full_Description.toString()
                           
                            }
                                    }
                         );


                    const ratings = [];
                    let bestMatchcompany =[];
            
               
                    for (let i = 0; i < vls.length; i++) {
                        var  currentTargetString = vls[i].Full_Description;
                    
                        var currentRating = stringSimilarity.compareTwoStrings(invest[0].Full_Description, currentTargetString)


                        ratings.push({target: currentTargetString, rating: currentRating})
                        if (currentRating > 0.4) {
                            bestMatchcompany.push({startup:vls[i],rating: currentRating})
                        }
                    }
                
                 //const bestMatch = ratings[bestMatchIndex]

                    res.send({"invest":invest,"best_companys":bestMatchcompany})
                    console.log(vls.length); 






           
           
                })

            
            }
            

        })
  
    })

    
})











app.get('/api/:id', (req, res) => {

    // SELECT **** ORDER BY ...  => FIND sort
    
    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        var Relatic = db.db('Relatic');
        var identif =  req.params.id
        //const id=new ObjectId(req.params.id)
        console.log(ObjectId(identif));


        Relatic.collection('investisors').find({"_id":ObjectId(identif)}).toArray(function(err,invest){
            
            if (err) {
                throw err;
                
            }

            if (invest.length==0) {
                console.log("vérifier votre identifiant");
                res.send({'status':"err"})
            } 
            
            else {
                console.log(invest[0].FundingType);
                
                Relatic.collection('startups').find({"Funding Type":invest[0].FundingType,"Full_Description":{$ne: ""},"Full_Description":{$ne: NaN}}).toArray(function(err,startups){
                    const data=startups;

                   
                    console.log(startups);

                   /* const vls=startups.filter(word => {
                        return word['Industries'].some(elm=>{return invest[0].Secteur.includes(elm)})

                

                         // return word['Industries'].includes(' Software');


                        });*/

            

                    const vls=startups
                    let idModified = vls.map(


                        obj => {
                            return {
                                "id" : obj._id,
                                "content":obj.Full_Description.toString()
                           
                            }
                                    }
                         );


                    const ratings = [];
                    let bestMatchcompany =[];
            
               
                    for (let i = 0; i < vls.length; i++) {
                        var  currentTargetString = vls[i].Full_Description;
                    
                        var currentRating = stringSimilarity.compareTwoStrings(invest[0].Full_Description, currentTargetString)


                        ratings.push({target: currentTargetString, rating: currentRating})
                        if (currentRating > 0.4) {
                            bestMatchcompany.push({startup:vls[i],rating: currentRating})
                        }
                    }
                

                 //const bestMatch = ratings[bestMatchIndex]

                    //res.send({"invest":invest,"best_companys":bestMatchcompany})
                    res.send({invest:invest,bestcompanys:bestMatchcompany})
                    console.log(vls.length); 






           
           
                })

            
            }
            

        })
  
    })

    
})











app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})