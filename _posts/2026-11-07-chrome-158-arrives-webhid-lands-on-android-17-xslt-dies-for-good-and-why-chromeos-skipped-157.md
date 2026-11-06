---
title: "Chrome 158 Arrives: WebHID Lands on Android 17, XSLT Dies for Good, and
  Why ChromeOS Skipped 157"
description: Chrome 158 brings desktop-grade WebHID peripheral support to
  Android 17 and Googlebooks, disables legacy XSLT across all platforms, expands
  Gen AI and SaaS reporting to ChromeOS, and previews ClickFix clipboard DLP in
  Chrome 160.
date: 2026-11-07
categories:
  - Chrome Enterprise
  - Chrome OS
  - Googlebook
  - Android
tags:
  - chrome-158
  - chrome-os
  - android-17
  - googlebook
  - chrome-enterprise
  - security
  - webhid
pin: false
featured: true
tldr:
  - ChromeOS now increments by even numbers every 4 weeks (154 → 156 → 158),
    making odd releases like M157 browser-only stops.
  - Chrome 158 brings the WebHID API to Android 17 (API level 37+), unlocking
    custom USB/Bluetooth keyboards, mice, and headsets on Googlebooks.
  - Legacy XSLT v1.0 is disabled on Stable across Android, ChromeOS, and desktop
    to eliminate unmaintained libxslt memory-safety vulnerabilities.
  - Gen AI & SaaS app usage reporting in the Google Admin console now covers
    ChromeOS, Android, and iOS alongside desktop.
  - Upcoming Chrome 160 adds a DLP copy trigger
    (OnDataCopiedEnterpriseConnector) to block ClickFix attacks before payloads
    reach the clipboard.
verdict:
  title: The M158 Enterprise & OS Verdict
  score: 8.5
  caption: A foundational milestone that closes the peripheral gap on Android 17
    Googlebooks and hardens browser memory safety.
  read_if:
    - You manage a ChromeOS, Googlebook, or Chrome Enterprise fleet and need to
      track M157/M158 policy shifts
  skip_if:
    - You only want consumer hardware reviews and don't care about
      under-the-hood browser APIs or enterprise policies
persona: none
---
If you have been watching Chrome version numbers jump faster than usual this autumn, you aren't imagining things. Starting with [ChromeOS 154](https://support.google.com/chrome/a/answer/7679408?hl=en-GB&co=CHROME_ENTERPRISE._Product%3DChromeOS&oco=0), Google shifted the Chrome browser to a rapid two-week release cycle while keeping ChromeOS on a four-week schedule that increments by **even numbers** (`154` → `156` → `158`). 

