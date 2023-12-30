const { default: mongoose } = require("mongoose");
const Category = require("../models/categoryModel");

exports.createCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(422).json({
      status: false,
      statusCode: 422,
      message: "Missing required Fiels",
    });
  }

  try {
    const isNameExists = await Category.findOne({ name });
    console.log("isNameExists : ", isNameExists);

    if (isNameExists) {
      return res.status(409).json({
        status: false,
        statusCode: 409,
        message: "This Category is Akready Exists",
      });
    }

    const createdCategory = await Category.create({ name, description });

    return res.status(201).json({
      status: true,
      statusCode: 201,
      data: createdCategory,
      message: "Category Created Successfully",
    });
  } catch (error) {
    return res.json({
      status: false,
      error: error,
      message: "Category cannot be Created, Try again Later",
    });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const allCategory = await Category.find().populate("courses").exec();
    return res.status(200).json({
      status: true,
      statusCode: 200,
      data: allCategory,
      message: "Category Fetched Successsfully",
    });
  } catch (error) {
    return res.json({
      status: false,
      error: error,
      message: "Failed to Fetch Category",
    });
  }
};

exports.getSelectedCategory = async (req, res) => {
  const { categoryId } = req.body;

  try {
    const selectedCategory = await Category.findById(categoryId)
      .populate("courses")
      .exec();
    const otherCategory = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate("courses")
      .exec();
    const data = {
      selectedCategory,
      otherCategory,
    };
    return res.status(200).json({
      status: true,
      statusCode: 200,
      data,
      message: "Selected-Category Fetched Successsfully",
    });
  } catch (error) {
    return res.json({
      status: false,
      error: error,
      message: "Failed to Fetch Selected-Category",
    });
  }
};
