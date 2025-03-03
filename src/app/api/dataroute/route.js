import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    const filePath = path.join(process.cwd(), "public/alldata.json");
    try{
        const fileData = fs.readFileSync(filePath, 'utf-8');
        const menuData = JSON.parse(fileData);
        return NextResponse.json(menuData)
    } catch{
        return NextResponse.json({error: "Error fetching data"}, {status: 500, statusMessage: "Internal Server Error"})
    }
}