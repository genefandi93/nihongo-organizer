import React, { useState, useEffect, useRef } from 'react';
import { Check, Plus, Trash2, Calendar, BookOpen, Sparkles, Star, Flame, Volume2, X, Target, FileText, Heart, Award, Plane, AlertCircle } from 'lucide-react';

// ============ VOCABULARIO PRINCIPAL ============
const VOCAB = [
  { jp: '今日', kana: 'きょう', romaji: 'kyou', es: 'hoy', ej: '今日は良い日 (Hoy es un buen día)', emoji: '☀️' },
  { jp: '頑張る', kana: 'がんばる', romaji: 'ganbaru', es: 'esforzarse', ej: '頑張って! (¡Ánimo!)', emoji: '💪' },
  { jp: '時間', kana: 'じかん', romaji: 'jikan', es: 'tiempo', ej: '時間がない (No hay tiempo)', emoji: '⏰' },
  { jp: '仕事', kana: 'しごと', romaji: 'shigoto', es: 'trabajo', ej: '仕事中 (Trabajando)', emoji: '💼' },
  { jp: '勉強', kana: 'べんきょう', romaji: 'benkyou', es: 'estudiar', ej: '勉強しよう (Estudiemos)', emoji: '📚' },
  { jp: '休む', kana: 'やすむ', romaji: 'yasumu', es: 'descansar', ej: '休んでください (Descansa)', emoji: '😴' },
  { jp: '朝', kana: 'あさ', romaji: 'asa', es: 'mañana', ej: '朝ごはん (Desayuno)', emoji: '🌅' },
  { jp: '夜', kana: 'よる', romaji: 'yoru', es: 'noche', ej: 'おやすみ (Buenas noches)', emoji: '🌙' },
  { jp: '水', kana: 'みず', romaji: 'mizu', es: 'agua', ej: '水を飲む (Beber agua)', emoji: '💧' },
  { jp: '本', kana: 'ほん', romaji: 'hon', es: 'libro', ej: '本を読む (Leer)', emoji: '📖' },
  { jp: '友達', kana: 'ともだち', romaji: 'tomodachi', es: 'amigo', ej: '友達と会う (Ver amigos)', emoji: '👫' },
  { jp: '元気', kana: 'げんき', romaji: 'genki', es: 'energía/bien', ej: '元気ですか (¿Cómo estás?)', emoji: '✨' },
  { jp: '美味しい', kana: 'おいしい', romaji: 'oishii', es: 'delicioso', ej: 'とても美味しい (Muy rico)', emoji: '🍜' },
  { jp: '走る', kana: 'はしる', romaji: 'hashiru', es: 'correr', ej: '公園で走る (Correr)', emoji: '🏃' },
  { jp: '食べる', kana: 'たべる', romaji: 'taberu', es: 'comer', ej: 'ご飯を食べる (Comer)', emoji: '🍱' },
  { jp: '夢', kana: 'ゆめ', romaji: 'yume', es: 'sueño', ej: '夢を見る (Soñar)', emoji: '💭' },
  { jp: '心', kana: 'こころ', romaji: 'kokoro', es: 'corazón', ej: '心から (De corazón)', emoji: '💗' },
  { jp: '花', kana: 'はな', romaji: 'hana', es: 'flor', ej: '桜の花 (Flor de cerezo)', emoji: '🌸' },
  { jp: '空', kana: 'そら', romaji: 'sora', es: 'cielo', ej: '青い空 (Cielo azul)', emoji: '☁️' },
  { jp: '光', kana: 'ひかり', romaji: 'hikari', es: 'luz', ej: '太陽の光 (Luz del sol)', emoji: '🌟' },
];

// ============ TURISMO POR CATEGORÍAS ============
const TURISMO = {
  esenciales: {
    titulo: 'Esenciales', emoji: '⭐', color: '#ff8fa3',
    desc: 'Las que SÍ o SÍ debes saber',
    items: [
      { jp: 'すみません', romaji: 'sumimasen', es: 'Disculpe / Perdón', tip: 'La más útil. Sirve para llamar la atención, pedir perdón y dar las gracias' },
      { jp: 'ありがとうございます', romaji: 'arigatou gozaimasu', es: 'Muchas gracias (formal)', tip: 'Úsala siempre con desconocidos y empleados' },
      { jp: 'お願いします', romaji: 'onegaishimasu', es: 'Por favor', tip: 'Acompaña casi cualquier pedido' },
      { jp: 'はい / いいえ', romaji: 'hai / iie', es: 'Sí / No', tip: 'Básico pero esencial' },
      { jp: '分かりません', romaji: 'wakarimasen', es: 'No entiendo', tip: 'Salvador cuando te hablen rápido' },
      { jp: '英語を話せますか', romaji: 'eigo wo hanasemasu ka', es: '¿Habla inglés?', tip: 'Pocas personas hablan inglés, pero vale intentar' },
      { jp: 'トイレはどこですか', romaji: 'toire wa doko desu ka', es: '¿Dónde está el baño?', tip: 'Imprescindible. Los baños japoneses son una experiencia' },
      { jp: 'いくらですか', romaji: 'ikura desu ka', es: '¿Cuánto cuesta?', tip: 'Para precios en mercados y tiendas pequeñas' },
    ]
  },
  aeropuerto: {
    titulo: 'Aeropuerto', emoji: '✈️', color: '#7eb6ff',
    desc: 'Tu llegada a Japón',
    items: [
      { jp: '空港', romaji: 'kuukou', es: 'Aeropuerto', tip: 'Narita (NRT) y Haneda (HND) son los principales de Tokio' },
      { jp: 'パスポート', romaji: 'pasupooto', es: 'Pasaporte', tip: 'Tenlo siempre a mano, te lo pueden pedir' },
      { jp: '荷物', romaji: 'nimotsu', es: 'Equipaje', tip: 'Existe servicio takkyubin para enviar maletas al hotel' },
      { jp: '出口', romaji: 'deguchi', es: 'Salida', tip: 'Las salidas están bien señalizadas en inglés' },
      { jp: '両替', romaji: 'ryougae', es: 'Cambio de divisas', tip: 'Mejores tasas en 7-Eleven o tiendas oficiales que en aeropuertos' },
      { jp: 'タクシー乗り場', romaji: 'takushii noriba', es: 'Parada de taxi', tip: 'Los taxis son caros pero seguros y eficientes' },
    ]
  },
  hotel: {
    titulo: 'Hotel', emoji: '🏨', color: '#ffa07a',
    desc: 'Para tu hospedaje',
    items: [
      { jp: 'ホテル', romaji: 'hoteru', es: 'Hotel', tip: 'Prueba también un ryokan (旅館) tradicional' },
      { jp: 'チェックイン', romaji: 'chekku-in', es: 'Check-in', tip: 'Generalmente desde las 15:00' },
      { jp: 'チェックアウト', romaji: 'chekku-auto', es: 'Check-out', tip: 'Suele ser antes de las 11:00' },
      { jp: '予約', romaji: 'yoyaku', es: 'Reservación', tip: 'Reserva con anticipación, especialmente en temporada de sakura' },
      { jp: '部屋', romaji: 'heya', es: 'Habitación', tip: 'Las habitaciones japonesas son compactas pero funcionales' },
      { jp: 'Wi-Fi', romaji: 'wai-fai', es: 'WiFi', tip: 'Pregunta por la clave: Wi-Fiのパスワード (wai-fai no pasuwaado)' },
      { jp: '何時ですか', romaji: 'nanji desu ka', es: '¿A qué hora?', tip: 'Para preguntar horarios de desayuno, check-out, etc.' },
    ]
  },
  comida: {
    titulo: 'Comida', emoji: '🍜', color: '#ffb088',
    desc: 'Restaurantes y comida',
    items: [
      { jp: 'メニュー', romaji: 'menyuu', es: 'Menú', tip: 'Muchos restaurantes tienen menú en inglés, pídelo' },
      { jp: 'お水ください', romaji: 'omizu kudasai', es: 'Agua por favor', tip: 'El agua siempre es gratis y la sirven al sentarte' },
      { jp: 'お会計お願いします', romaji: 'okaikei onegaishimasu', es: 'La cuenta por favor', tip: 'Normalmente se paga al salir, en la caja' },
      { jp: 'いただきます', romaji: 'itadakimasu', es: 'Gracias por la comida', tip: 'Antes de comer. Es señal de respeto' },
      { jp: 'ごちそうさま', romaji: 'gochisousama', es: 'Estuvo delicioso', tip: 'Después de comer, al terminar' },
      { jp: 'ベジタリアン', romaji: 'bejitarian', es: 'Vegetariano', tip: 'Difícil en Japón, muchos caldos llevan pescado (dashi)' },
      { jp: 'アレルギー', romaji: 'arerugii', es: 'Alergia', tip: 'Importantísimo si tienes alguna' },
      { jp: '辛い', romaji: 'karai', es: 'Picante', tip: 'Casi nada es picante en Japón realmente' },
      { jp: 'おすすめ', romaji: 'osusume', es: 'Recomendación', tip: 'おすすめは何ですか = ¿Qué recomienda?' },
    ]
  },
  transporte: {
    titulo: 'Transporte', emoji: '🚆', color: '#a0d8a0',
    desc: 'Tren, metro, taxi',
    items: [
      { jp: '駅', romaji: 'eki', es: 'Estación', tip: 'Tokio tiene muchas estaciones gigantes (Shinjuku, Shibuya)' },
      { jp: '電車', romaji: 'densha', es: 'Tren', tip: 'Increíblemente puntuales, no se retrasan' },
      { jp: '地下鉄', romaji: 'chikatetsu', es: 'Metro', tip: 'En Tokio hay dos sistemas: Tokyo Metro y Toei' },
      { jp: '新幹線', romaji: 'shinkansen', es: 'Tren bala', tip: 'Compra el JR Pass ANTES de llegar a Japón' },
      { jp: 'タクシー', romaji: 'takushii', es: 'Taxi', tip: 'Las puertas se abren automáticamente, no las toques' },
      { jp: '切符', romaji: 'kippu', es: 'Boleto', tip: 'O usa una tarjeta IC: Suica o Pasmo' },
      { jp: 'これに乗りますか', romaji: 'kore ni norimasu ka', es: '¿Este es el correcto?', tip: 'Útil para confirmar trenes con locales' },
      { jp: '次の駅', romaji: 'tsugi no eki', es: 'Próxima estación', tip: 'Los letreros muestran la próxima parada' },
    ]
  },
  direcciones: {
    titulo: 'Direcciones', emoji: '🗺️', color: '#d4a5e8',
    desc: 'Para no perderte',
    items: [
      { jp: 'どこですか', romaji: 'doko desu ka', es: '¿Dónde está?', tip: 'Combínalo con un lugar: 駅はどこですか' },
      { jp: '右', romaji: 'migi', es: 'Derecha', tip: 'Útil cuando alguien te indique el camino' },
      { jp: '左', romaji: 'hidari', es: 'Izquierda', tip: 'Recuerda: en Japón se camina por la izquierda' },
      { jp: 'まっすぐ', romaji: 'massugu', es: 'Recto / Derecho', tip: 'Para seguir caminando recto' },
      { jp: '近い / 遠い', romaji: 'chikai / tooi', es: 'Cerca / Lejos', tip: 'Para confirmar distancias' },
      { jp: '地図', romaji: 'chizu', es: 'Mapa', tip: 'Google Maps funciona perfecto en Japón' },
      { jp: 'コンビニ', romaji: 'konbini', es: 'Tienda 24h', tip: '7-Eleven, FamilyMart y Lawson están en todas partes' },
    ]
  },
  compras: {
    titulo: 'Compras', emoji: '🛍️', color: '#ffd700',
    desc: 'Para tiendas y mercados',
    items: [
      { jp: 'これください', romaji: 'kore kudasai', es: 'Esto por favor', tip: 'Señala y di esto, funciona siempre' },
      { jp: '高い / 安い', romaji: 'takai / yasui', es: 'Caro / Barato', tip: 'Para comentar precios' },
      { jp: 'クレジットカード', romaji: 'kurejitto kaado', es: 'Tarjeta de crédito', tip: 'Lleva efectivo, muchos lugares aún son solo cash' },
      { jp: '現金', romaji: 'genkin', es: 'Efectivo', tip: 'Imprescindible en templos, mercados pequeños y taxis' },
      { jp: '袋', romaji: 'fukuro', es: 'Bolsa', tip: 'Te preguntarán si quieres bolsa, suele costar extra' },
      { jp: '免税', romaji: 'menzei', es: 'Libre de impuestos', tip: 'Compras +5000 yenes con pasaporte = sin tax' },
      { jp: '試着', romaji: 'shichaku', es: 'Probarse ropa', tip: 'En tiendas debes quitarte zapatos antes' },
    ]
  },
  emergencias: {
    titulo: 'Emergencias', emoji: '🆘', color: '#ff7070',
    desc: 'Por si acaso',
    items: [
      { jp: '助けて', romaji: 'tasukete', es: '¡Ayuda!', tip: 'En caso de emergencia real' },
      { jp: '警察', romaji: 'keisatsu', es: 'Policía', tip: 'Número: 110. Hay kobans (cabinas policiales) por todos lados' },
      { jp: '病院', romaji: 'byouin', es: 'Hospital', tip: 'Emergencia médica: 119' },
      { jp: '救急車', romaji: 'kyuukyuusha', es: 'Ambulancia', tip: 'Es gratis llamar al 119' },
      { jp: '痛い', romaji: 'itai', es: 'Duele / Me duele', tip: 'Señala dónde duele al decirlo' },
      { jp: '薬局', romaji: 'yakkyoku', es: 'Farmacia', tip: 'Cadenas como Matsumoto Kiyoshi están por todas partes' },
      { jp: '迷子', romaji: 'maigo', es: 'Perdido (persona)', tip: 'Si te pierdes, ve a una koban (policía)' },
    ]
  },
  numeros: {
    titulo: 'Números', emoji: '🔢', color: '#88c0d0',
    desc: 'Para precios y horas',
    items: [
      { jp: '一 / 二 / 三', romaji: 'ichi / ni / san', es: '1, 2, 3', tip: 'Los más usados a diario' },
      { jp: '四 / 五 / 六', romaji: 'shi / go / roku', es: '4, 5, 6', tip: 'El 4 (shi) suena como "muerte", a veces se usa "yon"' },
      { jp: '七 / 八 / 九 / 十', romaji: 'shichi / hachi / kyuu / juu', es: '7, 8, 9, 10', tip: 'El 7 también se dice "nana"' },
      { jp: '百', romaji: 'hyaku', es: '100', tip: '500 yenes = 五百円 (go-hyaku-en)' },
      { jp: '千', romaji: 'sen', es: '1,000', tip: '3,000 yenes = 三千円 (san-zen-en)' },
      { jp: '万', romaji: 'man', es: '10,000', tip: 'Los billetes de 10,000 yenes son comunes (≈ USD 65)' },
      { jp: '円', romaji: 'en', es: 'Yen (moneda)', tip: 'En japonés se pronuncia "en", no "yen"' },
    ]
  },
};

