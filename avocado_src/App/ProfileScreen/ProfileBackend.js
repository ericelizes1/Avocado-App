const profile = {
    name: 'John Doe',
    username: 'johndoe',
    bio: 'I am a software engineer',
    profilePicture: 'https://picsum.photos/200',
}

function getProfile() {
    return profile;
}

function getName() {
    return profile.name;
}

function getUsername() {
    return profile.username;
}

function getBio() {
    return profile.bio;
}

function getProfilePicture() {
    return profile.profilePicture;
}

function setName(newName) {
    profile.name = newName;
}

function setUsername(newUsername) {
    profile.username = newUsername;
}

function setBio(newBio) {
    profile.bio = newBio;
}

function setProfilePicture(newProfilePicture) {
    profile.profilePicture = newProfilePicture;
}

function updateProfile(newProfile) {
    profile.setName(newProfile.name);
    profile.setUsername(newProfile.username);
    profile.setBio(newProfile.bio);
    profile.setProfilePicture(newProfile.profilePicture);
  }

