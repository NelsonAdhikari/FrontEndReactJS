export const  BASE_URL='http://localhost:9090';

export const PRODUCT_PAGE_SIZE=5;
export const ADMIN_ORDER_PAGE_SIZE=5;
export const USER_PAGE_SIZE=5;
export const STORE_PAGE_PRODUCT_SIZE=4;

export const getUserImageUrl=(userId)=>{
  return `${BASE_URL}/users/image/${userId}`;
}

export const getProductImageUrl=(productId)=>{
    return `${BASE_URL}/products/image/${productId}`;
};

export const formatDate=(timeInLongs)=>{
    if (!timeInLongs){
      return null;
    }
    const date = new Date(timeInLongs);
    return date.toLocaleString() ;
}