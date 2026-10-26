---
title: "Taming Shadow AI: Inside Chrome Enterprise’s New Gen AI & SaaS App Usage
  Report"
description: Learn how IT admins can use Chrome Enterprise's new Gen AI & SaaS
  app usage report, Data Loss Prevention (DLP) rules, and the Chrome Management
  Reports API to monitor Shadow AI, prevent data leaks, and optimize SaaS
  licenses.
date: 2026-10-26
categories:
  - Chrome Enterprise
  - Guides
tags:
  - chrome-enterprise
  - shadow-ai
  - saas
  - dlp
  - admin-console
  - security
pin: true
---
With nearly 80% of workers bringing their own AI tools to work—and over half admitting to pasting sensitive intellectual property and corporate data directly into public systems—IT leaders are facing a massive new blind spot: **Shadow AI**.

Until recently, organizations struggled to balance employee productivity with data security. Blocking every AI domain outright frustrates users and stifles innovation, while leaving the floodgates open puts proprietary company data at risk.

To bridge this gap, Google has rolled out the **[Gen AI & SaaS app usage report](https://www.androidenterprise.community/product-updates/visibility-and-insights-gen-ai-saas-app-usage-report-3141?tid=3141)** for Chrome Enterprise. Built directly into the Google Admin console and part of Google's broader [Google Intelligent Endpoints](https://cloud.google.com/blog/products/chrome-enterprise/secure-intelligent-experiences-across-every-endpoint) strategy, this tool gives administrators frictionless visibility into unsanctioned SaaS and Generative AI usage across managed Chrome browsers and profiles—alongside one-click Data Loss Prevention (DLP) remediation and full API access.

Today, we are breaking down everything this new report tracks, how to turn it on in your Google Admin console, how to build automated DLP guardrails directly from your findings, and how developers can query this data via the Chrome Management API.

## 1. Why Browser-Level Visibility Matters: The Shadow AI Challenge

For years, employees acted as the manual bridge between disconnected web apps, copying data from one tab and pasting it into another. Today, as autonomous agentic workflows and third-party LLMs become standard daily tools, the browser has become the primary intelligent endpoint where work happens.

While third-party AI apps might offer basic privacy toggles, they lack the active, granular Data Loss Prevention (DLP) controls required to stop accidental data exfiltration—especially on unmanaged or personal devices. By monitoring usage at the **managed Chrome browser and profile level** across Windows, Mac, and Linux, Chrome Enterprise gives IT teams two major advantages:

1. **Shadow IT & AI Security:** Instantly spot unsanctioned AI tools (like public chatbots, code assistants, or image generators) and track whether sensitive corporate data is being transferred to them.
2. **SaaS License Optimization:** See exact adoption metrics (total visits vs. unique profiles) across enterprise software to identify redundant tools or underutilized SaaS subscriptions.

## 2. What Does the Gen AI & SaaS App Usage Report Track?

Once enabled, the report monitors a predefined catalog of **over 125 popular enterprise SaaS and Generative AI sites**.

- **Generative AI Tools:** ChatGPT (`chatgpt.com`, `openai.com`), Claude (`claude.ai`, `anthropic.com`), Google Gemini (`gemini.google.com`, `notebooklm.google.com`), Microsoft Copilot (`copilot.microsoft.com`), Cursor (`cursor.com`), DeepSeek (`deepseek.com`), Perplexity (`perplexity.ai`), Grok (`grok.ai`), Midjourney (`midjourney.com`), ElevenLabs (`elevenlabs.io`), Synthesia (`synthesia.io`), Jasper, RunwayML, Suno, and more.
- **Enterprise SaaS & Developer Platforms:** GitHub, Slack, Jira, Atlassian, Notion, Figma, Canva, Asana, Monday.com, Salesforce, HubSpot, Workday, Snowflake, Datadog, Okta, 1Password, Box, Dropbox, WeTransfer, and Pastebin.

### Metrics Available in the Admin Console

When you open the **[Gen AI & SaaS app usage details](https://support.google.com/chrome/a/answer/17032872#zippy=%2Clist-of-saas-sites)** report in the Google Admin console, Chrome breaks down activity across nine core columns:


|  |  |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Report Metric** | **What It Tells You** |
| **Site name & Category** | Identifies the platform and classifies its primary function (e.g., Gen AI, Productivity, Cloud Storage). |
| **Total visits** | The aggregate number of visits from managed Chrome profiles or managed browsers during the selected timeframe. |
| **Unique profiles** | The exact count of distinct managed Chrome user profiles visiting the site. |
| **Unique browsers** | The count of distinct managed Chrome browsers accessing the site. |
| **Sensitive content** | The total number of sensitive content transfers detected going to or from the site. |
| **Organization name & Domains** | The parent organization behind the tool and all associated domains/subdomains tracked. |
| **Encryption protocol** | The security protocols used by the site across its subdomains (such as `TLS_1_3`, `TLS_1_2`, or `QUIC`). |


Clicking into any individual row lets you drill down further into **Unique profiles** (exposing the `Profile ID`, `Profile email`, and `Organizational unit`) and **Unique browsers** (showing the `Machine name` and `Organizational unit`).

## 3. How to Enable and View the Report in Google Admin Console

Before data can populate, an administrator with the **Mobile Device Management** privilege needs to verify that SaaS usage reporting is enabled for your organizational unit (OU):

1. Sign in to the **Google Admin console** using an administrator account.
2. Navigate to **Menu** > **Chrome browser** > **Settings** (which opens *User & browser settings* by default).
3. Select your **top-level organizational unit** on the left so child OUs inherit the policy.
4. Scroll to **Browser reporting** and click **Gen AI and SaaS app usage reporting**.
5. Select **Enable SaaS usage reporting** and click **Save**.

### Viewing and Filtering Your Data

Once reporting is active, any admin with the **Chrome administrator privilege** can view the dashboard:

1. Go to **Menu > Chrome browser > Reports > Gen AI & SaaS app**.
2. Select a specific **Organizational Unit** on the left if you want to scope the data to a single department (e.g., Engineering or Marketing).
3. Click **Add a filter** to search by specific fields or sort columns to immediately surface the most-visited unapproved AI tools or sites with the highest sensitive content transfers.

## 4. Turning Insights into Action: Creating DLP Rules on the Fly

Visibility is only half the battle; remediation is where this update truly shines. Rather than jumping between disconnected security consoles, admins can launch investigations in the Security Investigation Tool (SIT) or build **Data Loss Prevention (DLP)** rules directly from the Gen AI & SaaS report:

1. From **Chrome browser > Reports > Gen AI & SaaS app**, click **Create a rule** at the top of the page.
2. **Name & Scope Triggers:** Give the rule a descriptive name and under **Apps**, select the specific Chrome events that will trigger the scan (such as file uploads, pasted content, or downloads).
3. **Define Actions & Alerts:** Choose the enforcement action when sensitive data is detected (e.g., warn the user, block the transfer, or audit only), set the severity level (*Low*, *Medium*, or *High*), and optionally route alerts to the **Alert Center** or via email.
4. **Target Your Scope:** Apply the rule across your entire domain or scope it to specific **Organizational units and/or groups** (note: if a conflict arises between an OU and a group, the group setting takes precedence).
5. **Set Content & Context Conditions:** Use `AND`, `OR`, and `NOT` operators to scan for predefined data types (like source code, credentials, or financial records) alongside context-aware access levels.
6. **Stage or Deploy:** Set the rule status to **Inactive** if you want to review it with your security team first, or select **Active** to begin enforcing DLP scans immediately.

With **Chrome Enterprise Premium**, Google is also extending browser DLP to block sensitive data at the *copy trigger level*—preventing confidential records from ever reaching the system clipboard—as well as extending protections to mobile devices for file downloads, pasted content, and screenshots.

## 5. For Developers & SecOps: Automating Audits with the Reports API

If your security team uses a custom SIEM, internal dashboard, or automated compliance pipeline, you don't have to rely purely on the Admin console UI. Google has exposed these exact insights through three custom methods in the **[Chrome Management Reports API](https://developers.google.com/chrome/management/guides/samples_reportsapi?_gl=1*q16620*_up*MQ..*_ga*MTE1MTMzMzk1OC4xNzg4ODg5OTQz*_ga_SM8HXJ53K2*czE3ODg4ODk5NDMkbzEkZzAkdDE3ODg4ODk5NDMkajYwJGwwJGgw#find_saas_usage)**.

### 1. Fetch Aggregated SaaS & AI Usage (`findSaasUsage`)

To pull an organization-wide summary of SaaS and Gen AI usage—including visit counts, distinct users, and encryption protocols—query the `reports:findSaasUsage` endpoint:

```
curl -X GET \
  -H "Authorization: Bearer $TOKEN" \
  "https://chromemanagement.googleapis.com/v1/customers/$CUSTOMER/reports:findSaasUsage"

```

This returns a JSON payload detailing each detected application (`app`), `firstNavigationTime`, `lastNavigationTime`, `visitsCount`, `distinctBrowsersCount`, `distinctUsersCount`, and `encryptionProtocols`.

### 2. Audit Specific App Usage by User Profile (`findSaasUsageProfiles`)

If you spot an unapproved AI tool or want to audit who is using a paid SaaS app like Slack or Cursor, pass the `app` parameter to `reports:findSaasUsageProfiles`:

```
curl -X GET \
  -H "Authorization: Bearer $TOKEN" \
  "https://chromemanagement.googleapis.com/v1/customers/$CUSTOMER/reports:findSaasUsageProfiles?app=Slack"

```

The API responds with a breakdown of `profileReports`, giving you each user's `email`, `profilePermanentId`, `orgUnitId`, `osPlatform` (e.g., `SYSTEM_WINDOWS` or `SYSTEM_MAC`), and `osVersion`.

### 3. Audit Specific App Usage by Managed Browser (`findSaasUsageBrowsers`)

Similarly, to track which physical machines are hitting a specific service like GitHub, call `reports:findSaasUsageBrowsers`:

```
curl -X GET \
  -H "Authorization: Bearer $TOKEN" \
  "https://chromemanagement.googleapis.com/v1/customers/$CUSTOMER/reports:findSaasUsageBrowsers?app=GitHub"

```

This returns the `machine` name, `devicePermanentId`, navigation timestamps, and OS details—which you can then pipe into the Chrome Management Profiles API or Admin SDK Directory API for deeper remediation.

## Wrapping Up

Shadow AI isn't slowing down, and treating every new AI tool like malware is a losing battle for modern IT teams. By bringing native Gen AI and SaaS usage reporting directly into the Google Admin console, Chrome Enterprise gives administrators the exact telemetry they need to see what tools employees actually love using, trim wasted SaaS spend, and wrap sensible DLP guardrails around sensitive company data.