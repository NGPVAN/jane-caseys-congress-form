jane-caseys-congress-form
=========================

A set of fake pages to contact our beloved Jane Casey.
The email textfield must be on each yaml and view.


Setup
-----

1. Run `npm install`
2. Install [PostgreSQL](http://www.postgresql.org/download/). (Using [Homebrew](http://brew.sh/): `brew install postgres`)
3. Start PostgreSQL
  - If on Mac, run `postgres -D /usr/local/var/postgres`
  - If on Windows, navigate to installation (by default: `C:\Program Files\PostgreSQL\{version}`) then goto the `\scripts` directory and run `runpsql.bat`. Hit enter 4 times to use default startup values.
5. Setup Environment Variables
  - `POSTGRES_USERNAME`: If on Windows, will need to set this to `postgres`
  - `POSTGRES_PASSWORD`: If on Windows, will need to set this to whatever you set in the Installer
  - `RECAPTCHA_PUBLIC_KEY` & `RECAPTCHA_PRIVATE_KEY`: For ReCaptcha V1
  - `RECAPTCHA_V2_PUBLIC_KEY` & `RECAPTCHA_V2_PRIVATE_KEY`: For ReCaptcha V2
6. To run app, run `npm start` or `node app.js`

Misc Test Endpoints
-------------------

### GET/POST `/test`, `/test/:status`
Returns simple content with the specified status code and delay.

**Query Strings**
- `delay`: 0 to 300, in seconds
- `msg`: Content to display on the page in the "Message" location

### GET `/testyaml/:yamlId`, `/testyaml/:status/:yamlId`, `/testYaml/:status/:delay/:yamlId`
Returns the YAML content with specified status code and delay. 
If yaml doesn't exist, will respond with `Not Found` content.


Notes on Adding Forms
---------------------

1. Views' `form` tag should have the following attributes:
  - `method` attribute should be `POST`
  - `action` attribute should be `/forms/submitFormData` (for most cases)
    - You can optionally include `?key={field}` at the end of the `action`, where `{field}` would be the `name` attribute value for a input within the form. Doing this will setup the key value for the post data to be associated with value of that field.
2. Views should extend `layout` and put their content within `block content`
3. Views should be in the `/views/forms` directory
4. When adding radio button groups to a form, be sure that the `name` attribute matches for all of them. If it is required, only the first radio button option should have the `required` attribute
5. When adding dropdown `select` elements that are `required` and have a default invalid option, be sure that default option has the `value` set to `''` so HTML5 validation will consider it invalid

### Example usage of `?key={field}`
#### Example 1: Using default `email` key
```jade
extends layout

block content

  form(method='POST', action='/forms/submitFormData', role="form")
    .row
      input(type='text', id='e', name='email', class='form-control', placeholder='Email', required)
      input(type='text', id='p', name='phonenumber', class='form-control', placeholder='Enter Phone')
      input(type='text', id='s', name='streetaddress', class='form-control', placeholder='Address', required)

      input(type='submit', id='submit', name='submit', value='Submit', class='btn btn-default')

```
If `?key=` is not present in the form's `action`, then the `email` field will be used for the post data's key value. The above jade will use the default, email as its key.

Suppose you filled out the above form with the following data:
- `email`: `fake@email.com`
- `phonenumber`: `1112223333`
- `streetaddress`: `1 main st`

To only see the post data from this post, you visit: `/forms/postData?key=fake@email.com`

#### Example 2: Using `phonenumber` (or anything else) key
```jade
extends layout

block content

  form(method='POST', action='/forms/submitFormData?key=phonenumber', role="form")
    .row
      input(type='text', id='e', name='email', class='form-control', placeholder='Email', required)
      input(type='text', id='p', name='phonenumber', class='form-control', placeholder='Enter Phone')
      input(type='text', id='s', name='streetaddress', class='form-control', placeholder='Address', required)

      input(type='submit', id='submit', name='submit', value='Submit', class='btn btn-default')

```
Note that the form's `action` ends with `?key=phonenumber`. This means the post data will use the value of the `phonenumber` input as the key for the post data.

Suppose you filled out the above form with the following data:
- `email`: `fake2@email.com`
- `phonenumber`: `1112220000`
- `streetaddress`: `2 main st`

To only see the post data from this post, you visit: `/forms/postData?key=1112220000`



Forms Available
---------------

* One Step
* Two step
* ReCaptcha


| Address          | BioID   | Chamber   | Form Type  | Key Value |
| ---------------- | ------- | --------- | ---------- | --------- |
| 3201 Landover St.<br>Apt. 621<br>Alexandria, VA 22305 | K000384<br/>Timothy Kaine | US Senate | One Step | firstname |
| 3201 Landover St.<br>Apt. 621<br>Alexandria, VA 22305 | W000805<br/>Mark Warner | US Senate | One Step | lastname |
| 3201 Landover St.<br>Apt. 621<br>Alexandria, VA 22305 | B001292<br/>Donald Beyer | US House | Two Step | email |
| 264 Clovis Avenue<br>Suite 206<br>Clovis, CA 93612 | N000181<br/>Devin Nunes | US House | ReCaptcha | recaptcharesponse |
| 4721 Rosedale Ave.<br>Apt. 504<br>Bethesda, MD 20814 | V000128<br/>Chris Van Hollen | US House| Topic | topic |
| 4721 Rosedale Ave.<br>Apt. 504<br>Bethesda, MD 20814 | C000141<br/>Benjamin Cardin | US Senate | One Step | lastname |
| 4721 Rosedale Ave.<br>Apt. 504<br>Bethesda, MD 20814 | M000702<br/>Barbara Mikulski | US Senate | One Step, inferred fields | phone_number_parentheses; phone_no_area_code |
| 1 Estate Cane<br>St. Croix, VI 00840 | P000610<br/>Stacey Plaskett | US House | One Step | lastname |
| PO Box 7248<br>Pago Pago, AS 96799 | R000600<br/>Aumua Amata | US House | One Step | lastname |
| 35 H Road-Route 109<br>Acton, ME 04001 | C001035<br/>Susan Collins | US Senate | Missing Other Bioids| lastname |
| 836 NE 58th St<br />Seattle, WA 98105 | C000127<br/>Maria Cantwell | US Senate | Topic one step | firstname |
| 836 NE 58th St<br />Seattle, WA 98105 | M000404<br/>Jim McDermott | US House | Topic one step | firstname |
| 836 NE 58th St<br />Seattle, WA 98105 | M001111<br/>Patty Murray | US Senate | Topic one step | firstname |
| 205 E 5th St<br />Moscow, ID 83843 | L000573<br/>Raúl Labrador | US House | Form does not submit | N/A |
| 205 E 5th St<br />Moscow, ID 83843 | R000584<br/>James Risch | US Senate | Form does not submit | N/A |
| 205 E 5th St<br />Moscow, ID 83843 | C000880<br/>Michael Crapo | US Senate | Form does not submit  | N/A |
| 1115 Kennesaw Ridge Rd<br />Columbia, MO 65202 | H001053<br/>Vicky Hartzler | US House | Additional Org Fields | orgname |
| 401 Texas Ave S<br />College Station, TX 77840 | F000461<br/>Bill Flores | US House | Form does not submit, should work in production | N/A |
| 401 Texas Ave S<br />College Station, TX 77840 | C001056<br/>John Cornyn | US Senate | Form does not submit, should work in production | N/A |
| 401 Texas Ave S<br />College Station, TX 77840 | C001098<br/>Ted Cruz | US Senate | Form does not submit, should work in production | N/A |
| 4721 Rosedale Ave.<br>Apt. 504<br>Bethesda, MD 20814 | state_md_gov_larry_hogan<br/>Larry Hogan | Governor | One Step | N/A |
| 3003 32nd Avenue South<br />Fargo, ND 58103 | C001096<br/>Kevin Cramer | US House | Temp Change | N/A |
| 3003 32nd Avenue South<br />Fargo, ND 58103 | H001069<br/>Heidi Heitkamp | US Senator | ReCAPTCHA | N/A |
| 3003 32nd Avenue South<br />Fargo, ND 58103 | H001061<br/>John Hoeven | US Senator | ReCAPTCHA | N/A |
| 5727 South Lewis Avenue<br />Tulsa, OK 74105 | state_ok_gov_mary_fallin<br/>Mary Fallin | Governor | non-image CAPTCHA | N/A |
| 501 Sycamore St.<br />Waterloo, IA 50703 | E000295<br/>Joni Ernst | US Senator | Freshmen Member | N/A |
| 501 Sycamore St.<br />Waterloo, IA 50703 | B001294<br/>Rod Blum | US House | Freshmen Member | N/A |
| 30 Schuyler Place<br />Morristown, NJ 07960 | state_nj_gov_chris_christie<br/>Chris Christie | Governor | Subtopic | N/A |
| 8021 W Florissant Ave<br />Jennings, MO 63136 | B000575<br/>Roy Blunt | US Senator | 2,000 character limit for message | N/A |
| 650 Dundee Rd<br />Northbrook, IL 60062 | D000613<br/>Bob Dold | US House | 2,000 character limit for message | message |
| 222 Liberty St.<br />Lowell, MA 01851 | MAL000362<br/>Rady Mom | MA Lower | One Step | firstname |
| PO Box 991<br />Union, KY 41091 | KYL000025<br/>John Schickel | KY Senator | Anti-spam Hot or Cold Q&A | N/A |
| 898 Malabar Rd SE<br />Palm Bay, FL 32907 | FLL000002<br/>Thad Altman | FL Senator | Anti-spam Math Q&A | N/A |
| 2500 Harrisburg Pike Lot 17<br />Grove City, OH 43123 | OHL000003<br/>Kevin Bacon | OH Senator | Sanitized Address | streetaddress2 |   
| 1011 George Wallace Blvd<br/>Tuscumbia, AL 35674 | A000055<br/>Robert Aderholt | US House | One Step | N/A |
| 1011 George Wallace Blvd<br/>Tuscumbia, AL 35674 | S001141<br/>Jefferson Sessions  | US Senate | ReCaptchaV2 | N/A |
| 1011 George Wallace Blvd<br/>Tuscumbia, AL 35674 | S000320<br/>Richard Shelby | US Senate | ReCaptchaV2 | N/A |
| 3300 S. Parker Road<br/>Aurora, CO 80014 | B001267<br/>Michael Bennet | US Senate | One Step | N/A |
| 3201 Landover Rd<br/>Alexandria, VA 22305 | B001292<br/>Donald Beyer | US House | Two Step | N/A |
| 501 Sycamore Street<br/>Waterloo, IA 50703 | B001294<br/>Rod Blum | US House | One Step | N/A |
| 6 State Street<br/>Bangor, ME 04401 | C001035<br/>Susan Collins | US Senate | One Step | N/A |
| 77 Hazard Avenue<br/>Enfield, CT 06082 | C001069<br/>Joe Courtney | US House | One Step | N/A |
| 110 2nd Street South<br/>Waite Park, MN 56387 | F000457<br/>Al Franken | US Senate | One Step | N/A |
| 3300 S. Parker Road<br/>Aurora, CO 80014 | G000562<br/>Cory Gardner | US Senate | One Step | N/A |
| 1800 Thibodo Rd<br/>Vista, CA 92081 | I000056<br/>Darrell Issa | US House | One Step | N/A |
| 3920 Peppertree Dr<br/>Lexington, KY 40513 | P000603<br/>Rand Paul | US Senate | ReCaptchaV2 | N/A |
| 4350 Executive Dr<br/>San Diego, CA 92121 | P000608<br/>Scott Peters | US House | One Step | N/A |
| 8151 W Lawrence Ave<br/>Norridge, IL 60706 | ILL000131<br/>Michael McAuliffe | IL House | One Step | N/A |
| 2234 County Road 140<br/>International Falls, MN 56649 | MNL000002<br/>Thomas Bakk | MN Senate | One Step | N/A |
| 341 110th Ln NW<br/>Minneapolis, MN 55448 | MNL000165<br/>Jerry Newton | MN House | One Step | N/A |
| 18 Liberty Rd<br/>Bernardsville, NJ 07924 | NJL000174<br/>Anthony Bucco | NJ Senate | ReCaptchaV2 | N/A |
| 351 Clearview Dr<br/>Sparta, TN 38583 | TNL000002<br/>Mae Beavers | TN Senate | One Step | N/A |
| 12321 Hickory Grove Rd<br/>Maribel, WI 54227 | WIL000461<br/>André Jacque | WI House | One Step | address_full<br/>address_city_state_zip |
| 1 Lincoln Financial Field Way<br/>Philadelphia, PA 19147 | state_pa_gov_tom_wolf<br/>Tom Wolf | Governor | ReCaptchaV2 | N/A |
| 811 Saint Michaels Drive<br/>Santa Fe, NM 87505 | state_nm_gov_susana_martinez<br/>Susana Martinez | Governor | One Step | N/A |
| 125 South 4th Street<br/>Norfolk, NE 68701 | state_ne_gov_pete_ricketts<br/>Pete Ricketts | Governor | ReCaptchaV2 | N/A |
| 3920 Peppertree Dr<br/>Lexington, KY 40513 | state_ky_gov_matt_bevin<br/>Matt Bevin | Governor | One Step | N/A |
| 16064 31st Ave PO Box 3305<br/> Clearlake, CA 95422 | B000711<br/>Barbara Boxer | US Senate | VAN Address Service | streetaddress2 |
| 1115 Kennesaw Ridge Rd Apt 411<br />Columbia, MO 65202 | state_mo_gov_jay_nixon<br/>Jay Nixon | Governor | One Step, All Non-CAPTCHA Fields | N/A |
| 4721 Rosedale Ave<br />Bethesda, MD 20814 | MDL000400<br/>Ariana Kelly | MD State Delegate | CAPTCHA and Phone | N/A |
| 729 Northeast Oregon Street<br/>Portland, OR 97232 | M001176<br/>Jeff Merkley | US Senate | Bad CAPTCHA and Phone | N/A |
| 729 Northeast Oregon Street<br/>Portland, OR 97232 | B000574<br/>Earl Blumenauer | US House | CAPTCHA and Phone | N/A |
| 729 Northeast Oregon Street<br/>Portland, OR 97232 | W000779<br/>Ron Wyden | US Senate | One Step | N/A |
| 1015 Koko Kai Pl<br/>Honolulu, HI 96825-3603 | state_hi_gov_david_ige<br/>David Ige | HI Governor | Non-inferred field | N/A |
| w14153 Crestview Dr<br/>Prairie Du Sac, WI 53578-9559 | B001230<br/>Tammy Baldwin | WI Senator | StreetNoHalf | N/A |
| 34 1/2 Beacon St Unit 2S<br/>Boston, MA 02108-1414 | W000817<br/>Elizabeth Warren | MA Senator | StreetNoHalf | N/A |
| 98661 | state_wa_gov_jay_inslee<br/>Jay Inslee | WA Governor | No Street Address Line 1 | N/A |
| TODO | PAL000059<br/>TODO: Change to Target that exists | PA House | ReCaptchaV2 | N/A |
| 190 Brookline St<br/>Cambridge, MA 02139 | C001037<br/>Michael Capuano | MA US House | N/A | N/A |
| 210 Pearl St<br/>Burlington, VT 05401 | S000033<br/>Bernard Sanders | VT US Senate | N/A | N/A |
| 210 Pearl St<br/>Burlington, VT 05401 | L000174<br/>Patrick Leahy | VT US Senate | N/A | N/A |
