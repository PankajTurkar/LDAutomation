import {test, expect} from '@playwright/test'

test.skip('12. Extracting the text from browser and inserting valid expect assertions in test', async ({browser})=>{

    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/') 
    console.log("Page title is - ", await page.title())
    await page.locator('#username').fill('rahulshettyacadem')
    await page.locator('#password').fill('learning')
    await page.locator('#signInBtn').click()
    //Validating error message which appears for 2 sec for wrong username

    const validationErrorMsg = await page.locator("[style*='block']").textContent()
    console.log("Validation message for wrong user/pwds - ",validationErrorMsg);

    //validating error message text
    // toContainText() - this method works on partial text
    await expect(page.locator("[style*='block']")).toContainText('Incorrect') 
    
})

test.skip('13. How to work with locators which extract multiple webelements in page', async ({browser})=>{

    const context = await browser.newContext()
    const page = await context.newPage()

    //Storing locators in variable for better redability
    const username = page.locator('#username')
    const password = page.locator('#password')
    const signIn = page.locator('#signInBtn')
    const cardTitles = page.locator(".card-title a")

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/') 
    console.log("Page title is - ", await page.title())
    await username.fill('rahulshettyacademy')
    await password.fill('learning')
    await signIn.click()

    //Get the first element of an array
   // const items = await page.locator(".card-title a").nth(1).textContent() // Samsung Note 8
    //or
    //const items1=await page.locator(".card-title a").first().textContent() //return first element iphone X
    const items2=await page.locator(".card-title a").last().textContent() // retun last element

    const items = await cardTitles.nth(1).textContent() // Samsung Note 8
    //or
    const items1=await cardTitles.first().textContent() //return first element iphone X
    console.log(items);
    console.log(items1);
    console.log(items2);
    
    //grap all the text of all product

    const allItems = await cardTitles.allTextContents()
    console.log("All text of items are - ", allItems); // [ 'iphone X', 'Samsung Note 8', 'Nokia Edge', 'Blackberry' ]
    
})



test.skip('Google Open', async ({page})=>{
    await page.goto('https://google.com') 
    await expect(page).toHaveTitle('Google')


})

test.skip('UI Controls static dropdown, Radio button & Checkbox', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/') 

    const username = page.locator('#username')
    const password = page.locator('#password')
    const dropdown = page.locator("select.form-control")
    const blinkingLink = page.locator("[href*='documents-request']")

    await username.fill('rahulshettyacademy')
    await password.fill('learning')

    
    await page.locator(".radiotextsty").last().click()

    //once clcik om user option web base opoup will opened up and can be handle by locator. for java based pop use on method
    await page.locator("#okayBtn").click()

    
    //assetion used to check user readio button is selected or not using toBeChecked()
    await expect(page.locator(".radiotextsty").last()).toBeChecked()
    //or
    //await expect(page.locator(".radiotextsty").last()).isChecked().toBeTruthy()
    //dropdown handle
    await dropdown.selectOption('consult')
    //checkbox validation
    await page.locator("#terms").click()
    await expect(page.locator("#terms")).toBeChecked()
    //await expect("#terms").uncheck()
    //if button is unchecked then we can check with assertion .ischecked().toBeFalsy()
   // await expect(page.locator("#terms")).isChecked().toBeFalsy()

   // await page.pause()
    const signIn = page.locator('#signInBtn')

    ///validate link is blinking or not

    await expect(blinkingLink).toHaveAttribute("class","blinkingText")


})

test.skip("Child window handle", async({browser})=>{

    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const blinkingLink = page.locator("[href*='documents-request']")
    
    //Here we need to inform to playwright that link will open in another tab/window context

    //context.waitForEvent(page) //this method check whether any new page is getting opened and store it in another variable
    //this will retun a promise Pending, fulfill, rejected for the status of operation
    // and we have exectute both lines parallally. In this case we use Promise.all() method and pass the methods as an array (both method retuns promises here)
    //blinkingLink.click()
    //IF we have the  scenario where asyncronus two or more steps go paralally, here we can use bellow apporch

    const [newPage]= await Promise.all(
    [
     context.waitForEvent(page),
     blinkingLink.click() 
    ])
    const text = await newPage.locator(".red").first().textContent()
    console.log(text);

    //capturing email address and puting into the login page under username field
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").textContent());
    

})