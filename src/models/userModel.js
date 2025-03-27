// Import Mongoose to define the user schema (structure of user data)
import mongoose from 'mongoose';

// Import UUID to generate a unique user ID
import { v4 as uuidv4 } from 'uuid';

// Import bcrypt to hash (secure) passwords before saving
import bcrypt from 'bcrypt';


// Define the user schema (fields for each user)

const userSchema = new mongoose.Schema(
  {
    // Custom user ID using UUID instead of Mongo's default _id
    user_id: {
      type: String,
      default: uuidv4,
      unique: true,
    },

    // Username must be provided and unique
    username: {
      type: String,
      required: true,
      unique: true,
    },

    // Email must be provided and unique
    email: {
      type: String,
      required: true,
      unique: true,
    },

    // Password must be provided
    password: {
      type: String,
      required: true,
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,

    // Customize the output when this document is sent as JSON
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;        // Remove Mongo’s default _id
        delete ret.__v;        // Remove version key
        delete ret.password;   // Hide hashed password from API response
      },
    },
  }
);


// Pre-save hook: Hash the password before saving it

userSchema.pre('save', async function (next) {
  // Only hash if the password field was modified
  if (!this.isModified('password')) return next();

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next(); // Continue saving
});

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

// Export the model so it can be used in other parts of the app
export default User;
