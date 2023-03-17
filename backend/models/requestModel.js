db = require('../index');
const Request = {
    async create(reqData) {
        const collectionRef = db.collection('requests');
        collectionRef.add(reqData)
        .then(docRef => {
          console.log('Document written with ID:', docRef.id);
          return docRef;
        })
        .catch(error => {
          console.error('Error adding document:', error);
        });
    },

    async findById(reqId) {
        const reqRef = db.collection('requests').doc(userId);
        const reqDoc = await reqRef.get();
        if (!reqDoc.exists) {
          throw new Error(`User with ID ${reqId} not found`);
        }
    },
}