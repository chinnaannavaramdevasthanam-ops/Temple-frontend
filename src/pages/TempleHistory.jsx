import React from "react";
import "./TempleHistory.css";

export default function TempleHistory() {
  return (
    <div className="history-page-wrapper">
      <div className="container py-5">
        
        {/* DECORATIVE HEADER */}
        <div className="text-center mb-5">
          <h1 className="devotional-title">Sri Satyanarayana Swamy Temple</h1>
          <div className="title-divider">
            <span className="om-symbol">ॐ</span>
          </div>
          <h3 className="sub-title">"Chinna Annavaram" - A Sacred Journey</h3>
        </div>

        <div className="history-card shadow-lg">
          
          {/* --- TELUGU SECTION --- */}
          <div className="section-telugu mb-5">
            <h2 className="lang-header">ఆలయ చరిత్ర (History in Telugu)</h2>
            <div className="content-grid">
              <div className="text-content">
                <p>
                  <strong>దిన దినాభివృద్ధి చెందుతున్న 'చిన్న అన్నవరం':</strong> విజయనగరం జిల్లా, నెల్లిమర్ల మండలంలోని రామతీర్థం వెళ్లే మార్గంలో, కొత్తపేట పంచాయతీ పరిధిలో వెలసిన <strong>శ్రీ రమా సహిత సత్యనారాయణ స్వామి వారి ఆలయం</strong> ఉత్తరాంధ్రలో ప్రసిద్ధ పుణ్యక్షేత్రంగా విరాజిల్లుతోంది. 
                </p>
                <p>
                  <strong>ఆలయ స్థాపన:</strong> ప్రముఖ న్యాయవాది మరియు ఆలయ ధర్మకర్త <strong>శ్రీ సురేష్ కొండేటి</strong> మరియు వారి సోదరులు శ్రీ కొండేటి కనకరాజు గార్ల దృఢ సంకల్పంతో ఈ ఆలయం నిర్మించబడింది. కేవలం రెండేళ్ల క్రితం ప్రారంభమైన ఈ ఆలయం, నేడు "చిన్న అన్నవరం" గా పిలువబడుతూ భక్తుల విశేష ఆదరణ పొందుతోంది.
                </p>
                <p>
                  <strong>విశేషాలు:</strong> తూర్పుగోదావరి జిల్లా అన్నవరం తరువాత, సామూహిక సత్యనారాయణ స్వామి వ్రతాలు అత్యధికంగా జరుగుతున్న క్షేత్రం ఇదే. ఏకాదశి, పౌర్ణమి మరియు కార్తీక మాసాలలో ఇక్కడ వందలాది మంది దంపతులు వ్రతాలు ఆచరిస్తారు. ప్రతి శనివారం భక్తులకు అన్నసమారాధన (Annadanam) నిర్వహించబడుతుంది.
                </p>
                <p>
                  <strong>భవిష్యత్ ప్రణాళికలు:</strong> భక్తుల సౌకర్యార్థం కళ్యాణ మండపం మరియు సత్రం (Choultry) నిర్మించడానికి ప్రణాళికలు సిద్ధం చేశారు. ఆలయ అర్చకులు వినయ్ శర్మ మరియు సీతారామ్ గార్ల ఆధ్వర్యంలో నిత్య పూజలు శాస్త్రోక్తంగా నిర్వహించబడుతున్నాయి.
                </p>
              </div>
              <div className="image-content">
                 <img src="/home/history1.webp" alt="Temple Founder" className="devotional-img" />
                 <p className="img-caption">శ్రీ సురేష్ కొండేటి (ఆలయ ధర్మకర్త)</p>
              </div>
            </div>
          </div>

          <hr className="gold-separator" />

          {/* --- ENGLISH SECTION --- */}
          <div className="section-english mt-5">
            <h2 className="lang-header">Temple History (English)</h2>
            <div className="content-grid reverse-grid">
               <div className="image-content">
                 {/* FIX: Added loading="eager" to prioritize this image */}
                 <img 
                   src="/home/history2.jpg" 
                   alt="Temple Sanctum" 
                   className="devotional-img"
                   loading="eager" 
                 />
                 <p className="img-caption">శ్రీ కనకరాజు కొండేటి</p>
              </div>
              <div className="text-content">
                <p>
                  <strong>The Rise of "Chinna Annavaram":</strong> Located on the route to Ramateertham in Nellimarla Mandal (Vizianagaram Dist), the <strong>Sri Rama Sahita Satyanarayana Swamy Temple</strong> is rapidly becoming a major spiritual hub in North Andhra.
                </p>
                <p>
                  <strong>The Foundation:</strong> Driven by immense devotion and a strong resolve, the temple was established by prominent advocate <strong>Sri Suresh Kondeti</strong> and his brother Sri Kondeti Kanakaraju. Within just two years of its inception, the temple has garnered fame as "Chinna Annavaram" (Little Annavaram).
                </p>
                <p>
                  <strong>Significance & Rituals:</strong> Apart from the famous Annavaram temple in East Godavari, this is the only major shrine in the region where <strong>Collective Satyanarayana Vratams</strong> are performed on a grand scale. Hundreds of couples participate in these rituals during Ekadasi, Pournami, and Karthika Masam. <strong>Annadanam</strong> (free food distribution) is provided to devotees every Saturday.
                </p>
                <p>
                  <strong>Future Developments:</strong> Under the guidance of priests Vinay Sharma and Sitaram, daily rituals are performed with strict Vedic adherence. The management is currently constructing a massive Vrata Mandapam and has plans for a Kalyana Mandapam (Wedding Hall) and a Choultry (Pilgrim stay) to serve the growing number of devotees from Srikakulam and Vizianagaram districts.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}