import mongoose, { Document, Model } from 'mongoose';
import { CMS_PAGE_STATUSES } from '../shared/constants';
export interface ICmsPage extends Document {
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    featuredImage?: string;
    seo: {
        title?: string;
        description?: string;
        keywords?: string[];
    };
    status: (typeof CMS_PAGE_STATUSES)[number];
    publishedAt?: Date;
    author: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const CmsPage: Model<ICmsPage>;
//# sourceMappingURL=cms-page.model.d.ts.map