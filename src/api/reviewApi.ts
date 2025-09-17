import axiosInstance from "./axiosInstance";

export const getReviews = async () => {
    const response = await axiosInstance.get("/reviews");
    return response.data;
};

export const createReview = async ({
    title,
    description,
    rating,
    reviewer,
    productId,
}: {
    title: string;
    description: string;
    rating: number;
    reviewer: string;
    productId: number;
}) => {
    const response = await axiosInstance.post("/reviews", {
        title,
        description,
        rating,
        reviewer,
        productId,
    });
    return response.data;
};  

export const deleteReview = async (id: number) => {
    const response = await axiosInstance.delete(`/reviews/${id}`);
    return response.data;
};

export const updateReview = async (id: number, review: {
    title: string;
    description: string;
    rating: number;
    reviewer: string;
}) => {
    const response = await axiosInstance.put(`/reviews/${id}`, review);
    return response.data;
}; 

