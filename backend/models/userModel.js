db = require("../index");
const User = {
  async create(userData) {
    const docRef = db.collection("users").doc(userData.id);
    await docRef.set(userData);
  },

  async findById(userId) {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      throw new Error(`User with ID ${userId} not found`);
    }
  },

  async getUserByEmail(email) {
    const usersRef = db.collection("users");
    const query = usersRef.where("email", "==", email).limit(1);
    const userDocs = await query.get();

    if (userDocs.empty) {
      // throw new Error(`User with email ${email} not found`);
      return null;
    }

    return userDocs.docs[0].data();
  },

  async findByIdAndUpdate(id, userData) {
    const userRef = db.collection("users").doc(id);
    userRef
      .update(userData)
      .then(() => {
        console.log("Document updated successfully");
        return "success";
      })
      .catch((error) => {
        console.error("Error updating document:", error);
        throw new Error(`User with email ${email} not found`);
      });
  },
};
module.exports = User;
