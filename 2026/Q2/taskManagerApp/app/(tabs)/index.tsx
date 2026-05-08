import { TaskContext } from "@/contexts/TaskContext";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { fetchTasks } from "@/services/api";

export default function HomeScreen(){
  const router = useRouter();
  const {tasks, setTasks} = useContext(TaskContext);

  const deleteTask = (id: string) => {
    setTasks((prev: any[]) => prev.filter(task => task.id !== id));
  };

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Task List</Text>
      <FlatList
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