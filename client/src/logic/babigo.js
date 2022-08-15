/**
 * ひらがな判定
 * @param {判定文字} str
 * @returns ひらがなかどうかのブール値
 */
function isHiragana(str){
    str = (str==null) ? '' : str;
    if(str.match(/^[ぁ-ん]*$/)){  // "ー"の後ろの文字は全角スペースです。
        return true;
    }else{
        return false;
    }
}

// 文字列の定義
const rowA = 'あかさたなはまやらわがざだばぱ'.split('');
const rowI = 'いきしちにひみりぎじぢびぴ'.split('');
const rowU = 'うくすつぬふむゆるんぐずづぶぷ'.split('');
const rowE = 'えけせてねへめれげぜでべぺ'.split('');
const rowO = 'おこそとのほもよろをごぞどぼぽ'.split('');
const rowKya = 'きゃ,ぎゃ,しゃ,じゃ,ちゃ,ぢゃ,にゃ,ひゃ,びゃ,ぴゃ,みゃ,りゃ'.split(',');
const rowKyu = 'きゅ,ぎゅ,しゅ,じゅ,ちゅ,ぢゅ,にゅ,ひゅ,びゅ,ぴゅ,みゅ,りゅ'.split(',');
const rowKyo = 'きょ,ぎょ,しょ,じょ,ちょ,ぢょ,にょ,ひょ,びょ,ぴょ,みょ,りょ'.split(',');


// 辞書の定義
const dictA = createDict(rowA, 'ば')
const dictI = createDict(rowI, 'び')
const dictU = createDict(rowU, 'ぶ')
const dictE = createDict(rowE, 'べ')
const dictO = createDict(rowO, 'ぼ')
const dictKya = createDict(rowKya, 'ば')
const dictKyu = createDict(rowKyu, 'ぶ')
const dictKyo = createDict(rowKyo, 'ぼ')
const dictAll = Object.assign(dictA ,dictI ,dictU ,dictE ,dictO,dictKya ,dictKyu ,dictKyo);

// 辞書の生成
function createDict(array, str) {
    var dict = {}
    array.forEach(element => {
        dict[element] = element + str
        // console.log(element+str)
    });

    // console.log(dict)
    return dict
}


/**
 *
 * @param {原文} text
 * @returns バビ語変換後の文章
 */
export const changeBabi = (text) => {
    // カタカナ+ーの時に'undefined'と出力されるエラーを解消する
    var babigo = '';
    var out = '';
    const babigoAll = rowA + rowI + rowU + rowE + rowO;
    // console.log(babigoAll)
    let txtArray = text.split('');
    txtArray.forEach(function(value, i) {
        // console.log(i, value)
        if(isHiragana(txtArray[i])) {
            console.log('ひらがなである:', value)
            if(babigoAll.includes(value)) {
                // console.log('ok')
                if(out != '') {
                    babigo += dictAll[out]
                }
                if(i == text.length-1) {
                    babigo += dictAll[value]
                }
                out = value
            } else if(['っ'].includes(value)) {
                babigo += dictAll[out] + value
                out = ''
            } else if(['ゃ','ゅ','ょ'].includes(value)) {
                out += value;
                babigo += dictAll[out];
                out = '';
            } else if(value == 'ー') {
                var tmp = dictAll[out]
                babigo += tmp + value // + tmp[tmp.length-1]
                out = ''
            } else if(['、', '。'].includes(value)) {
                if (out != '') {
                    babigo += dictAll[out]
                    babigo += value
                }
                out = ''
            }
        }
        else {
            console.log('ひらがなではない: ', value)
            if (out != '') {
                babigo += dictAll[out]
                babigo += value
            } else {
                babigo += value
            }
            out = ''
        }
    });
    return babigo
}

let text = 'さいとうきょうこ'
let babigo = changeBabi(text)
console.log(babigo)
