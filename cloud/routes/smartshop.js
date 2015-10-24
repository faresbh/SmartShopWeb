var Prod = Parse.Object.extend("product");

exports.home = function(req,res)  {
	res.render('index', {
    	title: "SmartShop | Sign In"
    });
};

exports.signin = function (req,res) {
	var email =  req.body.email;
	var password = req.body.password;
	Parse.User.logIn(email, password).then(function(user) {
	    // Do stuff after successful login.
	    /*var query = new Parse.Query(Parse.User);
        query.get(user.id).then(function(effectiveUser) {*/
			res.redirect('/prod');		
        /*}, function(effectiveUser, error) {
			res.send('Access Denied!');
	    	Parse.User.logOut();
		});*/
	}, function(user, error) {
	    // The login failed. Check error to see why.
	    res.send('Login Failed!');
	});
};

exports.signout = function (req,res) {
	Parse.User.logOut();
};
// Shows a list of products
exports.listprods = function(req, res) {
   	var query = new Parse.Query(Prod);
	query.limit(1000);
	query.find().then(function(prods) {
		res.render('products/prods', {
		    title: "SmartShop | products",
		    prods: prods
	    });
	});
};

exports.newProd = function(req, res) {
	res.render('products/add', {
    	title: "SmartShop | Add a new product"
    });
};

exports.saveNewProd = function(req, res) {
		var	prod = new Prod();
		prod.set('name',req.body.name);
		prod.set('reference',req.body.reference);
		prod.set('quantity',parseInt(req.body.quantity));
		prod.set('description',req.body.description);
		prod.set('price',parseFloat(req.body.price));
		prod.set('urlPic',req.body.urlPic);
		prod.save().then(function(object) {
		  	res.status(200);
			res.redirect('/prod');
		}, function(error) {
		    res.send('Error saving product!');
		});
};

exports.saveProd = function(req, res) {
	var objectId = req.params.objectId;
    var query = new Parse.Query(Prod);
	query.get(objectId).then(function(prod) {
		if (prod == null) {	prod = new Prod(); res.send('noope'); }
		prod.set('name',req.body.name);
		prod.set('reference',req.body.reference);
		prod.set('quantity',parseInt(req.body.quantity));
		prod.set('description',req.body.description);
		prod.set('price',parseFloat(req.body.price));
		prod.set('urlPic',req.body.urlPic);
		prod.save().then(function(object) {
		  	res.status(200);
			res.redirect('/prod');
		}, function(error) {
		    res.send('Error saving product!');
		});
	});
};


exports.deleteProd = function(req, res) {
	var objectId = req.params.objectId;
    var query = new Parse.Query(Prod);
	query.get(objectId).then(function(prod) {
		prod.destroy().then(function(object) {
		  	res.status(200);
			res.redirect('/prod');
		}, function(error) {
		    res.send('Error deleting product!');
		});
	});
};


exports.updateProd = function(req, res) {
	var objectId = req.params.objectId;
    var query = new Parse.Query(Prod);
    query.get(objectId).then(function(prod) {
		res.render('products/update', {
	    	title: "SmartShop | Update a product",
	    	prod: prod
	    });
    }, function() {
    	res.status(404).send("Product not found.");
  	});
};