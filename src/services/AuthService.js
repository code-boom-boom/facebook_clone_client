import axios from "axios";
const url = process.env.REACT_APP_API_URI;

export const fetchCurrentUser = async () => {
    let token = localStorage.token && JSON.parse(localStorage.token);

    try {
        const { data } = await axios.get(`${ url }/api/user/me`, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        });

        if (data) {
            console.log("MY PROFILE DATA", data);
            return {
                data,
            };
        }

    } catch (err) {
        if (err && err.response) {
            return {
                error: err.response.data.error
            };
        }
    }
}