"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Plus, Pencil, Trash, Upload } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import { useToast } from "../../components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "", image: null, category: "" })
  const [newCategory, setNewCategory] = useState("")
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const { toast } = useToast()
  const fileInputRef = useRef(null)

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    const response = await fetch("/api/products")
    const data = await response.json()
    setProducts(data)
  }

  const fetchCategories = async () => {
    const response = await fetch("/api/categories")
    const data = await response.json()
    setCategories(data)
  }

  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.price && newProduct.stock && newProduct.category) {
      const productToAdd = {
        ...newProduct,
        image: newProduct.image || "/placeholder.svg?height=100&width=100",
      }
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productToAdd),
      })
      if (response.ok) {
        setNewProduct({ name: "", price: "", stock: "", image: null, category: "" })
        fetchProducts()
        toast({
          title: "Product added",
          description: "The new product has been added successfully.",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to add the product. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handleAddCategory = async () => {
    if (newCategory) {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: newCategory }),
      })
      if (response.ok) {
        setNewCategory("")
        fetchCategories()
        setShowNewCategoryInput(false)
        toast({
          title: "Category added",
          description: "The new category has been added successfully.",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to add the category. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
  }

  const handleUpdateProduct = async () => {
    const response = await fetch(`/api/products/${editingProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingProduct),
    })
    if (response.ok) {
      setEditingProduct(null)
      fetchProducts()
      toast({
        title: "Product updated",
        description: "The product has been updated successfully.",
      })
    }
  }

  const handleDeleteProduct = async (id) => {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    })
    if (response.ok) {
      fetchProducts()
      toast({
        title: "Product deleted",
        description: "The product has been deleted successfully.",
      })
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Products</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Stock
              </Label>
              <Input
                id="stock"
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Select
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                >
                  <SelectTrigger className="flex-grow">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" onClick={() => setShowNewCategoryInput(!showNewCategoryInput)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {showNewCategoryInput && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-category" className="text-right">
                  New Category
                </Label>
                <Input
                  id="new-category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="col-span-2"
                />
                <Button onClick={handleAddCategory}>Add</Button>
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <div className="col-span-3">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                <Button type="button" variant="outline" onClick={() => fileInputRef.current.click()}>
                  <Upload className="mr-2 h-4 w-4" /> Choose Image
                </Button>
              </div>
            </div>
            {newProduct.image && (
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-span-1"></div>
                <div className="col-span-3">
                  <Image
                    src={newProduct.image || "/placeholder.svg"}
                    alt="Product preview"
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                  />
                </div>
              </div>
            )}
          </div>
          <Button onClick={handleAddProduct}>Add Product</Button>
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 flex flex-col">
            <div className="relative w-full h-48 mb-4">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">Price: ${product.price}</p>
            <p className="text-gray-600">Stock: {product.stock}</p>
            <p className="text-gray-600">Category: {product.category}</p>
            <div className="mt-4 flex justify-between">
              <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                <Trash className="mr-2 h-4 w-4" /> Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      {editingProduct && (
        <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-price" className="text-right">
                  Price
                </Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-stock" className="text-right">
                  Stock
                </Label>
                <Input
                  id="edit-stock"
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">
                  Category
                </Label>
                <div className="col-span-3 flex items-center gap-2">
                  <Select
                    value={editingProduct.category}
                    onValueChange={(value) => setEditingProduct({ ...editingProduct, category: value })}
                  >
                    <SelectTrigger className="flex-grow">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" onClick={() => setShowNewCategoryInput(!showNewCategoryInput)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {showNewCategoryInput && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-new-category" className="text-right">
                    New Category
                  </Label>
                  <Input
                    id="edit-new-category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="col-span-2"
                  />
                  <Button onClick={handleAddCategory}>Add</Button>
                </div>
              )}
            </div>
            <Button onClick={handleUpdateProduct}>Update Product</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

