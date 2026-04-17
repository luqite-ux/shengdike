import { NextResponse } from "next/server"
import { getSanityWriteClient } from "@/lib/sanity/server-client"

type InquiryPayload = {
  name?: string
  email?: string
  companyName?: string
  country?: string
  message?: string
}

function sanitize(input?: string) {
  return String(input || "").trim()
}

export async function POST(request: Request) {
  const client = getSanityWriteClient()
  if (!client) {
    return NextResponse.json(
      { ok: false, message: "Sanity 写入配置缺失，请设置 SANITY_API_WRITE_TOKEN。" },
      { status: 500 }
    )
  }

  let body: InquiryPayload
  try {
    body = (await request.json()) as InquiryPayload
  } catch {
    return NextResponse.json({ ok: false, message: "请求体格式错误" }, { status: 400 })
  }

  const name = sanitize(body.name)
  const email = sanitize(body.email)
  const company = sanitize(body.companyName)
  const country = sanitize(body.country)
  const message = sanitize(body.message)

  if (!name || !email || !company || !country || !message) {
    return NextResponse.json({ ok: false, message: "请完整填写必填字段" }, { status: 400 })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ ok: false, message: "邮箱格式不正确" }, { status: 400 })
  }

  try {
    await client.create({
      _type: "inquiry",
      status: "new",
      submittedAt: new Date().toISOString(),
      name,
      email,
      company,
      country,
      message,
      source: "web",
      sourcePath: "/support",
      isRead: false,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, message: "提交失败，请稍后重试" }, { status: 500 })
  }
}
