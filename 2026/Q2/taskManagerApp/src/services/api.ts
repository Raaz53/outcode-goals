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

export async function deleteTaskApi(id: number | string){
    const response = await fetch(`${API_URL}${id}/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }, 
    });

    if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(`Failed to delete task (${response.status}): ${body || response.statusText}`);
    }

}

export async function loginUser(username: string,password: string){
    const response = await fetch('http://192.168.10.95:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password}),
    });

    if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(`Login failed (${response.status}): ${body || response.statusText}`);
    }
}