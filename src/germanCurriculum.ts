import { 
  VocabularyItem, 
  GrammarTopic, 
  SpeakingExercise, 
  WritingExercise, 
  ListeningExercise, 
  ReadingExercise, 
  MockTestItem, 
  GermanLevel 
} from './types';

// ==========================================
// 1. REAL VOCABULARY BY LEVEL & TOPIC
// ==========================================
export const GERMAN_VOCABULARY: VocabularyItem[] = [
  // A1 Vocabulary
  {
    id: 'v-a1-1',
    level: 'A1',
    topicGroup: 'Arbeit und Beruf',
    word: 'Beruf',
    article: 'der',
    plural: 'die Berufe',
    meaning: 'profession / occupation',
    exampleSentence: 'Mein Beruf ist Lehrer.',
    exampleTranslation: 'My profession is teacher.',
  },
  {
    id: 'v-a1-2',
    level: 'A1',
    topicGroup: 'Familie',
    word: 'Familie',
    article: 'die',
    plural: 'die Familien',
    meaning: 'family',
    exampleSentence: 'Meine Familie wohnt in München.',
    exampleTranslation: 'My family lives in Munich.',
  },
  {
    id: 'v-a1-3',
    level: 'A1',
    topicGroup: 'Familie',
    word: 'Bruder',
    article: 'der',
    plural: 'die Brüder',
    meaning: 'brother',
    exampleSentence: 'Ich habe einen älteren Bruder.',
    exampleTranslation: 'I have an older brother.',
  },
  {
    id: 'v-a1-4',
    level: 'A1',
    topicGroup: 'Alltag',
    word: 'Tag',
    article: 'der',
    plural: 'die Tage',
    meaning: 'day',
    exampleSentence: 'Heute ist ein schöner Tag.',
    exampleTranslation: 'Today is a beautiful day.',
  },
  {
    id: 'v-a1-5',
    level: 'A1',
    topicGroup: 'Essen und Trinken',
    word: 'Apfel',
    article: 'der',
    plural: 'die Äpfel',
    meaning: 'apple',
    exampleSentence: 'Ich esse jeden Morgen einen Apfel.',
    exampleTranslation: 'I eat an apple every morning.',
  },
  {
    id: 'v-a1-6',
    level: 'A1',
    topicGroup: 'Essen und Trinken',
    word: 'Wasser',
    article: 'das',
    plural: '-',
    meaning: 'water',
    exampleSentence: 'Ein Glas Wasser bitte.',
    exampleTranslation: 'A glass of water please.',
  },
  {
    id: 'v-a1-7',
    level: 'A1',
    topicGroup: 'Wohnen',
    word: 'Wohnung',
    article: 'die',
    plural: 'die Wohnungen',
    meaning: 'apartment / flat',
    exampleSentence: 'Die Wohnung hat drei Zimmer und einen Balkon.',
    exampleTranslation: 'The apartment has three rooms and a balcony.',
  },
  {
    id: 'v-a1-8',
    level: 'A1',
    topicGroup: 'Einkaufen',
    word: 'Supermarkt',
    article: 'der',
    plural: 'die Supermärkte',
    meaning: 'supermarket',
    exampleSentence: 'Der Supermarkt öffnet um acht Uhr.',
    exampleTranslation: 'The supermarket opens at eight o\'clock.',
  },
  {
    id: 'v-a1-9',
    level: 'A1',
    topicGroup: 'Freizeit',
    word: 'Hobby',
    article: 'das',
    plural: 'die Hobbys',
    meaning: 'hobby / pastime',
    exampleSentence: 'Mein Hobby ist Schwimmen und Lesen.',
    exampleTranslation: 'My hobby is swimming and reading.',
  },
  {
    id: 'v-a1-10',
    level: 'A1',
    topicGroup: 'Schule und Ausbildung',
    word: 'Kurs',
    article: 'der',
    plural: 'die Kurse',
    meaning: 'course / class',
    exampleSentence: 'Der Deutschkurs beginnt nächste Woche.',
    exampleTranslation: 'The German course begins next week.',
  },

  // A2 Vocabulary
  {
    id: 'v-a2-1',
    level: 'A2',
    topicGroup: 'Arbeit und Beruf',
    word: 'Bewerbung',
    article: 'die',
    plural: 'die Bewerbungen',
    meaning: 'job application',
    exampleSentence: 'Ich habe gestern meine Bewerbung abgeschickt.',
    exampleTranslation: 'I sent off my job application yesterday.',
  },
  {
    id: 'v-a2-2',
    level: 'A2',
    topicGroup: 'Reisen',
    word: 'Fahrkarte',
    article: 'die',
    plural: 'die Fahrkarten',
    meaning: 'transit ticket',
    exampleSentence: 'Sie müssen die Fahrkarte vor der Abfahrt entwerten.',
    exampleTranslation: 'You have to validate the ticket before departure.',
  },
  {
    id: 'v-a2-3',
    level: 'A2',
    topicGroup: 'Gesundheit',
    word: 'Termin',
    article: 'der',
    plural: 'die Termine',
    meaning: 'appointment / scheduled meeting',
    exampleSentence: 'Ich brauche einen Termin beim Arzt für Mittwoch.',
    exampleTranslation: 'I need an appointment at the doctor for Wednesday.',
  },

  // B1 Vocabulary
  {
    id: 'v-b1-1',
    level: 'B1',
    topicGroup: 'Arbeit und Beruf',
    word: 'Erfahrung',
    article: 'die',
    plural: 'die Erfahrungen',
    meaning: 'experience',
    exampleSentence: 'Für diese Stelle benötigt man praktische Erfahrung.',
    exampleTranslation: 'Practical experience is needed for this position.',
  },
  {
    id: 'v-b1-2',
    level: 'B1',
    topicGroup: 'Alltag',
    word: 'Meinung',
    article: 'die',
    plural: 'die Meinungen',
    meaning: 'opinion',
    exampleSentence: 'Meiner Meinung nach ist Umweltschutz sehr wichtig.',
    exampleTranslation: 'In my opinion, environmental protection is very important.',
  },

  // B2 Vocabulary
  {
    id: 'v-b2-1',
    level: 'B2',
    topicGroup: 'Arbeit und Beruf',
    word: 'Voraussetzung',
    article: 'die',
    plural: 'die Voraussetzungen',
    meaning: 'prerequisite / qualification',
    exampleSentence: 'Hervorragende Deutschkenntnisse sind eine Grundvoraussetzung.',
    exampleTranslation: 'Excellent German skills are a basic prerequisite.',
  },
  {
    id: 'v-b2-2',
    level: 'B2',
    topicGroup: 'Alltag',
    word: 'Herausforderung',
    article: 'die',
    plural: 'die Herausforderungen',
    meaning: 'challenge',
    exampleSentence: 'Die Digitalisierung stellt viele Firmen vor große Herausforderungen.',
    exampleTranslation: 'Digitalization presents many companies with major challenges.',
  },
];

