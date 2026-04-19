/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Utensils, 
  Heart, 
  Info, 
  ChevronRight, 
  AlertCircle,
  Coffee,
  Apple,
  Wind
} from 'lucide-react';

// --- Constants & Data ---

interface MonthData {
  month: number;
  symptoms: {
    title: string;
    reason: string;
    tips: string[];
  }[];
  diet: {
    keyNutrients: string[];
    recommendedFoods: { name: string; benefit: string; icon: string }[];
    breakfast: string;
    lunch: string;
    dinner: string;
    snack: string;
  };
}

const PREGNANCY_DATA: MonthData[] = [
  {
    month: 1,
    symptoms: [
      {
        title: "恶心呕吐 (孕吐)",
        reason: "主要由于体内HCG（人绒毛膜促性腺激素）水平迅速升高，以及雌激素的变化导致胃肠道平滑肌松弛。",
        tips: ["少量多餐", "早晨起床前吃几块苏打饼干", "避免油腻辛辣饮食"]
      },
      {
        title: "乳房胀痛",
        reason: "激素变化使乳腺组织开始发育，为未来的哺乳做准备。",
        tips: ["更换舒适的全棉内衣", "温水淋浴缓解"]
      }
    ],
    diet: {
      keyNutrients: ["叶酸", "蛋白质"],
      recommendedFoods: [
        { name: "猕猴桃", benefit: "丰富叶酸", icon: "🥝" },
        { name: "全麦面包", benefit: "缓解孕吐", icon: "🍞" },
        { name: "深海鱼", benefit: "优质蛋白", icon: "🐟" }
      ],
      breakfast: "燕麦粥配核桃 + 水煮蛋",
      lunch: "清蒸鱼 + 炒青菜 + 杂粮饭",
      dinner: "西红柿炖豆腐 + 小份米饭",
      snack: "酸奶 + 几颗坚果"
    }
  },
  {
    month: 2,
    symptoms: [
      {
        title: "极度疲劳",
        reason: "身体在全力“制造”胎盘，耗费巨大的能量。同时孕酮水平升高会让人感到嗜睡。",
        tips: ["保证充足睡眠", "中午小憩20-30分钟"]
      },
      {
        title: "尿频",
        reason: "子宫开始增大并压迫膀胱。",
        tips: ["白天多喝水，睡前2小时减少饮水"]
      }
    ],
    diet: {
      keyNutrients: ["镁", "维生素B6"],
      recommendedFoods: [
        { name: "香蕉", benefit: "缓解抽筋和呕吐", icon: "🍌" },
        { name: "核桃", benefit: "补脑补锌", icon: "🥜" },
        { name: "菠菜", benefit: "铁质与叶酸", icon: "🥬" }
      ],
      breakfast: "香蕉松饼 + 纯牛奶",
      lunch: "菠菜猪肝汤 + 炒时蔬 + 米饭",
      dinner: "鸡丝面 + 凉拌黄瓜",
      snack: "苏打饼干 (防孕吐)"
    }
  },
  {
    month: 3,
    symptoms: [
      {
        title: "情绪波动",
        reason: "大幅波动的激素水平加上对未知的担忧。",
        tips: ["多与家人沟通", "听轻柔音乐"]
      }
    ],
    diet: {
      keyNutrients: ["钙", "维生素A"],
      recommendedFoods: [
        { name: "胡萝卜", benefit: "眼部发育", icon: "🥕" },
        { name: "豆腐", benefit: "植物钙源", icon: "🍲" },
        { name: "草莓", benefit: "维生素C", icon: "🍓" }
      ],
      breakfast: "红薯粥 + 芝麻酱花卷",
      lunch: "胡萝卜炒肉丝 + 虾皮紫菜汤",
      dinner: "清炖排骨汤面",
      snack: "苹果片"
    }
  },
  // Simplified for other months to maintain performance/size, but covering 1-10 (40 weeks)
  {
    month: 4,
    symptoms: [
      { title: "胃口大增", reason: "孕早期不适减轻，胎儿进入快速生长期。", tips: ["控制糖分摄入", "均衡营养"] }
    ],
    diet: {
      keyNutrients: ["铁", "锌"],
      recommendedFoods: [{ name: "牛肉", benefit: "补铁", icon: "🥩" }, { name: "黑木耳", benefit: "补血", icon: "🍄" }],
      breakfast: "牛奶 + 全麦面包片", lunch: "杭椒牛柳 + 炒菜心", dinner: "银耳雪梨汤 + 蔬菜卷", snack: "腰果"
    }
  },
  {
    month: 5,
    symptoms: [
      { title: "胎动感", reason: "胎儿肌肉力量增强，动作能被触知。", tips: ["开始数胎动", "温柔胎教"] }
    ],
    diet: {
      keyNutrients: ["DHA", "钙"],
      recommendedFoods: [{ name: "三文鱼", benefit: "脑部发育", icon: "🍣" }, { name: "牛奶", benefit: "骨骼钙质", icon: "🥛" }],
      breakfast: "豆浆 + 菜包", lunch: "红焖鱼块 + 什锦豆羹", dinner: "番茄牛肉面", snack: "火龙果"
    }
  },
  {
    month: 6,
    symptoms: [
      { title: "便秘/痔疮", reason: "子宫压迫肠道，肠蠕动减慢。", tips: ["多吃膳食纤维", "多喝水"] }
    ],
    diet: {
      keyNutrients: ["粗纤维", "钾"],
      recommendedFoods: [{ name: "玉米", benefit: "促进排便", icon: "🌽" }, { name: "红薯", benefit: "通便排毒", icon: "🍠" }],
      breakfast: "玉米牛奶粥", lunch: "清炖鸡汤 + 凉拌秋葵", dinner: "什锦炒饭", snack: "梨"
    }
  },
  {
    month: 7,
    symptoms: [
      { title: "水肿", reason: "子宫压迫下腔静脉，影响血液回流。", tips: ["垫高腿部睡觉", "穿宽松鞋子"] }
    ],
    diet: {
      keyNutrients: ["蛋白质", "适度盐分"],
      recommendedFoods: [{ name: "冬瓜", benefit: "利尿消肿", icon: "🍈" }, { name: "红豆", benefit: "健脾除湿", icon: "🫘" }],
      breakfast: "红豆花生汤", lunch: "冬瓜排骨汤 + 虾仁豆角", dinner: "全麦馒头 + 炒蛋", snack: "橙子"
    }
  },
  {
    month: 8,
    symptoms: [
      { title: "呼吸短促", reason: "增大的子宫顶向膈肌，减少肺部扩张空间。", tips: ["减慢动作速度", "保持坐姿端正"] }
    ],
    diet: {
      keyNutrients: ["磷", "维生素D"],
      recommendedFoods: [{ name: "鸡蛋", benefit: "全能营养", icon: "🥚" }, { name: "虾皮", benefit: "极高含钙", icon: "🦐" }],
      breakfast: "鸡蛋奶酪三明治", lunch: "海米冬瓜汤 + 香菇滑鸡", dinner: "南瓜粥", snack: "小西红柿"
    }
  },
  {
    month: 9,
    symptoms: [
      { title: "背痛/耻骨痛", reason: "身体分泌松弛素为分娩做准备，重心前移。", tips: ["托腹带缓解", "侧卧睡姿"] }
    ],
    diet: {
      keyNutrients: ["维生素K", "能量"],
      recommendedFoods: [{ name: "西兰花", benefit: "防止凝血紊乱", icon: "🥦" }, { name: "燕麦", benefit: "持久能量", icon: "🥣" }],
      breakfast: "牛奶麦片 + 坚果", lunch: "西兰花炒肉片 + 鱼香肉丝", dinner: "黑米粥 + 蒸粗粮", snack: "葡萄"
    }
  },
  {
    month: 10,
    symptoms: [
      { title: "假性宫缩", reason: "身体在为分娩进行“演习”。", tips: ["注意临产预兆", "准备待产包"] }
    ],
    diet: {
      keyNutrients: ["能量储备", "维生素"],
      recommendedFoods: [{ name: "蜂蜜", benefit: "润肠能量", icon: "🍯" }, { name: "巧克力", benefit: "紧急能量", icon: "🍫" }],
      breakfast: "粥配肉松 + 蛋", lunch: "白灼心菜 + 红烧鱼", dinner: "番茄蛋汤面", snack: "巧克力 (少量)"
    }
  }
];

