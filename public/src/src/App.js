import { useState } from "react";

const B = {
  pageBg:"#F7F8FA", white:"#FFFFFF", sidebarBg:"#0B1F3A",
  sidebarHover:"#122849", textDark:"#0B1F3A", textMid:"#4A5568",
  textLight:"#8A96B0", textWhite:"#FFFFFF", gold:"#B8953F",
  goldLight:"#D4AF5A", goldBg:"#FBF5E6", green:"#16A34A",
  greenBg:"#F0FDF4", red:"#DC2626", redBg:"#FEF2F2",
  blue:"#1D4ED8", blueBg:"#EFF6FF", amber:"#D97706",
  amberBg:"#FFFBEB", border:"#E2E8F0", borderMid:"#CBD5E1",
};

const mockClients = [
  { id:1, name:"Sarah Chen",   email:"sarah.chen@email.com",   role:"Marketing Director", status:"Active",   lastActive:"Today",      avatar:"SC", unread:2 },
  { id:2, name:"James Okafor", email:"james.okafor@email.com", role:"Software Engineer",  status:"Active",   lastActive:"Yesterday",  avatar:"JO", unread:0 },
  { id:3, name:"Priya Patel",  email:"priya.patel@email.com",  role:"Finance Analyst",    status:"Active",   lastActive:"2 days ago", avatar:"PP", unread:1 },
  { id:4, name:"Marcus Webb",  email:"marcus.webb@email.com",  role:"Product Manager",    status:"Inactive", lastActive:"1 week ago", avatar:"MW", unread:0 },
];

const mockTranscripts = [
  { id:1, date:"Feb 28, 2026", duration:"52 min", title:"Career Pivot Strategy Session",
    summary:"Discussed transitioning from marketing to product management. Identified 3 target companies in fintech. Key action: update LinkedIn headline and refresh resume with quantified achievements.",
    actions:["Update LinkedIn headline to reflect product focus","Refresh resume with 3 quantified achievements","Research Stripe, Plaid, and Brex as target companies"],
    tags:["Strategy","Resume","LinkedIn"] },
  { id:2, date:"Feb 14, 2026", duration:"45 min", title:"Interview Prep & Salary Negotiation",
    summary:"Practiced STAR method responses for behavioral interviews. Covered salary negotiation tactics — anchoring high, silence as a tool, and counter-offer strategy. Target range set at $145K–$165K.",
    actions:["Practice 3 STAR stories daily","Research Stripe compensation data on Levels.fyi","Send thank-you notes within 24 hrs of interview"],
    tags:["Interview Prep","Negotiation"] },
  { id:3, date:"Jan 31, 2026", duration:"38 min", title:"Networking & Personal Brand",
    summary:"Mapped out 15 warm contacts to reach out to in Q1. Crafted outreach message template. Discussed building thought leadership on LinkedIn with 2x/week posting cadence.",
    actions:["Send 5 outreach messages this week","Post first LinkedIn article by Feb 7","Schedule coffee chat with 2 contacts"],
    tags:["Networking","Branding"] },
];

const mockEmails = [
  { id:1, from:"nirbhay.kumar@pinnacle-paths.com", subject:"Your Updated Resume — Version 3",    date:"Mar 4, 2026",  preview:"Hi Sarah, I've attached the latest version of your resume with the edits we discussed. The impact metrics on page 1 really stand out now — the hiring managers at Stripe will notice immediately.", read:false },
  { id:2, from:"sarah.chen@email.com",        subject:"RE: Interview at Stripe — Feedback", date:"Mar 1, 2026",  preview:"Thank you so much! The interview went really well. They asked exactly the questions we practiced. I should hear back by Friday — fingers crossed!", read:true },
  { id:3, from:"nirbhay.kumar@pinnacle-paths.com", subject:"Prep Materials: Stripe Final Round",  date:"Feb 27, 2026", preview:"Sarah, here are the prep materials for your final round at Stripe. Focus especially on the product sense questions — they love systems thinking and first-principles reasoning.", read:true },
];

const mockArticles = [
  { id:1, title:"The Hidden Job Market: How 70% of Roles Are Filled Before Posting", source:"Harvard Business Review", date:"Mar 5, 2026", tag:"Job Search",   excerpt:"Most positions are filled through internal referrals before they ever reach job boards. Here's how to tap into that invisible pipeline.", pinned:true },
  { id:2, title:"Salary Negotiation Scripts That Actually Work in 2026",              source:"Forbes",                 date:"Mar 2, 2026", tag:"Negotiation", excerpt:"New research shows candidates who negotiate earn an average of $7,400 more in their first year. These exact phrases make it easier.", pinned:false },
  { id:3, title:"Why AI Won't Replace These 12 High-Growth Finance Careers",          source:"McKinsey Insights",      date:"Feb 28, 2026",tag:"Trends",      excerpt:"As automation reshapes industries, certain roles are seeing unprecedented demand. Strategic positioning now can future-proof your career.", pinned:false },
];

