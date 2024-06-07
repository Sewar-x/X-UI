import type { StorageOptions } from "@/types/token";
import globalState from '@/utils/GlobalState';

export function setStorage(options: StorageOptions) {
    const { storageType, expires } = options
    globalState.setState("storageType", storageType);
    globalState.setState("expires", expires);
}