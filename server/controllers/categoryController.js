import categorySchema from "../models/categoryModel.js"
import slugify from "slugify"


// createCategoryController
export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(401).send({ Message: "name is required" })
        }
        const existCategory = await categorySchema.findOne({ name })
        if (existCategory) {
            return res.status(200).send({ success: true, Message: "Category Already Exist" })
        }
        const category = await new categorySchema({ name, slug: slugify(name) }).save()
        res.status(201).send({ success: true, Message: "new Category Added", category })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error, Message: 'error in category' })
    }
}


// updateCategoryController
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params
        const category = await categorySchema.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(201).send({ success: true, Message: "category updated", category })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error, Message: 'error in updating category' })
    }
}


// getCategoryController
export const getCategoryController = async (req, res) => {
    try {
        const category = await categorySchema.find({})
        res.status(200).send({ success: true, Message: "category are finded", category })

    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error, Message: 'error in getting category' })
    }
}

// singleCategoryController
export const singleCategoryController = async (req, res) => {
    try {
        const category = await categorySchema.findOne({ slug: req.params.slug })
        res.status(200).send({ success: true, Message: "category are find", category })

    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error, Message: 'error in find category' })
    }
}


// deleteCategoryController
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        await categorySchema.findByIdAndDelete(id)
        res.status(200).send({ success: true, Message: "category deleted" })

    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error, Message: 'error in deleting category' })
    }
}