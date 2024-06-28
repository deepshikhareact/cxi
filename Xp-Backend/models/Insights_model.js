const mongoose = require("mongoose");

const insightSchema = new mongoose.Schema(
  {
    industrySegment: {
      type: String,
    },
    insightCategory: {
      type: String,
      enum: ["Marketing", "Behaviour", "Price", "Complaint", "Sales"],
      default: "Marketing",
    },
    insightSubCategory: {
      type: String,
      // Promotional, Message Opportunity, Higher Ticket Sale
    },
    iconURL: {
      type: String,
    },
    insightLevel: {
      type: String,
    },
    insightTitle: {
      type: String,
    },
    insightDescription: {
      type: String,
    },
    insightActionItem: {
      type: String,
    },
    actionItemExample: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    dislikes: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    comments: {
      type: [
        {
          author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          text: String,
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
    bookmarks: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    implements: {
      type: [
        {
          author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          stars: {
            type: Number,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Insight = mongoose.model("Insight", insightSchema);

module.exports = Insight;
