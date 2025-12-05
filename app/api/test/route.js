import { NextResponse } from "next/server";
import { Client } from "pg";

export async function GET() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    // 檢查 table 存不存在
    const tableCheck = await client.query(
      "SELECT to_regclass('public.campus_information') AS exists"
    );

    // 抓「排序後第 300 筆」的資料（OFFSET 299）
    const result = await client.query(
      "SELECT id, title, domains, meta FROM campus_information ORDER BY id LIMIT 1 OFFSET 299"
    );

    await client.end();

    return NextResponse.json({
      success: true,
      tableExists: tableCheck.rows[0].exists !== null,
      row: result.rows[0] ?? null,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