const mockJobs = [
  { company:"Stripe", role:"Senior PM",        status:"Final Round",  applied:"Feb 10", updated:"Mar 1",  notes:"Final interview done, awaiting decision" },
  { company:"Notion", role:"Head of Marketing", status:"Phone Screen", applied:"Feb 20", updated:"Feb 25", notes:"Scheduled with recruiter Mar 8" },
  { company:"Figma",  role:"Product Lead",      status:"Applied",      applied:"Mar 1",  updated:"Mar 1",  notes:"Referred by Jane Doe" },
  { company:"Linear", role:"GTM Lead",          status:"Rejected",     applied:"Jan 28", updated:"Feb 15", notes:"Position filled internally" },
];

const STATUS_STYLE = {
  "Final Round":  { bg:"#F0FDF4", text:"#16A34A", dot:"#16A34A" },
  "Phone Screen": { bg:"#EFF6FF", text:"#1D4ED8", dot:"#1D4ED8" },
  "Applied":      { bg:"#FFFBEB", text:"#D97706", dot:"#D97706" },
  "Rejected":     { bg:"#FEF2F2", text:"#DC2626", dot:"#DC2626" },
};

const Logo = ({ small }) => (
  <div style={{ display:"flex", alignItems:"center", gap:small?8:10 }}>
    <img src="https://cdn.prod.website-files.com/687c16a2fe4d6ac8714f3507/68932225454777c4b8a3f850_logomain134.png"
      alt="Pinnacle Paths" style={{ height:small?28:36, objectFit:"contain", filter:"brightness(0) invert(1)" }}
      onError={e=>e.target.style.display="none"} />
    {!small && (
      <div>
        <div style={{ fontSize:15, fontWeight:800, color:"#FFFFFF", letterSpacing:"-0.3px" }}>Pinnacle Paths</div>
        <div style={{ fontSize:10, color:"#D4AF5A", fontWeight:600, letterSpacing:"1.2px", textTransform:"uppercase" }}>Client Portal</div>
      </div>
    )}
  </div>
);

const Avatar = ({ initials, size=36, gold=false }) => (
  <div style={{ width:size, height:size, borderRadius:"50%", flexShrink:0,
    background:gold?"linear-gradient(135deg,#B8953F,#D4AF5A)":"linear-gradient(135deg,#1D4ED8,#3B82F6)",
    display:"flex", alignItems:"center", justifyContent:"center",
    fontSize:size*0.32, fontWeight:700, color:"#fff", letterSpacing:0.5 }}>{initials}</div>
);

const Tag = ({ label, color="#B8953F" }) => (
  <span style={{ fontSize:11, fontWeight:600, padding:"2px 9px", borderRadius:20,
    background:color+"18", color, border:`1px solid ${color}33`, letterSpacing:0.3 }}>{label}</span>
);

const StatusPill = ({ status }) => {
  const s = STATUS_STYLE[status] || { bg:"#F1F5F9", text:"#4A5568", dot:"#4A5568" };
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:12,
      fontWeight:600, padding:"3px 10px", borderRadius:20, background:s.bg, color:s.text }}>
      <span style={{ width:6, height:6, borderRadius:"50%", background:s.dot, display:"inline-block" }} />
      {status}
    </span>
  );
};

const Card = ({ children, style={}, onClick }) => (
  <div onClick={onClick} style={{ background:"#FFFFFF", border:"1px solid #E2E8F0", borderRadius:12,
    padding:20, ...style, cursor:onClick?"pointer":"default", transition:"box-shadow 0.15s, border-color 0.15s" }}
    onMouseEnter={e=>{ if(onClick){ e.currentTarget.style.boxShadow="0 4px 16px rgba(11,31,58,0.10)"; e.currentTarget.style.borderColor="#B8953F88"; }}}
    onMouseLeave={e=>{ if(onClick){ e.currentTarget.style.boxShadow="none"; e.currentTarget.style.borderColor="#E2E8F0"; }}}
  >{children}</div>
);

