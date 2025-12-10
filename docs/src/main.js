/**
 * Tissue Preparation Benchmarking - Data Browser
 * Main Application Logic
 */

// PapaParse is loaded via CDN in index.html

// Configuration data structure
const CONFIGURATIONS = [
  // Initial Optimization - Mesmer
  { id: 'out_BIDMC_all', name: 'BIDMC All', source: 'BIDMC', type: 'mesmer', category: 'Initial Optimization' },
  { id: 'out_Roche_all', name: 'Roche All', source: 'Roche', type: 'mesmer', category: 'Initial Optimization' },
  { id: 'out_Stanford_all', name: 'Stanford All', source: 'Stanford', type: 'mesmer', category: 'Initial Optimization' },

  // Initial Optimization - CellXpress
  { id: 'out_BIDMC_cellXpress', name: 'BIDMC All', source: 'BIDMC', type: 'cellxpress', category: 'Initial Optimization' },
  { id: 'out_Roche_cellXpress', name: 'Roche All', source: 'Roche', type: 'cellxpress', category: 'Initial Optimization' },
  { id: 'out_Stanford_cellXpress', name: 'Stanford All', source: 'Stanford', type: 'cellxpress', category: 'Initial Optimization' },

  // SNR Analysis
  { id: 'out_BIDMC_Combined_SNR', name: 'BIDMC Combined SNR', source: 'BIDMC', type: 'snr', category: 'SNR Analysis' },
  { id: 'out_Roche_Combined_SNR', name: 'Roche Combined SNR', source: 'Roche', type: 'snr', category: 'SNR Analysis' },
  { id: 'out_Stanford_Combined_SNR', name: 'Stanford Combined SNR', source: 'Stanford', type: 'snr', category: 'SNR Analysis' },
  { id: 'out_CellXpress_SNR', name: 'CellXpress SNR', source: 'CellXpress', type: 'snr', category: 'SNR Analysis' },

  // Validation - ASTAR
  { id: 'out_ASTAR_COMET_CRC_all', name: 'ASTAR COMET CRC', source: 'ASTAR', type: 'mesmer', category: 'Validation' },
  { id: 'out_ASTAR_COMET_CRC_cellXpress', name: 'ASTAR COMET CRC', source: 'ASTAR', type: 'cellxpress', category: 'Validation' },
  { id: 'out_ASTAR_COMET_Tonsil_all', name: 'ASTAR COMET Tonsil', source: 'ASTAR', type: 'mesmer', category: 'Validation' },
  { id: 'out_ASTAR_COMET_Tonsil_cellXpress', name: 'ASTAR COMET Tonsil', source: 'ASTAR', type: 'cellxpress', category: 'Validation' },

  // Validation - BIDMC
  { id: 'out_BIDMC_DLBCL_all', name: 'BIDMC DLBCL', source: 'BIDMC', type: 'mesmer', category: 'Validation' },
  { id: 'out_BIDMC_DLBCL_cellXpress', name: 'BIDMC DLBCL', source: 'BIDMC', type: 'cellxpress', category: 'Validation' },
  { id: 'out_BIDMC_Tonsil_all', name: 'BIDMC Tonsil', source: 'BIDMC', type: 'mesmer', category: 'Validation' },
  { id: 'out_BIDMC_Tonsil_cellXpress', name: 'BIDMC Tonsil', source: 'BIDMC', type: 'cellxpress', category: 'Validation' },
  { id: 'out_BIDMC_subset', name: 'BIDMC Subset', source: 'BIDMC', type: 'mesmer', category: 'Validation' },

  // Validation - Novartis
  { id: 'out_Novartis_Lung_Cancer_all', name: 'Novartis Lung Cancer', source: 'Novartis', type: 'mesmer', category: 'Validation' },
  { id: 'out_Novartis_LungCancer_cellXpress', name: 'Novartis Lung Cancer', source: 'Novartis', type: 'cellxpress', category: 'Validation' },
  { id: 'out_Novartis_Tonsil_all', name: 'Novartis Tonsil', source: 'Novartis', type: 'mesmer', category: 'Validation' },
  { id: 'out_Novartis_Tonsil_cellXpress', name: 'Novartis Tonsil', source: 'Novartis', type: 'cellxpress', category: 'Validation' },

  // Validation - Roche
  { id: 'out_Roche_intestine_all', name: 'Roche Intestine', source: 'Roche', type: 'mesmer', category: 'Validation' },
  { id: 'out_Roche_Intestine_cellXpress', name: 'Roche Intestine', source: 'Roche', type: 'cellxpress', category: 'Validation' },
  { id: 'out_Roche_Tonsil_all', name: 'Roche Tonsil', source: 'Roche', type: 'mesmer', category: 'Validation' },
  { id: 'out_Roche_Tonsil_cellXpress', name: 'Roche Tonsil', source: 'Roche', type: 'cellxpress', category: 'Validation' },

  // Validation - Stanford IMC
  { id: 'out_Stanford_IMC_OSCC_all', name: 'Stanford IMC OSCC', source: 'Stanford', type: 'mesmer', category: 'Validation' },
  { id: 'out_Stanford_IMC_OSCC_cellXpress', name: 'Stanford IMC OSCC', source: 'Stanford', type: 'cellxpress', category: 'Validation' },
  { id: 'out_Stanford_IMC_Tonsil_all', name: 'Stanford IMC Tonsil', source: 'Stanford', type: 'mesmer', category: 'Validation' },
  { id: 'out_Stanford_IMC_Tonsil_cellXpress', name: 'Stanford IMC Tonsil', source: 'Stanford', type: 'cellxpress', category: 'Validation' },

  // Validation - Stanford MIBI
  { id: 'out_Stanford_MIBI_Colon_all', name: 'Stanford MIBI Colon', source: 'Stanford', type: 'mesmer', category: 'Validation' },
  { id: 'out_Stanford_MIBI_Colon_cellXpress', name: 'Stanford MIBI Colon', source: 'Stanford', type: 'cellxpress', category: 'Validation' },
  { id: 'out_Stanford_MIBI_Liver_all', name: 'Stanford MIBI Liver', source: 'Stanford', type: 'mesmer', category: 'Validation' },
  { id: 'out_Stanford_MIBI_Liver_cellXpress', name: 'Stanford MIBI Liver', source: 'Stanford', type: 'cellxpress', category: 'Validation' },
  { id: 'out_Stanford_MIBI_LymphNode_pooled_all', name: 'Stanford MIBI Lymph Node', source: 'Stanford', type: 'mesmer', category: 'Validation' },
  { id: 'out_Stanford_MIBI_LymphNode_pooled_cellXpress', name: 'Stanford MIBI Lymph Node', source: 'Stanford', type: 'cellxpress', category: 'Validation' },

  // Validation - Stanford Orion
  { id: 'out_Stanford_Orion_EndometrialCancer_all', name: 'Stanford Orion Endometrial Cancer', source: 'Stanford', type: 'mesmer', category: 'Validation' },
  { id: 'out_Stanford_Orion_Endometrium_cellXpress', name: 'Stanford Orion Endometrial Cancer', source: 'Stanford', type: 'cellxpress', category: 'Validation' },
  { id: 'out_Stanford_Orion_LN_all', name: 'Stanford Orion Lymph Node', source: 'Stanford', type: 'mesmer', category: 'Validation' },
  { id: 'out_Stanford_Orion_Lymph_node_cellXpress', name: 'Stanford Orion Lymph Node', source: 'Stanford', type: 'cellxpress', category: 'Validation' },

  // Validation - UK Kentucky
  { id: 'out_UKentucky_SCC_all', name: 'UK Kentucky SCC', source: 'UKentucky', type: 'mesmer', category: 'Validation' },
  { id: 'out_UKentucky_Skin_cellXpress', name: 'UK Kentucky SCC', source: 'UKentucky', type: 'cellxpress', category: 'Validation' },
  { id: 'out_UKentucky_Tonsil_all', name: 'UK Kentucky Tonsil', source: 'UKentucky', type: 'mesmer', category: 'Validation' },
  { id: 'out_UKentucky_Tonsil_cellXpress', name: 'UK Kentucky Tonsil', source: 'UKentucky', type: 'cellxpress', category: 'Validation' },

  // Special Experiments
  { id: 'out_LyophilizationTest_FigS2_all', name: 'Lyophilization Test (Fig S2)', source: 'Special', type: 'mesmer', category: 'Special Experiments' },
  { id: 'out_Reimagedslide_FigS5_all', name: 'Reimaged Slide (Fig S5)', source: 'Special', type: 'mesmer', category: 'Special Experiments' },
  { id: 'out_StorageConditionsExpt_all', name: 'Storage Conditions Experiment', source: 'Special', type: 'mesmer', category: 'Special Experiments' },
];

