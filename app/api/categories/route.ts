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
  return NextResponse.json(db.categories)
}

export async function POST(request: Request) {
  const db = readDb()
  const { category } = await request.json()
  if (!db.categories.includes(category)) {
    db.categories.push(category)
    writeDb(db)
    return NextResponse.json({ message: "Category added successfully" }, { status: 201 })
  }
  return NextResponse.json({ message: "Category already exists" }, { status: 400 })
}

