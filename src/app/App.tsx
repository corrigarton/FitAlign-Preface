import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { motion } from "motion/react";
import {
  Menu, X, Lock, CheckCircle, Circle, PlayCircle,
  ChevronRight, PanelLeftClose, PanelLeftOpen,
} from "lucide-react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

type S = "hero" | "punchline" | "lead" | "body";
interface Unit { text: string; s: S; }
interface Screen { units: Unit[]; }
interface Section { id: string; num: string; bg: string; screens: Screen[]; }
const u = (text: string, s: S): Unit => ({ text, s });

// ─── CONTENT ──────────────────────────────────────────────────────────────────

const SECTIONS: Section[] = [
  {
    id: "s1", num: "01",
    bg: "radial-gradient(ellipse at 22% 58%, rgba(210,190,155,0.11) 0%, transparent 54%), #080808",
    screens: [
      { units: [u("It is my dream that anyone who discovers FitAlign will gain the self-help tools to get out of pain, restore ease in movement, and give every cell in their body the resources it needs to thrive.", "lead"), u(`I hope you feel light, energized, and comfortable—what I like to call the "kid body."`, "punchline")] },
      { units: [u("Whenever people stand upright with strong, relaxed breathing muscles, it becomes almost impossible to feel sad or discouraged.", "lead"), u("I have been delighted to see my clients not only relieve pain quickly but also become more lighthearted, energized, attractive, and youthful.", "body")] },
      { units: [u("When I am instructing people, I often tell jokes so they will laugh. When they do, I ask them to notice how laughter changes the tension in their abdomen.", "body"), u("Laughter is a form of pandiculation.", "hero"), u("A natural reset that relaxes the torso muscles by making them contract deeply for several seconds. After we laugh, there is a distinct feeling of relaxation and activation in the abdominal region.", "body")] },
      { units: [u(`I like to call it the "wisdom of laughter."`, "punchline"), u("Contracting your muscles in this way resets them via the nervous system, helping them become both more relaxed and more toned.", "body")] },
      { units: [u("Trying to stretch or pull on muscles often triggers a stretch reflex, which can create even more tension and discomfort. For many people, stretching feels stressful or even painful, yet they make themselves do it anyway.", "body"), u("I do not believe we can find comfort through discomfort.", "hero")] },
      { units: [u("And just as I tell my clients, I ask you not to believe a word I say until you feel it for yourself.", "body"), u(`What you gain from FitAlign is a sense of knowing—an inner understanding of what feels right—rather than a belief about what you "should" do. The ideas you'll encounter here are, in truth, just common sense—though, as we know, common sense isn't always so common.`, "body")] },
      { units: [u("Much of what you will learn in FitAlign is how to do less.", "hero"), u(`Remember the adage, "less is more"? It's especially true for the body.`, "body")] },
      { units: [u("When we restore deep, natural breathing, our bio-intelligence begins to release the compensatory patterns we've developed through modern lifestyles of sitting, stressing, and driving.", "body"), u("Our nervous system takes cues from how we use our voluntary muscles—when we exert unnecessary effort, the sympathetic (stress) response is activated. The longer we remain in that state, the more likely we are to develop autoimmune disorders and chronic pain.", "body")] },
      { units: [u("In my experience working with clients, I've seen that even those who exercise excessively can push themselves into a stress mode. Much of what I now teach focuses on developing perception, kinesthetic awareness, and the ability to truly feel the body.", "body"), u("People are often amazed that these exercises are so effective—and yet so gentle.", "punchline")] },
      { units: [u("We do not need to suffer to feel good.", "hero"), u("Painful workouts are not the only path to gain; in fact, doing less with more awareness often leads to far more profound results.", "body")] },
    ],
  },
  {
    id: "s2", num: "02",
    bg: "radial-gradient(ellipse at 78% 32%, rgba(110,135,190,0.09) 0%, transparent 50%), linear-gradient(148deg, #090a0e 0%, #080808 100%)",
    screens: [
      { units: [u("My students spend more time feeling and less time thinking.", "punchline"), u("The brain is like a computer that can sense itself, and when people stay present with the feeling of breathing, they begin to connect with the deepest levels of their being.", "body")] },
      { units: [u("Many people exercise while listening to loud music, drowning out the subtle sensations of the body and the rhythm of their own breath.", "body"), u("Yet being alive in this body is a miracle.", "hero"), u("Even the simplest act—like walking barefoot across the grass—is a complex phenomenon beyond what our conscious mind can comprehend.", "body")] },
      { units: [u("Every breath we take and every move we make is precious beyond words.", "punchline"), u("Over the past 30 years of teaching, I have been privileged to witness people release deeply held traumas from PTSD through the movements of breathing and the primal functional patterns used in FitAlign.", "body")] },
      { units: [u("I have guided individuals with severe osteoarthritis to use breath to reawaken dormant postural forces—allowing them, for the first time in years, to stand upright without pain.", "body"), u("Again and again, I've seen people find relief from sciatica, plantar fasciitis, and back pain—sometimes within their very first FitAlign session.", "body")] },
      { units: [u("Many who initially came seeking relief from shoulder or neck pain discovered not only freedom from physical discomfort but also a newfound sense of happiness. Weak breathing muscles and poor posture are often accompanied by anxiety and depression.", "body"), u("These transformations are no coincidence.", "punchline")] },
      { units: [u("By using the breath to correct posture,", "hero"), u("we can simultaneously ease both physical and emotional pain.", "punchline")] },
      { units: [u("The human brain makes up only about 2% of total body weight in the average adult, yet it consumes roughly 20% of the body's oxygen and calories. When the rib cage collapses and breathing becomes shallow, the brain and body both suffer.", "body"), u("Posture and breathing are inseparable—each defines and reinforces the other.", "lead")] },
      { units: [u("In my search for deeper answers, I began developing YogAlign and later FitAlign Posture Trainings. Over the past 25 years, I have witnessed extraordinary transformations using these methods.", "body"), u("I've seen people heal hernias without surgery, strengthen flat feet to form natural arches and longer toes, and recover from hip joint pain—avoiding labral tear surgeries altogether.", "body"), u(`I've worked with individuals told their knees were "bone on bone" and that joint replacement was their only option—only to see them become pain-free and return to jogging and downhill skiing without surgery.`, "body")] },
      { units: [u("I've also watched the stress response patterns that create scoliosis unwind, freeing people from the twists in their spines.", "body"), u("As you continue, you'll see numerous images and case studies that illustrate these profound physical changes—evidence of what's possible when we retrain the nervous system. These examples are meant to tell a story and to inspire: showing how the movements of breathing can strengthen, tone, and support the body from the inside out.", "body")] },
    ],
  },
  {
    id: "s3", num: "03",
    bg: "radial-gradient(ellipse at 52% 72%, rgba(88,78,118,0.10) 0%, transparent 54%), #080808",
    screens: [
      { units: [u("Our advertising and media are saturated with promotions for creams, potions, Botox, and surgeries promising to make us more attractive. Billions of dollars are spent each year on facelifts, breast implants, and cosmetic procedures in the pursuit of beauty.", "body"), u("I believe that all humans are naturally beautiful and radiant when they embody aligned, natural posture.", "punchline")] },
      { units: [u("Yet, as you look at FitAlign before-and-after images, you may be surprised to see how much younger and more vibrant people can appear—without spending a dime on temporary, often harmful interventions that introduce chemicals and foreign objects into the body.", "body"), u("Before turning to pills or surgery, let us consider the transformative potential of using the movements of breathing to restore posture and enhance the health and vitality of every cell in the body.", "lead")] },
      { units: [u("What if we could teach our elders to use conscious breathing to improve their quality of life? What if many people currently dependent on pain medication could find relief simply through breath-based movement?", "body"), u("What if children learned experiential anatomy and the importance of strong breathing muscles before years of poor posture and misalignment took their toll?", "body"), u("Could deep breathing reduce depression, or help treat addictions and phobias?", "lead")] },
      { units: [u("It is imperative that we develop a new field of medicine—Posturology—with specialists trained to use breathing as a foundation for healing. Emerging research confirms that surgeries, pills, and procedures often fail to address the underlying causes of chronic pain.", "body"), u("Posture and breathing have become major focus areas in health science, with mounting evidence revealing their profound influence on mood, organ function, digestion, elimination, hormones, sexual vitality, and even joint longevity.", "body")] },
      { units: [u("One recent study linked forward head posture to cognitive decline and dementia. The brain, though only about 2% of the body's weight, requires roughly 20% of its oxygen supply.", "body"), u("When the skull shifts forward from the spine, blood flow through the vertebral arteries can be dramatically reduced—depriving the brain of oxygen and accelerating cell death.", "body"), u("Posture matters—a lot.", "hero")] },
      { units: [u("Music and singing can heal the body and the soul! I love to sing and play guitar, write songs and share music with people!", "body")] },
    ],
  },
  {
    id: "s4", num: "04",
    bg: "radial-gradient(ellipse at 50% 22%, rgba(200,169,126,0.09) 0%, transparent 56%), linear-gradient(to bottom, #100f0d, #080808)",
    screens: [
      { units: [u("I am simply a messenger—here to share these self-help tools. It is up to you to use them.", "body"), u("Ultimately, no one can heal you but you.", "hero")] },
      { units: [u("You can easily learn how to harness the movements of your own breath to heal and connect with your body's innate bio-intelligence.", "lead"), u("Over the past three decades, I have dedicated my life to developing these somatic, breath-based neuromuscular exercises. I've spent thousands of hours working one-on-one with clients, gaining invaluable feedback and insight into what truly helps relieve pain and correct posture.", "body")] },
      { units: [u("To date, I have trained nearly 500 instructors to teach my posture realignment methods and have guided thousands of people through my Change Your Posture, Change Your Life workshops and classes.", "body"), u("Nearly 30 years into this journey, I continue to learn more every day—and remain inspired by the body's remarkable capacity to heal when given the right tools and awareness.", "body"), u("These techniques are my life's work, and I hope they will continue to serve my fellow humans long after I leave this body.", "punchline")] },
      { units: [u("It's often said that we have a health care crisis—but in truth, what we face is a self-care crisis. People need practical, effective tools that can quickly restore health, vitality, and a sense of well-being. That is why I remain deeply passionate about FitAlign Posture Training and YogAlign.", "body"), u("I envision a world where our children play more, where we all sit less, and where the simple, powerful movements of breathing are used to restore the body's natural alignment—allowing every cell to thrive in harmony.", "lead"), u("It is amazing to be in my 70's and taking up a new sport like wing foiling!", "punchline")] },
    ],
  },
];