// Cache for fetched file lists
const fileCache = new Map();

// State
let currentConfig = null;
let currentFilter = 'all';

// Format type label for display (Title Case)
function formatTypeLabel(type) {
  const labels = {
    'mesmer': 'Mesmer',
    'cellxpress': 'CellXpress',
    'snr': 'SNR'
  };
  return labels[type] || type;
}

// DOM Elements
const configGrid = document.getElementById('config-grid');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');
const navLinks = document.querySelectorAll('.nav-link[data-view]');
const tabButtons = document.querySelectorAll('.tab-btn');
const backBtn = document.getElementById('back-btn');
const modal = document.getElementById('image-modal');
const modalClose = document.getElementById('modal-close');

// Initialize app
function init() {
  renderConfigGrid(CONFIGURATIONS);
  setupEventListeners();
}

// Setup all event listeners
function setupEventListeners() {
  // Search
  searchInput.addEventListener('input', handleSearch);

  // Filter buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => handleFilter(btn.dataset.filter));
  });

  // Navigation
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      switchView(link.dataset.view);
    });
  });

  // Tabs
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Back button
  backBtn.addEventListener('click', () => switchView('dashboard'));

  // Modal
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// Render configuration cards
function renderConfigGrid(configs) {
  const grouped = groupByCategory(configs);

  configGrid.innerHTML = Object.entries(grouped).map(([category, items]) => `
    <div class="config-category" data-category="${category}">
      <h3 class="category-title" style="grid-column: 1 / -1; color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: -0.5rem; padding-left: 0.25rem;">${category}</h3>
      ${items.map(config => `
        <div class="config-card" data-config="${config.id}">
          <div class="config-card-header">
            <span class="config-name">${config.name}</span>
            <span class="config-badge ${config.type}">${formatTypeLabel(config.type)}</span>
          </div>
          <div class="config-source">Source: ${config.source}</div>
        </div>
      `).join('')}
    </div>
  `).join('');

  // Add click handlers
  document.querySelectorAll('.config-card').forEach(card => {
    card.addEventListener('click', () => openResult(card.dataset.config));
  });
}

