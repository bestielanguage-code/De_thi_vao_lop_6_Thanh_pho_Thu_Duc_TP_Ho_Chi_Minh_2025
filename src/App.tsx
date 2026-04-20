import React, { useState, useEffect, useRef } from "react";
import {
  Coins,
  ShoppingBag,
  Move,
  Maximize2,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Palette,
  User,
  Crown,
  Heart,
  Undo2,
  Sparkles,
  Cat,
  Flower2,
  Star,
} from "lucide-react";

const App = () => {
  // --- Game State ---
  const [money, setMoney] = useState(100);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(null);
  const [placedItems, setPlacedItems] = useState([]);
  const [palaceColor, setPalaceColor] = useState("#f3f4f6");
  const [activeTab, setActiveTab] = useState("quiz");
  const [isDragging, setIsDragging] = useState(null);
  const [isResizing, setIsResizing] = useState(null);

  // --- Data ---
  const passages = {
    ai: "Artificial Intelligence (AI) has become a common part of modern education. Many schools and universities now use AI tools to support both teachers and students. The main (1) ______ of AI is its ability to personalize lessons for each student. AI can analyze students' strengths and weaknesses, then suggest exercises that (2) ______ their needs. This helps students learn at their own pace and improve their schoolwork faster. However, personally, it also has some disadvantages. Some students may become too (3) ______ on AI and lose important skills such as critical thinking, creativity, and teamwork. In addition, not all students have equal access to technology, which can create a gap between different groups. In conclusion, teachers and students should use AI wisely, combining it with (4) ______ methods to achieve the best results.",
    earth:
      "Some scientists believe the Earth is 4.6 billion years old. However, the mountains, valleys, rivers, deserts and forests we see today are much younger than that. For example, Mount Everest is about 60 million years old and the Amazon Rainforest is only 10 million years old. The youngest sea in the world is the Baltic Sea, about 15,000 years old. The Earth is always changing because of volcanoes, earthquakes and, of course, wind and rain. Some of these changes are very slow and others are quick. Water and ice can make very big changes to the planet. For example, glaciers can cut through mountains and make deep valleys. It's normal for our planet to change. At the moment, some scientists think it's changing faster than usual. They don't understand everything that is happening, but they know that temperatures are rising. The weather is getting wetter in some places and drier in others, and there are more big storms. However, these changes are not bad for everyone. Because the Arctic is getting warmer, some people in Greenland now own businesses that grow and sell vegetables. That wasn't possible 50 years ago. Farmers in Greenland like the warm weather and hope it will continue.",
  };

  const questions = [
    {
      id: 1,
      type: "mcq",
      passage: passages.ai,
      q: "Question 1: Choose the word that best fits space (1)",
      options: ["advantage", "difficulty", "opinion"],
      answer: "advantage",
      reward: 100,
    },
    {
      id: 2,
      type: "mcq",
      passage: passages.ai,
      q: "Question 2: Choose the word that best fits space (2)",
      options: ["score", "meet", "replace"],
      answer: "meet",
      reward: 100,
    },
    {
      id: 3,
      type: "mcq",
      passage: passages.ai,
      q: "Question 3: Choose the word that best fits space (3)",
      options: ["proud", "interested", "dependent"],
      answer: "dependent",
      reward: 100,
    },
    {
      id: 4,
      type: "mcq",
      passage: passages.ai,
      q: "Question 4: Choose the word that best fits space (4)",
      options: ["traditionally", "traditional", "tradition"],
      answer: "traditional",
      reward: 100,
    },
    {
      id: 5,
      type: "tf",
      passage: passages.earth,
      q: "Question 5: The Baltic Sea is much older than the Amazon Rainforest.",
      answer: "False",
      reward: 100,
    },
    {
      id: 6,
      type: "tf",
      passage: passages.earth,
      q: "Question 6: Our planet is changing, but these changes are also good news for one part of the world.",
      answer: "True",
      reward: 100,
    },
    {
      id: 7,
      type: "mcq",
      passage: passages.earth,
      q: "Question 7: What can cut through mountains and make deep valleys?",
      options: ["rivers of lava", "rivers of flood", "rivers of ice"],
      answer: "rivers of ice",
      reward: 100,
    },
    {
      id: 8,
      type: "write",
      passage: passages.earth,
      q: "Question 8: Write down ONE word in the passage which means 'commercial organizations such as companies, shops or factories'.",
      answer: "businesses",
      reward: 100,
    },
    {
      id: 9,
      type: "write",
      q: "Question 9: Rearrange: celebrated the 50th anniversary / and National Reunification on / Việt Nam / of the Liberation of Southern Việt Nam / April 30th, 2025 /.",
      answer:
        "Việt Nam celebrated the 50th anniversary of the Liberation of Southern Việt Nam and National Reunification on April 30th, 2025.",
      reward: 300,
    },
    {
      id: 10,
      type: "write",
      q: "Question 10: Rearrange: from sunlight and take / plants / in carbon dioxide from / get energy / the air through their leaves /.",
      answer:
        "Plants get energy from sunlight and take in carbon dioxide from the air through their leaves.",
      reward: 300,
    },
    {
      id: 11,
      type: "write",
      q: "Question 11: Rearrange: ChatGPT proved / in their studies / to be a / numerous students / helpful tool for /.",
      answer:
        "ChatGPT proved to be a helpful tool for numerous students in their studies.",
      reward: 300,
    },
    {
      id: 12,
      type: "write",
      q: "Question 12: Rearrange: to use public transportation / Hồ Chí Minh City / building / will encourage more people / new metro lines in /.",
      answer:
        "Building new metro lines in Hồ Chí Minh City will encourage more people to use public transportation.",
      reward: 300,
    },
    {
      id: 13,
      type: "write",
      q: "Question 13: Write sentence: Sunflower Park / be / one of / most famous / landmark / Thủ Đức City /.",
      answer:
        "Sunflower Park is one of the most famous landmarks in Thủ Đức City.",
      reward: 300,
    },
    {
      id: 14,
      type: "write",
      q: "Question 14: Write sentence: It / be / important / us / protect our environment / the effects of air pollution /.",
      answer:
        "It is important for us to protect our environment from the effects of air pollution.",
      reward: 300,
    },
    {
      id: 15,
      type: "write",
      q: "Question 15: Write sentence: Thủ Đức City's / students / participate / STEM Day / /active/ March 29th, 2025 /.",
      answer:
        "Thủ Đức City's students participated in STEM Day actively on March 29th, 2025.",
      reward: 300,
    },
  ];

  const shopItems = [
    {
      id: "p1",
      name: "Sơn Hồng Phấn",
      type: "color",
      value: "#ffd1dc",
      price: 200,
    },
    {
      id: "p2",
      name: "Sơn Xanh Hoàng Gia",
      type: "color",
      value: "#4169e1",
      price: 200,
    },
    {
      id: "p3",
      name: "Sơn Vàng Kim",
      type: "color",
      value: "#ffd700",
      price: 200,
    },
    {
      id: "p4",
      name: "Sơn Xanh Ngọc",
      type: "color",
      value: "#50c878",
      price: 200,
    },
    {
      id: "c1",
      name: "Công chúa Seraphina",
      type: "char",
      sub: "princess",
      price: 800,
    },
    {
      id: "c2",
      name: "Đức Vua Arthur",
      type: "char",
      sub: "king",
      price: 1000,
    },
    {
      id: "c3",
      name: "Nữ Hoàng Elena",
      type: "char",
      sub: "queen",
      price: 1000,
    },
    {
      id: "c4",
      name: "Hoàng Tử Julian",
      type: "char",
      sub: "prince",
      price: 700,
    },
    {
      id: "a1",
      name: "Cánh Bướm Thần Kỳ",
      type: "acc",
      sub: "wings",
      price: 300,
    },
    { id: "a2", name: "Mèo Cung Đình", type: "acc", sub: "cat", price: 400 },
    { id: "a3", name: "Lọ Hoa Hồng", type: "acc", sub: "flower", price: 150 },
    {
      id: "d1",
      name: "Đài Phun Nước",
      type: "decor",
      sub: "fountain",
      price: 500,
    },
  ];

  // --- Handlers ---
  const handleAnswer = (answer) => {
    if (userAnswers[currentQuestionIndex]) return;
    const currentQ = questions[currentQuestionIndex];
    let isCorrect = false;

    if (currentQ.type === "mcq" || currentQ.type === "tf") {
      isCorrect = answer === currentQ.answer;
    } else if (currentQ.type === "write") {
      const normalizedInput = answer
        .toLowerCase()
        .replace(/[.\s]+$/, "")
        .trim();
      const normalizedAnswer = currentQ.answer
        .toLowerCase()
        .replace(/[.\s]+$/, "")
        .trim();
      isCorrect = normalizedInput === normalizedAnswer;
    }

    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: { val: answer, correct: isCorrect },
    });
    if (isCorrect) {
      setMoney((m) => m + currentQ.reward);
      setShowFeedback("correct");
    } else {
      setShowFeedback("wrong");
    }
    setTimeout(() => setShowFeedback(null), 2000);
  };

  const buyItem = (item) => {
    if (money >= item.price) {
      setMoney((m) => m - item.price);
      if (item.type === "color") {
        setPalaceColor(item.value);
      } else {
        const newItem = {
          ...item,
          instanceId: Date.now(),
          x: 40 + Math.random() * 20,
          y: 40 + Math.random() * 20,
          scale: 1,
          color: item.type === "color" ? item.value : "#ffffff",
        };
        setPlacedItems([...placedItems, newItem]);
      }
    }
  };

  const changeItemColor = (instanceId, color) => {
    setPlacedItems(
      placedItems.map((it) =>
        it.instanceId === instanceId ? { ...it, color } : it
      )
    );
  };

  // --- Drag & Resize Logic ---
  const handleMouseDown = (e, instanceId, mode) => {
    e.stopPropagation();
    e.preventDefault();
    const item = placedItems.find((i) => i.instanceId === instanceId);
    if (!item) return;

    if (mode === "drag") {
      setIsDragging({ id: instanceId, startX: e.clientX, startY: e.clientY });
    }
    if (mode === "resize") {
      setIsResizing({
        id: instanceId,
        startX: e.clientX,
        startScale: item.scale,
      });
    }
  };

  useEffect(() => {
    const handleGlobalMove = (e) => {
      if (isDragging) {
        setPlacedItems((prev) =>
          prev.map((item) => {
            if (item.instanceId === isDragging.id) {
              const dx =
                ((e.clientX - isDragging.startX) / window.innerWidth) * 100;
              const dy =
                ((e.clientY - isDragging.startY) / window.innerHeight) * 100;
              return { ...item, x: item.x + dx, y: item.y + dy };
            }
            return item;
          })
        );
        setIsDragging((prev) => ({
          ...prev,
          startX: e.clientX,
          startY: e.clientY,
        }));
      }

      if (isResizing) {
        setPlacedItems((prev) =>
          prev.map((item) => {
            if (item.instanceId === isResizing.id) {
              const dx = (e.clientX - isResizing.startX) / 50;
              const newScale = Math.max(
                0.3,
                Math.min(4, isResizing.startScale + dx)
              );
              return { ...item, scale: newScale };
            }
            return item;
          })
        );
      }
    };

    const handleGlobalUp = () => {
      setIsDragging(null);
      setIsResizing(null);
    };

    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleGlobalMove);
      window.addEventListener("mouseup", handleGlobalUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleGlobalMove);
      window.removeEventListener("mouseup", handleGlobalUp);
    };
  }, [isDragging, isResizing]);

  // --- Renders ---
  const currentQ = questions[currentQuestionIndex];

  // SVG Components
  const PrincessSVG = ({ color = "#fff", scale = 1 }) => (
    <svg
      width={120 * scale}
      height={180 * scale}
      viewBox="0 0 120 180"
      fill="none"
      className="drop-shadow-xl transition-all duration-300"
    >
      <path d="M60 70 L25 175 Q60 185 95 175 Z" fill={color} />
      <path d="M60 75 L35 175 Q60 180 85 175 Z" fill="#fff" opacity="0.3" />
      <path d="M52 50 Q60 42 68 50 L64 75 Q60 80 56 75 Z" fill="#FFE4E1" />
      <circle cx="60" cy="35" r="16" fill="#FFE4E1" />
      <path
        d="M42 35 Q35 70 42 100"
        stroke="#4B2C20"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M78 35 Q85 70 78 100"
        stroke="#4B2C20"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path d="M42 32 Q60 8 78 32" fill="#4B2C20" />
      <ellipse cx="54" cy="38" rx="1.8" ry="2.8" fill="#333" />
      <ellipse cx="66" cy="38" rx="1.8" ry="2.8" fill="#333" />
      <path
        d="M58 45 Q60 47 62 45"
        stroke="#FF69B4"
        strokeWidth="1.2"
        fill="none"
      />
      <path d="M50 20 L60 12 L70 20 L60 16 Z" fill="#FFD700" />
    </svg>
  );

  const PalaceSVG = ({ color }) => (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className="bg-[#f0f9ff]"
    >
      <style>
        {`
          @keyframes wave {
            0% { transform: skewY(0deg); }
            50% { transform: skewY(5deg); }
            100% { transform: skewY(0deg); }
          }
          .flag-wave {
            animation: wave 2s ease-in-out infinite;
            transform-origin: left center;
          }
          @keyframes sway {
            0% { transform: rotate(-2deg); }
            50% { transform: rotate(2deg); }
            100% { transform: rotate(-2deg); }
          }
          .flower-sway {
            animation: sway 3s ease-in-out infinite;
            transform-origin: bottom center;
          }
        `}
      </style>

      {/* Nền trời dịu mát */}
      <rect width="800" height="600" fill="url(#skyGrad)" />
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#f0f9ff" />
        </linearGradient>
      </defs>

      {/* Thân chính cung điện */}
      <rect
        x="250"
        y="300"
        width="300"
        height="200"
        fill={color}
        stroke="#94a3b8"
        strokeWidth="1.5"
        rx="4"
      />

      {/* 4 Tòa tháp với Cờ phướn */}
      {[
        { x: 200, y: 180, w: 60, h: 320, roofY: 100 },
        { x: 540, y: 180, w: 60, h: 320, roofY: 100 },
        { x: 180, y: 350, w: 50, h: 150, roofY: 300 },
        { x: 570, y: 350, w: 50, h: 150, roofY: 300 },
      ].map((t, i) => (
        <g key={i}>
          <rect
            x={t.x}
            y={t.y}
            width={t.w}
            height={t.h}
            fill={color}
            stroke="#94a3b8"
            strokeWidth="1.5"
            rx="2"
          />
          <path
            d={`M${t.x} ${t.y} L${t.x + t.w / 2} ${t.roofY} L${t.x + t.w} ${
              t.y
            } Z`}
            fill="#475569"
          />
          {/* Cờ trên đỉnh tháp */}
          <g transform={`translate(${t.x + t.w / 2}, ${t.roofY})`}>
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-30"
              stroke="#334155"
              strokeWidth="2"
            />
            <path
              d="M0 -30 Q15 -35 30 -30 L30 -15 Q15 -10 0 -15 Z"
              fill="#f43f5e"
              className="flag-wave"
            />
          </g>
        </g>
      ))}

      {/* Cửa chính nguy nga */}
      <path
        d="M360 500 Q400 420 440 500 Z"
        fill="#ffffff"
        stroke="#94a3b8"
        strokeWidth="2"
      />
      <circle cx="400" cy="460" r="10" fill="#facc15" opacity="0.6" />

      {/* Trang trí hoa hồng leo và bụi hoa phong cách manhwa */}
      <g className="flower-sway">
        {/* Bụi hoa bên trái */}
        <circle cx="230" cy="480" r="15" fill="#fecdd3" />
        <circle cx="215" cy="485" r="12" fill="#fda4af" />
        <circle cx="245" cy="485" r="12" fill="#fda4af" />
        {/* Hoa hồng nhỏ điểm xuyết */}
        <circle cx="230" cy="475" r="4" fill="#fb7185" />
        <circle cx="215" cy="482" r="3" fill="#fb7185" />
      </g>

      <g className="flower-sway" style={{ animationDelay: "1s" }}>
        {/* Bụi hoa bên phải */}
        <circle cx="570" cy="480" r="15" fill="#fecdd3" />
        <circle cx="555" cy="485" r="12" fill="#fda4af" />
        <circle cx="585" cy="485" r="12" fill="#fda4af" />
        {/* Hoa hồng nhỏ */}
        <circle cx="570" cy="475" r="4" fill="#fb7185" />
        <circle cx="585" cy="482" r="3" fill="#fb7185" />
      </g>

      {/* Dây leo hoa hồng trên thân tháp chính */}
      <path
        d="M260 500 Q270 450 260 400"
        stroke="#16a34a"
        strokeWidth="2"
        fill="none"
        opacity="0.4"
      />
      <circle
        cx="260"
        cy="450"
        r="4"
        fill="#fb7185"
        className="animate-pulse"
      />
      <path
        d="M540 500 Q530 450 540 400"
        stroke="#16a34a"
        strokeWidth="2"
        fill="none"
        opacity="0.4"
      />
      <circle
        cx="540"
        cy="430"
        r="4"
        fill="#fb7185"
        className="animate-pulse"
      />
    </svg>
  );

  return (
    <div className="flex flex-col h-screen bg-[#faf9f6] font-sans overflow-hidden select-none">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b z-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 rounded-xl">
            <Crown className="text-amber-600" size={28} />
          </div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            Cung Điện Hoàng Gia
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full border border-amber-200">
            <Coins className="text-amber-500" size={20} />
            <span className="text-lg font-bold text-amber-700">{money}</span>
          </div>
          <nav className="flex bg-gray-100 rounded-lg p-1">
            {["quiz", "shop", "palace"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-white shadow text-amber-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "quiz"
                  ? "Luyện Tập"
                  : tab === "shop"
                  ? "Cửa Hàng"
                  : "Trang Trí"}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 relative flex overflow-hidden">
        {/* Left Side: Palace Designer */}
        <div
          className={`flex-1 relative bg-gray-100 transition-all duration-500 ${
            activeTab === "palace" ? "w-full" : "hidden md:block md:w-1/2"
          }`}
        >
          <div className="absolute inset-0 z-0">
            <PalaceSVG color={palaceColor} />
          </div>

          <div className="absolute inset-0 z-10 overflow-hidden">
            {placedItems.map((item) => (
              <div
                key={item.instanceId}
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  position: "absolute",
                  transform: "translate(-50%, -50%)",
                  cursor:
                    isDragging?.id === item.instanceId ? "grabbing" : "grab",
                }}
                className="group border-2 border-transparent hover:border-amber-400 rounded-lg"
                onMouseDown={(e) => handleMouseDown(e, item.instanceId, "drag")}
              >
                {/* Control Menu */}
                <div className="hidden group-hover:flex absolute -top-12 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-full px-4 py-1.5 items-center gap-3 z-50 border border-amber-100">
                  <button
                    onMouseDown={(e) =>
                      handleMouseDown(e, item.instanceId, "resize")
                    }
                    className="p-1.5 hover:bg-amber-50 text-amber-600 rounded-full cursor-nwse-resize"
                    title="Phóng to / Thu nhỏ"
                  >
                    <Maximize2 size={18} />
                  </button>
                  {item.type !== "acc" && (
                    <input
                      type="color"
                      value={item.color || "#ffffff"}
                      onChange={(e) =>
                        changeItemColor(item.instanceId, e.target.value)
                      }
                      className="w-6 h-6 cursor-pointer rounded-full border-2 border-white shadow-sm"
                    />
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPlacedItems(
                        placedItems.filter(
                          (i) => i.instanceId !== item.instanceId
                        )
                      );
                    }}
                    className="p-1.5 hover:bg-red-50 text-red-500 rounded-full"
                  >
                    <Undo2 size={18} />
                  </button>
                </div>

                {item.sub === "princess" && (
                  <PrincessSVG color={item.color} scale={item.scale} />
                )}
                {item.sub === "king" && (
                  <div style={{ transform: `scale(${item.scale})` }}>
                    <Crown
                      size={60}
                      fill={item.color}
                      className="text-gray-800"
                    />
                    <div className="w-10 h-16 bg-blue-800 mx-auto rounded-t-lg" />
                  </div>
                )}
                {item.sub === "queen" && (
                  <PrincessSVG color="#8e44ad" scale={item.scale} />
                )}
                {item.sub === "prince" && (
                  <div style={{ transform: `scale(${item.scale})` }}>
                    {" "}
                    <User size={50} className="text-blue-500" />{" "}
                  </div>
                )}
                {item.sub === "wings" && (
                  <Sparkles
                    size={60 * item.scale}
                    className="text-amber-400 animate-pulse"
                  />
                )}
                {item.sub === "cat" && (
                  <Cat size={40 * item.scale} className="text-orange-400" />
                )}
                {item.sub === "flower" && (
                  <Flower2 size={40 * item.scale} className="text-pink-500" />
                )}
                {item.sub === "fountain" && (
                  <div
                    className="w-32 h-20 bg-blue-100 border-4 border-gray-300 rounded-full flex items-center justify-center"
                    style={{ transform: `scale(${item.scale})` }}
                  >
                    🌊
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Quiz / Shop */}
        <div
          className={`transition-all duration-300 flex flex-col bg-white border-l shadow-2xl z-30 ${
            activeTab === "palace" ? "w-0 overflow-hidden" : "w-full md:w-1/2"
          }`}
        >
          {activeTab === "quiz" && (
            <div className="flex flex-col h-full overflow-y-auto">
              <div className="p-6 border-b bg-gray-50 flex justify-between items-center sticky top-0 z-10">
                <span className="font-bold text-gray-700">
                  Câu hỏi {currentQuestionIndex + 1} / {questions.length}
                </span>
                <div className="flex gap-2">
                  <button
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex((v) => v - 1)}
                    className="p-2 bg-white border rounded-lg hover:bg-gray-100 disabled:opacity-30"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    disabled={currentQuestionIndex === questions.length - 1}
                    onClick={() => setCurrentQuestionIndex((v) => v + 1)}
                    className="p-2 bg-white border rounded-lg hover:bg-gray-100 disabled:opacity-30"
                  >
                    <ChevronRight />
                  </button>
                </div>
              </div>

              <div className="p-8 space-y-6">
                {currentQ.passage && (
                  <div className="p-5 bg-blue-50 rounded-xl border border-blue-100 text-gray-700 leading-relaxed shadow-inner max-h-60 overflow-y-auto">
                    <h4 className="font-bold text-blue-800 mb-3 text-sm flex items-center gap-2">
                      📖 Bài Đọc
                    </h4>
                    {currentQ.passage}
                  </div>
                )}

                <div className="space-y-4">
                  <p className="text-lg font-bold text-gray-800">
                    {currentQ.q}
                  </p>

                  {showFeedback && (
                    <div
                      className={`flex items-center gap-2 p-3 rounded-lg animate-bounce ${
                        showFeedback === "correct"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {showFeedback === "correct" ? (
                        <CheckCircle2 />
                      ) : (
                        <XCircle />
                      )}
                      <span className="font-bold">
                        {showFeedback === "correct"
                          ? "Chính xác! + Vàng"
                          : "Chưa đúng rồi!"}
                      </span>
                    </div>
                  )}

                  <div className="grid gap-3">
                    {currentQ.type === "mcq" &&
                      currentQ.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleAnswer(opt)}
                          disabled={userAnswers[currentQuestionIndex]}
                          className={`p-4 text-left border-2 rounded-xl transition-all ${
                            userAnswers[currentQuestionIndex]?.val === opt
                              ? userAnswers[currentQuestionIndex].correct
                                ? "border-green-500 bg-green-50"
                                : "border-red-500 bg-red-50"
                              : "border-gray-100 hover:border-amber-300 hover:bg-amber-50"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}

                    {currentQ.type === "tf" && (
                      <div className="flex gap-4">
                        {["True", "False"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleAnswer(opt)}
                            disabled={userAnswers[currentQuestionIndex]}
                            className={`flex-1 p-4 border-2 rounded-xl font-bold transition-all ${
                              userAnswers[currentQuestionIndex]?.val === opt
                                ? userAnswers[currentQuestionIndex].correct
                                  ? "border-green-500 bg-green-50"
                                  : "border-red-500 bg-red-50"
                                : "border-gray-100 hover:border-amber-300"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}

                    {currentQ.type === "write" && (
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Nhập đáp án của bạn..."
                          className="w-full p-4 border-2 border-gray-100 rounded-xl outline-none focus:border-amber-400"
                          onKeyDown={(e) => {
                            if (
                              e.key === "Enter" &&
                              !userAnswers[currentQuestionIndex]
                            )
                              handleAnswer(e.target.value);
                          }}
                        />
                        <button
                          onClick={(e) =>
                            handleAnswer(e.target.previousSibling.value)
                          }
                          disabled={userAnswers[currentQuestionIndex]}
                          className="w-full py-4 bg-amber-500 text-white font-bold rounded-xl shadow-lg hover:bg-amber-600 transition-all"
                        >
                          Gửi Đáp Án
                        </button>
                      </div>
                    )}
                  </div>

                  {userAnswers[currentQuestionIndex] && (
                    <div className="p-4 bg-gray-50 border rounded-lg text-sm text-gray-600">
                      <p className="font-bold">
                        Đáp án đúng:{" "}
                        <span className="text-amber-600 font-normal italic">
                          "{currentQ.answer}"
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "shop" && (
            <div className="flex flex-col h-full bg-gray-50/50">
              <div className="p-6 bg-white border-b sticky top-0 z-10 flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingBag className="text-amber-500" /> Royal Emporium
                </h2>
                <div className="text-amber-600 font-bold">{money} 💰</div>
              </div>

              <div className="p-6 overflow-y-auto space-y-8">
                {/* Accessories */}
                <section>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Star size={16} /> Phụ Kiện & Thú Cưng
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {shopItems
                      .filter((i) => i.type === "acc")
                      .map((item) => (
                        <button
                          key={item.id}
                          onClick={() => buyItem(item)}
                          disabled={money < item.price}
                          className="p-4 bg-white rounded-2xl border-2 border-gray-100 hover:border-amber-400 transition-all shadow-sm disabled:opacity-50"
                        >
                          <div className="w-10 h-10 bg-amber-50 rounded-lg mb-2 flex items-center justify-center mx-auto">
                            {item.sub === "wings" && <Sparkles />}
                            {item.sub === "cat" && <Cat />}
                            {item.sub === "flower" && <Flower2 />}
                          </div>
                          <p className="font-bold text-gray-800 text-sm text-center">
                            {item.name}
                          </p>
                          <p className="text-amber-600 font-bold text-xs text-center">
                            {item.price} 💰
                          </p>
                        </button>
                      ))}
                  </div>
                </section>

                {/* Characters */}
                <section>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <User size={16} /> Nhân Vật Hoàng Gia
                  </h3>
                  <div className="space-y-3">
                    {shopItems
                      .filter((i) => i.type === "char")
                      .map((item) => (
                        <button
                          key={item.id}
                          onClick={() => buyItem(item)}
                          disabled={money < item.price}
                          className="w-full p-4 bg-white rounded-2xl border-2 border-gray-100 hover:border-amber-400 transition-all flex items-center gap-4 shadow-sm disabled:opacity-50"
                        >
                          <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden scale-50">
                            {item.sub === "princess" ? (
                              <PrincessSVG />
                            ) : item.sub === "king" ? (
                              <Crown />
                            ) : (
                              <User />
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-bold text-gray-800">
                              {item.name}
                            </p>
                            <p className="text-amber-600 text-sm font-bold">
                              {item.price} 💰
                            </p>
                          </div>
                        </button>
                      ))}
                  </div>
                </section>

                {/* Paint */}
                <section>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Palette size={16} /> Màu Sơn Cung Điện
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {shopItems
                      .filter((i) => i.type === "color")
                      .map((item) => (
                        <button
                          key={item.id}
                          onClick={() => buyItem(item)}
                          disabled={money < item.price}
                          className="p-4 bg-white rounded-2xl border-2 border-gray-100 hover:border-amber-400 transition-all shadow-sm disabled:opacity-50"
                        >
                          <div
                            className="w-full h-8 rounded-lg mb-2"
                            style={{ backgroundColor: item.value }}
                          />
                          <p className="font-bold text-gray-800 text-xs text-center">
                            {item.name}
                          </p>
                          <p className="text-amber-600 font-bold text-xs text-center">
                            {item.price} 💰
                          </p>
                        </button>
                      ))}
                  </div>
                </section>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