const Btn = ({ label, onClick, variant="primary", style={} }) => {
  const variants = {
    primary: { background:"linear-gradient(135deg,#B8953F,#D4AF5A)", color:"#fff", border:"none" },
    outline: { background:"transparent", color:"#B8953F", border:"1.5px solid #B8953F" },
    ghost:   { background:"transparent", color:"#4A5568", border:"1px solid #E2E8F0" },
  };
  return (
    <button onClick={onClick} style={{ padding:"9px 18px", borderRadius:8, fontWeight:600, fontSize:13,
      cursor:"pointer", transition:"opacity 0.15s", display:"inline-flex", alignItems:"center", gap:6,
      ...variants[variant], ...style }}
      onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
      onMouseLeave={e=>e.currentTarget.style.opacity="1"}>{label}</button>
  );
};

const SectionHeader = ({ title, sub }) => (
  <div style={{ marginBottom:24 }}>
    <h1 style={{ fontSize:22, fontWeight:800, color:"#0B1F3A", margin:0 }}>{title}</h1>
    {sub && <p style={{ color:"#4A5568", fontSize:14, marginTop:5 }}>{sub}</p>}
  </div>
);

const BackBtn = ({ onClick }) => (
  <button onClick={onClick} style={{ background:"transparent", border:"none", color:"#B8953F",
    cursor:"pointer", fontSize:13, fontWeight:600, marginBottom:20,
    display:"flex", alignItems:"center", gap:5, padding:0 }}>← Back</button>
);

