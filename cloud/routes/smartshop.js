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
	prod.set('description',req.body.description);
	prod.set('price',req.body.price);
	prod.set('urlPic',req.body.urlPic);

	var acl = new Parse.ACL();
	  acl.setPublicReadAccess(true);
	  prod.setACL(acl);
	  
	  prod.save().then(function(object) {
	    res.send({ url: "/" });
	  }, function(error) {
	    res.send('Error saving meme!');
	  });
};


exports.updateProd = function(req, res) {
};