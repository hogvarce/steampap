import axios from "axios";
import { steamkey } from "@/common/actions";

export default async function(appid) {
    return await axios.get(`https://store.steampowered.com/api/appdetails?appids=2100`);
}
