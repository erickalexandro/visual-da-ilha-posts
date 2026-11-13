// Visual da Ilha — Posts Manager
// App logic: State, Persistence, Calendar, Pipeline, Post Detail

const STORAGE_KEY = 'visual_da_ilha_posts_v1';
const DRIVE_CONCLUIDOS_URL = 'https://drive.google.com/drive/folders/12l5ZWnCQ4wW-nONnqXSlSq13bixfX82E';

const STAGES = [
  { id: 'ideia', name: 'Ideia', pillClass: 'pill-ideia', dotClass: 'dot-ideia' },
  { id: 'producao', name: 'Em produção', pillClass: 'pill-producao', dotClass: 'dot-producao' },
  { id: 'aprovacao', name: 'Aprovação', pillClass: 'pill-aprovacao', dotClass: 'dot-aprovacao' },
  { id: 'agendado', name: 'Agendado', pillClass: 'pill-agendado', dotClass: 'dot-agendado' },
  { id: 'publicado', name: 'Publicado', pillClass: 'pill-publicado', dotClass: 'dot-publicado' }
];

const INITIAL_POSTS = [
  {
    id: 'post-fim-de-ano',
    title: 'Festa de fim de ano',
    laminas: 8,
    status: 'producao',
    scheduledDate: '2026-11-25T18:00',
    driveUrl: 'https://drive.google.com/drive/folders/16YIvgKyaKVYhxYdXLt3MWZLitTtPGaKm',
    instagramUrl: 'https://instagram.com/visual_dailha',
    caption: `Festa de fim de ano à beira-mar, a 50 metros da praia. 🎉\n\nConfraternização da empresa, reunião da família, comemoração de fim de ano: o Restaurante Visual da Ilha tem salão de madeira com vista para a piscina, frutos do mar, bar completo e estacionamento privativo. E quem vem de longe pode dormir na própria pousada.\n\n📍 Av. Beira Mar, Balneário 07 de Setembro, Ilha Comprida - SP\n\nCardápio e valores de festa sob consulta. Peça o orçamento no WhatsApp: (13) 99606-0373\nhttps://wa.me/5513996060373 (link na bio)\n\n#ilhacomprida #confraternizacao #festadefimdeano #restaurantebeiramar #frutosdomar #pousadailhacomprida #litoralsulsp`,
    images: [
      './images/festa-fim-de-ano/slide-01.webp',
      './images/festa-fim-de-ano/slide-02.webp',
      './images/festa-fim-de-ano/slide-03.webp',
      './images/festa-fim-de-ano/slide-04.webp',
      './images/festa-fim-de-ano/slide-05.webp',
      './images/festa-fim-de-ano/slide-06.webp',
      './images/festa-fim-de-ano/slide-07.webp',
      './images/festa-fim-de-ano/slide-08.webp'
    ],
    completedAt: null
  },
  {
    id: 'post-dia-na-pousada',
    title: 'Um dia na pousada',
    laminas: 5,
    status: 'aprovacao',
    scheduledDate: '2026-11-20T10:00',
    driveUrl: 'https://drive.google.com/drive/folders/1J41x7TzbrDrFIEBTt0jyPfHBES74RmU5',
    instagramUrl: 'https://instagram.com/visual_dailha',
    caption: `Um dia na Pousada Visual da Ilha, da chegada ao fim de tarde. 🌅\n\nChegada tranquila, piscina ao ar livre com a praia em frente, almoço com frutos do mar e culinária caiçara e um fim de tarde com calma.\n\nQuer viver um dia assim? Chame no WhatsApp: (13) 99606-0373\nhttps://wa.me/5513996060373 (link na bio)\n\n#ilhacomprida #pousadailhacomprida #litoralsulsp #pousadabeiramar #viagememfamilia`,
    images: [
      './images/um-dia-na-pousada/slide-01.webp',
      './images/um-dia-na-pousada/slide-02.webp',
      './images/um-dia-na-pousada/slide-03.webp',
      './images/um-dia-na-pousada/slide-04.webp',
      './images/um-dia-na-pousada/slide-05.webp'
    ],
    completedAt: null
  },
  {
    id: 'post-muito-alem',
    title: 'Post 01 - Muito além de uma hospedagem',
    laminas: 6,
    status: 'agendado',
    scheduledDate: '2026-11-16T19:00',
    driveUrl: 'https://drive.google.com/drive/folders/1iSjJ1E2nsK-eMVHMfYpJNslRNIuHW0Fw',
    instagramUrl: 'https://instagram.com/visual_dailha',
    caption: `Muito além de uma hospedagem. 🌿\n\nTem lugar que a gente chega e já sente: piscina ao ar livre, restaurante de frutos do mar, suítes e sobrados na mesma casa, e o mar a 50 metros.\n\nPousada e Restaurante Visual da Ilha — Av. Beira Mar, Balneário 07 de Setembro, Ilha Comprida - SP.\n\nReservas no WhatsApp: (13) 99606-0373\nhttps://wa.me/5513996060373 (link na bio)\n\n#ilhacomprida #pousadailhacomprida #litoralsulsp #pousadabeiramar #viagememfamilia`,
    images: [
      './images/muito-alem/slide-01.webp',
      './images/muito-alem/slide-02.webp',
      './images/muito-alem/slide-03.webp',
      './images/muito-alem/slide-04.webp',
      './images/muito-alem/slide-05.webp',
      './images/muito-alem/slide-06.webp'
    ],
    completedAt: null
  },
  {
    id: 'post-quem-disse',
    title: 'Post 02 - Quem disse foram eles',
    laminas: 5,
    status: 'ideia',
    scheduledDate: '2026-11-28T11:00',
    driveUrl: 'https://drive.google.com/drive/folders/1gxtH9QeFQeoZ7-NKwoedPvXWXfPXaLYf',
    instagramUrl: 'https://instagram.com/visual_dailha',
    caption: `Quem disse foram eles. ⭐\n\nO que nossos hóspedes falam sobre a experiência na Pousada e Restaurante Visual da Ilha: atendimento familiar, porções generosas de frutos do mar e a tranquilidade de estar a 50 metros do mar.\n\nVenha viver essa experiência também!\nReservas pelo WhatsApp: (13) 99606-0373\nhttps://wa.me/5513996060373\n\n#ilhacomprida #pousadailhacomprida #avaliacoesgoogle #litoralsulsp #pousadabeiramar`,
    images: [
      './images/quem-disse-foram-eles/slide-01.webp',
      './images/quem-disse-foram-eles/slide-02.webp',
      './images/quem-disse-foram-eles/slide-03.webp',
      './images/quem-disse-foram-eles/slide-04.webp',
      './images/quem-disse-foram-eles/slide-05.webp'
    ],
    completedAt: null
  }
];