const FRASES = [
  { jp: 'おはようございます', romaji: 'ohayou gozaimasu', es: 'Buenos días' },
  { jp: 'ありがとう', romaji: 'arigatou', es: 'Gracias' },
  { jp: 'すみません', romaji: 'sumimasen', es: 'Disculpe / Perdón' },
  { jp: 'お疲れ様', romaji: 'otsukaresama', es: 'Buen trabajo' },
  { jp: 'よろしく', romaji: 'yoroshiku', es: 'Encantado' },
  { jp: 'いただきます', romaji: 'itadakimasu', es: 'Gracias por la comida' },
  { jp: 'お休みなさい', romaji: 'oyasuminasai', es: 'Buenas noches' },
  { jp: 'がんばって', romaji: 'ganbatte', es: '¡Ánimo! ¡Tú puedes!' },
];

const MOTIVACIONES = [
  { jp: '一歩ずつ', romaji: 'ippo zutsu', es: 'Paso a paso' },
  { jp: '今日も頑張ろう', romaji: 'kyou mo ganbarou', es: 'Hoy también lo daremos todo' },
  { jp: '七転び八起き', romaji: 'nana korobi ya oki', es: 'Caer 7 veces, levantarse 8' },
  { jp: '夢を信じて', romaji: 'yume wo shinjite', es: 'Cree en tus sueños' },
  { jp: '小さな進歩', romaji: 'chiisana shinpo', es: 'Pequeño progreso, gran cambio' },
  { jp: '継続は力なり', romaji: 'keizoku wa chikara nari', es: 'La constancia es poder' },
  { jp: '一期一会', romaji: 'ichigo ichie', es: 'Un encuentro único en la vida' },
  { jp: '明日は明日の風', romaji: 'ashita wa ashita no kaze', es: 'Mañana soplará otro viento' },
];

const NUMEROS = ['一','二','三','四','五','六','七','八','九','十'];
const NUMEROS_ROMAJI = ['ichi','ni','san','shi','go','roku','shichi','hachi','kyuu','juu'];

const NIVELES = [
  { nivel: 1, titulo: '初心者', romaji: 'shoshinsha', es: 'Principiante', xpReq: 0, emoji: '🌱' },
  { nivel: 2, titulo: '学生', romaji: 'gakusei', es: 'Estudiante', xpReq: 50, emoji: '📖' },
  { nivel: 3, titulo: '弟子', romaji: 'deshi', es: 'Aprendiz', xpReq: 150, emoji: '🍃' },
  { nivel: 4, titulo: '武士', romaji: 'bushi', es: 'Guerrero', xpReq: 300, emoji: '⚔️' },
  { nivel: 5, titulo: '先生', romaji: 'sensei', es: 'Maestro', xpReq: 500, emoji: '🎓' },
  { nivel: 6, titulo: '達人', romaji: 'tatsujin', es: 'Experto', xpReq: 800, emoji: '🔥' },
  { nivel: 7, titulo: '侍', romaji: 'samurai', es: 'Samurái', xpReq: 1200, emoji: '🗾' },
];

const LOGROS = [
  { id: 'primer_paso', titulo: '初めの一歩', romaji: 'hajime no ippo', es: 'El primer paso', desc: 'Completaste tu primera tarea', emoji: '👣', check: (s) => s.tareasComp >= 1 },
  { id: 'diez_palabras', titulo: '言葉集め', romaji: 'kotoba atsume', es: 'Coleccionista de palabras', desc: 'Aprendiste 10 palabras', emoji: '📚', check: (s) => s.palabras >= 10 },
  { id: 'pomodoro_5', titulo: '集中力', romaji: 'shuuchuuryoku', es: 'Poder de concentración', desc: '5 pomodoros completados', emoji: '🎯', check: (s) => s.pomodoros >= 5 },
  { id: 'habito_constante', titulo: '習慣の達人', romaji: 'shuukan no tatsujin', es: 'Maestro del hábito', desc: 'Mantén un hábito 7 días', emoji: '🌸', check: (s) => s.habitoMax >= 7 },
  { id: 'quiz_maestro', titulo: 'クイズ王', romaji: 'quiz ou', es: 'Rey del quiz', desc: 'Acierta 10 quizzes', emoji: '🏆', check: (s) => s.quizCorrect >= 10 },
  { id: 'sakura', titulo: '桜咲く', romaji: 'sakura saku', es: 'Florece el sakura', desc: 'Sube al nivel 3', emoji: '🌸', check: (s) => s.xp >= 150 },
  { id: 'viajero', titulo: '旅人', romaji: 'tabibito', es: 'Viajero', desc: 'Explora todas las categorías de turismo', emoji: '🗾', check: (s) => s.turismoExplorado >= 9 },
];

