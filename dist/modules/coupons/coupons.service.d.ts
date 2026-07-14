import { ICoupon } from '../../models/coupon.model';
import { PaginatedResponse } from '../../shared/utils/pagination';
import { CreateCouponInput, UpdateCouponInput } from './coupons.dto';
export declare class CouponsService {
    list(filters: {
        page: number;
        limit: number;
        status?: string;
        type?: string;
    }): Promise<PaginatedResponse<ICoupon>>;
    getById(id: string): Promise<ICoupon>;
    create(data: CreateCouponInput, createdBy: string): Promise<ICoupon>;
    update(id: string, data: UpdateCouponInput): Promise<ICoupon>;
    deactivate(id: string): Promise<void>;
    validate(code: string, orderAmount: number, userId?: string): Promise<{
        valid: boolean;
        discount: number;
        coupon: ICoupon;
    }>;
    recordUsage(couponId: string, userId: string): Promise<void>;
    private getUserCouponUsage;
}
//# sourceMappingURL=coupons.service.d.ts.map