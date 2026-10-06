/* ==========================================================================
   CRAFTEX NETWORK LITE: YOUR SITE'S CONTENT LIVES HERE
   Edit this file, save, and refresh the site. No other file needs changing.
   The text below is starter content: read it through and change anything that
   doesn't match your server (especially the Rules, Commands and FAQ).
   Write text inside backticks ` ` so it can span many lines.
   ========================================================================== */
window.CRAFTEX = {

  /* ---- Basic settings ---- */
  site: {
    name: "Craftex Network",
    serverIp: "mc.rexd.space",              // Java Edition address
    bedrockHost: "mc.rexd.space",           // Bedrock address (empty = hide Bedrock everywhere)
    bedrockPort: 19132,
    websiteUrl: "https://craftex.rexd.space/",
    discordUrl: "https://discord.gg/veGhbJtj68",
    communityUrl: "",                       // optional extra link on the Community page
    minecraftVersion: "",                   // e.g. "1.21" (shown as "Recommended version"; empty = hidden)
    description: "A cross-platform survival world built for everyone. Join adventurers across Java and Bedrock - no premium account required.",
    homeNewsCount: 3,                       // how many news posts the homepage shows
    liveStatus: true                        // false = don't check the server's online status
  },

  /* ---- Theme colours (optional). Leave a value empty to use the built-in logo colours ---- */
  theme: {
    accent: "",        // main colour, e.g. "#2fe3d0" (aqua, from the logo)
    accent2: "",       // second colour, e.g. "#3ddc5a" (green, from the logo)
    accent3: "",       // light highlight, e.g. "#9ff8f4"
    background: ""     // page background, e.g. "#040a18"
  },

  /* ---- Discord member count (shown on the homepage, Community page, footer and menu) ----
     The invite code is read from site.discordUrl automatically. Use a PERMANENT invite (never expires),
     otherwise the count disappears. showCount: false hides it everywhere.
     Optional fallback: turn on "Server Widget" in Discord (Server Settings > Widget) and paste the server ID in guildId. */
  discord: {
    showCount: true,
    inviteCode: "",    // leave empty to auto-detect from discordUrl
    guildId: ""        // optional: only needed for the widget fallback (shows online count only)
  },

  /* ---- Timeline page (timeline.html) ----
     date        = YYYY-MM-DD (used for sorting). label = optional text shown instead of the date, e.g. "Season 2 · Spring"
     tag         = small badge (optional). image = optional picture path. draft: true hides an event.
     order       = "oldest" (story reads top to bottom) or "newest" */
  timeline: {
    title: "Timeline",
    intro: "The Journey So Far",
    order: "oldest",
    // These events have no dates yet, so they show in the order listed. Add date: "YYYY-MM-DD" to every event if you want them sorted by date.
    events: [
      { label: "Launch", title: "CraftexSMP goes live", tag: "Milestone",
        description: "The world generated, spawn was carved, and the first players staked their claim under the clear blue sky." },
      { label: "Update 1.1", title: "Bedrock crossplay added", tag: "Major update",
        description: "The GeyserMC bridge went live, and Java and Bedrock players were merged into a single shared world for the first time." },
      { label: "Community", title: "RIP Discord passes 50 members", tag: "Community",
        description: "What started as a small friend group became a community with its own culture, events and economy." },
      { label: "Update 1.4", title: "Player marketplace opens", tag: "Major update",
        description: "A dedicated auction house system, letting players sell items and set their own prices." },
      { label: "Update 1.8", title: "Winter Update", tag: "Major update",
        description: "An update made for the winter season, with its own exclusive events and perks." },
      { label: "Update 2.0", title: "Revamp Update", tag: "Global update",
        description: "A dedicated lobby and events world, with extra measures to improve the security and performance of the server." },
      { label: "Update 2.1", title: "Revamp Update v2", tag: "Major update",
        description: "Better performance, smoother game mechanics and easier access, for the best possible environment for players." },
      { label: "Update 3.0", title: "Anarchy Update", tag: "Global update",
        description: "Added the CraftexAnarchy server, with no rules except one: no hacks or hacked clients." },
      { label: "Update 3.1", title: "Welcome CraftexExtras & Bye Bye, Anarchy", tag: "Global update",
        description: "Replaced the CraftexAnarchy server with CraftexExtras due to low player engagement & high resource consumption. Extras bring a new Concept for Fun." },
      { label: "Update 4.0", title: "Economy & Tools Update", tag: "Global update",
        description: "Revamped the whole Server Economy & Added some Celestial Tools." },
      { label: "Update 5.0", title: "CraftexSMP Revamp UPD", tag: "Massive Global update",
        description: "Completely changed the Server Experience, Got a Paid Host Upgrade and much more.." },
      { label: "Update 5.1", title: "Events & Extras Gone!", tag: "Global update",
        description: "Part of the CraftexSMP Revamp UPD - Temporarily removed Events & Extras. May be back in Future." },
      { label: "Roadmap", title: "Seasonal Events", tag: "Coming soon", future: true,
        description: "Rotating limited-time dimensions with unique loot, planned for the next major content cycle & a lot of Fun." }
    ]
  },

  /* ---- Staff page (staff.html) ----
     roles   = groups, shown in this order. color is optional.
     members = role must match a role id. Optional: title (replaces the role badge), bio, links,
               skin: "MinecraftUsername" (shows their Minecraft face) or avatar: "images/staff/name.png".
     draft: true hides a member. No members = a "coming soon" message. */
  staff: {
    title: "Staff",
    intro: "The team that keeps Craftex running and the community safe. Need help? Open a ticket in the support-ticket channel on Discord.",
    roles: [
      { id: "owner", name: "Owner", color: "#2ecc71" },
      { id: "admin", name: "Admin", color: "#2bd9e0" },
      { id: "mod", name: "Moderator", color: "#e8b339" },
      { id: "helper", name: "Helpers", color: "#7cf5e8" }
    ],
    members: [
      { name: "Rip_Vishnu", role: "owner", bio: "The one who started it all.",
        avatar: "https://cdn.discordapp.com/avatars/953497440084975687/3ab38dd4ea0f99d93f62be85b2456912.webp?size=128" },
      { name: "Mark_7746", role: "admin", bio: "Server configuration, plugins and infrastructure.",
        avatar: "https://cdn.discordapp.com/avatars/1380530721235402815/e82c79a429aa11adb782a39baaa50047.webp?size=128" },
      { name: "Kartik", role: "mod", bio: "Enforces the rules, handles reports and keeps the peace.",
        avatar: "https://cdn.discordapp.com/avatars/1065982458241224714/20864a9a351c2ad3a2214a7e0862f494.webp?size=128" },
      { name: "Caty", role: "helper", bio: "First point of contact for player questions.",
        avatar: "https://cdn.discordapp.com/avatars/1385279925136654437/2fea5de5576fb28ac36fe0ab8268f14e.png?size=128" },
      { name: "Ajay", role: "helper", bio: "First point of contact for player questions.",
        avatar: "https://cdn.discordapp.com/avatars/1426526699939692698/5e4f3815923f163d6102404efe57d480.png?size=128" },
    ]
  },

  /* ---- Homepage: "About" cards (replaces the old network map) ---- */
  about: {
    title: "Why play on CraftexSMP",
    intro: "Every world has survival mechanics. Few are built like this: made for crossplay, fun and community from day one.",
    cards: [
      { title: "Crossplay support", text: "Java and Bedrock players share one world, one economy and one community. No separate servers, no compromises." },
      { title: "Friendly community", text: "RIP is a community first: active staff, zero tolerance for griefing, and a Discord that is always ready to help. CraftexSMP is an integral part of the RIP community." },
      { title: "Survival economy", text: "Shops, an auction house and a balanced currency system that rewards real survival grinding." },
      { title: "Seasonal events", text: "Build competitions, PvP tournaments, Elytra races and limited-time events that keep the world evolving." },
      { title: "Custom features", text: "Tailored plugins for quality-of-life tools, without breaking vanilla survival." },
      { title: "Dedicated staff", text: "Active moderation across time zones, fast ticket response, and a team that actually plays the game." }
    ]
  },

  /* ---- Homepage: "How to join" steps. {{serverIp}}, {{bedrockHost}}, {{bedrockPort}} are filled in ---- */
  joinSteps: {
    java: [
      "Open Minecraft Java Edition and choose <strong>Multiplayer</strong>.",
      "Choose <strong>Add Server</strong>.",
      "Enter <strong>{{serverIp}}</strong> as the server address and press <strong>Done</strong>.",
      "Select the server and press <strong>Join Server</strong>."
    ],
    bedrock: [
      "Open Minecraft Bedrock Edition, go to <strong>Play</strong>, then the <strong>Servers</strong> tab.",
      "Scroll down and choose <strong>Add Server</strong>.",
      "Enter <strong>{{bedrockHost}}</strong> as the address and <strong>{{bedrockPort}}</strong> as the port.",
      "Save it, then select the server to join."
    ]
  },

  /* ---- Community page ---- */
  communityIntro: "CraftexNetwork is more than just an SMP to us. We started this server with a few friends, and it gradually grew as we met new friends to play together. This is where we share our builds and help each other out.",
  communityGuidelines: [
    "Be kind. Everyone here is here to have fun.",
    "Ask for help in Discord: someone is usually happy to answer.",
    "Get instant support from Chea - Our Personal custom made assistant bot.",
    "Share screenshots of your builds. We love seeing them.",
    "Report problems and rule-breakers to the staff instead of dealing with them yourself."
  ],
  communityLinks: [
    // { label: "YouTube", description: "Videos and trailers.", url: "https://youtube.com/@yourchannel" }
  ],

  /* ---- Server showcase (Community page + a preview on the homepage) ----
     src         = path to the image (put your files in images/showcase/)
     category    = id from the categories list
     title / description = shown when a visitor clicks the picture
     alt         = short text describing the image (for screen readers)
     draft: true hides an image. Newest/most important first. */
  gallery: {
    categories: [
      { id: "world", name: "The world" },
      { id: "builds", name: "Player builds" },
      { id: "events", name: "Events" },
      { id: "screens", name: "Screenshots" },
      { id: "moments", name: "Community moments" }
    ],
    images: [
      { src: "images/showcase/spawn.webp", category: "world", title: "Spawn", alt: "Where every new player starts",
        description: "The CraftexSMP lobby: protected ground, hub, and the first thing every new player sees. \"Atithi Devo Bhava\"" },
      { src: "images/showcase/marketplace.webp", category: "world", title: "Marketplace", alt: "The marketplace shop",
        description: "A marketplace shop to fulfil most of your needs, just a command away: /shop." },
      { src: "images/showcase/playerbuilds.webp", category: "world", title: "Player Builds", alt: "Player-built skylines",
        description: "Epic builds raised entirely by the community: some skylines, some underground, none of them alike." },
      { src: "images/showcase/redstone.webp", category: "world", title: "Redstone Builds", alt: "Redstone builds",
        description: "\"Redstone has no limits\". The community has proven it!" },
      { src: "images/showcase/future.webp", category: "world", title: "Future Expansions", alt: "Land reserved for future expansion",
        description: "Land reserved beyond the known map. The next dimension opens when the community is ready for it." },
      { src: "images/showcase/castle.webp", category: "builds", title: "Community Castle", alt: "A castle above a mountain",
        description: "A community-built castle suspended above a mountain, raised over two months by a five-player team." },
      { src: "images/showcase/rescue.webp", category: "screens", title: "Rescue at Dusk", alt: "A horse rescue at dusk",
        description: "The intense mission to rescue a lost horse that belonged to Kartik!" },
      { src: "images/showcase/redstone-finals.webp", category: "events", title: "Redstone Build Battle Finals", alt: "Redstone build battle finals",
        description: "The enderpearl cannon. The winner takes it all: the Redstone Champion build of June, judged by the community in real time. \"Redstone has no limits\"" },
      { src: "images/showcase/crossplay-day.webp", category: "moments", title: "Where it all started", alt: "Players on the day crossplay went live",
        description: "The moment crossplay went live and Bedrock players stepped into the world for the first time." },
      { src: "images/showcase/christmas-tree.webp", category: "builds", title: "The Beauty ft. Christmas", alt: "A giant Christmas tree",
        description: "A Christmas tree fully made by real players during the Christmas of the Winter Update." },
      { src: "images/showcase/heavy-core.webp", category: "screens", title: "The moment of happiness", alt: "Getting a heavy core",
        description: "The unmatched happiness you get from finding a heavy core in Minecraft!" },
      { src: "images/showcase/elytra-race.webp", category: "events", title: "Elytra Race", alt: "Elytra race event",
        description: "A limited-time elytra race event. The fastest time to complete the map wins!" },
      { src: "images/showcase/nether.webp", category: "moments", title: "Nether Achievement", alt: "Celebrating a Nether achievement",
        description: "The community celebrated together in-world that day. True accomplishment." },
      { src: "images/showcase/castle-inside.webp", category: "builds", title: "Inside the Castle", alt: "The castle interior",
        description: "An epic interior by one of our builders, built solo over two weeks." },
      { src: "images/showcase/the-stare.webp", category: "screens", title: "The Stare", alt: "A tense stare-down",
        description: "The silence before the storm!" },
      { src: "images/showcase/lava-rising.webp", category: "events", title: "Lava Rising", alt: "Lava Rising event arena",
        description: "A world where nothing is safe from lava, hosted in the dedicated arena." },
      { src: "images/showcase/community-pic.webp", category: "moments", title: "Cat's Pic", alt: "The community gathered together",
        description: "The whole community, gathered in one place." }
    ]
  },

  /* ---- Rules page ---- */
  rules: {
    updated: "2026-10-02",
    content: `
      <div class="callout"><p>These rules apply everywhere on Craftex, in the game and in our Discord. Not knowing a rule is not an excuse, so please read them.</p></div>
      <h2>Respect - Be Kind</h2>
      <ol>
        <li><strong>Treat everyone with respect.</strong> No hate speech, slurs, harassment, coordinated attacks, or targeted insults.</li>
        <li>Respect names/pronouns/identities and personal boundaries.</li>
        <li>Light swearing is fine - just not at someone.</li>
      </ol>
      <h2>Fair play</h2>
      <ol start="4">
        <li><strong>No cheating.</strong> Hacked clients, x-ray and unfair advantages are not allowed.</li>
        <li><strong>No exploits or duplication glitches.</strong> If you find one, report it to the staff.</li>
        <li><strong>No griefing or stealing.</strong> Don't destroy, change or take things that aren't yours.</li>
        <li><strong>Keep the server running smoothly.</strong> Avoid builds or farms that cause heavy lag.</li>
      </ol>
      <h2>Chat Rules</h2>
      <ol start="8">
        <li>No spam, floods, or excessive caps.</li>
        <li>No advertising other servers, your plugin/mod/paid service etc. - THIS INCLUDES DMS</li>
        <li><strong>Keep it Chill.</strong>  ⁠No heavy real-life topics or controversial debates - Keep the chat light, safe and appropriate for everyone.</li>
        <li>Use  dedicated channels for their specific intended use-case, but within the rules.</li>
      </ol>
      <h2>Respect Builds & Space</h2>
      <ol start="12">
        <li><strong>No griefing, scamming, trapping, or TP-kills.</strong></li>
        <li>Do not spawn kill someone or killfarm.</li>
        <li>Do not spam /tpa.  If asked to stop, then stop!</li>
        <li>Respect claims and other people’s builds.</li>
        <li>PvP is allowed but only with both Player's consent!</li>
      </ol>  
      <h2>Reporting & Staff</h2>
      <ol start="17">
        <li><strong>Don’t</strong> Ping/DM Mods directly for help. Friendly reminders are okay; otherwise report it by <strong>creating a ticket from ⁠📩〢ꜱᴜᴘᴘᴏʀᴛ-ᴛɪᴄᴋᴇᴛ!</strong></li>
        <li>If something’s unclear, staff may make a judgment call to keep things appropriate and consistent.</li>
        <li>If you disagree with a decision, open a ticket - please don’t argue it out in chat.</li>
      </ol>   
      <h2>Suggestions/Advice</h2>
      <ol start="20">
        <li>If you have any suggestions/advice then please consider posting it in <strong>⁠✍️〢ᴘᴜʙʟɪᴄ-ꜱᴜɢɢᴇꜱᴛɪᴏɴꜱ channel.</strong></li>
        <li>If you want help/support regarding anything or have any questions then feel free to open a ticket from the <strong>⁠📩〢ꜱᴜᴘᴘᴏʀᴛ-ᴛɪᴄᴋᴇᴛ channel.</strong></li>
        <li><strong>Everyone is Welcome here : D</strong></li>
      <p>Breaking the rules can lead to a warning, a mute, or a temporary or permanent ban, depending on how serious it is. The staff make the final decision.</p>
      </ol> 
      <div class="callout warning"><p>Rules can change. Check this page now and then, and ask in <a href="{{discord}}">Discord</a> if something is unclear.</p></div>
    `
  },

  /* ---- Wiki: categories (the order here is the order in the menu) ---- */
  wikiCategories: [
    { id: "getting-started", name: "Getting started", description: "Everything a new player needs to connect." },
    { id: "gameplay", name: "Gameplay", description: "Tips, ranks and commands for playing on the server." },
    { id: "server", name: "The server", description: "Our worlds, events and what makes Craftex different." }
  ],

  /* ---- Wiki articles ----
     slug     = the page address (wiki.html?a=slug). Use lowercase letters, numbers and hyphens.
     category = the id of a category above (leave out for "Other")
     draft    = true hides the article from the site
     In content you can use: <h2>, <h3>, <p>, <ul>, <ol>, <a href>, <img src>, <blockquote>, <pre><code>,
       <div class="callout">…</div>   (add class "warning" for a yellow one)
       <div class="cmd">/spawn</div>   (a Minecraft command with a Copy button)
     Placeholders: {{serverIp}} {{bedrockHost}} {{bedrockPort}} {{bedrockIp}} {{website}} {{discord}} {{version}} */
  wiki: [
    {
      slug: "how-to-join", title: "How to join", category: "getting-started",
      excerpt: "Connect from Java or Bedrock in a minute.",
      keywords: "join connect ip address play java bedrock port beginner start",
      updated: "2026-10-02", version: 1,
      content: `
        <p>CraftexNetwork works on both Minecraft editions. Use the address for the edition you own.</p>
        <h2>Java Edition</h2>
        <ol>
          <li>Open Minecraft Java Edition and choose <strong>Multiplayer</strong>.</li>
          <li>Choose <strong>Add Server</strong>.</li>
          <li>Type this address and press <strong>Done</strong>:</li>
        </ol>
        <div class="cmd">{{serverIp}}</div>
        <h2>Bedrock Edition</h2>
        <ol>
          <li>Open Minecraft Bedrock Edition and go to <strong>Play</strong>, then <strong>Servers</strong>.</li>
          <li>Scroll to the bottom and choose <strong>Add Server</strong>.</li>
          <li>Enter the address and the port in their own boxes:</li>
        </ol>
        <div class="cmd">{{bedrockHost}}</div>
        <p>Port: <code>{{bedrockPort}}</code> (written together as <code>{{bedrockIp}}</code>).</p>
        <div class="callout"><p>If you're having trouble connecting to the Server, Go to the next Can't Connect Page and we'll help you connect.</p></div>
        <h2>Next steps</h2>
        <p>Read the <a href="rules.html">rules</a>, then say hello in <a href="{{discord}}">Discord</a>.</p>
      `
    },
    {
      slug: "cant-connect", title: "Can't connect?", category: "getting-started",
      excerpt: "Quick fixes for the most common connection problems.",
      keywords: "troubleshooting error connection failed timeout version outdated offline fix problem",
      updated: "2026-10-02", version: 1,
      content: `
        <p>Work through this list from top to bottom. It fixes most problems.</p>
        <h2>Check the basics</h2>
        <ol>
          <li><strong>The address.</strong> Java uses <code>{{serverIp}}</code>. Bedrock uses <code>{{bedrockHost}}</code> with port <code>{{bedrockPort}}</code>. Check for typos and extra spaces.</li>
          <li><strong>The right edition.</strong> A Java address won't work on Bedrock and the other way round.</li>
          <li><strong>The server status.</strong> The <a href="index.html#status">homepage</a> shows whether the server is online right now.</li>
        </ol>
        <h2>Still stuck?</h2>
        <ul>
          <li><strong>Update Minecraft</strong> to the newest release. An outdated or too-new game can be refused.</li>
          <li><strong>Restart the game</strong> and your device or router, then try again.</li>
          <li><strong>Turn off any VPN</strong> or proxy, then try again.</li>
          <li><strong>Try another network</strong>, for example mobile data instead of Wi-Fi.</li>
        </ul>
        <div class="callout"><p>Still can't join? Ask in <a href="{{discord}}">Discord</a> and include a screenshot of the error message.</p></div>
      `
    },
    {
      slug: "survival-basics", title: "Survival basics", category: "gameplay",
      excerpt: "Your first day and night in survival, step by step.",
      keywords: "survival beginner first night tips shelter tools food bed torches coordinates",
      updated: "2026-10-02", version: 1,
      content: `
        <p>New to survival Minecraft? This is a simple plan for your first day.</p>
        <h2>Before sunset</h2>
        <ol>
          <li><strong>Collect wood</strong> from a few trees and craft a crafting table.</li>
          <li><strong>Make tools.</strong> Craft a wooden pickaxe, then use it to mine stone and craft stone tools.</li>
          <li><strong>Find food.</strong> Cook meat in a furnace so it restores more hunger.</li>
        </ol>
        <h2>Surviving the night</h2>
        <ul>
          <li><strong>Build a small shelter</strong> or dig into a hillside and close the entrance.</li>
          <li><strong>Craft a bed</strong> from three wool and three planks to skip the night and set your spawn point.</li>
          <li><strong>Place torches</strong> (coal and a stick). Monsters spawn in the dark.</li>
        </ul>
        <h2>Good habits</h2>
        <ul>
          <li>Write down the coordinates of your base or set your home by using <div class="cmd">/home</div> so you can always find your way home.</li>
          <li>Keep spare food and a bucket of water with you when exploring caves.</li>
          <li>Protect your valuables and never share your login with anyone.</li>
        </ul>
        <div class="callout"><p>Stuck or lost? Ask in <a href="{{discord}}">Discord</a>. Other players are happy to help.</p></div>
      `
    },
    {
      slug: "commands", title: "Commands", category: "gameplay",
      excerpt: "Useful commands you can type in chat.",
      keywords: "commands chat spawn lobby smp teleport help",
      updated: "2026-10-02", version: 1,
      content: `
        <p>Type a command in the chat box. Open chat with <code>T</code> on Java, or the chat button on Bedrock. Click the <strong>Copy</strong> button to copy a command.</p>
        <h2>Getting around</h2>
        <h3>Go to SMP</h3>
        <div class="cmd">/smp</div>
        <h3>Go back to the lobby</h3>
        <div class="cmd">/smplobby</div>
        <h3>Access the Server Shop</h3>
        <div class="cmd">/shop</div>
        <h3>Access the Auction House - <strong>[Unlocks at VIP]</strong></h3>
        <div class="cmd">/ah</div>
        <h3>Check Bounties - <strong>[Unlocks at VIP]</strong></h3>
        <div class="cmd">/bounty</div>
        <h3>Random Teleport</h3>
        <div class="cmd">/rtp</div>
        <h3>Sell something in the Shop</h3>
        <div class="cmd">/sellgui</div>
        <h3>Access the Homes Menu</h3>
        <div class="cmd">/home</div>
        <h3>Request teleport to someone</h3>
        <div class="cmd">/tpa {player_name}</div>
        <h3>Accept tpa request</h3>
        <div class="cmd">/tpaccept {player_name}</div>
        <h3>Reject tpa request</h3>
        <div class="cmd">/tpadeny {player_name}</div>
        <h3>Pay someone Money - <strong>[Unlocks at VIP]</strong></h3>
        <div class="cmd">/pay {player_name} {amount}</div>
        <h3>Set your status to AFK</h3>
        <div class="cmd">/afk</div>
        <h3>Access Crafting Table - <strong>[Unlocks at VIP+]</strong></h3>
        <div class="cmd">/workbench</div>
        <h3>Access Ender Chest - <strong>[Unlocks at VIP+]</strong></h3>
        <div class="cmd">/ec</div>
        <h3>Get to know recipes in-game - <strong>[Unlocks at VIP+]</strong></h3>
        <div class="cmd">/recipe {item_name}</div>
        <h3>Access Anvil - <strong>[Unlocks at MYTH]</strong></h3>
        <div class="cmd">/anvil</div>
        <h3>Access a dustbin to throw your stuffs - <strong>[Unlocks at MYTH]</strong></h3>
        <div class="cmd">/disposal</div>
        <h3>Kill yourself - <strong>[Unlocks at MYTH]</strong></h3>
        <div class="cmd">/suicide</div>
        <h3>Rest a bit in-game - <strong>[Unlocks at MYTH]</strong></h3>
       <div class="cmd">/rest</div>
        <div class="callout warning"><p>Read the next page to know How to climb from Member to Myth, and what each rank unlocks.</p></div>
      `
    },
    {
      slug: "new-player-guide", title: "New player guide", category: "getting-started",
      excerpt: "Register, pick your world and link your Discord, step by step.",
      keywords: "register password discord link code npc lobby world new player cracked login sync roles",
      updated: "2026-10-04", version: 1,
      content: `
        <p>Follow these steps and you won't get stuck.</p>
        <h2>1. Join the Discord</h2>
        <p>Open our <a href="{{discord}}">Discord</a> and grab the server IP from the <strong><a href="https://discord.com/channels/1095327925898850454/1421844451441115179">🟢〢ꜱᴇʀᴠᴇʀ-ɪᴘ</a></strong> channel, or copy it from the <a href="index.html">homepage</a>> of this site.</p>
        <h2>2. Link your Discord</h2>
        <p>You can't join the CraftexNetowrk until your account is linked.</p>
        <ol>
          <li>Try to join the server. You will get a message telling you to send a <strong>4-digit code</strong> to the <a href="https://discord.com/users/1461380466811736218">CraftexSMP#0070</a> bot on Discord.</li>
          <li>Send that code to the <strong><a href="https://discord.com/users/1461380466811736218">CraftexSMP#0070</a></strong> bot in a DM (direct message).That's it, You are now linked.</li>
          <li>You'll now be able to access the Whole Server.</li>
        </ol>
        <p>This protects the server from spammers and keeps the community safe. We hope you understand.</p>
        <h2>Role sync</h2>
        <p>Your Minecraft and Discord roles are synced. If you are promoted in game, you automatically get the matching role on Discord, and the other way round. See <a href="wiki.html?a=ranks">Ranks</a> for how to level up.</p>
        <h2>3. Choose your world</h2>
        <p>After you join the server, you will see a beautiful lobby,roam around a bit & explore the lobby if you want. When done, use the <div class="cmd">/smp</div> command or click the NPC in the lobby to Join the SMP.</p>
        <p>Wanna go back to the lobby from the SMP? Use <div class="cmd">/smplobby</div> command.</p>
      `
    },
    {
      slug: "ranks", title: "Ranks", category: "gameplay",
      excerpt: "How to climb from Member to Myth, and what each rank unlocks.",
      keywords: "rank ranks member vip legend myth playtime money commands home rtp shop sell pay ah bounty ec workbench disposal anvil afk",
      updated: "2026-10-04", version: 1,
      content: `
        <p>Play, earn and climb. Every rank unlocks new commands and quality-of-life perks. Each rank also includes everything from the ranks before it.</p>
        <table>
          <thead><tr><th>Rank</th><th>Unlocks</th><th>Requirement</th></tr></thead>
          <tbody>
            <tr><td><strong>Member</strong></td><td><code>/home</code> (limit: 1), <code>/rtp</code>, <code>/shop</code>, <code>/sellgui</code>, <code>/tpa</code>, <code>/tpaccept</code>, <code>/tpadeny</code>, <code>/bal</code>, <code>/baltop</code>, </td><td>Default</td></tr>
            <tr><td><strong>VIP</strong></td><td><code>/home</code> (limit: 2), <code>/pay</code>, <code>/ah</code>, <code>/bounty</code></td><td>10h playtime + $5,000</td></tr>
            <tr><td><strong>VIP+</strong></td><td><code>/ec</code> (overworld only), <code>/workbench</code> (overworld only), <code>/afk</code>, <code>/recipe</code></td><td>50h playtime + $20,000</td></tr>
            <tr><td><strong>Legend</strong></td><td><code>/workbench</code> (all worlds), <code>/ec</code> (all worlds), <code>/disposal</code> (overworld only)</td><td>125h playtime + $100,000</td></tr>
            <tr><td><strong>Myth</strong></td><td><code>/disposal</code> (all worlds), <code>/anvil</code>, <code>/rest</code>, <code>/suicide</code>, </td><td>200h playtime + $300,000</td></tr>
          </tbody>
        </table>
        <div class="callout"><p><strong>Myth</strong> is the highest rank you can earn. You did it. Now You are the OG player. Thank you for playing.</p></div>
      `
    },
    {
      slug: "about-craftexsmp", title: "About CraftexSMP", category: "server",
      excerpt: "What the server is, who it's for and what makes it different.",
      keywords: "overview about craftexsmp cozy survival friendly version viaversion crossplay vibe cracked rip community",
      updated: "2026-10-04", version: 1,
      content: `
        <h2>What is CraftexSMP?</h2>
        <p>CraftexSMP is a <strong>friendly, cozy survival server</strong> running on <strong>1.21.11</strong>. It is player-first, feedback-driven and mildly silly. Everyone is welcome, The CraftexSMP awaits you. 🙂</p>
        <h2>Connect</h2>
        <ul>
          <li><strong>Java Edition:</strong> 1.21.11 (ViaVersion is included, so older clients work). Address: <code>{{serverIp}}</code></li>
          <li><strong>Bedrock Edition:</strong> latest version, crossplay supported. Address: <code>{{bedrockIp}}</code></li>
        </ul>
        <h2>The vibe</h2>
        <p>This is a place to <strong>escape real life</strong>, build <strong>friendships</strong>, and exist without your playstyle, age, skill level or build quality being judged.</p>
        <p><strong>No pay-to-win. No pressure. No weird guilt trips.</strong> Just players, builds and a lot of fun.</p>
        <h2>Rules</h2>
        <p>Read and accept the rules on the <a href="rules.html">rules page</a> of our Discord server before you start playing. Keeping things respectful makes sure everyone has a good time.</p>
      `
    },
    {
      slug: "events-and-stuffs", title: "Events and Stuffs", category: "server",
      excerpt: "Manhunt, Parkour, Elytra Races, and many more",
      keywords: "events manhunt parkour elytra race craftexevents hacks hacked clients rebuilding",
      updated: "2026-10-04", version: 1,
      content: `
        <h2>CraftexEvents - (removed)</h2>
        <p>We host events to keep things interesting, from high-stakes Manhunt to precision Parkour and high-speed Elytra Races.</p>
        <h3>Upcoming events</h3>
        <p>Check the <strong><a href="https://discord.com/channels/1095327925898850454/1513203211744575519">🌟〢ᴇᴠᴇɴᴛꜱ</a></strong> channel on our Discord for the latest schedule. Times, sign-ups and prizes are all posted there.</p>
        <h3>Current status</h3>
        <p><strong>Temporarily Removed.</strong> We temporarily removed CraftexEvents as a part of the CraftexSMP Revamp UPD. We expect it to be back soon..</p>
        <h3>Event types</h3>
        <ul>
          <li><strong>Manhunt:</strong> a speedrunner against hunters across the world</li>
          <li><strong>Parkour:</strong> test your movement skills on custom courses</li>
          <li><strong>Elytra Race:</strong> who can fly the fastest through the ring course?</li>
          <li>More rotating events are announced in Discord</li>
        </ul>
        <h2>CraftexAnarchy - (replaced)</h2>
        <p>A full anarchy experience in the Craftex Network. Free for all.</p>
        <div class="callout warning"><p>There was only one thing to avoid: using hacked clients or hacks. Apart from that rule there were no other rules. Anyone could do whatever they want, with no restrictions.</p></div>
        <h3>Current status</h3>
        <p>CraftexAnarchy was replaced by CraftexLifeSteal because of low player activity & high resource consumption.</p>
        <h2>CraftexLifeSteal - (replaced)</h2>
        <p>A complete LifeSteal experience in the Craftex Network.</p>
        <h3>Current status</h3>
        <p>CraftexLifeSteal was replaced by CraftexExtras because of low player activity & high resource consumption.</p>
        <h2>CraftexExtras - (removed)</h2>
        <p>It used to be a place for something cool, something extra and unique - more like a place for MiniGames.</p>
        <h3>Current status</h3>
        <p>CraftexExtras was temporarily removed as a part of the CraftexSMP Revamp UPD.</p>
      `
    },
    {
      slug: "discord-chat", title: "Discord chat link", category: "gameplay",
      excerpt: "Talk to players in game from Discord, and the other way round.",
      keywords: "chat discord minecraft integration live events channel sync talk",
      updated: "2026-10-04", version: 1,
      content: `
        <p>CraftexNetwork links Minecraft chat and Discord chat, so you never miss what is happening.</p>
        <h2>Live Minecraft chat</h2>
        <p>Open the <a href="https://discord.com/channels/1095327925898850454/1461379699073745030">⛏️〢ᴄʀᴀꜰᴛᴇx-ꜱᴍᴘ</a> channel on Discord to see live in-game chat. You can talk to the players currently in the game, whether you are online in Minecraft or not.</p>
        <h2>Why it matters</h2>
        <p>The community stays connected even when you are not playing in the Server. Share ideas, plan builds, or just say hi, all from Discord.</p>
      `
    },
    {
      slug: "discord-channels", title: "Discord Channels", category: "server",
      excerpt: "Info about each channel in our Discord Server",
      keywords: "channel discord minecraft integration live events channel sync talk",
      updated: "2026-10-04", version: 1,
      content: `
        <p>Here is everything you need to know about the channels in the Discord server.</p>
        <h1>👋ッ 𝘄𝗲𝗹𝗰𝗼𝗺𝗲</h1>
        <h2><a href="https://discord.com/channels/1095327925898850454/1421844099157328092">🌲〢ᴡᴇʟᴄᴏᴍᴇ</a> Channel</h2>
        <p>Here is every new player is welcomed!</p>
        <ul>
          <li>Your presence add lots of charms in this Server :D</li>
        </ul>
        <h2><a href="https://discord.com/channels/1095327925898850454/1421844149015019590">📜〢ʀᴜʟᴇꜱ</a> Channel</h2>
        <p>The Page for this Server's rules.</p>
        <ul>
          <li>Make sure to Abide by them!</li>
        </ul>
        <h2><a href="https://discord.com/channels/1095327925898850454/1516881385799942234">🔎〢ᴀʙᴏᴜᴛ</a> Channel</h2>
        <p>Info about the RIP Community Discord Server!</p>
        <ul>
          <li>Read it if you wanna know more about the Server.</li>
        </ul>
        <h2><a href="https://discord.com/channels/1095327925898850454/1532883313012904076">📒〢ꜱᴍᴘ-ᴡɪᴋɪ</a> Channel</h2>
        <p>The Official CraftexSMP Wiki within Discord!</p>
        <ul>
          <li>The website also features the full wiki now.</li>
        </ul>
        <h2><a href="https://discord.com/channels/1095327925898850454/1421844481904349234">🎥〢ᴠɪᴅᴇᴏꜱ</a> Channel</h2>
        <p>Fun Minecraft related Videos to Watch! Ft. Minecraft</p>
        <ul>
          <li>You can also get your videos posted here everytime you post on your socials. Please open a support ticket to apply.</li>
        </ul>
        <h1>🧢ッ 𝗖𝗼𝗺𝗺𝘂𝗻𝗶𝘁𝘆 𝗡𝗲𝘄𝘀</h1>
        <h2><a href="https://discord.com/channels/1095327925898850454/1421844451441115179">🟢〢ꜱᴇʀᴠᴇʀ-ɪᴘ</a> Channel</h2>
        <p>A place for the Server IP & Links!</p>
        <ul>
          <li>Make sure to Abide by them!</li>
        </ul>
        <h2><a href="https://discord.com/channels/1095327925898850454/1439554961577869344">📌〢ᴘᴏʟʟꜱ</a> Channel</h2>
        <p>The Page for this Server's rules.</p>
        <ul>
          <li>Get Server IP, Voting Site links, Website link etc here.</li>
        </ul>
        <h2><a href="https://discord.com/channels/1095327925898850454/1513203211744575519">🌟〢ᴇᴠᴇɴᴛꜱ</a> Channel</h2>
        <p> Info about the events taking place in this Server!</p>
        <ul>
          <li>Managed by the RIP's Moderation Team!</li>
        </ul>
        <h2><a href="https://discord.com/channels/1095327925898850454/1421844216404901969">📢〢ɴᴇᴡꜱ</a> Channel</h2>
        <p>Announcements of Main Events, Major Updates and many more..</p>
        <ul>
          <li>Check it out to stay notified about the latest Updates.</li>
        </ul>
        <h2><a href="https://discord.com/channels/1095327925898850454/1426870850992472104">⚒️〢ᴄʜᴀɴɢᴇ-ʟᴏɢꜱ</a> Channel</h2>
        <p>Announcements for changes/minor updates..</p>
        <ul>
          <li>More frequent techy updates about the Discord & the Minecraft Server.</li>
        </ul>
        <h2><a href="https://discord.com/channels/1095327925898850454/1535287069885079553">✍️〢ᴘᴜʙʟɪᴄ-ꜱᴜɢɢᴇꜱᴛɪᴏɴꜱ</a> Channel</h2>
        <p>The Page for players to post their suggestions.</p>
        <ul>
          <li>Let everyone know your public suggestions! - read Getting Started Guide Post First!</li>
          <li>Use proper Tags for every post for easier management!</li>
          <li>Ensure that the Post doesn't Infringe any Server rules!</li>
          <li>You can upvote a suggestion by reacting Fire [🔥] emoji on posts! - More upvotes is likely to be considered - not necessary in every cases!</li>
        </ul>
        <h1>💬ッ 𝗖𝗼𝗺𝗺𝘂𝗻𝗶𝘁𝘆</h1>
        <h2><a href="https://discord.com/channels/1095327925898850454/1095327925898850457">💬〢ɢᴇɴᴇʀᴀʟ</a> Channel</h2>
        <p>The general place for chatting to other people.</p>
        <ul>
          <li>Chat, Share Experience and have fun :)</li>
        </ul>
        <h2><a href="https://discord.com/channels/1095327925898850454/1421844623898316922">🎮〢ɢᴀᴍɪɴɢ</a> Channel</h2>
        <p>Just a cozy place to talk about Games. :)</p>
        <ul>
          <li>Gaming Mode: ON 🟢</li>
        </ul>
        <h2><a href="https://discord.com/channels/1095327925898850454/1421844558894993530">📱〢ʏᴛ-ɪɴꜱᴛᴀ</a> Channel</h2>
        <p>A Social Page! You can share YT & Insta links.</p>
        <ul>
          <li>Drop Your Links here!</li>
        </ul>
        <h2><a href="https://discord.com/channels/1095327925898850454/1461388082241732753">🎲〢ᴄᴏᴜɴᴛɪɴɢ</a> Channel</h2>
        <p>Just a page to count numbers as high as possible!</p>
        <ul>
          <li>Count to Infinity.</li>
          <li>Rules: Don't ruin the count!</li>
          <li>Highest Score: 174</li>
        </ul>
        <h2><a href="https://discord.com/channels/1095327925898850454/1438478876840820888">🏅〢ʟᴇᴠᴇʟꜱ</a> Channel</h2>
        <p>Automatically level up as you chat in the Discord Server.</p>
        <ul>
          <li>Use /level command to know your xp!</li>
          <li>Use /lb or /leaderboard to view the server Leaderboard!</li>
        </ul>
        <h2><a href="https://discord.com/channels/1095327925898850454/1516926789648125992">🚀〢ʙᴜᴍᴘ</a> Channel</h2>
        <p>Bump the Server to increase its popularity and ranking.</p>
        <ul>
          <li>Use /bump to bump this Discord Server :D</li>
          <li>Go to the Channels & Roles at the very top and select the Bump Ping to be pinged when the server is ready to be bumped!</li>
        </ul>
        <h1>🔗ッ 𝗜𝗻𝗚𝗮𝗺𝗲𝗖𝗵𝗮𝘁</h1>
        <h2><a href="https://discord.com/channels/1095327925898850454/1461379699073745030">⛏️〢ᴄʀᴀꜰᴛᴇx-ꜱᴍᴘ</a> Channel</h2>
        <p>CraftexSMP <-> Discord chat Integration!</p>
        <ul>
          <li>You can chat to people currently playing right from Discord.</li>
          <li>Use commands like /inv and /ender and many more to show your stuffs to everyone right from Discord!</li>
        </ul>
        <h2><a href="https://discord.com/channels/1095327925898850454/1464209331439403008">🌐〢ᴄʀᴀꜰᴛᴇx-ᴇᴠᴇɴᴛꜱ</a> Channel</h2>
        <p>CraftexEvents <-> Discord chat Integration!</p>
        <ul>
          <li>Current Status: Temporarily removed 🔴</li>
        </ul>
        <h2><a href="https://discord.com/channels/1095327925898850454/1446862270004072579">🍇〢ʙʟᴏxꜰʀᴜɪᴛꜱ</a> Channel</h2>
        <p>The channel for players to know Latest Blox Fruits Fruit Stock Live!</p>
        <ul>
          <li>Use /stock to know the Live Blox Fruits Stock!</li>
          <li>Channel only visible to players having 「  𝗥𝗼𝗯𝗹𝗼𝘅 」role!</li>
        </ul>
        <h1>🍁ッ 𝗙𝘂𝗻 𝗭𝗼𝗻𝗲</h1>
        <h2><a href="https://discord.com/channels/1095327925898850454/1452300332984963254">👀〢ᴘᴏꜱᴛꜱ</a> Channel</h2>
        <p>Social Media Place of this Server!</p>
        <ul>
          <li>Share Yourself here and Let others know about you :D</li>
        </ul>
        <h2><a href="https://discord.com/channels/1095327925898850454/1421844648627798056">🖌️〢ᴀʀᴛ</a> Channel</h2>
        <p>Share your Art, Talent & Creativity here.</p>
        <ul>
          <li>The Real Talent!</li>
          <li>Creativity has no limitations!</li>
        </ul>
        <h2><a href="https://discord.com/channels/1095327925898850454/1421844675303575712">🍔〢ꜰᴏᴏᴅ</a> Channel</h2>
        <p>The place for foodies to share Food Pics to each other!</p>
        <ul>
          <li>Yummmy! Btw What did you eat today?? :P</li>
        </ul>
        <h2><a href="https://discord.com/channels/1095327925898850454/1480490178782036059">🎱〢❍⩊❍</a> Channel</h2>
        <p>A place to use owo commands!  :)</p>
        <ul>
          <li>Type 'owo help' for a list of commands!</li>
        </ul>
        <h2><a href="https://discord.com/channels/1095327925898850454/1510337403166920934">🐦‍🔥〢pokéballs</a> Channel</h2>
        <p>The Pokémon and CountryBalls experience, within Discord!</p>
        <ul>
          <li>Use @Pokétwo start to start your Pokemon Journey and guess the country to get the country balls! :)</li>
          <li>Catch CountryBalls by guessing the country represented by them!</li>
        </ul>
        <h1>🔊ッ 𝗩𝗼𝗶𝗰𝗲 𝗖𝗵𝗮𝗻𝗻𝗲𝗹𝘀</h1>
        <h2><a href="https://discord.com/channels/1095327925898850454/1095327926364409986">🎙️〢ɢᴇɴᴇʀᴀʟ</a> Channel</h2>
        <p>Talk to people about general topics.</p>
        <ul>
          <li>SoundBoard Allowed</li>
        </ul>
        <h2><a href="https://discord.com/channels/1095327925898850454/1421844867130069124">🎮〢ɢᴀᴍɪɴɢ</a> Channel</h2>
        <p>Talk to people about gaming topics.</p>
        <ul>
          <li>SoundBoard Allowed</li>
        </ul>
        <h2><a href="https://discord.com/channels/1095327925898850454/1438505054234738842">🥂〢ᴄʜɪʟʟ</a> Channel</h2>
        <p>Just join & chill in the VC.</p>
        <ul>
          <li>SoundBoard Allowed</li>
        </ul>
        <h2><a href="https://discord.com/channels/1095327925898850454/1450101744267956446">🎧〢ᴍᴜꜱɪᴄ [ʀʏᴛʜᴍ]</a> Channel</h2>
        <p>The music experience, within Discord.</p>
        <ul>
          <li>Powered by Rythm</li>
          <li>SoundBoard Not Allowed</li>
        </ul>
        <h1>🗣️ッ𝗣𝗿𝗶𝘃𝗮𝘁𝗲 𝗩𝗖</h1>
        <h2><a href="https://discord.com/channels/1095327925898850454/1438576867077783775">➤〢ᴊᴏɪɴ ᴛᴏ ᴄʀᴇᴀᴛᴇ</a> Channel</h2>
        <p>Just join to create a Private VC.</p>
        <ul>
          <li>SoundBoard Allowed</li>
          <li>Configure your VC from the its chat through very easy to use GUI.</li>
        </ul>
        <h1>🤝ッ 𝗦𝘂𝗽𝗽𝗼𝗿𝘁</h1>
        <h2><a href="https://discord.com/channels/1095327925898850454/1540042513119977472">👾〢ᴀɪ-ꜱᴜᴘᴘᴏʀᴛ</a> Channel</h2>
        <p>Get support from our custom built Ai Discord Bot - Chea</p>
        <ul>
          <li>She provides helpful Ai-driven support to players!</li>
        </ul>
        <h2><a href="https://discord.com/channels/1095327925898850454/1438834897832640566">📩〢ꜱᴜᴘᴘᴏʀᴛ-ᴛɪᴄᴋᴇᴛ</a> Channel</h2>
        <p>Create a Ticket to Get Support!</p>
        <ul>
          <li>It may take up to 24 hrs to contact staff so please be patient!</li>
        </ul>
        <h1>⚜️ッ 𝗟𝗲𝘃𝗲𝗹𝘀 𝗘𝘅𝗰𝗹𝘂𝘀𝗶𝘃𝗲</h1>
        <h2><a href="https://discord.com/channels/1095327925898850454/1438525749802827836">亗〢ᴠɪᴘ-ᴘʟᴜꜱ</a> Channel</h2>
        <p>This is an exclusive channel for VIP+ role!</p>
        <ul>
          <li>You Guys Have Earned It!</li>
          Check out the <a href="wiki.html?a=ranks">rank guide</a> to know how to get VIP+ rank!</li>
        </ul>
        <h2><a href="https://discord.com/channels/1095327925898850454/1438526321251844158">🗿〢ʟᴇɢᴇɴᴅ</a> Channel</h2>
        <p>This is an exclusive channel for LEGEND role!</p>
        <ul>
          <li>You Guys Deserve this!</li>
          <li>Check out the <a href="wiki.html?a=ranks">rank guide</a> to know how to get LEGEND rank!</li>       
        </ul>
      `
    }
  ],

  /* ---- News posts (newest shows first). draft: true hides a post.
     If there are NO published posts, the News section on the homepage is hidden automatically. ---- */
  news: [
    {
      slug: "welcome-to-the-new-website", title: "Welcome to the new Craftex website", date: "2026-10-05",
      category: "Announcement", tags: ["website", "update"],
      excerpt: "Rules, guides, news and a community showcase, all in one place.",
      cover: "images/news-welcome.svg", coverAlt: "Craftex Network, new website",
      draft: false,
      content: `
        <p>I've been cooking this site for a few weeks and now We have a brand-new home on the web. Here is what you will find:</p>
        <ul>
          <li><strong>How to join</strong> for both Java and Bedrock, with a live server status.</li>
          <li><strong><a href="wiki.html">The wiki page</a></strong> with guides and commands.</li>
          <li><strong><a href="rules.html">The rules page</a></strong>, so everyone knows what to expect.</li>
          <li><strong>The showcase</strong> on the <a href="community.html#showcase">Community page</a>, where we display screenshots of the server.</li>
          <li><strong><a href="timeline.html"The timeline Page</a>></strong>, How CraftexNetwork has grown.</li>
          <li><strong><a href="staff.html"The staff Page</a>></strong>, The team that keeps Craftex running and the community safe. </li>
          <li><strong><a href="news.html"The News Page</a>></strong>, Read latest news and announcements here.</li>
          <li><strong><a href="faq.html"The FAQ Page</a>></strong>, Get answers of Frequently Asked Questions.</li>
        </ul>
        <div class="callout"><p>Got a screenshot you are proud of? Share it in our <a href="{{discord}}">Discord</a>. The best ones may be featured in the showcase.</p></div>
        <p>More detailed announcement is Discord. Thanks to all the RIP Community members. This site is brought to life by @realironmanxd, Hope you like it. See you in game!</p>
      `
    }
  ],

  /* ---- Announcements (for example copied from Discord). Newest first. Empty list = section hidden ---- */
  announcements: [
    // { date: "2026-10-01", author: "Staff", text: "Server maintenance tonight at 8pm." }
  ],

  /* ---- FAQ page ---- */
  faq: [
    { q: "How do I join the server?", a: `Add <strong>{{serverIp}}</strong> on Java Edition, or <strong>{{bedrockHost}}</strong> with port <strong>{{bedrockPort}}</strong> on Bedrock Edition. The <a href="wiki.html?a=how-to-join">How to join</a> guide has every step.` },
    { q: "Do you support both Java and Bedrock?", a: `Yes. Java players use <code>{{serverIp}}</code>. Bedrock players use <code>{{bedrockIp}}</code>.` },
    { q: "I can't connect. What should I do?", a: `Check the address, update your game, and look at the server status on the homepage. The <a href="wiki.html?a=cant-connect">Can't connect?</a> guide goes through every common fix.` },
    { q: "Can I play on my phone or tablet?", a: `Yes, with Minecraft Bedrock Edition. Use the Bedrock address and port or you can also use Java Launchers for Android to play (use java ip in that case).` },
    { q: "Where can I get help or report a problem?", a: `Join our <a href="{{discord}}">Discord</a> and ask. The staff and other players are there to help.` },
    { q: "Can I show my builds on the website?", a: `Share a screenshot in Discord. The best ones may be featured in the <a href="community.html#showcase">showcase</a> on the Community page.` },
    { q: "Are you affiliated with Mojang or Microsoft?", a: `No. Craftex is an independent community server and is not affiliated with Mojang or Microsoft.` },
    { q: "Do I need a premium Minecraft account?", a: `No. The server is cracked, so no premium account is needed. Link your Discord then Register in game with <code>/register</code>, . The <a href="wiki.html?a=new-player-guide">New player guide</a> shows every step.` },
    { q: "Why do I have to link my Discord?", a: `It protects the server from spammers and keeps the community safe. Your Minecraft and Discord roles are also synced, so promotions show up in both places.` }
  ]
};
