import React, { useState } from 'react';
import {
  Flame,
  Hammer,
  Target,
  Sparkles,
  ChevronRight,
  User,
  GraduationCap,
  Compass,
  Loader2,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';

const T = {
  bg: '#14171C',
  surface: '#1B2027',
  surfaceRaised: '#232933',
  line: '#2E3644',
  ember: '#F2A93B',
  emberHot: '#FF6B35',
  steel: '#6E8CA6',
  text: '#EDEEF0',
  textMute: '#93A0AF',
};

const SKILL_CATEGORIES = ['Python', 'Web Dev', 'Git', 'DevOps', 'AI', 'Database'];

const GOALS = [
  'AI Engineer',
  'Full-Stack Developer',
  'DevOps Engineer',
  'Data Engineer',
  'Backend Engineer',
];

function Gauge({ value }) {
  const r = 54;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const offset = c - (pct / 100) * c;
  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      <svg width="160" height="160" viewBox="0 0 140 140" className="-rotate-90">
        <circle cx="70" cy="70" r={r} fill="none" stroke={T.line} strokeWidth="10" />
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke={T.emberHot}
          strokeWidth="10"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold tabular-nums" style={{ color: T.text, fontFamily: "'Space Grotesk', sans-serif" }}>
          {Math.round(pct)}
        </span>
        <span className="text-[10px] tracking-widest uppercase mt-1" style={{ color: T.textMute }}>
          Forge Heat
        </span>
      </div>
    </div>
  );
}

function TopBar({ step, onBack }) {
  return (
    <div
      className="flex items-center justify-between px-6 py-4 border-b sticky top-0 z-10"
      style={{ borderColor: T.line, background: `${T.bg}ee`, backdropFilter: 'blur(6px)' }}
    >
      <div className="flex items-center gap-2">
        <Flame size={20} style={{ color: T.emberHot }} />
        <span className="font-bold tracking-tight text-lg" style={{ color: T.text, fontFamily: "'Space Grotesk', sans-serif" }}>
          SKILLFORGE
        </span>
      </div>
      {step > 0 ? (
        <button onClick={onBack} className="flex items-center gap-1 text-sm px-3 py-1.5 rounded transition-colors" style={{ color: T.textMute }}>
          <ArrowLeft size={14} /> Back
        </button>
      ) : (
        <span className="text-[11px] tracking-[0.2em] uppercase" style={{ color: T.textMute }}>
          SDG 4 · Quality Education
        </span>
      )}
    </div>
  );
}

