var express = require('express');
var app = express();
let middleware = require('./middleware');

var promotion = require('../model/promotionModel.js');
app.get('/api/getAllItemsOnPromotion', function (req, res) {
    const countryID = parseInt(req.query.countryId)
    promotion.getAllItemsOnPromotion(countryID)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Failed to get promotion items");
        });
});

app.get('/api/getAllCountries',middleware.checkToken, function (req, res) {
    country.getAllCountries()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Failed to get all countries");
        });
});

app.get('/api/getAllItems', middleware.checkToken, function (req, res) {
    country.getAllItems()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Failed to get all items");
        });
});

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json({ extended: false });
app.post('/api/addItemPrice', [middleware.checkToken, jsonParser], function (req, res) {
    var countryId = req.body.countryId;
    var sku = req.body.sku;
    var price = req.body.price;
    country.getItemIdBySku(sku)
        .then((itemId) => {
            country.checkPriceExist(itemId,countryId)
                .then((result) => {
                    if(result) {
                        country.addItemPrice(countryId,itemId,price)
                            .then((result) => {
                                res.send(result);
                            })
                            .catch((err) => {
                                console.log(err);
                                res.status(500).send("Failed to add item price");
                            });
                    }
                    else {
                        res.send(result);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).send("Failed to check if price exists");
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Failed to get item id by sku");
        });
});

app.post('/api/removeItemPricing', [middleware.checkToken, jsonParser], function (req, res) {
    country.removeItemPricing(req.body)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Failed to remove raw material");
        });
});

app.put('/api/updateItemPrice', [middleware.checkToken, jsonParser], function (req, res) {
    country.updateItemPrice(req.body)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Failed to update item price");
        });
});

module.exports = app;