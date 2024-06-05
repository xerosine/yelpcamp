const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const axios = require("axios");
const Campground = require("../models/Campground");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/yelpcamp").then(() => {
  console.log("Mongo Connected!");
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});

const randomArr = (arr) => arr[Math.floor(Math.random() * arr.length)];

const imageList = [
  {
    url :'https://res.cloudinary.com/dgqzwfdsr/image/upload/v1717411601/YelpCamp/denys-nevozhai-Jhs_eJtxuCM-unsplash_ztktyd.jpg',
    filename: 'YelpCamp/denys-nevozhai-Jhs_eJtxuCM-unsplash_ztktyd.jpg'
  },
  {
    url :'https://res.cloudinary.com/dgqzwfdsr/image/upload/v1717411600/YelpCamp/simon-berger-oEdmks2U7nI-unsplash_bcpqli.jpg',
    filename: 'YelpCamp/simon-berger-oEdmks2U7nI-unsplash_bcpqli.jpg'
  },
  {
    url :'https://res.cloudinary.com/dgqzwfdsr/image/upload/v1717411596/YelpCamp/nathan-dumlao-IAtYRA0fHw8-unsplash_qpqieu.jpg',
    filename: 'YelpCamp/nathan-dumlao-IAtYRA0fHw8-unsplash_qpqieu.jpg'
  },
  {
    url :'https://res.cloudinary.com/dgqzwfdsr/image/upload/v1717411592/YelpCamp/henry-desro-wUFU09WYaHA-unsplash_hoq0o0.jpg',
    filename: 'YelpCamp/henry-desro-wUFU09WYaHA-unsplash_hoq0o0.jpg'
  },
  {
    url :'https://res.cloudinary.com/dgqzwfdsr/image/upload/v1717411591/YelpCamp/david-sjunnesson-F9mS-WvICRg-unsplash_cvl37s.jpg',
    filename: 'YelpCamp/david-sjunnesson-F9mS-WvICRg-unsplash_cvl37s.jpg'
  },
  {
    url :'https://res.cloudinary.com/dgqzwfdsr/image/upload/v1717411589/YelpCamp/rohan-makhecha-SqE0zjaYuFI-unsplash_jx4q5j.jpg',
    filename: 'YelpCamp/rohan-makhecha-SqE0zjaYuFI-unsplash_jx4q5j.jpg'
  },
  {
    url :'https://res.cloudinary.com/dgqzwfdsr/image/upload/v1717411585/YelpCamp/filip-zrnzevic-_EMkxLdko9k-unsplash_aiwfdy.jpg',
    filename: 'YelpCamp/filip-zrnzevic-_EMkxLdko9k-unsplash_aiwfdy.jpg'
  },
  {
    url :'https://res.cloudinary.com/dgqzwfdsr/image/upload/v1717411584/YelpCamp/jeremy-bishop-mQj1JmAk_54-unsplash_ssgbqx.jpg',
    filename: 'YelpCamp/jeremy-bishop-mQj1JmAk_54-unsplash_ssgbqx.jpg'
  },
  {
    url :'https://res.cloudinary.com/dgqzwfdsr/image/upload/v1717411583/YelpCamp/guilherme-stecanella-DlicPZ9qHOs-unsplash_bj8ilk.jpg',
    filename: 'YelpCamp/guilherme-stecanella-DlicPZ9qHOs-unsplash_bj8ilk.jpg'
  }
]
const seedImg = (imageList) => {
  const count = Math.floor(Math.random() * 10) % 3 + 1
  const images = []
  for (let i = 0; i < count; i++) {
    let pos = Math.floor(Math.random() * 9)
    images.push(imageList[pos])
  }
  console.log(images);
  return images
}
// async () => {
//   try {
//     const res = await axios.get("https://api.unsplash.com/collections/483251/photos", {
//       params: {
//         client_id: "0VIFLEdCUuw4sld2IpsT8Q4NGbRbcVX25f899H6DVYs",
//         page: 2,
//         per_page: 20
//       },
//     });
//     return res;
//   } catch (err) {
//     console.error(err);
//   }
// };

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 20; i++) {
    const cityIndex = Math.floor(Math.random() * cities.length);
    const priceVal = Math.floor(Math.random() * 31) + 20;

    const camp = new Campground({
      title: `${randomArr(descriptors)} ${randomArr(places)}`,
      location: `${cities[cityIndex].city}, ${cities[cityIndex].state}`,
      author: '665d0ec4fe19889f9330881c',
      price: priceVal,
      geometry: {
        type: 'Point',
        coordinates: [ 
          cities[cityIndex].longitude, 
          cities[cityIndex].latitude ]
      },
      images: seedImg(imageList),
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore assumenda tempore ipsum. Natus magnam molestias inventore illo, corporis placeat fuga doloremque impedit, quos obcaecati ex! Explicabo quo modi voluptate. Molestias deserunt consequatur, error dicta modi, ducimus nemo veritatis optio placeat hic officiis eaque quasi totam magni corporis sequi sed cupiditate?",
    });

    await camp.save();
  }
};

seedDB();
