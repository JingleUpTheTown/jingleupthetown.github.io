# Jingle Up the Town — GitHub Pages website V5

Website: **https://jingleupthetown.github.io/** (will work after GitHub Pages is enabled).
Business email: **JingleUpTheTown@gmail.com**.

## Upload files (no coding needed)

1. Log in to the GitHub account `JingleUpTheTown`.
2. Create a **public** repository named **`jingleupthetown.github.io`** (case-insensitive account, use lower-case repo name).
3. Choose **Add file → Upload files** and drag the **contents of this folder** (not the ZIP itself) into the upload page. Keep the `assets` folder and its two images. Commit changes.
4. Go to **Settings → Pages → Build and deployment → Deploy from a branch**, choose `main`, `/ (root)`, and Save.
5. Visit https://jingleupthetown.github.io/ after deployment.

The website uses `index.html`, `styles.css`, `script.js`, and two image files inside `assets/`. Upload all of them, keeping the paths.

## Booking behavior — important

The date picker is a **preferred-date request**, not a live availability calendar. It does not block dates or confirm reservations.

**Right now:** when a visitor submits the form, their email app opens with a prepared email to JingleUpTheTown@gmail.com. They must press **Send** in their email app. If they have no email app configured, they should use the Email us button. This is not automatic form delivery.

**To enable real online form submission and email alerts:**

1. Create a free Formspree account and form at https://formspree.io/ and set the notification inbox to JingleUpTheTown@gmail.com.
2. Verify the inbox as required by Formspree.
3. Edit `script.js` in GitHub and replace `const FORMSPREE_ENDPOINT = "";` with your public endpoint, e.g. `const FORMSPREE_ENDPOINT = "https://formspree.io/f/yourFormId";` (use your *real* endpoint).
4. Commit the change, then submit a test request from the live site and verify it reaches Gmail.
5. Turn on Gmail push notifications on your phone. This provides alerts without paid SMS.

**SMS is not configured.** Real SMS requires a separate provider/automation, which can cost money. Never put API keys or Twilio secrets in GitHub.

## Optional phone and Instagram

`script.js`: enter a business phone number in `BUSINESS_PHONE` when ready. Call/text buttons remain hidden until then. Add an Instagram link only once the account is created.

## Branding

The logo is `assets/jingle-logo.webp` and the three-decorator shirt mockup artwork is `assets/crew-shirt-artwork.webp`. This is cropped from the chosen shirt mockup rather than a standalone source illustration.

## Launch checks

- Test on a phone; confirm images load.
- Test email contact and date request (or Formspree if connected).
- Do not print QR codes until the live website address is verified.
- No roof work or electrical repairs are offered.
- Customers supply their decorations.
