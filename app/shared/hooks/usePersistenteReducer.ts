import { useFocusEffect } from "@react-navigation/native";
import { Dispatch, Reducer, useEffect, useReducer, useState } from "react";
import { storage } from "../utils/storage";

type IUsePersistenteReducer<S, A> = {
  key: string;
  reducer: Reducer<S, A>;
  initialState: S;
};

/**
 * @description useReducer que persiste o dados no storage, é preciso criar um action "SET_STATE" em seu reducer para salvar o state recuperado.
 */
export const usePersistenteReducer = <S, A>({
  key,
  reducer,
  initialState,
}: IUsePersistenteReducer<S, A>): [S, Dispatch<A>] => {
  const [reydrate, setReydrate] = useState<boolean>(false);
  const [state, dispath] = useReducer(reducer, initialState);

  useEffect(() => {
    const actionData = async () => {
      await storage.save(key, state);
    };
    if (reydrate) {
      actionData();
    }
  }, [state]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await storage.get(key);
      if (data) {
        dispath({
          type: "SET_STATE",
          payload: data,
        } as A);
      }
      setReydrate(true);
    };

    if (!reydrate) {
      fetchData();
    }
  }, []);

  return [state, dispath];
};