const Sidebar = ({ role, active, setActive, onLogout }) => {
  const nav = role==="admin"
    ? [{ id:"admin-dashboard",icon:"⚡",label:"Dashboard"},{ id:"admin-clients",icon:"👥",label:"Clients"},{ id:"admin-send",icon:"📤",label:"Send Resource"}]
    : [{ id:"dashboard",icon:"⚡",label:"Dashboard"},{ id:"insights",icon:"🎙️",label:"Call Insights"},{ id:"emails",icon:"✉️",label:"Emails"},{ id:"tracker",icon:"📊",label:"Job Tracker"},{ id:"resources",icon:"📰",label:"Resources"}];
  return (
    <div style={{ width:230, background:"#0B1F3A", display:"flex", flexDirection:"column",
      height:"100vh", flexShrink:0, borderRight:"1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ padding:"22px 18px 18px", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
        <Logo />
      </div>
      <nav style={{ flex:1, padding:"14px 10px" }}>
        {nav.map(item => {
          const on = active===item.id;
          return (
            <div key={item.id} onClick={()=>setActive(item.id)} style={{
              display:"flex", alignItems:"center", gap:10, padding:"10px 12px",
              borderRadius:8, marginBottom:3, cursor:"pointer",
              background:on?"rgba(184,149,63,0.15)":"transparent",
              color:on?"#D4AF5A":"rgba(255,255,255,0.6)",
              fontWeight:on?700:400, fontSize:14,
              border:on?"1px solid rgba(184,149,63,0.3)":"1px solid transparent",
              transition:"all 0.15s" }}
              onMouseEnter={e=>{ if(!on) e.currentTarget.style.background="rgba(255,255,255,0.05)"; }}
              onMouseLeave={e=>{ if(!on) e.currentTarget.style.background="transparent"; }}>
              <span style={{ fontSize:16 }}>{item.icon}</span>{item.label}
            </div>
          );
        })}
      </nav>
      <div style={{ padding:"14px 10px", borderTop:"1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", marginBottom:8 }}>
          <Avatar initials={role==="admin"?"NK":"SC"} size={32} gold={role==="admin"} />
          <div>
            <div style={{ fontSize:13, fontWeight:600, color:"#fff" }}>{role==="admin"?"Nirbhay Kumar":"Sarah Chen"}</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>{role==="admin"?"Admin":"Client"}</div>
          </div>
        </div>
        <button onClick={onLogout} style={{ width:"100%", padding:"8px", borderRadius:8,
          border:"1px solid rgba(255,255,255,0.12)", background:"transparent",
          color:"rgba(255,255,255,0.45)", fontSize:12, cursor:"pointer" }}>Sign Out</button>
      </div>
    </div>
  );
};

const Login = ({ onLogin }) => {
  const [email,setEmail]=useState(""); const [pw,setPw]=useState("");
  return (
    <div style={{ minHeight:"100vh", background:"#0B1F3A", display:"flex",
      alignItems:"center", justifyContent:"center", fontFamily:"'Inter',sans-serif" }}>
      <div style={{ width:420, padding:20 }}>
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:16 }}><Logo /></div>
          <p style={{ color:"rgba(255,255,255,0.5)", fontSize:14, marginTop:8 }}>Your career journey, all in one place.</p>
        </div>
        <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:14, padding:28 }}>
          {[{label:"Email Address",val:email,set:setEmail,ph:"you@email.com",type:"text"},
            {label:"Password",val:pw,set:setPw,ph:"••••••••",type:"password"}].map(f=>(
            <div key={f.label} style={{ marginBottom:18 }}>
              <label style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.45)", letterSpacing:"0.8px", textTransform:"uppercase" }}>{f.label}</label>
              <input value={f.val} onChange={e=>f.set(e.target.value)} type={f.type} placeholder={f.ph}
                style={{ width:"100%", marginTop:6, padding:"11px 14px", borderRadius:8,
                  border:"1px solid rgba(255,255,255,0.12)", background:"rgba(255,255,255,0.06)",
                  color:"#fff", fontSize:14, outline:"none", boxSizing:"border-box" }} />
            </div>
          ))}
          <button onClick={()=>onLogin(email.includes("nirbhay")?"admin":"client")}
            style={{ width:"100%", padding:13, borderRadius:8, border:"none",
              background:"linear-gradient(135deg,#B8953F,#D4AF5A)",
              color:"#fff", fontWeight:700, fontSize:15, cursor:"pointer", marginTop:4 }}>Sign In</button>
          <div style={{ textAlign:"center", marginTop:14 }}>
            <span style={{ fontSize:13, color:"rgba(255,255,255,0.4)" }}>Don't have an account? </span>
            <span style={{ fontSize:13, color:"#D4AF5A", cursor:"pointer", fontWeight:600 }}>Register here</span>
          </div>
        </div>
        <div style={{ display:"flex", gap:10, marginTop:16 }}>
          {[{label:"👤 Demo: Client",role:"client"},{label:"⚙️ Demo: Admin",role:"admin"}].map(d=>(
            <button key={d.role} onClick={()=>onLogin(d.role)}
              style={{ flex:1, padding:"9px", borderRadius:8, cursor:"pointer", fontSize:12, fontWeight:500,
                border:`1px solid ${d.role==="admin"?"rgba(184,149,63,0.4)":"rgba(255,255,255,0.15)"}`,
                background:"transparent", color:d.role==="admin"?"#D4AF5A":"rgba(255,255,255,0.45)" }}>{d.label}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ClientDashboard = ({ setActive }) => (
  <div>
    <div style={{ marginBottom:28 }}>
      <h1 style={{ fontSize:24, fontWeight:800, color:"#0B1F3A", margin:0 }}>Welcome back, Sarah 👋</h1>
      <p style={{ color:"#4A5568", marginTop:5, fontSize:14 }}>Here's a snapshot of your career journey.</p>
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
      {[{label:"Call Sessions",val:"3",icon:"🎙️",color:"#1D4ED8"},{label:"Unread Emails",val:"2",icon:"✉️",color:"#B8953F"},
        {label:"Active Applications",val:"3",icon:"📋",color:"#16A34A"},{label:"Resources Shared",val:"3",icon:"📰",color:"#7C3AED"}].map(s=>(
        <Card key={s.label} style={{ padding:18, textAlign:"center" }}>
          <div style={{ fontSize:26, marginBottom:8 }}>{s.icon}</div>
          <div style={{ fontSize:30, fontWeight:800, color:s.color }}>{s.val}</div>
          <div style={{ fontSize:12, color:"#4A5568", marginTop:3 }}>{s.label}</div>
        </Card>
      ))}
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 }}>
      <Card>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <span style={{ fontWeight:700, color:"#0B1F3A", fontSize:14 }}>🎙️ Latest Call Insight</span>
          <Btn label="View all →" variant="ghost" onClick={()=>setActive("insights")} style={{ fontSize:12, padding:"5px 10px" }} />
        </div>
        <div style={{ background:"#F7F8FA", borderRadius:8, padding:14, border:"1px solid #E2E8F0" }}>
          <div style={{ fontSize:13, fontWeight:700, color:"#0B1F3A", marginBottom:3 }}>Career Pivot Strategy Session</div>
          <div style={{ fontSize:12, color:"#B8953F", fontWeight:600, marginBottom:8 }}>Feb 28, 2026 · 52 min</div>
          <div style={{ fontSize:13, color:"#4A5568", lineHeight:1.6 }}>Discussed transitioning from marketing to product. Identified 3 target companies in fintech...</div>
          <div style={{ display:"flex", gap:6, marginTop:10 }}>
            <Tag label="Strategy" /><Tag label="Resume" color="#1D4ED8" />
          </div>
        </div>
      </Card>
      <Card>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <span style={{ fontWeight:700, color:"#0B1F3A", fontSize:14 }}>📰 New Resources</span>
          <Btn label="View all →" variant="ghost" onClick={()=>setActive("resources")} style={{ fontSize:12, padding:"5px 10px" }} />
        </div>
        {mockArticles.slice(0,2).map(a=>(
          <div key={a.id} style={{ display:"flex", gap:12, padding:"10px 0", borderBottom:"1px solid #E2E8F0" }}>
            <div style={{ width:36, height:36, borderRadius:8, background:"#FBF5E6", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>📄</div>
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:"#0B1F3A", lineHeight:1.4 }}>{a.title}</div>
              <div style={{ fontSize:11, color:"#8A96B0", marginTop:3 }}>{a.source} · {a.date}</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
    <Card>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <span style={{ fontWeight:700, color:"#0B1F3A", fontSize:14 }}>📊 Job Applications</span>
        <Btn label="Open Tracker →" variant="ghost" onClick={()=>setActive("tracker")} style={{ fontSize:12, padding:"5px 10px" }} />
      </div>
      <div style={{ display:"flex", gap:12 }}>
        {mockJobs.slice(0,3).map(j=>(
          <div key={j.company} style={{ flex:1, background:"#F7F8FA", borderRadius:8, padding:14, border:"1px solid #E2E8F0" }}>
            <div style={{ fontSize:14, fontWeight:700, color:"#0B1F3A" }}>{j.company}</div>
            <div style={{ fontSize:12, color:"#4A5568", marginBottom:10 }}>{j.role}</div>
            <StatusPill status={j.status} />
          </div>
        ))}
      </div>
    </Card>
  </div>
);

const CallInsights = () => {
  const [sel,setSel]=useState(null);
  if(sel){
    const t=mockTranscripts.find(x=>x.id===sel);
    return (
      <div>
        <BackBtn onClick={()=>setSel(null)} />
        <Card>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
            <div>
              <h2 style={{ color:"#0B1F3A", margin:0, fontSize:20, fontWeight:800 }}>{t.title}</h2>
              <div style={{ color:"#4A5568", fontSize:13, marginTop:5 }}>{t.date} · {t.duration}</div>
            </div>
            <Btn label="📥 Download" variant="ghost" style={{ fontSize:12 }} />
          </div>
          <div style={{ background:"#F7F8FA", borderRadius:10, padding:18, marginBottom:20, border:"1px solid #E2E8F0" }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#B8953F", letterSpacing:"0.8px", textTransform:"uppercase", marginBottom:10 }}>Session Summary</div>
            <p style={{ color:"#0B1F3A", fontSize:14, lineHeight:1.8, margin:0 }}>{t.summary}</p>
          </div>
          <div style={{ display:"flex", gap:8, marginBottom:24 }}>{t.tags.map(tag=><Tag key={tag} label={tag} />)}</div>
          <div style={{ fontSize:11, fontWeight:700, color:"#B8953F", letterSpacing:"0.8px", textTransform:"uppercase", marginBottom:14 }}>✅ Action Items</div>
          {t.actions.map((a,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:12 }}>
              <div style={{ width:18, height:18, borderRadius:5, border:"2px solid #B8953F", flexShrink:0, marginTop:2 }} />
              <span style={{ color:"#0B1F3A", fontSize:14 }}>{a}</span>
            </div>
          ))}
        </Card>
      </div>
    );
  }
  return (
    <div>
      <SectionHeader title="🎙️ Call Insights" sub="Summaries and action items from your coaching sessions." />
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {mockTranscripts.map(t=>(
          <Card key={t.id} onClick={()=>setSel(t.id)} style={{ display:"flex", gap:18, alignItems:"flex-start" }}>
            <div style={{ width:46, height:46, borderRadius:10, background:"#EFF6FF", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>🎙️</div>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div style={{ fontSize:15, fontWeight:700, color:"#0B1F3A" }}>{t.title}</div>
                <div style={{ fontSize:12, color:"#8A96B0", flexShrink:0, marginLeft:16 }}>{t.date}</div>
              </div>
              <div style={{ fontSize:12, color:"#B8953F", fontWeight:600, marginTop:2, marginBottom:8 }}>{t.duration}</div>
              <div style={{ fontSize:13, color:"#4A5568", lineHeight:1.6 }}>{t.summary.slice(0,120)}...</div>
              <div style={{ display:"flex", gap:6, marginTop:10 }}>{t.tags.map(tag=><Tag key={tag} label={tag} />)}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Emails = () => {
  const [sel,setSel]=useState(null);
  if(sel){
    const e=mockEmails.find(x=>x.id===sel);
    return (
      <div>
        <BackBtn onClick={()=>setSel(null)} />
        <Card>
          <h2 style={{ color:"#0B1F3A", margin:"0 0 8px", fontSize:18, fontWeight:800 }}>{e.subject}</h2>
          <div style={{ display:"flex", gap:20, paddingBottom:16, marginBottom:20, borderBottom:"1px solid #E2E8F0" }}>
            <div style={{ fontSize:13, color:"#4A5568" }}><b>From:</b> {e.from}</div>
            <div style={{ fontSize:13, color:"#4A5568" }}><b>Date:</b> {e.date}</div>
          </div>
          <p style={{ color:"#0B1F3A", fontSize:14, lineHeight:1.9, margin:0 }}>{e.preview} Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <div style={{ marginTop:24 }}><Btn label="↩ Reply" variant="outline" /></div>
        </Card>
      </div>
    );
  }
  return (
    <div>
      <SectionHeader title="✉️ Emails" sub="Your email thread with Nirbhay." />
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {mockEmails.map(e=>(
          <Card key={e.id} onClick={()=>setSel(e.id)} style={{ display:"flex", gap:14, alignItems:"flex-start", borderLeft:`3px solid ${!e.read?"#B8953F":"#E2E8F0"}` }}>
            <Avatar initials={e.from.includes("nirbhay")?"NK":"SC"} size={38} gold={e.from.includes("nirbhay")} />
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <div style={{ fontSize:14, fontWeight:e.read?500:700, color:"#0B1F3A" }}>{e.subject}</div>
                <div style={{ fontSize:12, color:"#8A96B0", flexShrink:0 }}>{e.date}</div>
              </div>
              <div style={{ fontSize:12, color:"#8A96B0", marginTop:2 }}>{e.from}</div>
              <div style={{ fontSize:13, color:"#4A5568", marginTop:5, lineHeight:1.5 }}>{e.preview.slice(0,100)}...</div>
            </div>
            {!e.read && <div style={{ width:8, height:8, borderRadius:"50%", background:"#B8953F", flexShrink:0, marginTop:6 }} />}
          </Card>
        ))}
      </div>
    </div>
  );
};

const JobTracker = () => (
  <div>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
      <SectionHeader title="📊 Job Tracker" sub="Track your applications and progress." />
      <Btn label="+ Add Application" />
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
      {Object.entries({"Applied":1,"Phone Screen":1,"Final Round":1,"Rejected":1}).map(([s,c])=>{
        const sc=STATUS_STYLE[s]||{};
        return (
          <Card key={s} style={{ padding:16, textAlign:"center" }}>
            <div style={{ fontSize:24, fontWeight:800, color:sc.text }}>{c}</div>
            <div style={{ fontSize:12, color:"#4A5568", marginTop:4 }}>{s}</div>
          </Card>
        );
      })}
    </div>
    <Card style={{ padding:0, overflow:"hidden" }}>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr style={{ background:"#F7F8FA" }}>
            {["Company","Role","Status","Applied","Last Update","Notes"].map(h=>(
              <th key={h} style={{ padding:"12px 16px", textAlign:"left", fontSize:11, fontWeight:700,
                color:"#8A96B0", letterSpacing:"0.7px", textTransform:"uppercase", borderBottom:"1px solid #E2E8F0" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mockJobs.map((row,i)=>(
            <tr key={i} style={{ borderBottom:"1px solid #E2E8F0" }}
              onMouseEnter={e=>e.currentTarget.style.background="#F7F8FA"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <td style={{ padding:"13px 16px", fontSize:14, fontWeight:700, color:"#0B1F3A" }}>{row.company}</td>
              <td style={{ padding:"13px 16px", fontSize:13, color:"#4A5568" }}>{row.role}</td>
              <td style={{ padding:"13px 16px" }}><StatusPill status={row.status} /></td>
              <td style={{ padding:"13px 16px", fontSize:13, color:"#4A5568" }}>{row.applied}</td>
              <td style={{ padding:"13px 16px", fontSize:13, color:"#4A5568" }}>{row.updated}</td>
              <td style={{ padding:"13px 16px", fontSize:12, color:"#4A5568" }}>{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
);

const Resources = () => (
  <div>
    <SectionHeader title="📰 Resources & Articles" sub="Curated reads from Nirbhay, just for you." />
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      {mockArticles.map(a=>(
        <Card key={a.id} style={{ display:"flex", gap:18, alignItems:"flex-start" }}>
          <div style={{ width:46, height:46, borderRadius:10, background:"#FBF5E6", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>📄</div>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:5 }}>
              {a.pinned && <Tag label="📌 Pinned" />}
              <Tag label={a.tag} color="#7C3AED" />
            </div>
            <div style={{ fontSize:15, fontWeight:700, color:"#0B1F3A", lineHeight:1.4 }}>{a.title}</div>
            <div style={{ fontSize:12, color:"#8A96B0", marginTop:3 }}>{a.source} · {a.date}</div>
            <div style={{ fontSize:13, color:"#4A5568", marginTop:8, lineHeight:1.6 }}>{a.excerpt}</div>
          </div>
          <Btn label="Read →" variant="outline" style={{ flexShrink:0, fontSize:12, padding:"6px 14px" }} />
        </Card>
      ))}
    </div>
  </div>
);

const AdminDashboard = ({ setActive }) => (
  <div>
    <div style={{ marginBottom:28 }}>
      <h1 style={{ fontSize:24, fontWeight:800, color:"#0B1F3A", margin:0 }}>Good morning, Nirbhay 👋</h1>
      <p style={{ color:"#4A5568", marginTop:5, fontSize:14 }}>Here's your client activity overview.</p>
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
      {[{label:"Active Clients",val:"3",icon:"👥",color:"#1D4ED8"},{label:"Sessions This Month",val:"7",icon:"🎙️",color:"#B8953F"},
        {label:"Articles Sent",val:"3",icon:"📰",color:"#7C3AED"},{label:"Unread Messages",val:"3",icon:"✉️",color:"#16A34A"}].map(s=>(
        <Card key={s.label} style={{ padding:18, textAlign:"center" }}>
          <div style={{ fontSize:26, marginBottom:8 }}>{s.icon}</div>
          <div style={{ fontSize:30, fontWeight:800, color:s.color }}>{s.val}</div>
          <div style={{ fontSize:12, color:"#4A5568", marginTop:3 }}>{s.label}</div>
        </Card>
      ))}
    </div>
    <Card>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <span style={{ fontWeight:700, color:"#0B1F3A", fontSize:15 }}>👥 Your Clients</span>
        <Btn label="View All →" variant="ghost" onClick={()=>setActive("admin-clients")} style={{ fontSize:12 }} />
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {mockClients.map(c=>(
          <div key={c.id} style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 14px",
            borderRadius:10, background:"#F7F8FA", border:"1px solid #E2E8F0" }}>
            <Avatar initials={c.avatar} size={36} />
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:600, color:"#0B1F3A" }}>{c.name}</div>
              <div style={{ fontSize:12, color:"#4A5568" }}>{c.role} · Last active: {c.lastActive}</div>
            </div>
            {c.unread>0 && <Tag label={`${c.unread} new`} />}
            <span style={{ fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:20,
              background:c.status==="Active"?"#F0FDF4":"#F7F8FA",
              color:c.status==="Active"?"#16A34A":"#8A96B0" }}>{c.status}</span>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

const AdminClients = () => (
  <div>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
      <SectionHeader title="👥 Clients" sub="Manage your client roster." />
      <Btn label="+ Add Client" />
    </div>
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      {mockClients.map(c=>(
        <Card key={c.id} style={{ display:"flex", gap:16, alignItems:"center" }}>
          <Avatar initials={c.avatar} size={44} />
          <div style={{ flex:1 }}>
            <div style={{ fontSize:15, fontWeight:700, color:"#0B1F3A" }}>{c.name}</div>
            <div style={{ fontSize:13, color:"#4A5568" }}>{c.email} · {c.role}</div>
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:11, color:"#8A96B0" }}>Last Active</div>
            <div style={{ fontSize:13, color:"#0B1F3A", fontWeight:600, marginTop:2 }}>{c.lastActive}</div>
          </div>
          <span style={{ fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:20,
            background:c.status==="Active"?"#F0FDF4":"#F7F8FA",
            color:c.status==="Active"?"#16A34A":"#8A96B0" }}>{c.status}</span>
          <Btn label="View Portal →" variant="outline" style={{ fontSize:12, padding:"6px 14px" }} />
        </Card>
      ))}
    </div>
  </div>
);

const AdminSend = () => {
  const [title,setTitle]=useState(""); const [url,setUrl]=useState("");
  const [note,setNote]=useState(""); const [audience,setAudience]=useState("all");
  const [sent,setSent]=useState(false);
  if(sent) return (
    <div style={{ textAlign:"center", padding:60 }}>
      <div style={{ fontSize:56, marginBottom:16 }}>✅</div>
      <h2 style={{ color:"#0B1F3A", fontWeight:800 }}>Resource Sent!</h2>
      <p style={{ color:"#4A5568" }}>Delivered to {audience==="all"?"all clients":"the selected client"}.</p>
      <Btn label="Send Another" onClick={()=>{setSent(false);setTitle("");setUrl("");setNote("");}} style={{ marginTop:20 }} />
    </div>
  );
  return (
    <div>
      <SectionHeader title="📤 Send Resource" sub="Share an article, report, or file with your clients." />
      <Card style={{ maxWidth:560 }}>
        {[{label:"Article Title",val:title,set:setTitle,ph:"e.g. 5 Resume Mistakes to Avoid in 2026"},
          {label:"URL / Link",val:url,set:setUrl,ph:"https://..."}].map(f=>(
          <div key={f.label} style={{ marginBottom:18 }}>
            <label style={{ fontSize:11, fontWeight:700, color:"#8A96B0", letterSpacing:"0.8px", textTransform:"uppercase" }}>{f.label}</label>
            <input value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph}
              style={{ width:"100%", marginTop:6, padding:"10px 14px", borderRadius:8,
                border:"1px solid #E2E8F0", background:"#F7F8FA", color:"#0B1F3A",
                fontSize:14, outline:"none", boxSizing:"border-box" }} />
          </div>
        ))}
        <div style={{ marginBottom:18 }}>
          <label style={{ fontSize:11, fontWeight:700, color:"#8A96B0", letterSpacing:"0.8px", textTransform:"uppercase" }}>Your Note</label>
          <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Add a personal note..." rows={3}
            style={{ width:"100%", marginTop:6, padding:"10px 14px", borderRadius:8,
              border:"1px solid #E2E8F0", background:"#F7F8FA", color:"#0B1F3A",
              fontSize:14, outline:"none", resize:"vertical", boxSizing:"border-box" }} />
        </div>
        <div style={{ marginBottom:24 }}>
          <label style={{ fontSize:11, fontWeight:700, color:"#8A96B0", letterSpacing:"0.8px", textTransform:"uppercase" }}>Send To</label>
          <div style={{ display:"flex", gap:10, marginTop:8 }}>
            {[{val:"all",label:"All Clients"},{val:"sarah",label:"Sarah Chen"},{val:"james",label:"James Okafor"}].map(o=>(
              <button key={o.val} onClick={()=>setAudience(o.val)} style={{ flex:1, padding:"8px", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:600,
                background:audience===o.val?"#FBF5E6":"transparent",
                color:audience===o.val?"#B8953F":"#4A5568",
                border:`1.5px solid ${audience===o.val?"#B8953F":"#E2E8F0"}` }}>{o.label}</button>
            ))}
          </div>
        </div>
        <Btn label="📤 Send Resource" onClick={()=>setSent(true)} style={{ width:"100%", justifyContent:"center" }} />
      </Card>
    </div>
  );
};

export default function App() {
  const [role,setRole]=useState(null);
  const [active,setActive]=useState(null);
  const login  = r => { setRole(r); setActive(r==="admin"?"admin-dashboard":"dashboard"); };
  const logout = () => { setRole(null); setActive(null); };
  const SCREENS = {
    dashboard:<ClientDashboard setActive={setActive} />,
    insights:<CallInsights />, emails:<Emails />, tracker:<JobTracker />, resources:<Resources />,
    "admin-dashboard":<AdminDashboard setActive={setActive} />,
    "admin-clients":<AdminClients />, "admin-send":<AdminSend />,
  };
  if(!role) return <Login onLogin={login} />;
  return (
    <div style={{ display:"flex", height:"100vh", background:"#F7F8FA",
      fontFamily:"'Inter',system-ui,sans-serif", color:"#0B1F3A", overflow:"hidden" }}>
      <Sidebar role={role} active={active} setActive={setActive} onLogout={logout} />
      <main style={{ flex:1, overflowY:"auto", padding:"32px 36px" }}>
        {SCREENS[active]}
      </main>
    </div>
  );
}
