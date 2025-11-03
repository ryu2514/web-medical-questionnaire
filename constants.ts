import type { Section, TherapistCheckSection, InfoSectionItem } from './types';

export const questionnaireData: Section[] = [
    {
        level: '【レベル0】',
        title: '基本情報',
        questions: [
            { id: 'patientId', level: '0', item: '患者ID', text: '', type: 'text', placeholder: '例：12345', notes: '保存・検索用のID（数字）' },
            { id: 'name', level: '0', item: 'お名前', text: '', type: 'text', placeholder: '山田太郎' },
            { id: 'age', level: '0', item: '年齢', text: '', type: 'text', placeholder: '65' , notes: "歳" },
            { id: 'gender', level: '0', item: '性別', text: '', type: 'radio', options: ['男性', '女性', 'その他'] },
            { id: 'date', level: '0', item: '記入日', text: '', type: 'date', placeholder: '2025-11-02' },
        ],
    },
    {
        level: '【レベル1】',
        title: '主訴',
        questions: [
            { id: 'mainComplaint', level: '1', item: 'Q1', text: '今、一番困っていることは何ですか？', type: 'textarea', placeholder: '例：歩くと右膝が痛い、階段を降りるのが怖い', notes: 'あなたの言葉で自由にお書きください' },
        ],
    },
    {
        level: '【レベル2】',
        title: '症状の詳細',
        questions: [
            { id: 'symptomOnset', level: '2', item: 'Q2', text: 'その症状はいつ頃から始まりましたか？', type: 'radio', options: ['1週間以内', '1ヶ月以内', '3ヶ月以内', '半年以内', '1年以上前', 'よく覚えていない'] },
            { id: 'symptomCause', level: '2', item: 'Q3', text: 'きっかけや原因として思い当たることはありますか？', type: 'checkbox', options: ['特にない', '転倒した', 'スポーツで痛めた', '仕事で無理をした', '徐々に悪くなった', 'その他'], hasOtherInput: true },
            { id: 'symptomCauseOther', level: '2', item: '', text: '', type: 'text', placeholder: 'その他の内容を入力してください', conditionalOn: 'symptomCause', conditionalValue: 'その他' },
            { id: 'symptomLocation', level: '2', item: 'Q4', text: '痛み・不調がある場所を教えてください', type: 'checkbox', options: ['首', '肩（右・左・両方）', '腰', '股関節（右・左・両方）', '膝（右・左・両方）', '足首（右・左・両方）', 'その他'], hasOtherInput: true },
            { id: 'symptomLocationOther', level: '2', item: '', text: '', type: 'text', placeholder: 'その他の場所を入力してください', conditionalOn: 'symptomLocation', conditionalValue: 'その他' },
            { id: 'symptomTrigger', level: '2', item: 'Q5', text: 'どんな時に症状が出ますか？', type: 'checkbox', options: ['歩いている時', '階段を上る時', '階段を下りる時', '立ち上がる時', '座っている時', '寝ている時', '動かし始める時', 'じっとしていても痛い', 'その他'], notes: '複数回答可', hasOtherInput: true },
            { id: 'symptomTriggerOther', level: '2', item: '', text: '', type: 'text', placeholder: 'その他の状況を入力してください', conditionalOn: 'symptomTrigger', conditionalValue: 'その他' },
            { id: 'painScale', level: '2', item: 'Q6', text: '痛みの強さを教えてください（0〜10）', type: 'pain-scale', notes: '0=痛くない, 10=最悪の痛み (一番痛い時を10として)' },
        ],
    },
    {
        level: '【レベル3】',
        title: '生活への影響',
        questions: [
            { id: 'dailyLifeImpact', level: '3', item: 'Q7', text: '日常生活で困っていることを教えてください', type: 'checkbox', options: ['歩くのが辛い', '階段の上り下りが辛い', '立ち仕事が辛い', '座り仕事が辛い', '家事ができない', '買い物に行けない', '趣味・スポーツができない', '寝返りが辛い', '寝つきが悪い', '外出が億劫', 'その他'], notes: '複数回答可', hasOtherInput: true },
            { id: 'dailyLifeImpactOther', level: '3', item: '', text: '', type: 'text', placeholder: 'その他の困っていることを入力してください', conditionalOn: 'dailyLifeImpact', conditionalValue: 'その他' },
            { id: 'lostAbilities', level: '3', item: 'Q8', text: '具体的に「できなくなったこと」はありますか？', type: 'textarea', placeholder: '例：以前は毎朝30分散歩していたが、今は10分が限界', notes: '以前はできていたのに今はできないこと' },
        ],
    },
    {
        level: '【レベル4】',
        title: '目標',
        questions: [
            { id: 'shortTermGoal', level: '4', item: 'Q9-1', text: '短期目標（1〜2週間以内に達成したいこと）', type: 'textarea', placeholder: '例：痛みなく家の中を歩けるようになりたい' },
            { id: 'longTermGoal', level: '4', item: 'Q9-2', text: '長期目標（1〜3ヶ月で達成したいこと）', type: 'textarea', placeholder: '例：趣味のテニスに復帰したい' },
        ],
    },
    {
        level: '【レベル5】',
        title: '生活背景',
        questions: [
            { id: 'occupation', level: '5', item: 'Q10', text: '現在のお仕事について教えてください', type: 'checkbox', options: ['会社員・公務員（デスクワーク・立ち仕事・肉体労働）', '自営業', '主婦・主夫', '学生', '無職・退職', 'その他'], hasOtherInput: true },
            { id: 'occupationOther', level: '5', item: '', text: '', type: 'text', placeholder: 'その他のお仕事を入力してください', conditionalOn: 'occupation', conditionalValue: 'その他' },
            { id: 'occupationDetails', level: '5', item: 'Q10-補足', text: '仕事内容の詳細（任意）', type: 'textarea', placeholder: '例：1日8時間パソコン作業' },
            { id: 'dailyPosture', level: '5', item: 'Q11', text: '1日の中で仕事を含めてどのような動作や姿勢が多いですか？', type: 'textarea', placeholder: '例：デスクワークで座りっぱなし、立ち仕事で長時間立っている、重いものを持つことが多い' },
            { id: 'hobbies', level: '5', item: 'Q12', text: '趣味・やりたいことはありますか？', type: 'checkbox', options: ['スポーツ', 'ウォーキング・散歩', '旅行', 'ガーデニング', '料理', '読書', 'その他', '特にない'], notes: '複数回答可', hasOtherInput: true },
            { id: 'hobbiesOther', level: '5', item: '', text: '', type: 'text', placeholder: 'その他の趣味を入力してください', conditionalOn: 'hobbies', conditionalValue: 'その他' },
        ],
    },
    {
        level: '【レベル6】',
        title: '医療情報',
        questions: [
            { id: 'currentIllnesses', level: '6', item: 'Q13', text: '現在治療中の病気はありますか？', type: 'checkbox', options: ['高血圧', '糖尿病', '心臓の病気', '脳卒中の既往', 'がん', '骨粗鬆症', 'リウマチ', 'その他', '特になし'], notes: '複数回答可', hasOtherInput: true },
            { id: 'currentIllnessesOther', level: '6', item: '', text: '', type: 'text', placeholder: 'その他の病気を入力してください', conditionalOn: 'currentIllnesses', conditionalValue: 'その他' },
            { id: 'currentMedications', level: '6', item: 'Q14', text: '現在飲んでいるお薬はありますか？', type: 'radio', options: ['あり（お薬手帳をお持ちください）', 'なし'] },
            { id: 'medicationDetails', level: '6', item: 'Q14-補足', text: 'どのようなお薬を飲んでいますか？', type: 'textarea', placeholder: '例：血圧の薬、痛み止め、糖尿病の薬など（わかる範囲で）', conditionalOn: 'currentMedications', conditionalValue: 'あり（お薬手帳をお持ちください）' },
            { id: 'pastSurgeries', level: '6', item: 'Q15', text: '過去に大きな手術やケガをしたことはありますか？', type: 'radio', options: ['あり', 'なし'], notes: 'ありの場合は内容を記入' },
            { id: 'pastSurgeriesDetails', level: '6', item: '', text: '', type: 'text', placeholder: '例：右膝半月板損傷の手術・10年前', conditionalOn: 'pastSurgeries', conditionalValue: 'あり' },
        ],
    },
];

