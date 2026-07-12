import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { motion } from "motion/react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

type S = "hero" | "punchline" | "lead" | "body";
interface Unit {
  text: string;
  s: S;
}
interface Screen {
  units: Unit[];
}
interface Section {
  id: string;
  num: string;
  bg: string;
  screens: Screen[];
}
const u = (text: string, s: S): Unit => ({ text, s });

// ─── CONTENT ──────────────────────────────────────────────────────────────────

const SECTIONS: Section[] = [
  {
    id: "s1",
    num: "01",
    bg: "radial-gradient(ellipse at 22% 58%, rgba(210,190,155,0.11) 0%, transparent 54%), #080808",
    screens: [
      {
        units: [
          u(
            "It is my dream that anyone who finds this book in their hands will gain the self-help tools to get out of pain, restore ease in movement, and give every cell in their body the resources it needs to thrive.",
            "lead",
          ),
          u(
            `I hope you feel light, energized, and comfortable—what I like to call the "kid body."`,
            "punchline",
          ),
        ],
      },
      {
        units: [
          u(
            "Whenever people stand upright with strong, relaxed breathing muscles, it becomes almost impossible to feel sad or discouraged.",
            "lead",
          ),
          u(
            "I have been delighted to see my clients not only relieve pain quickly but also become more lighthearted, energized, attractive, and youthful.",
            "body",
          ),
        ],
      },
      {
        units: [
          u(
            "When I am instructing people, I often tell jokes so they will laugh. When they do, I ask them to notice how laughter changes the tension in their abdomen.",
            "body",
          ),
          u("Laughter is a form of pandiculation.", "hero"),
          u(
            "A natural reset that relaxes the torso muscles by making them contract deeply for several seconds. After we laugh, there is a distinct feeling of relaxation and activation in the abdominal region.",
            "body",
          ),
        ],
      },
      {
        units: [
          u(
            `I like to call it the "wisdom of laughter."`,
            "punchline",
          ),
          u(
            "Contracting your muscles in this way resets them via the nervous system, helping them become both more relaxed and more toned.",
            "body",
          ),
        ],
      },
      {
        units: [
          u(
            "Trying to stretch or pull on muscles often triggers a stretch reflex, which can create even more tension and discomfort. For many people, stretching feels stressful or even painful, yet they make themselves do it anyway.",
            "body",
          ),
          u(
            "I do not believe we can find comfort through discomfort.",
            "hero",
          ),
        ],
      },
      {
        units: [
          u(
            "And just as I tell my clients, I ask you not to believe a word I say until you feel it for yourself.",
            "body",
          ),
          u(
            `What you gain from FitAlign is a sense of knowing—an inner understanding of what feels right—rather than a belief about what you "should" do. This book is full of information that is, in truth, just common sense—though, as we know, common sense isn't always so common.`,
            "body",
          ),
        ],
      },
      {
        units: [
          u(
            "Much of what you will learn in FitAlign is how to do less.",
            "hero",
          ),
          u(
            `Remember the adage, "less is more"? It's especially true for the body.`,
            "body",
          ),
        ],
      },
      {
        units: [
          u(
            "When we restore deep, natural breathing, our bio-intelligence begins to release the compensatory patterns we've developed through modern lifestyles of sitting, stressing, and driving.",
            "body",
          ),
          u(
            "Our nervous system takes cues from how we use our voluntary muscles—when we exert unnecessary effort, the sympathetic (stress) response is activated. The longer we remain in that state, the more likely we are to develop autoimmune disorders and chronic pain.",
            "body",
          ),
        ],
      },
      {
        units: [
          u(
            "In my experience working with clients, I've seen that even those who exercise excessively can push themselves into a stress mode. Much of what I now teach focuses on developing perception, kinesthetic awareness, and the ability to truly feel the body.",
            "body",
          ),
          u(
            "People are often amazed that these exercises are so effective—and yet so gentle.",
            "punchline",
          ),
        ],
      },
      {
        units: [
          u("We do not need to suffer to feel good.", "hero"),
          u(
            "Painful workouts are not the only path to gain; in fact, doing less with more awareness often leads to far more profound results.",
            "body",
          ),
        ],
      },
    ],
  },
  {
    id: "s2",
    num: "02",
    bg: "radial-gradient(ellipse at 78% 32%, rgba(110,135,190,0.09) 0%, transparent 50%), linear-gradient(148deg, #090a0e 0%, #080808 100%)",
    screens: [
      {
        units: [
          u(
            "My students spend more time feeling and less time thinking.",
            "punchline",
          ),
          u(
            "The brain is like a computer that can sense itself, and when people stay present with the feeling of breathing, they begin to connect with the deepest levels of their being.",
            "body",
          ),
        ],
      },
      {
        units: [
          u(
            "Many people exercise while listening to loud music, drowning out the subtle sensations of the body and the rhythm of their own breath.",
            "body",
          ),
          u(
            "Yet being alive in this body is a miracle.",
            "hero",
          ),
          u(
            "Even the simplest act—like walking barefoot across the grass—is a complex phenomenon beyond what our conscious mind can comprehend.",
            "body",
          ),
        ],
      },
      {
        units: [
          u(
            "Every breath we take and every move we make is precious beyond words.",
            "punchline",
          ),
          u(
            "Over the past 30 years of teaching, I have been privileged to witness people release deeply held traumas from PTSD through the movements of breathing and the primal functional patterns used in FitAlign.",
            "body",
          ),
        ],
      },
      {
        units: [
          u(
            "I have guided individuals with severe osteoarthritis to use breath to reawaken dormant postural forces—allowing them, for the first time in years, to stand upright without pain.",
            "body",
          ),
          u(
            "Again and again, I've seen people find relief from sciatica, plantar fasciitis, and back pain—sometimes within their very first FitAlign session.",
            "body",
          ),
        ],
      },
      {
        units: [
          u(
            "Many who initially came seeking relief from shoulder or neck pain discovered not only freedom from physical discomfort but also a newfound sense of happiness. Weak breathing muscles and poor posture are often accompanied by anxiety and depression.",
            "body",
          ),
          u(
            "These transformations are no coincidence.",
            "punchline",
          ),
        ],
      },
      {
        units: [
          u("By using the breath to correct posture,", "hero"),
          u(
            "we can simultaneously ease both physical and emotional pain.",
            "punchline",
          ),
        ],
      },
      {
        units: [
          u(
            "The human brain makes up only about 2% of total body weight in the average adult, yet it consumes roughly 20% of the body's oxygen and calories. When the rib cage collapses and breathing becomes shallow, the brain and body both suffer.",
            "body",
          ),
          u(
            "Posture and breathing are inseparable—each defines and reinforces the other.",
            "lead",
          ),
        ],
      },
      {
        units: [
          u(
            "In my search for deeper answers, I began developing YogAlign and later FitAlign Posture Trainings. Over the past 25 years, I have witnessed extraordinary transformations using these methods.",
            "body",
          ),
          u(
            "I've seen people heal hernias without surgery, strengthen flat feet to form natural arches and longer toes, and recover from hip joint pain—avoiding labral tear surgeries altogether.",
            "body",
          ),
          u(
            `I've worked with individuals told their knees were "bone on bone" and that joint replacement was their only option—only to see them become pain-free and return to jogging and downhill skiing without surgery.`,
            "body",
          ),
        ],
      },
      {
        units: [
          u(
            "I've also watched the stress response patterns that create scoliosis unwind, freeing people from the twists in their spines.",
            "body",
          ),
          u(
            "As you read this book, you'll see numerous images and case studies that illustrate these profound physical changes—evidence of what's possible when we retrain the nervous system. These examples are meant to tell a story and to inspire: showing how the movements of breathing can strengthen, tone, and support the body from the inside out.",
            "body",
          ),
        ],
      },
    ],
  },
  {
    id: "s3",
    num: "03",
    bg: "radial-gradient(ellipse at 52% 72%, rgba(88,78,118,0.10) 0%, transparent 54%), #080808",
    screens: [
      {
        units: [
          u(
            "Our advertising and media are saturated with promotions for creams, potions, Botox, and surgeries promising to make us more attractive. Billions of dollars are spent each year on facelifts, breast implants, and cosmetic procedures in the pursuit of beauty.",
            "body",
          ),
          u(
            "I believe that all humans are naturally beautiful and radiant when they embody aligned, natural posture.",
            "punchline",
          ),
        ],
      },
      {
        units: [
          u(
            "Yet, as you look at the before-and-after images in this book, you may be surprised to see how much younger and more vibrant people can appear—without spending a dime on temporary, often harmful interventions that introduce chemicals and foreign objects into the body.",
            "body",
          ),
          u(
            "Before turning to pills or surgery, let us consider the transformative potential of using the movements of breathing to restore posture and enhance the health and vitality of every cell in the body.",
            "lead",
          ),
        ],
      },
      {
        units: [
          u(
            "What if we could teach our elders to use conscious breathing to improve their quality of life? What if many people currently dependent on pain medication could find relief simply through breath-based movement?",
            "body",
          ),
          u(
            "What if children learned experiential anatomy and the importance of strong breathing muscles before years of poor posture and misalignment took their toll?",
            "body",
          ),
          u(
            "Could deep breathing reduce depression, or help treat addictions and phobias?",
            "lead",
          ),
        ],
      },
      {
        units: [
          u(
            "It is imperative that we develop a new field of medicine—Posturology—with specialists trained to use breathing as a foundation for healing. Emerging research confirms that surgeries, pills, and procedures often fail to address the underlying causes of chronic pain.",
            "body",
          ),
          u(
            "Posture and breathing have become major focus areas in health science, with mounting evidence revealing their profound influence on mood, organ function, digestion, elimination, hormones, sexual vitality, and even joint longevity.",
            "body",
          ),
        ],
      },
      {
        units: [
          u(
            "One recent study linked forward head posture to cognitive decline and dementia. The brain, though only about 2% of the body's weight, requires roughly 20% of its oxygen supply.",
            "body",
          ),
          u(
            "When the skull shifts forward from the spine, blood flow through the vertebral arteries can be dramatically reduced—depriving the brain of oxygen and accelerating cell death.",
            "body",
          ),
          u("Posture matters—a lot.", "hero"),
        ],
      },
      {
        units: [
          u(
            "Music and singing can heal the body and the soul! I love to sing and play guitar, write songs and share music with people!",
            "body",
          ),
        ],
      },
    ],
  },
  {
    id: "s4",
    num: "04",
    bg: "radial-gradient(ellipse at 50% 22%, rgba(200,169,126,0.09) 0%, transparent 56%), linear-gradient(to bottom, #100f0d, #080808)",
    screens: [
      {
        units: [
          u(
            "I am simply a messenger—here to share these self-help tools. It is up to you to use them.",
            "body",
          ),
          u("Ultimately, no one can heal you but you.", "hero"),
        ],
      },
      {
        units: [
          u(
            "You can easily learn how to harness the movements of your own breath to heal and connect with your body's innate bio-intelligence.",
            "lead",
          ),
          u(
            "Over the past three decades, I have dedicated my life to developing these somatic, breath-based neuromuscular exercises. I've spent thousands of hours working one-on-one with clients, gaining invaluable feedback and insight into what truly helps relieve pain and correct posture.",
            "body",
          ),
        ],
      },
      {
        units: [
          u(
            "To date, I have trained nearly 500 instructors to teach my posture realignment methods and have guided thousands of people through my Change Your Posture, Change Your Life workshops and classes.",
            "body",
          ),
          u(
            "Nearly 30 years into this journey, I continue to learn more every day—and remain inspired by the body's remarkable capacity to heal when given the right tools and awareness.",
            "body",
          ),
          u(
            "These techniques are my life's work, and I hope they will continue to serve my fellow humans long after I leave this body.",
            "punchline",
          ),
        ],
      },
      {
        units: [
          u(
            "It's often said that we have a health care crisis—but in truth, what we face is a self-care crisis. People need practical, effective tools that can quickly restore health, vitality, and a sense of well-being. That is why I remain deeply passionate about FitAlign Posture Training and YogAlign.",
            "body",
          ),
          u(
            "I envision a world where our children play more, where we all sit less, and where the simple, powerful movements of breathing are used to restore the body's natural alignment—allowing every cell to thrive in harmony.",
            "lead",
          ),
          u(
            "It is amazing to be in my 70's and taking up a new sport like wing foiling!",
            "punchline",
          ),
        ],
      },
    ],
  },
];

