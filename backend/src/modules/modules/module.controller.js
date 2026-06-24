import Module from "./module.model.js";
import QueryDefinition from "../queryDefinitions/queryDefinition.model.js";

export const createModule = async (req, res) => {
  try {
    const moduleExists = await Module.findOne({
      code: req.body.code,
      isDeleted: false,
    });

    if (moduleExists) {
      return res.status(400).json({
        success: false,
        message: "Module already exists",
      });
    }

    const moduleData = await Module.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: moduleData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getModules = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";

    const query = {
      isDeleted: false,
      $or: [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          code: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    };

    const modules = await Module.find(query)
      .populate("category")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({
        createdAt: -1,
      });

    const total = await Module.countDocuments(query);

    res.json({
      success: true,
      data: modules,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getModuleById = async (req, res) => {
  try {
    const moduleData = await Module.findById(req.params.id).populate(
      "category",
    );

    if (!moduleData) {
      return res.status(404).json({
        success: false,
        message: "Module not found",
      });
    }

    res.json({
      success: true,
      data: moduleData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateModule = async (req, res) => {
  try {
    const moduleData = await Module.findById(req.params.id);

    if (!moduleData) {
      return res.status(404).json({
        success: false,
        message: "Module not found",
      });
    }

    Object.assign(moduleData, req.body);

    moduleData.updatedBy = req.user._id;

    await moduleData.save();

    res.json({
      success: true,
      message: "Module updated successfully",
      data: moduleData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteModule = async (req, res) => {
  try {
    const moduleData = await Module.findById(req.params.id);

    if (!moduleData) {
      return res.status(404).json({
        success: false,
        message: "Module not found",
      });
    }

    moduleData.isDeleted = true;

    moduleData.deletedAt = new Date();

    moduleData.deletedBy = req.user._id;

    await moduleData.save();

    res.json({
      success: true,
      message: "Module deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const toggleModuleStatus = async (req, res) => {
  try {
    const moduleData = await Module.findById(req.params.id);

    if (!moduleData) {
      return res.status(404).json({
        success: false,
        message: "Module not found",
      });
    }

    moduleData.status = moduleData.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    await moduleData.save();

    res.json({
      success: true,
      message: "Status updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getModuleQueries = async (req, res) => {
  try {
    const queries = await QueryDefinition.find({
      module: req.params.id,
      status: "PUBLISHED",
      isDeleted: false,
    })
      .select("name description version status category module")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: queries.length,
      data: queries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getModuleDropdown = async (req, res) => {
  try {
    const modules = await Module.find({
      isDeleted: false,
      status: "ACTIVE",
    })
      .select("name code category")
      .populate("category", "name")
      .sort({ name: 1 });

    res.json({
      success: true,
      data: modules,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
