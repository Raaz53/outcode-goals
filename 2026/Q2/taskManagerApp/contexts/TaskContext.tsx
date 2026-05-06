import { createContext, ReactNode, useState } from "react";

 export const TaskContext = createContext<any>(null);

 export function TaskProvider ({ children }: { children: ReactNode}){
    const [tasks, setTasks] = useState<any []>([]);

    return (
        <TaskContext.Provider value={{tasks,setTasks}}>
            {children}
        </TaskContext.Provider>
    );
 }