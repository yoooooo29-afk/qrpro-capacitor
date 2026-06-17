/* ========================================
   QR Pro - Version 1 Safe Ad Handler
   No real ads in first Play Store release
   ======================================== */

const ADMOB_APP_ID = 'ca-app-pub-2306326089880204~8320696926';

async function initAdMob() {
  console.log('AdMob App ID configured for future use:', ADMOB_APP_ID);
  console.log('Version 1: Ads disabled. Real ads will be added after Play Store listing.');
  hideBannerAd();
  return false;
}

async function showBannerAd() {
  hideBannerAd();
  return false;
}

async function hideBannerAd() {
  const el = document.getElementById('admob-banner');
  if (el) el.classList.remove('active');
}

async function toggleAds(show) {
  const s = JSON.parse(localStorage.getItem('qrpro_settings') || '{}');
  s.showAds = false;
  localStorage.setItem('qrpro_settings', JSON.stringify(s));
  hideBannerAd();
}

function setupAdListeners() {
  const toggle = document.getElementById('setting-show-ads');
  if (toggle) {
    toggle.checked = false;
    toggle.disabled = true;
    toggle.addEventListener('change', async () => {
      await toggleAds(false);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(async () => {
    await initAdMob();
    setupAdListeners();
  }, 1000);
});

window.AdMob = {
  initAdMob,
  showBannerAd,
  hideBannerAd,
  toggleAds,
  config: {
    appId: ADMOB_APP_ID,
    adsEnabled: false,
    version: 'v1-no-ads'
  }
};