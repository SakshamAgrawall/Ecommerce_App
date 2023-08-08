import productSchema from "../models/productModel.js";
import fs from "fs"
import slugify from "slugify"

export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files

        // validation
        switch (true) {
            case !name:
                return res.status(500).send({ message: "Name is required" })
            case !description:
                return res.status(500).send({ message: "description is required" })
            case !price:
                return res.status(500).send({ message: "Price is required" })
            case !category:
                return res.status(500).send({ message: "category is required" })
            case !quantity:
                return res.status(500).send({ message: "quantity is required" })
            case photo && photo.size > 1000000:
                return res.status(500).send({ message: "Photo is required & should be less then 1 Mb" })
        }
        const product = new productSchema({ ...req.fields, slug: slugify(name) });
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        res.status(201).send({
            success: true,
            message: 'Product created successfully',
            product
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating product"
        })
    }
}
export const allProductController = async (req, res) => {
    try {
        const products = await productSchema.find({}).populate('category').select("-photo").limit(20).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            message: 'Product get succeefully',
            total: products.length,
            products
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in all product"
        })
    }
}

export const singleProductController = async (req, res) => {
    try {
        const singleProduct = await productSchema.findOne({ slug: req.params.slug }).select('-photo').populate('category')
        res.status(200).send({
            success: true,
            message: 'Product get succeefully',
            singleProduct
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in single product"
        })
    }
}

export const productPhotoController = async (req, res) => {
    try {
        const product = await productSchema.findById(req.params.pid).select('photo')
        if (product.photo.data) {
            res.set('content-type', product.photo.contentType)
            return res.status(200).send(
                product.photo.data
            )
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in  product photo"
        })
    }
}

export const deleteproductController = async (req, res) => {
    try {
        const { id } = req.params
        await productSchema.findByIdAndDelete(req.params.pid).select('-photo')
        res.status(200).send({ success: true, Message: "product deleted" })


    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in  product photo"
        })
    }
}




export const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files

        // validation
        switch (true) {
            case !name:
                return res.status(500).send({ message: "Name is required" })
            case !description:
                return res.status(500).send({ message: "description is required" })
            case !price:
                return res.status(500).send({ message: "Price is required" })
            case !category:
                return res.status(500).send({ message: "category is required" })
            case !quantity:
                return res.status(500).send({ message: "quantity is required" })
            case photo && photo.size > 1000000:
                return res.status(500).send({ message: "Photo is required & should be less then 1 Mb" })
        }
        const product = await productSchema.findByIdAndUpdate(req.params.pid, {
            ...req.fields, slug: slugify(name)
        }, { new: true }
        )
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        res.status(201).send({
            success: true,
            message: 'Product updated successfully',
            product
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating product"
        })
    }
}


export const filtersProductController = async (req, res) => {
    try {
        const { checked, radio } = req.body
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await productSchema.find(args)
        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "error in filters"
        })
    }
}


export const productCountController = async (req, res) => {
    try {
        const total = await productSchema.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            total
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "error in count"
        })
    }
}

export const productListController = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1
        const products = await productSchema.find({}).select('-photo').skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "error in list"
        })
    }
}

export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params
        const results = await productSchema.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        }).select('-photo')
        res.json(results);
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "error in search"
        })
    }
}