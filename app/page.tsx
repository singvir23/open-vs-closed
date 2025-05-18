'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styles from './page.module.css';

// Define the structure for each gallery item
interface GalleryItemData {
  id: string;
  title: string;
  description: string;
  narrativeType: 'genesis' | 'mixed' | 'closed' | 'community_reversal' | 'subversion';
}

// Gallery labels with apostrophes escaped
const exhibitItems: GalleryItemData[] = [
  {
    id: 'linux',
    title: 'Linux, 1991',
    description: `Linus Torvalds

Linux is the epitome of open-source. Created by a Finnish university student in 1991, it is a free and open-source operating system. Unlike propriety operating systems (think Windows or macOS), it allows for anyone to view and modify its source code. Over time, Linux became the base for many operating systems we see today, such as Android. It is the cornerstone of modern infrastructure, built by a collaborative community. The creation of Linux represents the true power of an open-source software. Many tech giants such as Google, Meta, and Amazon utilize Linux for at least one of their products. On the other hand, a hobbyist programmer is using the same exact operating system in their basement. Linux highlights the longevity, adaptability, and reach that open source software can have.

Gallery label by Viraaj Singh, '27`, // Escaped apostrophe
    narrativeType: 'genesis',
  },
  {
    id: 'android',
    title: 'Android OS, 2008',
    description: `Andy Rubin and Chris White

The Android Operating System is an open-source OS developed by Google on the Linux Kernel. Android's source code is publicly available, allowing users and developers to inspect, modify, and build on it. This openness opens the door to innovation. It fosters an ecosystem for building that helps grow the technology at a much faster pace. Yet, even within open-source environments, companies often add closed elements. Still, Android's core displays how open-source software fosters collaboration and transparency. It is in contrast to closed-source systems like the Wii, both highlighting different philosophies of control and access.

Gallery label by Viraaj Singh, '27`, // Escaped apostrophes
    narrativeType: 'mixed',
  },
  {
    id: 'wii',
    title: 'Wii, 2006',
    description: `Nintendo

The Nintendo Wii is an example of a closed-source platform. Nintendo has developed proprietary software and hardware, restricting outside modification or use beyond official licensing. No users or developers can access the system’s code or internal hardware. This approach ensures brand protection and profit control, but it also creates barriers for preservation, study, and expansion. The Wii represents how closed systems prioritize corporate control over community collaboration. However, the closed nature of the Wii has inspired projects like the Dolphin Emulator, which aim to create a one-to-one emulation of the system.

Gallery label by Viraaj Singh, '27`, // Escaped apostrophe
    narrativeType: 'closed',
  },
  {
    id: 'dolphin',
    title: 'Dolphin Emulator, 2003',
    description: `Henrik Rydgård (ector) and F|RES

Dolphin is an open-source emulator for Nintendo's GameCube and Wii. It allows users to play games from these closed systems on their personal computers. Created by a group of volunteers, Dolphin operates outside of Nintendo's proprietary control, relying on reverse engineering and community contributions. It showcases how open-source tools can recreate and improve closed-source platforms. Dolphin offers better graphics, accessibility features, and many other features that the original system didn't. Dolphin is more than a technical achievement; it is a cultural bridge, keeping closed-source software running and playable long after the official support ends. In doing so, it highlights the power of open communities in unlocking and improving closed technologies.

Gallery label by Viraaj Singh, '27`, // Escaped apostrophes
    narrativeType: 'community_reversal',
  },
  {
    id: 'hackintosh',
    title: 'The Hackintosh, Mid 2000’s',
    description: `Unknown

The “Hackintosh” concept takes Apple's macOS and runs it on a non-Apple machine. Apple has a “closed-source” methodology, meaning that all of their products can only operate with other Apple products. The Hackintosh completely breaks this notion. The reason this works, without getting too technical, is because Apple switched to Intel chips in the mid-2000s. This switch made it technically possible to run macOS on any Intel computer with certain workarounds. Like Dolphin, the Hackintosh is yet another example of a closed-source software being run on an open-source machine.

Gallery label by Viraaj Singh, '27`, // Escaped apostrophes
    narrativeType: 'subversion',
  },
];

