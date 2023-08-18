import axios from "axios"
import jwt from "jwt-decode";

const token = localStorage.getItem("surveyApp")
const secret = import.meta.env.VITE_JWT_SECRET_KEY

export const verifyUser = function () {
    try {
        const decoded = jwt(token, secret);
        if (decoded) {
            return decoded;
        }
        return false
    } catch (error) {
        console.error('Invalid token:', error.message);
        return false;
    }
};

// export const verifyUser = function () {
//     return new Promise(async function (resolve, reject) {
//         try {
//             const isUserVerified = await axios.post(
//                 `${import.meta.env.VITE_API_URL}/auth/verifytoken`,{token}
//             );
//             const response = await isUserVerified.data;
//             resolve(response)
//         } catch (error) {
//             reject(Error("Error ", error.message));
//         }
//     });
// };
