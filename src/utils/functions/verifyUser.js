import axios from "axios"

const token = localStorage.getItem("surveyApp")


export const verifyUser = function () {
    return new Promise(async function (resolve, reject) {
        try {
            const isUserVerified = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/verifytoken`,{token}
            );
            const response = await isUserVerified.data;
            resolve(response)
        } catch (error) {
            reject(Error("Error ", error.message));
        }
    });
};