const KITSUNE_MSGS = {
  manana: ['¡Buenos días! ¿Comenzamos el día con energía? ☀️', '¡おはよう! El sol brilla solo para ti', 'Un nuevo día, una nueva oportunidad de crecer 🌱'],
  tarde: ['¡Hola! ¿Cómo va tu día?', 'こんにちは! Sigamos avanzando juntos 🍃', 'La tarde es perfecta para crecer un poco más'],
  noche: ['¡Buenas noches! Aún hay tiempo para una pequeña victoria', 'こんばんは! Cerremos el día con orgullo 🌙', 'La noche es para reflexionar sobre lo logrado'],
  hecho: ['¡Excelente! やったね! 🎉', '¡Un paso más cerca! 素晴らしい!', '¡Sigue así, lo estás haciendo genial!', 'すごい! ¡Increíble trabajo!', '¡Estoy muy orgulloso de ti! 💗'],
};

// ============ AUDIO HELPERS ============
let audioContext = null;
const getAudioContext = () => {
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch(e) {}
  }
  return audioContext;
};

// Sonido de "ding" suave (campana) cuando completas algo
const playDing = (frequency = 800) => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = frequency;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
  } catch(e) {}
};

// Sonido de éxito (escala ascendente)
const playSuccess = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    [523, 659, 784].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      const startTime = ctx.currentTime + i * 0.1;
      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  } catch(e) {}
};

// Sonido de nivel up (más festivo)
const playLevelUp = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    [523, 659, 784, 1047].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      const startTime = ctx.currentTime + i * 0.08;
      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  } catch(e) {}
};

