const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended", "Cancelled"],
      default: "Active",
    },
    // organization Business Type
    industrySegment: {
      type: String,
      default: "",
    },
    // organization Business Name
    organization: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true,
      enum: ["Owner", "Customer"],
      default: "Customer",
    },

    insights: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Insight",
        },
      ],
      default: [],
    },

    todo: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Insight",
        },
      ],
      default: [],
    },
    implement: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Insight",
        },
      ],
      default: [],
    },

    liked: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Insight",
        },
      ],
      default: [],
    },

    permissions: {
      type: [String],
      default: [],
    },
    subscriptionPlan: {
      type: String,
      enum: ["Platinum", "Gold", "Silver", "Bronze"],
      default: "Bronze",
    },
  },
  {
    timestamps: true,
    strictPopulate: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
