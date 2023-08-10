import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios';
import { toast } from 'react-hot-toast'
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd'


const CreateCategory = () => {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updateName, setUpdateName] = useState('');

    //handle create form
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name })
            if (data?.success) {
                toast.success(`${data?.category.name} is created`)
                getAllCategory()
                setName('')
            } else {
                toast.error(data?.category?.message)
            }
        } catch (error) {
            toast.error('something went wrong')
        }
    }
    //handle Update form
    const handleUpdateSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, { name: updateName })
            if (data.success) {
                toast.success(`${updateName} is updated`)
                setSelected(null)
                setUpdateName("")
                setVisible(false)
                getAllCategory()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('something went wrong')
        }
    }




    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-category`)
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            toast.error("something went wrong in getting category")
        }
    }



    useEffect(() => {
        getAllCategory()
    }, [])



    //handle delete category
    const handleDeleteSubmit = async (pId) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`);
            if (data.success) {
                toast.success(`${name} is deleted`)
                getAllCategory()
            }
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    return (
        <Layout title={"Admin Category - Ecommerce app"}>

            <div className='container-fluid m-3 p-3 dashboard'>

                <div className='row'>

                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>MANAGE CATEGORY</h1>
                        <div className="p-3 w-50 ">
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div className='w-75'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c) => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td>
                                                    <button className='btn btn-primary m-2' onClick={() => { setVisible(true); setUpdateName(c?.name); setSelected(c) }}>Edit</button>
                                                    <button className='btn btn-danger m-2' onClick={() => { handleDeleteSubmit(c?._id) }}>Delete</button>
                                                </td>
                                            </tr >
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
                            <CategoryForm value={updateName} setValue={setUpdateName} handleSubmit={handleUpdateSubmit} />
                        </Modal>
                    </div>
                </div>
            </div>

        </Layout >
    )
}

export default CreateCategory