// ==========================================
// 2. DEDICATED GRAMMAR TOPICS WITH LESSONS & EXERCISES
// ==========================================
export const GERMAN_GRAMMAR: GrammarTopic[] = [
  // A1 Topics (explicitly listed in section 8 of brief)
  {
    id: 'g-a1-1',
    level: 'A1',
    title: 'Personalpronomen (ich, du, er, sie, es...)',
    ruleSummary: 'In German, personal pronouns replace nouns and indicate the grammatical person, number, and case in the sentence.',
    examples: [
      { german: 'Ich heiße Lukas.', english: 'I am called Lukas.', highlight: 'Ich' },
      { german: 'Woher kommst du?', english: 'Where do you come from?', highlight: 'du' },
      { german: 'Er lernt Deutsch.', english: 'He is learning German.', highlight: 'Er' },
    ],
    exercises: [
      {
        id: 'ex-g1',
        prompt: 'Choose the correct personal pronoun for third person singular (feminine):',
        gapSentence: 'Das ist Anna. ___ kommt aus Österreich.',
        options: ['Er', 'Sie', 'Es', 'Wir'],
        correctAnswer: 'Sie',
      },
    ],
  },
  {
    id: 'g-a1-2',
    level: 'A1',
    title: 'sein / haben (Essential Auxiliaries)',
    ruleSummary: 'The verbs "sein" (to be) and "haben" (to have) are irregular verbs forming the bedrock of German present tense statements.',
    examples: [
      { german: 'Ich bin Student.', english: 'I am a student.', highlight: 'bin' },
      { german: 'Wir haben heute keine Zeit.', english: 'We have no time today.', highlight: 'haben' },
      { german: 'Du bist sehr freundlich.', english: 'You are very friendly.', highlight: 'bist' },
    ],
    exercises: [
      {
        id: 'ex-g2',
        prompt: 'Select the correct conjugation of sein:',
        gapSentence: 'Herr Müller, woher ___ Sie?',
        options: ['bist', 'sind', 'seid', 'ist'],
        correctAnswer: 'sind',
      },
    ],
  },
  {
    id: 'g-a1-3',
    level: 'A1',
    title: 'Präsens (Regular Verb Conjugations)',
    ruleSummary: 'Regular German verbs in the present tense take the verb stem and add the personal endings: -e, -st, -t, -en, -t, -en.',
    examples: [
      { german: 'Ich wohne in Berlin.', english: 'I live in Berlin.', highlight: 'wohne' },
      { german: 'Lernst du heute Abend?', english: 'Are you studying this evening?', highlight: 'Lernst' },
    ],
    exercises: [
      {
        id: 'ex-g3',
        prompt: 'Complete the sentence with the correct verb form of "trinken":',
        gapSentence: 'Am Morgen ___ wir Kaffee.',
        options: ['trinke', 'trinkst', 'trinken', 'trinkt'],
        correctAnswer: 'trinken',
      },
    ],
  },
  {
    id: 'g-a1-4',
    level: 'A1',
    title: 'W-Fragen (Open Interrogatives)',
    ruleSummary: 'W-Questions start with an interrogative word (Wer, Was, Wo, Woher, Wohin, Wie, Wann). The conjugated verb strictly follows in position 2.',
    examples: [
      { german: 'Woher kommen Sie?', english: 'Where do you come from?', highlight: 'Woher' },
      { german: 'Was kostet das Brötchen?', english: 'What does the bread roll cost?', highlight: 'Was' },
    ],
    exercises: [
      {
        id: 'ex-g4',
        prompt: 'Choose the correct question word for place of origin:',
        gapSentence: '___ kommen Sie? – Aus der Schweiz.',
        options: ['Wohin', 'Woher', 'Wann', 'Wer'],
        correctAnswer: 'Woher',
      },
    ],
  },
  {
    id: 'g-a1-5',
    level: 'A1',
    title: 'Ja/Nein-Fragen (Closed Questions)',
    ruleSummary: 'In yes/no questions, the conjugated verb moves to position 1, followed directly by the subject.',
    examples: [
      { german: 'Sprechen Sie Englisch?', english: 'Do you speak English?', highlight: 'Sprechen' },
      { german: 'Wohnst du hier?', english: 'Do you live here?', highlight: 'Wohnst' },
    ],
    exercises: [
      {
        id: 'ex-g5',
        prompt: 'Select the verb in position 1 to form the question:',
        gapSentence: '___ du gerne Musik? – Ja, sehr gerne.',
        options: ['Hörst', 'Hört', 'Hören', 'Gehst'],
        correctAnswer: 'Hörst',
      },
    ],
  },
  {
    id: 'g-a1-6',
    level: 'A1',
    title: 'bestimmter und unbestimmter Artikel',
    ruleSummary: 'German uses definite articles (der, die, das) for specific items and indefinite articles (ein, eine, ein) for non-specific items.',
    examples: [
      { german: 'Das ist ein Tisch. Der Tisch ist neu.', english: 'That is a table. The table is new.', highlight: 'ein / Der' },
      { german: 'Sie kauft eine Lampe.', english: 'She buys a lamp.', highlight: 'eine' },
    ],
    exercises: [
      {
        id: 'ex-g6',
        prompt: 'Fill in the correct indefinite article (neuter noun "Buch"):',
        gapSentence: 'Ich lese gerade ___ interessantes Buch.',
        options: ['ein', 'eine', 'einen', 'einem'],
        correctAnswer: 'ein',
      },
    ],
  },
  {
    id: 'g-a1-7',
    level: 'A1',
    title: 'Nominativ vs. Akkusativ',
    ruleSummary: 'Nominative is the subject of the sentence. Accusative is the direct object. Only masculine changes from der/ein to den/einen.',
    examples: [
      { german: 'Der Mann (Nom.) kauft den Apfel (Akk.).', english: 'The man buys the apple.', highlight: 'den' },
      { german: 'Ich habe einen Bruder.', english: 'I have a brother.', highlight: 'einen' },
    ],
    exercises: [
      {
        id: 'ex-g7',
        prompt: 'Select the correct accusative masculine form:',
        gapSentence: 'Ich suche ___ Bahnhof.',
        options: ['der', 'den', 'dem', 'des'],
        correctAnswer: 'den',
      },
    ],
  },
  {
    id: 'g-a1-8',
    level: 'A1',
    title: 'Modalverben (können, müssen, wollen, dürfen...)',
    ruleSummary: 'Modal verbs alter the necessity or possibility. The conjugated modal occupies position 2, and the infinitive goes to the very end.',
    examples: [
      { german: 'Ich kann gut schwimmen.', english: 'I can swim well.', highlight: 'kann ... schwimmen' },
      { german: 'Wir müssen pünktlich sein.', english: 'We must be on time.', highlight: 'müssen ... sein' },
    ],
    exercises: [
      {
        id: 'ex-g8',
        prompt: 'Complete with the modal verb "können" for "ich":',
        gapSentence: 'Entschuldigung, ich ___ Sie nicht verstehen.',
        options: ['kann', 'kannst', 'können', 'konnte'],
        correctAnswer: 'kann',
      },
    ],
  },
  {
    id: 'g-a1-9',
    level: 'A1',
    title: 'trennbare Verben (Separable Prefix Verbs)',
    ruleSummary: 'Prefixes like an-, ab-, auf-, aus-, mit- separate in the present tense and are placed at the end of the clause.',
    examples: [
      { german: 'Der Zug fährt um 9 Uhr ab.', english: 'The train departs at 9 o\'clock.', highlight: 'fährt ... ab' },
      { german: 'Ich stehe um sieben Uhr auf.', english: 'I get up at seven o\'clock.', highlight: 'stehe ... auf' },
    ],
    exercises: [
      {
        id: 'ex-g9',
        prompt: 'Complete the sentence with the prefix of "anrufen":',
        gapSentence: 'Peter ruft seine Mutter heute Abend ___.',
        options: ['an', 'auf', 'aus', 'ab'],
        correctAnswer: 'an',
      },
    ],
  },

  // A2 Topics
  {
    id: 'g-a2-1',
    level: 'A2',
    title: 'Perfekt (Past Conversational Tense)',
    ruleSummary: 'Perfekt is formed with haben/sein + Partizip II (ge-...-t / ge-...-en). Verbs of movement and state change use sein.',
    examples: [
      { german: 'Ich habe gestern gearbeitet.', english: 'I worked yesterday.' },
      { german: 'Er ist nach Berlin gefahren.', english: 'He travelled to Berlin.' },
    ],
    exercises: [
      {
        id: 'ex-a2-g1',
        prompt: 'Choose the correct auxiliary for movement:',
        gapSentence: 'Wir ___ gestern ins Kino gegangen.',
        options: ['sind', 'haben', 'waren', 'hatten'],
        correctAnswer: 'sind',
      },
    ],
  },

  // B1 Topics
  {
    id: 'g-b1-1',
    level: 'B1',
    title: 'Nebensätze mit dass, weil, wenn, obwohl',
    ruleSummary: 'In subordinate clauses introduced by conjunctions, the conjugated verb is pushed to the final position.',
    examples: [
      { german: 'Ich lerne Deutsch, weil ich in Deutschland studieren will.', english: 'I learn German because I want to study in Germany.' },
    ],
    exercises: [
      {
        id: 'ex-b1-g1',
        prompt: 'Complete the subordinate clause:',
        gapSentence: 'Er bleibt zu Hause, weil er krank ___.',
        options: ['ist', 'wird', 'sein', 'gewesen'],
        correctAnswer: 'ist',
      },
    ],
  },

  // B2 Topics
  {
    id: 'g-b2-1',
    level: 'B2',
    title: 'Passiv & Passiversatzformen',
    ruleSummary: 'Formed with werden + Partizip II. Common in formal documentation and technical presentations.',
    examples: [
      { german: 'Die Richtlinien wurden erfolgreich umgesetzt.', english: 'The guidelines were successfully implemented.' },
    ],
    exercises: [
      {
        id: 'ex-b2-g1',
        prompt: 'Choose the passive auxiliary:',
        gapSentence: 'Das Dokument ___ vom Abteilungsleiter geprüft.',
        options: ['wird', 'hat', 'ist', 'macht'],
        correctAnswer: 'wird',
      },
    ],
  },
];

