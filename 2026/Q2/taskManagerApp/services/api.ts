const API_URL = 'http://192.168.10.12:8000/api/tasks/';


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