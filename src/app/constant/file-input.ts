export const onSelectFile = (event, accept = 'image/jpeg,image/png', maxSize = 4): Promise<any> => {

    return new Promise((resolve, reject) => {
        if (event.target.files && event.target.files[0]) {

            let file = event.target.files[0];
            if (accept && accept.split(',').indexOf(file.type) === -1) {
                reject({ type: 1 });
            } else if (maxSize && maxSize < ((file.size / 1024) / 1024)) {
                reject({ size: 1 });
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (imgsrc: any) => {
                resolve({ file: file, url: imgsrc.target.result, name: file.name })
            };
        }
    })
}