const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
    const data = req.body;
    const savedData = await User.create(data);
    return res.status(201).send({
      status: true,
      data: savedData,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const data = req.query;
    let condition = {};
    if (data.search && data.search != " ") {
      data.search = data.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      condition.$or = [{ name: new RegExp(data.search, "i") }];
    }
    let sort = {};
    if (data.sort) {
      sort.age = parseInt(data.sort);
    } else {
      sort.age = -1;
    }
    let aggArr = [
      { $match: condition },
      { $sort: sort },
      { $limit: parseInt(data.limit) || 10 },
      { $skip: parseInt(data.offset) || 0 },
    ];
    const item = await User.aggregate(aggArr);
    return res.status(200).send({
      status: true,
      data: item,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
