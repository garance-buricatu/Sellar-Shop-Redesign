import React from 'react'

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="sidebar">
                <div className="header">
                    <h1 className="lead">
                        Owner Name
                    </h1>
                    <p>Admin</p>
                </div>
                <div className="menu">
                    <div>
                        <div className="list-item">
                            <i class="fa fa-picture-o" aria-hidden="true"></i>
                            <p className="text-menu">Edit Artworks</p>
                        </div>
                        <div className="list-item">
                            <i class="fa fa-calendar" aria-hidden="true"></i>
                            <p className="text-menu">Edit Seminar</p>
                        </div>
                        <div className="list-item">
                            <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                            <p className="text-menu">Edit Profile</p>
                        </div>
                    </div>
                    <div>
                        <div className="list-item">
                            <i class="fa fa-cog" aria-hidden="true"></i>
                            <p className="text-menu">My Account</p>
                        </div>
                        <div className="list-item">
                            <i class="fa fa-sign-out" aria-hidden="true"></i>
                            <p className="text-menu">Logout</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main">
                <div className="main-inner m-4">
                    test
                </div>
            </div>
        </div>
    )
}

export default Dashboard