export const therapistCheckData: TherapistCheckSection = {
    title: '【セラピスト用】患者理解',
    questions: [
        { id: 'therapistCheck1', level: '', item: 'CR①チェック項目', text: '主訴を患者の言葉で理解した（Q1）', type: 'checkbox', options: ['Yes', 'No'] },
        { id: 'therapistCheck2', level: '', item: '', text: '生活背景・目標を把握した（Q9-Q11）', type: 'checkbox', options: ['Yes', 'No'] },
        { id: 'therapistCheck3', level: '', item: '', text: '患者の訴えの背景にある意味を読み取った', type: 'checkbox', options: ['Yes', 'No'] },
        { id: 'therapistCheck4', level: '', item: '', text: '「何に困っているか」「何を求めているか」を理解した', type: 'checkbox', options: ['Yes', 'No'] },
    ],
};

export const patientTips: InfoSectionItem[] = [
    { text: '正直にお書きください（こう答えるべき、ではなく本当の気持ちを）' },
    { text: 'わからない項目は空欄でOK（後で一緒に確認します）' },
    { text: '専門用語は使わなくてOK（あなたの言葉で）' },
    { text: '具体的に書いてもらえると助かります（例：「痛い」→「歩いて10分すると右膝が痛くなる」）' },
    { text: '目標は遠慮せずに（やりたいことを教えてください）' },
];