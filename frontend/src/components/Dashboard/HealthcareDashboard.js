import React, { useState }  from 'react';
import './HealthcareDashboard.css';

const HealthcareDashboard = ({ onLogout }) => {
  
  const [activeTab, setActiveTab] = useState('dash-board');
  
  // Sample data
  const navigationItems = [
    { id: 1, name: 'Dashboard', key: 'dash-board' },
    { id: 2, name: 'Patient Profile', key: 'patient-profile' },
    { id: 3, name: 'Vaccination', key: 'vaccination' },
    { id: 4, name: 'Patient-Provider', key: 'patient-provider' }
  ];
  
  
  // Sample data
  const stats = [
    { title: 'Total Patients', value: '1,248' },
    { title: 'Today Appointments', value: '18' },
    { title: 'Pending Tests', value: '7' },
    { title: 'Available Doctors', value: '12' }
  ];

  const patients = [
    { id: 1, name: 'John Doe', age: 45, condition: 'Diabetes', lastVisit: '2023-05-15' },
    { id: 2, name: 'Jane Smith', age: 32, condition: 'Hypertension', lastVisit: '2023-05-10' },
    { id: 3, name: 'Robert Johnson', age: 58, condition: 'Arthritis', lastVisit: '2023-05-05' }
  ];
  
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Healthcare Vaccine Immunization Traking System</h1>
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </header>
       
      <nav className="dashboard-nav">
        <div className="nav-container">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.key ? 'active' : ''}`}
              onClick={() => setActiveTab(item.key)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </nav>


      <div className="dashboard-content">
        {activeTab === 'dash-board' && (
          <div className="tab-content">
            <h2>Dashboard</h2>
             {/* Dashboard */}

         <div className="dashboard-content">
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <h3>{stat.title}</h3>
                    <p>{stat.value}</p>
                  </div>
                ))}
        </div>

        <div className="patients-table">
          <h2>Recent Patients</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Condition</th>
                <th>Last Visit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.condition}</td>
                  <td>{patient.lastVisit}</td>
                  <td>
                    <button className="action-btn view">View</button>
                    <button className="action-btn edit">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>




          </div>
        )}

        {activeTab === 'patient-profile' && (
          <div className="tab-content">
            <h2>Patient Profiles</h2>
            {/* Add patient profile content here */}
          </div>
        )}

        {activeTab === 'vaccination' && (
          <div className="tab-content">
            <h2>Vaccination Records</h2>
            {/* Add vaccination content here */}
          </div>
        )}

        {activeTab === 'patient-provider' && (
          <div className="tab-content">
            <h2>Patient-Provider Relationships</h2>
            {/* Add patient-provider content here */}
          </div>
        )}
      </div>

      
    </div>
  );
};

export default HealthcareDashboard;