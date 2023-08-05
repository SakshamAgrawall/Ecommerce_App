import React from 'react'
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu'

const AdminDashboard = () => {
    return (
        <Layout title={'Admin Dashboard-Ecommerce App'}>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>Content</div>
                </div>
            </div>


        </Layout>
    )
}

export default AdminDashboard;
