---
layout: page
title: Hardware & Gear Hub
permalink: /hardware/
---

Welcome to the ultimate hardware vault for Chromebooks, First-Gen Googlebooks, and accessories. Here is every recommended device, complete with specs and global availability.

<div class="hardware-grid">
  {% for item in site.data.hardware.items %}
    <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 16px; background: #ffffff;">
      <span style="background: #e8f0fe; color: #1a73e8; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 99px;">{{ item.category }}</span>
      <h3 style="margin: 12px 0 6px 0; font-size: 18px;">{{ item.name }}</h3>
      <p style="font-size: 14px; color: #5f6368; margin-bottom: 8px;"><strong>{{ item.badge }}</strong></p>
      <p style="font-size: 14px; color: #4a5568;">{{ item.specs }}</p>
      <p style="font-size: 14px; color: #202124; font-style: italic; margin: 8px 0 12px 0;">"{{ item.pitch }}"</p>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        {% if item.url_global != "" %}
          <a href="{{ item.url_global }}" target="_blank" rel="nofollow sponsored noopener" style="background: #1a73e8; color: #fff; padding: 8px 14px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600;">Check Price ({{ item.price_global }}) →</a>
        {% endif %}
        {% if item.url_india != "" %}
          <a href="{{ item.url_india }}" target="_blank" rel="nofollow sponsored noopener" style="background: #34a853; color: #fff; padding: 8px 14px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600;">View India Store</a>
        {% endif %}
      </div>
    </div>
  {% endfor %}
</div>
