import { SITE, icon, ctaFinal } from '../lib.mjs';

const arrow = `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6"/></svg>`;

// ---------------------------------------------------------------------------
// Post definitions. Each becomes its own page; the index links to all of them.
// Dates are plausible 2026 publication dates.
// ---------------------------------------------------------------------------
const POSTS = [
  {
    slug: 'how-to-research-a-private-company',
    short: 'Research a private company',
    title: 'How to research a private company (free, step by step)',
    dek: 'A repeatable, public-sources-only method for sizing up a private business — no database subscription required.',
    date: '2026-01-14',
    dateLabel: 'January 14, 2026',
    description: 'A free, step-by-step method for researching a private company using only public sources — what to gather, where to find it, and how to turn it into a usable file.',
    body: `
      <p>Researching a public company is mostly a reading exercise: the filings are there, the financials are audited, the investor deck is a click away. Private companies are the opposite. There's no annual report, no earnings call, and often no obligation to disclose much of anything. Yet most of the companies you'll ever want to understand — a prospect, a competitor, an acquisition target, a potential employer — are private. The good news is that even private companies leave a wide public trail. This is a free, repeatable way to follow it.</p>

      <h2>Start with a single question</h2>
      <p>Before opening a single tab, decide what you're actually trying to learn. "Tell me about Acme" is not a research question; "Is Acme growing, and where?" is. Your question determines which signals matter. A salesperson cares about budget and buying triggers; a candidate cares about stability and culture; an investor cares about traction and competition. Write the question down. It keeps you from drowning in detail that doesn't change your decision.</p>

      <h2>Build the skeleton: identity and overview</h2>
      <p>Begin with the basics: legal name, what the company actually sells, when it was founded, who owns it, and roughly how big it is. The company's own website is the obvious first stop, but read it skeptically — it's marketing. Cross-check the founding date and ownership against neutral sources. Many jurisdictions publish a free business registry; in the US, Secretary of State business filings are public, and many countries have an equivalent companies register. These confirm the legal entity, registration date, and sometimes officers or directors.</p>

      <h2>Read the hiring signals</h2>
      <p>Job postings are the single most underrated source for a private company, because hiring is a forward-looking signal the company can't easily fake. A wave of sales roles suggests a go-to-market push; a cluster of senior infrastructure hires suggests scale problems (the good kind); reposted roles that never close can hint at churn or indecision. Read the job descriptions, not just the titles — they often name the tools the company uses, the team structure, and the problems being solved. Where the headcount is growing tells you where the company is betting.</p>

      <h2>Follow the money trail (as far as the record allows)</h2>
      <p>Private companies rarely publish revenue, but the financial <em>shape</em> is often visible. Funding announcements, press releases, and reputable startup coverage reveal rounds, investors and sometimes valuation. In some jurisdictions, even private companies must file abbreviated accounts. Be honest about the gaps: an absence of funding news doesn't mean a company is struggling — plenty of healthy businesses are bootstrapped and never raise. Note what you can confirm, and flag what you're inferring.</p>

      <h2>Map people, locations and tech</h2>
      <p>Leadership and key hires are usually discoverable from the company's own team page and public professional profiles. Sketch a rough org: who runs sales, who runs engineering, who's new. For locations, the company's contact page plus a maps service gives you the real footprint. For the tech stack, public job posts, the company's engineering blog, and the technologies visible on its own website tell you a surprising amount — useful whether you're selling to them, partnering, or sizing up a competitor.</p>

      <h2>Read the news and the room</h2>
      <p>Lay the press out as a timeline: launches, leadership changes, expansions, partnerships, and anything that looks like a setback. A dated timeline turns scattered headlines into a story you can read. Then look at the company it keeps — named customers, partners, and rivals — which often tells you more about a private company's real position than its own marketing does. Finally, scan for risk: lawsuits, layoffs, or reputation issues worth a second look. Surface them; don't bury them.</p>

      <h2>Turn it into a file, not a pile of tabs</h2>
      <p>The mistake most people make is stopping at "lots of tabs open." Research only becomes useful when it's organized into one place, in a consistent order, with each fact tied to where it came from. That structure is exactly what a <a href="/what-is-a-company-dossier/">company dossier</a> is: identity, people, hiring, money, locations, tech, news, relationships and risk, every line sourced. You can assemble this by hand using the steps above — it just takes time. Or you can let a tool do the gathering pass for you and spend your time on judgment instead of collection. The <a href="/how-it-works/">how-it-works page</a> walks through that pipeline, and the <a href="/sample/">sample dossier</a> shows the finished shape.</p>

      <h2>Verify before you act</h2>
      <p>However you gather it, treat the result as a starting map, not a verdict. Public sources can be stale, duplicated, or simply wrong, which is why source links matter: they let you check the load-bearing claims before a pitch, a hire, or a deal. Research a private company this way and you'll walk into the room already knowing more than the person across the table expects — honestly, from information anyone could have found, just faster.</p>

      <p>Want the gathering done for you? <a href="/get/">Open a free dossier</a> on any company, or compare the approach to paid databases on the <a href="/compare/">comparison page</a>.</p>
    `,
    faq: [
      { q: 'Can you really research a private company for free?', a: 'Yes. Private companies leave a wide public trail — business registries, job postings, news, the company website, maps and reviews — all of which are free to access. The work is in gathering, cross-checking and organizing it, not in paying for it.' },
      { q: 'What is the best free source for private company research?', a: 'Job postings are often the most revealing free source, because hiring is a forward-looking signal a company can\'t easily fake. Pair them with the public business registry to confirm the legal entity, and news coverage to build a timeline.' },
      { q: 'How do I find a private company\'s revenue?', a: 'Most private companies don\'t publish revenue, but you can often infer the financial shape from funding announcements, investor coverage and, in some jurisdictions, abbreviated public accounts. Be explicit about what is confirmed versus inferred.' },
    ],
  },

  {
    slug: 'what-is-a-company-dossier-used-for',
    short: 'What a dossier is used for',
    title: 'What is a company dossier used for?',
    dek: 'The real-world jobs a dossier does — for sales, recruiting, investing, journalism, procurement and diligence.',
    date: '2026-02-03',
    dateLabel: 'February 3, 2026',
    description: 'A company dossier is a single sourced file on a business. Here are the concrete jobs it does across sales, recruiting, investing, journalism, procurement and due diligence.',
    body: `
      <p>A <a href="/what-is-a-company-dossier/">company dossier</a> is a single, sourced file that gathers what the public record knows about a business — its people, hiring, money, locations, tech, news and risk — in one readable place. That's the definition. But the more useful question is practical: what do people actually <em>do</em> with one? The honest answer is that a dossier earns its keep any time you need to understand a company faster than you could by hand. Here are the most common jobs it does.</p>

      <h2>Walking into a meeting prepared</h2>
      <p>The most universal use is simple: you have a call, a pitch, or an interview with a company, and you want to walk in already understanding it. Rather than skimming a homepage five minutes before, you read a structured file — what they do, how big they are, what they're hiring for, who runs which team, and what's happened recently. The preparation that used to take an afternoon takes a few minutes, and you sound like someone who did their homework, because you did.</p>

      <h2>Sales and business development</h2>
      <p>For <a href="/use-cases/sales/">sales teams</a>, a dossier is account research and qualification in one. Before a discovery call, it answers the questions that shape the pitch: is this company the right size, is it growing, what stack does it run, and is there a recent trigger — a funding round, a new exec, an expansion — that makes now the right time to reach out? The hiring radar is especially useful: a company staffing up a function is a company with budget and intent. <a href="/compare/">Compared to a contact database</a>, a dossier trades a list of phone numbers for actual context on one account.</p>

      <h2>Recruiting and talent</h2>
      <p>Recruiters use a dossier in both directions. To pitch a company to a candidate, you need to understand it end to end — its trajectory, its leadership, what it's building. To time outreach, hiring signals tell you which teams are growing and where the openings really are. And candidates themselves increasingly build a dossier on a prospective employer before accepting an offer, to judge stability and direction from outside the recruiting funnel. See the <a href="/use-cases/recruiting/">recruiting use case</a> for the full picture.</p>

      <h2>Investing and founder research</h2>
      <p><a href="/use-cases/investors/">Investors and founders</a> use dossiers to size up markets, targets and competitors without losing a week to research. For an investor screening deal flow, a fast public-source brief on each company is the difference between a quick pass and an informed maybe. For a founder, a dossier on a competitor — its hiring, its tech, the company it keeps — is competitive intelligence assembled from signals the rival doesn't control. It's a first-pass tool: it tells you which companies deserve the deeper, expensive look.</p>

      <h2>Journalism and research</h2>
      <p>For <a href="/use-cases/journalists/">journalists and researchers</a>, a dossier is a starting map and a source list at once. Instead of a blank page, you begin an investigation with the company's structure, its leadership, its timeline and a set of links to the public records behind each claim — exactly the trail you'd want to follow and cite. The sourcing is the point: every line points back to where it came from, which is the standard any responsible piece of research has to meet anyway.</p>

      <h2>Procurement, partnerships and vendor vetting</h2>
      <p>Before signing with a vendor or partner, <a href="/use-cases/procurement/">procurement teams</a> use a dossier to vet who they're about to depend on — how established the company is, where it operates, what its public reputation looks like, and whether there are risk flags worth a closer look. It's a fast, honest sanity check before a contract, not a substitute for formal vetting, but it surfaces the questions worth asking.</p>

      <h2>The first step before formal due diligence</h2>
      <p>A dossier is not a due-diligence report — the formal kind is exhaustive, often involves the target's cooperation, and comes with a hefty bill. But a dossier is the natural <em>first</em> step: the public-source brief you build before committing to the expensive process, so you know which questions are worth paying to answer. Many people use a dossier precisely to decide whether full diligence is warranted at all. If that's your goal, see the <a href="/use-cases/due-diligence/">due-diligence use case</a> and our <a href="/blog/company-due-diligence-checklist/">due-diligence checklist</a>.</p>

      <h2>What it's not used for</h2>
      <p>It's worth being clear about the limits, because they define responsible use. A dossier is built from public sources, so it isn't a credit score, a background check, or a legal verdict, and it shouldn't be used as one. It's a fast, sourced starting map — confident about what the record shows, honest about what it doesn't. The right move is always to verify the load-bearing facts before you act on them.</p>

      <p>Curious what one looks like for your use case? <a href="/sample/">Read the sample dossier</a>, browse <a href="/use-cases/">all the use cases</a>, or <a href="/get/">open a free file</a> on a company you care about.</p>
    `,
    faq: [
      { q: 'Who uses a company dossier?', a: 'Anyone who needs to understand a company quickly — sales and business development, recruiters and candidates, investors and founders, journalists and researchers, and procurement or partnership teams vetting a vendor.' },
      { q: 'Is a company dossier the same as due diligence?', a: 'No. A dossier is a fast, public-source brief you build first; a formal due-diligence report is the exhaustive process that often involves the target\'s cooperation. A dossier helps you decide whether full diligence is even warranted.' },
    ],
  },

  {
    slug: 'free-alternatives-to-company-databases',
    short: 'Free database alternatives',
    title: 'Free alternatives to paid company databases',
    dek: 'What you can replace, what you can\'t, and how a free public-source approach stacks up against the big paid platforms.',
    date: '2026-02-24',
    dateLabel: 'February 24, 2026',
    description: 'A practical look at free alternatives to paid company databases like Crunchbase, ZoomInfo and PitchBook — what public sources can replace, and where the paid tools still win.',
    body: `
      <p>Paid company databases — Crunchbase, ZoomInfo, Apollo, PitchBook, Owler, Clearbit and the rest — are powerful and, for some jobs, genuinely worth the money. They're also expensive, and for a lot of people the spend is hard to justify when the real need is "help me understand this one company." If that's you, there are free alternatives that cover more ground than you might expect. The trick is knowing which job you're actually doing.</p>

      <h2>First, separate the two jobs databases do</h2>
      <p>Paid platforms really do two different things, and conflating them is what leads to overspending. The first job is <strong>breadth</strong>: querying and exporting structured data across thousands of companies at once — "give me every Series B fintech in Texas." The second is <strong>depth on one company</strong>: understanding a single business well enough to act. Databases are built for the first job, and they're hard to replace there. But most people most of the time are doing the second job — and that one has excellent free alternatives.</p>

      <h2>The free sources that actually work</h2>
      <p>For depth on a single company, the open record is rich:</p>
      <ul>
        <li><strong>Public business registries</strong> confirm the legal entity, registration and often officers — free in many jurisdictions.</li>
        <li><strong>Job boards</strong> reveal hiring direction, team structure and the tech stack, straight from the company.</li>
        <li><strong>News and press</strong> build a dated timeline of launches, funding, leadership changes and setbacks.</li>
        <li><strong>The company's own site</strong> gives you positioning, leadership and locations (read critically — it's marketing).</li>
        <li><strong>Maps and reviews</strong> show the real footprint and outside sentiment.</li>
        <li><strong>The open web</strong> ties the rest together and surfaces relationships — customers, partners, rivals.</li>
      </ul>
      <p>None of these costs anything. What they cost is <em>time</em>: gathering, cross-checking and organizing them by hand is the work paid databases charge to skip.</p>

      <h2>Where free wins</h2>
      <p>Free public sources win clearly when you need a fast, honest, first-pass understanding of one company; when you want every claim tied to a verifiable source rather than a black-box dataset; and when the company is private or niche enough that the paid databases are thin on it anyway. They also win on transparency — you can see exactly where a fact came from, which a curated dataset doesn't always let you do.</p>

      <h2>Where paid still wins</h2>
      <p>Be honest about the limits. If you need to <em>list and filter</em> thousands of companies by stage, sector or investor, a curated database is built for that and free sources are not. If you need verified direct-dial phone numbers and email addresses at scale, that's the specific thing contact platforms sell. And if you need a maintained, comparable dataset for analysis over time, the curation is the product. No free approach replaces those neatly.</p>

      <h2>A free public-source tool in the middle</h2>
      <p>There's a practical middle path: a tool that does the free-sources gathering <em>for</em> you, so you get the depth without the manual labor or the subscription. That's the approach <a href="/what-is-a-company-dossier/">Company Dossier</a> takes — it reads the public record across job boards, filings, news, the company site, maps and reviews, and assembles one sourced file per company, free. It won't export ten thousand rows; it will hand you a deep, checkable brief on the one company in front of you. We lay out the trade-offs honestly against each major platform: <a href="/compare/crunchbase-alternative/">vs Crunchbase</a>, <a href="/compare/zoominfo-alternative/">vs ZoomInfo</a>, <a href="/compare/apollo-alternative/">vs Apollo</a>, <a href="/compare/pitchbook-alternative/">vs PitchBook</a>, <a href="/compare/owler-alternative/">vs Owler</a> and <a href="/compare/clearbit-alternative/">vs Clearbit</a>.</p>

      <h2>A worked example</h2>
      <p>Say you're preparing for a call with a private mid-market software company next week. A paid database might give you a profile card and a few contacts — useful, but it costs a seat. The free path: pull the legal entity from the registry to confirm who they are; read their last two months of job posts to see they're hiring three sales reps and a solutions engineer (a clear go-to-market push); find a funding note from last year naming their lead investor; build a quick timeline from press; and skim reviews for recurring complaints. Twenty minutes of gathering — or a couple of minutes if a tool does the gathering — and you walk in knowing more about their <em>current</em> situation than a static database card would tell you, every fact linked to its source.</p>

      <h2>How to choose</h2>
      <p>Ask which job you're really doing. If it's "understand this company," start free — the public record plus a tool to gather it will get you a long way, and you can always escalate. If it's "list and enrich thousands of companies" or "dial verified contacts at scale," a paid platform is probably the right spend. Plenty of teams use both: free public-source dossiers for depth on the accounts that matter, and a database for breadth when they genuinely need it. The mistake is paying for breadth when all you needed was depth on one name.</p>

      <p>If depth on one company is the job, <a href="/get/">open a free dossier</a> or skim the <a href="/compare/">full comparison</a> first.</p>
    `,
    faq: [
      { q: 'What is the best free alternative to a paid company database?', a: 'For depth on a single company, the public record — business registries, job boards, news, the company site, maps and reviews — covers a lot for free. A tool like Company Dossier gathers those sources into one file at no cost, replacing the manual work without a subscription.' },
      { q: 'Can a free tool replace Crunchbase or ZoomInfo?', a: 'For understanding one company deeply, yes. For listing and filtering thousands of companies, or dialing verified contacts at scale, the paid databases are still purpose-built and hard to replace. Many teams use both: free for depth, paid for breadth.' },
    ],
  },

  {
    slug: 'company-due-diligence-checklist',
    short: 'Due-diligence checklist',
    title: 'A practical company due-diligence checklist',
    dek: 'A public-sources-first checklist for vetting a company before a deal, a partnership or a big commitment.',
    date: '2026-03-18',
    dateLabel: 'March 18, 2026',
    description: 'A practical, public-sources-first due-diligence checklist for vetting a company before a deal or partnership — what to verify, what to flag, and where formal diligence takes over.',
    body: `
      <p>"Due diligence" covers everything from a five-minute sanity check before a partnership to a months-long, lawyer-led investigation before an acquisition. This checklist is for the front end of that range: the public-sources-first review you can do yourself, before you commit time, money or your reputation to a company. It won't replace formal legal and financial diligence on a real deal — but it will tell you whether a deal is worth that expense, and it will surface the questions you should be asking.</p>

      <p>A note up front: this is general information, not legal or financial advice. For an actual transaction, work with qualified professionals. Everything below relies on public sources only.</p>

      <h2>1. Confirm the entity is real and who it is</h2>
      <p>Start with identity. Find the legal name and confirm it against a public business registry — registration date, status (active vs. dissolved), and registered officers or directors where available. Mismatches between the marketing name and the legal entity, or a registration that's surprisingly recent, are worth noting. Confirm the company actually does what it claims, in plain terms, from more than just its own homepage.</p>

      <h2>2. Map ownership and leadership</h2>
      <p>Who owns and runs the company? Identify the founders, the current leadership, and any parent or holding company. Look for stability: frequent or recent C-suite turnover is a flag worth understanding. Build a rough org sketch — who leads sales, engineering, finance — so you know who you'd actually be dealing with and whether the depth is real or one person wearing five hats.</p>

      <h2>3. Read the financial shape</h2>
      <p>For private companies you usually can't audit the numbers from outside, but you can read the shape from the public record: funding rounds and investors, any public filings or abbreviated accounts, and revenue signals from credible coverage. Note what's confirmed versus inferred. The absence of funding isn't automatically bad — many healthy companies are bootstrapped — but unexplained gaps between claimed scale and visible substance deserve a question.</p>

      <h2>4. Check hiring and headcount trends</h2>
      <p>Hiring is a forward-looking, hard-to-fake signal. A steady stream of roles across functions suggests a healthy, growing operation; a sudden freeze, or roles that are reposted endlessly without closing, can hint at trouble or churn. Where a company is adding headcount tells you where it's investing — and whether that matches the story it's telling you.</p>

      <h2>5. Build a timeline from the news</h2>
      <p>Lay press and milestones out in date order: launches, expansions, leadership changes, partnerships, and anything that reads as a setback — a recall, a security incident, a public dispute. A timeline turns scattered coverage into a trajectory you can judge, and it makes gaps and inconsistencies visible.</p>

      <h2>6. Map relationships and reputation</h2>
      <p>Look at the company it keeps: named customers, partners and competitors. A company's real position is often clearer from its relationships than its marketing. Then check outside sentiment — reviews from customers and, where relevant, from employees — reading them for patterns rather than individual outliers.</p>

      <h2>7. Scan for risk flags</h2>
      <p>Deliberately go looking for the things people prefer to skip: lawsuits and legal disputes, layoffs, regulatory actions, security incidents, and reputation issues. The goal isn't to disqualify a company over one flag — it's to surface them so nothing surprises you later. Write down each flag with its source so you can decide which ones warrant deeper, professional investigation.</p>

      <h2>8. Verify the load-bearing claims</h2>
      <p>Finally, identify the handful of facts your decision actually rests on — and verify each one against a primary source before you act. Public data can be stale or duplicated; the claims that matter are the ones to confirm directly. This is exactly why sourcing matters: a checklist where every line links back to its origin is one you can actually trust.</p>

      <h2>From checklist to file</h2>
      <p>Run this checklist by hand and you'll spend most of your time gathering, not judging. That's the gap a <a href="/what-is-a-company-dossier/">company dossier</a> fills: its nine sections map closely onto the steps above — identity, people, money, hiring, news, relationships and risk — with every line sourced so you can verify the ones that matter. It's the public-source first pass, assembled for you, before the expensive formal diligence begins. See <a href="/how-it-works/">how it's built</a>, the <a href="/use-cases/due-diligence/">due-diligence use case</a>, or <a href="/blog/how-to-research-a-private-company/">how to research a private company</a> for the manual version.</p>

      <p>Vetting a company this week? <a href="/get/">Open a free dossier</a> to start the checklist with the gathering already done.</p>
    `,
    faq: [
      { q: 'What should a company due-diligence checklist include?', a: 'Confirm the legal entity and ownership, read the financial shape, check hiring trends, build a news timeline, map relationships and reputation, scan for risk flags like lawsuits and layoffs, and verify the load-bearing claims against primary sources.' },
      { q: 'Can I do company due diligence using only public sources?', a: 'You can do a strong first pass with public sources alone — registries, job boards, news, the company site, reviews and maps. For an actual transaction, that first pass should be followed by formal legal and financial diligence with qualified professionals.' },
      { q: 'Is a dossier enough for due diligence?', a: 'A dossier is the fast, public-source first step, not a substitute for formal diligence. It surfaces the questions worth asking and helps you decide whether the deeper, professional process is warranted.' },
    ],
  },

  {
    slug: 'osint-for-company-research',
    short: 'OSINT for company research',
    title: 'OSINT for company research: a practical guide',
    dek: 'Open-source intelligence techniques applied to companies — ethically, legally, and from public sources only.',
    date: '2026-04-09',
    dateLabel: 'April 9, 2026',
    description: 'A practical, ethical guide to using OSINT — open-source intelligence — for company research. The public sources that matter, how to corroborate them, and where the legal and ethical lines sit.',
    body: `
      <p>OSINT — open-source intelligence — is the practice of producing useful intelligence from publicly available information. It's a discipline with roots in defense and journalism, but the core idea is mundane and powerful: most of what you want to know about a company is already public; the value is in gathering it systematically, corroborating it, and turning it into something you can act on. This is a practical guide to applying OSINT to company research, the right way.</p>

      <h2>The one rule that defines ethical OSINT</h2>
      <p>OSINT means <strong>open sources only</strong>. That's not a limitation to work around — it's the definition. Ethical, lawful company OSINT uses information that's genuinely public: published filings, posted job listings, news, the company's own website, maps, reviews and the open web. It does <em>not</em> involve unauthorized access, bypassing logins or paywalls, social engineering, pretexting, or scraping data in violation of a site's terms or anyone's reasonable privacy expectations. If a technique relies on tricking someone or getting into something you shouldn't, it isn't OSINT — it's a different and often illegal activity. Stay on the open-source side of that line and the rest of this guide applies.</p>

      <h2>The OSINT loop</h2>
      <p>Good OSINT is a loop, not a single search. It runs: define the question, collect from multiple sources, corroborate across them, analyze, and identify the gaps that send you back to collect again. The discipline is in the corroboration — a single source is a lead, not a fact. Two independent sources that agree are far stronger. This loop is what separates intelligence from a pile of links.</p>

      <h2>The public sources that matter for companies</h2>
      <p>For company research specifically, a handful of source types do most of the work:</p>
      <ul>
        <li><strong>Official registries and filings.</strong> Business registers, regulatory filings and, for public companies, financial disclosures. These are the most authoritative facts you'll find.</li>
        <li><strong>Hiring data.</strong> Job postings reveal direction, structure and tooling — a forward-looking signal companies can't easily dress up.</li>
        <li><strong>News and press.</strong> The dated record of what happened and when, ideally from credible outlets.</li>
        <li><strong>The company's own properties.</strong> Site, blog, leadership pages — rich but self-interested, so corroborate.</li>
        <li><strong>Maps and places.</strong> The physical footprint, offices and locations.</li>
        <li><strong>Reviews and public sentiment.</strong> Outside voices — customers and, where relevant, employees — read for patterns.</li>
        <li><strong>The open web and relationship signals.</strong> Customers, partners and rivals that place the company in its market.</li>
      </ul>

      <h2>Corroboration and source hygiene</h2>
      <p>The hardest part of OSINT isn't finding information — it's trusting it. Three habits keep you honest. First, <strong>cite as you go</strong>: record where every claim came from, so it can be re-checked. Second, <strong>weight your sources</strong>: a primary filing outranks a blog post that outranks an anonymous forum comment. Third, <strong>watch for circular reporting</strong>: ten articles repeating one original (possibly wrong) source is still one source. Date everything, because a true fact from three years ago may be false today.</p>

      <h2>From raw collection to a structured product</h2>
      <p>OSINT only becomes intelligence when it's organized into a product someone can use. For companies, that product is a structured, sourced file — exactly what a <a href="/what-is-a-company-dossier/">company dossier</a> is. Its nine sections mirror the source types above: identity, people, hiring, money, locations, tech, news, relationships and risk, each line tied back to where it came from. You can assemble this manually using the loop above, or use a tool that automates the collection-and-corroboration pass so you can spend your effort on analysis. The <a href="/how-it-works/">how-it-works page</a> shows that pipeline; the <a href="/sample/">sample</a> shows the output.</p>

      <h2>Legal and ethical guardrails</h2>
      <p>A few principles keep company OSINT both lawful and responsible. Use only genuinely public information. Respect privacy: focus on the business and the public record, not on surveilling individuals. Don't bypass access controls or a site's terms. Be transparent about your sources, which is also just good practice. And remember the difference between what you <em>can</em> find and what's <em>appropriate</em> to use for a given purpose — for regulated uses like credit or employment decisions, public OSINT is not a substitute for the proper, compliant process. This is general guidance, not legal advice; when in doubt, ask counsel.</p>

      <h2>Put it to work</h2>
      <p>OSINT for company research isn't mysterious — it's a disciplined habit of collecting public sources, corroborating them, sourcing every claim, and organizing the result. Do that and you'll understand a company faster and more honestly than someone working from its marketing alone. For the applied version, see <a href="/blog/how-to-research-a-private-company/">how to research a private company</a> and the <a href="/blog/company-due-diligence-checklist/">due-diligence checklist</a>, or just <a href="/get/">open a free dossier</a> and watch the loop run. Prefer the terminal? The <a href="/cli/">CLI</a> fits straight into a research workflow.</p>
    `,
    faq: [
      { q: 'What is OSINT for company research?', a: 'OSINT — open-source intelligence — applied to companies means producing useful intelligence about a business from publicly available information only: filings, job postings, news, the company website, maps, reviews and the open web, gathered systematically and corroborated.' },
      { q: 'Is company OSINT legal?', a: 'Using genuinely public information is legal. What crosses the line is unauthorized access, bypassing logins or paywalls, social engineering, or violating a site\'s terms or privacy expectations — those aren\'t OSINT. This is general guidance, not legal advice.' },
      { q: 'What are the best OSINT sources for a company?', a: 'Official registries and filings are the most authoritative; job postings reveal direction and tooling; news provides a dated timeline; the company\'s own site, maps, reviews and relationship signals fill in the rest. Corroborate across at least two independent sources.' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Post page builder
// ---------------------------------------------------------------------------
function postPage(p) {
  const path = `/blog/${p.slug}/`;
  const url = SITE.origin + path;

  const faqHtml = p.faq.map((f, i) => {
    const v = ['', ' v2', ' v3'][i % 3];
    return `<article class="qa sk${v} reveal"><h3><span class="marker">Q.</span> ${f.q}</h3><p>${f.a}</p></article>`;
  }).join('\n      ');

  const body = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab">blog — published ${p.dateLabel}</span>
    <h1>${p.title}</h1>
    <p class="lede">${p.dek}</p>
  </div>
</section>

<section class="sec" style="padding-top:24px">
  <div class="narrow">
    <div class="prose">
      ${p.body}
    </div>
  </div>
</section>

<section class="sec alt">
  <div class="wrap">
    <div class="head center reveal"><span class="tab">the fine print</span><h2 class="marker">Questions, answered</h2></div>
    <div class="faq">
      ${faqHtml}
    </div>
  </div>
</section>

<section class="sec">
  <div class="narrow" style="text-align:center">
    <a class="btn" href="/blog/">More from the blog ${arrow}</a>
  </div>
</section>

${ctaFinal('Open a file on any company.', 'free. public sources only. every line linked.')}
`;

  return {
    path,
    priority: '0.6',
    changefreq: 'monthly',
    active: undefined,
    breadcrumbs: [{ href: '/blog/', label: 'Blog' }, { href: path, label: p.short }],
    title: `${p.title} — Company Dossier`,
    description: p.description,
    ogType: 'article',
    jsonld: [
      {
        '@context': 'https://schema.org', '@type': 'Article',
        headline: p.title,
        description: p.description,
        datePublished: p.date,
        dateModified: p.date,
        author: { '@type': 'Organization', name: 'Company Dossier' },
        publisher: { '@type': 'Organization', name: 'Company Dossier', url: 'https://companydossier.lol' },
        mainEntityOfPage: url,
        image: SITE.ogImage,
      },
      {
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: SITE.origin + '/blog/' },
          { '@type': 'ListItem', position: 3, name: p.short, item: url },
        ],
      },
      {
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: p.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
    body,
  };
}

// ---------------------------------------------------------------------------
// Blog index (hub)
// ---------------------------------------------------------------------------
const cards = POSTS.map((p, i) => {
  const v = ['', ' v2', ' v3'][i % 3];
  return `<a class="linkcard sk${v} reveal" href="/blog/${p.slug}/">
    <h3>${p.title}</h3>
    <p>${p.dek}</p>
    <p style="margin-top:8px;font-family:var(--f-type);font-size:.78rem;letter-spacing:.06em;text-transform:uppercase">${p.dateLabel}</p>
  </a>`;
}).join('\n      ');

const indexBody = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab">section — the blog</span>
    <h1>The Company Dossier blog</h1>
    <p class="lede">Practical, public-sources-only guides to researching companies — how to do it, what to look for, and how to do it ethically and for free.</p>
  </div>
</section>

<section class="sec" style="padding-top:24px">
  <div class="wrap">
    <div class="linkgrid">
      ${cards}
    </div>
  </div>
</section>

${ctaFinal('Read one, then run one.', 'the best way to learn the format is to open a file.')}
`;

const indexPage = {
  path: '/blog/',
  priority: '0.7',
  changefreq: 'weekly',
  active: undefined,
  breadcrumbs: [{ href: '/blog/', label: 'Blog' }],
  title: 'Blog — guides to researching companies from public sources | Company Dossier',
  description: 'Practical, public-sources-only guides to company research: how to research a private company, what a dossier is used for, free alternatives to paid databases, a due-diligence checklist, and OSINT for company research.',
  ogType: 'website',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'Blog',
      name: 'Company Dossier Blog',
      description: 'Practical, public-sources-only guides to researching companies.',
      url: SITE.origin + '/blog/',
      publisher: { '@type': 'Organization', name: 'Company Dossier', url: 'https://companydossier.lol' },
      blogPost: POSTS.map(p => ({
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.dek,
        datePublished: p.date,
        url: SITE.origin + `/blog/${p.slug}/`,
      })),
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: SITE.origin + '/blog/' },
      ],
    },
  ],
  body: indexBody,
};

export default [indexPage, ...POSTS.map(postPage)];