// ==========================================
// 3. SPEAKING MODULE WITH GUIDED & PRACTICE MODES
// ==========================================
export const GERMAN_SPEAKING: SpeakingExercise[] = [
  // A1 Speaking
  {
    id: 'sp-a1-1',
    level: 'A1',
    title: 'Teil 1: Sich vorstellen (Self-Introduction)',
    topic: 'Personal Information & Introductions',
    focus: 'Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobby',
    mode: 'guided',
    prompt: 'Stellen Sie sich vor: Nennen Sie Ihren Namen, Ihr Alter, Ihr Herkunftsland, Ihren Wohnort, die Sprachen, die Sie sprechen, und Ihr Hobby.',
    prepTimeSeconds: 30,
    guidedSupport: {
      usefulPhrases: [
        'Mein Name ist...',
        'Ich komme aus...',
        'Ich wohne in...',
        'Ich spreche Englisch und ein bisschen Deutsch.',
        'Mein Beruf ist...',
        'Meine Hobbys sind Lesen und Reisen.',
      ],
      vocabularySupport: ['Name', 'Alter', 'Wohnort', 'Herkunft', 'Beruf', 'Hobbys'],
      exampleStructure: [
        '1. Begrüßung (Guten Tag)',
        '2. Name & Alter',
        '3. Herkunft & Wohnort',
        '4. Beruf & Sprachen',
        '5. Hobbys & Abschluss',
      ],
      modelPromptAnswer: 'Guten Tag! Mein Name ist Bipin Nepal. Ich bin 24 Jahre alt und komme aus Nepal. Zurzeit wohne ich in Kathmandu. Ich spreche Nepali, Englisch und lerne Deutsch. Von Beruf bin ich Informatiker. In meiner Freizeit spiele ich gerne Fußball und koche gerne.',
    },
  },
  {
    id: 'sp-a1-2',
    level: 'A1',
    title: 'Teil 2: Um Informationen bitten (W-Fragen)',
    topic: 'Einkaufen & Alltag',
    focus: 'Einen Partner nach Preis, Öffnungszeiten oder Produkten fragen',
    mode: 'practice',
    prompt: 'Sie sind im Supermarkt. Ziehen Sie die Wortkarte "Äpfel / Preis". Stellen Sie eine passende Frage an den Verkäufer.',
    prepTimeSeconds: 20,
  },

  // A2 Speaking
  {
    id: 'sp-a2-1',
    level: 'A2',
    title: 'Teil 2: Gemeinsam etwas planen',
    topic: 'Wochenendausflug planen',
    focus: 'Vorschläge machen, zustimmen, ablehnen und Alternativen finden',
    mode: 'guided',
    prompt: 'Planen Sie mit Ihrem Partner einen Wochenendausflug nach Salzburg. Besprechen Sie: Wann fahren wir? Wie reisen wir? Was machen wir dort?',
    prepTimeSeconds: 60,
    guidedSupport: {
      usefulPhrases: [
        'Wollen wir am Samstag fahren?',
        'Was hältst du davon, wenn wir mit dem Zug reisen?',
        'Das ist eine tolle Idee!',
        'Leider habe ich um diese Uhrzeit keine Zeit. Wie wäre es mit...',
      ],
      vocabularySupport: ['Abfahrt', 'Zugticket', 'Sehenswürdigkeiten', 'Altstadt'],
      exampleStructure: ['1. Termin finden', '2. Verkehrsmittel wählen', '3. Aktivitäten abstimmen'],
      modelPromptAnswer: 'Hallo Anna! Wollen wir am Samstag nach Salzburg fahren? Der Zug um 8 Uhr ist sehr günstig. Was meinst du?',
    },
  },

  // B1 Speaking
  {
    id: 'sp-b1-1',
    level: 'B1',
    title: 'Teil 2: Ein Thema präsentieren',
    topic: 'Brauchen Kinder Mobiltelefone?',
    focus: 'Eigene Erfahrung, Vor- und Nachteile, Meinung',
    mode: 'practice',
    prompt: 'Präsentieren Sie das Thema "Brauchen Kinder schon in der Grundschule ein eigenes Smartphone?". Berichten Sie über Ihre Erfahrungen, nennen Sie Vor- und Nachteile und formulieren Sie Ihr persönliches Fazit.',
    prepTimeSeconds: 120,
  },

  // B2 Speaking
  {
    id: 'sp-b2-1',
    level: 'B2',
    title: 'Diskussion & Argumentation',
    topic: 'Homeoffice vs. Präsenzpflicht',
    focus: 'Standpunkte verteidigen, Gegenargumente entkräften',
    mode: 'practice',
    prompt: 'Nehmen Sie Stellung zur vollständigen Rückkehrpflicht ins Büro. Wägen Sie wirtschaftliche, psychologische und organisatorische Faktoren gegeneinander ab.',
    prepTimeSeconds: 180,
  },
];

