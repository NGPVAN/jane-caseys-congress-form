jane-caseys-congress-form
=========================

A set of fake pages to contact our beloved Jane Casey.
The email textfield must be on each yaml and view.


Setup
-----

1. Run ```npm start```

Forms Available
---------------

* One Step
* Two step 
* ReCaptcha 


| Address          | BioID   | Chamber   | Form Type  | Key Value |
| ---------------- | ------- | --------- | ---------- | --------- |
| 3201 Landover St.<br>Apt. 621<br>Alexandria, VA 22305 | K000384 | US Senate | One Step | firstname |
| 3201 Landover St.<br>Apt. 621<br>Alexandria, VA 22305 | W000805 | US Senate | One Step | lastname |
| 3201 Landover St.<br>Apt. 621<br>Alexandria, VA 22305 | B001292 | US House | Two Step | email |
| 264 Clovis Avenue<br>Suite 206<br>Clovis, CA 93612 | N000181 | US House | ReCaptcha | recaptcharesponse |
| 4721 Rosedale Ave.<br>Apt. 504<br>Bethesda, MD 20814 | V000128 | US House| Topic | topic |
| 4721 Rosedale Ave.<br>Apt. 504<br>Bethesda, MD 20814 | C000141 | US Senate | One Step | lastname |
| 4721 Rosedale Ave.<br>Apt. 504<br>Bethesda, MD 20814 | M000702 | US Senate | One Step, inferred fields | phone_number_parentheses; phone_no_area_code |
| 1 Estate Cane<br>St. Croix, VI 00840 | P000610 | US House | One Step | lastname |
| PO Box 7248<br>Pago Pago, AS 96799 | R000600 | US House | One Step | lastname |
| 35 H Road-Route 109<br>Acton, MA 04001 | C001035 | US Senate | Missing Other Bioids| lastname |
| 836 NE 58th St<br />Seattle, WA 98105 | C000127 | US Senate | Topic one step | firstname |
| 836 NE 58th St<br />Seattle, WA 98105 | M000404 | US House | Topic one step | firstname |
| 836 NE 58th St<br />Seattle, WA 98105 | M001111 | US Senate | Topic one step | firstname |
| 205 E 5th St<br />Moscow, ID 83843 | L000573 | US House | Form does not submit | N/A |
| 205 E 5th St<br />Moscow, ID 83843 | R000584 | US Senate | Form does not submit | N/A |
| 205 E 5th St<br />Moscow, ID 83843 | C000880 | US Senate | Form does not submit | N/A |
| 1115 Kennesaw Ridge Rd<br />Columbia, MO 65202 | H001053 | US House | Additional Org Fields | orgname |
| 401 Texas Ave S<br />College Station, TX 77840 | F000461 | US House | Form does not submit, should work in production | N/A |
| 401 Texas Ave S<br />College Station, TX 77840 | C001056 | US Senate | Form does not submit, should work in production | N/A |
| 401 Texas Ave S<br />College Station, TX 77840 | C001098 | US Senate | Form does not submit, should work in production | N/A |
| 4721 Rosedale Ave.<br>Apt. 504<br>Bethesda, MD 20814 | state_md_gov_larry_hogan | Governor | One Step | N/A |
| 3003 32nd Avenue South<br />Fargo, ND 58103 | C001096 | US House | Temp Change | N/A |
| 3003 32nd Avenue South<br />Fargo, ND 58103 | H001069 | US Senator | ReCAPTCHA | N/A |
| 3003 32nd Avenue South<br />Fargo, ND 58103 | H001061 | US Senator | ReCAPTCHA | N/A |
| 811 Saint Michaels Drive<br />Santa Fe, NM 87505 | SWe00196 | Governor | iframe | firstname |
| 5727 South Lewis Avenue<br />Tulsa, OK 74105 | state_ok_gov_mary_fallin | Governor | non-image CAPTCHA | N/A |
| 501 Sycamore St.<br />Waterloo, IA 50703 | E000295 | US Senator | Freshmen Member | N/A |
| 501 Sycamore St.<br />Waterloo, IA 50703 | B001294 | US House | Freshmen Member | N/A |
| 30 Schuyler Place<br />Morristown, NJ 07960 | SWe00194 | Governor | Subtopic | N/A |
| 8021 W Florissant Ave<br />Jennings, MO 63136 | B000575 | US Senator | 2,000 character limit for message | N/A |
| 650 Dundee Rd<br />Northbrook, IL 60062 | D000613 | US House | 2,000 character limit for message | message |
| 222 Liberty St.<br />Lowell, MA 01851 | MAL000362 | MA Lower | One Step | firstname |
| PO Box 991<br />Union, KY 41091 | KYL000025 | KY Senator | Anti-spam Hot or Cold Q&A | N/A |
| 898 Malabar Rd SE<br />Palm Bay, FL 32907 | FLL000002 | FL Senator | Anti-spam Math Q&A | N/A | 
| 2500 Harrisburg Pike Lot 17<br />Grove City, OH 43123 | OHL000003 | OH Senator | Sanitized Address | streetaddress2 |  
 
