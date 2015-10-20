var Prod = Parse.Object.extend("product");

// Shows a list of products
exports.listprods = function(req, res) {
  var query = new Parse.Query(Prod);
  query.limit(50);

  query.find().then(function(prods) {
    res.render('products/index', {
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

exports.saveProd = function(req, res) {
	var prod = new Prod();
	prod.set('name',req.body.name);
	prod.set('reference',req.body.reference);
	prod.set('quantity',parseInt(req.body.quantity));
	prod.set('description',req.body.description);
	prod.set('price',parseFloat(req.body.price));
	prod.set('urlPic',req.body.urlPic);
	  prod.save().then(function(object) {
	  	res.status(200);
	    res.redirect('/');
	  }, function(error) {
	    res.send('Error saving product!');
	  });
};


exports.updateProd = function(req, res) {
};