// ==========================================
// 4. WRITING MODULE (Specific task types, time, word target)
// ==========================================
export const GERMAN_WRITING: WritingExercise[] = [
  // A1 Writing (Strict target 30-40 words, 10 min, section 3 & 4 of brief)
  {
    id: 'wr-a1-1',
    level: 'A1',
    taskType: 'E-Mail (informell)',
    title: 'Schreiben - Informelle E-Mail: Einladung zum Geburtstag',
    instructions: [
      'Sie haben am nächsten Samstag Geburtstag und möchten Ihren Freund Lukas einladen.',
      'Schreiben Sie zu folgenden drei Punkten:',
      '• Warum schreiben Sie?',
      '• Wann und wo findet die Feier statt?',
      '• Was soll Lukas mitbringen?',
    ],
    targetWordMin: 30,
    targetWordMax: 40,
    suggestedTimeMinutes: 10,
    contextHint: 'Vergessen Sie nicht die Anrede (Lieber Lukas,) und die Grußformel (Viele Grüße) am Ende.',
  },
  {
    id: 'wr-a1-2',
    level: 'A1',
    taskType: 'Nachricht',
    title: 'Schreiben - Kurznachricht: Entschuldigung für Verspätung',
    instructions: [
      'Sie haben einen Termin mit Ihrer Sprachlehrerin Frau Sommer.',
      'Ihr Bus hat Verspätung.',
      '• Sagen Sie, dass Sie später kommen.',
      '• Nennen Sie den Grund.',
      '• Entschuldigen Sie sich höflich.',
    ],
    targetWordMin: 25,
    targetWordMax: 35,
    suggestedTimeMinutes: 8,
  },

  // A2 Writing (40-50 words)
  {
    id: 'wr-a2-1',
    level: 'A2',
    taskType: 'E-Mail (formell)',
    title: 'Schreiben - Formelle E-Mail: Hotelreservierung anpassen',
    instructions: [
      'Sie haben ein Zimmer im Hotel Bergblick gebucht.',
      'Sie möchten die Ankunftszeit ändern und nach dem Frühstück fragen.',
    ],
    targetWordMin: 45,
    targetWordMax: 60,
    suggestedTimeMinutes: 15,
  },

  // B1 Writing (80-100 words)
  {
    id: 'wr-b1-1',
    level: 'B1',
    taskType: 'Forumsbeitrag',
    title: 'Schreiben - Forumsbeitrag: Persönliche Weiterbildung',
    instructions: [
      'Äußern Sie Ihre Meinung zum Thema "Sprachenlernen im Erwachsenenalter".',
      'Nennen Sie Vor- und Nachteile sowie persönliche Erfahrungen.',
    ],
    targetWordMin: 80,
    targetWordMax: 100,
    suggestedTimeMinutes: 25,
  },

  // B2 Writing (150-180 words)
  {
    id: 'wr-b2-1',
    level: 'B2',
    taskType: 'Meinungsäußerung',
    title: 'Schreiben - Argumentative Stellungnahme: Nachhaltigkeit im Beruf',
    instructions: [
      'Schreiben Sie einen ausführlichen Diskussionsbeitrag über verbindliche Umweltmaßnahmen in mittelständischen Betrieben.',
    ],
    targetWordMin: 150,
    targetWordMax: 180,
    suggestedTimeMinutes: 35,
  },
];

