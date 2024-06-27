// src/components/KanbanColumn.tsx
import Modal from 'react-modal';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Task, User } from '../types';
import { Draggable } from 'react-beautiful-dnd';
import TaskForm from './TaskForm';

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  users: User[];
  innerRef: (element: HTMLElement | null) => void;
  droppableProps: any;
  placeholder: React.ReactNode;
}

const Column = styled.div`
  width: 30%;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 10px;
`;

const ColumnTitle = styled.h3`
  text-align: center;
  color: #333;
`;

const TaskItem = styled.div`
  background-color: white;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TaskButton = styled.button`
  margin: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  &:hover {
    background-color: #0056b3;
  }
`;

const DeleteButton = styled.button`
  margin: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #dc3545;
  color: white;
  &:hover {
    background-color: #c82333;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const customStyles = {
  content: {
    width: '900px',
    height: '600px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  tasks,
  onUpdateTask,
  onDeleteTask,
  users,
  innerRef,
  droppableProps,
  placeholder
}) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const openEditModal = (task: Task) => {
    setTaskToEdit(task);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setTaskToEdit(null);
  };

  return (
    <Column ref={innerRef} {...droppableProps}>
      <ColumnTitle>{title.charAt(0).toUpperCase() + title.slice(1)}</ColumnTitle>
      {tasks.map((task, index) => (
        <Draggable key={task._id} draggableId={task._id} index={index}>
          {(provided) => (
            <TaskItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <div><strong>Description:</strong> {task.description}</div>
              <div><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</div>
              <div><strong>Priority:</strong> {task.priority}</div>
              <div><strong>Assignee:</strong> {task.assignee}</div>
              {task.status === 'to-do' && <TaskButton onClick={() => onUpdateTask({ ...task, status: 'in-progress' })}>Start</TaskButton>}
              {task.status === 'in-progress' && <TaskButton onClick={() => onUpdateTask({ ...task, status: 'completed' })}>Complete</TaskButton>}
              <TaskButton onClick={() => openEditModal(task)}>Edit</TaskButton>
              <DeleteButton onClick={() => onDeleteTask(task._id)}>Delete</DeleteButton>
            </TaskItem>
          )}
        </Draggable>
      ))}
      {placeholder}
      {taskToEdit && (
        <Modal isOpen={isEditModalOpen} onRequestClose={closeEditModal} contentLabel="Edit Task" style={customStyles}>
          <TaskForm
            task={taskToEdit}
            onClose={closeEditModal}
            onTaskCreated={() => {
              onUpdateTask(taskToEdit);
              closeEditModal();
            }}
          />
        </Modal>
      )}
    </Column>
  );
};

export default KanbanColumn;
