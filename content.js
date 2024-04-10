/*
* File which extracts ingredients from a product page on the sephora website
* Information extracted upon button click in popup.js
* Sends results back to popup.js
*/


//an unfortunately extensive list of known irritating ingredients found in skincare
const badIngs = ["acetylatedlanolin","acetylatedlanolinalcohol","acetylatedwoolfat","acetylatedwoolwax","adansoniadigitatal","agar","ahnfeltiopsisconcinnaextract","alariaesculentaextract","algabladderwrack","algae","algaeextract","algin","alginate","alginicacid","algea","aphanothecesacrumpolysaccharide","arthrospiraplantensis","ascophyllumnodosumextract","asparagopsisarmataextract","baobab","beeswax",
"bismuth","bryopsisafricana","butylstearate","butyrospermum","cacaoseedbutter","capeabiruncinatavardenudasonder","capeabiruncinatavarelongatasonder","carageenangum","carastayc","caulerpalentilliferaextract","caulerpafiliformis","carrageenan","carrageenanmoss","ceraalba","cerabianca","ceraflava","ceraolea","cetearyalcohol+ceteareth20","chaetomorphalinum(aerea)cladophoraradiosa","chlamydomonasreinhardtiiextract","chlorella",
"chlorophyceae","chondruscrispus(akairishmossorcarageenanmoss)","cladophoracfsimplex","cladosiphonokamuranusextract","coaltar","coco-caprylate","cocoabutter","coconutalkanes","coconutbutter","coconutextract","coconutnuciferaextract","coconutoil","cocosnuciferaoil","cocosnuciferaseedbutter","coenochlorissigniensisextract","colloidalsulfur","cottonawwsoil","cottonseedoil","corallinaofficinalisextract","corn","cornoil","creosote",
"cystoseiratamariscifoliaextract","d&cred#17","d&cred#21","d&cred#3","d&cred#30","d&cred#36","decyloleate","dictyopterismembranacea","dictyopterispolypodioides","dilseacarnosaextract","dioctylsuccinate","disodiummonooleamido","dodecanoicacid","dunaliellasalinaextract","durvillaeaantarcticaextract","eckloniacava","eckloniacavaextract","eckloniaradiata","enteromorphacompressaextract","ethoxylatedlanolin","ethylhexylpalmitate",
"eucheumaspinosumextract","fucoxanthin","fucusserratus","fucusvesiculosus","gamtaeextract","gelidiellaacerosaextract","gelidiumamansiiextract","gigartinastellataextract","glycerystearatese","glyceryl-3diisostearate","glycinesojaoil","glycinemax","gracilariopsischordaextract","haematococcuspluvialiextract","haematococcuspluvialis","hasleaostreariaextract","hexadecylalcohol","himanthaliaelongataextract","hizikiafusiformeextract",
"hydrogenatedvegetableoil","hydrolyzedrhodophyceaextract","hydrousmagnesiumsilicate","hypneamusciformisextract","hypneaceaeextract","irishmoss","isocetylalcohol","isocetylstearate","isodecyloleate","isopropylistearate","isopropyllinolate","isopropylmyristate","isopropylpalmitate","isostearylisostearate","isostearyleneopentanoate","janaiubensextract","jojobawax","kappaphycusalvareziiextract",
"karite","kelp","kousouekisu","laminaria","laminariadigitataextract","laminariasaccharinaextract(laminariasaccharine)","laureth-23","laureth-4","lauricacid","linolate","liquorpiciscarbonis","lithothamniumcalcareumpowder","lpc","macroalgae","macrocystispyriferaextract","mangiferaindicaseedbutter","mangobutter","marula","marulaoil","minkoil","moringaoil","moss","myristate","myristicacid","myristyl",
"myristyllactate","myristylmyristate","myristylpropionate","octylstearate","oleth-3","oleylalcohol","palmaria palmataextract","palmoil","parkii","peg2sulfosuccinate","peg16lanolin","peg200dilaurate","peg8stearate","pelvetiacanaliculataextract","phaeodactylumtricornutumextract","phaeophyceae","pixcarbonis","pgmonostearate","ppg-2myristyl","ppg2myristylpropionate","ppg2myristyletherpropionate","plankton",
"polysiphoniaelongataextract","polyglyceryl-3diisostearate","polyglyceryl-3-disostearate","porphyraumbilicalis","porphyridium","porphyridiumcruentumextract","potassiumchloride","potassiumsalt","propyleneglycolmonostearate","pyrenecoaltarpitch","redalgae","rhodophyta","rhodophyceaeextract","sargassumfilipendulaextract","sargassumfusiformeextract","sclerocaryabirrea","sclerocaryabirreaseedoil","seaweed",
"seafern","sesame","sesamumindicum","sharkliveroil","sharksqualene","shea","sheabutter","sheepalcohol","simmondsiachinensisseedwax","sles","sls","sodiumalginate","sodiumlaurethsulfate","sodiumlaurylsulfate","soja","solulan16","sorbitanoleate","soy","soybean","soybeanoil","sphacelaria","spirulina","squalene","steareth10","stearicacidtea","stearylheptanoate","starch","sulfatedcastoroil","sulfatedjojobaoil",
"sulfosuccinate","sulphatedcastoroil","talc","talcum","teastearate","tetradecylmyristate","theobromabutter","theobromacocoaseedbutter","theobramaoil","triticumaestivum","triticumvulgare","turkeyredoil","undariapinnatifida","ulvalactuca","ulvafasciata","ulvarhacodes","vegetablegelatin","vitellariaparadoxa","wakame","wheat","wheatgermglyceride","wheatgermoil","woolalcohol","woolfat","xanthophyta","xylene","zeamays"];
//https://www.tutorialspoint.com/split-the-sentences-by-comma-and-remove-surrounding-spaces-javascript#:~:text=Split%20the%20sentences%20by%20comma%20and%20remove%20surrounding%20spaces%20%2D%20JavaScript%3F,-JavascriptWeb%20Development&text=var%20sentences%20%3D%20%22%20John%20%2C%20David,surrounding%20spaces%2C%20use%20trim(). used to split the textcontent

//function to get "irritating" ingredients from the current product
function getIngredients(ingredients){

    const text = ingredients.textContent; //extract text from ingredients div
    let score = 0; //will track number of harmful ingredients

    var singleWords = text.split(",").map(function (value){ //gets rid of any whitespace in ingredient names
      noWhiteSpace = value.replace(/\s/g,'');
      console.log(noWhiteSpace.toLowerCase());
      return (noWhiteSpace.toLowerCase());
    });

    let myBadIngredients = []; //list of names of harmful ingredients in the current product

    //check which irritating ingredients are in current product
    //add to score and push ingredient name to list if one is found
    badIngs.forEach((badIngredient)=>{
      //let regex = new RegExp(`\\b${badIngredient}\\b`, 'gi');
      singleWords.forEach((curIngredient)=>{
        if (badIngredient===curIngredient){ 
          score++;
          myBadIngredients.push(badIngredient);
        };
      });
      
    });
    
    return {badIngs: myBadIngredients, rating: score };
};

    chrome.runtime.onMessage.addListener( async (msg, sender, response) => {

      if (msg.action == "GET_INGREDIENTS"){ //if popup button was pressed, find the bad ingredients and let the user know
        let ingredientsFromPage = document.querySelector('#ingredients');
        ingredientsList = getIngredients(ingredientsFromPage);
        response({list: ingredientsList.badIngs, rating: ingredientsList.rating});
      };
      }
    );