// ==========================================
// 5. LISTENING MODULE (Instructions -> Audio -> Questions)
// ==========================================
export const GERMAN_LISTENING: ListeningExercise[] = [
  // A1 Listening
  {
    id: 'lis-a1-1',
    level: 'A1',
    title: 'Hören Teil 1: Ansage am Hauptbahnhof München',
    audioScenario: 'Öffentliche Lautsprecherdurchsage am Hauptbahnhof Gleis 8.',
    audioSpeaker: 'Bahnhofssprecherin',
    audioScript: 'Achtung an Gleis 8! Der Intercity-Express 584 nach Frankfurt über Nürnberg, geplante Abfahrt 14 Uhr 25, fährt heute mit circa 15 Minuten Verspätung ab. Grund dafür ist eine Verzögerung im Betriebsablauf. Wir bitten alle Fahrgäste um Verständnis.',
    taskType: 'richtig_falsch',
    questions: [
      {
        id: 'lq1',
        questionText: 'Der Zug nach Frankfurt fährt pünktlich um 14:25 Uhr ab.',
        correctAnswer: 'Falsch',
      },
      {
        id: 'lq2',
        questionText: 'Der Grund für die Verspätung ist eine Verzögerung im Betriebsablauf.',
        correctAnswer: 'Richtig',
      },
    ],
  },
  {
    id: 'lis-a1-2',
    level: 'A1',
    title: 'Hören Teil 2: Wer sagt was? – Im Reisebüro',
    audioScenario: 'Kurzes Telefongespräch zwischen Kundin Frau Weber und dem Berater Herrn Schmidt.',
    audioSpeaker: 'Frau Weber & Herr Schmidt',
    audioScript: 'Schmidt: Reisebüro Sonnenschein, Schmidt, guten Tag!\nWeber: Guten Tag Herr Schmidt, hier ist Maria Weber. Ich suche einen günstigen Flug nach Wien für den nächsten Freitag.\nSchmidt: Gerne Frau Weber. Vormittags oder lieber am Abend?\nWeber: Vormittags wäre perfekt, am besten vor 10 Uhr.',
    taskType: 'wer_sagt_was',
    questions: [
      {
        id: 'lq3',
        questionText: 'Wer möchte am Vormittag fliegen?',
        options: ['Frau Weber (Kundin)', 'Herr Schmidt (Berater)', 'Beide'],
        correctAnswer: 'Frau Weber (Kundin)',
      },
    ],
  },

  // A2 Listening
  {
    id: 'lis-a2-1',
    level: 'A2',
    title: 'Hören Teil 1: Radiowerbung und Veranstaltungshinweise',
    audioScenario: 'Veranstaltungskalender im Lokalradio Bayern.',
    audioSpeaker: 'Radiomoderator',
    audioScript: 'Am kommenden Wochenende öffnet das Stadtmuseum seine Tore bei freiem Eintritt für alle Besucher unter 18 Jahren.',
    taskType: 'multiple_choice',
    questions: [
      {
        id: 'lq-a2',
        questionText: 'Wer hat freien Eintritt ins Stadtmuseum?',
        options: ['Alle Besucher', 'Besucher unter 18 Jahren', 'Nur Senioren'],
        correctAnswer: 'Besucher unter 18 Jahren',
      },
    ],
  },
];

