(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const hero = $('.hero');
  const stage = $('#collage-stage');
  const art = $('#invitation-art');
  const cutout = $('#couple-cutout');
  const introButton = $('#intro-button');
  const introLabel = $('#intro-button span');
  const introStatus = $('#intro-status');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reviewMode = new URLSearchParams(window.location.search).get('review') === '1';
  const reviewPanel = $('#design-review');
  const calibrationControls = $('#calibration-controls');
  reviewPanel.hidden = !reviewMode;
  calibrationControls.hidden = !reviewMode;
  document.body.classList.toggle('review-mode', reviewMode);

  let introTimer = 0;
  let introReady = false;
  let gallery = [];
  let activeIndex = 0;
  let focusedThumb = null;
  let scrollFrame = 0;
  const prefetched = new Set();

  function imageLoaded(image) {
    return image.complete && image.naturalWidth > 0;
  }

  function waitForImage(image) {
    if (image.complete) return Promise.resolve();
    return new Promise((resolve) => {
      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', resolve, { once: true });
    });
  }

  function waitAtMost(promise, ms) {
    return Promise.race([promise.catch(() => {}), new Promise((resolve) => window.setTimeout(resolve, ms))]);
  }

  function updateIntroLabel() {
    if (!imageLoaded(cutout)) {
      introButton.disabled = true;
      introStatus.textContent = '사진을 불러오지 못해 초대장 그림을 보여드려요.';
      return;
    }
    introButton.disabled = false;
    if (reducedMotion.matches) {
      introLabel.textContent = hero.dataset.state === 'photo' ? '그림 보기' : '사진 보기';
      introButton.setAttribute('aria-label', hero.dataset.state === 'photo' ? '손그림을 다시 보기' : '사진 보기');
      return;
    }
    introLabel.textContent = '사진 전환 다시 보기';
    introButton.removeAttribute('aria-label');
  }

  function setVisualState(state) {
    if (state === 'photo' && !imageLoaded(cutout)) {
      hero.dataset.state = 'illustration';
      introStatus.textContent = '사진을 불러오지 못해 초대장 그림을 보여드려요.';
    } else {
      hero.dataset.state = state;
      introStatus.textContent = '';
    }
    updateIntroLabel();
  }

  function stopIntro() {
    window.clearTimeout(introTimer);
    introTimer = 0;
  }

  function startIntro() {
    stopIntro();
    hero.scrollIntoView({ block: 'start', behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    setVisualState('illustration');
    if (reducedMotion.matches || !imageLoaded(cutout)) return;
    introTimer = window.setTimeout(() => setVisualState('photo'), 1400);
  }

  function startAutomaticIntro() {
    if (reviewMode || reducedMotion.matches || !introReady || !imageLoaded(art) || !imageLoaded(cutout)) return;
    if (hero.dataset.autoStarted === 'true') return;
    hero.dataset.autoStarted = 'true';
    introTimer = window.setTimeout(() => setVisualState('photo'), 1400);
  }

  hero.dataset.state = 'illustration';
  cutout.addEventListener('load', () => {
    updateIntroLabel();
    startAutomaticIntro();
  }, { once: true });
  cutout.addEventListener('error', () => {
    cutout.hidden = true;
    hero.dataset.state = 'illustration';
    updateIntroLabel();
  }, { once: true });
  art.addEventListener('load', startAutomaticIntro, { once: true });

  const fontsReady = (document.fonts && document.fonts.load)
    ? Promise.all([document.fonts.load('16px "Gowun Dodum"'), document.fonts.load('34px "Delius"')])
    : Promise.resolve();
  const imagesReady = Promise.all([waitForImage(art), waitForImage(cutout)]);
  waitAtMost(Promise.all([fontsReady, imagesReady]), 1800).then(() => {
    introReady = true;
    updateIntroLabel();
    startAutomaticIntro();
  });

  introButton.addEventListener('click', () => {
    if (reducedMotion.matches) {
      stopIntro();
      setVisualState(hero.dataset.state === 'photo' ? 'illustration' : 'photo');
    } else {
      startIntro();
    }
  });
  reducedMotion.addEventListener?.('change', () => {
    stopIntro();
    if (reducedMotion.matches) setVisualState('illustration');
    else if (!reviewMode) startAutomaticIntro();
    updateIntroLabel();
  });

  $('#music-button').addEventListener('click', () => {
    $('#music-result').textContent = '밝고 잔잔한 연주곡을 준비하고 있어요.';
  });
  $('#rsvp-form').addEventListener('submit', (event) => {
    event.preventDefault();
    $('#rsvp-result').textContent = '디자인 미리보기입니다. 실제 응답은 저장되지 않습니다.';
  });
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
          stopIntro();
          stage.classList.remove('is-calibrating');
          $('[data-calibration="blend"]').setAttribute('aria-pressed', 'false');
          setVisualState(mode === 'photo' ? 'photo' : 'illustration');
        }
      });
    });
  }

  // Load small local thumbnails into a scroll-snap strip; full images are requested only in the dialog.
  const track = $('#gallery-track');
  const itemsHost = $('#gallery-items');
  const galleryCounter = $('#gallery-count');
  const galleryStatus = $('#gallery-status');
  const previousButton = $('#gallery-previous');
  const nextButton = $('#gallery-next');
  const dialog = $('#photo-dialog');
  const dialogImage = $('#dialog-image');
  const dialogCount = $('#dialog-count');
  const dialogStatus = $('#photo-dialog-status');

  function setGalleryIndex(index, scroll = false) {
    if (!gallery.length) return;
    activeIndex = Math.max(0, Math.min(gallery.length - 1, index));
    galleryCounter.textContent = `${activeIndex + 1} / ${gallery.length}`;
    $$('.gallery-thumb', itemsHost).forEach((button, i) => {
      if (i === activeIndex) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
    previousButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === gallery.length - 1;
    if (scroll) $$('.gallery-thumb', itemsHost)[activeIndex]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  }

  function nearestGalleryIndex() {
    const trackRect = track.getBoundingClientRect();
    const center = trackRect.left + trackRect.width / 2;
    let nearest = 0;
    let distance = Infinity;
    $$('.gallery-thumb', itemsHost).forEach((button, index) => {
      const rect = button.getBoundingClientRect();
      const nextDistance = Math.abs(rect.left + rect.width / 2 - center);
      if (nextDistance < distance) { nearest = index; distance = nextDistance; }
    });
    setGalleryIndex(nearest);
  }

  function prefetchNeighbor(index) {
    const item = gallery[index];
    if (!item || prefetched.has(item.src)) return;
    prefetched.add(item.src);
    const image = new Image();
    image.loading = 'lazy';
    image.decoding = 'async';
    image.src = item.src;
  }

  function showDialogImage(index) {
    if (!gallery.length) return;
    activeIndex = Math.max(0, Math.min(gallery.length - 1, index));
    const item = gallery[activeIndex];
    dialogImage.alt = item.alt || `웨딩 사진 ${activeIndex + 1}`;
    dialogImage.src = item.src;
    dialogImage.setAttribute('fetchpriority', 'high');
    dialogCount.textContent = `${activeIndex + 1} / ${gallery.length}`;
    dialogStatus.textContent = '';
    dialogImage.onerror = () => { dialogStatus.textContent = '사진을 불러오지 못했어요.'; };
    setGalleryIndex(activeIndex);
    prefetchNeighbor(activeIndex + 1);
    prefetchNeighbor(activeIndex - 1);
  }

  function openPhoto(index, trigger) {
    if (!gallery.length || !dialog.showModal) return;
    focusedThumb = trigger || document.activeElement;
    showDialogImage(index);
    document.body.classList.add('dialog-open');
    dialog.showModal();
    $('#dialog-close').focus();
  }

  function closePhotoDialog() {
    if (dialog.open) dialog.close();
  }

  function moveDialog(delta) {
    if (!dialog.open) return;
    showDialogImage(activeIndex + delta);
  }

  function updateGalleryScroll() {
    window.cancelAnimationFrame(scrollFrame);
    scrollFrame = window.requestAnimationFrame(nearestGalleryIndex);
  }

  function renderGallery(records) {
    gallery = records.filter((item) => item && typeof item.src === 'string' && typeof item.thumb === 'string');
    if (!gallery.length) throw new Error('The gallery manifest contains no usable images.');
    const fragment = document.createDocumentFragment();
    gallery.forEach((item, index) => {
      const button = document.createElement('button');
      button.className = 'gallery-thumb';
      button.type = 'button';
      button.dataset.index = String(index);
      button.setAttribute('aria-label', `사진 ${index + 1}: ${item.alt || '웨딩 사진'} 크게 보기`);
      const image = document.createElement('img');
      image.src = item.thumb;
      image.alt = '';
      image.loading = 'lazy';
      image.decoding = 'async';
      image.width = Number(item.width) || 320;
      image.height = Number(item.height) || 480;
      button.append(image);
      button.addEventListener('click', () => openPhoto(index, button));
      fragment.append(button);
    });
    itemsHost.replaceChildren(fragment);
    galleryStatus.hidden = true;
    setGalleryIndex(0);
    track.addEventListener('scroll', updateGalleryScroll, { passive: true });
  }

  fetch('gallery-manifest.json')
    .then((response) => {
      if (!response.ok) throw new Error(`Gallery manifest returned ${response.status}`);
      return response.json();
    })
    .then(renderGallery)
    .catch(() => {
      galleryStatus.textContent = '사진을 불러오지 못했어요. 잠시 후 다시 열어 주세요.';
      galleryCounter.textContent = '사진 없음';
      itemsHost.replaceChildren();
      previousButton.disabled = true;
      nextButton.disabled = true;
    });

  previousButton.addEventListener('click', () => setGalleryIndex(activeIndex - 1, true));
  nextButton.addEventListener('click', () => setGalleryIndex(activeIndex + 1, true));
  $('#dialog-previous').addEventListener('click', () => moveDialog(-1));
  $('#dialog-next').addEventListener('click', () => moveDialog(1));
  $('#dialog-close').addEventListener('click', closePhotoDialog);
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    dialogImage.removeAttribute('src');
    focusedThumb?.focus({ preventScroll: true });
    focusedThumb = null;
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
