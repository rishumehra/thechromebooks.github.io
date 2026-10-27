/* TheChromebooks.com — theme, navigation, search, TOC, reading progress */

(() => {
  const root = document.documentElement;
  const mq = window.matchMedia('(prefers-color-scheme: dark)');

  /* ---------- Theme ---------- */
  const themeButtons = document.querySelectorAll('[data-theme-set]');
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  const readStoredTheme = () => {
    try {
      return localStorage.getItem('tcb-theme');
    } catch (e) {
      return null;
    }
  };

  const applyTheme = (mode) => {
    root.setAttribute('data-theme', mode);
    themeButtons.forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.themeSet === mode));
    });
    if (themeMeta) themeMeta.content = mode === 'dark' ? '#131314' : '#0b57d0';
  };

  applyTheme(readStoredTheme() || (mq.matches ? 'dark' : 'light'));

  const onSystemThemeChange = (event) => {
    if (!readStoredTheme()) applyTheme(event.matches ? 'dark' : 'light');
  };
  if (typeof mq.addEventListener === 'function') {
    mq.addEventListener('change', onSystemThemeChange);
  } else if (typeof mq.addListener === 'function') {
    mq.addListener(onSystemThemeChange);
  }

  themeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = btn.dataset.themeSet;
      try {
        localStorage.setItem('tcb-theme', next);
      } catch (e) {}
      applyTheme(next);
    });
  });

  /* ---------- Body scroll lock ---------- */
  let menuOpen = false;
  let searchOpen = false;

  const syncScrollLock = () => {
    document.body.style.overflow = menuOpen || searchOpen ? 'hidden' : '';
  };

  /* ---------- Mobile menu ---------- */
  const menu = document.querySelector('.mobile-menu');
  const menuBtn = document.querySelector('[data-menu-toggle]');

  const setMenu = (open) => {
    if (!menu || !menuBtn) return;
    menuOpen = open;
    menu.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    syncScrollLock();
  };

  if (menu && menuBtn) {
    menuBtn.addEventListener('click', () => setMenu(!menuOpen));
    menu.addEventListener('click', (event) => {
      if (event.target.closest('a')) setMenu(false);
    });
  }

  /* ---------- Search ---------- */
  const overlay = document.querySelector('.search-overlay');
  const input = overlay ? overlay.querySelector('input[type="search"]') : null;
  const results = overlay ? overlay.querySelector('.search-results') : null;
  const status = overlay ? overlay.querySelector('.search-status') : null;
  const indexUrl = overlay ? overlay.dataset.searchIndex : null;

  let posts = null;
  let indexPromise = null;
  let lastFocused = null;

  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  const stripHtml = (value) => {
    const el = document.createElement('div');
    el.innerHTML = value || '';
    return (el.textContent || '').replace(/\s+/g, ' ').trim();
  };

  const loadIndex = () => {
    if (posts) return Promise.resolve(posts);
    if (indexPromise) return indexPromise;

    indexPromise = fetch(indexUrl)
      .then((response) => {
        if (!response.ok) throw new Error('Search index unavailable');
        return response.json();
      })
      .then((data) => {
        posts = data.map((post) => ({
          title: post.title || '',
          url: post.url || '',
          categories: post.categories || '',
          tags: post.tags || '',
          content: stripHtml(post.content || '')
        }));
        return posts;
      })
      .catch(() => {
        posts = [];
        return posts;
      });

    return indexPromise;
  };

  const renderResults = (query) => {
    if (!results) return;
    const term = query.trim().toLowerCase();

    if (!posts) {
      results.innerHTML = '<p class="search-empty">Loading&hellip;</p>';
      return;
    }

    const matches = term
      ? posts
          .filter((post) =>
            [post.title, post.categories, post.tags, post.content]
              .join(' ')
              .toLowerCase()
              .includes(term)
          )
          .slice(0, 8)
      : posts.slice(0, 6);

    if (!matches.length) {
      results.innerHTML =
        '<p class="search-empty">No posts matched. Try &ldquo;version&rdquo;, &ldquo;Googlebook&rdquo;, or &ldquo;buying&rdquo;.</p>';
      if (status) status.textContent = 'No posts matched.';
      return;
    }

    results.innerHTML = matches
      .map(
        (post) => `
        <a class="search-result" href="${escapeHtml(post.url)}">
          <span>
            <strong>${escapeHtml(post.title)}</strong>
            <small>${escapeHtml(post.categories || 'Post')}</small>
          </span>
        </a>`
      )
      .join('');

    if (status) status.textContent = `${matches.length} result${matches.length === 1 ? '' : 's'} shown.`;
  };

  const openSearch = () => {
    if (!overlay) return;
    lastFocused = document.activeElement;
    setMenu(false);
    searchOpen = true;
    overlay.classList.add('is-open');
    syncScrollLock();
    if (input) {
      input.value = '';
      input.focus();
    }
    renderResults('');
    loadIndex().then(() => renderResults(input ? input.value : ''));
  };

  const closeSearch = () => {
    if (!overlay || !searchOpen) return;
    searchOpen = false;
    overlay.classList.remove('is-open');
    syncScrollLock();
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  };

  if (overlay) {
    document.querySelectorAll('[data-search]').forEach((btn) => {
      btn.addEventListener('click', openSearch);
    });
    const closeBtn = overlay.querySelector('[data-search-close]');
    if (closeBtn) closeBtn.addEventListener('click', closeSearch);
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeSearch();
    });
    if (input) input.addEventListener('input', (event) => renderResults(event.target.value));
  }

  document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (searchOpen) {
        closeSearch();
      } else {
        openSearch();
      }
    }
    if (event.key === 'Escape') {
      if (searchOpen) closeSearch();
      if (menuOpen) setMenu(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980 && menuOpen) setMenu(false);
  });

  /* ---------- Reading progress ---------- */
  const bar = document.querySelector('.progress-bar');
  if (bar) {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = max > 0 ? `${Math.min(100, (window.scrollY / max) * 100)}%` : '0%';
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
  }

  /* ---------- Table of contents ---------- */
  const tocLists = [...document.querySelectorAll('[data-toc-list]')];
  const headings = [...document.querySelectorAll('.prose h2, .prose h3')];

  const getHeaderOffset = () => {
    const header = document.querySelector('.site-header');
    const h = header ? header.getBoundingClientRect().height : 69;
    return h + 16;
  };

  if (headings.length) {
    headings.forEach((heading, index) => {
      if (!heading.id) heading.id = `section-${index + 1}`;
    });

    tocLists.forEach((list) => {
      headings.forEach((heading) => {
        const link = document.createElement('a');
        link.className = `toc-link${heading.tagName === 'H3' ? ' is-sub' : ''}`;
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent.trim();
        list.appendChild(link);
      });
    });

    const tocLinks = [...document.querySelectorAll('.toc-link')];
    const setActive = (id) => {
      tocLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
      });
    };

    tocLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (!el) return;
        event.preventDefault();
        const offset = getHeaderOffset();
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        history.replaceState(null, '', href);
        setActive(id);
      });
    });

    let ticking = false;
    const updateActive = () => {
      ticking = false;
      const offset = getHeaderOffset();
      const marker = window.scrollY + offset + 4;
      let current = headings[0];
      headings.forEach((heading) => {
        if (heading.offsetTop <= marker) current = heading;
      });
      setActive(current.id);
    };

    updateActive();
    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(updateActive);
        }
      },
      { passive: true }
    );

    document.querySelectorAll('.mobile-toc').forEach((details) => {
      details.addEventListener('click', (event) => {
        if (event.target.closest('a')) details.open = false;
      });
    });
  } else {
    document.querySelectorAll('.toc, .mobile-toc').forEach((el) => {
      el.hidden = true;
    });
    const layout = document.querySelector('.post-layout');
    if (layout) layout.classList.add('no-toc');
  }

  /* ---------- Remove legacy service-worker caches once per session ---------- */
  try {
    if (!sessionStorage.getItem('tcb-sw-cleaned')) {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .getRegistrations()
          .then((registrations) => registrations.forEach((registration) => registration.unregister()))
          .catch(() => {});
      }
      if ('caches' in window) {
        caches
          .keys()
          .then((keys) => keys.forEach((key) => caches.delete(key)))
          .catch(() => {});
      }
      sessionStorage.setItem('tcb-sw-cleaned', '1');
    }
  } catch (e) {}
})();