function groupByCategory(configs) {
  return configs.reduce((acc, config) => {
    if (!acc[config.category]) acc[config.category] = [];
    acc[config.category].push(config);
    return acc;
  }, {});
}

// Handle search input
function handleSearch() {
  const query = searchInput.value.toLowerCase();
  const filtered = CONFIGURATIONS.filter(config => {
    const matchesSearch = config.name.toLowerCase().includes(query) ||
      config.source.toLowerCase().includes(query) ||
      config.id.toLowerCase().includes(query);
    const matchesFilter = currentFilter === 'all' || config.type === currentFilter;
    return matchesSearch && matchesFilter;
  });
  renderConfigGrid(filtered);
}

// Handle filter button click
function handleFilter(filter) {
  currentFilter = filter;
  filterButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  handleSearch(); // Re-apply search with new filter
}

// Switch between main views
function switchView(viewId) {
  // Update nav links
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.view === viewId);
  });

  // Update views
  document.querySelectorAll('.view').forEach(view => {
    view.classList.toggle('active', view.id === `${viewId}-view`);
  });
}

// Open result detail view
async function openResult(configId) {
  const config = CONFIGURATIONS.find(c => c.id === configId);
  if (!config) return;

  currentConfig = config;

  // Update header
  document.getElementById('result-title').textContent = config.name;
  document.getElementById('result-badges').innerHTML = `
    <span class="config-badge ${config.type}">${formatTypeLabel(config.type)}</span>
    <span class="config-badge" style="background: var(--bg-tertiary); color: var(--text-secondary);">${config.source}</span>
    <span class="config-badge" style="background: var(--bg-tertiary); color: var(--text-secondary);">${config.category}</span>
  `;

  // Switch to result view
  document.querySelectorAll('.view').forEach(view => {
    view.classList.toggle('active', view.id === 'result-view');
  });

  // Reset tabs
  switchTab('figures');

  // Load files
  await loadResultFiles(configId);
}

