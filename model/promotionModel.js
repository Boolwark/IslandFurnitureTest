const Promotion = require("./promotion")
var db = require('./databaseConfig.js');
const promotionDB = {
    getAllItemsOnPromotion: function () {
        return new Promise( ( resolve, reject ) => {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    conn.end();
                    return reject(err);
                }
                else {
                    var sql = 'SELECT * FROM promotionentity p';
                    conn.query(sql, function (err, result) {
                        if (err) {
                            conn.end();
                            return reject(err);
                        } else {
                            var promotionList = [];
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
                            }
                            conn.end();
                            return resolve(promotionList);
                        }
                    });
                }
            });
        });
     
}
}
module.exports = promotionDB;