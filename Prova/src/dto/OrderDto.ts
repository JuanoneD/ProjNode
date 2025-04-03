export default interface OrderDto {
    _id: string|null;
    custumerId: string;
    productsIds: string[];
    status: string;
}