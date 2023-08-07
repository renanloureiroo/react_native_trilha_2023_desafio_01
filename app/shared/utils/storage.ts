import AsyncStorage from "@react-native-async-storage/async-storage";

interface IStorage {
  save: (key: string, value: any) => Promise<void>;
  get: (key: string) => Promise<any | null>;
  remove: (key: string) => Promise<void>;
}

const save = async (key: string, value: any) => {
  const jsonValue = JSON.stringify(value);

  try {
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(error);
  }
};

const get = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(error);
  }
};

const remove = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};

export const storage: IStorage = {
  save,
  get,
  remove,
};
