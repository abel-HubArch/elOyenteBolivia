const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(require('./credential.json')),
    databaseURL: "https://el-oyente-default-rtdb.firebaseio.com"
})

const db = admin.firestore();

router.get('/',async (req, res)=>{
    const query = db.collection('noticias').orderBy("titulo", "asc").limit(2);
    const querySnapshot = await query.get();

    const docs = querySnapshot.docs;

    const responseNoticias = docs.map(doc =>({
        id: doc.id,
        titulo: doc.data().titulo,
        img: doc.data().img,
        imgGraph: doc.data().imgGraph,
        resumen: doc.data().resumen,
        noticia: doc.data().noticia,
        fecha: doc.data().fecha
    }));

    console.log(responseNoticias);
    res.render('index.html', {noticias: responseNoticias})
   
});

router.get('/noticias', async (req, res)=>{
    const query = db.collection('noticias');
    const querySnapshot = await query.get();

    const docs = querySnapshot.docs;

    const responseNoticias = docs.map(doc =>({
        id: doc.id,
        titulo: doc.data().titulo,
        img: doc.data().img,
        imgGraph: doc.data().imgGraph,
        resumen: doc.data().resumen,
        noticia: doc.data().noticia,
        fecha: doc.data().fecha
    }));

    console.log(responseNoticias);
    res.render('noticias.html', {noticias: responseNoticias})
});

router.get('/noticias/:noticiaId', (req, res)=>{
    (async ()=>{
        try {
         const doc = db.collection('noticias').doc(req.params.noticiaId);
         const item = await doc.get();
         const response = item.data();
         res.render('noticia.html', {noticia: response})
         

         } catch (error) {
             return res.status(500).send(error);
         }
    })();
})



router.get('/visionesPoliticas', async(req, res)=>{
    const query = db.collection('visionespoliticas');
    const querySnapshot = await query.get();

    const docs = querySnapshot.docs;

    const responseNoticias = docs.map(doc =>({
        id: doc.id,
        titulo: doc.data().titulo,
        img: doc.data().img,
        imgGraph: doc.data().imgGraph,
        resumen: doc.data().resumen,
        noticia: doc.data().noticia,
        fecha: doc.data().fecha
    }));

    console.log(responseNoticias);
    res.render('visionesPoliticas.html', {noticias: responseNoticias})
});
router.get('/visionesPoliticas/:noticiaId', (req, res)=>{
    (async ()=>{
        try {
         const doc = db.collection('visionespoliticas').doc(req.params.noticiaId);
         const item = await doc.get();
         const response = item.data();
         res.render('vision.html', {noticia: response})
         

         } catch (error) {
             return res.status(500).send(error);
         }
    })();
})




module.exports = router;