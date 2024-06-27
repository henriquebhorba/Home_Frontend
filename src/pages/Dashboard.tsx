// src/pages/Dashboard.tsx
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { AuthContext } from '../contexts/AuthContext';
import KanbanBoard from '../components/KanbanBoard';
import TaskForm from '../components/TaskForm';

const DashboardContainer = styled.div`
  padding: 20px;
`;

const CreateTaskButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  margin-left: 1.2%;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
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

const Dashboard: React.FC = () => {
    const { user } = useContext(AuthContext);
    const [tasksUpdated, setTasksUpdated] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleTaskCreated = () => {
        setTasksUpdated(true);
        closeModal();
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <DashboardContainer>
            <CreateTaskButton onClick={openModal}>Create Task</CreateTaskButton>
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Create Task" style={customStyles}>
                <TaskForm onTaskCreated={handleTaskCreated} onClose={closeModal} />
            </Modal>
            <KanbanBoard tasksUpdated={tasksUpdated} setTasksUpdated={setTasksUpdated} />
        </DashboardContainer>
    );
};

export default Dashboard;