// File lists for different config types
const MESMER_CELLXPRESS_FILES = [
  // Figures
  'Arcsinh_transformed_Hoechst_normalised_density_plots.svg',
  'Heatmap_mean_white_to_red.svg',
  'Heatmap_mean_zscore_blue_white_red.svg',
  'Heatmap_CV_zscore_purple_green.svg',
  'Heatmap_CV_raw_values.svg',
  'average_score_by_condition.svg',
  'combined_cv_ranks_heatmap.svg',
  'cv_heatmap_with_ranks.svg',
  'marker_score_heatmap.svg',
  // Data files
  'condition_summary.csv',
  'marker_summary.csv',
  'cv_values.csv',
  'cv_z_scores.csv',
  'cv_values_long.csv',
  'cv_z_scores_long.csv',
  'cv_ranks_and_scores.csv',
  'cv_ranks_wide.csv',
  'cv_scores_wide.csv',
  'mean_values.csv',
  'mean_z_scores.csv',
  'total_z_ranks.csv',
  'large_effect_results.csv',
  'wilcox_results.csv',
  'processed_files.csv',
  'config_summary.csv',
  'session_info.txt',
];

const SNR_FILES = [
  // SNR figures
  'SNR_barplot_means.svg',
  'SNR_heatmap_threshold.svg',
  'SNR_heatmap_zscore.svg',
  'SNR_heatmap_01normalized.svg',
  'SNR_heatmap_prenormalized.svg',
  'SNR_heatmap_zscore_of_01normed.svg',
  'SNR_heatmap_zscore_with_avg.svg',
  // SNR data files
  'processed_snr_data.csv',
  'marker_mean_snr.csv',
  'combined_weighted_snr.csv',
  'config_summary.csv',
];

// Load result files for a configuration
async function loadResultFiles(configId) {
  const basePath = `./public/data/${configId}`;
  const config = CONFIGURATIONS.find(c => c.id === configId);

  // Use appropriate file list based on config type
  const filesToCheck = config && config.type === 'snr'
    ? SNR_FILES
    : MESMER_CELLXPRESS_FILES;

  // Check which files exist
  const existingFiles = [];

  for (const file of filesToCheck) {
    try {
      const response = await fetch(`${basePath}/${file}`, { method: 'HEAD' });
      if (response.ok) {
        existingFiles.push(file);
      }
    } catch (e) {
      // File doesn't exist
    }
  }

  // Render figures
  const svgFiles = existingFiles.filter(f => f.endsWith('.svg'));
  renderFigures(basePath, svgFiles);

  // Populate table selector
  const csvFiles = existingFiles.filter(f => f.endsWith('.csv'));
  populateTableSelector(basePath, csvFiles);

  // Render downloads with all files
  renderDownloads(basePath, existingFiles, configId);
}

