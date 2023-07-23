const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*300)+100;
        const camp = new Campground({
            // Your User Id
            author: '64af0efa43bc57a844f25886',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur odio nulla, iure eius pariatur aliquid dolore ipsam nesciunt? Impedit officia inventore est iure delectus nam corporis voluptatum magnam in cum',
            price,
            geometry: {
                "type": "Point", 
                "coordinates": [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dkqgalfuo/image/upload/v1689493433/YelpCamp/lavwzlqjvil8qwl0i3y1.webp',
                  filename: 'YelpCamp/lavwzlqjvil8qwl0i3y1'
                },
                {
                  url: 'https://res.cloudinary.com/dkqgalfuo/image/upload/v1689493433/YelpCamp/nztgyixtohgw1wgvgddv.webp',
                  filename: 'YelpCamp/nztgyixtohgw1wgvgddv'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})