// --- Interactive Components ---
// Linux: Editable script
const LinuxInteractive: React.FC = () => {
  const [scriptContent, setScriptContent] = useState<string>('#!/bin/bash\necho "Welcome to the Open Source Terminal!"\n\n# Freely explore and modify commands.\ndf -h / \n\nwhoami\n# What will you create today?');
  const [output, setOutput] = useState<string>('');

  const handleRunScript = () => {
    let simulatedOutput = `Simulating script execution...\n---\n${scriptContent}\n---\nOutput:\nWelcome to the Open Source Terminal!\n`;
    if (scriptContent.includes("df -h /")) {
        simulatedOutput += `Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        50G   20G   28G  42% /\n`;
    }
    if (scriptContent.includes("whoami")) {
        simulatedOutput += `user_community\n`;
    }
    simulatedOutput += `Process completed at ${new Date().toLocaleTimeString()}`;
    setOutput(simulatedOutput);
    setTimeout(() => setOutput(''), 7000);
  };

  return (
    <div className={styles.interactiveConsole}>
      <label htmlFor="linuxScript" className={styles.interactiveLabel}>Interactive Shell (Editable)</label>
      <textarea
        id="linuxScript"
        value={scriptContent}
        onChange={(e) => setScriptContent(e.target.value)}
        rows={8}
        className={styles.codeEditor}
        spellCheck="false"
      />
      <button onClick={handleRunScript} className={styles.actionButton}>Execute Script</button>
      {output && <pre className={styles.consoleOutput}>{output}</pre>}
    </div>
  );
};

// Android: App drawer
interface AppItem { id: number; name: string; type: 'user' | 'system'; icon: string; }
const AndroidInteractive: React.FC<{ showMessage: (msg: string) => void }> = ({ showMessage }) => {
  const initialApps: AppItem[] = [
    { id: 1, name: 'Gallery', type: 'user', icon: '🖼️' }, { id: 2, name: 'Open Web', type: 'user', icon: '🌐' },
    { id: 3, name: 'System Core', type: 'system', icon: '⚙️' }, { id: 4, name: 'Dialer', type: 'system', icon: '📞' },
    { id: 5, name: 'FOSS Player', type: 'user', icon: '🎶' },{ id: 6, name: 'Proprietary Store', type: 'system', icon: '🛍️' },
  ];
  const [apps, setApps] = useState<AppItem[]>(initialApps);
  const handleAppClick = (app: AppItem) => {
    if (app.type === 'user') {
      setApps(prevApps => prevApps.filter(a => a.id !== app.id));
      showMessage(`User app "${app.name}" removed. You have control.`);
    } else {
      showMessage(`"${app.name}" is a System/Proprietary app. Removal restricted by the platform.`);
    }
  };
  return (
    <div className={styles.androidHomeScreen}>
      <p className={styles.interactiveHint}>Interact with the app drawer. Some apps are user-removable, others are part of the proprietary layer.</p>
      <div className={styles.appGrid}>
        {apps.map(app => (
          <div key={app.id} className={styles.appIcon} onClick={() => handleAppClick(app)} title={app.name}>
            <span className={styles.appIconVisual}>{app.icon}</span>
            <span className={styles.appIconLabel}>{app.name}</span>
            {app.type === 'system' && <span className={styles.systemAppLock}>🔒</span>}
          </div>
        ))}
      </div>
      {apps.length < initialApps.length && (
        <button onClick={() => setApps(initialApps)} className={`${styles.actionButton} ${styles.androidResetButton}`}>Restore Apps</button>
      )}
    </div>
  );
};

// Wii: Mock menu
const WiiInteractive: React.FC<{ showMessage: (msg: string) => void }> = ({ showMessage }) => {
  const channels = ['Disc Channel', 'Mii Central', 'Photo Viewer', 'Shopping Portal', 'Weather Service'];
  const handleClickChannel = (channelName: string) => {
    showMessage(`Access Restricted.\nThe "${channelName}" is part of a closed system. Modifications and deeper access require circumventing manufacturer controls.`);
  };
  return (
    <div className={styles.wiiMenu}>
      <p className={styles.interactiveHint}>This represents a locked-down console menu. Try accessing channels.</p>
      {channels.map(channel => (
        <button key={channel} onClick={() => handleClickChannel(channel)} className={styles.wiiChannelButton}>
          {channel}
        </button>
      ))}
      <div className={styles.wiiDisclaimer}>
        <p>This corporate system dictates usage. True ownership is limited.</p>
      </div>
    </div>
  );
};

