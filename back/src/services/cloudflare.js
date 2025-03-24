const FormData = require('form-data');
const fs = require('fs');
const Client = require('./axios');

class CloudFlare extends Client {
    static instance;

    constructor() {
        super();
    }

    static getInstance() {
        if (!CloudFlare.instance) {
            CloudFlare.instance = new CloudFlare();
        }
        return CloudFlare.instance;
    }

    async uploadImage(path) {
        try {
            const formData = new FormData();
            formData.append('file', fs.createReadStream(path)); 

            const response = await this.client.post(
                `/accounts/ff072a9d6a634b99d23a78be0846961c/images/v1`,
                formData,
                {
                    headers: {
                        ...formData.getHeaders(), 
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error("Error al subir imagen:", error.message);
            return { success: false, message: error.message };
        }
    }

    async deleteImage(imageId) {
        try {
            const response = await this.client.delete(
                `/accounts/ff072a9d6a634b99d23a78be0846961c/images/v1/${imageId}`
            );
            return response.data;
        } catch (error) {
            console.error("Error al eliminar imagen:", error.message);
            return { success: false, message: error.message };
        }
    }
}

module.exports = CloudFlare;