function Landing({ onStart }) {
  return (
    <div className="px-6 py-16 md:py-24 max-w-3xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-8 text-xs tracking-widest uppercase" style={{ borderColor: T.line, color: T.ember }}>
        <Hammer size={12} /> Forge your career path
      </div>
      <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] mb-6" style={{ color: T.text, fontFamily: "'Space Grotesk', sans-serif" }}>
        You know the destination.
        <br />
        <span style={{ color: T.emberHot }}>We map the route.</span>
      </h1>
      <p className="text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10" style={{ color: T.textMute }}>
        Rate your skills, name a target role, and SkillForge builds a grounded, step-by-step roadmap — the gaps, the projects, the resources — so you stop guessing what to learn next.
      </p>
      <button onClick={onStart} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-transform hover:scale-[1.02]" style={{ background: T.emberHot, color: '#1A1300' }}>
        Start assessment <ChevronRight size={18} />
      </button>

      <div className="grid grid-cols-3 gap-4 mt-20 text-left">
        {[
          { icon: Compass, label: 'Skill Gap', desc: 'See exactly where you stand vs. your target role.' },
          { icon: Target, label: 'Roadmap', desc: 'An ordered path from here to hired.' },
          { icon: Sparkles, label: 'AI Mentor', desc: 'Grounded recommendations, not generic advice.' },
        ].map((f) => (
          <div key={f.label} className="p-4 rounded-lg border" style={{ borderColor: T.line, background: T.surface }}>
            <f.icon size={18} style={{ color: T.steel }} className="mb-3" />
            <div className="text-sm font-semibold mb-1" style={{ color: T.text, fontFamily: "'Space Grotesk', sans-serif" }}>
              {f.label}
            </div>
            <div className="text-xs leading-relaxed" style={{ color: T.textMute }}>
              {f.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileForm({ profile, setProfile, onNext }) {
  const valid = profile.name.trim().length > 0 && profile.goal;
  return (
    <div className="px-6 py-14 max-w-lg mx-auto">
      <div className="flex items-center gap-2 mb-8">
        <User size={16} style={{ color: T.ember }} />
        <span className="text-xs tracking-widest uppercase" style={{ color: T.textMute }}>
          Step 1 · Profile
        </span>
      </div>
      <h2 className="text-2xl font-bold mb-8" style={{ color: T.text, fontFamily: "'Space Grotesk', sans-serif" }}>
        Who's forging today?
      </h2>

      <label className="block text-sm mb-2" style={{ color: T.textMute }}>Your name</label>
      <input
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        placeholder="e.g. Amara Khan"
        className="w-full px-4 py-3 rounded-lg mb-6 outline-none text-sm"
        style={{ background: T.surface, border: `1px solid ${T.line}`, color: T.text }}
      />

      <label className="block text-sm mb-2" style={{ color: T.textMute }}>Education / current stage</label>
      <input
        value={profile.education}
        onChange={(e) => setProfile({ ...profile, education: e.target.value })}
        placeholder="e.g. 3rd year CS student"
        className="w-full px-4 py-3 rounded-lg mb-6 outline-none text-sm"
        style={{ background: T.surface, border: `1px solid ${T.line}`, color: T.text }}
      />

      <label className="block text-sm mb-3" style={{ color: T.textMute }}>Target role</label>
      <div className="grid grid-cols-1 gap-2 mb-10">
        {GOALS.map((g) => (
          <button
            key={g}
            onClick={() => setProfile({ ...profile, goal: g })}
            className="flex items-center justify-between px-4 py-3 rounded-lg text-sm text-left transition-colors"
            style={{
              background: profile.goal === g ? '#2A2013' : T.surface,
              border: `1px solid ${profile.goal === g ? T.ember : T.line}`,
              color: profile.goal === g ? T.ember : T.text,
            }}
          >
            {g}
            {profile.goal === g && <CheckCircle2 size={16} />}
          </button>
        ))}
      </div>

      <button
        disabled={!valid}
        onClick={onNext}
        className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-opacity"
        style={{
          background: valid ? T.emberHot : T.line,
          color: valid ? '#1A1300' : T.textMute,
          opacity: valid ? 1 : 0.6,
          cursor: valid ? 'pointer' : 'not-allowed',
        }}
      >
        Continue to assessment <ChevronRight size={16} />
      </button>
    </div>
  );
}

function Assessment({ skills, setSkills, onNext }) {
  return (
    <div className="px-6 py-14 max-w-lg mx-auto">
      <div className="flex items-center gap-2 mb-8">
        <GraduationCap size={16} style={{ color: T.ember }} />
        <span className="text-xs tracking-widest uppercase" style={{ color: T.textMute }}>
          Step 2 · Self-Assessment
        </span>
      </div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: T.text, fontFamily: "'Space Grotesk', sans-serif" }}>
        Rate your current skill
      </h2>
      <p className="text-sm mb-10" style={{ color: T.textMute }}>
        Honest ratings produce a roadmap that's actually useful.
      </p>

      <div className="space-y-7 mb-10">
        {SKILL_CATEGORIES.map((cat) => (
          <div key={cat}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium" style={{ color: T.text }}>{cat}</span>
              <span className="text-sm tabular-nums" style={{ color: T.ember, fontFamily: "'Space Grotesk', sans-serif" }}>
                {skills[cat]}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={skills[cat]}
              onChange={(e) => setSkills({ ...skills, [cat]: Number(e.target.value) })}
              className="w-full accent-orange-500"
              style={{ accentColor: T.emberHot }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        style={{ background: T.emberHot, color: '#1A1300' }}
      >
        Generate my roadmap <Sparkles size={16} />
      </button>
    </div>
  );
}

function Dashboard({ profile, skills, roadmap, loading, error, onRegenerate }) {
  const overall = Object.values(skills).reduce((a, b) => a + b, 0) / SKILL_CATEGORIES.length;
  const radarData = SKILL_CATEGORIES.map((c) => ({ skill: c, value: skills[c] }));

  return (
    <div className="px-6 py-10 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-1" style={{ color: T.text, fontFamily: "'Space Grotesk', sans-serif" }}>
        {profile.name}'s dashboard
      </h2>
      <p className="text-sm mb-8" style={{ color: T.textMute }}>
        Target role: <span style={{ color: T.ember }}>{profile.goal}</span>
      </p>

      <div className="grid md:grid-cols-2 gap-5 mb-10">
        <div className="rounded-xl border p-6 flex flex-col items-center justify-center" style={{ borderColor: T.line, background: T.surface }}>
          <Gauge value={overall} />
          <p className="text-xs mt-3 text-center" style={{ color: T.textMute }}>
            Overall readiness score across all six skill areas
          </p>
        </div>

        <div className="rounded-xl border p-4" style={{ borderColor: T.line, background: T.surface }}>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData} outerRadius="75%">
              <PolarGrid stroke={T.line} />
              <PolarAngleAxis dataKey="skill" tick={{ fill: T.textMute, fontSize: 11 }} />
              <Radar dataKey="value" stroke={T.emberHot} fill={T.emberHot} fillOpacity={0.35} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border p-6" style={{ borderColor: T.line, background: T.surface }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles size={16} style={{ color: T.ember }} />
            <span className="text-sm font-semibold tracking-wide" style={{ color: T.text, fontFamily: "'Space Grotesk', sans-serif" }}>
              AI-generated roadmap
            </span>
          </div>
          <button
            onClick={onRegenerate}
            disabled={loading}
            className="text-xs px-3 py-1.5 rounded-md border flex items-center gap-1.5"
            style={{ borderColor: T.line, color: T.textMute }}
          >
            {loading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
            Regenerate
          </button>
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-sm py-8 justify-center" style={{ color: T.textMute }}>
            <Loader2 size={16} className="animate-spin" /> Forging your roadmap...
          </div>
        )}

        {error && !loading && (
          <div className="text-sm py-4" style={{ color: T.emberHot }}>
            Couldn't generate a roadmap right now. {error}
          </div>
        )}

        {!loading && !error && roadmap && (
          <>
            <p className="text-sm leading-relaxed mb-6" style={{ color: T.textMute }}>
              {roadmap.summary}
            </p>

            {roadmap.gaps?.length > 0 && (
              <div className="mb-8">
                <div className="text-xs tracking-widest uppercase mb-3" style={{ color: T.textMute }}>
                  Key gaps
                </div>
                <div className="flex flex-wrap gap-2">
                  {roadmap.gaps.map((g, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-full border" style={{ borderColor: T.line, color: T.ember }}>
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="relative pl-6">
              <div className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: T.line }} />
              {roadmap.roadmap?.map((step, i) => (
                <div key={i} className="relative mb-7 last:mb-0">
                  <div className="absolute -left-6 top-0.5 w-3.5 h-3.5 rounded-full border-2" style={{ borderColor: T.emberHot, background: T.bg }} />
                  <div className="text-sm font-semibold mb-1" style={{ color: T.text, fontFamily: "'Space Grotesk', sans-serif" }}>
                    {i + 1}. {step.title}
                  </div>
                  <div className="text-xs leading-relaxed" style={{ color: T.textMute }}>
                    {step.description}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function SkillForge() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({ name: '', education: '', goal: '' });
  const [skills, setSkills] = useState(Object.fromEntries(SKILL_CATEGORIES.map((c) => [c, 30])));
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function generateRoadmap() {
    setLoading(true);
    setError(null);
    try {
      const skillSummary = SKILL_CATEGORIES.map((c) => `${c}: ${skills[c]}/100`).join(', ');
      const prompt = `Student profile:
Name: ${profile.name}
Education: ${profile.education || 'not specified'}
Target role: ${profile.goal}
Self-rated skills (0-100): ${skillSummary}

Act as a career development mentor. Identify the 3-5 biggest skill gaps versus the target role, then produce a practical, ordered roadmap of 5-7 steps to close them (topics to learn, a project to build, and a resource type per step).

Respond with ONLY raw JSON, no markdown fences, no preamble, matching exactly this shape:
{"summary": "2-3 sentence overview", "gaps": ["gap1","gap2","gap3"], "roadmap": [{"title":"short step title","description":"1-2 sentence description including a concrete project or resource"}]}`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      const data = await response.json();
      const text = data.content.map((b) => b.text || '').join('\n');
      const clean = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      setRoadmap(parsed);
    } catch (e) {
      setError('Please try regenerating.');
    } finally {
      setLoading(false);
    }
  }

  function goNext() {
    if (step === 2) {
      setStep(3);
      generateRoadmap();
    } else {
      setStep(step + 1);
    }
  }

  return (
    <div className="min-h-screen w-full" style={{ background: T.bg, fontFamily: "'Inter', sans-serif" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap');
        input[type="range"] { height: 4px; border-radius: 4px; background: ${T.line}; -webkit-appearance: none; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: ${T.emberHot}; cursor: pointer; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
      `}</style>

      <TopBar step={step} onBack={() => setStep(Math.max(0, step - 1))} />

      {step === 0 && <Landing onStart={() => setStep(1)} />}
      {step === 1 && <ProfileForm profile={profile} setProfile={setProfile} onNext={goNext} />}
      {step === 2 && <Assessment skills={skills} setSkills={setSkills} onNext={goNext} />}
      {step === 3 && (
        <Dashboard
          profile={profile}
          skills={skills}
          roadmap={roadmap}
          loading={loading}
          error={error}
          onRegenerate={generateRoadmap}
        />
      )}
    </div>
  );
}