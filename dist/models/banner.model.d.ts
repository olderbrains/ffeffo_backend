import { Document, Model } from 'mongoose';
import { BANNER_POSITIONS } from '../shared/constants';
export interface IBanner extends Document {
    title: string;
    image: {
        desktop: string;
        mobile: string;
    };
    link: string;
    position: (typeof BANNER_POSITIONS)[number];
    priority: number;
    startDate: Date;
    endDate: Date;
    status: 'active' | 'inactive' | 'scheduled';
    createdAt: Date;
    updatedAt: Date;
}
export declare const Banner: Model<IBanner>;
//# sourceMappingURL=banner.model.d.ts.map