"use server"

import fs from "fs";
import { revalidatePath } from "next/cache";
import { type } from "os";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/users.json");

export async function  deleteUser(formdata) {
    const id = Number(formdata.get("id"))

    const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const updated  = users.filter((u) => u.id !== id);

    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
    
    revalidatePath("/dashboard/users")
}

