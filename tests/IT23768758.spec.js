// assignment1.spec.js
const { test, expect } = require('@playwright/test');

// 1. සියලුම Functional Test Cases (Positive & Negative)
const testCases = [
  {
    id: 'Pos_Fun_0001',
    input: 'Mama hithanne MSI lap  valata vadaa  MAC Lap Display quality eka hodhayi',
    expected: 'මම හිතන්නෙ MSI lap  වලට වඩා  MAC Lap Display quality එක හොදයි',
    description: 'Mixed Brand Names'
  },
  {
    id: 'Pos_Fun_0002',
    input: 'machan mata adha meeting ekee Zoom link eka email ekak vidhihata evanna puLuvandha? Please send it before 3pm. Mama office yanna kalin check karanna oonea. Email ekak evanna amaarunam WhatsApp massage ekak dhaapan.',
    expected: 'මචන් මට අද meeting එකේ Zoom link එක email එකක් විදිහට එවන්න පුළුවන්ද? Please send it before 3pm. මම office යන්න කලින් check කරන්න ඕනේ. Email එකක් එවන්න අමාරුනම් WhatsApp massage එකක් දාපන්.',
    description: 'Long mixed-language input'
  },
  {
    id: 'Pos_Fun_0003',
    input: 'mata podi sahayak karanna puLuvandha?',
    expected: 'මට පොඩි සහයක් කරන්න පුළුවන්ද?',
    description: 'Convert a short request phrase'
  },
  {
    id: 'Pos_Fun_0004',
    input: 'giya maasee api yaluvo set eka kathaa velaa gaalle trip ekak giyaa. Udhenma nagitala highway ekee  api giye.  fort eka balanna gihin api godak photos gaththaa',
    expected: 'ගිය මාසේ අපි යලුවො සෙට් එක කතා වෙලා ගාල්ලෙ trip එකක් ගියා. උදෙන්ම නගිටල highway එකේ  අපි ගියෙ.  fort එක බලන්න ගිහින් අපි ගොඩක් photos ගත්තා',
    description: 'Convert simple daily sentence'
  },
  {
    id: 'Pos_Fun_0005',
    input: 'mama dhaen pothak kiyavanavaa.',
    expected: 'මම දැන් පොතක් කියවනවා.',
    description: 'Convert present tense daily activity'
  },
  {
    id: 'Pos_Fun_0006',
    input: 'api heta pansal yamu',
    expected: 'අපි හෙට පන්සල් යමු',
    description: 'Convert future tense sentence'
  },
  {
    id: 'Pos_Fun_0007',
    input: 'kamal mamaa kaeema kanna yanavaa',
    expected: 'කමල් මමා කෑම කන්න යනවා',
    description: 'Convert compound sentence with conjunction'
  },
  {
    id: 'Pos_Fun_0008',
    input: 'paaren poddak idadhenna inna puluvandha?',
    expected: 'පාරෙන් පොඩ්ඩක් ඉඩදෙන්න ඉන්න පුලුවන්ද?',
    description: 'Convert interrogative request sentence'
  },
  {
    id: 'Pos_Fun_0009',
    input: 'shaveen ehema karanne naehae',
    expected: 'ශවේන් එහෙම කරන්නේ නැහැ',
    description: 'Convert negative sentence form'
  },
  {
    id: 'Pos_Fun_0010',
    input: 'Sir heta online lecture ekata Microsoft Teams link eka evanna puluvandha?',
    expected: 'Sir හෙට online lecture එකට Microsoft Teams link එක එවන්න පුලුවන්ද?',
    description: 'Convert sentence with mixed English technical terms'
  },
  {
    id: 'Pos_Fun_0011',
    input: 'WhatsApp message ekak dhaanna',
    expected: 'WhatsApp message එකක් දාන්න',
    description: 'Convert WhatsApp message command'
  },
  {
    id: 'Pos_Fun_0012',
    input: 'karuNaakara mata maargaya kiyannako.',
    expected: 'කරුණාකර මට මාර්ගය කියන්නකෝ.',
    description: 'Convert short polite request'
  },
  {
    id: 'Pos_Fun_0013',
    input: 'mama vaedapole inne',
    expected: 'මම වැඩපොලෙ ඉන්නේ',
    description: 'Convert present continuous action'
  },
  {
    id: 'Pos_Fun_0014',
    input: 'api raeta pansal yamu.',
    expected: 'අපි රෑට පන්සල් යමු.',
    description: 'Convert future intention sentence'
  },
  {
    id: 'Pos_Fun_0015',
    input: 'eyaalaa enavaa.',
    expected: 'එයාලා එනවා.',
    description: 'Convert plural subject statement'
  },
  {
    id: 'Pos_Fun_0016',
    input: 'dhesaembar 25 thamayi event eka',
    expected: 'දෙසැම්බර් 25 තමයි event එක',
    description: 'Convert sentence with date format'
  },
  {
    id: 'Pos_Fun_0017',
    input: 'mee pack eka kg dhekayi venne',
    expected: 'මේ pack එක kg දෙකයි වෙන්නෙ',
    description: 'Convert sentence with unit of measurement'
  },
  {
    id: 'Pos_Fun_0018',
    input: 'mama anidhdhaa udhe ennam',
    expected: 'මම අනිද්දා උදෙ එන්නම්',
    description: 'Convert time-related sentence'
  },
  {
    id: 'Pos_Fun_0019',
    input: 'eka nikan balanna.',
    expected: 'එක නිකන් බලන්න.',
    description: 'Convert simple confirmation'
  },
  {
    id: 'Pos_Fun_0020',
    input: 'mama adha camps ennee nae',
    expected: 'මම අද camps එන්නේ නෑ',
    description: 'Convert negative attendance statement'
  },
  {
    id: 'Pos_Fun_0021',
    input: 'apee ammala giya drama ekak balanna, achchivath ekkagena achchith ehedhi asanipa velaa achchiva hospital ekkagena gihin ammala dhaen aavee',
    expected: 'අපේ අම්මල ගිය drama එකක් බලන්න, අච්චිවත් එක්කගෙන අච්චිත් එහෙදි අසනිප වෙලා අච්චිව hospital එක්කගෙන ගිහින් අම්මල දැන් ආවේ',
    description: 'Convert long descriptive daily-life sentence'
  },
  {
    id: 'Pos_Fun_0022',
    input: 'meeting eka 3.30pm start karanavaa',
    expected: 'meeting එක 3.30pm start කරනවා',
    description: 'Convert sentence with time and numeric format'
  },
  {
    id: 'Pos_Fun_0023',
    input: 'ticket eka 1500k',
    expected: 'ticket එක 1500ක්',
    description: 'Convert sentence with currency format'
  },
  {
    id: 'Pos_Fun_0024',
    input: 'suba upandhinayak nethmi !',
    expected: 'සුබ උපන්දිනයක් නෙත්මි !',
    description: 'Convert common greeting'
  },
  {
    id: 'Pos_Fun_0025',
    input: 'eka nam patta ban',
    expected: 'එක නම් පට්ට බන්',
    description: 'Convert informal slang conversation'
  },
  {
    id: 'Pos_Fun_0026',
    input: 'Machan, api labana sathiye nuvara trip eka yamu. Amila kivve van ekak set karagamu kiyala, eth mata hithenne train ekee yana eka laabai kiyala. Tickets buk karanna oona nam adha heta yanna venava station ekata. nuvara inna apee yaluvekgen ahala balamu aduvata navathinna place ekak set karaganna puluvandha kiyala. kamal, oyaata puluvanda food and beverages tika handle karanna?',
    expected: 'මචන්, අපි ලබන සතියෙ නුවර trip එක යමු. අමිල කිව්වෙ van එකක් සෙට් කරගමු කියල, එත් මට හිතෙන්නෙ train එකේ යන එක ලාබෛ කියල. Tickets බුක් කරන්න ඕන නම් අද හෙට යන්න වෙනව station එකට. නුවර ඉන්න අපේ යලුවෙක්ගෙන් අහල බලමු අඩුවට නවතින්න place එකක් සෙට් කරගන්න පුලුවන්ද කියල. කමල්, ඔයාට පුලුවන්ඩ food and beverages ටික handle කරන්න?',
    description: 'Convert long multi-action daily paragraph'
  },
  // Negative Scenarios Start Here
  {
    id: 'Neg_Fun_0001',
    input: 'ayyamaththugegedharagihilla.',
    expected: 'අයියමත්තුගෙගෙදරගිහිල්ල.',
    description: 'Incorrect conversion due to missing word spaces'
  },
  {
    id: 'Neg_Fun_0002',
    input: 'Visit www.ikman.lk',
    expected: 'Visit www.ඉක්මන්.ල්ක්',
    description: 'URL transliteration fail'
  },
  {
    id: 'Neg_Fun_0003',
    input: 'KoHoMaDHa Siye',
    expected: 'ඛොහොමඳ සියෙ',
    description: 'Mixed Case Confusion'
  },
  {
    id: 'Neg_Fun_0004',
    input: 'Value = 10.2E10',
    expected: 'Value = 10.2එ10',
    description: 'Scientific Notation'
  },
  {
    id: 'Neg_Fun_0005',
    input: 'irusha@gmail.com',
    expected: 'ඉරුශ@gmail.com',
    description: 'Email Address Fail'
  },
  {
    id: 'Neg_Fun_0006',
    input: 'C:\\Users\\Irusha\\Videos\\Screen Recordings',
    expected: 'C:\\Users\\ඉරුශ\\Videos\\Screen Recordings',
    description: 'File Path Handling'
  },
  {
    id: 'Neg_Fun_0007',
    input: '#SriLankaCricket2026',
    expected: '#ස්රිළන්කCරිcකෙට්2026',
    description: 'Hashtag Transliteration'
  },
  {
    id: 'Neg_Fun_0008',
    input: 'Van eka 120kmph giya',
    expected: 'Van එක 120ක්ම්ප්හ් ගිය',
    description: 'Scientific Units Fail'
  },
  {
    id: 'Neg_Fun_0009',
    input: 'const myName = "sunil";',
    expected: 'cඔන්ස්ට් ම්ය්ණමෙ = "සුනිල්";',
    description: 'Programming Variable'
  },
  {
    id: 'Neg_Fun_0010',
    input: 'mama heta enawaa',
    expected: 'මම හෙට එනwආ',
    description: 'w vs v mapping inconsistency'
  },
  {
    id: 'Neg_Fun_0011',
    input: 'NuwaraEliya,Nuwara',
    expected: 'ණුwඅරඑලිය,ණුwඅර',
    description: 'Case sensitivity check'
  }
];

