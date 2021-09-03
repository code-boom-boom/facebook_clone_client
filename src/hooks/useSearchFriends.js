import axios from "axios";
import {useState} from "react";

const url = process.env.REACT_APP_API_URI;

function useSearchFriends() {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchFriends = async (name) => {
        try {
            setLoading(true);
            const res = await axios.get(`${ url }/api/user/search?name=${ name }`);
            setFriends(res.data.users);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    }

    return {
        searchFriends,
        friends,
        loading
    };
}

export default useSearchFriends;