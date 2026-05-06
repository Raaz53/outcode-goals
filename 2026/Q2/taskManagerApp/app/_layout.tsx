import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { TaskProvider } from '@/contexts/TaskContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
      <TaskProvider>
        <Stack/>
      </TaskProvider>
  );
}
