import { test, expect, type Page } from '@playwright/test'
import { spiritualGiftsKey } from '../src/data/spiritualGifts'

interface SpiritualGift {
  list: number[]
  sum: number
}
const spiritualGifts: { [key: string]: SpiritualGift } = {
  เผยพระวจนะ: { list: [1, 26, 51, 76, 101], sum: 0 },
  อภิบาล: { list: [2, 27, 52, 77, 102], sum: 0 },
  การสอน: { list: [3, 28, 53, 78, 103], sum: 0 },
  ถ้อยคำประกอบด้วยสติปัญญา: { list: [4, 29, 54, 79, 104], sum: 0 },
  ถ้อยคำประกอบด้วยความรู้: { list: [5, 30, 55, 80, 105], sum: 0 },
  การเลี้ยงดูและหนุนใจ: { list: [6, 31, 56, 81, 106], sum: 0 },
  การสังเกตวิญญาณ: { list: [7, 32, 57, 82, 107], sum: 0 },
  การปรึกษา: { list: [8, 33, 58, 83, 108], sum: 0 },
  การวางแผนดี: { list: [9, 34, 59, 84, 109], sum: 0 },
  ความเมตตา: { list: [10, 35, 60, 85, 110], sum: 0 },
  มัธยัสถ์: { list: [11, 36, 61, 86, 111], sum: 0 },
  ผู้ประกาศ: { list: [12, 37, 62, 87, 112], sum: 0 },
  การรับรองแขก: { list: [13, 38, 63, 88, 113], sum: 0 },
  ความเชื่อ: { list: [14, 39, 64, 89, 114], sum: 0 },
  ผู้ควบคุม: { list: [15, 40, 65, 90, 115], sum: 0 },
  ผู้บริหาร: { list: [16, 41, 66, 91, 116], sum: 0 },
  การจัดการดี: { list: [17, 42, 67, 92, 117], sum: 0 },
  การรักษาโรค: { list: [18, 43, 68, 93, 118], sum: 0 },
  การพูดภาษาแปลก: { list: [19, 44, 69, 94, 119], sum: 0 },
  การแปลภาษาแปลก: { list: [20, 45, 70, 95, 120], sum: 0 },
  อธิษฐาน: { list: [21, 46, 71, 96, 121], sum: 0 },
  การอยู่เป็นโสด: { list: [22, 47, 72, 97, 122], sum: 0 },
  การอธิษฐานซ่อนซอน: { list: [23, 48, 73, 98, 123], sum: 0 },
  การทำบัญชี: { list: [24, 49, 74, 99, 124], sum: 0 },
  ผู้อุปการะ: { list: [25, 50, 75, 100, 125], sum: 0 },
}

test('Radio button selection test', async ({ page }) => {
  // Navigate to the page
  await page.goto(' http://localhost:4321/GiftFromGod') // Replace with your actual URL

  // Select the radio button with value "3"
  await page.check('input[name="1"][value="3"]')
  // Verify the radio button is checked
  expect(await page.isChecked('input[name="1"][value="3"]')).toBeTruthy()

  // Select the radio button with value "2"
  await page.check('input[name="1"][value="2"]')
  // Verify the radio button is checked
  expect(await page.isChecked('input[name="1"][value="2"]')).toBeTruthy()

  // Select the radio button with value "1"
  await page.check('input[name="1"][value="1"]')
  // Verify the radio button is checked
  expect(await page.isChecked('input[name="1"][value="1"]')).toBeTruthy()

  // Select the radio button with value "0"
  await page.check('input[name="1"][value="0"]')
  // Verify the radio button is checked
  expect(await page.isChecked('input[name="1"][value="0"]')).toBeTruthy()
})

// test('Sum scores from the table', async ({ page }) => {
//   // Navigate to the page containing the table
//   await page.goto(' http://localhost:4321/GiftFromGod')

//   const questionIndices = [1, 26, 51, 76, 101]

//   for (const index of questionIndices) {
//     const selector = `input[name="${index}"][value="0"]`;
//     console.log(`Checking selector: ${selector}`);

//     // Wait for the element to be present
//     await page.waitForSelector(selector, { timeout: 10000 });

//     // Check the input
//     await page.check(selector);

//     // Verify the radio button is checked
//     const isChecked = await page.isChecked(selector);
//     console.log(`Input checked state for ${selector}: ${isChecked}`);
//     expect(isChecked).toBeTruthy();
//   }
//   await page.click('#submit')

//   const sums = await page.$$eval('table tr td:first-child', tds =>
//     tds.map(td => td?.textContent?.trim())
//   );

//   expect(sums[0]).toBe(String(0));
// })

const getSum = async (page: Page, index: number) => {
  const sums = await page.$$eval('table tr td:first-child', tds =>
    tds.map(td => td?.textContent?.trim())
  )
  console.log("sums",sums)
  return sums[index]
}

test('sum เผยพระวจนะ', async ({ page }) => {
  await page.goto(' http://localhost:4321/GiftFromGod')

  const list = spiritualGifts["เผยพระวจนะ"].list
  console.log("list",list)
  const checkedValue = [0, 1, 2, 3, 0]
  const expectedSum = checkedValue.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )
  for (const [i, index] of list.entries()) {
    const selector = `input[name="${index}"][value="${checkedValue[i]}"]`;
    console.log(`Checking selector: ${selector}`);
    await page.waitForSelector(selector, { timeout: 30000 });
    await page.check(selector);
  }

  await page.click('#submit')
  
  const sum = await getSum(page, 0)
  console.log("sum",sum)
  expect(sum).toBe(String(expectedSum))
})
