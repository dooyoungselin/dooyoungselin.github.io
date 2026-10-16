(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  function weddingDayLabel(now = new Date()) {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit',
    }).formatToParts(now);
    const year = Number(parts.find((part) => part.type === 'year').value);
    const month = Number(parts.find((part) => part.type === 'month').value);
    const day = Number(parts.find((part) => part.type === 'day').value);
    const days = (Date.UTC(2027, 1, 13) - Date.UTC(year, month - 1, day)) / 86400000;
    return days === 0 ? 'D-day' : days > 0 ? `D-${days}` : `D+${Math.abs(days)}`;
  }

  const hero = $('.hero');
  const stage = $('#collage-stage');
  const cutout = $('#couple-cutout');
  const celebration = $('.firework-burst');
  const backgroundMusic = $('#background-music');
  const musicButton = $('#music-button');
  const musicResult = $('#music-result');
  const copyAddressButton = $('#copy-address');
  const venueAddress = $('#venue-address');
  const copyAddressResult = $('#copy-address-result');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reviewMode = new URLSearchParams(window.location.search).get('review') === '1';
  const reviewPanel = $('#design-review');
  const calibrationControls = $('#calibration-controls');
  reviewPanel.hidden = !reviewMode;
  calibrationControls.hidden = !reviewMode;
  document.body.classList.toggle('review-mode', reviewMode);

  let celebrationTimer = 0;
  let musicIsPlaying = false;
  let musicNoticeTimer = 0;
  let gallery = [];
  let activePhotos = [];
  let activeIndex = 0;
  let focusedThumb = null;
  let dialogScroll = { x: 0, y: 0 };
  const prefetched = new Set();
  let revealObserver = null;
  const weddingDday = $('#wedding-dday');
  const weddingDdayValue = $('#wedding-dday-value');

  const scrollRevealTargets = $$('.copy-body, .featured-photo, .wedding-calendar, .wedding-family, .photo-gallery > .gallery-heading, .photo-gallery > .gallery-hint, .film-section > .gallery-heading, .event-summary, .directions-content > .section-title, .guestbook-heading, .closing-heart');

  function setupScrollReveal() {
    if (reducedMotion.matches || typeof window.IntersectionObserver !== 'function') return;
    let observer = null;
    try {
      observer = new window.IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer?.unobserve(entry.target);
        });
      }, { threshold: .08, rootMargin: '0px 0px -24px 0px' });
      scrollRevealTargets.forEach((target) => observer.observe(target));
    } catch {
      observer?.disconnect();
      return;
    }
    revealObserver = observer;
    scrollRevealTargets.forEach((target) => target.classList.add('scroll-reveal'));
    document.addEventListener('focusin', (event) => {
      const target = event.target.closest?.('.scroll-reveal');
      if (!target) return;
      target.classList.add('is-visible');
      revealObserver?.unobserve(target);
    });
  }

  function revealAllScrollTargets() {
    revealObserver?.disconnect();
    revealObserver = null;
    $$('.scroll-reveal').forEach((target) => target.classList.add('is-visible'));
  }

  setupScrollReveal();

  function updateWeddingDday() {
    if (!weddingDday || !weddingDdayValue) return;
    weddingDdayValue.textContent = weddingDayLabel();
    weddingDday.hidden = false;
  }

  updateWeddingDday();
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') updateWeddingDday();
  });
  window.setInterval(updateWeddingDday, 60000);

  function imageLoaded(image) {
    return image.complete && image.naturalWidth > 0;
  }

  function hasMusicSource() {
    return Boolean(backgroundMusic.getAttribute('src') || $('source[src]', backgroundMusic));
  }

  function isMusicAudible() {
    return musicIsPlaying && !backgroundMusic.paused && !backgroundMusic.ended && !backgroundMusic.muted && backgroundMusic.volume > 0;
  }

  function updateMusicControl() {
    const audible = isMusicAudible();
    musicButton.setAttribute('aria-pressed', String(audible));
    musicButton.setAttribute('aria-label', audible ? '배경음악 일시 정지' : hasMusicSource() ? '배경음악 재생' : '배경음악 안내');
  }

  function showMusicNotice(message) {
    window.clearTimeout(musicNoticeTimer);
    musicResult.textContent = message;
    if (message) musicNoticeTimer = window.setTimeout(() => { musicResult.textContent = ''; }, 2600);
  }

  async function toggleMusic() {
    if (!hasMusicSource()) {
      showMusicNotice('음악을 준비하고 있어요.');
      updateMusicControl();
      return;
    }
    if (!backgroundMusic.paused && !backgroundMusic.ended && !backgroundMusic.muted && backgroundMusic.volume > 0) {
      backgroundMusic.pause();
      return;
    }

    backgroundMusic.muted = false;
    if (backgroundMusic.volume === 0) backgroundMusic.volume = 0.8;
    try {
      await backgroundMusic.play();
    } catch {
      musicIsPlaying = false;
      updateMusicControl();
      showMusicNotice('음악을 재생하지 못했어요. 다시 눌러 주세요.');
    }
  }

  backgroundMusic.addEventListener('playing', () => {
    musicIsPlaying = true;
    showMusicNotice('');
    updateMusicControl();
  });
  ['pause', 'ended', 'emptied', 'waiting', 'error'].forEach((eventName) => {
    backgroundMusic.addEventListener(eventName, () => {
      musicIsPlaying = false;
      updateMusicControl();
      if (eventName === 'error') showMusicNotice('음악을 재생하지 못했어요. 다시 눌러 주세요.');
    });
  });
  ['play', 'volumechange', 'loadedmetadata', 'canplay', 'seeked'].forEach((eventName) => {
    backgroundMusic.addEventListener(eventName, updateMusicControl);
  });
  updateMusicControl();

  copyAddressButton.addEventListener('click', async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(venueAddress.textContent.trim());
      copyAddressResult.textContent = '주소를 복사했어요.';
    } catch {
      copyAddressResult.textContent = '주소를 길게 눌러 복사해 주세요.';
    }
  });

  function setVisualState(state) {
    const previousState = hero.dataset.state;
    const nextState = state === 'photo' && !imageLoaded(cutout) ? 'illustration' : state;
    hero.dataset.state = nextState;
    stage.setAttribute('aria-pressed', String(nextState === 'photo'));
    if (previousState && previousState !== nextState) {
      if (reducedMotion.matches) {
        clearCelebration();
      } else {
        restartCelebration();
      }
    }
  }

  function clearCelebration() {
    window.clearTimeout(celebrationTimer);
    celebrationTimer = 0;
    celebration.classList.remove('is-celebrating');
  }

  function restartCelebration() {
    clearCelebration();
    void celebration.offsetWidth;
    celebration.classList.add('is-celebrating');
    celebrationTimer = window.setTimeout(clearCelebration, 1050);
  }

  setVisualState('illustration');
  cutout.addEventListener('error', () => {
    cutout.hidden = true;
    setVisualState('illustration');
  }, { once: true });

  reducedMotion.addEventListener?.('change', () => {
    if (reducedMotion.matches) revealAllScrollTargets();
    clearCelebration();
  });

  stage.addEventListener('click', () => {
    setVisualState(hero.dataset.state === 'photo' ? 'illustration' : 'photo');
  });

  musicButton.addEventListener('click', toggleMusic);
  $('#guestbook-form').addEventListener('submit', (event) => {
    event.preventDefault();
    $('#guestbook-result').textContent = '디자인 미리보기입니다. 입력 내용은 전송되거나 저장되지 않습니다.';
  });

  if (reviewMode) {
    $$('[data-calibration]').forEach((button) => {
      button.addEventListener('click', () => {
        const mode = button.dataset.calibration;
        if (mode === 'blend') {
          const on = stage.classList.toggle('is-calibrating');
          button.setAttribute('aria-pressed', String(on));
        } else {
          stage.classList.remove('is-calibrating');
          $('[data-calibration="blend"]').setAttribute('aria-pressed', 'false');
          setVisualState(mode === 'photo' ? 'photo' : 'illustration');
        }
      });
    });
  }

  // Keep the manifest's order while grouping photos into ten three-image scenes.
  const itemsHost = $('#gallery-items');
  const galleryStatus = $('#gallery-status');
  const galleryMoreButton = $('#gallery-more');
  const gallerySection = $('.photo-gallery');
  gallerySection.setAttribute('aria-busy', 'true');
  galleryStatus.textContent = '사진을 불러오고 있어요.';
  const dialog = $('#photo-dialog');
  const dialogImage = $('#dialog-image');
  const dialogCount = $('#dialog-count');
  const dialogStatus = $('#photo-dialog-status');
  const dialogPrevious = $('#dialog-previous');
  const dialogNext = $('#dialog-next');
  galleryMoreButton.addEventListener('click', () => {
    const hiddenScenes = $$('.gallery-scene', itemsHost).filter((scene) => scene.hidden);
    if (!hiddenScenes.length) return;
    const firstRevealed = $('.gallery-photo-button', hiddenScenes[0]);
    hiddenScenes.forEach((scene) => { scene.hidden = false; });
    galleryMoreButton.setAttribute('aria-expanded', 'true');
    galleryMoreButton.hidden = true;
    firstRevealed?.focus({ preventScroll: true });
  });
  function setGalleryIndex(index) {
    if (!activePhotos.length) return;
    activeIndex = Math.max(0, Math.min(activePhotos.length - 1, index));
    $$('.gallery-photo-button', itemsHost).forEach((button, i) => {
      if (activePhotos === gallery && i === activeIndex) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
    dialogPrevious.disabled = activeIndex === 0;
    dialogNext.disabled = activeIndex === activePhotos.length - 1;
  }

  function prefetchNeighbor(index) {
    const item = activePhotos[index];
    if (!item || prefetched.has(item.src)) return;
    prefetched.add(item.src);
    const image = new Image();
    image.fetchPriority = 'low';
    image.decoding = 'async';
    image.src = item.src;
  }

  function showDialogImage(index) {
    if (!activePhotos.length) return;
    activeIndex = Math.max(0, Math.min(activePhotos.length - 1, index));
    const item = activePhotos[activeIndex];
    dialogImage.alt = item.alt || `웨딩 사진 ${activeIndex + 1}`;
    dialogImage.src = item.src;
    dialogImage.setAttribute('fetchpriority', 'high');
    dialogCount.textContent = `${activeIndex + 1} / ${activePhotos.length}`;
    dialogStatus.textContent = '';
    dialogImage.onerror = () => { dialogStatus.textContent = '사진을 불러오지 못했어요.'; };
    setGalleryIndex(activeIndex);
    prefetchNeighbor(activeIndex + 1);
    prefetchNeighbor(activeIndex - 1);
  }

  function openPhoto(index, trigger, photos = gallery) {
    activePhotos = photos;
    if (!activePhotos.length || !dialog.showModal) return;
    focusedThumb = trigger || document.activeElement;
    dialogScroll = { x: window.scrollX, y: window.scrollY };
    showDialogImage(index);
    document.documentElement.classList.add('dialog-open');
    document.body.classList.add('dialog-open');
    dialog.showModal();
    $('#dialog-close').focus({ preventScroll: true });
  }

  function closePhotoDialog() {
    if (dialog.open) dialog.close();
  }

  function moveDialog(delta) {
    if (!dialog.open) return;
    showDialogImage(activeIndex + delta);
  }

  function renderGallery(records) {
    gallery = records.filter((item) => item && typeof item.src === 'string' && typeof item.thumb === 'string');
    if (!gallery.length) throw new Error('The gallery manifest contains no usable images.');
    const fragment = document.createDocumentFragment();
    const scenes = [];
    gallery.forEach((item, index) => {
      const sceneIndex = Math.floor(index / 3);
      let scene = scenes[sceneIndex];
      if (!scene) {
        scene = document.createElement('div');
        scene.className = 'gallery-scene';
        scene.hidden = sceneIndex >= 3;
        const layout = document.createElement('div');
        layout.className = 'gallery-layout';
        scene.append(layout);
        scenes[sceneIndex] = scene;
        fragment.append(scene);
      }
      const layout = $('.gallery-layout', scene);
      const button = document.createElement('button');
      button.className = 'gallery-photo-button';
      button.type = 'button';
      button.dataset.index = String(index);
      button.setAttribute('aria-label', `사진 ${index + 1}: ${item.alt || '웨딩 사진'} 크게 보기`);
      const image = document.createElement('img');
      const fullWidth = Number(item.width) || 1067;
      const fullHeight = Number(item.height) || 1600;
      const thumbWidth = fullWidth > fullHeight ? 440 : Math.round(fullWidth * 440 / fullHeight);
      image.srcset = `${item.thumb} ${thumbWidth}w, ${item.src} ${fullWidth}w`;
      image.sizes = '(max-width: 600px) 30vw, 138px';
      image.alt = '';
      image.loading = 'lazy';
      image.decoding = 'async';
      image.width = fullWidth;
      image.height = fullHeight;
      image.src = item.thumb;
      button.append(image);
      button.addEventListener('click', () => openPhoto(index, button));
      layout.append(button);
    });
    itemsHost.replaceChildren(fragment);
    galleryMoreButton.hidden = gallery.length <= 9;
    galleryStatus.hidden = true;
    gallerySection.setAttribute('aria-busy', 'false');

  }

  fetch('gallery-manifest.json?v=20261016-retouched-order')
    .then((response) => {
      if (!response.ok) throw new Error(`Gallery manifest returned ${response.status}`);
      return response.json();
    })
    .then(renderGallery)
    .catch(() => {
      galleryStatus.textContent = '사진을 불러오지 못했어요. 새로고침해 주세요.';
      itemsHost.replaceChildren();
      galleryMoreButton.hidden = true;
      gallerySection.setAttribute('aria-busy', 'false');
    });

  const filmStrip = $('#film-strip');
  const filmButtons = $$('.film-photo', filmStrip);
  const filmPhotos = filmButtons.map((button) => ({ src: button.dataset.full, alt: $('img', button).alt }));
  filmButtons.forEach((button, index) => button.addEventListener('click', () => openPhoto(index, button, filmPhotos)));
  // Touch uses native scrolling; mouse dragging moves the same strip freely.
  let filmDrag = null;
  let filmDragged = false;
  filmStrip.addEventListener('pointerdown', (event) => {
    filmDragged = false;
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    filmDrag = { x: event.clientX, left: filmStrip.scrollLeft };
  });
  filmStrip.addEventListener('pointermove', (event) => {
    if (!filmDrag) return;
    const delta = event.clientX - filmDrag.x;
    if (!filmDragged && Math.abs(delta) < 5) return;
    filmDragged = true;
    filmStrip.setPointerCapture(event.pointerId);
    filmStrip.classList.add('is-dragging');
    filmStrip.scrollLeft = filmDrag.left - delta;
  });
  function endFilmDrag() {
    filmDrag = null;
    filmStrip.classList.remove('is-dragging');
  }
  filmStrip.addEventListener('pointerup', endFilmDrag);
  filmStrip.addEventListener('pointercancel', endFilmDrag);
  filmStrip.addEventListener('lostpointercapture', endFilmDrag);
  filmStrip.addEventListener('pointerleave', () => { if (!filmDragged) endFilmDrag(); });
  filmStrip.addEventListener('dragstart', (event) => event.preventDefault());
  filmStrip.addEventListener('click', (event) => {
    if (filmDragged && event.detail !== 0) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
  filmStrip.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      filmStrip.scrollBy({ left: (event.key === 'ArrowRight' ? 1 : -1) * 160, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    }
  });

  $('#dialog-previous').addEventListener('click', () => moveDialog(-1));
  $('#dialog-next').addEventListener('click', () => moveDialog(1));
  $('#dialog-close').addEventListener('click', closePhotoDialog);
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    dialogImage.removeAttribute('src');
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(dialogScroll.x, dialogScroll.y);
    focusedThumb?.focus({ preventScroll: true });
    focusedThumb = null;
    window.requestAnimationFrame(() => {
      root.style.scrollBehavior = previousScrollBehavior;
      root.classList.remove('dialog-open');
    });
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); moveDialog(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); moveDialog(1); }
  });
  let pointerStart = null;
  $('#dialog-swipe-area').addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch') pointerStart = event.clientX;
  });
  $('#dialog-swipe-area').addEventListener('pointerup', (event) => {
    if (pointerStart === null) return;
    const delta = event.clientX - pointerStart;
    pointerStart = null;
    if (Math.abs(delta) > 44) moveDialog(delta < 0 ? 1 : -1);
  });
  $('#dialog-swipe-area').addEventListener('pointercancel', () => { pointerStart = null; });
})();