// ─── FLAT SCREEN INDEX ────────────────────────────────────────────────────────

const SCREEN_LIST = SECTIONS.flatMap((sec, si) =>
  sec.screens.map((screen, sci) => ({ si, sci, n: screen.units.length, section: sec, screen })),
);
const KEY = (si: number, sci: number) => `${si}-${sci}`;
const TOTAL_PAGES = 1 + SCREEN_LIST.length;

// ─── LESSONS ──────────────────────────────────────────────────────────────────

interface Lesson { id: number; title: string; description: string; duration: string; }
type LessonStatus = "locked" | "unlocked" | "in_progress" | "completed";

const LESSONS: Lesson[] = [
  { id: 0,  title: "Introduction",
    description: "Discover the FitAlign philosophy and how breath-based movement can transform your body. Learn why doing less—with more awareness—often yields the most profound results.",
    duration: "~20 min" },
  { id: 1,  title: "The Body as a System",
    description: "The body is a tension-balancing system where muscles, ligaments, and joints work together in connected lines. It is built to align and move correctly—and it intelligently compensates for habits and missing support. The goal is for healthy organization to become automatic again.",
    duration: "~18 min" },
  { id: 2,  title: "Compensation Patterns",
    description: "When one area stops supporting the body due to weakness or injury, other muscles automatically take over. Those muscles become overworked, creating tension, soreness, and pain. Emotional stress can also cause the body to brace and adopt protective patterns that become habitual.",
    duration: "~16 min" },
  { id: 3,  title: "How Pain Really Happens",
    description: "Pain often comes from muscles compensating for something elsewhere. Over time, overworked tissue thickens and stiffens, leaving the body stuck in an uncomfortable position—not because of the painful area itself, but because of the pattern it has been holding.",
    duration: "~14 min" },
  { id: 4,  title: "Why Stretching Doesn't Work",
    description: "Stretching typically means passively pulling muscles, joints, and ligaments beyond their extension. Ligaments are meant to provide strength and stability—not become increasingly loose. Stretched ligaments don't simply return to their previous state, and excessive flexibility reduces support and stability with age.",
    duration: "~15 min" },
  { id: 5,  title: "Active Lengthening",
    description: "The intended effect of stretching is better achieved by lengthening active muscles to their full extension. A standing forward bend, for example, pulls on the spine and sacrum without effectively lengthening the hamstrings—while a squat or hinge lengthens them while they remain supported. You can see a one-to-two inch difference.",
    duration: "~17 min" },
  { id: 6,  title: "Pandiculation",
    description: "Pandiculation is an instinctive full-body stretch and contraction that helps reset the body's movement patterns. Animals instinctively pandiculate after waking. Learning to use this natural mechanism consciously is one of the most effective tools for releasing habitual tension.",
    duration: "~13 min" },
  { id: 7,  title: "The Floor",
    description: "Lying on the floor puts your body in perfect alignment. Time on the floor is beneficial in itself, and pressing into the ground is an effective workout on its own. The floor is a simple, underused tool for restoring the body's natural organization.",
    duration: "~14 min" },
  { id: 8,  title: "Cortical Mapping & Self-Massage",
    description: "Self-massage relieves compensation patterns and helps the brain recognize and use parts of the body—a process called cortical mapping. Movement is alternated with touch and noticing changes, allowing the nervous system to update its map of the body.",
    duration: "~18 min" },
  { id: 9,  title: "The Breathing Chain",
    description: "Many muscles throughout the body are involved in breathing. Some breathing muscles can dominate and pull the body forward during exhalation. The FitAlign breathing technique reminds those muscles to lengthen and support upright posture instead—so that movement can follow the breath rather than fight it.",
    duration: "~16 min" },
  { id: 10, title: "The FitAlign Breathing Technique",
    description: "Inhale through a small 'O' shape—like blowing out a candle—to create resistance and actively engage your muscles. Feel your breath stand you taller, as though a hook lifts from the base of your skull. At the top of the breath, hold: make fists, press into the ground, feel your arms, back, legs, and glutes engage. Then smile, extend your fingers, let your ribs stretch, and exhale with an 'Sss' sound.",
    duration: "~20 min" },
  { id: 11, title: "Moving with the Breath",
    description: "Movement and muscle engagement can follow the breath instead of fighting it. Using the breath correctly can make movement feel lighter—almost weightless. Moving with the breath held, by contrast, is noticeably harder. Learning to coordinate breath and movement unlocks a fundamentally easier way to use the body.",
    duration: "~15 min" },
  { id: 12, title: "Back-Body Support",
    description: "The back of the body can become underused or effectively turned off. Without back-body support, tension pulls the body forward. A supportive band of engagement across the upper back helps hold the arms and shoulders in place, and the hands can be used to activate the back and core.",
    duration: "~16 min" },
  { id: 13, title: "Feet, Legs & Hips",
    description: "The feet and toes can activate the glutes. Standing on one leg activates the core and psoas. Holding the ankle at 90 degrees can inhibit other muscles, while pointing the toes during a push-up helps keep the back engaged. Small positional choices in the lower body have large effects on the rest of the system.",
    duration: "~18 min" },
  { id: 14, title: "Building Automatic Alignment",
    description: "The body is built to align and move correctly. The goal of FitAlign is not to maintain alignment through constant effort, but to retrain the system so that healthy organization becomes automatic again—so that good posture is simply what the body does.",
    duration: "~14 min" },
];