// Render figure grid
function renderFigures(basePath, files) {
  const figureGrid = document.getElementById('figure-grid');

  if (files.length === 0) {
    figureGrid.innerHTML = '<p class="placeholder-text">No figures available</p>';
    return;
  }

  figureGrid.innerHTML = files.map(file => `
    <div class="figure-card" data-file="${file}">
      <div class="figure-preview">
        <img src="${basePath}/${file}" alt="${formatFileName(file)}" loading="lazy" />
      </div>
      <div class="figure-info">
        <div class="figure-name">${formatFileName(file)}</div>
      </div>
    </div>
  `).join('');

  // Add click handlers for modal
  document.querySelectorAll('.figure-card').forEach(card => {
    card.addEventListener('click', () => {
      const file = card.dataset.file;
      openModal(`${basePath}/${file}`, file);
    });
  });
}

// Format file name for display
function formatFileName(filename) {
  return filename
    .replace('.svg', '')
    .replace('.csv', '')
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2');
}

// Populate table selector dropdown
function populateTableSelector(basePath, files) {
  const select = document.getElementById('table-select');
  select.innerHTML = `
    <option value="">Select a data file...</option>
    ${files.map(file => `<option value="${basePath}/${file}">${file}</option>`).join('')}
  `;

  // Reset table container
  document.getElementById('data-table-container').innerHTML = '<p class="placeholder-text">Select a CSV file to view data</p>';

  // Add change handler
  select.onchange = () => {
    if (select.value) {
      loadCSV(select.value);
    }
  };
}

// Load and parse CSV file
async function loadCSV(url) {
  const container = document.getElementById('data-table-container');
  container.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

  try {
    const response = await fetch(url);
    const text = await response.text();

    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data.length === 0) {
          container.innerHTML = '<p class="placeholder-text">No data in file</p>';
          return;
        }
        renderTable(results.data, results.meta.fields);
      },
      error: (error) => {
        container.innerHTML = `<p class="placeholder-text">Error parsing CSV: ${error.message}</p>`;
      }
    });
  } catch (error) {
    container.innerHTML = `<p class="placeholder-text">Error loading file: ${error.message}</p>`;
  }
}

