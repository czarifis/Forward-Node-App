/**
 * Created by kzarifis on 5/29/16.
 */
// loading random generator (used for the generation of driver names and VIN numbers)
var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();

// loading postgres NodeJS Client
var pg = require('pg');

// Database URL
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/trigger_sample';

const products = ['Microsoft Surface Book', 'Lenovo ThinkPad W540', 'MSI GT80 Titan SLI',
    'Alienware 15 (with Graphics Amplifier)', 'Gigabyte P37X', 'Apple MacBook Air',
    'HP Pavilion x360 13', 'Dell XPS 13', 'Lenovo ThinkPad X250', 'Lenovo ThinkPad T450s',
    'Toshiba Satellite C55DT', 'Asus Transformer Book T100HA', 'Apple MacBook (2015)',
    'HP Spectre x360', 'Lenovo Yoga 900', 'Microsoft Surface Book', 'Dell Chromebook 13',
    'Asus Chromebook Flip C100', 'Apple iMac with Retina 5K Display', 'Asus Zen AiO Pro Z240IC',
    'Origin Genesis (2015)', 'HP Envy Phoenix', 'MSI 24GE Gaming All-in-One',
    'Lenovo ThinkCentre M83 Tiny in One', 'Dell OptiPlex 9020 Micro', 'Zotac Zbox Magnus EN970',
    'Acer Revo RL85', 'Intel Compute Stick', 'Apple iMac with Retina 5K Display (2015)',
    'Microsoft Surface Pro 4', 'Samsung Galaxy Tab S2 8.0', 'Lenovo Tab 2 A10', 'Dell Venue 10 7000',
    'Apple iPad Pro', 'Asus ZenPad S 8.0', 'Amazon Fire', 'Lenovo Yoga Tablet 2 (8-Inch Windows)',
    'Microsoft Surface Pro 4', 'Amazon Kindle Paperwhite (2015)', "	HP's Instant Ink Line",
    'Canon Maxify iB4020', 'Epson SureColor P800', 'Epson WorkForce Pro WF-5690', 'Epson WorkForce ET-4550 EcoTank',
    'Canon Color ImageClass MF820Cdn', 'OKI B412dn Monochrome Printer', 'OKI MB492 Multifunction Printer',
    'Brother MFC-J6520DW', 'Seagate Backup Plus Desktop Drive (8TB)', 'Seagate Wireless (500GB)',
    'Seagate Backup Plus (4TB)', 'Samsung SSD 850 EVO (2TB)', 'Intel SSD 750 Series', 'Crucial MX200',
    'Seagate Personal Cloud (2-Bay)','QNAP TS-469L', 'D-Link AC3200 Ultra Wi-Fi Router (DIR-890L/R)',
    'Corsair Strafe', 'Logitech G910 Orion Spark', 'Corsair Gaming K65 RGB', 'Roccat Tyon',
    'Cougar 600M Gaming Mouse', 'Logitech MX Master', 'Logitech MX Anywhere 2', 'Dell UltraSharp U3415W',
    'Acer H257HU', 'BenQ XL2730Z', 'Lenovo ThinkPad Stack ', 'Apple iPhone 6s', 'Google Nexus 6P',
    'Apple iPhone, 6s Plus', 'Pebble Time', 'Marshall Kilburn', 'Sennheiser HD 598', 'Olympus Toug,  TG-4',
    'Samsung NX1', 'Olympus PEN E-PL6', 'Canon E, S Rebel T6s', 'Roku 4', 'Nvidia Shield'
];

exports.generate = function() {
      return products[chance.integer({min: 0, max: products.length})];
};

exports.add_products_2_db = function() {
    var client = new pg.Client(connectionString);
    for (var i= 0 ; i < products.length; i++) {
        var query_str = 'INSERT INTO products(product_name) VALUES (\''+
            products[i]+'\')';
        console.log(query_str);
        var query = client.query(query_str);
        query.on('end', function() { client.end(); });
    }
};