const ShortUniqueId = require("short-unique-id");
const { URL_Modal } = require("../Models/UrlModel");
const { formatDateTime } = require("../Utils/TimeHelpers");

const createSortUrl = async (req, res, next) => {
  try {
    const { fullUrl } = req.body;

    if (!fullUrl) {
      return res.status(400).json({
        success: false,
        message: "Proide URL !!",
      });
    }
    const uid = new ShortUniqueId({ length: 5 });

    let createdUrl = await URL_Modal.create({
      short_id: uid.rnd(),
      redirect_url: fullUrl,
      visit_history: [],
    });

    res.status(201).json({
      success: true,
      message: "Url Created Successfull !!",
      data: createdUrl,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something Went Wrong !!",
      success: false,
    });
  }
};

const redirectToUrl = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Proide ID !!",
      });
    }

    let urlData = await URL_Modal.findOne({
      short_id: id,
    });

    if (!urlData) {
      return res.status(400).json({
        success: false,
        message: "Proide Correct ID !!",
      });
    }

    await URL_Modal.findOneAndUpdate(
      {
        short_id: id,
      },
      {
        $push: {
          visit_history: new Date(Date.now()),
        },
      }
    );

    res.redirect(urlData?.redirect_url);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something Went Wrong !!",
      success: false,
    });
  }
};

const urlAlalytics = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Proide ID !!",
      });
    }

    let urlData = await URL_Modal.findOne({
      short_id: id,
    });

    if (!urlData) {
      return res.status(400).json({
        success: false,
        message: "Proide Correct ID !!",
      });
    }

    let wigitsTime = urlData?.visit_history?.map((time) =>
      formatDateTime(new Date(time))
    );

    return res.status(200).json({
      success: true,
      message: "History Fetched Successfull !!",
      visiters: urlData?.visit_history?.length,
      history: wigitsTime,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something Went Wrong !!",
      success: false,
    });
  }
};

exports.urlAlalytics = urlAlalytics;
exports.createSortUrl = createSortUrl;
exports.redirectToUrl = redirectToUrl;
