import puppeteer from 'puppeteer';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const storeAssetsDir = 'H:/web3/iota-wallet/iota-wallet/docs/store-assets';
const publicAssetsDir = 'H:/web3/iota-wallet/website/public/assets';
const favPath = 'H:/web3/iota-wallet/website/public/favicon192.png';
const favB64 = readFileSync(favPath).toString('base64');
const favDataUri = `data:image/png;base64,${favB64}`;

async function main() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  async function convertPngToWebp(srcPngPath, destWebpPath, width, height) {
    const pngBuf = readFileSync(srcPngPath);
    const dataUri = `data:image/png;base64,${pngBuf.toString('base64')}`;

    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.setContent(`<!DOCTYPE html><html><body style="margin:0;padding:0;overflow:hidden;background:transparent;"><img src="${dataUri}" style="width:${width}px;height:${height}px;display:block;" /></body></html>`);
    const webpBuf = await page.screenshot({ type: 'webp', quality: 92, omitBackground: true });
    writeFileSync(destWebpPath, webpBuf);
    console.log(`Converted ${srcPngPath} -> ${destWebpPath} (${webpBuf.length} bytes)`);
  }

  // 1. Batch Send
  await convertPngToWebp(
    join(storeAssetsDir, 'real_batch_send.png'),
    join(publicAssetsDir, 'batch.webp'),
    360,
    600
  );

  // 2. Bridge
  await convertPngToWebp(
    join(storeAssetsDir, 'real_bridge.png'),
    join(publicAssetsDir, 'bridge.webp'),
    360,
    600
  );

  // 3. Address Book
  await convertPngToWebp(
    join(storeAssetsDir, 'real_address_book.png'),
    join(publicAssetsDir, 'addressbook1.webp'),
    360,
    600
  );

  // 4. Staking Standalone Popup (375x640)
  await page.setViewport({ width: 375, height: 640, deviceScaleFactor: 2 });
  await page.setContent(`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 375px; height: 640px; background: transparent;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: white; overflow: hidden; display: flex; align-items: center; justify-content: center;
  }
  .phone-mock {
    width: 375px; height: 640px; background: #0b1221;
    border: 2px solid #1e293b; border-radius: 28px;
    box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.85), 0 0 30px rgba(56, 189, 248, 0.15);
    overflow: hidden; display: flex; flex-direction: column; padding: 22px 18px;
  }
  .top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
  .profile-badge { background: #1e293b; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; color: #93c5fd; display: flex; align-items: center; gap: 6px; }
  .bal-section { text-align: center; margin-bottom: 22px; }
  .bal-usd { font-size: 32px; font-weight: 800; margin-bottom: 4px; color: #ffffff; }
  .bal-iota { font-size: 13px; color: #38bdf8; font-weight: 600; }
  .actions { display: flex; justify-content: space-around; margin-bottom: 24px; }
  .act-btn { display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .act-circle { width: 44px; height: 44px; border-radius: 50%; background: #1e293b; border: 1px solid #334155; display: flex; align-items: center; justify-content: center; color: #38bdf8; font-size: 16px; }
  .act-label { font-size: 11px; color: #94a3b8; }
  .list-title { font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
  .list-card { background: #111827; border: 1px solid #1e293b; border-radius: 14px; padding: 12px 14px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
  .coin-name { font-weight: 700; font-size: 13.5px; }
  .coin-sub { font-size: 11px; color: #64748b; }
  .coin-val { text-align: right; font-weight: 700; font-size: 13.5px; color: #4ade80; }
  .coin-val-sub { font-size: 11px; color: #64748b; }
</style>
</head>
<body>
  <div class="phone-mock">
    <div class="top-bar">
      <div class="profile-badge">
        <img src="${favDataUri}" style="width:16px;height:16px;border-radius:4px;" />
        Account 1 (Main)
      </div>
      <div style="font-size:12px;color:#64748b;font-weight:600;">Mainnet</div>
    </div>
    <div class="bal-section">
      <div class="bal-usd">28,500.00 IOTA</div>
      <div class="bal-iota">Active Staking Pool (5.21% Max APY)</div>
    </div>
    <div class="actions">
      <div class="act-btn"><div class="act-circle">↑</div><div class="act-label">Send</div></div>
      <div class="act-btn"><div class="act-circle">↓</div><div class="act-label">Receive</div></div>
      <div class="act-btn"><div class="act-circle">🌉</div><div class="act-label">Bridge</div></div>
      <div class="act-btn"><div class="act-circle" style="background:#0284c7;color:white;border-color:#38bdf8;">🥩</div><div class="act-label" style="color:#38bdf8;font-weight:600;">Stake</div></div>
    </div>
    <div class="list-title">Top Active Validators</div>
    <div class="list-card">
      <div>
        <div class="coin-name">IOTA Foundation 01</div>
        <div class="coin-sub">Commission: 2.0%</div>
      </div>
      <div>
        <div class="coin-val">5.21% APY</div>
        <div class="coin-val-sub">Active • Compounding</div>
      </div>
    </div>
    <div class="list-card">
      <div>
        <div class="coin-name">Tangle Labs Validator</div>
        <div class="coin-sub">Commission: 1.5%</div>
      </div>
      <div>
        <div class="coin-val">5.14% APY</div>
        <div class="coin-val-sub">Active • Compounding</div>
      </div>
    </div>
    <div class="list-card">
      <div>
        <div class="coin-name">Community Node Alpha</div>
        <div class="coin-sub">Commission: 3.0%</div>
      </div>
      <div>
        <div class="coin-val">4.95% APY</div>
        <div class="coin-val-sub">Active • Compounding</div>
      </div>
    </div>
  </div>
</body>
</html>`);
  const stakingBuf = await page.screenshot({ type: 'webp', quality: 94, omitBackground: true });
  writeFileSync(join(publicAssetsDir, 'staking.webp'), stakingBuf);
  console.log(`Generated staking.webp (${stakingBuf.length} bytes)`);

  // 5. Side Panel Standalone Mockup (440x600)
  // Showing a simulated browser window with the side panel docked on the right
  await page.setViewport({ width: 500, height: 600, deviceScaleFactor: 2 });
  await page.setContent(`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 500px; height: 600px; background: transparent;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: white; overflow: hidden; display: flex; align-items: center; justify-content: center;
  }
  .browser-mock {
    width: 480px; height: 560px; background: #070d18;
    border: 2px solid #1e293b; border-radius: 20px;
    box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(56, 189, 248, 0.2);
    overflow: hidden; display: flex; flex-direction: column;
  }
  .browser-header {
    background: #0b1221; padding: 10px 14px;
    display: flex; align-items: center; gap: 8px; border-bottom: 1px solid #1e293b;
  }
  .dots { display: flex; gap: 6px; }
  .dot { width: 9px; height: 9px; border-radius: 50%; }
  .dot-r { background: #ef4444; }
  .dot-y { background: #eab308; }
  .dot-g { background: #22c55e; }
  .url-bar {
    margin-left: 12px; flex: 1; background: #111827; border: 1px solid #1e293b;
    border-radius: 6px; padding: 4px 10px; font-size: 10.5px; color: #94a3b8;
  }
  .browser-body {
    flex: 1; display: flex; overflow: hidden;
  }
  .dapp-area {
    flex: 1.1; background: #090e17; padding: 20px;
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    border-right: 2px solid #1e293b; text-align: center;
  }
  .dapp-icon {
    width: 48px; height: 48px; border-radius: 14px; background: linear-gradient(135deg, #0284c7, #38bdf8);
    display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 12px;
  }
  .dapp-title { font-size: 15px; font-weight: 700; margin-bottom: 4px; }
  .dapp-sub { font-size: 11px; color: #64748b; max-width: 160px; line-height: 1.4; margin-bottom: 14px; }
  .dapp-badge {
    background: rgba(34, 197, 94, 0.15); border: 1px solid rgba(34, 197, 94, 0.3);
    color: #4ade80; font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 20px;
  }
  .sidepanel-area {
    flex: 1.3; background: #0b1221; padding: 14px; display: flex; flex-direction: column;
  }
  .sp-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
  .sp-badge { font-size: 11px; font-weight: 700; color: #38bdf8; display: flex; align-items: center; gap: 4px; }
  .sp-bal { background: #111827; border: 1px solid #1e293b; border-radius: 12px; padding: 12px; margin-bottom: 12px; text-align: center; }
  .sp-bal-val { font-size: 20px; font-weight: 800; color: white; margin-bottom: 2px; }
  .sp-bal-sub { font-size: 10px; color: #64748b; }
  .sp-btn {
    background: #0284c7; color: white; font-size: 11px; font-weight: 600;
    padding: 8px; border-radius: 8px; text-align: center; margin-top: auto;
  }
  .sp-row {
    display: flex; justify-content: space-between; font-size: 11px;
    padding: 8px 10px; background: #111827; border: 1px solid #1e293b; border-radius: 8px; margin-bottom: 6px;
  }
</style>
</head>
<body>
  <div class="browser-mock">
    <div class="browser-header">
      <div class="dots">
        <div class="dot dot-r"></div>
        <div class="dot dot-y"></div>
        <div class="dot dot-g"></div>
      </div>
      <div class="url-bar">🔒 app.iota-dex.org/swap</div>
    </div>
    <div class="browser-body">
      <div class="dapp-area">
        <div class="dapp-icon">⚡</div>
        <div class="dapp-title">IOTA DeFi DEX</div>
        <div class="dapp-sub">Swapping 1,000 IOTA for wUSDT</div>
        <div class="dapp-badge">● Connected (EIP-1193)</div>
      </div>
      <div class="sidepanel-area">
        <div class="sp-top">
          <div class="sp-badge">
            <img src="${favDataUri}" style="width:14px;height:14px;border-radius:3px;" />
            SIDE PANEL
          </div>
          <div style="font-size:10px;color:#4ade80;font-weight:600;">ACTIVE</div>
        </div>
        <div class="sp-bal">
          <div class="sp-bal-val">42,150.00</div>
          <div class="sp-bal-sub">IOTA (L1 Move) Available</div>
        </div>
        <div class="sp-row">
          <span style="color:#94a3b8;">Network:</span>
          <span style="font-weight:600;color:#38bdf8;">IOTA Mainnet</span>
        </div>
        <div class="sp-row">
          <span style="color:#94a3b8;">Side Dock:</span>
          <span style="font-weight:600;color:#4ade80;">Persistent</span>
        </div>
        <div class="sp-row">
          <span style="color:#94a3b8;">Est. Gas:</span>
          <span style="font-weight:600;">0.00001 IOTA</span>
        </div>
        <div class="sp-btn">Sign Transaction</div>
      </div>
    </div>
  </div>
</body>
</html>`);
  const sidepanelBuf = await page.screenshot({ type: 'webp', quality: 94, omitBackground: true });
  writeFileSync(join(publicAssetsDir, 'sidepanel.webp'), sidepanelBuf);
  console.log(`Generated sidepanel.webp (${sidepanelBuf.length} bytes)`);

  await browser.close();
  console.log('All custom webp mockups completed!');
}

main().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
