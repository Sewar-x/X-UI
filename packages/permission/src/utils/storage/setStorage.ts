import type { StorageOptions } from "@/types/token";

const storageOptions: StorageOptions = {
    type: "cookie",
    expires: undefined
};
export function setStorage(options: StorageOptions) {
    const { type, expires } = options
    if (type) storageOptions.type = type
    if (expires) storageOptions.expires = expires
}
export default storageOptions;