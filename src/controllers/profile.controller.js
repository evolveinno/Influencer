const profileService = require('../services/profile.service');

// Create a new profile
exports.createProfile = async (req, res) => {
    try {
        const profileData = req.body;
        const newProfile = await profileService.createProfile(profileData);
        res.status(201).json(newProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not create the profile' });
    }
};

// Get all profiles
exports.getAllProfiles = async (req, res) => {
    try {
        const profiles = await profileService.getAllProfiles();
        res.status(200).json(profiles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not retrieve profiles' });
    }
};