// ─── FLAT SCREEN INDEX ────────────────────────────────────────────────────────

const SCREEN_LIST = SECTIONS.flatMap((sec, si) =>
  sec.screens.map((screen, sci) => ({
    si,
    sci,
    n: screen.units.length,
    section: sec,
    screen,
  })),
);
const KEY = (si: number, sci: number) => `${si}-${sci}`;
// page 0 = cover, page 1..N = content screens (globalIdx = page - 1)
const TOTAL_PAGES = 1 + SCREEN_LIST.length;

// ─── TYPOGRAPHY ───────────────────────────────────────────────────────────────

function styleClass(s: S): string {
  const base = "text-center mx-auto w-full break-words";
  switch (s) {
    case "hero":
      return `${base} max-w-[42rem] text-white/88 leading-[1.15]`;
    case "punchline":
      return `${base} max-w-[46rem] text-white/92 leading-[1.22]`;
    case "lead":
      return `${base} max-w-[50rem] text-white/78 leading-[1.44]`;
    case "body":
      return `${base} max-w-[52rem] text-white/52 leading-[1.85]`;
  }
}

function textStyle(s: S): React.CSSProperties {
  const fontSize = {
    hero: "clamp(2.4rem,6vw,5.2rem)",
    punchline: "clamp(1.55rem,3.6vw,3.1rem)",
    lead: "clamp(1.1rem,2.5vw,1.9rem)",
    body: "clamp(0.9rem,1.5vw,1.18rem)",
  }[s];
  const font: React.CSSProperties =
    s === "body"
      ? { fontFamily: "'DM Sans', sans-serif" }
      : ({
          fontFamily: "'Fraunces', serif",
          fontOpticalSizing: "auto",
        } as React.CSSProperties);
  return { ...font, fontSize };
}

