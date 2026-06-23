import User from "../users/user.model.js";
import Category from "../categories/category.model.js";
import Module from "../modules/module.model.js";
import QueryDefinition from "../queryDefinitions/queryDefinition.model.js";
import QueryHistory from "../history/queryHistory.model.js";
import AuditLog from "../audit/audit.model.js";

export const adminDashboard = async (req, res) => {
  try {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    const [
      totalUsers,
      totalCategories,
      totalModules,
      totalQueries,
      totalGenerated,
      todayQueries,
      monthlyQueries,
      recentActivities,
      topQueries,
    ] = await Promise.all([
      User.countDocuments(),

      Category.countDocuments({
        isDeleted: false,
      }),

      Module.countDocuments({
        isDeleted: false,
      }),

      QueryDefinition.countDocuments({
        isDeleted: false,
      }),

      QueryHistory.countDocuments(),

      QueryHistory.countDocuments({
        createdAt: {
          $gte: today,
        },
      }),

      QueryHistory.countDocuments({
        createdAt: {
          $gte: monthStart,
        },
      }),

      AuditLog.find()
        .sort({
          createdAt: -1,
        })
        .limit(10),

      QueryHistory.aggregate([
        {
          $group: {
            _id: "$queryName",
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
          $limit: 5,
        },
      ]),
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalCategories,
        totalModules,
        totalQueries,
        totalGenerated,
        todayQueries,
        monthlyQueries,
        recentActivities,
        topQueries,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const activeUsers = async () => {
  return await QueryHistory.aggregate([
    {
      $group: {
        _id: "$user",
        total: { $sum: 1 },
      },
    },
    {
      $sort: {
        total: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);
};
