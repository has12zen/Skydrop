db = require("../index");
const Request = {
  async findById(reqId) {
    const reqRef = db.collection("requests").doc(userId);
    const reqDoc = await reqRef.get();
    if (!reqDoc.exists) {
      throw new Error(`User with ID ${reqId} not found`);
    }
  },
};

module.exports = Request;