// ─── TYPOGRAPHY ───────────────────────────────────────────────────────────────

function styleClass(s: S): string {
  const base = "text-center mx-auto w-full break-words";
  switch (s) {
    case "hero":      return `${base} max-w-[42rem] text-white/92 leading-[1.15]`;
    case "punchline": return `${base} max-w-[46rem] text-white/95 leading-[1.22]`;
    case "lead":      return `${base} max-w-[50rem] text-white/88 leading-[1.44]`;
    case "body":      return `${base} max-w-[52rem] text-white/75 leading-[1.85]`;
  }
}

function textStyle(s: S): React.CSSProperties {
  const fontSize = {
    hero:      "clamp(2.4rem,6vw,5.2rem)",
    punchline: "clamp(1.55rem,3.6vw,3.1rem)",
    lead:      "clamp(1.15rem,2.6vw,2.0rem)",
    body:      "clamp(1.05rem,1.7vw,1.32rem)",
  }[s];
  const font: React.CSSProperties = s === "body"
    ? { fontFamily: "'DM Sans', sans-serif" }
    : ({ fontFamily: "'Fraunces', serif", fontOpticalSizing: "auto" } as React.CSSProperties);
  return { ...font, fontSize };
}

// ─── SCREEN ───────────────────────────────────────────────────────────────────

