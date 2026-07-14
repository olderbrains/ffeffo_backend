export interface StoredImage {
    url: string;
    key: string;
}
export declare class UploadsService {
    /**
     * Optimizes an image (resize + webp) and stores it via the configured driver.
     * @param publicBaseUrl base URL used to build the returned URL for the local driver
     */
    storeImage(file: {
        buffer: Buffer;
        mimetype: string;
    }, folder: string, publicBaseUrl: string): Promise<StoredImage>;
}
export declare const LOCAL_UPLOADS_DIR: string;
//# sourceMappingURL=uploads.service.d.ts.map