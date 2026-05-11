const API_URL = 'http://192.168.10.95:8000/api/tasks/';


export async function fetchTasks() {
    const response = await fetch(API_URL);
    return response.json();
}

export async function createTask(title: string) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({title, completed: false}),
    });
    return response.json();
}

export async function deleteTask(id: number){
    const response = await fetch('${API_URL}${id}/',);
    if (!response.ok) {
        throw new Error('Failed to delete task');
    }
}