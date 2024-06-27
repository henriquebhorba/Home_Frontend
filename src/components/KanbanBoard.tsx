// src/components/KanbanBoard.tsx
import React, { useEffect, useState, useContext, useCallback } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { Task, User } from '../types';
import { AuthContext } from '../contexts/AuthContext';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import KanbanColumn from './KanbanColumn';

const Board = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

interface KanbanBoardProps {
    tasksUpdated: boolean;
    setTasksUpdated: (updated: boolean) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasksUpdated, setTasksUpdated }) => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    const fetchTasks = useCallback(async () => {
        try {
            const response = await api.get('/tasks');
            setTasks(response.data);
            setTasksUpdated(false);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }, [setTasksUpdated]);

    const fetchUsers = useCallback(async () => {
        try {
            const response = await api.get(`/users?adminUuid=${user?.adminUuid}`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, [user?.adminUuid]);

    const updateTask = async (updatedTask: Task) => {
        try {
            await api.put(`/tasks/${updatedTask._id}`, updatedTask);
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const deleteTask = async (taskId: string) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
        fetchUsers();
    }, [fetchTasks, fetchUsers]);

    useEffect(() => {
        if (tasksUpdated) {
            fetchTasks();
        }
    }, [tasksUpdated, fetchTasks]);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const updatedTasks = tasks.map((task) => {
                if (task._id === result.draggableId) {
                    return { ...task, status: destination.droppableId };
                }
                return task;
            });
            setTasks(updatedTasks);
            const updatedTask = updatedTasks.find(task => task._id === result.draggableId);
            if (updatedTask) {
                updateTask(updatedTask);
            }
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Board>
                {['to-do', 'in-progress', 'completed'].map((status) => (
                    <Droppable droppableId={status} key={status}>
                        {(provided) => (
                            <KanbanColumn
                                title={status}
                                tasks={tasks.filter((task) => task.status === status)}
                                onUpdateTask={updateTask}
                                onDeleteTask={deleteTask}
                                users={users}
                                innerRef={provided.innerRef}
                                droppableProps={provided.droppableProps}
                                placeholder={provided.placeholder}
                            />
                        )}
                    </Droppable>
                ))}
            </Board>
        </DragDropContext>
    );
};

export default KanbanBoard;
