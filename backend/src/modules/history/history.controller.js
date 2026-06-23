import QueryHistory from "./queryHistory.model.js";
import { Parser } from "json2csv";

export const getHistory = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const filter = {};

    if (req.query.user) {
      filter.user = req.query.user;
    }

    if (req.query.queryDefinition) {
      filter.queryDefinition = req.query.queryDefinition;
    }

    const data = await QueryHistory.find(filter)
      .populate("user", "name email")
      .populate("queryDefinition", "name")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await QueryHistory.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getHistoryById = async (req, res) => {
  try {
    const history = await QueryHistory.findById(req.params.id)
      .populate("user", "name email")
      .populate("queryDefinition");

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "History not found",
      });
    }

    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getQueryHistory = async (req, res) => {
  try {
    const data = await QueryHistory.find({
      queryDefinition: req.params.queryId,
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteHistory = async (req, res) => {
  try {
    const history = await QueryHistory.findByIdAndDelete(req.params.id);

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "History not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "History deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const exportHistory = async (
  req,
  res
) => {
  const history =
    await QueryHistory.find();

  const parser = new Parser();

  const csv = parser.parse(history);

  res.header(
    "Content-Type",
    "text/csv"
  );

  res.attachment("history.csv");

  return res.send(csv);
};