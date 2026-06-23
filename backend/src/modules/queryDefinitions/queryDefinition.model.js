import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema(
  {
    label: String,

    fieldKey: String,

    dbColumn: String,

    dataType: {
      type: String,

      enum: [
        "TEXT",
        "NUMBER",
        "EMAIL",
        "PHONE",
        "DATE",
        "DATETIME",
        "TEXTAREA",
        "DROPDOWN",
        "RADIO",
        "CHECKBOX",
        "MULTISELECT",
        "BOOLEAN",
        "URL",
        "ARRAY",
        "OBJECT",
      ],
    },

    placeholder: String,

    required: Boolean,

    defaultValue: mongoose.Schema.Types.Mixed,

    options: [
      {
        label: String,
        value: mongoose.Schema.Types.Mixed,
      },
    ],

    uiType: {
      type: String,
      enum: [
        "INPUT",
        "TEXTAREA",
        "SELECT",
        "MULTISELECT",
        "TOGGLE",
        "BUTTON_GROUP",
        "RADIO",
        "CHECKBOX",
      ],
    },

    dynamicOptions: {
      enabled: {
        type: Boolean,
        default: false,
      },

      sourceCollection: String,

      labelField: String,

      valueField: String,
    },

    selectable: {
      type: Boolean,
      default: true,
    },

    order: Number,

    validations: [
      {
        type: String,
      },
    ],
  },
  {
    _id: true,
  },
);

const conditionSchema = new mongoose.Schema(
  {
    label: String,

    fieldKey: String,

    dbColumn: String,

    required: Boolean,

    operator: {
      type: String,

      enum: ["=", "!=", ">", "<", ">=", "<=", "LIKE", "IN", "BETWEEN"],
    },
  },
  {
    _id: true,
  },
);

const versionSchema = new mongoose.Schema(
  {
    versionNumber: Number,

    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    snapshot: mongoose.Schema.Types.Mixed,

    changedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: true,
  },
);

const queryDefinitionSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    description: String,

    queryType: {
      type: String,

      enum: ["MANUAL", "AUTO_INSERT", "AUTO_UPDATE", "AUTO_DELETE", "HYBRID"],

      required: true,
    },

    targetTable: {
      type: String,
      required: true,
    },

    manualSql: String,

    fields: [fieldSchema],

    conditions: [conditionSchema],

    accessControl: {
      allowedRoles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role",
        },
      ],

      allowedUsers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],

      deniedUsers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },

    status: {
      type: String,

      enum: ["DRAFT", "PUBLISHED", "ARCHIVED"],

      default: "DRAFT",
    },

    currentVersion: {
      type: Number,
      default: 1,
    },

    versions: [versionSchema],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: Date,

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("QueryDefinition", queryDefinitionSchema);
