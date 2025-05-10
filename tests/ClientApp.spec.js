import {test, expect} from '@playwright/test'

console.log ("15. Techniques to wait dynamically for new page in Service based applications")

test('wait dynamically for new page', async({page})=>{

await page.goto('https://rahulshettyacademy.com/client/')
await page.locator('#userEmail').fill('samgo@yopmail.com')
await page.locator('#userPassword').fill('Test@123')
await page.locator('#login').click()

//extracting all the product name from the page using method allTextContent() - it will return the aaray and does not wait 
//to locad the api for this before we have implement wait to load the page properly
//await page.waitForLoadState('networkidle') // Wait until all network activity stops 
//or
await page.locator(".card-body b").first().waitFor() //wait for method work with single element hence we used first() or last() method
const allProducts = await page.locator(".card-body b").allTextContents()
console.log(allProducts); //[ 'ZARA COAT 3', 'ADIDAS ORIGINAL', 'IPHONE 13 PRO' ]


})