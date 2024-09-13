export function validateImageDimensions(file, requiredWidth, requiredHeight) {
    console.log("file",file,"requiredWidth",requiredWidth,"requiredHeight",requiredHeight);
    return new Promise((resolve, reject) => {
        if (file) {
            const img = new Image();
            img.src = URL.createObjectURL(file);

            img.onload = function() {
                const { width, height } = img;
                if (width === requiredWidth && height === requiredHeight) {
                    resolve('Image dimensions are correct.');
                } else {
                    reject(`Please upload an image with dimensions ${requiredWidth}x${requiredHeight}.`);
                }
            };

            img.onerror = function() {
                reject('There was an error loading the image.');
            };
        } else {
            reject('No file selected.');
        }
    });
}