// ==========================================
// 6. READING MODULE (Notices, emails, short texts)
// ==========================================
export const GERMAN_READING: ReadingExercise[] = [
  // A1 Reading
  {
    id: 'rd-a1-1',
    level: 'A1',
    title: 'Lesen Teil 1: Aushang in der Sprachschule',
    contentType: 'Aushang/Schild',
    passage: 'WICHTIGE MITTEILUNG:\nLiebe Kursteilnehmer,\nam Freitag, den 24. Oktober, bleibt die Cafeteria wegen Renovierungsarbeiten geschlossen.\nKaffee und Snacks erhalten Sie am Automaten im 1. Stock.\nDie Sprachkurse finden wie gewohnt in den normalen Unterrichtsräumen statt.\n\nIhre Schulleitung',
    taskType: 'richtig_falsch',
    questions: [
      {
        id: 'rq1',
        questionText: 'Am Freitag finden keine Sprachkurse statt.',
        correctAnswer: 'Falsch',
        explanation: 'Die Kurse finden wie gewohnt in den normalen Räumen statt.',
      },
      {
        id: 'rq2',
        questionText: 'Man kann am Freitag Snacks im 1. Stock kaufen.',
        correctAnswer: 'Richtig',
        explanation: 'Kaffee und Snacks gibt es am Automaten im 1. Stock.',
      },
    ],
  },
  {
    id: 'rd-a1-2',
    level: 'A1',
    title: 'Lesen Teil 2: Kleinanzeige Wohnungsmarkt',
    contentType: 'Anzeige',
    passage: 'Biete schöne, helle 2-Zimmer-Wohnung in Berlin-Mitte.\n55 qm, komplett möbliert mit Einbauküche, Balkon und WLAN.\nMiete: 750 Euro warm.\nFrei ab: 1. Dezember.\nBesichtigung am Samstag ab 14 Uhr.\nKontakt: herrmann.wohnen@mail.de',
    taskType: 'multiple_choice',
    questions: [
      {
        id: 'rq3',
        questionText: 'Wann kann man die Wohnung besichtigen?',
        options: ['Am Samstag ab 14 Uhr', 'Am 1. Dezember', 'Jeden Tag um 14 Uhr'],
        correctAnswer: 'Am Samstag ab 14 Uhr',
      },
      {
        id: 'rq4',
        questionText: 'Ist die Wohnung möbliert?',
        options: ['Ja, komplett möbliert', 'Nein, ohne Möbel', 'Nur die Küche'],
        correctAnswer: 'Ja, komplett möbliert',
      },
    ],
  },

  // A2 Reading
  {
    id: 'rd-a2-1',
    level: 'A2',
    title: 'Lesen Teil 1: Nachricht vom Arbeitgeber',
    contentType: 'E-Mail',
    passage: 'Sehr geehrte Mitarbeiterinnen und Mitarbeiter, bitte denken Sie daran, Ihren Urlaubsantrag für die Weihnachtsfeiertage bis spätestens Freitag bei der Personalabteilung einzureichen.',
    taskType: 'multiple_choice',
    questions: [
      {
        id: 'rq-a2',
        questionText: 'Was müssen die Mitarbeiter tun?',
        options: ['Überstunden machen', 'Urlaubsantrag bis Freitag einreichen', 'Weihnachtsgeschenke kaufen'],
        correctAnswer: 'Urlaubsantrag bis Freitag einreichen',
      },
    ],
  },
];