// App State
const state = {
  posts: [],
  currentView: 'calendario', // 'calendario', 'pipeline', 'detalhe'
  currentCalDate: new Date(2026, 10, 1), // November 2026
  selectedDateStr: null,
  activePipelineStage: 'todos',
  selectedPostId: null,
  activeSlideIdx: 0,
  editingPostId: null
};

// Storage Functions
function loadPosts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        state.posts = parsed;
        return;
      }
    }
  } catch (e) {
    console.error('Error loading posts from localStorage:', e);
  }
  // Initialize default
  state.posts = JSON.parse(JSON.stringify(INITIAL_POSTS));
  savePosts();
}

function savePosts() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.posts));
  } catch (e) {
    console.error('Error saving posts to localStorage:', e);
  }
}

// Helpers
function getStage(id) {
  return STAGES.find(s => s.id === id) || STAGES[0];
}

function formatDate(isoStr) {
  if (!isoStr) return 'Não agendado';
  const d = new Date(isoStr);
  if (isNaN(d.getTime())) return isoStr;
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const mins = String(d.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${d.getFullYear()} às ${hours}:${mins}`;
}

function formatDayShort(isoStr) {
  if (!isoStr) return '';
  const d = new Date(isoStr);
  const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  return `${d.getDate()} ${months[d.getMonth()]}`;
}

function showToast(message, isSuccess = true) {
  const toast = document.getElementById('toast');
  toast.innerHTML = isSuccess
    ? `<span>✓</span> <span>${message}</span>`
    : `<span>ℹ</span> <span>${message}</span>`;
  toast.className = 'toast show' + (isSuccess ? ' success' : '');
  setTimeout(() => {
    toast.className = 'toast';
  }, 2600);
}

// NAVIGATION
function switchView(viewName, postId = null) {
  state.currentView = viewName;
  if (postId) {
    state.selectedPostId = postId;
    state.activeSlideIdx = 0;
  }

  // Update sections
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  const target = document.getElementById(`view-${viewName}`);
  if (target) target.classList.add('active');

  // Update tabs
  document.querySelectorAll('.nav-tab-btn').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-view') === viewName);
  });

  // Render view
  if (viewName === 'calendario') {
    renderCalendar();
  } else if (viewName === 'pipeline') {
    renderPipeline();
  } else if (viewName === 'detalhe') {
    renderDetail();
  }

  window.scrollTo({ top: 0, behavior: 'instant' });
}

// CALENDAR RENDERER
function renderCalendar() {
  const container = document.getElementById('calendar-grid');
  const titleEl = document.getElementById('calendar-month-title');
  if (!container || !titleEl) return;

  const year = state.currentCalDate.getFullYear();
  const month = state.currentCalDate.getMonth();

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  titleEl.textContent = `${monthNames[month]} ${year}`;

  container.innerHTML = '';

  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Dom
  const totalDays = new Date(year, month + 1, 0).getDate();
  const prevMonthTotalDays = new Date(year, month, 0).getDate();

  // Days from previous month
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const dayNum = prevMonthTotalDays - i;
    const cell = document.createElement('div');
    cell.className = 'cal-day-cell other-month';
    cell.innerHTML = `<span class="day-number">${dayNum}</span>`;
    container.appendChild(cell);
  }

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  // Days of current month
  for (let d = 1; d <= totalDays; d++) {
    const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const postsOnDay = state.posts.filter(p => p.scheduledDate && p.scheduledDate.startsWith(dayStr));

    const cell = document.createElement('div');
    let cellClass = 'cal-day-cell';
    if (isCurrentMonth && today.getDate() === d) cellClass += ' today';
    if (postsOnDay.length > 0) cellClass += ' has-posts';
    if (state.selectedDateStr === dayStr) cellClass += ' selected';
    cell.className = cellClass;

    let dotsHtml = '';
    if (postsOnDay.length > 0) {
      dotsHtml = `<div class="day-posts-dots">
        ${postsOnDay.map(p => {
          const s = getStage(p.status);
          return `<span class="status-dot ${s.dotClass}" title="${p.title} (${s.name})"></span>`;
        }).join('')}
      </div>`;
    }

    cell.innerHTML = `
      <span class="day-number">${d}</span>
      ${dotsHtml}
    `;

    cell.addEventListener('click', () => {
      state.selectedDateStr = dayStr;
      renderCalendar();
      renderDayPostsList(dayStr, postsOnDay);
    });

    container.appendChild(cell);
  }

  // Auto-render selected day or first day with posts
  if (!state.selectedDateStr) {
    const firstWithPost = state.posts.find(p => p.scheduledDate && p.scheduledDate.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`));
    if (firstWithPost) {
      state.selectedDateStr = firstWithPost.scheduledDate.split('T')[0];
    } else {
      state.selectedDateStr = `${year}-${String(month + 1).padStart(2, '0')}-01`;
    }
  }

  const currentSelectedPosts = state.posts.filter(p => p.scheduledDate && p.scheduledDate.startsWith(state.selectedDateStr));
  renderDayPostsList(state.selectedDateStr, currentSelectedPosts);
}