// Render data table
function renderTable(data, columns) {
  const container = document.getElementById('data-table-container');

  // Limit rows for performance
  const displayData = data.slice(0, 500);
  const truncated = data.length > 500;

  container.innerHTML = `
    ${truncated ? `<p style="padding: 0.5rem 1rem; color: var(--text-muted); font-size: 0.75rem;">Showing first 500 of ${data.length} rows</p>` : ''}
    <table class="data-table">
      <thead>
        <tr>
          ${columns.map(col => `<th>${col}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${displayData.map(row => `
          <tr>
            ${columns.map(col => `<td>${row[col] ?? ''}</td>`).join('')}
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// Render download list
function renderDownloads(basePath, files, configId) {
  const downloadList = document.getElementById('download-list');

  const getIcon = (file) => {
    if (file.endsWith('.svg')) return { icon: '📊', type: 'svg' };
    if (file.endsWith('.csv')) return { icon: '📄', type: 'csv' };
    if (file.endsWith('.txt')) return { icon: '📝', type: 'txt' };
    return { icon: '📁', type: 'other' };
  };

  // Download All button (Zip file)
  const downloadAllBtn = `
    <a href="./public/data/${configId}.zip" download="${configId}.zip" class="download-all-btn" id="download-all-btn">
      <span class="download-all-icon">📦</span>
      <span>Download All Files (Zip Archive)</span>
    </a>
  `;

  const fileItems = files.map(file => {
    const { icon, type } = getIcon(file);
    return `
      <a href="${basePath}/${file}" download class="download-item">
        <div class="download-icon ${type}">${icon}</div>
        <div class="download-info">
          <div class="download-name">${file}</div>
        </div>
      </a>
    `;
  }).join('');

  downloadList.innerHTML = downloadAllBtn + fileItems;
}

// Switch between tabs
function switchTab(tabId) {
  tabButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `${tabId}-tab`);
  });
}

// Modal functions
function openModal(src, title) {
  const container = document.getElementById('modal-image-container');
  const modalTitle = document.getElementById('modal-title');

  container.innerHTML = `<img src="${src}" alt="${title}" />`;
  modalTitle.textContent = title;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// ============================================
// FOV GALLERY
// ============================================

// Gallery data - expandable for future images
const FOV_GALLERY_ITEMS = [
  {
    id: 'slide21_fov2',
    title: 'Slide 21 - FOV 2',
    description: 'Human tonsil tissue, 13-channel multiplexed imaging',
    image: './public/slide21_FOV2_preview.jpg',
    channels: 13,
    resolution: '7000 × 5500',
    size: '~1 GB (original)',
    pipeline: 'Mesmer'
  },
  // Add more items here as needed
];

let osdViewer = null;

// Render FOV Gallery
function renderFovGallery() {
  const galleryGrid = document.getElementById('fov-gallery-grid');
  if (!galleryGrid) return;

  galleryGrid.innerHTML = FOV_GALLERY_ITEMS.map(item => `
    <div class="fov-gallery-card" data-fov-id="${item.id}">
      <img src="${item.image}" alt="${item.title}" class="fov-gallery-card-image" loading="lazy" />
      <div class="fov-gallery-card-info">
        <div class="fov-gallery-card-title">${item.title}</div>
        <div class="fov-gallery-card-meta">
          ${item.channels} channels · ${item.resolution} · ${item.pipeline}
        </div>
      </div>
    </div>
  `).join('');

  // Add click handlers
  document.querySelectorAll('.fov-gallery-card').forEach(card => {
    card.addEventListener('click', () => {
      const item = FOV_GALLERY_ITEMS.find(i => i.id === card.dataset.fovId);
      if (item) openFovViewer(item);
    });
  });
}

// Open FOV Viewer with OpenSeadragon
function openFovViewer(item) {
  const modal = document.getElementById('fov-viewer-modal');
  const titleEl = document.getElementById('fov-viewer-title');
  const infoEl = document.getElementById('fov-viewer-info');
  const container = document.getElementById('fov-viewer-container');

  titleEl.textContent = item.title;
  infoEl.innerHTML = `
    <strong>Description:</strong> ${item.description} · 
    <strong>Channels:</strong> ${item.channels} · 
    <strong>Resolution:</strong> ${item.resolution} · 
    <strong>Original Size:</strong> ${item.size}
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Destroy previous viewer if exists
  if (osdViewer) {
    osdViewer.destroy();
    osdViewer = null;
  }

  // Initialize OpenSeadragon
  osdViewer = OpenSeadragon({
    id: 'fov-viewer-container',
    prefixUrl: 'https://cdn.jsdelivr.net/npm/openseadragon@4.1/build/openseadragon/images/',
    tileSources: {
      type: 'image',
      url: item.image
    },
    showNavigationControl: true,
    showNavigator: true,
    navigatorPosition: 'BOTTOM_RIGHT',
    navigatorSizeRatio: 0.15,
    minZoomLevel: 0.5,
    maxZoomLevel: 10,
    visibilityRatio: 0.5,
    constrainDuringPan: true,
    animationTime: 0.5,
    blendTime: 0.1,
    springStiffness: 6.5
  });
}

// Close FOV Viewer
function closeFovViewer() {
  const modal = document.getElementById('fov-viewer-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';

  if (osdViewer) {
    osdViewer.destroy();
    osdViewer = null;
  }
}

// Setup FOV Gallery event listeners
function setupFovGalleryListeners() {
  const closeBtn = document.getElementById('fov-viewer-close');
  const modal = document.getElementById('fov-viewer-modal');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeFovViewer);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeFovViewer();
    });
  }

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('fov-viewer-modal');
      if (modal && modal.classList.contains('active')) {
        closeFovViewer();
      }
    }
  });
}

// Initialize FOV Gallery on page load
document.addEventListener('DOMContentLoaded', () => {
  renderFovGallery();
  setupFovGalleryListeners();
});

// Start the app
init();
