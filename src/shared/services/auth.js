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

const login = async (user) => {
    try {
        const response = await api.post("/auth/login", user);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

const register = async (registerData) => {
    try {
        const response = await api.post("/auth/register", registerData);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

export { login, register };