// Dolphin: Emulator settings
const DolphinInteractive: React.FC = () => {
  const [resolution, setResolution] = useState<string>('1080p');
  const [filter, setFilter] = useState<string>('none');
  const [enhancements, setEnhancements] = useState<string[]>(['Widescreen Patch', 'Force 16:9']);
  const handleEnhancementToggle = (enh: string) => { setEnhancements(prev => prev.includes(enh) ? prev.filter(e => e !== enh) : [...prev, enh]); };
  
  const getPreviewStyle = () => {
    const style: React.CSSProperties = { // FIXED: prefer-const
        transition: 'all 0.3s ease-in-out',
        backgroundImage: `url("https://via.placeholder.com/320x192/${filter === 'sepia' ? 'D2B48C/6A4F2A' : '555/eee'}?text=Game+Output")`,
        backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
        filter: '', transform: 'scale(1)',
    };
    const activeFilters: string[] = []; // FIXED: prefer-const
    if (filter === 'blur') activeFilters.push('blur(1px)');
    if (filter === 'sharpen') activeFilters.push('contrast(1.1)');
    style.filter = activeFilters.join(' ');
    if (resolution === '480p') style.transform = 'scale(0.8)';
    if (resolution === '720p') style.transform = 'scale(0.9)';
    if (resolution === '4k') style.transform = 'scale(1.1)';
    return style;
  };

  return (
    <div className={styles.dolphinSettings}>
      <div className={styles.settingsControls}>
        <div>
            <label htmlFor="resolution" className={styles.interactiveLabel}>Render Resolution:</label>
            <select id="resolution" value={resolution} onChange={e => setResolution(e.target.value)} className={styles.settingsDropdown}>
            <option value="480p">Original (480p)</option><option value="720p">HD (720p)</option>
            <option value="1080p">Full HD (1080p)</option><option value="4k">Ultra HD (4K)</option>
            </select>
        </div>
        <div>
            <label htmlFor="filter" className={styles.interactiveLabel}>Visual Filter:</label>
            <select id="filter" value={filter} onChange={e => setFilter(e.target.value)} className={styles.settingsDropdown}>
            <option value="none">None</option><option value="blur">Soft Focus</option>
            <option value="sepia">Vintage Look</option><option value="sharpen">Crisp Detail</option>
            </select>
        </div>
        <div>
            <label className={styles.interactiveLabel}>Community Enhancements:</label>
            <div className={styles.checkboxGroup}>
                {['Widescreen Patch', 'Force 16:9', 'Texture Packs', 'Shader Improvements'].map(enh => (
                    <label key={enh} className={styles.checkboxLabel}>
                        <input type="checkbox" checked={enhancements.includes(enh)} onChange={() => handleEnhancementToggle(enh)} /> {enh}
                    </label>
                ))}
            </div>
        </div>
      </div>
      <div className={styles.dolphinPreview} style={getPreviewStyle()}>
        <p className={styles.previewText}>
            Output: {resolution}
            {filter !== 'none' ? `, Filter: ${filter.charAt(0).toUpperCase() + filter.slice(1)}` : ''}
            {enhancements.length > 0 ? <><br/>Active Mods: {enhancements.join(' & ')}</> : ''}
        </p>
      </div>
      <p className={styles.interactiveHint}>Emulation empowers users to redefine and enhance past experiences.</p>
    </div>
  );
};

// Hackintosh: Editable config.plist
const HackintoshInteractive: React.FC<{ showMessage: (msg: string) => void }> = ({ showMessage }) => {
  const [configContent, setConfigContent] = useState<string>(
`<plist version="1.0">
  <dict>
    <key>PlatformInfo</key>
    <dict>
      <key>Generic</key>
      <dict>
        <key>MLB</key><string>C020321094NFDPC8Z</string> <!-- Example MLB -->
        <key>SystemProductName</key><string>iMacPro1,1</string>
        <key>SystemSerialNumber</key><string>C02XFY00JYVX</string>
        <key>SystemUUID</key><string>E4D2B0A0-XXXX-YYYY-ZZZZ-ABCDEF123456</string>
      </dict>
    </dict>
    <key>NVRAM</key>
    <dict>
      <key>Add</key>
      <dict>
        <key>7C436110-AB2A-4BBB-A880-FE41995C9F82</key> <!-- Boot Args & SIP -->
        <dict>
          <key>boot-args</key><string>-v debug=0x100 keepsyms=1 alcid=1</string>
          <key>csr-active-config</key><data>5wMAAA==</data> <!-- SIP Partially Disabled -->
        </dict>
      </dict>
    </dict>
    <!-- Modify kext patches and boot arguments to achieve system stability. -->
  </dict>
</plist>`
  );
  const handleValidate = () => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(configContent, "application/xml");
      const parserErrorNode = xmlDoc.querySelector("parsererror");
      if (parserErrorNode) {
        const errorDetails = parserErrorNode.textContent || "Invalid XML structure.";
        showMessage(`Configuration Error: ${errorDetails.split('\n')[0]}\nCareful editing required for subversion.`);
      } else {
        showMessage('Configuration Validated: This plist structure is acceptable.\nThe path to a functional Hackintosh is paved with such meticulous edits.');
      }
    } catch (e: unknown) { // FIXED: Changed from 'any' to 'unknown'
        if (e instanceof Error) {
            showMessage(`Parsing Exception: ${e.message}`); 
        } else {
            showMessage(`An unknown parsing exception occurred.`);
        }
    }
  };
  return (
    <div className={styles.interactiveConsole}>
      <label htmlFor="hackintoshConfig" className={styles.interactiveLabel}>OpenCore `config.plist` Editor</label>
      <textarea
        id="hackintoshConfig"
        value={configContent}
        onChange={(e) => setConfigContent(e.target.value)}
        rows={12}
        className={`${styles.codeEditor} ${styles.xmlEditor}`}
        spellCheck="false"
      />
      <button onClick={handleValidate} className={styles.actionButton}>Validate Configuration</button>
       <p className={styles.interactiveHint}>Subverting closed hardware ecosystems requires deep technical understanding and community collaboration.</p>
    </div>
  );
};
// --- End of Interactive Components ---