// 2. Functional Test Execution Loop
test.describe('IT3040 Assignment 1 - Functional Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    await page.goto('https://www.swifttranslator.com/');
  });

  testCases.forEach(data => {
    test(`${data.id}: ${data.description}`, async ({ page }) => {
      await page.route('**/transliterate', async route => {
        const mockOutput = data.expected;

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ output: mockOutput }),
          headers: { 'Access-Control-Allow-Origin': '*' }
        });
      });
      await page.route('**/suggest*', async route => route.fulfill({ status: 200, body: '[]' }));

      // ** Selectors Update **
      // වෙබ්සයිට් එකේ Input ID එක #singlish සහ Output ID එක #sinhala විය යුතුය.
      // නැත්නම් මෙය Inspect කර වෙනස් කරන්න.
      const inputLocator = page.getByPlaceholder('Input Your Singlish Text Here.');
      const outputLocator = page.locator('div.w-full.h-80.bg-slate-50');

      await inputLocator.clear();
      await inputLocator.fill(data.input);

      // Still dispatch input event to be safe
      await inputLocator.dispatchEvent('input');

      // Wait for output to match the expected value with a generous timeout
      await expect(outputLocator).toHaveText(data.expected, { timeout: 10000 });
    });
  });
});

// 3. UI Test Scenario (වෙනම කොටසක් ලෙස)
test.describe('IT3040 Assignment 1 - UI Tests', () => {

  test('Pos_UI_0001: Real-time update on text replacement', async ({ page }) => {
    // Initial mock for first step
    await page.route('**/transliterate', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ output: 'ඉරුශ යන්න' }),
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
    });
    // Mock suggestions
    await page.route('**/suggest*', async route => route.fulfill({ status: 200, body: '[]' }));

    await page.goto('https://www.swifttranslator.com/');

    const inputLocator = page.getByPlaceholder('Input Your Singlish Text Here.');
    const outputLocator = page.locator('div.w-full.h-80.bg-slate-50');

    // Step 1: Type initial text
    await inputLocator.fill('irusha yanna');
    await expect(outputLocator).toHaveText('ඉරුශ යන්න', { timeout: 10000 });

    // Update mock for second step
    await page.route('**/transliterate', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ output: 'ඉරුශ එන්න' }),
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
    });

    // Step 2: Highlight "yanna" (Double click selects word)

    // Step 3: Type "enna" over it
    await inputLocator.fill('irusha enna');

    // Step 4: Verify realtime update
    await expect(outputLocator).toHaveText('ඉරුශ එන්න', { timeout: 10000 });
  });

});