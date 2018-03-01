var
cheerio = require('cheerio'),
fs = require('fs'),
$ = cheerio.load(fs.readFileSync('data.svg').toString()),
jsonFiles = ['settings.json', 'intApt.json'],
svg = 'vector.svg',
object;

function extractData() {
var
    json,
    vectorType,
    content,
    saveJson,
    goTo,
    unit,
    coords,
    counter = 0,
    units = [];

jsonFiles.forEach(function (file, i) {
    fs.readFile(file, function(err, data) {
        if (err) {
            throw err;
        }

        json = data.toString();
        object = JSON.parse(json);

        $('g').each( function (i, item) {
            if ($(this).children()[0].name === 'path' || $(this).children()[0].name === 'polygon' || $(this).children()[0].name === 'polyline') {
                switch($(this).children()[0].name) {
                    case 'polygon':
                        vectorType = 'points';
                        break;

                    case 'polyline':
                        vectorType = 'points';
                        break;

                    case 'path':
                        vectorType = 'd';
                        break;
                }

                unit = $(this).attr('id') || $(this).parents().attr('id');
                coords = $(this).children()[0].attribs[vectorType].replace(/\s+/g, ' ').trim();

                if (units.indexOf(unit) === -1) {
                    if (file.indexOf('settings') > -1) {
                        object['views']['2-1']['clickarea'][counter] = {
                            coords: coords,
                            goTo: "apt:" + unit
                            //goTo: "view:" + unit
                        };

                    } else if (file.indexOf('intApt') > -1) {
                        object.apts[unit] = {
                            typeAptId: "0",
                            viewId: "0",
                            floor: "0",
                            rooms: "0",
                            size: "0",
                            price: "0",
                            fee: "0",
                            available: "",
                        };
                    }
                }

                units.push(unit);
                counter++;
            }
        });

        units = new Array();
        saveJson = JSON.stringify(object, null, 4);

        fs.writeFile(file, saveJson, function(err) {
            if(err) {
                return console.log(err);
            }
            counter = 0
        });
    });
});
}

extractData();