That means odd-numbered milestones like **Chrome 157** are now quiet, browser-only stops, while even-numbered milestones carry the heavy OS and platform upgrades. Published in the latest [Chrome Enterprise Release Notes](https://chromeenterprise.google/resources/release-notes/?utm_source=adhoc&utm_medium=email&utm_campaign=FY26-Q4-global-44659-email-of-chrm-cecb-br-Chrome-Release-Notes-M158&utm_content=release-notes-m158&mkt_tok=ODA4LUdKVy0zMTQAAAGlUYcpY6k1ZYDb0o5z8zwYh1_2zd61pOMRUD59K9uh46cmt64vSacEHwyjgsB39YqOb08c--Hr_R9mUIeFk0i4XoBquUde1WphqtzZrs_jM5eo2pWAyaLJ), **Chrome 158** is now rolling out—bringing major peripheral upgrades for Android 17 and Googlebook users, killing off a 27-year-old web standard, and laying out the security roadmap through Chrome 168.

---

## 1. WebHID Lands on Android 17: A Big Deal for Googlebooks

One of the sharpest friction points when moving from classic ChromeOS to an [Android 17-powered Googlebook](https://thechromebooks.com/posts/googlebook-reality-check-android-17-under-the-hood-the-app-desert-and-is-it-worth-dollar1000/) has been advanced peripheral support. On desktop Chrome and ChromeOS, we have had the **WebHID API** since Chrome 89—letting web configurators like VIA, QMK, Logitech G Hub Web, and enterprise call-centre dashboards communicate directly with USB and Bluetooth Human Interface Devices (HIDs) without installing bulky native drivers.

**Chrome 158 brings the full WebHID API to Chrome on Android**, built directly on new OS-level support in **Android 17 (API level 37 and later)** with zero changes to the web-exposed API surface.

* **Custom Keyboards, Mice & Gamepads:** Googlebook and Android 17 tablet users can now remap mechanical keyboards, programme gaming mice, and calibrate controllers straight from a browser tab.
* **Enterprise Call-Centre Headsets:** Browser-based contact-centre web apps can now read hardware mute, hook-switch, and call-answer buttons on USB/Bluetooth headsets connected to Android 17 endpoints.
* **Full Admin Policy Parity:** IT administrators can govern WebHID on Android using the exact same policies already supported on ChromeOS: `DefaultWebHidGuardSetting`, `WebHidAllowAllDevicesForUrls`, `WebHidAllowDevicesForUrls`, `WebHidAllowDevicesWithHidUsagesForUrls`, `WebHidAskForUrls`, and `WebHidBlockedForUrls`. *(Note: Android WebView is not supported as it lacks a permissions chooser UI.)*

---

## 2. The End of an Era: Chrome 158 Disables XSLT on Stable

Standardised back in 1999, **XSLT v1.0** (Extensible Stylesheet Language Transformations) has been frozen inside web browsers for over two decades while the rest of the web moved to JSON, React, and modern JavaScript DOM manipulation.

Starting in **Chrome 158**, XSLT stops functioning by default on Stable releases across **Android, ChromeOS, Linux, macOS, and Windows**.

Why pull the plug now? Chromium relies on `libxslt` to process these transformations—a complex, aging C codebase that went completely unmaintained for roughly six months of 2025. Because legacy C XML/XSLT parsers are notoriously prone to buffer overflows and arbitrary code execution—and have been the culprit behind several high-profile browser exploits—Chromium (alongside Firefox's Gecko and Safari's WebKit) is removing it from the web platform.

* **The Enterprise Escape Hatch:** If your organisation still runs legacy internal XML portals that rely on client-side XSLT, you can use the temporary Enterprise Policy or Origin Trial to keep XSLT working until **Chrome 176**, when both fallbacks will be permanently removed.

---

## 3. Native Web App Installs: `<install>` HTML Tag & `navigator.install()`

For years, offering a Progressive Web App (PWA) install button meant developers had to wrestle with clunky `beforeinstallprompt` JavaScript events, and users couldn't easily install a web app from a cross-origin app catalog or enterprise portal.

Chrome 158 launches two parallel improvements on desktop platforms (Windows, macOS, and Linux):
1. **The `<install>` HTML Element:** A declarative HTML tag that triggers a native browser install request given a manifest URL and optional manifest ID—no JavaScript required.
2. **The Web Install API (`navigator.install()`):** The imperative JavaScript method that enables clean, cross-origin web app installations.

IT admins can control both mechanisms via the `WebAppInstallByUserEnabled` enterprise policy or scope them to trusted internal origins and iframes using the `web-app-installation` permissions policy.

---

## 4. Gen AI & SaaS Usage Reporting Expands to ChromeOS and Mobile

As we covered in our deep dive on [Chrome Enterprise’s Gen AI & SaaS App Usage Report](https://thechromebooks.com/), shadow AI visibility is top of mind for IT teams. After launching on desktop in Chrome 153, **Gen AI and SaaS app usage reporting in the Google Admin console is rolling out to ChromeOS, Android, and iOS in Chrome 158**.

Admins now get a single, unified view across Chromebooks, Googlebooks, phones, and desktops tracking:
* Total visits to generative AI tools and SaaS platforms.
* Unique managed profiles and managed browsers.
* Sensitive content transfer events, which can then be locked down using Chrome Enterprise Premium Data Loss Prevention (DLP) rules.

On the mobile side, Chrome 158 also extends **built-in Chrome profile signal sharing to iOS**, laying the groundwork for MDM-free Context-Aware Access (CAA) posture checks on iPhones and iPads.

---

## 5. What Happened in Chrome 157?

Because Chrome 157 (released October 28, 2026) was an odd-numbered browser release, it only introduced two notable updates:
* **Dedicated Proxy Auth Policy (`AllHttpAuthSchemesAllowedForProxies`):** Available starting in Chrome 157 on **ChromeOS, Android, and desktop**, this new policy separates proxy authentication from origin authentication (`AllHttpAuthSchemesAllowedForOrigins`). Proxy support will be stripped from the origin policy in Chrome 161.
* **Chrome iOS "Level Up":** A new opt-in feature-discovery progress tracker on iOS, which admins will be able to disable via `PromotionsEnabled` in Chrome 160.

---

## 6. Roadmap Watch: What’s Coming in Chrome 159–168

The upcoming enterprise roadmap also flags several critical security and lifecycle changes every ChromeOS and Workspace admin should prepare for:

| Target Milestone | Platform Scope | What’s Changing |
| :--- | :--- | :--- |
| **Late Nov 2026** | ChromeOS | **Mandatory Certificate Provisioning API:** ChromeOS stops supporting certificate enrollment without the Certificate Provisioning API (SCEP). |
| **Chrome 159** | Desktop, Android, iOS | **Admin Console Security Guide (Premium):** Interactive DLP setup checklist and pre-built Gen AI / PII templates. Plus multi-certificate CAA reporting (`SecuritySignalsClientCertificatesSelectors`) on desktop. |
| **Chrome 160** | ChromeOS & Desktop | **DLP Copy Trigger (`OnDataCopiedEnterpriseConnector`):** Intercepts, warns, or blocks sensitive data at the *copy* action before it enters the local clipboard—neutralising **ClickFix** social-engineering terminal attacks and leaks to local apps. |
| **Chrome 160** | Android & iOS | **Mobile DLP & Custom HTTP Headers:** Android gets DLP paste protection (`OnBulkDataEntryEnterpriseConnector`) and network-stack `HttpHeaderInjection` for SaaS tenant restrictions without SSL proxies. Device Trust Connector (DTC) lands on Android and iOS. |
| **Chrome 160** | Desktop & Android | **Extension-Free CAA & Deprecations:** Desktop Context-Aware Access works via built-in Chrome Signal Sharing without the Endpoint Verification (EV) extension, plus new policy-tampering CAA enforcement. Chrome 160 also drops support for **Windows 10 older than v1809** and removes `RTCPeerConnection.createDTMFSender()`. |
| **Chrome 161** | All Platforms | **January 2027 Clean-up:** Final removal of `RoamingProfileSupportEnabled` / `RoamingProfileLocation`, removal of proxy support from `AllHttpAuthSchemesAllowedForOrigins`, and stricter Digital Credentials API protocol filtering. |
| **Chrome 167–168** | All Platforms | **Q1 2027 Hard Cutoffs:** Chrome 167 deprecates legacy `Takeout` and `Enrollment Token` APIs (replaced by Chrome Management API) and disallows spaces in non-`file://` URL hosts. Chrome 168 removes the `WebRtcPostQuantumKeyAgreement` opt-out policy and **blocks Chrome Remote Desktop hosts running Windows 8.1 or macOS 11 and earlier**. |