# Mood Location Finder – Playwright Automation Testing

ระบบทดสอบเว็บไซต์ Mood Location Finder ด้วย Playwright Test และ TypeScript

**เว็บไซต์ที่ทดสอบ:** https://moodlocation.vercel.app/

## 📌 เกี่ยวกับโปรเจกต์

โปรเจกต์นี้จัดทำขึ้นเพื่อทดสอบการทำงานของระบบ Mood Location Finder โดยใช้ Playwright Automation Testing จำลองการใช้งานเว็บไซต์ผ่าน Browser และตรวจสอบผลลัพธ์ตาม Test Case ที่กำหนด

### วัตถุประสงค์

- ทดสอบการเข้าสู่ระบบ
- ทดสอบการเลือกอารมณ์ผ่าน Mood Icons
- ทดสอบการค้นหาสถานที่ตามอารมณ์
- ทดสอบการเปลี่ยนอารมณ์ที่เลือก
- ตรวจสอบผลลัพธ์การทำงานของเว็บไซต์ด้วย Assertions

## 🛠️ เทคโนโลยีที่ใช้

- Playwright Test
- TypeScript
- Node.js
- Chromium Browser
- Visual Studio Code

## 📂 โครงสร้างโปรเจกต์

```text
moodlocation-playwright/
├── tests/
│   └── us02-mood.spec.ts
├── playwright.config.ts
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## ⚙️ การติดตั้ง

### 1. ติดตั้ง Node.js

ดาวน์โหลด Node.js จาก https://nodejs.org/

### 2. ติดตั้ง Dependencies

เปิด Terminal ในโฟลเดอร์โปรเจกต์ แล้วรันคำสั่ง

```bash
npm install
```

### 3. ติดตั้ง Playwright Browser

```bash
npx playwright install chromium
```

## 🔐 การตั้งค่าบัญชีทดสอบ

การทดสอบต้องใช้บัญชีสำหรับเข้าสู่ระบบ โดยกำหนด Environment Variables ก่อนรัน

### Windows Command Prompt (CMD)

```bat
set MOOD_EMAIL=อีเมลบัญชีทดสอบ
set MOOD_PASSWORD=รหัสผ่านบัญชีทดสอบ
```

### Windows PowerShell

```powershell
$env:MOOD_EMAIL="อีเมลบัญชีทดสอบ"
$env:MOOD_PASSWORD="รหัสผ่านบัญชีทดสอบ"
```

แทนที่ข้อความตัวอย่างด้วยข้อมูลบัญชีทดสอบจริง

**ข้อควรระวัง:** ห้ามบันทึกรหัสผ่านจริงไว้ในไฟล์ Test หรือ Commit ข้อมูลบัญชีขึ้น GitHub

## 🧪 Test Cases

| Test Case ID | รายละเอียด | User Story |
|---|---|---|
| TC_2_0_001 | เลือกอารมณ์เครียดและค้นหาสถานที่ | US-02 |
| TC_2_0_002 | เปลี่ยนอารมณ์เป็นมีความสุขและค้นหาสถานที่ | US-02 |
| TC_2_0_003 | ผู้ใช้ที่ไม่ได้เข้าสู่ระบบพยายามเลือกอารมณ์ | US-02 |

หมายเหตุ: รายการข้างต้นเป็น Test Case ที่อยู่ในแผนงาน โดยต้องตรวจสอบว่ามีสคริปต์และ Assertions ครบถ้วนก่อนสรุปผลจริง

## ▶️ วิธีรันทดสอบ

### รันทดสอบทั้งหมด

```bash
npx playwright test
```

### เปิด Browser ขณะทดสอบ

```bash
npx playwright test --headed --workers=1
```

### ทดสอบเฉพาะ US-02

```bash
npx playwright test tests/us02-mood.spec.ts --headed --workers=1
```

### ดูรายงานผลการทดสอบ

```bash
npx playwright show-report
```

### เปิด Playwright Inspector สำหรับ Debug

```bash
npx playwright test tests/us02-mood.spec.ts --debug
```

## 📊 การแปลผล

- **PASS:** Test Case ผ่าน Assertions ที่กำหนดไว้
- **FAIL:** Test Case ไม่ผ่านอย่างน้อยหนึ่งเงื่อนไข
- **SKIPPED:** Test Case ถูกข้ามตามเงื่อนไขของการทดสอบ

ผล PASS ไม่ได้ยืนยันว่าระบบถูกต้องทุกด้าน แต่ยืนยันเฉพาะเงื่อนไขที่มีการตรวจสอบในสคริปต์เท่านั้น

## 📁 ผลลัพธ์การทดสอบ

Playwright สามารถสร้างไฟล์ผลลัพธ์ เช่น

- `playwright-report/` — รายงาน HTML
- `test-results/` — ภาพหน้าจอ Trace และข้อมูลประกอบเมื่อทดสอบไม่ผ่าน

ไฟล์เหล่านี้สร้างขึ้นตามการตั้งค่าและผลการทดสอบ

## 🔒 Security

- ไม่เก็บรหัสผ่านไว้ในซอร์สโค้ด
- ไม่ Commit ไฟล์ `.env` หรือข้อมูลลับขึ้น GitHub
- ใช้บัญชีทดสอบแทนบัญชีส่วนตัว
- ทดสอบการเปลี่ยนแปลงข้อมูลบนระบบจริงด้วยความระมัดระวัง

## 👩‍💻 ผู้พัฒนา

Mood Location Finder – Playwright Automation Testing
- นางสาว นิชาภา จอกลอย

โปรเจกต์นี้จัดทำเพื่อการศึกษาและทดสอบซอฟต์แวร์