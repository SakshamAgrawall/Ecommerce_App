import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState();
    const [category, setCetegory] = useState("");
    const [quantity, setQuantity] = useState();
    const [shipping, setShipping] = useState('');
    const [id, setId] = useState("")

    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`)
            setName(data.singleProduct.name);
            setDescription(data.singleProduct.description)
            setPrice(data.singleProduct.price)
            setQuantity(data.singleProduct.quantity)
            setShipping(data.singleProduct.shipping)
            setId(data.singleProduct._id)
            setCetegory(data.singleProduct.category._id)

        } catch (error) {
            toast.error(error)
        }
    }


    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    }, []);




    //get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/category/all-category`
            );
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            toast.error("something went wrong in getting category");
        }
    };

    //create product fn

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity", quantity)
            productData.append("shipping", shipping)
            photo && productData.append("photo", photo)
            productData.append("category", category)

            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`, productData)
            if (data.success) {
                toast.success("Product update successfully")
                setTimeout(() => {

                    navigate('/dashboard/admin/products')
                }, 2000)
            } else {
                toast.error('something wrong')
            }

        } catch (error) {
            toast.error("something went wrong")
        }
    }

    const handleDelete = async () => {
        try {
            let answer = window.prompt('are you sure you want to delete')
            if (!answer) return;
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`)
            if (data.success) {
                toast.success('product deleted successfully')
                setTimeout(() => {
                    navigate('/dashboard/admin/products')
                }, 2000)
            }
        } catch (error) {
            toast.error('something wrong')
        }
    }

    useEffect(() => {
        getAllCategory();
    }, []);
    return (
        <Layout title={"Admin Update Product - Ecommerce app"}>

            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>UpdateProduct</h1>
                        <div className="m-1 w-75">
                            <Select
                                bordered={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setCetegory(value);
                                }}
                                value={category}
                            >
                                {categories?.map((C) => (
                                    <Option key={C.id} value={C._id}>
                                        {C.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary col-md-12">
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo ? (
                                    <div className="text-center">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="Product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <img
                                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                                            alt="Product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="write a name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="write a description"
                                    className="form-control"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="write a Price"
                                    className="form-control"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="write a quantity"
                                    className="form-control"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    placeholder="Select Shipping "
                                    size="large"
                                    showSearch
                                    className="form-select mb-3"
                                    onChange={(value) => {
                                        setShipping(value);
                                    }}
                                    value={shipping ? 'yes' : 'no'}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleUpdate}>
                                    UPDATE PRODUCT
                                </button>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-danger ml-2" onClick={handleDelete}>
                                    DELETE PRODUCT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default UpdateProduct;
