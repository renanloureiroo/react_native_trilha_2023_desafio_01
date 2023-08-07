import {
  FlatList,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Text } from "../components/Text";
import { Input } from "../components/Input";
import { useCallback, useReducer, useState } from "react";
import { colors } from "../shared/theme/colors";
import { Checkbox } from "../components/Checkbox";
import { Button } from "../components/Button";

import TrashSVG from "../../assets/svgs/trash.svg";
import { Task } from "../components/Task";
import { useSafeArea } from "../shared/hooks/useSafeArea";

import LogoSVG from "../../assets/svgs/logo.svg";
import PlusSVG from "../../assets/svgs/plus.svg";
import { Icon } from "../components/Icon";
import { type } from "@testing-library/react-native/build/user-event/type";
import { usePersistenteReducer } from "../shared/hooks/usePersistenteReducer";

export enum ActionEnum {
  ADD_TASK = "ADD_TASK",
  DELETE_TASK = "DELETE_TASK",
  CHECK_TASK = "CHECK_TASK",
  SET_STATE = "SET_STATE",
}

type Task = {
  id: string;
  title: string;
  checked: boolean;
};

type Tasks = Task[];

type ActionType = {
  type: ActionEnum;
  payload: any;
};

const reduce = (state: Tasks, action: ActionType) => {
  const { type, payload } = action;

  switch (type) {
    case ActionEnum.ADD_TASK: {
      const { title } = payload;
      const newTask: Task = {
        id: Math.random().toString(),
        checked: false,
        title,
      };
      return [...state, newTask];
    }

    case ActionEnum.DELETE_TASK: {
      const { id } = payload;
      return state.filter((task) => task.id !== id);
    }

    case ActionEnum.CHECK_TASK: {
      const { id } = payload;
      return state.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            checked: !task.checked,
          };
        }
        return task;
      });
    }

    case ActionEnum.SET_STATE: {
      return [...payload];
    }

    default:
      return state;
  }
};

export const Home = () => {
  const [value, setValue] = useState<string>("");
  const [tasks, dispath] = usePersistenteReducer<Tasks, ActionType>({
    key: "tasks",
    initialState: [],
    reducer: reduce,
  });

  const { top, bottom } = useSafeArea();

  const handleAddTask = useCallback(() => {
    if (!value.trim()) return;

    const taskAlreadyExists = tasks.find(
      (item) => item.title.toLocaleLowerCase() === value.toLocaleLowerCase()
    );

    if (taskAlreadyExists) {
      setValue("");
      return;
    }

    dispath({
      type: ActionEnum.ADD_TASK,
      payload: {
        title: value,
      },
    });
    setValue("");
  }, [value, tasks]);

  const handleDeleteTask = useCallback((id: string) => {
    dispath({
      type: ActionEnum.DELETE_TASK,
      payload: {
        id,
      },
    });
  }, []);

  const handleCheckTask = useCallback((id: string) => {
    dispath({
      type: ActionEnum.CHECK_TASK,
      payload: {
        id,
      },
    });
  }, []);

  const $rootStyles = [
    $root,
    { paddingBottom: bottom },
  ] as StyleProp<ViewStyle>;

  const $headerStyles = [$header, { paddingTop: top }] as StyleProp<ViewStyle>;

  const total = tasks.length;
  const totalChecked = tasks.filter((task) => task.checked).length;
  return (
    <View style={$rootStyles}>
      <View style={$headerStyles}>
        <LogoSVG style={$logo} width={110} height={32} />
        <View style={$inputWrapper}>
          <Input style={{ flex: 1 }} value={value} onChangeText={setValue} />

          <Button
            style={$button}
            pressedStyles={$buttonPressed}
            icon={PlusSVG}
            iconSize={18}
            iconColor="gray-100"
            iconPressedColor="gray-100"
            onPress={handleAddTask}
          />
        </View>
      </View>
      <View style={$content}>
        <View style={$counterWrapper}>
          <View style={$counter}>
            <Text size="medium" weight="bold" color="primary-100">
              Criadas
            </Text>
            <View style={$number}>
              <Text size="medium" weight="bold" color="gray-200">
                {total}
              </Text>
            </View>
          </View>

          <View style={$counter}>
            <Text size="medium" weight="bold" color="secondary-100">
              Concluídas
            </Text>
            <View style={$number}>
              <Text size="medium" weight="bold" color="gray-200">
                {totalChecked}
              </Text>
            </View>
          </View>
        </View>
        <FlatList
          data={tasks}
          keyExtractor={({ id }) => id}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          renderItem={({ item }) => (
            <Task
              data={item}
              onChecked={handleCheckTask}
              onDelete={handleDeleteTask}
            />
          )}
        />
      </View>
    </View>
  );
};

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors["gray-600"],
  position: "relative",
};

const $header: ViewStyle = {
  alignItems: "center",
  backgroundColor: colors["gray-700"],
  paddingBottom: 40,
  position: "relative",
  paddingHorizontal: 24,
};

const $logo: ViewStyle = {
  marginTop: 24,
};

const $inputWrapper: ViewStyle = {
  flexDirection: "row",
  position: "absolute",
  bottom: -27,
  width: "100%",
  height: 54,

  gap: 4,
};

const $button: ViewStyle = {
  backgroundColor: colors["primary-200"],
};

const $buttonPressed: ViewStyle = {
  backgroundColor: colors["primary-100"],
};

const $content: ViewStyle = {
  flex: 1,
  paddingTop: 55,
  paddingHorizontal: 24,
};

const $counterWrapper: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 24,
};

const $counter: ViewStyle = {
  flexDirection: "row",
  gap: 8,
  alignItems: "center",
};

const $number: ViewStyle = {
  paddingHorizontal: 8,
  borderRadius: 9999,
  backgroundColor: colors["gray-400"],
};
