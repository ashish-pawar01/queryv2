import User from "../users/user.model.js";
import Category from "../categories/category.model.js";
import Module from "../modules/module.model.js";
import QueryDefinition from "../queryDefinitions/queryDefinition.model.js";
import QueryHistory from "../history/queryHistory.model.js";

export const getDashboardAnalytics = async (req, res) => {
  try {
    const [totalUsers, totalCategories, totalModules, totalQueries] =
      await Promise.all([
        User.countDocuments(),
        Category.countDocuments(),
        Module.countDocuments(),
        QueryDefinition.countDocuments(),
      ]);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const usageTrend = await QueryHistory.aggregate([
      {
        $match: {
          createdAt: {
            $gte: thirtyDaysAgo,
          },
        },
      },
      {
        $group: {
          _id: {
            day: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.day": 1,
        },
      },
    ]);

    const topQueries = await QueryHistory.aggregate([
      {
        $group: {
          _id: "$queryDefinition",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 10,
      },
      {
        $lookup: {
          from: "querydefinitions",
          localField: "_id",
          foreignField: "_id",
          as: "query",
        },
      },
    ]);

    const topUsers = await QueryHistory.aggregate([
      {
        $group: {
          _id: "$user",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 10,
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
    ]);

    const categoryUsage = await QueryDefinition.aggregate([
      {
        $group: {
          _id: "$category",
          totalQueries: {
            $sum: 1,
          },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "category",
        },
      },
    ]);

    const moduleUsage = await QueryDefinition.aggregate([
      {
        $group: {
          _id: "$module",
          totalQueries: {
            $sum: 1,
          },
        },
      },
      {
        $lookup: {
          from: "modules",
          localField: "_id",
          foreignField: "_id",
          as: "module",
        },
      },
    ]);

    return res.status(200).json({
      success: true,

      overview: {
        totalUsers,
        totalCategories,
        totalModules,
        totalQueries,
      },

      usageTrend,

      topQueries,

      topUsers,

      categoryUsage,

      moduleUsage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
