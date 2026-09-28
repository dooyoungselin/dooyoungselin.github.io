(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const hero = $('.hero');
  const stage = $('#collage-stage');
  const art = $('#invitation-art');
  const cutout = $('#couple-cutout');
  const celebration = $('.firework-burst');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reviewMode = new URLSearchParams(window.location.search).get('review') === '1';
  const reviewPanel = $('#design-review');
  const calibrationControls = $('#calibration-controls');
  reviewPanel.hidden = !reviewMode;
  calibrationControls.hidden = !reviewMode;
  document.body.classList.toggle('review-mode', reviewMode);

  let introTimer = 0;
  let introReady = false;
  let hasCelebrated = false;
  let gallery = [];
  let activeIndex = 0;
  let focusedThumb = null;
  let dialogScroll = { x: 0, y: 0 };
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

  function setVisualState(state) {
    const previousState = hero.dataset.state;
    if (state === 'photo' && !imageLoaded(cutout)) {
      hero.dataset.state = 'illustration';
    } else {
      hero.dataset.state = state;
      if (state === 'photo' && previousState !== 'photo' && !reducedMotion.matches && !hasCelebrated) {
        hasCelebrated = true;
        celebration.classList.add('is-celebrating');
        window.setTimeout(() => celebration.classList.remove('is-celebrating'), 1100);
      }
    }
  }

  function stopIntro() {
    window.clearTimeout(introTimer);
    introTimer = 0;
  }

  function startAutomaticIntro() {
    if (reviewMode || !introReady || !imageLoaded(art) || !imageLoaded(cutout)) return;
    if (reducedMotion.matches) {
      setVisualState('photo');
      return;
    }
    if (hero.dataset.autoStarted === 'true') return;
    hero.dataset.autoStarted = 'true';
    introTimer = window.setTimeout(() => setVisualState('photo'), 1400);
  }

  hero.dataset.state = 'illustration';
  cutout.addEventListener('load', () => {
    startAutomaticIntro();
  }, { once: true });
  cutout.addEventListener('error', () => {
    cutout.hidden = true;
    hero.dataset.state = 'illustration';
  }, { once: true });
  art.addEventListener('load', startAutomaticIntro, { once: true });

  const fontsReady = (document.fonts && document.fonts.load)
    ? Promise.all([document.fonts.load('16px "Gowun Dodum"'), document.fonts.load('34px "Delius"')])
    : Promise.resolve();
  const imagesReady = Promise.all([waitForImage(art), waitForImage(cutout)]);
  waitAtMost(Promise.all([fontsReady, imagesReady]), 1800).then(() => {
    introReady = true;
    startAutomaticIntro();
  });

  reducedMotion.addEventListener?.('change', () => {
    stopIntro();
    if (reducedMotion.matches && imageLoaded(cutout)) setVisualState('photo');
    else if (!reviewMode) startAutomaticIntro();
  });

  $('#music-button').addEventListener('click', () => {
    $('#music-result').textContent = '음악을 준비하고 있어요.';
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

  // Keep the manifest's order while grouping photos into ten three-image scenes.
  const itemsHost = $('#gallery-items');
  const galleryStatus = $('#gallery-status');
  const gallerySection = $('.photo-gallery');
  gallerySection.setAttribute('aria-busy', 'true');
  galleryStatus.textContent = '사진을 불러오고 있어요.';
  const dialog = $('#photo-dialog');
  const dialogImage = $('#dialog-image');
  const dialogCount = $('#dialog-count');
  const dialogStatus = $('#photo-dialog-status');
  const dialogPrevious = $('#dialog-previous');
  const dialogNext = $('#dialog-next');

  function setGalleryIndex(index) {
    if (!gallery.length) return;
    activeIndex = Math.max(0, Math.min(gallery.length - 1, index));
    $$('.gallery-photo-button', itemsHost).forEach((button, i) => {
      if (i === activeIndex) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
    dialogPrevious.disabled = activeIndex === 0;
    dialogNext.disabled = activeIndex === gallery.length - 1;
  }

  function prefetchNeighbor(index) {
    const item = gallery[index];
    if (!item || prefetched.has(item.src)) return;
    prefetched.add(item.src);
    const image = new Image();
    image.fetchPriority = 'low';
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
    const sceneCount = Math.ceil(gallery.length / 3);
    gallery.forEach((item, index) => {
      const sceneIndex = Math.floor(index / 3);
      const sceneLeadIndex = sceneIndex * 3;
      let scene = scenes[sceneIndex];
      if (!scene) {
        scene = document.createElement('section');
        const leadPhoto = gallery[sceneLeadIndex];
        const isLandscape = Number(leadPhoto.width) > Number(leadPhoto.height);
        scene.className = `gallery-scene ${isLandscape ? 'gallery-scene--landscape' : `gallery-scene--${sceneIndex % 2 === 0 ? 'left' : 'right'}`}`;
        scene.setAttribute('aria-labelledby', `gallery-scene-heading-${sceneIndex + 1}`);

        const header = document.createElement('div');
        header.className = 'gallery-scene-header';
        const heading = document.createElement('h2');
        heading.className = 'gallery-scene-title';
        heading.id = `gallery-scene-heading-${sceneIndex + 1}`;
        heading.textContent = '함께한 순간';
        const count = document.createElement('p');
        count.className = 'gallery-scene-count';
        count.textContent = `${String(sceneIndex + 1).padStart(2, '0')}/${String(sceneCount).padStart(2, '0')}`;
        count.setAttribute('aria-label', `사진 장면 ${sceneIndex + 1}, 전체 ${sceneCount}`);
        header.append(heading, count);

        const layout = document.createElement('div');
        layout.className = 'gallery-layout';
        const hint = document.createElement('p');
        hint.className = 'gallery-hint';
        hint.textContent = '사진을 누르면 크게 볼 수 있어요.';
        scene.append(header, layout, hint);
        scenes[sceneIndex] = scene;
        fragment.append(scene);
      }
      const layout = $('.gallery-layout', scene);
      const button = document.createElement('button');
      const isLead = index === sceneLeadIndex;
      button.className = `gallery-photo-button${isLead ? ' gallery-photo-button--lead' : ''}`;
      button.type = 'button';
      button.dataset.index = String(index);
      button.setAttribute('aria-label', `사진 ${index + 1}: ${item.alt || '웨딩 사진'} 크게 보기`);
      const image = document.createElement('img');
      const fullWidth = Number(item.width) || 1067;
      const fullHeight = Number(item.height) || 1600;
      const thumbWidth = fullWidth > fullHeight ? 440 : Math.round(fullWidth * 440 / fullHeight);
      image.srcset = `${item.thumb} ${thumbWidth}w, ${item.src} ${fullWidth}w`;
      image.sizes = isLead && Number(item.width) > Number(item.height)
        ? '(max-width: 600px) calc(100vw - 32px), 400px'
        : isLead
          ? '(max-width: 600px) 60vw, 240px'
          : '(max-width: 600px) 40vw, 144px';
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
    galleryStatus.hidden = true;
    gallerySection.setAttribute('aria-busy', 'false');
    setGalleryIndex(0);
  }

  fetch('gallery-manifest.json')
    .then((response) => {
      if (!response.ok) throw new Error(`Gallery manifest returned ${response.status}`);
      return response.json();
    })
    .then(renderGallery)
    .catch(() => {
      galleryStatus.textContent = '사진을 불러오지 못했어요. 새로고침해 주세요.';
      itemsHost.replaceChildren();
      gallerySection.setAttribute('aria-busy', 'false');
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