function renderDayPostsList(dateStr, posts) {
  const container = document.getElementById('day-posts-container');
  if (!container) return;

  const parts = dateStr.split('-');
  const formattedDay = `${parts[2]}/${parts[1]}/${parts[0]}`;

  if (posts.length === 0) {
    container.innerHTML = `
      <div class="day-posts-title">
        <span>Posts para ${formattedDay}</span>
        <button class="header-action-btn" onclick="openNewPostModal('${dateStr}')">+ Criar Post</button>
      </div>
      <div style="background: var(--bg-surface); padding: 18px; border-radius: var(--radius-md); text-align: center; border: 1px dashed var(--border-sand); color: var(--text-muted); font-size: 13px;">
        Nenhum post agendado para este dia.<br>
        <span style="font-size: 11.5px; color: var(--text-faint);">Toque em "+ Criar Post" para planejar uma publicação.</span>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="day-posts-title">
      <span>Posts para ${formattedDay} (${posts.length})</span>
      <button class="header-action-btn" onclick="openNewPostModal('${dateStr}')">+ Novo</button>
    </div>
    ${posts.map(post => {
      const stage = getStage(post.status);
      const thumb = (post.images && post.images.length > 0)
        ? post.images[0]
        : './icons/icon-192.png';
      return `
        <div class="day-post-card" onclick="switchView('detalhe', '${post.id}')">
          <img class="post-thumb-45" src="${thumb}" alt="${post.title}">
          <div class="day-post-info">
            <div>
              <div class="day-post-title">${post.title}</div>
              <div class="day-post-meta" style="margin-top: 4px;">
                <span>📷 ${post.laminas || (post.images ? post.images.length : 1)} lâminas</span>
                <span>⏰ ${post.scheduledDate ? post.scheduledDate.split('T')[1] : '--:--'}</span>
              </div>
            </div>
            <div>
              <span class="status-pill ${stage.pillClass}">${stage.name}</span>
            </div>
          </div>
        </div>
      `;
    }).join('')}
  `;
}

// PIPELINE (KANBAN) RENDERER
function renderPipeline() {
  const navContainer = document.getElementById('pipeline-stage-tabs');
  const cardsContainer = document.getElementById('pipeline-cards');
  if (!navContainer || !cardsContainer) return;

  // Stage filters tabs
  const filterOptions = [
    { id: 'todos', name: 'Todos' },
    ...STAGES
  ];

  navContainer.innerHTML = filterOptions.map(opt => {
    const count = opt.id === 'todos'
      ? state.posts.length
      : state.posts.filter(p => p.status === opt.id).length;
    const isActive = state.activePipelineStage === opt.id;
    return `
      <button class="stage-tab ${isActive ? 'active' : ''}" onclick="setPipelineStage('${opt.id}')">
        <span>${opt.name}</span>
        <span class="badge">${count}</span>
      </button>
    `;
  }).join('');

  // Filter posts
  const filteredPosts = state.activePipelineStage === 'todos'
    ? state.posts
    : state.posts.filter(p => p.status === state.activePipelineStage);

  if (filteredPosts.length === 0) {
    cardsContainer.innerHTML = `
      <div style="background: var(--bg-surface); padding: 30px 16px; border-radius: var(--radius-md); text-align: center; border: 1px dashed var(--border-sand); color: var(--text-muted); font-size: 13.5px;">
        Nenhum post nesta etapa.
        <div style="margin-top: 10px;">
          <button class="header-action-btn" style="margin: 0 auto;" onclick="openNewPostModal(null, '${state.activePipelineStage === 'todos' ? 'ideia' : state.activePipelineStage}')">
            + Adicionar Post
          </button>
        </div>
      </div>
    `;
    return;
  }

  cardsContainer.innerHTML = filteredPosts.map(post => {
    const stage = getStage(post.status);
    const stageIndex = STAGES.findIndex(s => s.id === post.status);
    const canMoveLeft = stageIndex > 0;
    const canMoveRight = stageIndex < STAGES.length - 1;

    const thumb = (post.images && post.images.length > 0)
      ? post.images[0]
      : './icons/icon-192.png';

    return `
      <div class="pipeline-card" id="card-${post.id}">
        <div class="pipeline-card-top" onclick="switchView('detalhe', '${post.id}')">
          <img class="post-thumb-45" src="${thumb}" alt="${post.title}">
          <div class="pipeline-card-details">
            <div class="pipeline-card-title">${post.title}</div>
            <div class="pipeline-card-meta">
              <span>📅 ${formatDayShort(post.scheduledDate)}</span>
              <span>📷 ${post.laminas || (post.images ? post.images.length : 1)} lâminas</span>
            </div>
            <div>
              <span class="status-pill ${stage.pillClass}">${stage.name}</span>
            </div>
          </div>
        </div>
        <div class="pipeline-card-actions">
          <div class="move-stage-btns">
            <button class="btn-move ${canMoveLeft ? '' : 'disabled'}" onclick="movePostStage('${post.id}', -1)" title="Mover para etapa anterior">
              ← ${canMoveLeft ? STAGES[stageIndex - 1].name.split(' ')[0] : ''}
            </button>
            <button class="btn-move ${canMoveRight ? '' : 'disabled'}" onclick="movePostStage('${post.id}', 1)" title="Avançar etapa">
              ${canMoveRight ? STAGES[stageIndex + 1].name.split(' ')[0] : ''} →
            </button>
          </div>
          ${post.driveUrl ? `
            <a href="${post.driveUrl}" target="_blank" rel="noopener noreferrer" class="pipeline-drive-link" title="Abrir pasta no Drive">
              Drive ↗
            </a>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function setPipelineStage(stageId) {
  state.activePipelineStage = stageId;
  renderPipeline();
}

function movePostStage(postId, direction) {
  const post = state.posts.find(p => p.id === postId);
  if (!post) return;
  const currentIndex = STAGES.findIndex(s => s.id === post.status);
  const nextIndex = currentIndex + direction;
  if (nextIndex >= 0 && nextIndex < STAGES.length) {
    post.status = STAGES[nextIndex].id;
    savePosts();
    renderPipeline();
    showToast(`Post movido para "${STAGES[nextIndex].name}"`);
  }
}

// DETALHE DO POST RENDERER
function renderDetail() {
  const container = document.getElementById('detail-content');
  if (!container) return;

  if (!state.selectedPostId) {
    if (state.posts.length > 0) {
      state.selectedPostId = state.posts[0].id;
    } else {
      container.innerHTML = `
        <div style="background: var(--bg-surface); padding: 30px; text-align: center; border-radius: var(--radius-md); border: 1px dashed var(--border-sand);">
          <p style="color: var(--text-muted); margin-bottom: 12px;">Nenhum post selecionado.</p>
          <button class="header-action-btn" onclick="openNewPostModal()">+ Criar Primeiro Post</button>
        </div>
      `;
      return;
    }
  }

  const post = state.posts.find(p => p.id === state.selectedPostId);
  if (!post) {
    container.innerHTML = `<p style="color: var(--text-muted);">Post não encontrado.</p>`;
    return;
  }

  const stage = getStage(post.status);
  const images = (post.images && post.images.length > 0) ? post.images : ['./icons/icon-192.png'];
  const currentImg = images[state.activeSlideIdx] || images[0];

  container.innerHTML = `
    <div class="detail-card">
      <div class="detail-header-row">
        <div>
          <h3>${post.title}</h3>
          <div style="margin-top: 6px;">
            <span class="status-pill ${stage.pillClass}">${stage.name}</span>
          </div>
        </div>
        <div style="display: flex; gap: 6px;">
          <button class="btn-move" onclick="openEditPostModal('${post.id}')" title="Editar informações">✏️ Editar</button>
          <button class="btn-move" style="color: #DC2626;" onclick="deletePost('${post.id}')" title="Excluir post">🗑️</button>
        </div>
      </div>

      <!-- Lâminas Carousel 4:5 -->
      <div class="detail-gallery">
        <div class="gallery-main-view">
          <img id="main-slide-img" class="gallery-main-img" src="${currentImg}" alt="Lâmina ${state.activeSlideIdx + 1}">
          ${images.length > 1 ? `
            <button class="gallery-nav-btn prev" onclick="changeSlide(-1)">‹</button>
            <button class="gallery-nav-btn next" onclick="changeSlide(1)">›</button>
          ` : ''}
        </div>
        <div class="gallery-counter">
          Lâmina <span id="slide-num-indicator">${state.activeSlideIdx + 1}</span> de ${images.length}
        </div>
        ${images.length > 1 ? `
          <div class="gallery-thumbs-row">
            ${images.map((img, idx) => `
              <img class="gallery-thumb-item ${idx === state.activeSlideIdx ? 'active' : ''}" 
                   src="${img}" 
                   alt="Thumb ${idx + 1}"
                   onclick="selectSlide(${idx})">
            `).join('')}
          </div>
        ` : ''}
      </div>

      <!-- Info & Stage Selector -->
      <div class="detail-info-group">
        <div class="info-item">
          <span class="info-label">Status da Publicação</span>
          <div class="status-step-selector">
            ${STAGES.map(s => `
              <button class="step-btn ${s.id === post.status ? 'active' : ''}" 
                      onclick="setPostStatus('${post.id}', '${s.id}')">
                ${s.name}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="info-item">
          <span class="info-label">Data e Horário Agendado</span>
          <span class="info-value">📅 ${formatDate(post.scheduledDate)}</span>
        </div>

        <!-- Links Box -->
        <div class="links-box">
          ${post.driveUrl ? `
            <a href="${post.driveUrl}" target="_blank" rel="noopener noreferrer" class="btn-link-action">
              <span>📁 Pasta no Google Drive</span>
              <span style="color: var(--accent-orange);">Abrir ↗</span>
            </a>
          ` : `
            <span style="font-size: 12px; color: var(--text-faint);">Nenhuma pasta do Drive vinculada.</span>
          `}

          ${post.instagramUrl ? `
            <a href="${post.instagramUrl}" target="_blank" rel="noopener noreferrer" class="btn-link-action">
              <span>📸 Perfil no Instagram</span>
              <span style="color: var(--accent-orange);">Abrir ↗</span>
            </a>
          ` : ''}
        </div>

        <!-- Legenda com botão copiar -->
        <div class="caption-box">
          <div class="caption-header">
            <span class="info-label">Legenda do Post</span>
            <button class="btn-copy-caption" onclick="copyCaption('${post.id}')">
              <span>📋</span>
              <span id="copy-btn-text">Copiar Legenda</span>
            </button>
          </div>
          <div class="caption-text">${post.caption || 'Sem legenda cadastrada.'}</div>
        </div>
      </div>

      <!-- Botão Mover para Concluídos -->
      <button class="btn-complete-post" onclick="moveToCompleted('${post.id}')">
        <span>✓</span>
        <span>Mover para Concluídos & Registrar no Drive</span>
      </button>
    </div>
  `;
}

function selectSlide(idx) {
  state.activeSlideIdx = idx;
  const imgEl = document.getElementById('main-slide-img');
  const indEl = document.getElementById('slide-num-indicator');
  const post = state.posts.find(p => p.id === state.selectedPostId);
  if (post && post.images && post.images[idx]) {
    if (imgEl) imgEl.src = post.images[idx];
    if (indEl) indEl.textContent = idx + 1;
    document.querySelectorAll('.gallery-thumb-item').forEach((thumb, i) => {
      thumb.classList.toggle('active', i === idx);
    });
  }
}

function changeSlide(delta) {
  const post = state.posts.find(p => p.id === state.selectedPostId);
  if (!post || !post.images) return;
  let next = state.activeSlideIdx + delta;
  if (next < 0) next = post.images.length - 1;
  if (next >= post.images.length) next = 0;
  selectSlide(next);
}

function setPostStatus(postId, stageId) {
  const post = state.posts.find(p => p.id === postId);
  if (!post) return;
  post.status = stageId;
  savePosts();
  renderDetail();
  const stage = getStage(stageId);
  showToast(`Status atualizado para "${stage.name}"`);
}

function copyCaption(postId) {
  const post = state.posts.find(p => p.id === postId);
  if (!post || !post.caption) {
    showToast('Nenhuma legenda para copiar', false);
    return;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(post.caption).then(() => {
      const btnText = document.getElementById('copy-btn-text');
      if (btnText) btnText.textContent = 'Copiado! ✓';
      setTimeout(() => {
        if (btnText) btnText.textContent = 'Copiar Legenda';
      }, 2000);
      showToast('Legenda copiada para a área de transferência! ✓');
    }).catch(() => {
      fallbackCopy(post.caption);
    });
  } else {
    fallbackCopy(post.caption);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showToast('Legenda copiada! ✓');
}

function moveToCompleted(postId) {
  const post = state.posts.find(p => p.id === postId);
  if (!post) return;

  post.status = 'publicado';
  post.driveUrl = DRIVE_CONCLUIDOS_URL;
  post.completedAt = new Date().toISOString();
  savePosts();
  renderDetail();
  showToast('✓ Post movido para Concluídos e registrado na pasta final!');
}

function deletePost(postId) {
  if (!confirm('Deseja realmente excluir este post?')) return;
  state.posts = state.posts.filter(p => p.id !== postId);
  savePosts();
  state.selectedPostId = state.posts.length > 0 ? state.posts[0].id : null;
  switchView('pipeline');
  showToast('Post excluído com sucesso');
}

// MODAL FORM (NEW / EDIT)
function openNewPostModal(prefillDate = null, prefillStatus = 'ideia') {
  state.editingPostId = null;
  document.getElementById('modal-title').textContent = 'Novo Post';
  document.getElementById('form-post-id').value = '';
  document.getElementById('form-title').value = '';
  document.getElementById('form-laminas').value = '1';
  document.getElementById('form-status').value = prefillStatus;
  
  const defaultDate = prefillDate ? `${prefillDate}T12:00` : new Date().toISOString().slice(0, 16);
  document.getElementById('form-date').value = defaultDate;
  document.getElementById('form-drive').value = '';
  document.getElementById('form-instagram').value = 'https://instagram.com/visual_dailha';
  document.getElementById('form-caption').value = '';
  document.getElementById('form-images').value = '';

  document.getElementById('modal-overlay').classList.add('active');
}

function openEditPostModal(postId) {
  const post = state.posts.find(p => p.id === postId);
  if (!post) return;
  state.editingPostId = postId;
  document.getElementById('modal-title').textContent = 'Editar Post';
  document.getElementById('form-post-id').value = post.id;
  document.getElementById('form-title').value = post.title || '';
  document.getElementById('form-laminas').value = post.laminas || 1;
  document.getElementById('form-status').value = post.status || 'ideia';
  document.getElementById('form-date').value = post.scheduledDate ? post.scheduledDate.slice(0, 16) : '';
  document.getElementById('form-drive').value = post.driveUrl || '';
  document.getElementById('form-instagram').value = post.instagramUrl || '';
  document.getElementById('form-caption').value = post.caption || '';
  document.getElementById('form-images').value = (post.images || []).join('\n');

  document.getElementById('modal-overlay').classList.add('active');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
}

function handleFormSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('form-post-id').value || 'post-' + Date.now();
  const title = document.getElementById('form-title').value.trim();
  const laminas = parseInt(document.getElementById('form-laminas').value, 10) || 1;
  const status = document.getElementById('form-status').value;
  const scheduledDate = document.getElementById('form-date').value;
  const driveUrl = document.getElementById('form-drive').value.trim();
  const instagramUrl = document.getElementById('form-instagram').value.trim();
  const caption = document.getElementById('form-caption').value.trim();
  const rawImages = document.getElementById('form-images').value.trim();
  
  let images = rawImages ? rawImages.split('\n').map(s => s.trim()).filter(Boolean) : [];
  if (images.length === 0) {
    images = ['./icons/icon-192.png'];
  }

  const existingIdx = state.posts.findIndex(p => p.id === id);
  const postObj = {
    id,
    title,
    laminas,
    status,
    scheduledDate,
    driveUrl,
    instagramUrl,
    caption,
    images
  };

  if (existingIdx >= 0) {
    state.posts[existingIdx] = { ...state.posts[existingIdx], ...postObj };
    showToast('Post atualizado! ✓');
  } else {
    state.posts.push(postObj);
    showToast('Post criado com sucesso! ✓');
  }

  savePosts();
  closeModal();
  switchView('detalhe', id);
}

// CALENDAR CONTROLS
function prevMonth() {
  state.currentCalDate = new Date(state.currentCalDate.getFullYear(), state.currentCalDate.getMonth() - 1, 1);
  state.selectedDateStr = null;
  renderCalendar();
}

function nextMonth() {
  state.currentCalDate = new Date(state.currentCalDate.getFullYear(), state.currentCalDate.getMonth() + 1, 1);
  state.selectedDateStr = null;
  renderCalendar();
}

function goToday() {
  state.currentCalDate = new Date();
  state.selectedDateStr = new Date().toISOString().split('T')[0];
  renderCalendar();
}

// INITIALIZATION
window.addEventListener('DOMContentLoaded', () => {
  loadPosts();

  // Navigation tabs
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view');
      switchView(view);
    });
  });

  // Calendar buttons
  document.getElementById('btn-prev-month').addEventListener('click', prevMonth);
  document.getElementById('btn-next-month').addEventListener('click', nextMonth);
  document.getElementById('btn-today').addEventListener('click', goToday);

  // Modal
  document.getElementById('modal-close-btn').addEventListener('click', closeModal);
  document.getElementById('post-form').addEventListener('submit', handleFormSubmit);

  // Register Service Worker for PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(err => {
      console.log('SW registration note:', err);
    });
  }

  // Initial view
  switchView('calendario');
});