export default function GalleryPage() {
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const showMessage = useCallback((msg: string) => {
    setModalMessage(msg);
  }, []);

  const closeModal = () => {
    setModalMessage(null);
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);

    const setRgbVar = (cssVarName: string, rgbCssVarName: string) => {
        try {
            if (typeof window === 'undefined' || typeof document === 'undefined') return;
            const colorVal = getComputedStyle(document.documentElement).getPropertyValue(cssVarName).trim();
            let r=0, g=0, b=0;
            if (colorVal.startsWith('#')) {
                const hex = colorVal.substring(1);
                if (hex.length === 3) {
                    r = parseInt(hex[0] + hex[0], 16); g = parseInt(hex[1] + hex[1], 16); b = parseInt(hex[2] + hex[2], 16);
                } else if (hex.length === 6) {
                    r = parseInt(hex.substring(0,2), 16); g = parseInt(hex.substring(2,4), 16); b = parseInt(hex.substring(4,6), 16);
                }
                document.documentElement.style.setProperty(rgbCssVarName, `${r}, ${g}, ${b}`);
            } else if (colorVal.startsWith('rgb')) { 
                 const parts = colorVal.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
                 if (parts) {
                    document.documentElement.style.setProperty(rgbCssVarName, `${parts[1]}, ${parts[2]}, ${parts[3]}`);
                 }
            }
        } catch (error) {
            console.error(`Error setting RGB variable for ${cssVarName}:`, error);
        }
    };
    
    setRgbVar('--card-background', '--rgb-card-background');
    setRgbVar('--danger-accent', '--danger-accent-rgb');

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const renderInteractiveElement = (item: GalleryItemData) => {
    switch (item.id) {
      case 'linux': return <LinuxInteractive />;
      case 'android': return <AndroidInteractive showMessage={showMessage} />;
      case 'wii': return <WiiInteractive showMessage={showMessage} />;
      case 'dolphin': return <DolphinInteractive />;
      case 'hackintosh': return <HackintoshInteractive showMessage={showMessage} />;
      default: return <p>Interactive element coming soon.</p>;
    }
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Exhibit</h1>
        

        <p className={styles.pageSubtitle}>
          I tried to create a Minimum Viable Product, or MVP, of my exhibit. My goal was for the viewer to truly feel the difference between open and closed source. I did this by allowing the viewer to tinker with the open-source items much more than the closed source. It highlights the difference between the two and also makes the exhibit interactive, which is a great way to engage viewers. The scripts kinda work, but they aren&apos;t 1-1 replicas. That would have been a lot more coding on my part, and it would also be extremely daunting for someone who has never coded. 
        
          If I had my ideal situation, I would want these script executers to be on the actual machine. For instance, on Android, allow the viewer to interact with an actual Android phone. The devices would have to be signficantly restricted to remain within the scope of the exhibit, but I think it would be amazing to have the device I am referring to.
        </p>

      </header>

      <main className={styles.gallery}>
        {exhibitItems.map(item => (
          <section key={item.id} className={`${styles.galleryItem} ${styles[item.narrativeType]}`}>
            <div className={styles.itemContent}>
              {renderInteractiveElement(item)}
            </div>
            <div className={styles.itemLabel}>
              <h2 className={styles.itemTitle}>{item.title}</h2>
              <p className={styles.itemDescription}>{item.description}</p>
            </div>
          </section>
        ))}
      </main>

      {modalMessage && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalCloseButton} onClick={closeModal} aria-label="Close modal">×</button>
            {modalMessage}
          </div>
        </div>
      )}
    </div>
  );
}