const MT_TRANSITION = "margin-top 0.52s cubic-bezier(0.16,1,0.3,1)";

function ScreenView({ screen, revealed, isReplay, animKey }: {
  screen: Screen; revealed: number; isReplay: boolean; animKey: number;
}) {
  const units = isReplay ? screen.units : screen.units.slice(0, revealed);
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [overflowMode, setOverflowMode] = useState(false);
  const everRevealedRef = useRef(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const group = groupRef.current;
    if (!container || !group || group.children.length === 0) return;

    const containerH = container.clientHeight;
    const groupH = group.scrollHeight;
    const isOver = groupH > containerH;

    const applyMt = (mt: number, animate: boolean) => {
      group.style.transition = animate ? MT_TRANSITION : "none";
      group.style.marginTop = `${mt}px`;
    };
    const centerLast = (animate: boolean) => {
      const lastEl = group.children[group.children.length - 1] as HTMLElement;
      const currentMt = parseFloat(group.style.marginTop) || 0;
      const intraTop = lastEl.offsetParent === container ? lastEl.offsetTop - currentMt : lastEl.offsetTop;
      applyMt(containerH / 2 - intraTop - lastEl.offsetHeight / 2, animate);
    };

    if (isReplay) {
      setOverflowMode(isOver);
      if (isOver) centerLast(false);
      else applyMt(Math.max(0, (containerH - groupH) / 2), false);
      return;
    }

    setOverflowMode(isOver);
    const shouldAnimate = everRevealedRef.current;
    everRevealedRef.current = true;
    if (isOver) centerLast(shouldAnimate);
    else applyMt(Math.max(0, (containerH - groupH) / 2), shouldAnimate);
  }, [revealed, isReplay, animKey]);

  return (
    <div ref={containerRef} data-content-scroll className="absolute inset-0 overflow-hidden px-8 md:px-14">
      <motion.div
        ref={groupRef as React.RefObject<HTMLDivElement>}
        layout
        transition={{ layout: { duration: 0.6, ease: EASE } }}
        className="w-full flex flex-col items-center gap-12 py-14"
      >
        {units.map((unit, i) => {
          const isNewest = i === units.length - 1;
          const dimmed = overflowMode && !isNewest;
          const staggerDelay = isReplay && !overflowMode ? 0.08 + i * 0.21 : 0;
          return (
            <motion.p
              key={`${animKey}-${i}`}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: dimmed ? 0.32 : 1, y: 0 }}
              transition={{
                layout: { duration: 0.6, ease: EASE },
                opacity: { duration: 0.82, ease: EASE, delay: staggerDelay },
                y:       { duration: 0.82, ease: EASE, delay: staggerDelay },
              }}
              className={styleClass(unit.s)}
              style={textStyle(unit.s)}
            >
              {unit.text}
            </motion.p>
          );
        })}
      </motion.div>
    </div>
  );
}

// ─── COVER ────────────────────────────────────────────────────────────────────

function CoverScreen() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ scale: [0.55, 2.2], opacity: [0.1, 0] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: "easeOut", delay: i * 1.9 }}
          className="absolute rounded-full border border-white/[0.07]"
          style={{ width: 270, height: 270 }}
        />
      ))}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
        className="text-center z-10"
      >
        <h1
          className="text-white leading-none"
          style={{ fontFamily: "'Fraunces', serif", fontOpticalSizing: "auto", fontWeight: 300, fontSize: "clamp(4rem, 13vw, 8.5rem)" } as React.CSSProperties}
        >
          FitAlign
        </h1>
        <p
          className="text-white/85 tracking-[0.08em] mt-8"
          style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(1.4rem, 3.5vw, 2.8rem)", fontWeight: 300 }}
        >
          Restore Your Kid Body.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-9 flex flex-col items-center gap-[10px]"
      >
        <motion.div
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.08, 0.28, 0.08] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-9 bg-white/40 origin-top"
        />
        <p className="text-white/12 text-[8px] tracking-[0.6em]" style={{ fontFamily: "'DM Sans', sans-serif" }}>SCROLL</p>
      </motion.div>
    </div>
  );
}

