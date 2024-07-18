import axios from "axios";
import { MulticastApi } from "./api";
import multicasts from "@/config/build/multicasts.local.json"

const multicastApis: MulticastApi[] = [];

for (const each of multicasts) {
  const instance = axios.create({
    baseURL: each.url,
    timeout: 5000,
  });
  const api = new MulticastApi(each.name, instance);
  multicastApis.push(api)
}


export { MulticastApi, multicastApis }
