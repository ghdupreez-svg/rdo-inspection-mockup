# Public App Store Release Guide

This guide explains how to take the RDO Property Inspection app from mockup to public app store availability for iPhone, iPad, and Android.

The current HTML mockup is not itself ready for app store submission. A store-ready release needs to be built as a signed mobile app, most likely with Expo / React Native, using Microsoft sign-in, local draft storage, camera/photo capture, PDF generation, and Microsoft Graph upload.

## 1. Decide The Public Product Positioning

If the app is published for anyone to download, position it as a configurable hotel/property inspection platform, not as a single-company internal tool.

Recommended public positioning:

```text
Property inspection and action-plan app for hotel management teams.
```

The public version should support:

- Microsoft work-account sign-in.
- Company-specific property lists.
- Editable report sections and questions.
- Configurable SharePoint save locations.
- A demo mode or reviewer login for Apple and Google.

## 2. Create Developer Accounts

### Apple

Create an Apple Developer Program account.

Typical cost:

```text
$99/year
```

Use this for:

- App Store Connect access.
- App signing certificates.
- TestFlight testing.
- Public App Store submission.

Apple references:

- https://developer.apple.com/app-store/submitting/
- https://developer.apple.com/help/app-store-connect/get-started/app-store-connect-workflow

### Google

Create a Google Play Console developer account.

Typical cost:

```text
$25 one-time registration fee
```

Use this for:

- Android app signing.
- Internal/closed/open testing.
- Public Google Play production release.

Google references:

- https://support.google.com/googleplay/android-developer/answer/9859751
- https://support.google.com/googleplay/android-developer/answer/9845334

## 3. Build The Production App

Recommended stack from the project spec:

```text
Expo / React Native
Microsoft MSAL authentication
Microsoft Graph API
SQLite local drafts
Device camera/photo picker
PDF generation
SharePoint upload queue
```

Production features needed before store submission:

- Real Microsoft 365 sign-in.
- Tenant restriction or configurable tenant onboarding.
- Local draft persistence.
- Camera/photo capture.
- Manager and RDO signatures.
- Combined PDF export.
- SharePoint upload through Microsoft Graph.
- Error handling for offline/failed upload states.
- Privacy policy and support contact.

## 4. Prepare Store Listing Assets

Prepare these before submission:

- App name.
- Subtitle / short description.
- Full description.
- App icon.
- iPhone screenshots.
- iPad screenshots, if iPad is supported.
- Android phone screenshots.
- Android tablet screenshots, if tablet is supported.
- Support email.
- Marketing website or support URL.
- Privacy policy URL.
- Demo account or demo mode for reviewers.

Avoid using confidential hotel data in screenshots. Use sample properties and fake inspection notes.

## 5. Privacy And Data Disclosures

This app will likely handle sensitive business data:

- User name and work email.
- Company tenant information.
- Property inspection notes.
- Photos.
- Signatures.
- SharePoint file paths.
- Upload status and timestamps.

You will need a privacy policy that explains:

- What data is collected.
- Why it is collected.
- Where it is stored.
- Whether data is shared with third parties.
- How users request deletion or support.
- That inspection files are stored in the company's Microsoft 365 / SharePoint environment.

For Google Play, complete the Data Safety form. Google requires developers to declare data collection, sharing, and security practices.

Google reference:

- https://support.google.com/googleplay/android-developer/answer/10787469

For Apple, complete App Privacy details in App Store Connect.

Apple reference:

- https://developer.apple.com/help/app-store-connect/reference/app-information/app-privacy

## 6. iOS Release Steps

1. Enroll in the Apple Developer Program.
2. Create the app record in App Store Connect.
3. Configure app name, bundle ID, category, age rating, pricing, and availability.
4. Add privacy policy URL and App Privacy answers.
5. Build a signed iOS release with EAS Build or Xcode.
6. Upload the build to App Store Connect.
7. Test with TestFlight.
8. Add screenshots and store metadata.
9. Provide reviewer access:
   - Demo login, or
   - Demo mode, or
   - Clear instructions for Microsoft sign-in testing.
10. Add the build to the app version.
11. Submit for App Review.
12. After approval, release manually or automatically.

Apple notes that before submitting an app version for review, you provide required metadata and choose the build for that version.

Apple reference:

- https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-an-app

## 7. Android Release Steps

1. Create a Google Play Console developer account.
2. Create the app in Play Console.
3. Configure app name, category, contact details, privacy policy, and countries.
4. Complete App Content sections:
   - Data Safety.
   - Content rating.
   - Target audience.
   - Ads declaration.
   - Permissions declarations, if required.
5. Build a signed Android App Bundle:

```text
.aab
```

6. Upload the `.aab` to an internal testing track.
7. Test install, Microsoft sign-in, camera, offline drafts, PDF generation, and SharePoint upload.
8. Move to closed or open testing if needed.
9. Submit a production release.
10. Roll out gradually, then expand to 100%.

Google supports internal, closed, and open testing tracks before production release.

Google reference:

- https://support.google.com/googleplay/android-developer/answer/9845334

## 8. Will This App Pass Security Review?

The current mockup would not be submitted to Apple or Google as-is. It is a browser-based UX prototype and does not yet include the production security pieces.

A production version can pass review if it is built correctly.

Likely review risks:

- Login-only app with no reviewer access.
- Unclear public purpose if it appears useful to only one company.
- Missing privacy policy.
- Inaccurate Apple App Privacy or Google Data Safety answers.
- Camera/photo permission prompts that do not clearly explain why access is needed.
- Storing sensitive inspection data insecurely.
- Requesting overly broad Microsoft Graph permissions.
- Failing if the reviewer cannot access Microsoft 365 test data.
- Uploading user data without clear disclosure.

Security practices to implement before submission:

- Use Microsoft MSAL for sign-in.
- Do not store Microsoft passwords.
- Store tokens only in secure platform storage.
- Restrict Graph scopes to the minimum needed.
- Prefer tenant-specific configuration.
- Encrypt local drafts if sensitive data is stored offline.
- Store photos inside the app sandbox until uploaded.
- Use HTTPS only.
- Do not hard-code production secrets in the app.
- Provide a demo tenant, demo account, or demo mode for review.
- Include clear camera/photo permission text.
- Publish a privacy policy before review.

## 9. Recommended Launch Path

For this app, use this order:

1. Finish the production Expo / React Native build.
2. Pilot privately through TestFlight and Google internal testing.
3. Run a real inspection pilot with sample/non-confidential data.
4. Fix upload, offline, and PDF edge cases.
5. Prepare privacy policy and store screenshots.
6. Submit to Apple App Review and Google Play review.
7. Release publicly as a configurable inspection app.

## 10. Practical Decision

If the app is only for one hotel management company, use Intune/private distribution.

If the app is intended to be sold or reused by other management companies, use the public app stores and build multi-company onboarding, configurable templates, and a demo/reviewer flow.
