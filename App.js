import { ApplicationProvider } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

import * as eva from "@eva-design/eva";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [addMode, setAddMode] = useState(false);

  const addGoalHandler = (goalTitle) => {
    setCourseGoals([
      ...courseGoals,
      { id: Math.random().toString(), value: goalTitle },
    ]);
    setAddMode(false);
  };
  const removeGoalHandler = (goalId) => {
    setCourseGoals(courseGoals.filter((goal) => goal.id !== goalId));
  };

  const cancelModeHandler = () => {
    setAddMode(false);
  };

  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <View style={styles.screen}>
        <Button title="Add New Goal" onPress={() => setAddMode(true)} />
        <GoalInput
          visible={addMode}
          onAddGoal={addGoalHandler}
          onCancel={cancelModeHandler}
        />
        <FlatList
          data={courseGoals}
          keyExtractor={(item, index) => item.id}
          renderItem={(itemData) => (
            <GoalItem goal={itemData.item} onDelete={removeGoalHandler} />
          )}
        />
        <StatusBar style="auto" />
      </View>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  screen: { padding: 20, marginTop: 30 },
});
