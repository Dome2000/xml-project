//manage Routing
var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectId;
const monk = require('monk')
var cookieSession = require('cookie-session')

// Connection URL
const url = 'localhost:27017/ProjectXML';
const db = monk(url);

//upload file
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images') // ตำแหน่งจัดเก็บไฟล์
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + ".jpg") // เปลี่ยนชื่อไฟล์และป้องกันชื่อไฟล์ซ้ำกัน
    }
})

// start upload
const upload = multer({
    storage: storage
})

// router.post('/register', (req, res) => {
//   console.log(req.body)
//   res.redirect('/')
// })

var response = ""

function al() {
    alert('5555555');
}

router.get('/login', function (req, res) {
    if (response == "" || response == " ") {
        console.log(response)
        res.render('login', { title: 'LongKidDoo', msg: "" });
    }
    else if (response != "" || response != " ") {
        console.log(response)
        let products = db.get('Products')
        products.find({}, function (err, prod) {
            res.render('admin_products', { title: 'LongKidDoo', callData: prod });
        });
    }
});

router.post('/login', function (req, res) {
    console.log(response)
    let collection = db.get("Admins")
    collection.find({ adminname: req.body.adname, password: req.body.password }, function (err, docs) {
        if (docs[0]) {
            response = req.body.adname
            let products = db.get('Products')
            products.find({}, function (err, prod) {
                res.render('admin_products', { title: 'LongKidDoo', callData: prod });
            });
            // res.send(docs[0])
        }
        else {
            res.redirect('/auth/login');
        }
    });
});


router.get('/adsearch', function (req, res) {
    if (response == "" || response == " ") {
        console.log(response)
        res.render('login', { title: 'LongKidDoo' });
    }
    else if (response != "" || response != " ") {
        let text_search = req.query.text_search
        console.log(text_search)
        let collection = db.get('Products');
        if (text_search != "" && text_search != " ") {
            collection.find({ Brand: text_search }, function (err, docs) {
                res.render('admin_products', { title: 'LongKidDoo', link: "login", callData: docs });
            })
        }
        else {
            collection.find({}, function (err, docs) {
                console.log(response)
                res.render('admin_products', { title: 'LongKidDoo', link: "login", callData: docs });
            })
        }
    }
});

router.get('/insert', function (req, res) {
    if (response == "" || response == " ") {
        console.log(response)
        res.render('login', { title: 'LongKidDoo' });
    }
    else if (response != "" || response != " ") {
        console.log(response)
        res.render('insert_products', { title: 'LongKidDoo' });
    }
});

router.post('/insert', upload.single("image"), function (req, res) {
    console.log(req.file);
    let dimensions = req.body.lp_width + " x " + req.body.lp_height + " x " + req.body.lp_deep + " cm"
    let weight = req.body.lp_weight + " Kg"
    let screen = req.body.lp_sc_size + " inch"
    let collection = db.get('Products');
    collection.insert({
        Brand: req.body.lp_brand,
        Name: req.body.lp_name,
        ProcessorBrand: req.body.lp_cpu_brand,
        Processor: req.body.lp_cpu_name,
        Memory: req.body.lp_memory,
        Storage: req.body.lp_storage,
        GraphicsBrand: req.body.lp_gpu_brand,
        Graphics: req.body.lp_gpu_name,
        ScreenSize: screen,
        Display: req.body.lp_display,
        Dimensions: dimensions,
        Weight: weight,
        Warranty: req.body.lp_warranty,
        img: "images/" + req.file.filename,
        Price: req.body.lp_price,
    })
    res.redirect('/auth/login');
});

router.get('/edit/:id', function (req, res) {
    if (response == "" || response == " ") {
        console.log(response)
        res.render('login', { title: 'LongKidDoo' });
    }
    else if (response != "" || response != " ") {
        console.log(response)
        let collection = db.get('Products');
        collection.find({ _id: req.params.id }, function (err, docs) {
            res.render('edit_product', { title: 'LongKidDoo', link: "login", callData: docs });
        })
    }
});

router.post('/updated/:id', upload.single("image"), function (req, res) {
    console.log(req.file);
    let collection = db.get('Products');
    let dimensions = req.body.lp_width + " x " + req.body.lp_height + " x " + req.body.lp_deep + " cm"
    let weight = req.body.lp_weight + " Kg"
    let screen = req.body.lp_sc_size + " inch"
    if (req.file != undefined) {
        collection.update({ _id: req.params.id }, {
            $set:
            {
                Brand: req.body.lp_brand,
                Name: req.body.lp_name,
                ProcessorBrand: req.body.lp_cpu_brand,
                Processor: req.body.lp_cpu_name,
                Memory: req.body.lp_memory,
                Storage: req.body.lp_storage,
                GraphicsBrand: req.body.lp_gpu_brand,
                Graphics: req.body.lp_gpu_name,
                ScreenSize: screen,
                Display: req.body.lp_display,
                Dimensions: dimensions,
                Weight: weight,
                Warranty: req.body.lp_warranty,
                img: "images/" + req.file.filename,
                Price: req.body.lp_price
            }
        })
        res.redirect('/auth/login');
    }
    else if (req.file == undefined) {
        collection.update({ _id: req.params.id }, {
            $set:
            {
                Brand: req.body.lp_brand,
                Name: req.body.lp_name,
                ProcessorBrand: req.body.lp_cpu_brand,
                Processor: req.body.lp_cpu_name,
                Memory: req.body.lp_memory,
                Storage: req.body.lp_storage,
                GraphicsBrand: req.body.lp_gpu_brand,
                Graphics: req.body.lp_gpu_name,
                ScreenSize: screen,
                Display: req.body.lp_display,
                Dimensions: dimensions,
                Weight: weight,
                Warranty: req.body.lp_warranty,
                Price: req.body.lp_price
            }
        })
        res.redirect('/auth/login');
    }
});

router.get('/delete/:id', function (req, res) {
    if (response == "" || response == " ") {
        console.log(response)
        res.render('login', { title: 'LongKidDoo' });
    }
    else if (response != "" || response != " ") {
        console.log(response)
        let collection = db.get('Products');
        collection.remove({ _id: req.params.id })
        res.redirect('/auth/login');
    }
});

router.get('/l;.,kooplki9ghbvftoplki9uijhy7tygfr5', function (req, res) { //logout
    if (response == "" || response == " ") {
        console.log(response)
        res.render('login', { title: 'LongKidDoo' });
    }
    else if (response != "" || response != " ") {
        response = ""
        console.log(response)
        res.redirect('/');
    }
});

module.exports = router