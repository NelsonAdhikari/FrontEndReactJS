export const  BASE_URL='http://localhost:9090';

export const PRODUCT_PAGE_SIZE=5;
export const ADMIN_ORDER_PAGE_SIZE=5;

export const getProductImageUrl=(productId)=>{
    return `${BASE_URL}/products/image/${productId}`;
};

export const formatDate=(timeInLongs)=>{
    const date = new Date(timeInLongs);
    return date.toLocaleString() ;
}