export default function NihongoOrganizer() {
  const [tab, setTab] = useState('inicio');
  const [tareas, setTareas] = useState([]);
  const [habitos, setHabitos] = useState([]);
  const [notas, setNotas] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [xp, setXp] = useState(0);
  const [palabrasAprendidas, setPalabrasAprendidas] = useState([]);
  const [palabraDia, setPalabraDia] = useState(VOCAB[0]);
  const [fraseDia, setFraseDia] = useState(FRASES[0]);
  const [motivacion, setMotivacion] = useState(MOTIVACIONES[0]);
  const [quiz, setQuiz] = useState(null);
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [pomodoroActivo, setPomodoroActivo] = useState(false);
  const [pomodoroSeg, setPomodoroSeg] = useState(25 * 60);
  const [pomodoroFase, setPomodoroFase] = useState('focus');
  const [pomodorosHoy, setPomodorosHoy] = useState(0);
  const [pomodorosTotal, setPomodorosTotal] = useState(0);
  const [showCelebration, setShowCelebration] = useState(null);
  const [logrosDesbloqueados, setLogrosDesbloqueados] = useState([]);
  const [kitsuneMsg, setKitsuneMsg] = useState('');
  const [kitsuneMood, setKitsuneMood] = useState('happy');
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [nuevoHabito, setNuevoHabito] = useState('');
  const [nuevaNota, setNuevaNota] = useState('');
  const [nuevoEvento, setNuevoEvento] = useState({ titulo: '', fecha: '' });
  const [showLogro, setShowLogro] = useState(null);
  const [sakuraPetals, setSakuraPetals] = useState([]);
  const [hablando, setHablando] = useState(null);
  const [audioOK, setAudioOK] = useState(null);
  const [showAudioTip, setShowAudioTip] = useState(false);
  const [categoriaTurismo, setCategoriaTurismo] = useState('esenciales');
  const [turismoExplorado, setTurismoExplorado] = useState([]);
  const intervalRef = useRef(null);

  const hora = new Date().getHours();
  const momento = hora < 12 ? 'manana' : hora < 19 ? 'tarde' : 'noche';
  const saludo = momento === 'manana' ? 'おはよう' : momento === 'tarde' ? 'こんにちは' : 'こんばんは';
  const saludoEs = momento === 'manana' ? 'Buenos días' : momento === 'tarde' ? 'Buenas tardes' : 'Buenas noches';

  // Verificar disponibilidad de voz japonesa
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setAudioOK(false);
      return;
    }
    const checkVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const tieneJP = voices.some(v => v.lang.startsWith('ja'));
      setAudioOK(tieneJP);
    };
    checkVoices();
    window.speechSynthesis.onvoiceschanged = checkVoices;
  }, []);

  useEffect(() => {
    setSakuraPetals(Array.from({length: 12}, (_,i) => ({
      id: i, left: Math.random() * 100, delay: Math.random() * 20,
      duration: 15 + Math.random() * 15, size: 8 + Math.random() * 12,
    })));
  }, []);

  useEffect(() => {
    try {
      const keys = ['tareas','habitos','notas','eventos','xp','palabras','pomodorosHoy','pomodorosTotal','logros','quizCorrect','turismoExplorado'];
      for (const k of keys) {
        try {
          const raw = localStorage.getItem('nihongo_' + k);
          if (raw) {
            const v = JSON.parse(raw);
            if (k === 'tareas') setTareas(v);
            if (k === 'habitos') setHabitos(v);
            if (k === 'notas') setNotas(v);
            if (k === 'eventos') setEventos(v);
            if (k === 'xp') setXp(v);
            if (k === 'palabras') setPalabrasAprendidas(v);
            if (k === 'pomodorosHoy') setPomodorosHoy(v);
            if (k === 'pomodorosTotal') setPomodorosTotal(v);
            if (k === 'logros') setLogrosDesbloqueados(v);
            if (k === 'quizCorrect') setQuizCorrect(v);
            if (k === 'turismoExplorado') setTurismoExplorado(v);
          }
        } catch (e) {}
      }
      const hoy = new Date().toDateString();
      const seed = hoy.split('').reduce((a,c) => a + c.charCodeAt(0), 0);
      setPalabraDia(VOCAB[seed % VOCAB.length]);
      setFraseDia(FRASES[seed % FRASES.length]);
      setMotivacion(MOTIVACIONES[seed % MOTIVACIONES.length]);
      
      try {
        const ultimoDia = localStorage.getItem('nihongo_ultimoDiaPomodoro');
        if (!ultimoDia || JSON.parse(ultimoDia) !== hoy) {
          setPomodorosHoy(0);
          localStorage.setItem('nihongo_ultimoDiaPomodoro', JSON.stringify(hoy));
        }
      } catch (e) { localStorage.setItem('nihongo_ultimoDiaPomodoro', JSON.stringify(hoy)); }

      const msgs = KITSUNE_MSGS[momento];
      setKitsuneMsg(msgs[Math.floor(Math.random() * msgs.length)]);
    } catch (e) {}
    setLoaded(true);
  }, []);

  const save = (key, val) => { try { localStorage.setItem('nihongo_' + key, JSON.stringify(val)); } catch(e) {} };

  useEffect(() => { if(loaded) save('tareas', tareas); }, [tareas, loaded]);
  useEffect(() => { if(loaded) save('habitos', habitos); }, [habitos, loaded]);
  useEffect(() => { if(loaded) save('notas', notas); }, [notas, loaded]);
  useEffect(() => { if(loaded) save('eventos', eventos); }, [eventos, loaded]);
  useEffect(() => { if(loaded) save('xp', xp); }, [xp, loaded]);
  useEffect(() => { if(loaded) save('palabras', palabrasAprendidas); }, [palabrasAprendidas, loaded]);
  useEffect(() => { if(loaded) save('pomodorosHoy', pomodorosHoy); }, [pomodorosHoy, loaded]);
  useEffect(() => { if(loaded) save('pomodorosTotal', pomodorosTotal); }, [pomodorosTotal, loaded]);
  useEffect(() => { if(loaded) save('logros', logrosDesbloqueados); }, [logrosDesbloqueados, loaded]);
  useEffect(() => { if(loaded) save('quizCorrect', quizCorrect); }, [quizCorrect, loaded]);
  useEffect(() => { if(loaded) save('turismoExplorado', turismoExplorado); }, [turismoExplorado, loaded]);

  useEffect(() => {
    if (!loaded) return;
    const habitoMax = habitos.reduce((max, h) => Math.max(max, Object.keys(h.dias||{}).length), 0);
    const stats = {
      tareasComp: tareas.filter(t=>t.hecho).length, palabras: palabrasAprendidas.length,
      pomodoros: pomodorosTotal, habitoMax, quizCorrect, xp,
      turismoExplorado: turismoExplorado.length,
    };
    LOGROS.forEach(logro => {
      if (!logrosDesbloqueados.includes(logro.id) && logro.check(stats)) {
        setLogrosDesbloqueados(prev => [...prev, logro.id]);
        setShowLogro(logro);
        playLevelUp();
        setTimeout(() => setShowLogro(null), 4000);
      }
    });
  }, [tareas, palabrasAprendidas, pomodorosTotal, habitos, quizCorrect, xp, turismoExplorado, loaded]);

  useEffect(() => {
    if (pomodoroActivo && pomodoroSeg > 0) {
      intervalRef.current = setInterval(() => setPomodoroSeg(s => s - 1), 1000);
    } else if (pomodoroSeg === 0) {
      if (pomodoroFase === 'focus') {
        setPomodorosHoy(p => p + 1);
        setPomodorosTotal(p => p + 1);
        ganarXP(15, '¡Pomodoro completado!');
        setPomodoroFase('descanso');
        setPomodoroSeg(5 * 60);
        playSuccess();
      } else {
        setPomodoroFase('focus');
        setPomodoroSeg(25 * 60);
        playDing();
      }
      setPomodoroActivo(false);
    }
    return () => clearInterval(intervalRef.current);
  }, [pomodoroActivo, pomodoroSeg]);

  const nivelActual = NIVELES.slice().reverse().find(n => xp >= n.xpReq) || NIVELES[0];
  const proxNivel = NIVELES.find(n => n.xpReq > xp);
  const progresoNivel = proxNivel ? ((xp - nivelActual.xpReq) / (proxNivel.xpReq - nivelActual.xpReq)) * 100 : 100;

  const mostrarKitsuneMsg = (msg, mood = 'happy') => {
    setKitsuneMsg(msg);
    setKitsuneMood(mood);
    setTimeout(() => setKitsuneMood('happy'), 3000);
  };

  const ganarXP = (cant, motivo) => {
    const nuevoXp = xp + cant;
    const subio = NIVELES.find(n => n.xpReq > xp && n.xpReq <= nuevoXp);
    setXp(nuevoXp);
    if (subio) {
      setShowCelebration({ tipo: 'nivel', nivel: subio, xp: cant });
      mostrarKitsuneMsg(`¡SUBISTE A ${subio.titulo}! ${subio.emoji}`, 'excited');
      playLevelUp();
    } else {
      setShowCelebration({ tipo: 'xp', xp: cant, motivo });
      const msgs = KITSUNE_MSGS.hecho;
      mostrarKitsuneMsg(msgs[Math.floor(Math.random() * msgs.length)], 'happy');
      playSuccess();
    }
    setTimeout(() => setShowCelebration(null), 2500);
  };

  const agregarTarea = () => {
    if (!nuevaTarea.trim()) return;
    const palabraRandom = VOCAB[Math.floor(Math.random() * VOCAB.length)];
    setTareas([...tareas, { id: Date.now(), texto: nuevaTarea, hecho: false, palabra: palabraRandom }]);
    setNuevaTarea('');
    playDing(600);
  };

  const completarTarea = (id) => {
    const tarea = tareas.find(t => t.id === id);
    if (!tarea) return;
    if (!tarea.hecho) {
      setTareas(tareas.map(t => t.id === id ? {...t, hecho: true} : t));
      if (!palabrasAprendidas.find(p => p.jp === tarea.palabra.jp)) {
        setPalabrasAprendidas([...palabrasAprendidas, tarea.palabra]);
      }
      if (Math.random() < 0.3) lanzarQuiz();
      else ganarXP(10, `Aprendiste: ${tarea.palabra.jp} (${tarea.palabra.es})`);
    } else {
      setTareas(tareas.map(t => t.id === id ? {...t, hecho: false} : t));
    }
  };

  const eliminarTarea = (id) => setTareas(tareas.filter(t => t.id !== id));

  const agregarHabito = () => {
    if (!nuevoHabito.trim()) return;
    setHabitos([...habitos, { id: Date.now(), texto: nuevoHabito, dias: {} }]);
    setNuevoHabito('');
    playDing(600);
  };

  const toggleHabito = (id) => {
    const hoy = new Date().toDateString();
    setHabitos(habitos.map(h => {
      if (h.id !== id) return h;
      const nuevoDias = {...h.dias};
      if (nuevoDias[hoy]) { delete nuevoDias[hoy]; return {...h, dias: nuevoDias}; }
      nuevoDias[hoy] = true;
      ganarXP(5, '¡Hábito completado!');
      return {...h, dias: nuevoDias};
    }));
  };

  const eliminarHabito = (id) => setHabitos(habitos.filter(h => h.id !== id));

  const agregarNota = () => {
    if (!nuevaNota.trim()) return;
    setNotas([{ id: Date.now(), texto: nuevaNota, fecha: new Date().toLocaleDateString('es-ES') }, ...notas]);
    setNuevaNota('');
    playDing(600);
  };

  const eliminarNota = (id) => setNotas(notas.filter(n => n.id !== id));

  const agregarEvento = () => {
    if (!nuevoEvento.titulo.trim() || !nuevoEvento.fecha) return;
    setEventos([...eventos, { id: Date.now(), ...nuevoEvento }].sort((a,b) => a.fecha.localeCompare(b.fecha)));
    setNuevoEvento({ titulo: '', fecha: '' });
    playDing(600);
  };

  const eliminarEvento = (id) => setEventos(eventos.filter(e => e.id !== id));

  const lanzarQuiz = () => {
    const palabra = VOCAB[Math.floor(Math.random() * VOCAB.length)];
    const incorrectas = VOCAB.filter(v => v.jp !== palabra.jp).sort(() => Math.random() - 0.5).slice(0, 3);
    const opciones = [palabra, ...incorrectas].sort(() => Math.random() - 0.5);
    setQuiz({ palabra, opciones, respondido: false, correcto: null });
  };

  const responderQuiz = (op) => {
    if (quiz.respondido) return;
    const correcto = op.jp === quiz.palabra.jp;
    setQuiz({...quiz, respondido: true, correcto, elegida: op });
    if (correcto) {
      setQuizCorrect(q => q + 1);
      ganarXP(25, '¡Quiz correcto!');
      if (!palabrasAprendidas.find(p => p.jp === quiz.palabra.jp)) {
        setPalabrasAprendidas([...palabrasAprendidas, quiz.palabra]);
      }
    } else {
      ganarXP(5, '¡Casi! Sigue intentando');
    }
    setTimeout(() => setQuiz(null), 2500);
  };

  const formatTime = (s) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  // Función mejorada de speech
  const speak = (text, id = null) => {
    if (!('speechSynthesis' in window)) {
      setShowAudioTip(true);
      setTimeout(() => setShowAudioTip(false), 4000);
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ja-JP';
      u.rate = 0.8;
      u.pitch = 1.1;
      const voices = window.speechSynthesis.getVoices();
      const jpVoice = voices.find(v => v.lang.startsWith('ja'));
      if (jpVoice) u.voice = jpVoice;
      
      setHablando(id || text);
      u.onend = () => setHablando(null);
      u.onerror = () => {
        setHablando(null);
        setShowAudioTip(true);
        setTimeout(() => setShowAudioTip(false), 4000);
      };
      
      window.speechSynthesis.speak(u);
      
      if (!voices.some(v => v.lang.startsWith('ja'))) {
        setShowAudioTip(true);
        setTimeout(() => setShowAudioTip(false), 4000);
      }
    } catch(e) {
      setShowAudioTip(true);
      setTimeout(() => setShowAudioTip(false), 4000);
    }
  };

  const probarAudio = () => {
    speak('こんにちは', 'test');
  };

  const explorarCategoria = (cat) => {
    setCategoriaTurismo(cat);
    if (!turismoExplorado.includes(cat)) {
      setTurismoExplorado([...turismoExplorado, cat]);
      ganarXP(5, `Categoría desbloqueada: ${TURISMO[cat].titulo}`);
    }
  };

  const hoy = new Date().toDateString();
  const habitosHoy = habitos.filter(h => h.dias[hoy]).length;
  const tareasHechas = tareas.filter(t => t.hecho).length;
  const progresoDia = tareas.length > 0 ? (tareasHechas / tareas.length) * 100 : 0;

  const Kitsune = ({mood = 'happy', size = 100}) => (
    <svg viewBox="0 0 120 120" width={size} height={size} className="drop-shadow-lg">
      <defs>
        <radialGradient id="furG" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#ffb380"/>
          <stop offset="100%" stopColor="#e88a4d"/>
        </radialGradient>
        <radialGradient id="cheekG" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#ffb6c1" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#ffb6c1" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <path d="M 25 75 Q 5 60, 8 40 Q 12 30, 20 35 Q 25 50, 30 65 Z" fill="url(#furG)"/>
      <path d="M 8 42 Q 5 35, 12 32" stroke="#fff" strokeWidth="2" fill="none"/>
      <ellipse cx="60" cy="65" rx="35" ry="32" fill="url(#furG)"/>
      <path d="M 35 45 L 28 20 L 48 38 Z" fill="url(#furG)"/>
      <path d="M 85 45 L 92 20 L 72 38 Z" fill="url(#furG)"/>
      <path d="M 35 42 L 32 28 L 44 38 Z" fill="#ffd4a8"/>
      <path d="M 85 42 L 88 28 L 76 38 Z" fill="#ffd4a8"/>
      <ellipse cx="60" cy="72" rx="22" ry="20" fill="#fff5e8"/>
      {mood === 'happy' && (
        <>
          <path d="M 48 62 Q 52 58, 56 62" stroke="#2c1810" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M 64 62 Q 68 58, 72 62" stroke="#2c1810" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </>
      )}
      {mood === 'excited' && (
        <>
          <text x="44" y="68" fontSize="14" fill="#ff8fa3">★</text>
          <text x="68" y="68" fontSize="14" fill="#ff8fa3">★</text>
        </>
      )}
      <ellipse cx="44" cy="74" rx="6" ry="4" fill="url(#cheekG)"/>
      <ellipse cx="76" cy="74" rx="6" ry="4" fill="url(#cheekG)"/>
      <path d="M 58 76 L 62 76 L 60 79 Z" fill="#2c1810"/>
      <path d="M 56 82 Q 60 86, 64 82" stroke="#2c1810" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );

  // Botón de audio con animación
  const AudioBtn = ({text, id, color = '#ff8fa3', size = 'sm'}) => {
    const activo = hablando === (id || text);
    return (
      <button onClick={(e) => { e.stopPropagation(); speak(text, id || text); }}
        className={`hover:scale-110 transition-transform ${size === 'sm' ? 'p-1' : 'p-2'} rounded-full relative`}
        style={{background: activo ? color : 'transparent'}}>
        <Volume2 className={size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} style={{color: activo ? 'white' : color}}/>
        {activo && (
          <span className="absolute inset-0 rounded-full" style={{
            border: `2px solid ${color}`,
            animation: 'pulse-ring 1s ease-out infinite',
          }}/>
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, #fff5f7 0%, #ffe8eb 40%, #fff0e0 100%)',
      fontFamily: '"Quicksand", "Noto Sans JP", sans-serif',
    }}>
      {sakuraPetals.map(p => (
        <div key={p.id} className="absolute pointer-events-none" style={{
          left: `${p.left}%`, top: '-20px',
          animation: `fall ${p.duration}s linear ${p.delay}s infinite`,
          fontSize: `${p.size}px`, zIndex: 1,
        }}>🌸</div>
      ))}

      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.8; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0.3; }
        }
        @keyframes bounce-soft { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes pop-in {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes glow-pulse {
          0%,100% { box-shadow: 0 0 20px rgba(255, 130, 150, 0.3); }
          50% { box-shadow: 0 0 40px rgba(255, 130, 150, 0.6); }
        }
        @keyframes slide-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes wiggle {
          0%,100% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        .kitsune-float { animation: bounce-soft 3s ease-in-out infinite; }
        .pop-in { animation: pop-in 0.5s ease-out; }
        .glow { animation: glow-pulse 2s ease-in-out infinite; }
        .slide-up { animation: slide-up 0.4s ease-out; }
        .wiggle:hover { animation: wiggle 0.4s ease-in-out; }
      `}</style>

      {/* Tip de audio si no funciona */}
      {showAudioTip && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pop-in max-w-md w-full px-4">
          <div className="rounded-2xl p-4 shadow-2xl flex items-start gap-3" style={{
            background: 'linear-gradient(135deg, #fff5e0, #ffefc8)',
            border: '2px solid #ffd700',
          }}>
            <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" style={{color:'#b8860b'}}/>
            <div className="text-xs" style={{color:'#5c2a3a'}}>
              <strong>¿No escuchas audio japonés?</strong> Tu navegador puede no tener instalada una voz japonesa. 
              Prueba en Chrome o Safari, o instala el paquete de idioma japonés en tu sistema.
              <button onClick={() => setShowAudioTip(false)} className="ml-2 underline">Ok</button>
            </div>
          </div>
        </div>
      )}

      {showCelebration && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pop-in">
          <div className="px-8 py-4 rounded-3xl shadow-2xl glow" style={{
            background: 'linear-gradient(135deg, #ff8fa3, #ffb088)', color: 'white',
          }}>
            {showCelebration.tipo === 'nivel' ? (
              <div className="text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-1"/>
                <div className="text-xs tracking-widest opacity-90">レベルアップ · LEVEL UP</div>
                <div className="text-3xl font-bold">{showCelebration.nivel.emoji} {showCelebration.nivel.titulo}</div>
                <div className="text-sm opacity-90">Nivel {showCelebration.nivel.nivel} · {showCelebration.nivel.es}</div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-3xl font-bold">+{showCelebration.xp} XP ✨</div>
                <div className="text-sm">{showCelebration.motivo}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {showLogro && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pop-in">
          <div className="px-8 py-5 rounded-3xl shadow-2xl glow text-center" style={{
            background: 'linear-gradient(135deg, #ffd700, #ffb088)', color: 'white', minWidth: '300px',
          }}>
            <Award className="w-10 h-10 mx-auto mb-2"/>
            <div className="text-xs tracking-widest opacity-90">¡LOGRO DESBLOQUEADO!</div>
            <div className="text-3xl mt-1">{showLogro.emoji}</div>
            <div className="text-2xl font-bold" style={{fontFamily:'"Noto Sans JP", sans-serif'}}>{showLogro.titulo}</div>
            <div className="text-sm italic opacity-95">{showLogro.es}</div>
            <div className="text-xs mt-1 opacity-90">{showLogro.desc}</div>
          </div>
        </div>
      )}

      {quiz && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4" style={{background:'rgba(255, 143, 163, 0.3)', backdropFilter: 'blur(8px)'}}>
          <div className="rounded-3xl p-8 max-w-md w-full shadow-2xl pop-in" style={{
            background: 'linear-gradient(135deg, #fff, #fff5f7)', border: '3px solid #ffb6c1',
          }}>
            <div className="text-center mb-6">
              <div className="inline-block px-3 py-1 rounded-full text-xs tracking-widest mb-3" style={{background:'#ffb6c1', color:'white'}}>
                <Sparkles className="w-3 h-3 inline mr-1"/>クイズ · MINI QUIZ
              </div>
              <div className="text-6xl font-bold mb-2" style={{fontFamily:'"Noto Sans JP", sans-serif', color:'#5c2a3a'}}>{quiz.palabra.jp}</div>
              <div className="text-lg italic" style={{color:'#a0556e'}}>{quiz.palabra.kana} · {quiz.palabra.romaji}</div>
              <button onClick={() => speak(quiz.palabra.jp, 'quiz')} className="mt-2 px-3 py-1 rounded-full text-xs hover:scale-105 transition-transform" style={{background:'#ffe8eb', color:'#a0556e'}}>
                🔊 Escuchar pronunciación
              </button>
            </div>
            <div className="text-sm text-center mb-4 font-medium" style={{color:'#5c2a3a'}}>¿Qué significa?</div>
            <div className="grid grid-cols-2 gap-3">
              {quiz.opciones.map((op, i) => {
                let bg = 'linear-gradient(135deg, #fff, #fff5f7)', border = '#ffb6c1', color = '#5c2a3a';
                if (quiz.respondido) {
                  if (op.jp === quiz.palabra.jp) { bg = 'linear-gradient(135deg, #d4f4dd, #a8e6b8)'; border = '#4caf50'; }
                  else if (op.jp === quiz.elegida?.jp) { bg = 'linear-gradient(135deg, #ffe0e0, #ffb0b0)'; border = '#f44336'; }
                }
                return (
                  <button key={i} onClick={() => responderQuiz(op)}
                    className="p-3 rounded-2xl transition-all text-sm font-medium hover:scale-105"
                    style={{background: bg, border: `2px solid ${border}`, color}}>
                    {op.emoji} {op.es}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="relative max-w-5xl mx-auto p-4 md:p-6" style={{zIndex: 10}}>
        <header className="mb-6">
          <div className="rounded-3xl p-5 md:p-6 shadow-lg" style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,245,247,0.85))',
            backdropFilter: 'blur(10px)', border: '2px solid rgba(255, 182, 193, 0.4)',
          }}>
            <div className="flex items-start gap-4 flex-wrap">
              <div className="kitsune-float">
                <Kitsune mood={kitsuneMood} size={100}/>
              </div>
              <div className="flex-1 min-w-[200px]">
                <div className="text-xs tracking-widest mb-1 flex items-center gap-2" style={{color:'#a0556e'}}>
                  <span style={{fontFamily:'"Noto Sans JP", sans-serif', fontSize:'14px'}}>{saludo}</span> · {saludoEs}
                  <AudioBtn text={saludo} id="saludo" color="#ff8fa3"/>
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-2" style={{color:'#5c2a3a'}}>
                  ¡Hola, {nivelActual.es.toLowerCase()}! {nivelActual.emoji}
                </div>
                <div className="rounded-2xl p-3 relative" style={{background:'rgba(255, 182, 193, 0.2)'}}>
                  <div className="absolute -top-2 left-6 w-0 h-0" style={{
                    borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
                    borderBottom: '8px solid rgba(255, 182, 193, 0.3)',
                  }}/>
                  <p className="text-sm md:text-base" style={{color:'#5c2a3a'}}>
                    <strong style={{color:'#ff8fa3'}}>Kitsu:</strong> {kitsuneMsg}
                  </p>
                </div>
                {audioOK === false && (
                  <button onClick={probarAudio} className="mt-2 text-xs underline" style={{color:'#a0556e'}}>
                    🔊 Probar audio
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-5">
              <div className="rounded-2xl p-3 text-center" style={{background:'linear-gradient(135deg, #fff5f7, #ffe8eb)'}}>
                <div className="text-xl font-bold" style={{fontFamily:'"Noto Sans JP", sans-serif', color:'#5c2a3a'}}>{nivelActual.titulo}</div>
                <div className="text-[10px]" style={{color:'#a0556e'}}>Nivel {nivelActual.nivel}</div>
              </div>
              <div className="rounded-2xl p-3 text-center" style={{background:'linear-gradient(135deg, #fff0e0, #ffe0c8)'}}>
                <div className="text-xl font-bold flex items-center justify-center gap-1" style={{color:'#8b4513'}}>
                  <Star className="w-4 h-4 fill-current"/>{xp}
                </div>
                <div className="text-[10px]" style={{color:'#a0556e'}}>{proxNivel ? `${proxNivel.xpReq - xp} para subir` : 'MAX'}</div>
              </div>
              <div className="rounded-2xl p-3 text-center" style={{background:'linear-gradient(135deg, #fff5f7, #ffe8eb)'}}>
                <div className="text-xl font-bold flex items-center justify-center gap-1" style={{color:'#5c2a3a'}}>
                  <BookOpen className="w-4 h-4"/>{palabrasAprendidas.length}
                </div>
                <div className="text-[10px]" style={{color:'#a0556e'}}>palabras</div>
              </div>
              <div className="rounded-2xl p-3 text-center" style={{background:'linear-gradient(135deg, #fff0e0, #ffe0c8)'}}>
                <div className="text-xl font-bold flex items-center justify-center gap-1" style={{color:'#8b4513'}}>
                  <Award className="w-4 h-4"/>{logrosDesbloqueados.length}/{LOGROS.length}
                </div>
                <div className="text-[10px]" style={{color:'#a0556e'}}>logros</div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="w-full h-3 rounded-full overflow-hidden" style={{background:'rgba(255, 182, 193, 0.2)'}}>
                <div className="h-full transition-all duration-700 rounded-full" style={{
                  width: `${progresoNivel}%`,
                  background: 'linear-gradient(90deg, #ff8fa3, #ffb088, #ffd700)',
                }} />
              </div>
            </div>
          </div>
        </header>

        <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
          {[
            {id:'inicio', label:'Inicio', icon:Heart},
            {id:'tareas', label:'Tareas', icon:Check},
            {id:'habitos', label:'Hábitos', icon:Flame},
            {id:'notas', label:'Notas', icon:FileText},
            {id:'calendario', label:'Eventos', icon:Calendar},
            {id:'focus', label:'Focus', icon:Target},
            {id:'turismo', label:'Turismo', icon:Plane},
            {id:'diccionario', label:'Diccionario', icon:BookOpen},
            {id:'logros', label:'Logros', icon:Award},
          ].map(t => {
            const Icon = t.icon, active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className="px-4 py-2 rounded-2xl transition-all flex items-center gap-2 whitespace-nowrap hover:scale-105"
                style={{
                  background: active ? 'linear-gradient(135deg, #ff8fa3, #ffb088)' : 'rgba(255,255,255,0.6)',
                  color: active ? 'white' : '#5c2a3a',
                  boxShadow: active ? '0 4px 12px rgba(255, 143, 163, 0.4)' : 'none',
                  border: active ? 'none' : '2px solid rgba(255, 182, 193, 0.3)',
                }}>
                <Icon className="w-4 h-4"/>
                <span className="text-sm font-medium">{t.label}</span>
              </button>
            );
          })}
        </div>

        <main className="rounded-3xl p-5 md:p-6 shadow-md slide-up" style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,245,247,0.7))',
          backdropFilter: 'blur(10px)', border: '2px solid rgba(255, 182, 193, 0.3)',
          minHeight: '400px',
        }}>
          
          {tab === 'inicio' && (
            <div className="space-y-5">
              <div className="rounded-2xl p-6 text-center" style={{
                background: 'linear-gradient(135deg, #fff5f7, #fff0e0)',
                border: '2px dashed rgba(255, 182, 193, 0.5)',
              }}>
                <div className="text-xs tracking-widest mb-2" style={{color:'#a0556e'}}>💭 INSPIRACIÓN DEL DÍA</div>
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{fontFamily:'"Noto Sans JP", sans-serif', color:'#5c2a3a'}}>
                  {motivacion.jp}
                </div>
                <div className="text-sm italic mb-2" style={{color:'#a0556e'}}>{motivacion.romaji}</div>
                <div className="text-lg" style={{color:'#5c2a3a'}}>"{motivacion.es}"</div>
                <button onClick={() => speak(motivacion.jp, 'mot')} className="mt-3 px-4 py-1 rounded-full text-xs hover:scale-105 transition-transform inline-flex items-center gap-1" style={{background:'#ffb6c1', color:'white'}}>
                  <Volume2 className="w-3 h-3"/> Escuchar
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl p-5" style={{background:'linear-gradient(135deg, #fff5f7, #ffe8eb)'}}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold" style={{color:'#5c2a3a'}}>📋 Tu día</h3>
                    <span className="text-xs" style={{color:'#a0556e'}}>{tareasHechas}/{tareas.length} tareas</span>
                  </div>
                  <div className="w-full h-2 rounded-full mb-2" style={{background:'rgba(255,255,255,0.5)'}}>
                    <div className="h-full rounded-full transition-all" style={{
                      width: `${progresoDia}%`,
                      background: 'linear-gradient(90deg, #ff8fa3, #ffb088)',
                    }}/>
                  </div>
                  <div className="text-xs" style={{color:'#5c2a3a'}}>
                    {progresoDia === 100 && tareas.length > 0 ? '¡Día completo! 🎉' : 
                     progresoDia > 0 ? `${Math.round(progresoDia)}% completado` : 'Agrega tareas para empezar'}
                  </div>
                </div>

                <div className="rounded-2xl p-5" style={{background:'linear-gradient(135deg, #fff0e0, #ffe0c8)'}}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold" style={{color:'#5c2a3a'}}>🔥 Hábitos hoy</h3>
                    <span className="text-xs" style={{color:'#a0556e'}}>{habitosHoy}/{habitos.length}</span>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {habitos.length === 0 && <span className="text-xs" style={{color:'#a0556e'}}>Sin hábitos aún</span>}
                    {habitos.map(h => (
                      <div key={h.id} className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold" style={{
                        background: h.dias[hoy] ? 'linear-gradient(135deg, #ff8fa3, #ffb088)' : 'rgba(255,255,255,0.5)',
                        color: h.dias[hoy] ? 'white' : '#a0556e',
                      }}>
                        {h.dias[hoy] ? '✓' : '○'}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl p-5 shadow-sm wiggle" style={{
                  background: 'linear-gradient(135deg, #fff, #fff5f7)', border: '2px solid #ffb6c1',
                }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs tracking-widest" style={{color:'#a0556e'}}>🌸 PALABRA DEL DÍA</div>
                    <AudioBtn text={palabraDia.jp} id="pdia" color="#ff8fa3"/>
                  </div>
                  <div className="text-5xl mb-2">{palabraDia.emoji}</div>
                  <div className="text-4xl font-bold mb-1" style={{fontFamily:'"Noto Sans JP", sans-serif', color:'#5c2a3a'}}>{palabraDia.jp}</div>
                  <div className="text-sm italic mb-1" style={{color:'#a0556e'}}>{palabraDia.kana} · {palabraDia.romaji}</div>
                  <div className="text-base font-medium mb-2" style={{color:'#5c2a3a'}}>{palabraDia.es}</div>
                  <div className="text-xs italic" style={{color:'#a0556e'}}>{palabraDia.ej}</div>
                </div>
                <div className="rounded-2xl p-5 shadow-sm wiggle" style={{
                  background: 'linear-gradient(135deg, #fff, #fff0e0)', border: '2px solid #ffd4a8',
                }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs tracking-widest" style={{color:'#8b4513'}}>✨ FRASE DEL DÍA</div>
                    <AudioBtn text={fraseDia.jp} id="fdia" color="#d2691e"/>
                  </div>
                  <div className="text-3xl font-bold mb-1 mt-4" style={{fontFamily:'"Noto Sans JP", sans-serif', color:'#5c2a3a'}}>{fraseDia.jp}</div>
                  <div className="text-sm italic mb-2" style={{color:'#8b4513'}}>{fraseDia.romaji}</div>
                  <div className="text-base font-medium" style={{color:'#5c2a3a'}}>{fraseDia.es}</div>
                </div>
              </div>

              <button onClick={lanzarQuiz} className="w-full p-5 rounded-2xl text-white font-bold hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 shadow-lg" style={{
                background: 'linear-gradient(135deg, #ff8fa3, #ffb088, #ffd700)',
              }}>
                <Sparkles className="w-6 h-6"/>
                <span>¡Quiz rápido! +25 XP</span>
                <Sparkles className="w-6 h-6"/>
              </button>
            </div>
          )}

          {tab === 'tareas' && (
            <div>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h2 className="text-xl md:text-2xl font-bold" style={{color:'#5c2a3a'}}>📝 Tareas del día</h2>
                <div className="text-xs px-3 py-1 rounded-full" style={{background:'#ffe8eb', color:'#a0556e'}}>
                  {tareasHechas}/{tareas.length} completadas
                </div>
              </div>
              <div className="flex gap-2 mb-4">
                <input value={nuevaTarea} onChange={e=>setNuevaTarea(e.target.value)}
                  onKeyDown={e=>e.key==='Enter'&&agregarTarea()}
                  placeholder="¿Qué quieres lograr hoy?" 
                  className="flex-1 px-4 py-3 rounded-2xl outline-none transition-all"
                  style={{background:'rgba(255,255,255,0.9)', border:'2px solid #ffb6c1', color:'#5c2a3a'}}/>
                <button onClick={agregarTarea} className="px-5 rounded-2xl text-white flex items-center gap-1 hover:scale-105 transition-transform shadow-md" style={{background:'linear-gradient(135deg, #ff8fa3, #ffb088)'}}>
                  <Plus className="w-5 h-5"/>
                </button>
              </div>
              <div className="space-y-2">
                {tareas.length === 0 && (
                  <div className="text-center py-12 rounded-2xl" style={{background:'rgba(255,182,193,0.1)'}}>
                    <div className="text-5xl mb-3">🌸</div>
                    <p className="text-sm" style={{color:'#a0556e'}}>Tu lista está vacía</p>
                    <p className="text-xs italic mt-1" style={{color:'#a0556e'}}>Cada tarea te enseña una palabra nueva</p>
                  </div>
                )}
                {tareas.map(t => (
                  <div key={t.id} className="flex items-center gap-3 p-4 rounded-2xl group transition-all hover:shadow-md" style={{
                    background: t.hecho ? 'rgba(255, 215, 0, 0.1)' : 'rgba(255,255,255,0.7)',
                    border: '2px solid rgba(255, 182, 193, 0.3)',
                  }}>
                    <button onClick={()=>completarTarea(t.id)} 
                      className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
                      style={{
                        background: t.hecho ? 'linear-gradient(135deg, #ff8fa3, #ffb088)' : 'rgba(255,255,255,0.9)',
                        border: '2px solid #ffb6c1',
                      }}>
                      {t.hecho && <Check className="w-4 h-4 text-white"/>}
                    </button>
                    <div className="flex-1">
                      <div className={t.hecho ? 'line-through opacity-60' : ''} style={{color:'#5c2a3a'}}>{t.texto}</div>
                      <div className="text-xs flex items-center gap-2 mt-1 flex-wrap" style={{color:'#a0556e'}}>
                        <span>{t.palabra.emoji}</span>
                        <span className="font-bold" style={{fontFamily:'"Noto Sans JP", sans-serif', color:'#ff8fa3'}}>{t.palabra.jp}</span>
                        <AudioBtn text={t.palabra.jp} id={`t${t.id}`} color="#ff8fa3"/>
                        <span className="italic">{t.palabra.romaji}</span>
                        <span>· {t.palabra.es}</span>
                      </div>
                    </div>
                    <button onClick={()=>eliminarTarea(t.id)} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full">
                      <Trash2 className="w-4 h-4" style={{color:'#ff8fa3'}}/>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'habitos' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl md:text-2xl font-bold" style={{color:'#5c2a3a'}}>🔥 Tus hábitos</h2>
                <div className="text-xs px-3 py-1 rounded-full" style={{background:'#ffe8eb', color:'#a0556e'}}>{habitosHoy}/{habitos.length} hoy</div>
              </div>
              <div className="flex gap-2 mb-4">
                <input value={nuevoHabito} onChange={e=>setNuevoHabito(e.target.value)}
                  onKeyDown={e=>e.key==='Enter'&&agregarHabito()}
                  placeholder="Ej: Meditar 10 minutos..." 
                  className="flex-1 px-4 py-3 rounded-2xl outline-none"
                  style={{background:'rgba(255,255,255,0.9)', border:'2px solid #ffb6c1', color:'#5c2a3a'}}/>
                <button onClick={agregarHabito} className="px-5 rounded-2xl text-white shadow-md hover:scale-105 transition-transform" style={{background:'linear-gradient(135deg, #ff8fa3, #ffb088)'}}>
                  <Plus className="w-5 h-5"/>
                </button>
              </div>
              <div className="space-y-2">
                {habitos.length === 0 && (
                  <div className="text-center py-12 rounded-2xl" style={{background:'rgba(255,182,193,0.1)'}}>
                    <div className="text-5xl mb-3">🍵</div>
                    <p className="text-sm" style={{color:'#a0556e'}}>Sin hábitos aún</p>
                    <p className="text-xs italic mt-1" style={{color:'#a0556e'}}>Los pequeños hábitos construyen grandes cambios</p>
                  </div>
                )}
                {habitos.map(h => {
                  const hechoHoy = !!h.dias[hoy];
                  const totalDias = Object.keys(h.dias).length;
                  return (
                    <div key={h.id} className="flex items-center gap-3 p-4 rounded-2xl group" style={{
                      background: 'rgba(255,255,255,0.7)', border: '2px solid rgba(255, 182, 193, 0.3)',
                    }}>
                      <button onClick={()=>toggleHabito(h.id)}
                        className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:scale-110"
                        style={{background: hechoHoy ? 'linear-gradient(135deg, #ff8fa3, #ffb088)' : 'rgba(255,182,193,0.2)'}}>
                        {hechoHoy ? <Check className="w-6 h-6 text-white"/> : <Flame className="w-6 h-6" style={{color:'#ff8fa3'}}/>}
                      </button>
                      <div className="flex-1">
                        <div style={{color:'#5c2a3a'}}>{h.texto}</div>
                        <div className="text-xs" style={{color:'#a0556e'}}>
                          🔥 {totalDias} {totalDias === 1 ? 'día' : 'días'} {totalDias >= 7 && '· ¡increíble!'}
                        </div>
                      </div>
                      <button onClick={()=>eliminarHabito(h.id)} className="opacity-0 group-hover:opacity-100 p-1">
                        <Trash2 className="w-4 h-4" style={{color:'#ff8fa3'}}/>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tab === 'notas' && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{color:'#5c2a3a'}}>📓 Notas rápidas</h2>
              <div className="flex gap-2 mb-4">
                <textarea value={nuevaNota} onChange={e=>setNuevaNota(e.target.value)}
                  placeholder="Escribe lo que tengas en mente..." rows="2"
                  className="flex-1 px-4 py-3 rounded-2xl outline-none resize-none"
                  style={{background:'rgba(255,255,255,0.9)', border:'2px solid #ffb6c1', color:'#5c2a3a'}}/>
                <button onClick={agregarNota} className="px-5 rounded-2xl text-white shadow-md hover:scale-105 transition-transform" style={{background:'linear-gradient(135deg, #ff8fa3, #ffb088)'}}>
                  <Plus className="w-5 h-5"/>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {notas.length === 0 && (
                  <div className="col-span-2 text-center py-12 rounded-2xl" style={{background:'rgba(255,182,193,0.1)'}}>
                    <div className="text-5xl mb-3">✍️</div>
                    <p className="text-sm" style={{color:'#a0556e'}}>Captura tus ideas aquí</p>
                  </div>
                )}
                {notas.map((n, i) => (
                  <div key={n.id} className="p-4 rounded-2xl group relative transition-all hover:shadow-md" style={{
                    background: ['linear-gradient(135deg, #fff5f7, #ffe8eb)','linear-gradient(135deg, #fff0e0, #ffe0c8)','linear-gradient(135deg, #f0fff0, #e0ffe8)','linear-gradient(135deg, #fff5e0, #ffefc8)'][i%4],
                    border: '2px solid rgba(255, 182, 193, 0.2)',
                    transform: `rotate(${(i%2===0?-0.5:0.5)}deg)`,
                  }}>
                    <button onClick={()=>eliminarNota(n.id)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-white/50">
                      <X className="w-4 h-4" style={{color:'#a0556e'}}/>
                    </button>
                    <div className="text-sm whitespace-pre-wrap pr-6" style={{color:'#5c2a3a'}}>{n.texto}</div>
                    <div className="text-[10px] mt-2 italic" style={{color:'#a0556e'}}>{n.fecha}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'calendario' && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{color:'#5c2a3a'}}>📅 Próximos eventos</h2>
              <div className="flex gap-2 mb-4 flex-wrap">
                <input value={nuevoEvento.titulo} onChange={e=>setNuevoEvento({...nuevoEvento, titulo:e.target.value})}
                  placeholder="Nombre del evento..." 
                  className="flex-1 min-w-[200px] px-4 py-3 rounded-2xl outline-none"
                  style={{background:'rgba(255,255,255,0.9)', border:'2px solid #ffb6c1', color:'#5c2a3a'}}/>
                <input type="date" value={nuevoEvento.fecha} onChange={e=>setNuevoEvento({...nuevoEvento, fecha:e.target.value})}
                  className="px-4 py-3 rounded-2xl outline-none"
                  style={{background:'rgba(255,255,255,0.9)', border:'2px solid #ffb6c1', color:'#5c2a3a'}}/>
                <button onClick={agregarEvento} className="px-5 rounded-2xl text-white shadow-md hover:scale-105 transition-transform" style={{background:'linear-gradient(135deg, #ff8fa3, #ffb088)'}}>
                  <Plus className="w-5 h-5"/>
                </button>
              </div>
              <div className="space-y-2">
                {eventos.length === 0 && (
                  <div className="text-center py-12 rounded-2xl" style={{background:'rgba(255,182,193,0.1)'}}>
                    <div className="text-5xl mb-3">📅</div>
                    <p className="text-sm" style={{color:'#a0556e'}}>Sin eventos programados</p>
                  </div>
                )}
                {eventos.map(e => {
                  const fechaObj = new Date(e.fecha + 'T00:00:00');
                  const diasFaltan = Math.ceil((fechaObj - new Date()) / (1000*60*60*24));
                  const urgente = diasFaltan >= 0 && diasFaltan <= 3;
                  return (
                    <div key={e.id} className="flex items-center gap-4 p-4 rounded-2xl group transition-all hover:shadow-md" style={{
                      background: 'rgba(255,255,255,0.7)',
                      border: `2px solid ${urgente ? '#ff8fa3' : 'rgba(255, 182, 193, 0.3)'}`,
                    }}>
                      <div className="w-16 text-center rounded-2xl p-2" style={{background:'linear-gradient(135deg, #ff8fa3, #ffb088)', color:'white'}}>
                        <div className="text-[10px] uppercase">{fechaObj.toLocaleDateString('es-ES',{month:'short'})}</div>
                        <div className="text-2xl font-bold">{fechaObj.getDate()}</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium" style={{color:'#5c2a3a'}}>{e.titulo}</div>
                        <div className="text-xs" style={{color:'#a0556e'}}>
                          {diasFaltan === 0 ? '🎯 ¡Hoy!' : diasFaltan === 1 ? '⏰ Mañana' : diasFaltan > 0 ? `En ${diasFaltan} días` : `Hace ${-diasFaltan} días`}
                        </div>
                      </div>
                      <button onClick={()=>eliminarEvento(e.id)} className="opacity-0 group-hover:opacity-100 p-1">
                        <Trash2 className="w-4 h-4" style={{color:'#ff8fa3'}}/>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tab === 'focus' && (
            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-bold mb-2" style={{color:'#5c2a3a'}}>🎯 Modo Concentración</h2>
              <p className="text-sm italic mb-6" style={{color:'#a0556e'}}>25 min foco · 5 min descanso · Cuenta en japonés</p>
              
              <div className="my-8 inline-block rounded-full p-8" style={{
                background: pomodoroFase === 'focus' ? 'linear-gradient(135deg, #fff5f7, #ffe8eb)' : 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
                border: `4px solid ${pomodoroFase === 'focus' ? '#ff8fa3' : '#66bb6a'}`,
              }}>
                <div className="text-xs tracking-widest mb-2" style={{color: pomodoroFase === 'focus' ? '#a0556e' : '#388e3c'}}>
                  {pomodoroFase === 'focus' ? '集中 CONCENTRACIÓN' : '休憩 DESCANSO'}
                </div>
                <div className="text-7xl md:text-8xl font-bold tabular-nums" style={{color:'#5c2a3a'}}>{formatTime(pomodoroSeg)}</div>
              </div>

              <div className="text-sm mb-4" style={{color:'#5c2a3a'}}>
                Pomodoros hoy:{' '}
                {pomodorosHoy < 10 ? (
                  <span className="font-bold text-2xl mx-2" style={{fontFamily:'"Noto Sans JP", sans-serif', color:'#ff8fa3'}}>
                    {NUMEROS[pomodorosHoy] || pomodorosHoy}
                  </span>
                ) : <span className="font-bold text-2xl">{pomodorosHoy}</span>} 
                <span className="italic text-xs" style={{color:'#a0556e'}}>({NUMEROS_ROMAJI[pomodorosHoy] || pomodorosHoy})</span>
              </div>

              <div className="flex gap-3 justify-center mb-6 flex-wrap">
                <button onClick={() => setPomodoroActivo(!pomodoroActivo)} 
                  className="px-8 py-3 rounded-2xl text-white font-bold shadow-lg hover:scale-105 transition-transform" style={{
                    background: pomodoroActivo ? 'linear-gradient(135deg, #ffb088, #ffd700)' : 'linear-gradient(135deg, #ff8fa3, #ffb088)',
                  }}>
                  {pomodoroActivo ? '⏸️ Pausa' : '▶️ Comenzar'}
                </button>
                <button onClick={() => { setPomodoroActivo(false); setPomodoroSeg(pomodoroFase === 'focus' ? 25*60 : 5*60); }}
                  className="px-6 py-3 rounded-2xl font-bold" style={{background:'rgba(255,255,255,0.7)', color:'#5c2a3a', border:'2px solid #ffb6c1'}}>
                  🔄 Reset
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2 max-w-md mx-auto mt-8 p-4 rounded-2xl" style={{background:'rgba(255,182,193,0.1)'}}>
                {NUMEROS.map((num, i) => (
                  <button key={i} onClick={() => speak(num, `n${i}`)} className="p-2 rounded-xl transition-all hover:scale-110" style={{
                    background: i < pomodorosHoy ? 'linear-gradient(135deg, #ff8fa3, #ffb088)' : 'rgba(255,255,255,0.5)',
                    transform: i < pomodorosHoy ? 'scale(1.05)' : 'scale(1)',
                  }}>
                    <div className="text-xl md:text-2xl font-bold" style={{fontFamily:'"Noto Sans JP", sans-serif', color: i < pomodorosHoy ? 'white' : '#a0556e'}}>{num}</div>
                    <div className="text-[9px]" style={{color: i < pomodorosHoy ? 'white' : '#a0556e'}}>{NUMEROS_ROMAJI[i]}</div>
                  </button>
                ))}
              </div>
              <p className="text-xs mt-4 italic" style={{color:'#a0556e'}}>💡 Toca cada número para escuchar su pronunciación</p>
            </div>
          )}

          {tab === 'turismo' && (
            <div>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h2 className="text-xl md:text-2xl font-bold" style={{color:'#5c2a3a'}}>🗾 Guía para viajar a Japón</h2>
                <div className="text-xs px-3 py-1 rounded-full" style={{background:'#ffe8eb', color:'#a0556e'}}>
                  {turismoExplorado.length}/{Object.keys(TURISMO).length} categorías
                </div>
              </div>
              <p className="text-sm mb-5" style={{color:'#a0556e'}}>
                💡 Frases reales que necesitarás. Toca el altavoz para escuchar la pronunciación.
              </p>

              {/* Categorías */}
              <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
                {Object.entries(TURISMO).map(([key, cat]) => {
                  const explorado = turismoExplorado.includes(key);
                  const active = categoriaTurismo === key;
                  return (
                    <button key={key} onClick={() => explorarCategoria(key)}
                      className="px-4 py-2 rounded-2xl transition-all flex items-center gap-2 whitespace-nowrap hover:scale-105 relative"
                      style={{
                        background: active ? cat.color : 'rgba(255,255,255,0.7)',
                        color: active ? 'white' : '#5c2a3a',
                        border: active ? 'none' : `2px solid ${cat.color}50`,
                        boxShadow: active ? `0 4px 12px ${cat.color}40` : 'none',
                      }}>
                      <span className="text-base">{cat.emoji}</span>
                      <span className="text-xs font-medium">{cat.titulo}</span>
                      {!explorado && !active && <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{background:'#ff8fa3'}}/>}
                    </button>
                  );
                })}
              </div>

              {/* Contenido categoría */}
              {(() => {
                const cat = TURISMO[categoriaTurismo];
                return (
                  <div className="slide-up">
                    <div className="mb-4 p-4 rounded-2xl" style={{background: `${cat.color}15`, border: `2px solid ${cat.color}40`}}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{cat.emoji}</span>
                        <h3 className="font-bold text-lg" style={{color:'#5c2a3a'}}>{cat.titulo}</h3>
                      </div>
                      <p className="text-xs" style={{color:'#a0556e'}}>{cat.desc}</p>
                    </div>

                    <div className="space-y-3">
                      {cat.items.map((item, i) => (
                        <div key={i} className="p-4 rounded-2xl hover:shadow-md transition-all" style={{
                          background: 'rgba(255,255,255,0.85)',
                          border: `2px solid ${cat.color}30`,
                        }}>
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="text-2xl font-bold" style={{fontFamily:'"Noto Sans JP", sans-serif', color:'#5c2a3a'}}>{item.jp}</div>
                                <AudioBtn text={item.jp} id={`t-${categoriaTurismo}-${i}`} color={cat.color} size="md"/>
                              </div>
                              <div className="text-xs italic mb-1" style={{color:'#a0556e'}}>{item.romaji}</div>
                              <div className="text-sm font-medium" style={{color:'#5c2a3a'}}>{item.es}</div>
                            </div>
                          </div>
                          {item.tip && (
                            <div className="mt-2 p-2 rounded-xl text-xs flex items-start gap-2" style={{background: `${cat.color}10`}}>
                              <span>💡</span>
                              <span style={{color:'#5c2a3a'}}>{item.tip}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 rounded-2xl text-center text-xs" style={{
                      background: 'linear-gradient(135deg, #fff5e0, #ffefc8)',
                      border: '2px dashed #ffd700',
                      color: '#8b4513',
                    }}>
                      ✨ Explora todas las categorías para desbloquear el logro <strong>旅人 (Viajero)</strong>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {tab === 'diccionario' && (
            <div>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h2 className="text-xl md:text-2xl font-bold" style={{color:'#5c2a3a'}}>📚 Mi diccionario</h2>
                <button onClick={lanzarQuiz} className="px-4 py-2 rounded-2xl text-white flex items-center gap-2 hover:scale-105 transition-transform shadow-md" style={{background:'linear-gradient(135deg, #ff8fa3, #ffb088)'}}>
                  <Sparkles className="w-4 h-4"/> Quiz +25 XP
                </button>
              </div>
              <p className="text-sm mb-4" style={{color:'#a0556e'}}>
                Has aprendido <strong>{palabrasAprendidas.length}</strong> de <strong>{VOCAB.length}</strong> palabras
                {palabrasAprendidas.length >= VOCAB.length && ' · ¡Las dominas todas! 🎉'}
              </p>
              {palabrasAprendidas.length === 0 ? (
                <div className="text-center py-12 rounded-2xl" style={{background:'rgba(255,182,193,0.1)'}}>
                  <div className="text-5xl mb-3">📖</div>
                  <p className="text-sm" style={{color:'#a0556e'}}>Tu colección está esperando</p>
                  <p className="text-xs italic mt-1" style={{color:'#a0556e'}}>Completa tareas para desbloquear palabras</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {palabrasAprendidas.map((p, i) => (
                    <div key={i} className="p-4 rounded-2xl shadow-sm hover:shadow-md transition-all hover:scale-105" style={{
                      background: 'linear-gradient(135deg, #fff, #fff5f7)',
                      border: '2px solid rgba(255, 182, 193, 0.4)',
                    }}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-3xl">{p.emoji}</div>
                        <AudioBtn text={p.jp} id={`dic-${i}`} color="#ff8fa3"/>
                      </div>
                      <div className="text-3xl font-bold mb-1" style={{fontFamily:'"Noto Sans JP", sans-serif', color:'#5c2a3a'}}>{p.jp}</div>
                      <div className="text-xs italic" style={{color:'#a0556e'}}>{p.kana}</div>
                      <div className="text-xs italic mb-1" style={{color:'#a0556e'}}>{p.romaji}</div>
                      <div className="text-sm font-medium" style={{color:'#5c2a3a'}}>{p.es}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'logros' && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-2" style={{color:'#5c2a3a'}}>🏆 Logros</h2>
              <p className="text-sm mb-5" style={{color:'#a0556e'}}>
                Has desbloqueado <strong>{logrosDesbloqueados.length}</strong> de <strong>{LOGROS.length}</strong> logros
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {LOGROS.map(logro => {
                  const desbloqueado = logrosDesbloqueados.includes(logro.id);
                  return (
                    <div key={logro.id} className="p-5 rounded-2xl transition-all" style={{
                      background: desbloqueado ? 'linear-gradient(135deg, #ffd700, #ffb088, #ff8fa3)' : 'rgba(255,255,255,0.6)',
                      border: desbloqueado ? '2px solid #ffd700' : '2px dashed rgba(255, 182, 193, 0.4)',
                      opacity: desbloqueado ? 1 : 0.6,
                    }}>
                      <div className="flex items-start gap-3">
                        <div className="text-4xl" style={{filter: desbloqueado ? 'none' : 'grayscale(1)'}}>{logro.emoji}</div>
                        <div className="flex-1">
                          <div className="font-bold text-lg" style={{fontFamily:'"Noto Sans JP", sans-serif', color: desbloqueado ? 'white' : '#5c2a3a'}}>{logro.titulo}</div>
                          <div className="text-xs italic" style={{color: desbloqueado ? 'rgba(255,255,255,0.9)' : '#a0556e'}}>{logro.romaji} · {logro.es}</div>
                          <div className="text-xs mt-1" style={{color: desbloqueado ? 'white' : '#5c2a3a'}}>{logro.desc}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>

        <footer className="mt-6 text-center text-xs italic" style={{color:'#a0556e'}}>
          🌸 一歩ずつ · paso a paso · hecho con cariño 💗
        </footer>
      </div>
    </div>
  );
}
