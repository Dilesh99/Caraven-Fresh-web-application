import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const dbPath = path.join(process.cwd(), "data", "db.json")

function readDb() {
  const data = fs.readFileSync(dbPath, "utf8")
  return JSON.parse(data)
}

function writeDb(data: any) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8")
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const db = readDb()
  const product = db.products.find((p: any) => p.id === Number.parseInt(params.id))
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }
  return NextResponse.json(product)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const db = readDb()
  const updatedProduct = await request.json()
  const index = db.products.findIndex((p: any) => p.id === Number.parseInt(params.id))
  if (index === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }
  db.products[index] = { ...db.products[index], ...updatedProduct }
  writeDb(db)
  return NextResponse.json(db.products[index])
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const db = readDb()
  const index = db.products.findIndex((p: any) => p.id === Number.parseInt(params.id))
  if (index === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }
  db.products.splice(index, 1)
  writeDb(db)
  return NextResponse.json({ message: "Product deleted successfully" })
}