// ==========================================
// 7. LEVEL-SPECIFIC MOCK TESTS
// ==========================================
export const GERMAN_MOCK_TESTS: MockTestItem[] = [
  // A1 Mock Tests (strictly restricted to A1 per section 9)
  {
    id: 'mt-a1-1',
    level: 'A1',
    title: 'Goethe-Zertifikat A1: Start Deutsch 1 – Modelltest 01',
    format: 'Goethe-Zertifikat',
    sectionsCount: 4,
    durationMinutes: 65,
    description: 'Offizieller Prüfungsaufbau: Hören (20 Min), Lesen (25 Min), Schreiben (15 Min), Sprechen (15 Min).',
  },
  {
    id: 'mt-a1-2',
    level: 'A1',
    title: 'telc Deutsch A1 – Übungstest 02',
    format: 'Telc Deutsch',
    sectionsCount: 4,
    durationMinutes: 70,
    description: 'Vollständige Simulation für elementare Sprachverwendung mit standardisierten Antwortbögen.',
  },

  // A2 Mock Tests
  {
    id: 'mt-a2-1',
    level: 'A2',
    title: 'Goethe-Zertifikat A2: Fit in Deutsch – Modelltest 01',
    format: 'Goethe-Zertifikat',
    sectionsCount: 4,
    durationMinutes: 90,
    description: 'Umfassende Prüfung der alltäglichen Kommunikationsfähigkeit.',
  },

  // B1 Mock Tests
  {
    id: 'mt-b1-1',
    level: 'B1',
    title: 'Goethe- / ÖSD-Zertifikat B1 – Modulprüfung Komplett',
    format: 'Goethe-Zertifikat',
    sectionsCount: 4,
    durationMinutes: 165,
    description: 'Zertifikatsprüfung B1 für selbstständige Sprachverwendung.',
  },

  // B2 Mock Tests
  {
    id: 'mt-b2-1',
    level: 'B2',
    title: 'Goethe-Zertifikat B2 – Modulprüfung Komplett',
    format: 'Goethe-Zertifikat',
    sectionsCount: 4,
    durationMinutes: 190,
    description: 'Komplexe Texte, berufsspezifische Sprache und differenzierte Argumentation.',
  },
];
