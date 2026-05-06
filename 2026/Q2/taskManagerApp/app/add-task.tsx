import { TaskContext } from '@/contexts/TaskContext';
import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { Button, TextInput, View } from 'react-native';


export default function AddTask() {
    const [task, setTask] = useState('');
    const router = useRouter();

    const {setTasks} = useContext(TaskContext);

    const handleSave = () => {
        setTasks((prev: any[])=>[...prev,{id: Date.now().toString(), title: task}]);
        router.back();
    };

    return(
        <View>
            <TextInput
            placeholder='Enter task'
            value={task}
            onChangeText={setTask}
            />
            <Button title='Save Task' onPress={handleSave}/>
        </View>
    );
}