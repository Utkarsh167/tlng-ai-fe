import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from '../../../../environments/environment';
import { LoaderService } from './loader.service';
import { BlobService, UploadConfig, UploadParams } from 'angular-azure-blob-service'

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {
    bucket: S3;
    azureConfig: UploadParams = {...environment.azureConfig};
    constructor(
        private _loaderService: LoaderService,
        private _blob: BlobService
    ) {
        // this.bucket = new S3(
        //     {
        //         accessKeyId: environment.config.AWS_ACCESS_KEY,
        //         secretAccessKey: environment.config.AWS_SECRET_KEY,
        //         region: environment.config.AWS_REGION,
        //     }
        // );

    }

    //upload to azure
    async uploadFile(file: File) {

        if (file) {
            try {
                return new Promise((resolve, reject) => {
                    const baseUrl = this._blob.generateBlobUrl(this.azureConfig, file.name);
                    console.log(baseUrl);
                    const uconfig = {
                        baseUrl: baseUrl,
                        sasToken: this.azureConfig.sas,
                        blockSize: 1024 * 64, // OPTIONAL, default value is 1024 * 32
                        file: file,
                        complete: () => {
                            const awsObject = {
                                Location: `${uconfig.baseUrl}${uconfig.sasToken}`
                            }
                            resolve(awsObject);
                            console.log('Transfer completed !', awsObject);
                        },
                        error: (err) => {
                            console.log('Error:', err);
                            reject(err);
                        },
                        progress: (percent) => {
                            // this.percent = percent;
                        }
                    };
                    this._blob.upload(uconfig);
                });
            } catch(err) {
                console.log(err);
            }
        }
    }

    //upload S3
    // async uploadFile(fileToUpload: File) {
    //     try {
    //         if (!fileToUpload) {
    //             return Promise.resolve(null);
    //         }
    //         const params = {
    //             Bucket: environment.config.AWS_BUCKET,
    //             Key: fileToUpload.name || new Date().getTime() + '.png',
    //             Body: fileToUpload,
    //             ACL: 'public-read'
    //         };
    //         return new Promise((resolve, reject) => {
    //             this.bucket.upload(params, function (err, data) {
    //                 if (err) {
    //                     reject(err);
    //                     return false;
    //                 } else {
    //                     resolve(data);
    //                 }
    //             }).on('httpUploadProgress', (progress) => {
    //             });

    //         });
    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // }

    async uploadFiles(files: File[]) {
        this._loaderService.loader.next(true);
        try {

            let uploads = [];
            files.forEach(
                file => uploads.push(this.uploadFile(file))
            )
            let result = await Promise.all(uploads);
            this._loaderService.loader.next(false);
            return Promise.resolve(result);
        } catch (err) {
            this._loaderService.loader.next(false);
            return Promise.reject(err);
        }
    }
}
