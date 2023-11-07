const PersonalInformation = require("../models");

// Create a new profile
exports.createProfile = async (profileData) => {
  try {
    const newProfile = new PersonalInformation(profileData);
    return await newProfile.save();
  } catch (error) {
    console.error(error);
    throw new Error("Could not create the profile");
  }
};

// Get all profiles
exports.getAllProfiles = async () => {
  try {
    return await PersonalInformation.find();
  } catch (error) {
    console.error(error);
    throw new Error("Could not retrieve profiles");
  }
};