// --- Sub-components ---

const Header = () => (
  <header className="px-5 pt-6 pb-2 bg-white sticky top-0 z-50">
    <div className="flex flex-col">
      <h1 className="text-xl font-bold text-primary">孕期守护百科</h1>
      <p className="text-[12px] text-text-light mt-1">为您提供专业的孕期百科与营养建议</p>
    </div>
  </header>
);

const SectionTitle = ({ title, color = "primary" }: { title: string, color?: string }) => (
  <div className="flex items-center mb-3">
    <i className={`w-1 h-4 rounded-full bg-${color} mr-2`} />
    <h2 className="text-base font-semibold text-text-main">{title}</h2>
  </div>
);

// --- Main App ---

export default function App() {
  const [activeMonth, setActiveMonth] = useState(1);
  const [activeTab, setActiveTab] = useState<'encyclopedia' | 'menu'>('encyclopedia');

  const currentMonthData = PREGNANCY_DATA.find(d => d.month === activeMonth) || PREGNANCY_DATA[0];

  return (
    <div className="min-h-screen bg-bg-app font-sans pb-24 max-w-md mx-auto shadow-xl flex flex-col">
      <Header />

      {/* Month Selector */}
      <div className="px-5 py-3 overflow-hidden bg-white">
        <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
          {PREGNANCY_DATA.map((data) => (
            <button
              key={data.month}
              onClick={() => setActiveMonth(data.month)}
              className={`flex-shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center transition-all duration-200 border ${
                activeMonth === data.month 
                ? 'bg-primary text-white border-primary shadow-sm' 
                : 'bg-white text-text-main border-border'
              }`}
            >
              <span className="text-sm font-bold leading-none">{data.month}</span>
              <span className="text-[9px] mt-0.5">月</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Tabs */}
      <div className="px-5 py-4">
        <div className="bg-white/60 p-1 rounded-xl flex gap-1 border border-border">
          <button 
            onClick={() => setActiveTab('encyclopedia')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'encyclopedia' ? 'bg-white text-primary shadow-sm' : 'text-text-light'
            }`}
          >
            <BookOpen size={14} /> 身体百科
          </button>
          <button 
            onClick={() => setActiveTab('menu')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'menu' ? 'bg-white text-primary shadow-sm' : 'text-text-light'
            }`}
          >
            <Utensils size={14} /> 推荐菜单
          </button>
        </div>
      </div>

      <main className="px-5 flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'encyclopedia' ? (
            <motion.div
              key={`enc-${activeMonth}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <SectionTitle title={`第 ${activeMonth} 个月：百科内容`} />

              {/* Tailored message for nausea moved here */}
              {activeMonth === 1 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-yellow-50 rounded-2xl border border-yellow-200 flex gap-3 items-center mb-4"
                >
                  <div className="bg-yellow-400 p-2 rounded-xl">
                     <AlertCircle className="text-white size-5" />
                  </div>
                  <p className="text-[12px] text-yellow-800 font-medium">
                     看到你提到感觉很恶心。试试在床头放一些<span className="font-bold underline">原味苏打饼干</span>，早起刷牙前吃一小块会好很多哦。
                  </p>
                </motion.div>
              )}
              
              {currentMonthData.symptoms.map((symptom, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-border">
                  <div className="mb-2">
                    <span className="bg-[#FFF0F3] text-primary px-2 py-0.5 rounded text-[11px] font-medium mb-1 inline-block">
                      症状解析
                    </span>
                    <h3 className="font-bold text-text-main text-[15px]">{symptom.title}</h3>
                  </div>
                  <p className="text-[13px] text-text-main leading-relaxed mb-3">
                    {symptom.reason}
                  </p>
                  <div className="bg-[#FDF7F8] rounded-xl p-3 border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                       <Info className="size-3.5 text-primary" />
                       <span className="text-[11px] font-bold text-primary">建议</span>
                    </div>
                    <ul className="space-y-1.5">
                      {symptom.tips.map((tip, tIdx) => (
                        <li key={tIdx} className="text-[12px] text-text-light flex items-start gap-1.5 leading-tight">
                          <span className="text-primary">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={`menu-${activeMonth}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <SectionTitle title={`第 ${activeMonth} 个月：推荐食谱`} color="secondary" />

              {/* Major Nutrients Tags */}
              <div className="flex flex-wrap gap-2 mb-2">
                {currentMonthData.diet.keyNutrients.map((n, i) => (
                  <span key={i} className="px-2 py-0.5 bg-secondary/10 text-secondary text-[10px] font-bold rounded">
                    #{n}
                  </span>
                ))}
              </div>

              {/* Recommended Foods Grid */}
              <div className="grid grid-cols-2 gap-3 pb-2">
                {currentMonthData.diet.recommendedFoods.map((food, i) => (
                  <div key={i} className="bg-white p-3 rounded-xl border border-border shadow-sm flex items-center gap-3">
                    <div className="text-2xl bg-bg-app size-10 flex items-center justify-center rounded-lg">{food.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-bold text-text-main truncate">{food.name}</p>
                      <p className="text-[9px] text-text-light mt-0.5 truncate">{food.benefit}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Daily Menu List */}
              <div className="bg-white rounded-2xl overflow-hidden border border-border shadow-sm">
                <div className="bg-secondary/10 px-4 py-3 border-b border-border flex items-center justify-between">
                  <span className="text-secondary font-bold text-[14px]">每日营养餐单</span>
                  <Utensils className="text-secondary size-4" />
                </div>
                <div className="p-4 space-y-4">
                  {[
                    { label: "早餐", value: currentMonthData.diet.breakfast, icon: "🌅" },
                    { label: "午餐", value: currentMonthData.diet.lunch, icon: "🌤️" },
                    { label: "茶点", value: currentMonthData.diet.snack, icon: "🍵" },
                    { label: "晚餐", value: currentMonthData.diet.dinner, icon: "🌙" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="text-xl mt-0.5">{item.icon}</div>
                      <div className="flex-1">
                        <p className="text-[11px] font-bold text-secondary mb-0.5">{item.label}</p>
                        <p className="text-[13px] text-text-main leading-tight">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Reminder Card */}
        <div className="mt-4 mb-6 p-4 bg-white rounded-2xl border border-border shadow-sm">
          <SectionTitle title="温馨提醒" color="primary" />
          <p className="text-[12px] text-text-main leading-relaxed">
             少食多餐，避免油腻，保持愉快心情。如果呕吐严重或持续不适，请务必咨询专业医生。
          </p>
        </div>
      </main>

      {/* Footer Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-border px-5 h-[60px] flex justify-between items-center z-50">
        {[
          { icon: Heart, label: "首页", active: true },
          { icon: BookOpen, label: "百科", active: false },
          { icon: Utensils, label: "食谱", active: false },
          { icon: Info, label: "我的", active: false }
        ].map((item, i) => (
          <button 
            key={i} 
            className={`flex flex-col items-center gap-1 flex-1 ${item.active ? 'text-primary' : 'text-text-light'}`}
          >
            <div className={`size-5 flex items-center justify-center mb-0.5 ${item.active ? 'bg-primary/10 rounded-full scale-110' : ''}`}>
              <item.icon className="size-4" strokeWidth={item.active ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Fixed help button */}
      <button 
        className="fixed bottom-24 right-6 size-14 bg-primary rounded-full shadow-lg shadow-primary/20 flex items-center justify-center text-white active:scale-95 transition-transform z-40"
      >
        <ChevronRight className="rotate-[-90deg]" />
      </button>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        @supports (padding: env(safe-area-inset-bottom)) {
          .safe-area-bottom {
            padding-bottom: calc(12px + env(safe-area-inset-bottom));
          }
        }
      `}</style>
    </div>
  );
}
