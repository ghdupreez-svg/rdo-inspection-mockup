# RDO Inspection App - Microsoft / IT Setup Guide

This guide lists what IT needs to configure so the RDO Inspection App can sign users in with Microsoft 365 and save reports to SharePoint.

## 1. Confirm Tenant Details

Provide these values to the app build team:

| Item | Value |
|---|---|
| Microsoft tenant name | `________________` |
| Tenant ID | `________________` |
| SharePoint hostname | `________________.sharepoint.com` |
| Primary app admin | `________________` |

## 2. Confirm SharePoint Property Sites

The expected site pattern is:

```text
https://<tenant>.sharepoint.com/sites/{innCode}
```

Example:

```text
https://<tenant>.sharepoint.com/sites/BOIHW
Documents / RDO Property Visits /
```

IT should confirm whether all property sites use the inn code as the SharePoint site slug. If any property differs, list the override URL in the app Settings under that property.

Each property site should have:

```text
Documents
  RDO Property Visits
```

The app will create dated folders under `RDO Property Visits`.

## 3. Create Microsoft Entra Groups

Recommended groups:

```text
RDO Inspection App - Admins
RDO Inspection App - Users
RDO Inspection App - Read Only
```

Add Gerhard to `RDO Inspection App - Admins`.

Add approved RDO users to `RDO Inspection App - Users`.

## 4. Create The Entra App Registration

In Microsoft Entra admin center:

1. Go to `Identity > Applications > App registrations`.
2. Select `New registration`.
3. Name:

```text
RDO Inspection App
```

4. Supported account types:

```text
Accounts in this organizational directory only
```

5. Register the app.
6. Record:

```text
Application (client) ID
Directory (tenant) ID
```

## 5. Configure Mobile Redirect URI

Under the app registration:

1. Open `Authentication`.
2. Add platform:

```text
Mobile and desktop applications
```

3. Add the mobile redirect URI provided by the development team.

Placeholder:

```text
msauth.com.company.rdoinspection://auth
```

Final values may change once the iOS bundle ID and Android package name are finalized.

## 6. Configure Microsoft Graph API Permissions

Minimum recommended delegated permissions:

```text
User.Read
offline_access
```

For SharePoint save access, use one of these models:

Preferred tighter model:

```text
Sites.Selected
```

Broader simpler model:

```text
Sites.ReadWrite.All
Files.ReadWrite.All
```

Recommendation: start with `Sites.Selected` if IT is comfortable granting the app access to the 21 property sites individually. Use broader permissions only if the selected-site setup creates rollout friction.

After adding permissions, grant admin consent if required by company policy.

## 7. Grant Access To SharePoint Sites

If using `Sites.Selected`, IT must grant this app permission to each property SharePoint site.

Grant write access to each property site that should receive reports.

Example target sites:

```text
https://<tenant>.sharepoint.com/sites/BOIHW
https://<tenant>.sharepoint.com/sites/MEMGE
https://<tenant>.sharepoint.com/sites/PIAZN
...
```

## 8. Decide App Distribution

Recommended for company use:

```text
Microsoft Intune
```

Distribution options:

| Platform | Recommended Path |
|---|---|
| iPhone / iPad | Intune line-of-business app, or TestFlight for pilot |
| Android | Intune / Managed Google Play / internal test track |
```

IT should confirm whether devices are company-managed or BYOD, because that affects app protection policy and deployment.

## 9. Recommended Intune Safeguards

Recommended app protection controls:

```text
Require PIN or biometric
Block backup of company app data
Restrict copy/paste to unmanaged apps
Require encrypted device
Allow selective wipe of app data
Require compliant device for access
```

## 10. Values Needed Back From IT

Return this completed list to the app build team:

| Item | Value |
|---|---|
| Tenant name |  |
| Tenant ID |  |
| Client ID |  |
| SharePoint hostname |  |
| Permission model | `Sites.Selected` or broader |
| Admin group name / object ID |  |
| User group name / object ID |  |
| Confirmed property site URL pattern |  |
| Property site exceptions |  |
| Intune distribution method |  |

## Official Microsoft References

- Redirect URI setup: https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-redirect-uri
- Redirect URI best practices: https://learn.microsoft.com/en-us/entra/identity-platform/reply-url
- Microsoft Graph selected SharePoint permissions: https://learn.microsoft.com/en-us/graph/permissions-selected-overview
- Add apps to Microsoft Intune: https://learn.microsoft.com/en-us/mem/intune/apps/apps-add