// ─── STATUS ICON ──────────────────────────────────────────────────────────────

function StatusIcon({ status, size = 16 }: { status: LessonStatus; size?: number }) {
  switch (status) {
    case "completed":   return <CheckCircle size={size} className="text-[#c8a97e] shrink-0" />;
    case "in_progress": return <PlayCircle  size={size} className="text-[#c8a97e]/80 shrink-0" />;
    case "unlocked":    return <Circle      size={size} className="text-white/50 shrink-0" />;
    case "locked":      return <Lock        size={size - 2} className="text-white/25 shrink-0" />;
  }
}

// ─── LESSON MODAL ─────────────────────────────────────────────────────────────

function LessonModal({ lesson, status, onClose }: { lesson: Lesson; status: LessonStatus; onClose: () => void; }) {
  return (
    <div className="fixed inset-0 z-[300] flex items-end md:items-center justify-center" onClick={onClose}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="relative w-full max-w-lg mx-4 mb-4 md:mb-0 rounded-2xl border border-white/10 bg-[#0f0e0d] p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-[#c8a97e]/60 text-xs tracking-[0.25em] uppercase mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Lesson {lesson.id + 1}</p>
            <h2 className="text-white/95 text-2xl font-light leading-tight" style={{ fontFamily: "'Fraunces', serif" }}>{lesson.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/70 transition-colors shrink-0">
            <X size={16} />
          </button>
        </div>
        <p className="text-white/72 leading-relaxed text-base mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>{lesson.description}</p>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${status === "locked" ? "bg-white/5 text-white/35" : "bg-[#c8a97e]/10 text-[#c8a97e]/80"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <StatusIcon status={status} size={14} />
            <span className="capitalize">{status.replace("_", " ")}</span>
          </div>
          <span className="text-white/35 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{lesson.duration}</span>
        </div>
        {status === "locked" && (
          <p className="mt-5 text-white/40 text-sm leading-relaxed border-t border-white/[0.07] pt-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Complete the previous lesson to unlock this one.
          </p>
        )}
      </motion.div>
    </div>
  );
}

// ─── LESSON LIST (shared between desktop + mobile panels) ─────────────────────

function LessonList({
  getLessonStatus,
  onClickLesson,
  compact = false,
}: {
  getLessonStatus: (l: Lesson) => LessonStatus;
  onClickLesson: (l: Lesson) => void;
  compact?: boolean;
}) {
  return (
    <>
      {LESSONS.map((lesson) => {
        const status = getLessonStatus(lesson);
        const isActive = lesson.id === 0;
        return (
          <button
            key={lesson.id}
            onClick={() => onClickLesson(lesson)}
            className={`w-full flex items-start text-left transition-all duration-200 border-l-2 ${
              isActive ? "border-l-[#c8a97e] bg-white/[0.04]" : "border-l-transparent hover:bg-white/[0.03] active:bg-white/[0.05]"
            } ${compact ? "gap-3 px-4 py-3.5" : "gap-4 px-6 py-4"}`}
          >
            <div className="mt-[2px] shrink-0">
              <StatusIcon status={status} size={compact ? 14 : 16} />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={`font-medium leading-snug ${compact ? "text-[13px]" : "text-base"} ${
                  status === "locked"    ? "text-white/28" :
                  status === "completed" ? "text-white/55" :
                  isActive               ? "text-[#c8a97e]" : "text-white/82"
                }`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {lesson.title}
              </p>
              <p
                className={`mt-0.5 ${compact ? "text-[11px]" : "text-sm"} ${status === "locked" ? "text-white/15" : "text-white/30"}`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {lesson.duration}
              </p>
            </div>
            {status !== "locked" && <ChevronRight size={compact ? 12 : 14} className="text-white/18 mt-[3px] shrink-0" />}
          </button>
        );
      })}
    </>
  );
}

// ─── PROGRESS FOOTER ──────────────────────────────────────────────────────────

function ProgressFooter({ completed, total, compact = false }: { completed: number; total: number; compact?: boolean; }) {
  return (
    <div className={`border-t border-white/[0.05] shrink-0 ${compact ? "px-5 py-4" : "px-6 py-5"}`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`text-white/35 ${compact ? "text-[11px]" : "text-sm"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>Progress</span>
        <span className={`text-white/35 ${compact ? "text-[11px]" : "text-sm"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>{completed} / {total}</span>
      </div>
      <div className="h-px bg-white/[0.06] rounded-full overflow-hidden">
        <div className="h-full bg-[#c8a97e] transition-all duration-700" style={{ width: `${(completed / total) * 100}%` }} />
      </div>
    </div>
  );
}

// ─── NAV HEADER ───────────────────────────────────────────────────────────────

function NavHeader({ onClose, closeIcon = "collapse" }: { onClose: () => void; closeIcon?: "collapse" | "x"; }) {
  return (
    <div className="flex items-start justify-between px-5 pt-6 pb-5 border-b border-white/[0.05] shrink-0">
      <div>
        <h2
          className="text-white/92 font-light leading-none mb-1.5"
          style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(1.35rem, 2.2vw, 1.7rem)" }}
        >
          FitAlign
        </h2>
        <p className="text-[#c8a97e]/50 tracking-[0.3em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px" }}>
          Foundations
        </p>
      </div>
      <button
        onClick={onClose}
        className="p-2 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all duration-200 mt-0.5 shrink-0"
      >
        {closeIcon === "collapse" ? <PanelLeftClose size={15} /> : <X size={17} />}
      </button>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

const SCROLLBAR_CSS = `
  .lesson-scroll::-webkit-scrollbar { width: 3px; }
  .lesson-scroll::-webkit-scrollbar-track { background: transparent; }
  .lesson-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.09); border-radius: 2px; }
  .lesson-scroll::-webkit-scrollbar-button { display: none; height: 0; }
`;

export default function App() {
  const [pageIndex, setPageIndex] = useState(0);
  const [revealed, setRevealed]   = useState<number[]>(() => new Array(SCREEN_LIST.length).fill(0));
  const [isReplay, setIsReplay]   = useState<boolean[]>(() => new Array(SCREEN_LIST.length).fill(false));
  const [animKeys, setAnimKeys]   = useState<number[]>(() => new Array(SCREEN_LIST.length).fill(0));
  const [skipAnim, setSkipAnim]   = useState(false);

  // Nav state
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
  const [mobileNavOpen, setMobileNavOpen]       = useState(false);
  const [selectedLesson, setSelectedLesson]     = useState<{ lesson: Lesson; status: LessonStatus } | null>(null);
  const [navWidth, setNavWidth]                 = useState(288);
  const [navCollapsed, setNavCollapsed]         = useState(false);
  // Track whether we're on a narrow screen (mobile)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  const pageRef       = useRef(0);
  const revRef        = useRef<number[]>(new Array(SCREEN_LIST.length).fill(0));
  const lockRef       = useRef(false);
  const accRef        = useRef(0);
  const isResizingRef = useRef(false);
  const touchYRef     = useRef(0);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Complete Introduction when user reaches last page
  useEffect(() => {
    if (pageIndex === TOTAL_PAGES - 1) {
      setCompletedLessons((prev) => {
        if (prev.has(0)) return prev;
        const next = new Set(prev); next.add(0); return next;
      });
    }
  }, [pageIndex]);

  const getLessonStatus = useCallback((lesson: Lesson): LessonStatus => {
    if (completedLessons.has(lesson.id)) return "completed";
    if (lesson.id === 0) return "in_progress";
    if (completedLessons.has(lesson.id - 1)) return "unlocked";
    return "locked";
  }, [completedLessons]);

  // Drag-to-resize
  const handleNavDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startW = navWidth;
    isResizingRef.current = true;
    const onMove = (ev: MouseEvent) => {
      if (!isResizingRef.current) return;
      setNavWidth(Math.max(210, Math.min(480, startW + ev.clientX - startX)));
    };
    const onUp = () => {
      isResizingRef.current = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [navWidth]);

  const goTo = useCallback((pg: number, animate = true) => {
    if (!animate) {
      setSkipAnim(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setSkipAnim(false)));
    }
    pageRef.current = pg;
    setPageIndex(pg);
  }, []);

  const advance = useCallback((forward: boolean) => {
    if (lockRef.current || isResizingRef.current) return;
    lockRef.current = true;
    setTimeout(() => { lockRef.current = false; }, 380);

    const pg = pageRef.current;
    const gi = pg - 1;

    if (forward) {
      if (gi >= 0) {
        const curRev = revRef.current[gi];
        if (curRev < SCREEN_LIST[gi].n) {
          const next = [...revRef.current]; next[gi] = curRev + 1;
          revRef.current = next; setRevealed([...next]); return;
        }
      }
      if (pg < TOTAL_PAGES - 1) {
        const nPg = pg + 1; const nGi = nPg - 1;
        goTo(nPg);
        if (revRef.current[nGi] < 1) {
          const next = [...revRef.current]; next[nGi] = 1;
          revRef.current = next; setRevealed([...next]);
        }
      }
    } else {
      if (gi >= 0 && revRef.current[gi] > 1) {
        const next = [...revRef.current]; next[gi] = revRef.current[gi] - 1;
        revRef.current = next; setRevealed([...next]);
        setIsReplay((prev) => { const n = [...prev]; n[gi] = false; return n; });
        return;
      }
      if (pg > 0) {
        const prevPg = pg - 1; const prevGi = prevPg - 1;
        goTo(prevPg);
        if (prevGi >= 0) {
          setIsReplay((prev) => { const n = [...prev]; n[prevGi] = true; return n; });
          setAnimKeys((prev) => { const n = [...prev]; n[prevGi] = prev[prevGi] + 1; return n; });
          const nextRev = [...revRef.current]; nextRev[prevGi] = SCREEN_LIST[prevGi].n;
          revRef.current = nextRev; setRevealed([...nextRev]);
        }
      }
    }
  }, [goTo]);

  // Returns true if a touch target is an interactive element we shouldn't hijack
  const isInteractive = (target: EventTarget | null): boolean => {
    if (!target) return false;
    return !!(target as Element).closest?.("button, a, input, select, textarea, [role='button']");
  };

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // Don't hijack scroll inside the nav panel
      if ((e.target as Element)?.closest?.(".nav-panel")) return;
      e.preventDefault();
      if (lockRef.current) { accRef.current = 0; return; }
      accRef.current += e.deltaY;
      if (Math.abs(accRef.current) >= 55) { advance(accRef.current > 0); accRef.current = 0; }
    };
    const onKey = (e: KeyboardEvent) => {
      if (mobileNavOpen) return;
      if (["ArrowDown", " ", "PageDown"].includes(e.key)) { e.preventDefault(); advance(true); }
      else if (["ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); advance(false); }
    };
    const onTS = (e: TouchEvent) => {
      // Let interactive elements and nav panel handle their own touches
      if (mobileNavOpen) return;
      if (isInteractive(e.target)) return;
      if ((e.target as Element)?.closest?.(".nav-panel")) return;
      e.preventDefault();
      touchYRef.current = e.touches[0].clientY;
    };
    const onTE = (e: TouchEvent) => {
      if (mobileNavOpen) return;
      if (isInteractive(e.target)) return;
      if ((e.target as Element)?.closest?.(".nav-panel")) return;
      e.preventDefault();
      const dy = touchYRef.current - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) advance(dy > 0);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTS, { passive: false });
    window.addEventListener("touchend", onTE, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTS);
      window.removeEventListener("touchend", onTE);
    };
  }, [advance, mobileNavOpen]);

  const totalUnits = useMemo(() => SCREEN_LIST.reduce((s, sc) => s + sc.n, 0), []);
  const doneUnits  = useMemo(() => {
    if (pageIndex === 0) return 0;
    const gi = pageIndex - 1;
    let s = 0; for (let i = 0; i < gi; i++) s += SCREEN_LIST[i].n;
    return s + (revealed[gi] ?? 0);
  }, [pageIndex, revealed]);
  const progressFrac = totalUnits > 0 ? doneUnits / totalUnits : 0;
  const activeSi = pageIndex === 0 ? -1 : (SCREEN_LIST[pageIndex - 1]?.si ?? 0);

  const jumpToSection = useCallback((si: number) => {
    const idx = SCREEN_LIST.findIndex((s) => s.si === si);
    if (idx < 0) return;
    const pg = idx + 1;
    goTo(pg, false);
    setIsReplay((prev) => { const n = [...prev]; n[idx] = true; return n; });
    setAnimKeys((prev) => { const n = [...prev]; n[idx] = prev[idx] + 1; return n; });
    const nextRev = [...revRef.current]; nextRev[idx] = SCREEN_LIST[idx].n;
    revRef.current = nextRev; setRevealed([...nextRev]);
  }, [goTo]);

  const handleLessonClick = useCallback((lesson: Lesson) => {
    const status = getLessonStatus(lesson);
    if (lesson.id === 0) { setMobileNavOpen(false); return; }
    setSelectedLesson({ lesson, status });
    setMobileNavOpen(false);
  }, [getLessonStatus]);

  const slideTransition = skipAnim ? "none" : "transform 0.52s cubic-bezier(0.25,0.1,0.25,1)";
  const currentBg = pageIndex === 0 ? "#080808" : SCREEN_LIST[pageIndex - 1]?.section.bg ?? "#080808";

  // Desktop nav effective width
  const desktopNavW = navCollapsed ? 52 : navWidth;
  // Content area left offset: only on non-mobile
  const contentLeft = isMobile ? 0 : desktopNavW;

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: currentBg, transition: "background 0.6s ease" }}>
      <style>{SCROLLBAR_CSS}</style>

      {/* ── Desktop sidebar ──────────────────────────────────────────────────── */}
      {!isMobile && (
        <div
          className="nav-panel fixed left-0 top-0 bottom-0 z-40 flex flex-col border-r border-white/[0.07] bg-[#080808]/96 backdrop-blur-md overflow-hidden"
          style={{ width: desktopNavW, transition: "width 0.28s cubic-bezier(0.25,0.1,0.25,1)" }}
        >
          {navCollapsed ? (
            /* Collapsed icon strip */
            <div className="flex flex-col items-center h-full py-4 gap-1.5">
              <button
                onClick={() => setNavCollapsed(false)}
                className="p-2.5 rounded-lg text-white/35 hover:text-white/75 hover:bg-white/[0.06] transition-all duration-200 mb-1"
                title="Expand"
              >
                <PanelLeftOpen size={15} />
              </button>
              <div className="w-px grow bg-white/[0.04] my-1" />
              <div className="flex flex-col items-center gap-1.5">
                {LESSONS.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonClick(lesson)}
                    className="p-1.5 rounded hover:bg-white/[0.05] transition-colors"
                    title={lesson.title}
                  >
                    <StatusIcon status={getLessonStatus(lesson)} size={13} />
                  </button>
                ))}
              </div>
              <div className="w-px grow bg-white/[0.04] my-1" />
            </div>
          ) : (
            <>
              <NavHeader onClose={() => setNavCollapsed(true)} closeIcon="collapse" />
              <div className="flex-1 overflow-y-auto lesson-scroll py-2 min-h-0">
                <LessonList getLessonStatus={getLessonStatus} onClickLesson={handleLessonClick} compact />
              </div>
              <ProgressFooter completed={completedLessons.size} total={LESSONS.length} compact />
              {/* Drag handle */}
              <div
                className="absolute right-0 top-0 bottom-0 w-[5px] cursor-col-resize group"
                onMouseDown={handleNavDragStart}
              >
                <div className="absolute right-0 top-0 bottom-0 w-px bg-white/0 group-hover:bg-white/15 transition-colors duration-200" />
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Mobile hamburger button ───────────────────────────────────────────── */}
      {isMobile && (
        <button
          className="nav-panel fixed top-5 left-4 z-50 flex items-center justify-center rounded-full bg-black/55 border border-white/20 backdrop-blur-md text-white/85 transition-transform active:scale-95"
          style={{ width: 44, height: 44, WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open lessons"
        >
          <Menu size={20} />
        </button>
      )}

      {/* ── Mobile slide-in panel ─────────────────────────────────────────────── */}
      {isMobile && mobileNavOpen && (
        <div className="nav-panel fixed inset-0 z-[200]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            onClick={() => setMobileNavOpen(false)}
          />
          {/* Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute left-0 top-0 bottom-0 flex flex-col bg-[#090808] border-r border-white/[0.08]"
            style={{ width: "min(82vw, 340px)" }}
          >
            <div className="flex items-start justify-between px-6 pt-8 pb-5 border-b border-white/[0.05] shrink-0">
              <div>
                <h2 className="text-white/92 font-light leading-none mb-1.5" style={{ fontFamily: "'Fraunces', serif", fontSize: "1.75rem" }}>
                  FitAlign
                </h2>
                <p className="text-[#c8a97e]/50 tracking-[0.3em] uppercase text-[10px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Foundations
                </p>
              </div>
              <button
                onClick={() => setMobileNavOpen(false)}
                className="p-2 rounded-full bg-white/5 text-white/50 transition-colors mt-1"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto lesson-scroll py-2 min-h-0">
              <LessonList getLessonStatus={getLessonStatus} onClickLesson={handleLessonClick} />
            </div>

            <ProgressFooter completed={completedLessons.size} total={LESSONS.length} />
          </motion.div>
        </div>
      )}

      {/* ── Content area ─────────────────────────────────────────────────────── */}
      <div
        className="absolute top-0 bottom-0 right-0 overflow-hidden"
        style={{ left: contentLeft, transition: "left 0.28s cubic-bezier(0.25,0.1,0.25,1)", touchAction: "none" }}
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
          <div className="h-[1px] bg-white/[0.05]">
            <div className="h-full bg-[#c8a97e] origin-left" style={{ transform: `scaleX(${progressFrac})`, transition: "transform 0.5s ease" }} />
          </div>
          <div className="flex flex-col items-center gap-[6px] pt-[11px] pointer-events-auto">
            <div className="flex items-center gap-1">
              <button onClick={() => goTo(0, false)} className="p-2 cursor-pointer flex items-center justify-center">
                <span className={`block rounded-full transition-all duration-500 ${pageIndex === 0 ? "w-6 h-[3px] bg-[#c8a97e]" : "w-[6px] h-[6px] bg-white/20 hover:bg-white/50"}`} />
              </button>
              {SECTIONS.map((_, i) => (
                <button key={i} onClick={() => jumpToSection(i)} className="p-2 cursor-pointer flex items-center justify-center">
                  <span className={`block rounded-full transition-all duration-500 ${activeSi === i && pageIndex > 0 ? "w-6 h-[3px] bg-[#c8a97e]" : "w-[6px] h-[6px] bg-white/20 hover:bg-white/50"}`} />
                </button>
              ))}
            </div>
            <span
              className="tracking-[0.28em] transition-all duration-300 text-white/70"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(11px, 1.3vw, 14px)" }}
            >
              {pageIndex === 0 ? "INTRODUCTION" : `${SECTIONS[activeSi]?.num ?? "01"} / 04`}
            </span>
          </div>
        </div>

        {/* Back to top */}
        {pageIndex > 0 && (
          <button
            onClick={() => goTo(0)}
            className="absolute bottom-6 right-4 z-20 flex items-center gap-1.5 rounded-full px-3.5 py-2 bg-white/[0.07] border border-white/[0.1] text-white/40 hover:text-white/70 hover:bg-white/[0.12] backdrop-blur-sm transition-all duration-300 active:scale-95"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", letterSpacing: "0.06em", WebkitTapHighlightColor: "transparent" }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 8.5V1.5M1.5 5L5 1.5L8.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Cover */}
        <div className="absolute inset-0" style={{ transform: `translateY(${(0 - pageIndex) * 100}vh)`, transition: slideTransition, willChange: "transform" }}>
          <CoverScreen />
        </div>

        {/* Content screens */}
        {SCREEN_LIST.map((item, gi) => (
          <div
            key={KEY(item.si, item.sci)}
            className="absolute inset-0"
            style={{ transform: `translateY(${(gi + 1 - pageIndex) * 100}vh)`, transition: slideTransition, willChange: "transform" }}
          >
            <ScreenView screen={item.screen} revealed={revealed[gi] ?? 0} isReplay={isReplay[gi] ?? false} animKey={animKeys[gi] ?? 0} />
          </div>
        ))}
      </div>

      {/* Lesson modal */}
      {selectedLesson && (
        <LessonModal lesson={selectedLesson.lesson} status={selectedLesson.status} onClose={() => setSelectedLesson(null)} />
      )}
    </div>
  );
}
