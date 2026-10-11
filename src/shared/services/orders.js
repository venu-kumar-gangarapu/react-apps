import api from "./axios";

const handleApiError = (error) => {
    if (error.response) {
        return {
            status: error.response.status,
            message:
                error.response.data?.message ||
                "Something went wrong"
        };
    }

    if (error.request) {
        return {
            status: null,
            message: "Unable to connect to server"
        };
    }

    return {
        status: null,
        message: error.message || "Something went wrong"
    };
};

const getOrders = async () => {
    try {
        const response = await api.get("/orders");
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

const getOrder = async (id) => {
    try {
        const response = await api.post(`/orders/${id}`);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

const postOrder = async (order) => {
    try {
        const response = await api.post("/auth/register", order);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

export {postOrder,getOrder,getOrders}