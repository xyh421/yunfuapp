/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Utensils, 
  Heart, 
  Info, 
  ChevronRight, 
  AlertCircle,
  Dumbbell
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
    meals: {
      type: string;
      icon: string;
      items: { name: string; desc: string; icon: string }[];
    }[];
  };
  exercises: {
    name: string;
    type: string;
    desc: string;
    stats?: { label: string; value: string }[];
    icon: string;
  }[];
}

const PREGNANCY_DATA: MonthData[] = [
  {
    month: 1,
    symptoms: [
      { title: "恶心呕吐 (孕吐)", reason: "HCG水平迅速升高及激素变化。", tips: ["少量多餐", "早起吃苏打饼干"] },
      { title: "乳房胀痛", reason: "激素变化使乳腺发育。", tips: ["全棉舒适内衣"] }
    ],
    diet: {
      keyNutrients: ["叶酸", "蛋白质"],
      recommendedFoods: [{ name: "猕猴桃", benefit: "丰富叶酸", icon: "🥝" }, { name: "全麦面包", benefit: "缓解孕吐", icon: "🍞" }],
      meals: [
        { type: "早餐", icon: "🌅", items: [{ name: "核桃燕麦粥", desc: "补充脑动力", icon: "🥣" }] },
        { type: "午餐", icon: "🌤️", items: [{ name: "清蒸鲈鱼", desc: "DHA发育", icon: "🐟" }] },
        { type: "茶点", icon: "🍵", items: [{ name: "低脂酸奶", desc: "调节肠胃", icon: "🥛" }] },
        { type: "晚餐", icon: "🌙", items: [{ name: "番茄炖豆腐", desc: "补钙", icon: "🍲" }] },
        { type: "零食", icon: "🍪", items: [{ name: "苏打饼干", desc: "中和胃酸", icon: "🍘" }] }
      ]
    },
    exercises: [
      { name: "轻快散步", type: "有氧", desc: "促进血液循环。", stats: [{ label: "距离", value: "1km" }, { label: "时长", value: "15min" }], icon: "🚶‍♀️" },
      { name: "足部伸展", type: "放松", desc: "缓解脚部疲劳。", icon: "🧘‍♀️" }
    ]
  },
  {
    month: 2,
    symptoms: [{ title: "极度疲劳", reason: "身体全力制造胎盘。", tips: ["充足睡眠"] }],
    diet: {
      keyNutrients: ["镁", "维生素B6"],
      recommendedFoods: [{ name: "香蕉", benefit: "缓解呕吐", icon: "🍌" }],
      meals: [
        { type: "早餐", icon: "🌅", items: [{ name: "黑米红豆粥", desc: "补血", icon: "🥣" }] },
        { type: "午餐", icon: "🌤️", items: [{ name: "冬瓜排骨汤", desc: "补钙", icon: "🍲" }] },
        { type: "晚餐", icon: "🌙", items: [{ name: "虾仁跑蛋", desc: "补蛋白", icon: "🍳" }] },
        { type: "茶点", icon: "🍵", items: [{ name: "无糖豆浆", desc: "大豆蛋白", icon: "🥛" }] },
        { type: "零食", icon: "🍪", items: [{ name: "海苔脆", desc: "补微量元素", icon: "🍘" }] }
      ]
    },
    exercises: [
      { name: "日常走动", type: "有氧", desc: "维持基本体能。", stats: [{ label: "距离", value: "1.5km" }, { label: "时长", value: "20min" }], icon: "👟" },
      { name: "凯格尔锻炼", type: "盆底肌", desc: "有助于产后恢复。", icon: "🤰" }
    ]
  },
  {
    month: 3,
    symptoms: [{ title: "情绪波动", reason: "激素波动。", tips: ["沟通、音乐"] }],
    diet: {
      keyNutrients: ["钙", "维生素A"],
      recommendedFoods: [{ name: "胡萝卜", benefit: "眼部发育", icon: "🥕" }],
      meals: [
        { type: "早餐", icon: "🌅", items: [{ name: "南瓜粥", desc: "舒缓脾胃", icon: "🥣" }] },
        { type: "午餐", icon: "🌤️", items: [{ name: "彩椒炒肉丝", desc: "维C充足", icon: "🍛" }] },
        { type: "晚餐", icon: "🌙", items: [{ name: "清蒸娃娃菜", desc: "清淡易消化", icon: "🥬" }] },
        { type: "茶点", icon: "🍵", items: [{ name: "新鲜牛奶", desc: "补钙", icon: "🥛" }] },
        { type: "零食", icon: "🍪", items: [{ name: "新鲜水果", desc: "补充维生素", icon: "🍓" }] }
      ]
    },
    exercises: [
      { name: "慢速散步", type: "有氧", desc: "缓解情绪不稳。", stats: [{ label: "距离", value: "1km" }, { label: "时长", value: "15min" }], icon: "🌳" },
      { name: "颈部放松", type: "伸展", desc: "减轻肩颈压力。", icon: "🧘" }
    ]
  },
  {
    month: 4,
    symptoms: [{ title: "胃口大增", reason: "不适减轻，快速生长期。", tips: ["控制糖分"] }],
    diet: {
      keyNutrients: ["铁", "锌"],
      recommendedFoods: [{ name: "牛肉", benefit: "补铁", icon: "🥩" }],
      meals: [
        { type: "早餐", icon: "🌅", items: [{ name: "鸡蛋三明治", desc: "均衡开启", icon: "🥪" }] },
        { type: "午餐", icon: "🌤️", items: [{ name: "黑椒牛柳", desc: "铁质丰富", icon: "🥩" }] },
        { type: "晚餐", icon: "🌙", items: [{ name: "银耳汤", desc: "温润补气", icon: "🥣" }] },
        { type: "茶点", icon: "🍵", items: [{ name: "蓝莓", desc: "明目抗氧", icon: "🫐" }] },
        { type: "零食", icon: "🍪", items: [{ name: "混合坚果", desc: "补脑", icon: "🥜" }] }
      ]
    },
    exercises: [
      { name: "快步走", type: "有氧", desc: "提升心肺活力。", stats: [{ label: "距离", value: "2km" }, { label: "速度", value: "5km/h" }, { label: "时长", value: "25min" }], icon: "🏃‍♀️" },
      { name: "孕妇瑜伽", type: "耐力", desc: "柔韧身心。", icon: "🕉️" }
    ]
  },
  {
    month: 5,
    symptoms: [{ title: "胎动感", reason: "胎儿力量增强。", tips: ["轻柔胎教"] }],
    diet: {
      keyNutrients: ["DHA", "钙"],
      recommendedFoods: [{ name: "三文鱼", benefit: "智力发育", icon: "🍣" }],
      meals: [
        { type: "早餐", icon: "🌅", items: [{ name: "豆浆蔬菜卷", desc: "蛋白充沛", icon: "🥙" }] },
        { type: "午餐", icon: "🌤️", items: [{ name: "清蒸鱼块", desc: "DHA储备", icon: "🐟" }] },
        { type: "晚餐", icon: "🌙", items: [{ name: "番茄蛋汤面", desc: "开胃能量", icon: "🍜" }] },
        { type: "茶点", icon: "🍵", items: [{ name: "希腊酸奶", desc: "肠道健康", icon: "🥛" }] },
        { type: "零食", icon: "🍪", items: [{ name: "火龙果", desc: "膳食纤维", icon: "🌵" }] }
      ]
    },
    exercises: [
      { name: "规律散步", type: "有氧", desc: "黄金体能期。", stats: [{ label: "距离", value: "3km" }, { label: "时长", value: "35min" }], icon: "👣" },
      { name: "靠墙深蹲", type: "力量", desc: "增强腿部支撑力。", icon: "🏋️‍♀️" }
    ]
  },
  {
    month: 6,
    symptoms: [{ title: "便秘困扰", reason: "子宫压迫肠道。", tips: ["多喝水", "膳食纤维"] }],
    diet: {
      keyNutrients: ["粗纤维", "钾"],
      recommendedFoods: [{ name: "玉米", benefit: "促排便", icon: "🌽" }],
      meals: [
        { type: "早餐", icon: "🌅", items: [{ name: "蒸红薯", desc: "润肠通便", icon: "🍠" }] },
        { type: "午餐", icon: "🌤️", items: [{ name: "蒜蓉西兰花", desc: "丰富矿物质", icon: "🥦" }] },
        { type: "晚餐", icon: "🌙", items: [{ name: "什锦凉拌菜", desc: "清爽解腻", icon: "🥗" }] },
        { type: "茶点", icon: "🍵", items: [{ name: "蒸玉米", desc: "粗粮营养", icon: "🌽" }] },
        { type: "零食", icon: "🍪", items: [{ name: "梨", desc: "生津止渴", icon: "🍐" }] }
      ]
    },
    exercises: [
      { name: "动态散步", type: "有氧", desc: "配合呼吸促进排便。", stats: [{ label: "距离", value: "2.5km" }, { label: "时长", value: "40min" }], icon: "🎈" },
      { name: "猫式伸展", type: "背部", desc: "缓解背部紧绷。", icon: "🐈" }
    ]
  },
  {
    month: 7,
    symptoms: [{ title: "身体水肿", reason: "血液回流受阻。", tips: ["垫高腿部"] }],
    diet: {
      keyNutrients: ["蛋白质", "钠控制"],
      recommendedFoods: [{ name: "冬瓜", benefit: "利尿消肿", icon: "🍈" }],
      meals: [
        { type: "早餐", icon: "🌅", items: [{ name: "红豆汤", desc: "健脾祛湿", icon: "🥣" }] },
        { type: "午餐", icon: "🌤️", items: [{ name: "豆腐排骨煲", desc: "补充钙质", icon: "🍲" }] },
        { type: "晚餐", icon: "🌙", items: [{ name: "虾皮冬瓜汤", desc: "消肿补鲜", icon: "🥣" }] },
        { type: "茶点", icon: "🍵", items: [{ name: "橙子", desc: "维C活力", icon: "🍊" }] },
        { type: "零食", icon: "🍪", items: [{ name: "无糖果冻", desc: "轻负担感", icon: "🍮" }] }
      ]
    },
    exercises: [
      { name: "消肿行走", type: "有氧", desc: "缓解静脉曲张压力。", stats: [{ label: "距离", value: "2km" }, { label: "时长", value: "30min" }], icon: "🌊" },
      { name: "盆骨倾斜", type: "缓痛", desc: "纠正重心偏移感。", icon: "🔄" }
    ]
  },
  {
    month: 8,
    symptoms: [{ title: "气短心慌", reason: "子宫顶向膈肌。", tips: ["动作变缓"] }],
    diet: {
      keyNutrients: ["磷", "钙"],
      recommendedFoods: [{ name: "鸡蛋", benefit: "营养源", icon: "🥚" }],
      meals: [
        { type: "早餐", icon: "🌅", items: [{ name: "鸡蛋嫩饼", desc: "能量充足", icon: "🥞" }] },
        { type: "午餐", icon: "🌤️", items: [{ name: "滑鸡片", desc: "高质量蛋白", icon: "🍗" }] },
        { type: "晚餐", icon: "🌙", items: [{ name: "丝瓜蛋汤", desc: "清心安神", icon: "🥣" }] },
        { type: "茶点", icon: "🍵", items: [{ name: "无花果", desc: "润燥明目", icon: "🥯" }] },
        { type: "零食", icon: "🍪", items: [{ name: "小番茄", desc: "清爽补水", icon: "🍅" }] }
      ]
    },
    exercises: [
      { name: "慢速漫步", type: "有氧", desc: "晚期坚持走动。", stats: [{ label: "距离", value: "1km" }, { label: "时长", value: "20min" }], icon: "🐌" },
      { name: "骨盆球运动", type: "柔韧", desc: "放松下半身区域。", icon: "🔮" }
    ]
  },
  {
    month: 9,
    symptoms: [{ title: "背部沉重", reason: "重心极度前倾。", tips: ["侧卧、托腹带"] }],
    diet: {
      keyNutrients: ["维生素K", "长效能量"],
      recommendedFoods: [{ name: "西兰花", benefit: "止血机制", icon: "🥦" }],
      meals: [
        { type: "早餐", icon: "🌅", items: [{ name: "牛奶麦片粥", desc: "持久饱腹", icon: "🥣" }] },
        { type: "午餐", icon: "🌤️", items: [{ name: "西兰花炒腰果", desc: "健智补脑", icon: "🥦" }] },
        { type: "晚餐", icon: "🌙", items: [{ name: "黑米汤面", desc: "温养易吸收", icon: "🍜" }] },
        { type: "茶点", icon: "🍵", items: [{ name: "奇异果", desc: "丰富养分", icon: "🥝" }] },
        { type: "零食", icon: "🍪", items: [{ name: "核桃", desc: "补脑助发育", icon: "🥜" }] }
      ]
    },
    exercises: [
      { name: "极缓散步", type: "有氧", desc: "保持活动量。", stats: [{ label: "距离", value: "800m" }, { label: "时长", value: "15min" }], icon: "🐢" },
      { name: "蝶式坐姿", type: "分娩准备", desc: "由于韧带松弛需格外小心。", icon: "🦋" }
    ]
  },
  {
    month: 10,
    symptoms: [{ title: "临近分娩", reason: "胎头入盆准备。", tips: ["待产包准备"] }],
    diet: {
      keyNutrients: ["瞬间能量", "储备营养"],
      recommendedFoods: [{ name: "蜂蜜", benefit: "体力储备", icon: "🍯" }],
      meals: [
        { type: "早餐", icon: "🌅", items: [{ name: "肉松粥蛋", desc: "优质储备", icon: "🥣" }] },
        { type: "午餐", icon: "🌤️", items: [{ name: "红烧鲫鱼", desc: "哺乳准备", icon: "🐟" }] },
        { type: "晚餐", icon: "🌙", items: [{ name: "清汤挂面", desc: "极致清淡", icon: "🍜" }] },
        { type: "茶点", icon: "🍵", items: [{ name: "黑巧克力", desc: "临产动能", icon: "🍫" }] },
        { type: "零食", icon: "🍪", items: [{ name: "蜂蜜水", desc: "润道舒缓", icon: "🍵" }] }
      ]
    },
    exercises: [
      { name: "室内扶墙走", type: "有氧", desc: "随时准备分娩。", stats: [{ label: "频率", value: "按需" }, { label: "时长", value: "10min" }], icon: "🏠" },
      { name: "助产球摇摆", type: "放松", desc: "减轻宫缩痛感。", icon: "🎈" }
    ]
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
  const [activeTab, setActiveTab] = useState<'encyclopedia' | 'menu' | 'exercise'>('encyclopedia');

  const currentMonthData = PREGNANCY_DATA.find(d => d.month === activeMonth) || PREGNANCY_DATA[0];

  return (
    <div className="min-h-screen bg-bg-app font-sans pb-24 max-w-md mx-auto shadow-xl flex flex-col">
      <Header />

      {/* Month Selector */}
      <div className="px-5 py-3 overflow-hidden bg-white">
        <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
          {PREGNANCY_DATA.map((data) => (
            <button
              id={`month-${data.month}`}
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
            id="tab-encyclopedia"
            onClick={() => setActiveTab('encyclopedia')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'encyclopedia' ? 'bg-white text-primary shadow-sm' : 'text-text-light'
            }`}
          >
            <BookOpen size={14} /> 身体百科
          </button>
          <button 
            id="tab-menu"
            onClick={() => setActiveTab('menu')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'menu' ? 'bg-white text-primary shadow-sm' : 'text-text-light'
            }`}
          >
            <Utensils size={14} /> 推荐菜单
          </button>
          <button 
            id="tab-exercise"
            onClick={() => setActiveTab('exercise')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'exercise' ? 'bg-white text-primary shadow-sm' : 'text-text-light'
            }`}
          >
            <Dumbbell size={14} /> 适度运动
          </button>
        </div>
      </div>

      <main className="px-5 flex-1 pb-10">
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

              {activeMonth === 1 && (
                <motion.div 
                  id="nausea-tip"
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
                <div id={`symptom-${idx}`} key={idx} className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-border">
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
          ) : activeTab === 'menu' ? (
            <motion.div
              key={`menu-${activeMonth}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <SectionTitle title={`第 ${activeMonth} 个月：推荐食谱`} color="secondary" />

              <div className="flex flex-wrap gap-2 mb-2">
                {currentMonthData.diet.keyNutrients.map((n, i) => (
                  <span id={`nutrient-${i}`} key={i} className="px-2 py-0.5 bg-secondary/10 text-secondary text-[10px] font-bold rounded">
                    #{n}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 pb-2">
                {currentMonthData.diet.recommendedFoods.map((food, i) => (
                  <div id={`food-recommend-${i}`} key={i} className="bg-white p-3 rounded-xl border border-border shadow-sm flex items-center gap-3">
                    <div className="text-2xl bg-bg-app size-10 flex items-center justify-center rounded-lg">{food.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-bold text-text-main truncate">{food.name}</p>
                      <p className="text-[9px] text-text-light mt-0.5 truncate">{food.benefit}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {currentMonthData.diet.meals.map((meal, mealIdx) => (
                  <div id={`meal-card-${mealIdx}`} key={mealIdx} className="bg-white rounded-2xl overflow-hidden border border-border shadow-sm">
                    <div className="bg-secondary/10 px-4 py-3 border-b border-border flex items-center gap-3">
                      <span className="text-xl">{meal.icon}</span>
                      <span className="text-secondary font-bold text-[14px]">{meal.type}推荐</span>
                    </div>
                    <div className="p-4 space-y-4">
                      {meal.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="size-12 bg-bg-app rounded-xl flex items-center justify-center text-2xl shadow-inner">
                            {item.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-[14px] font-bold text-text-main">{item.name}</h4>
                            <p className="text-[11px] text-text-light">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`exercise-${activeMonth}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <SectionTitle title={`第 ${activeMonth} 个月：运动建议`} />
              
              <div className="grid grid-cols-1 gap-4">
                {currentMonthData.exercises.map((ex, i) => (
                  <div id={`exercise-card-${i}`} key={i} className="bg-white rounded-2xl p-5 border border-border shadow-sm flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl bg-bg-app size-14 flex items-center justify-center rounded-2xl shadow-inner">
                        {ex.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <h3 className="text-[16px] font-bold text-text-main">{ex.name}</h3>
                          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                            {ex.type}
                          </span>
                        </div>
                        <p className="text-[12px] text-text-light leading-snug">{ex.desc}</p>
                      </div>
                    </div>
                    
                    {ex.stats && ex.stats.length > 0 && (
                      <div className="flex gap-2 pt-2 border-t border-border mt-1">
                        {ex.stats.map((stat, sIdx) => (
                          <div key={sIdx} className="flex-1 bg-bg-app p-2 rounded-xl text-center">
                            <p className="text-[9px] text-text-light mb-0.5 uppercase tracking-wider">{stat.label}</p>
                            <p className="text-[12px] font-bold text-text-main">{stat.value}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div id="exercise-caution" className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100 flex gap-3 items-start mt-2">
                 <AlertCircle className="size-5 text-yellow-500 shrink-0 mt-0.5" />
                 <p className="text-[11px] text-yellow-800 leading-relaxed">
                   <b>运动注意：</b>运动前后记得补充水分，避免在密闭闷热环境下运动。
                   如出现头晕、气促、腹痛或阴道出血，请立即停止并咨询医生。
                 </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div id="footer-reminder" className="mt-4 mb-6 p-4 bg-white rounded-2xl border border-border shadow-sm">
          <SectionTitle title="温馨提醒" color="primary" />
          <p className="text-[12px] text-text-main leading-relaxed">
             少食多餐，避免油腻，保持愉快心情。孕期一切活动请以身体舒适为准。
          </p>
        </div>
      </main>

      {/* Footer Navigation */}
      <nav id="footer-nav" className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-border px-5 h-[60px] flex justify-between items-center z-50">
        {[
          { icon: Heart, label: "首页", id: 'home' },
          { icon: BookOpen, label: "百科", id: 'encyclopedia' },
          { icon: Utensils, label: "食谱", id: 'menu' },
          { icon: Dumbbell, label: "运动", id: 'exercise' },
          { icon: Info, label: "我的", id: 'profile' }
        ].map((item, i) => (
          <button 
            id={`nav-${item.id}`}
            key={i} 
            onClick={() => {
              if (item.id === 'home') { setActiveTab('encyclopedia'); setActiveMonth(1); }
              if (item.id === 'encyclopedia') setActiveTab('encyclopedia');
              if (item.id === 'menu') setActiveTab('menu');
              if (item.id === 'exercise') setActiveTab('exercise');
            }}
            className={`flex flex-col items-center gap-1 flex-1 transition-colors ${
              (activeTab === item.id) || (item.id === 'home' && activeTab === 'encyclopedia' && activeMonth === 1)
              ? 'text-primary' : 'text-text-light'
            }`}
          >
            <div className={`size-5 flex items-center justify-center mb-0.5 ${
              (activeTab === item.id) || (item.id === 'home' && activeTab === 'encyclopedia' && activeMonth === 1)
               ? 'bg-primary/10 rounded-full scale-110' : ''
            }`}>
              <item.icon className="size-4" strokeWidth={activeTab === item.id ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Help button */}
      <button 
        id="btn-help"
        className="fixed bottom-24 right-6 size-14 bg-primary rounded-full shadow-lg shadow-primary/20 flex items-center justify-center text-white active:scale-95 transition-transform z-40"
      >
        <ChevronRight className="rotate-[-90deg]" />
      </button>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
