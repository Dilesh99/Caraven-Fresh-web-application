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

export async function GET() {
  const db = readDb()
  return NextResponse.json(db.products)
}

export async function POST(request: Request) {
  const db = readDb()
  const product = await request.json()
  product.id = Date.now()
  if (!db.categories.includes(product.category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 })
  }
  db.products.push(product)
  writeDb(db)
  return NextResponse.json(product, { status: 201 })
}

