import { TaskContext } from "@/src/contexts/TaskContext";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, RefreshControl } from "react-native";
import { fetchTasks } from "@/src/services/api";

export default function HomeScreen(){
  const router = useRouter();
  const {tasks, setTasks} = useContext(TaskContext);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const deleteTask = async (id: string) => {
    setTasks((prev: any[]) => prev.filter(task => task.id !== id));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  };

  const loadTasks = async () => {
    try {
      setLoading(true);

      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task List</Text>
      <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }
      data={tasks}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({item})=>(
        <View style={styles.taskItem}>
          <Text style={[styles.taskText, item.completed && styles.completedText]}>{item.title}</Text>
          <TouchableOpacity onPress={() => deleteTask(item.id)}>
            <Text style={styles.deleteBtn}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
      />
      <Button 
      title="Add Task"
      onPress={()=> router.push('/add-task')}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  list:{
    paddingBottom: 20,
  },
  taskItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  taskText: {
    fontSize: 16,
  },
  
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  
  doneBtn: {
    color: 'green',
  },
  
  deleteBtn: {
    color: 'red',
  },
});
