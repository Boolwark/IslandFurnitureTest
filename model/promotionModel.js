const Promotion = require("./promotion")
const Furniture = require("./furniture")
var db = require('./databaseConfig.js');
const promotionDB = {
    getAllItemsOnPromotion: function (countryID) {
        return new Promise( ( resolve, reject ) => {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    conn.end();
                    return reject(err);
                }
                else {
                    var sql = 'SELECT * FROM promotionentity p INNER JOIN furnitureentity f ON p.ITEM_ID = f.ID INNER JOIN item_countryentity ic ON ic.ITEM_ID = p.ITEM_ID INNER JOIN itementity i ON i.id = p.ITEM_ID WHERE ic.COUNTRY_ID = ?';
                    conn.query(sql,[countryID], function (err, result) {
                        if (err) {
                            conn.end();
                            return reject(err);
                        } else {
                            var promotionList = [];
                            var furnitureList = [];
                            for(var i = 0; i < result.length; i++) {
                                var promotion = new Promotion();
                                promotion.id = result[i].ID;
                                promotion.startDate = result[i].STARTDATE;
                                promotion.endDate =  result[i].ENDDATE;
                                promotion.countryid = result[i].COUNTRY_ID
                                promotion.description = result[i].DESCRIPTION
                                promotion.discountrate =  result[i].DISCOUNTRATE;
                                promotion.itemid = result[i].ITEM_ID;
                                promotion.imageurl = result[i].IMAGEURL
                                promotionList.push(promotion);
                                var fur = new Furniture();
                                fur.id = result[i].id;
                                fur.name = result[i].NAME;
                                fur.imageURL = result[i].imageURL;
                                fur.sku = result[i].sku;
                                fur.description = result[i].description;
                                fur.type = result[i].TYPE;
                                fur.length = result[i].LENGTH;
                                fur.width = result[i].WIDTH;
                                fur.height = result[i].HEIGHT;
                                fur.category = result[i].CATEGORY;
                                fur.price = result[i].RETAILPRICE;
                                furnitureList.push(fur);
                            }
                            conn.end();
                            return resolve({promotionList,furnitureList});
                        }
                    });
                }
            });
        });
     
}
}
module.exports = promotionDB;