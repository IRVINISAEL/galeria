const { getCloudFlare } = require('../services/services-locater/composer');

async function onNewImages(path) {
    const cloudFlare = getCloudFlare();
    return await cloudFlare.uploadImage(path);
}

async function onDeleteImages(imageId) {
    const cloudFlare = getCloudFlare();
    return await cloudFlare.deleteImage(imageId);
}

async function onListImages() {
    try {
        const cloudFlare = getCloudFlare();
        const response = await cloudFlare.client.get('/accounts/ff072a9d6a634b99d23a78be0846961c/images/v1');

        if (response.data.success) {
            return response.data.result.images.map(image => ({
                id: image.id,
                filename: image.filename,
                uploaded: image.uploaded,
                smallUrl: image.variants[0],
                largeUrl: image.variants[3]
            }));
        } else {
            throw new Error("No se pudieron obtener las imágenes");
        }
    } catch (error) {
        console.error("Error al obtener imágenes:", error.message);
        return { success: false, message: error.message };
    }
}

module.exports = {
    onNewImages,
    onDeleteImages,
    onListImages,
};
