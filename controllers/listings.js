const Listing = require("../models/listing");
const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});


module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  };


module.exports.renderNewForm= (req, res) => {
  res.render("listings/new.ejs");
}

module.exports.showListing=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({
        path:"reviews",
        populate:{
          path:"author",
        },  
      })
      .populate("owner");
    if (!listing) {
      req.flash("error", " does not exist");
      return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
  }

module.exports.createListing = async (req, res, next) => {
  const newListing = new Listing(req.body.Listing);
  // 2️⃣ Save image if uploaded
  if (req.file) {
    let url = req.file.path;
    let filename = req.file.filename;
    newListing.image = { url, filename };
  }

  // 3️⃣ Save owner and listing
  newListing.owner = req.user._id;
  await newListing.save();

  req.flash("success", "New listing created!");
  res.redirect(`/listings/${newListing._id}`);
};


module.exports.renderEditForm=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing does not exist");
      return res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250")
    res.render("listings/edit.ejs", { listing,originalImageUrl });
  }

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  // Update basic fields
  let listing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.Listing },
    { runValidators: true, new: true }
  );

  // 1️⃣ Try to geocode if location changed
  try {
    const geoData = await client.geocode({
      params: {
        address: req.body.Listing.location,
        key: process.env.MAP_TOKEN,
      },
    });

    listing.geometry = {
      type: "Point",
      coordinates: [
        geoData.data.results[0].geometry.location.lng,
        geoData.data.results[0].geometry.location.lat,
      ],
    };
  } catch (error) {
    console.log("Geocoding failed during update:", error.message);
    // Keep existing coordinates or set default
    if (!listing.geometry || !listing.geometry.coordinates) {
      listing.geometry = {
        type: "Point",
        coordinates: [77.2088, 28.6139],
      };
    }
  }

  // 2️⃣ If new image uploaded
  if (req.file) {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
  }

  await listing.save();

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
  }  