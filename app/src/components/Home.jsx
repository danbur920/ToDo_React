import React from 'react';
import { Typography, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Home = () => (
  <div style={{ textAlign: 'center', padding: '50px' }}>
    <Title level={2}>Witaj w aplikacji ToDo</Title>
    <Paragraph>
      Zarządzaj swoimi zadaniami w prosty i efektywny sposób dzięki naszej aplikacji ToDo!
    </Paragraph>
    <Link to="/tasks">
      <Button type="primary" size="large">Zobacz swoje zadania</Button>
    </Link>
  </div>
);

export default Home;
