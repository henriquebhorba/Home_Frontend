// src/types/index.ts
export interface Task {
    _id: string;
    description: string;
    deadline: string;
    priority: string;
    status: string;
    user: string;
    assignee: string;
    deleted_at?: Date | null;
}

export interface User {
    _id: string;
    username: string;
    email: string;
    adminUuid: string;
    role: string;
}