// ─── SCREEN ───────────────────────────────────────────────────────────────────

const MT_TRANSITION =
  "margin-top 0.52s cubic-bezier(0.16,1,0.3,1)";

function ScreenView({
  screen,
  revealed,
  isReplay,
  animKey,
}: {
  screen: Screen;
  revealed: number;
  isReplay: boolean;
  animKey: number;
}) {
  const units = isReplay
    ? screen.units
    : screen.units.slice(0, revealed);
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [overflowMode, setOverflowMode] = useState(false);
  // False until the first unit has been revealed — used to snap on first appearance
  const everRevealedRef = useRef(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const group = groupRef.current;
    if (!container || !group || group.children.length === 0)
      return;

    const containerH = container.clientHeight;
    const groupH = group.scrollHeight;
    const isOver = groupH > containerH;

    const applyMt = (mt: number, animate: boolean) => {
      group.style.transition = animate ? MT_TRANSITION : "none";
      group.style.marginTop = `${mt}px`;
    };

    const centerLast = (animate: boolean) => {
      const lastEl = group.children[
        group.children.length - 1
      ] as HTMLElement;
      const currentMt = parseFloat(group.style.marginTop) || 0;
      const intraTop =
        lastEl.offsetParent === container
          ? lastEl.offsetTop - currentMt
          : lastEl.offsetTop;
      applyMt(
        containerH / 2 - intraTop - lastEl.offsetHeight / 2,
        animate,
      );
    };

    if (isReplay) {
      // Restore the final state of this screen: overflow gets last-unit-centered+dimmed,
      // non-overflow gets all-content-centered with stagger.
      setOverflowMode(isOver);
      if (isOver) {
        centerLast(false);
      } else {
        applyMt(Math.max(0, (containerH - groupH) / 2), false);
      }
      return;
    }

    setOverflowMode(isOver);
    // Snap on the very first appearance of this screen; animate all subsequent changes
    const shouldAnimate = everRevealedRef.current;
    everRevealedRef.current = true;

    if (isOver) {
      centerLast(shouldAnimate);
    } else {
      applyMt(
        Math.max(0, (containerH - groupH) / 2),
        shouldAnimate,
      );
    }
  }, [revealed, isReplay, animKey]);

  return (
    <div
      ref={containerRef}
      data-content-scroll
      className="absolute inset-0 overflow-hidden px-8 md:px-14"
    >
      <motion.div
        ref={groupRef as React.RefObject<HTMLDivElement>}
        layout
        transition={{ layout: { duration: 0.6, ease: EASE } }}
        className="w-full flex flex-col items-center gap-12 py-14"
      >
        {units.map((unit, i) => {
          const isNewest = i === units.length - 1;
          // Dimming applies in overflow mode always (including overflow replay)
          const dimmed = overflowMode && !isNewest;
          // Stagger only for non-overflow replay (overflow replay snaps to final state)
          const staggerDelay =
            isReplay && !overflowMode ? 0.08 + i * 0.21 : 0;
          return (
            <motion.p
              key={`${animKey}-${i}`}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: dimmed ? 0.32 : 1, y: 0 }}
              transition={{
                layout: { duration: 0.6, ease: EASE },
                opacity: {
                  duration: 0.82,
                  ease: EASE,
                  delay: staggerDelay,
                },
                y: {
                  duration: 0.82,
                  ease: EASE,
                  delay: staggerDelay,
                },
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
          transition={{
            duration: 5.8,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 1.9,
          }}
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
        <p
          className="text-[#c8a97e]/35 text-[8px] tracking-[0.58em] uppercase mb-10"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        ></p>
        <h1
          className="text-white leading-none"
          style={
            {
              fontFamily: "'Fraunces', serif",
              fontOpticalSizing: "auto",
              fontWeight: 300,
              fontSize: "clamp(4rem, 13vw, 8.5rem)",
            } as React.CSSProperties
          }
        >
          FitAlign
        </h1>
        <p
          className="text-white/50 tracking-[0.22em] mt-7 text-white text-[13px]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Change Your Posture, Change Your Life
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-9 flex flex-col items-center gap-[10px]"
      >
        <motion.div
          animate={{
            scaleY: [0.3, 1, 0.3],
            opacity: [0.08, 0.28, 0.08],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-px h-9 bg-white/40 origin-top"
        />
        <p
          className="text-white/12 text-[8px] tracking-[0.6em]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          SCROLL
        </p>
      </motion.div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  // pageIndex: 0 = cover, 1..N = content screen (globalIdx = pageIndex - 1)
  const [pageIndex, setPageIndex] = useState(0);
  const [revealed, setRevealed] = useState<number[]>(() =>
    new Array(SCREEN_LIST.length).fill(0),
  );
  const [isReplay, setIsReplay] = useState<boolean[]>(() =>
    new Array(SCREEN_LIST.length).fill(false),
  );
  const [animKeys, setAnimKeys] = useState<number[]>(() =>
    new Array(SCREEN_LIST.length).fill(0),
  );
  // When jumping via dot click, skip the slide animation
  const [skipAnim, setSkipAnim] = useState(false);

  const pageRef = useRef(0);
  const revRef = useRef<number[]>(
    new Array(SCREEN_LIST.length).fill(0),
  );
  const lockRef = useRef(false);
  const accRef = useRef(0);

  // Lock body scroll so the document itself never drifts
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const goTo = useCallback((pg: number, animate = true) => {
    if (!animate) {
      setSkipAnim(true);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setSkipAnim(false)),
      );
    }
    pageRef.current = pg;
    setPageIndex(pg);
  }, []);

  const advance = useCallback(
    (forward: boolean) => {
      if (lockRef.current) return;
      lockRef.current = true;
      setTimeout(() => {
        lockRef.current = false;
      }, 380);

      const pg = pageRef.current;
      const gi = pg - 1; // global content-screen index; -1 when on cover

      if (forward) {
        // If on a content screen with unrevealed units → reveal next unit only, no page change
        if (gi >= 0) {
          const curRev = revRef.current[gi];
          const total = SCREEN_LIST[gi].n;
          if (curRev < total) {
            const next = [...revRef.current];
            next[gi] = curRev + 1;
            revRef.current = next;
            setRevealed([...next]);
            return; // ← early return: no page transition
          }
        }
        // All units shown (or on cover) → advance to next page
        if (pg < TOTAL_PAGES - 1) {
          const nPg = pg + 1;
          const nGi = nPg - 1;
          goTo(nPg);
          if (revRef.current[nGi] < 1) {
            const next = [...revRef.current];
            next[nGi] = 1;
            revRef.current = next;
            setRevealed([...next]);
          }
        }
      } else {
        // Step back within the current section first, before going to previous page
        if (gi >= 0 && revRef.current[gi] > 1) {
          const next = [...revRef.current];
          next[gi] = revRef.current[gi] - 1;
          revRef.current = next;
          setRevealed([...next]);
          // Clear isReplay so slice(0, revealed) takes effect
          setIsReplay((prev) => {
            const n = [...prev];
            n[gi] = false;
            return n;
          });
          return;
        }
        // At first unit (or on cover) → go to previous page
        if (pg > 0) {
          const prevPg = pg - 1;
          goTo(prevPg);
          const prevGi = prevPg - 1;
          if (prevGi >= 0) {
            setIsReplay((prev) => {
              const n = [...prev];
              n[prevGi] = true;
              return n;
            });
            setAnimKeys((prev) => {
              const n = [...prev];
              n[prevGi] = prev[prevGi] + 1;
              return n;
            });
            const nextRev = [...revRef.current];
            nextRev[prevGi] = SCREEN_LIST[prevGi].n;
            revRef.current = nextRev;
            setRevealed([...nextRev]);
          }
        }
      }
    },
    [goTo, setIsReplay, setAnimKeys],
  );

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (lockRef.current) {
        accRef.current = 0;
        return;
      }
      accRef.current += e.deltaY;
      if (Math.abs(accRef.current) >= 55) {
        advance(accRef.current > 0);
        accRef.current = 0;
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", " ", "PageDown"].includes(e.key)) {
        e.preventDefault();
        advance(true);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        advance(false);
      }
    };
    let ty = 0;
    const onTS = (e: TouchEvent) => {
      e.preventDefault();
      ty = e.touches[0].clientY;
    };
    const onTE = (e: TouchEvent) => {
      e.preventDefault();
      const dy = ty - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) advance(dy > 0);
    };

    window.addEventListener("wheel", onWheel, {
      passive: false,
    });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTS, {
      passive: false,
    });
    window.addEventListener("touchend", onTE, {
      passive: false,
    });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTS);
      window.removeEventListener("touchend", onTE);
    };
  }, [advance]);

  // ── Progress ──────────────────────────────────────────────────────────────
  const totalUnits = useMemo(
    () => SCREEN_LIST.reduce((s, sc) => s + sc.n, 0),
    [],
  );
  const doneUnits = useMemo(() => {
    if (pageIndex === 0) return 0;
    const gi = pageIndex - 1;
    let s = 0;
    for (let i = 0; i < gi; i++) s += SCREEN_LIST[i].n;
    return s + (revealed[gi] ?? 0);
  }, [pageIndex, revealed]);
  const progressFrac =
    totalUnits > 0 ? doneUnits / totalUnits : 0;

  const activeSi =
    pageIndex === 0
      ? -1
      : (SCREEN_LIST[pageIndex - 1]?.si ?? 0);

  const jumpToSection = useCallback(
    (si: number) => {
      const idx = SCREEN_LIST.findIndex((s) => s.si === si);
      if (idx < 0) return;
      const pg = idx + 1;
      goTo(pg, false);
      setIsReplay((prev) => {
        const n = [...prev];
        n[idx] = true;
        return n;
      });
      setAnimKeys((prev) => {
        const n = [...prev];
        n[idx] = prev[idx] + 1;
        return n;
      });
      const nextRev = [...revRef.current];
      nextRev[idx] = SCREEN_LIST[idx].n;
      revRef.current = nextRev;
      setRevealed([...nextRev]);
    },
    [goTo, setIsReplay, setAnimKeys],
  );

  const slideTransition = skipAnim
    ? "none"
    : "transform 0.52s cubic-bezier(0.25,0.1,0.25,1)";

  // Background changes only at section boundaries (not per-screen)
  const currentBg = pageIndex === 0
    ? "#080808"
    : SCREEN_LIST[pageIndex - 1]?.section.bg ?? "#080808";

  return (
    // Fixed viewport — no scroll container, no drift possible
    // touch-action:none tells browser we handle all gestures ourselves
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ touchAction: "none", background: currentBg, transition: "background 0.6s ease" }}
    >
      {/* ── Progress bar ───────────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="h-[1px] bg-white/[0.05]">
          <div
            className="h-full bg-[#c8a97e] origin-left"
            style={{
              transform: `scaleX(${progressFrac})`,
              transition: "transform 0.5s ease",
            }}
          />
        </div>
        <div className="flex flex-col items-center gap-[6px] pt-[11px] pointer-events-auto">
          <div className="flex items-center gap-1">
            <button
              onClick={() => goTo(0, false)}
              className="p-2 cursor-pointer flex items-center justify-center"
              aria-label="Go to cover"
            >
              <span
                className={`block rounded-full transition-all duration-500 ${
                  pageIndex === 0
                    ? "w-6 h-[3px] bg-[#c8a97e]"
                    : "w-[6px] h-[6px] bg-white/20 hover:bg-white/50"
                }`}
              />
            </button>
            {SECTIONS.map((_, i) => (
              <button
                key={i}
                onClick={() => jumpToSection(i)}
                className="p-2 cursor-pointer flex items-center justify-center"
                aria-label={`Go to section ${i + 1}`}
              >
                <span
                  className={`block rounded-full transition-all duration-500 ${
                    activeSi === i && pageIndex > 0
                      ? "w-6 h-[3px] bg-[#c8a97e]"
                      : "w-[6px] h-[6px] bg-white/20 hover:bg-white/50"
                  }`}
                />
              </button>
            ))}
          </div>
          <span
            className="tracking-[0.32em] transition-all duration-300 text-[#ffffffb0] text-[9px]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {pageIndex === 0
              ? "INTRODUCTION"
              : `${SECTIONS[activeSi]?.num ?? "01"} / 04`}
          </span>
        </div>
      </div>

      {/* ── Back to top ─────────────────────────────────────────────────── */}
      {pageIndex > 0 && (
        <button
          onClick={() => goTo(0)}
          className="fixed bottom-6 left-4 z-50 flex items-center gap-1.5 rounded-full px-3.5 py-2 bg-white/[0.07] border border-white/[0.1] text-white/40 hover:text-white/70 hover:bg-white/[0.12] backdrop-blur-sm transition-all duration-300 active:scale-95"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12px",
            letterSpacing: "0.06em",
          }}
          aria-label="Back to beginning"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 8.5V1.5M1.5 5L5 1.5L8.5 5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* ── Cover — page 0 ─────────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${(0 - pageIndex) * 100}vh)`,
          transition: slideTransition,
          willChange: "transform",
        }}
      >
        <CoverScreen />
      </div>

      {/* ── Content screens — pages 1..N ──────────────────────────────── */}
      {SCREEN_LIST.map((item, gi) => (
        <div
          key={KEY(item.si, item.sci)}
          className="absolute inset-0"
          style={{
            transform: `translateY(${(gi + 1 - pageIndex) * 100}vh)`,
            transition: slideTransition,
            willChange: "transform",
          }}
        >
          <ScreenView
            screen={item.screen}
            revealed={revealed[gi] ?? 0}
            isReplay={isReplay[gi] ?? false}
            animKey={animKeys[gi] ?? 0}
          />
        </div>
      ))}
    </div>
  );
}