const TRUCKS_NO = 100;
const DELIVERIES_NO = 1;
var trucks = [];

// Module used to generate a product name
var products = require('./products');

// loading postgres NodeJS Client
var pg = require('pg');

// loading random generator (used for the generation of driver names and VIN numbers)
var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();


var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/trigger_sample';

//var client = new pg.Client(connectionString);
//client.connect();
//var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
//query.on('end', function() { client.end(); });
//
//

/**
* This function generates a truck.
* @param i - The key of the truck
* @returns {{truck_key: *, coords: {latitude: number, longitude: number}, all_deliveries: Array, pending_deliveries: (Array.length|*), visible: boolean}}
*/
var createRandomTruck = function (i) {
    var lat_min = -90,
        lat_range = 90 - lat_min,
        lng_min = -180,
        lng_range = 180 - lng_min;

    var truck_key = "id";

    // The current location of the truck
    var latitude = lat_min + (Math.random() * lat_range);
    var longitude = lng_min + (Math.random() * lng_range);

    // The truck object
    var ret = {
        truck_id: i,
        latitude: latitude,
        longitude: longitude,
        vin: chance.string({length: 17}),
        driver_name: chance.first()+' '+ chance.last(),
        shift_start_time: chance.hour()+':'+ chance.minute()+':'+ chance.second()
    };
    ret[truck_key] = i;
    return ret;
};

for (var i = 0; i < TRUCKS_NO; i++) {

    var mm = createRandomTruck(i);
    trucks.push(mm);

}
console.log(trucks);


var createRandomProduct = function() {
    return {
        product_name: products.generate(),
        delivered: chance.bool()
    }
};

//product = createRandomProduct(10);
//var client = new pg.Client(connectionString);
//client.connect();
//
//var query_str = 'INSERT INTO products(product_name, delivered) VALUES (\''+
//    product.product_name+'\','+product.delivered+')';
//console.log(query_str);
//var query = client.query(query_str);
//query.on('end', function() { client.end(); });
//
////console.log(createRandomProduct(10));


products.add_products_2_db();